import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export interface SelectOptions {
  placement?: Placement;
  onChange?: (selectedIndex: number) => void;
  offset?: number;
  isSizeSync?: boolean;
  defaultIndex?: number | null;
}

export const useSelect = (props: SelectOptions = {}) => {
  const {
    isSizeSync = true,
    placement = 'bottom-start',
    onChange: onChangeProp,
    offset: offsetSize = 5,
    defaultIndex = null,
  } = props;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultIndex);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(defaultIndex);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetSize),
      flip(),
      isSizeSync &&
        size({
          apply({ rects, elements, availableHeight }) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`,
              minWidth: `${rects.reference.width}px`,
            });
          },
        }),
    ],
  });

  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);

  const handleSelect = useCallback(
    (index: number | null) => {
      setSelectedIndex(index);
      setOpen(false);
      if (index !== null) {
        onChangeProp?.(index);
      }
    },
    [onChangeProp]
  );

  function handleTypeaheadMatch(index: number | null) {
    if (open) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    listNav,
    typeahead,
    click,
    dismiss,
    role,
  ]);

  return useMemo(
    () => ({
      open,
      setOpen,
      activeIndex,
      selectedIndex,
      refs,
      floatingStyles,
      context,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      handleSelect,
      elementsRef,
      labelsRef,
    }),
    [
      open,
      setOpen,
      activeIndex,
      selectedIndex,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      refs,
      floatingStyles,
      context,
      handleSelect,
    ]
  );
};

type ContextType = ReturnType<typeof useSelect> | null;

export const SelectContext = createContext<ContextType>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (context == null) {
    throw new Error('Select components must be wrapped in <Select />');
  }

  return context;
};
