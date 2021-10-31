import { clone } from 'lodash';
import { FunctionComponent, useCallback, useReducer } from 'react';

import { TransferList, TransferListProps } from './TransferList';

enum IdsActionKind {
  UpdateIds = 'UPDATE_IDS',
}

type IdsAction = {
  type: IdsActionKind;
  payload: { droppableId: string; ids: string[] };
};

const idsReducer = (
  state: { [droppableId: string]: string[] },
  action: IdsAction
): { [droppableId: string]: string[] } => {
  const { type, payload } = action;
  switch (type) {
    case IdsActionKind.UpdateIds:
      const newState = clone(state);
      newState[payload.droppableId] = payload.ids;
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
    (droppableId: string, ids: string[]) => {
      dispatch({
        type: IdsActionKind.UpdateIds,
        payload: {
          droppableId,
          ids,
        },
      });
      onChange?.(droppableId, ids);
    },
    [onChange]
  );
  return <TransferList ids={ids} onChange={handleChange} {...otherProps} />;
};
