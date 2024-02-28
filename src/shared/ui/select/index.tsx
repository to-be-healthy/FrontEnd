import Content from './Content';
import Item from './Item';
import Trigger from './Trigger';
import { SelectContext, type SelectOptions, useSelect } from './useSelect';

export default function Select({
  children,
  ...options
}: React.PropsWithChildren<SelectOptions>) {
  const listBox = useSelect(options);
  return <SelectContext.Provider value={listBox}>{children}</SelectContext.Provider>;
}

Select.Root = Select;
Select.Content = Content;
Select.Trigger = Trigger;
Select.Item = Item;
