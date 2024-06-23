import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent } from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';

import {
  ListItemBodyComponentProps,
  ListItemComponentProps,
} from '../../components/TransferList/TransferListList';

export interface DraggableItemProps
  extends Omit<DraggableProps, 'draggableId' | 'children'> {
  id: string;
  listId: string;
  index: number;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listItemComponent?: FunctionComponent<ListItemComponentProps>;
  listItemBodyComponent?: FunctionComponent<ListItemBodyComponentProps>;
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

const DefaultListItemComponent = ({
  listId,
  id,
  children,
}: ListItemComponentProps) => {
  return <li key={id}>{children}</li>;
};

const DefaultListItemBody = ({ id }: ListItemBodyComponentProps) => {
  return <span key={id}>{id}</span>;
};

export const DraggableListItem: FunctionComponent<DraggableItemProps> = ({
  index,
  id,
  listId,
  dragHandleComponent: DragHandleComponent,
  listItemComponent: ListItemComponent = DefaultListItemComponent,
  listItemBodyComponent: ListItemBodyComponent = DefaultListItemBody,
  ...otherProps
}) => {
  return (
    <Draggable key={id} draggableId={id} index={index} {...otherProps}>
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
          <ListItemComponent id={id} listId={listId}>
            {DragHandleComponent && (
              <div className={classes.dragHandle} {...provided.dragHandleProps}>
                <DragHandleComponent />
              </div>
            )}
            <ListItemBodyComponent id={id} listId={listId} />
          </ListItemComponent>
        </StyledListItemContainer>
      )}
    </Draggable>
  );
};
