import { FunctionComponent, useCallback, useState } from 'react';

import { TransferList, TransferListProps } from './TransferList';

export const UncontrolledTransferList: FunctionComponent<TransferListProps> = ({
  ids: initialIds,
  onChange,
  ...otherProps
}) => {
  const [ids, setIds] = useState(initialIds);

  const handleChange = useCallback((listId: string, ids: string[]) => {
    setIds((orig) => {
      orig[listId] = [...ids];
      return { ...orig };
    });
  }, []);

  return <TransferList ids={ids} onChange={handleChange} {...otherProps} />;
};
