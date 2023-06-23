import { useContext } from 'react';

import { TransferListContext, TransferListIds } from './TransferListContext';

export const useTransferListIds = (): TransferListIds => {
  const context = useContext(TransferListContext);

  if (context == null) {
    throw new Error(
      'useTransferList must be used within a TransferList component.'
    );
  }

  const { listIds } = context;

  return listIds;
};
