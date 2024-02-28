import { useListItem, useMergeRefs } from '@floating-ui/react';
import React, { forwardRef, type ReactNode } from 'react';

import { useSelectContext } from './useSelect';

interface ItemOwnState {
  isActive: boolean;
  isSelected: boolean;
}

type ItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: (({ isActive, isSelected }: ItemOwnState) => ReactNode) | ReactNode;
} & { value: string };

const Item = forwardRef<HTMLElement, ItemProps>(function Item(
  { value, children, ...props },
  propRef
) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useSelectContext();
  const { ref: itemRef, index } = useListItem({ label: value });
  const ref = useMergeRefs([itemRef, propRef]);

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  const childrenComp =
    typeof children === 'function' ? children({ isActive, isSelected }) : children;

  return (
    <button
      ref={ref}
      role='option'
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      style={{
        background: isActive ? '#ccc' : '',
        fontWeight: isSelected ? 'bold' : '',
      }}
      {...getItemProps({
        ...props,
        onClick: () => handleSelect(index),
      })}>
      {childrenComp}
    </button>
  );
});

export default Item;
