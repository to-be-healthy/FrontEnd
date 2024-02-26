import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * callback refs 및 RefObject(s)와 같은 다양한 유형의 refs를 value로 설정하는 유틸 함수
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * 여러개의 refs를 합성하는 유틸 함수
 * refs: callback refs 혹은 RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

export { composeRefs };
