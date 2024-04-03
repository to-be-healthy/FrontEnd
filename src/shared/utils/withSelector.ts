import { useCallback } from 'react';
import { type StoreApi, type UseBoundStore, useStore } from 'zustand';
import { shallow } from 'zustand/shallow';

export const withSelector = <StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>>
) => {
  return function <K extends keyof StateType>(keys: K[]) {
    const selectors = useCallback(
      (state: StateType) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        const obj = {} as any;
        keys.forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          obj[key] = state[key];
        });
        return obj as Pick<StateType, K>;
      },
      [keys]
    );

    return useStore(store, selectors, shallow);
  };
};
