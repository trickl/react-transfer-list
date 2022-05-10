import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, ReactNode } from 'react';
import { Droppable, OnDragEndResponder } from 'react-beautiful-dnd';

import { DefaultPlaceholder } from './DefaultPlaceholder';
import { DraggableListItem } from './DraggableListItem';

const PREFIX = 'DraggableList';

const classes = {
  list: `${PREFIX}-list`,
  draggingOver: `${PREFIX}-dragging-over`,
};

export interface DraggableListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onDragEnd' | 'placeholder'> {
  ids: string[];
  onDragEnd: OnDragEndResponder;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
  placeholder?: FunctionComponent<Record<string, never>>;
  droppableId?: string;
}

const StyledListContainer = styled.div(() => ({
  [`&.${classes.draggingOver}`]: {},
  [`&.${classes.list}`]: {
    height: '100%',
  },
}));

const StyledList = styled('ul')(() => ({
  paddingRight: '40px',
}));

export const DraggableList: FunctionComponent<DraggableListProps> = ({
  ids,
  onDragEnd,
  droppableId = 'droppable',
  dragHandleComponent,
  listComponent: ListComponent = StyledList,
  listItemComponent,
  listItemBodyComponent,
  placeholder: Placeholder = DefaultPlaceholder,
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
              {ids.length === 0 && <Placeholder />}
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
