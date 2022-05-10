import React, { ReactNode, useCallback, useMemo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export interface TransferListHandlers {
  handleDragEnd: (result: DropResult) => void;
}
export interface TransferListState extends TransferListHandlers {
  listIds: { [droppableId: string]: string[] };
}

export interface TransferListProps {
  children?: ((handlers: TransferListHandlers) => ReactNode) | ReactNode;
  listIds: { [droppableId: string]: string[] };
  onChange: (droppableId: string, ids: string[]) => void;
}

const TransferListContext = React.createContext<TransferListState>({
  handleDragEnd: () => null,
  listIds: {},
});

const TransferListContextProvider: React.FunctionComponent<
  TransferListProps
> = ({ listIds, children, onChange }) => {
  const handleDropSameList = useCallback(
    ({ source, destination }: DropResult) => {
      const ids = listIds[source.droppableId];

      if (ids == null || destination == null) {
        return;
      }

      const updatedItems = Array.from(ids);

      const [removed] = updatedItems.splice(source.index, 1);
      if (removed) {
        updatedItems.splice(destination.index, 0, removed);
      }

      onChange(source.droppableId, updatedItems);
    },
    [listIds, onChange]
  );

  const handleDropDifferentList = useCallback(
    ({ source, destination }: DropResult) => {
      const sourceIds = listIds[source.droppableId];
      if (sourceIds == null || destination == null) {
        return;
      }

      const destinationIds = listIds[destination.droppableId];

      const updatedSourceItems = Array.from(sourceIds);
      const updatedDestinationItems = Array.from(destinationIds ?? []);

      const [removed] = updatedSourceItems.splice(source.index, 1);
      if (removed) {
        updatedDestinationItems.splice(destination.index, 0, removed);
      }

      onChange(source.droppableId, updatedSourceItems);
      onChange(destination.droppableId, updatedDestinationItems);
    },
    [listIds, onChange]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        handleDropSameList(result);
      } else {
        handleDropDifferentList(result);
      }
    },
    [handleDropSameList, handleDropDifferentList]
  );

  const handlers = useMemo(
    () => ({
      handleDragEnd,
    }),
    [handleDragEnd]
  );

  const state = useMemo(
    () => ({
      ...handlers,
      listIds,
    }),
    [handlers, listIds]
  );

  return (
    <TransferListContext.Provider value={state}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {typeof children === 'function' ? children(handlers) : children}
      </DragDropContext>
    </TransferListContext.Provider>
  );
};

export { TransferListContext, TransferListContextProvider };
