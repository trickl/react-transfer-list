import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, ReactNode } from 'react';
import { Droppable, OnDragEndResponder } from 'react-beautiful-dnd';

import { DraggableListItem } from './DraggableListItem';

const PREFIX = 'DraggableList';

const classes = {
  list: `${PREFIX}-list`,
  draggingOver: `${PREFIX}-dragging-over`,
};

export interface DraggableListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onDragEnd'> {
  ids: string[];
  onDragEnd: OnDragEndResponder;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
  droppableId?: string;
}

const StyledListContainer = styled.div(() => ({
  [`&.${classes.draggingOver}`]: {},
  [`&.${classes.list}`]: {
    height: '100%',
    minWidth: '100px',
    minHeight: '100px',
  },
}));

export const DraggableList: FunctionComponent<DraggableListProps> = ({
  ids,
  onDragEnd,
  droppableId = 'droppable',
  dragHandleComponent,
  listComponent: ListComponent = 'ul',
  listItemComponent,
  listItemBodyComponent,
  ...otherProps
}) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...otherProps}
        >
          <StyledListContainer
            className={cn(
              classes.list,
              snapshot.isDraggingOver ? classes.draggingOver : undefined
            )}
          >
            <ListComponent>
              {ids.map((id, index) => (
                <DraggableListItem
                  index={index}
                  key={id}
                  id={id}
                  {...{
                    dragHandleComponent,
                    listItemComponent,
                    listItemBodyComponent,
                  }}
                />
              ))}
              {provided.placeholder}
            </ListComponent>
          </StyledListContainer>
        </div>
      )}
    </Droppable>
  );
};
