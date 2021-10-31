import { List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { FunctionComponent, HTMLProps } from 'react';
import { Droppable, OnDragEndResponder } from 'react-beautiful-dnd';

import { DraggableListItem } from './DraggableListItem';

export interface DraggableListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onDragEnd'> {
  ids: string[];
  onDragEnd: OnDragEndResponder;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
  droppableId?: string;
}

const useStyles = makeStyles({
  draggingOver: {
    // border: '1px dashed lightblue',
  },
  list: {
    height: '100%',
  },
});

export const DraggableList: FunctionComponent<DraggableListProps> = ({
  ids,
  onDragEnd,
  droppableId = 'droppable',
  dragHandleComponent,
  listItemBodyComponent,
  ...otherProps
}) => {
  const classes = useStyles();
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...otherProps}
        >
          <List
            className={cn(
              classes.list,
              snapshot.isDraggingOver ? classes.draggingOver : undefined
            )}
          >
            {ids.map((id, index) => (
              <DraggableListItem
                index={index}
                key={id}
                id={id}
                {...{ dragHandleComponent, listItemBodyComponent }}
              />
            ))}
            {provided.placeholder}
          </List>
        </div>
      )}
    </Droppable>
  );
};
