import clone from 'lodash/clone';
import { FunctionComponent, useCallback, useReducer } from 'react';

import { TransferList, TransferListProps } from './TransferList';

enum IdsActionKind {
  UpdateIds = 'UPDATE_IDS',
}

type IdsAction = {
  type: IdsActionKind;
  payload: { listId: string; ids: string[] };
};

const idsReducer = (
  state: { [listId: string]: string[] },
  action: IdsAction
): { [listId: string]: string[] } => {
  const { type, payload } = action;
  switch (type) {
    case IdsActionKind.UpdateIds:
      const newState = clone(state);
      newState[payload.listId] = payload.ids;
      return newState;
    default:
      return state;
  }
};

export const UncontrolledTransferList: FunctionComponent<TransferListProps> = ({
  ids: initialIds,
  onChange,
  ...otherProps
}) => {
  const [ids, dispatch] = useReducer(idsReducer, initialIds);

  const handleChange = useCallback(
    (listId: string, ids: string[]) => {
      dispatch({
        type: IdsActionKind.UpdateIds,
        payload: {
          listId,
          ids,
        },
      });
      onChange?.(listId, ids);
    },
    [onChange]
  );
  return <TransferList ids={ids} onChange={handleChange} {...otherProps} />;
};
