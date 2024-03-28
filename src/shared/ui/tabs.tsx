import { forwardRef, useEffect, useId, useRef } from 'react';

import { useControllableState } from '@/shared/hooks';
import { createContextScope, Scope } from '@/shared/utils/context';
import type * as Radix from '@/shared/utils/primitive';
import { Primitive } from '@/shared/utils/primitive';

const TABS_NAME = 'Tabs';

type ScopedProps<P> = P & { __scopeTabs?: Scope };
const [createTabsContext, createTabsScope] = createContextScope(TABS_NAME);

const [TabsProvider, useTabsContext] = createTabsContext<TabsContextValue>(TABS_NAME);

type TabsElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;

interface TabsContextValue {
  baseId: string;
  value?: string;
  onValueChange: (value: string) => void;
  activationMode?: TabsProps['activationMode'];
}

interface TabsProps extends PrimitiveDivProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  activationMode?: 'automatic' | 'manual';
}

const Tabs = forwardRef<TabsElement, TabsProps>(
  (props: ScopedProps<TabsProps>, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      activationMode = 'automatic',
      ...tabsProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue,
    });

    return (
      <TabsProvider
        scope={__scopeTabs}
        baseId={useId()}
        value={value}
        onValueChange={setValue}
        activationMode={activationMode}>
        <Primitive.div {...tabsProps} ref={forwardedRef} />
      </TabsProvider>
    );
  }
);

Tabs.displayName = TABS_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsList
 * -----------------------------------------------------------------------------------------------*/

const TAB_LIST_NAME = 'TabsList';

type TabsListElement = React.ElementRef<typeof Primitive.div>;
type TabsListProps = PrimitiveDivProps;

const TabsList = forwardRef<TabsListElement, TabsListProps>(
  (props: ScopedProps<TabsListProps>, forwardedRef) => {
    const { ...listProps } = props;
    return <Primitive.div role='tablist' {...listProps} ref={forwardedRef} />;
  }
);

TabsList.displayName = TAB_LIST_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'TabsTrigger';

type TabsTriggerElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = Radix.ComponentPropsWithoutRef<typeof Primitive.button>;
interface TabsTriggerProps extends PrimitiveButtonProps {
  value: string;
}

const TabsTrigger = forwardRef<TabsTriggerElement, TabsTriggerProps>(
  (props: ScopedProps<TabsTriggerProps>, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return (
      <Primitive.div asChild>
        <Primitive.button
          type='button'
          role='tab'
          aria-selected={isSelected}
          aria-controls={contentId}
          data-state={isSelected ? 'active' : 'inactive'}
          data-disabled={disabled ? '' : undefined}
          disabled={disabled}
          id={triggerId}
          {...triggerProps}
          ref={forwardedRef}
          onMouseDown={(event) => {
            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onValueChange(value);
            } else {
              // prevent focus to avoid accidental activation
              event.preventDefault();
            }
          }}
          onKeyDown={(event) => {
            if ([' ', 'Enter'].includes(event.key)) context.onValueChange(value);
          }}
          onFocus={() => {
            // handle "automatic" activation if necessary
            // ie. activate tab following focus
            const isAutomaticActivation = context.activationMode !== 'manual';
            if (!isSelected && !disabled && isAutomaticActivation) {
              context.onValueChange(value);
            }
          }}
        />
      </Primitive.div>
    );
  }
);

TabsTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'TabsContent';

type TabsContentElement = React.ElementRef<typeof Primitive.div>;
interface TabsContentProps extends PrimitiveDivProps {
  value: string;
}

const TabsContent = forwardRef<TabsContentElement, TabsContentProps>(
  (props: ScopedProps<TabsContentProps>, forwardedRef) => {
    const { __scopeTabs, value, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = useRef(isSelected);

    useEffect(() => {
      const rAF = requestAnimationFrame(
        () => (isMountAnimationPreventedRef.current = false)
      );
      return () => cancelAnimationFrame(rAF);
    }, []);

    return (
      <div
        data-state={isSelected ? 'active' : 'inactive'}
        role='tabpanel'
        aria-labelledby={triggerId}
        hidden={!isSelected}
        id={contentId}
        tabIndex={0}
        {...contentProps}
        ref={forwardedRef}
        style={{
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? '0s' : undefined,
        }}>
        {isSelected && children}
      </div>
    );
  }
);

TabsContent.displayName = CONTENT_NAME;

/* ---------------------------------------------------------------------------------------------- */

function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`;
}

function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`;
}

export { createTabsScope, Tabs, TabsContent, TabsList, TabsTrigger };

export type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps };
