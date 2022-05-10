import { FunctionComponent, useCallback, useState } from 'react';

import { ReorderableList, ReorderableListProps } from './ReorderableList';

export const UncontrolledReorderableList: FunctionComponent<
  ReorderableListProps
> = ({ ids: initialIds, onChange, ...otherProps }) => {
  const [ids, setIds] = useState<string[]>(initialIds);
  const handleChange = useCallback(
    (ids: string[]) => {
      setIds(ids);
      onChange?.(ids);
    },
    [onChange]
  );
  return <ReorderableList ids={ids} onChange={handleChange} {...otherProps} />;
};
