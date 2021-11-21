import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export interface DraggableListItemBodyProps {
  id: string;
}

export interface DraggableItemProps {
  id: string;
  index: number;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listItemComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemBodyComponent?: FunctionComponent<DraggableListItemBodyProps>;
}

const PREFIX = 'DraggableListItem';

const classes = {
  dragHandle: `${PREFIX}-drag-handle`,
  dragging: `${PREFIX}-dragging`,
  listItem: `${PREFIX}-list-item`,
  defaultListItemBodyCard: `${PREFIX}-default-list-item-body-card`,
};

const StyledListItemContainer = styled.div(() => ({
  [`&.${classes.dragHandle}`]: {
    marginRight: '5px',
  },
  [`&.${classes.dragging}`]: {
    opacity: 0.8,
  },
  [`&.${classes.listItem}`]: {
    marginBottom: '0',
  },
}));

const DefaultListItemBody = ({ id }: DraggableListItemBodyProps) => {
  return <span>{id}</span>;
};

export const DraggableListItem: FunctionComponent<DraggableItemProps> = ({
  index,
  id,
  dragHandleComponent: DragHandleComponent,
  listItemComponent: ListItemComponent = 'li',
  listItemBodyComponent: ListItemBodyComponent = DefaultListItemBody,
}) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <StyledListItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(DragHandleComponent == null
            ? { ...provided.dragHandleProps }
            : undefined)}
          className={cn(
            classes.listItem,
            snapshot.isDragging ? classes.dragging : undefined
          )}
        >
          <ListItemComponent>
            {DragHandleComponent && (
              <div className={classes.dragHandle} {...provided.dragHandleProps}>
                <DragHandleComponent />
              </div>
            )}
            <ListItemBodyComponent id={id} />
          </ListItemComponent>
        </StyledListItemContainer>
      )}
    </Draggable>
  );
};
