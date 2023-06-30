import styled from '@emotion/styled';
import cn from 'classnames';
import {
  ListComponentProps,
  ListItemBodyComponentProps,
  ListItemComponentProps,
} from 'components/TransferList/TransferListList';
import { FunctionComponent, HTMLProps } from 'react';
import {
  DraggableProps,
  Droppable,
  DroppableProps,
  OnDragEndResponder,
} from 'react-beautiful-dnd';

import { DefaultPlaceholder } from './DefaultPlaceholder';
import { DraggableListItem } from './DraggableListItem';

const PREFIX = 'DraggableList';

const classes = {
  list: `${PREFIX}-list`,
  draggingOver: `${PREFIX}-dragging-over`,
};

export interface DraggableListOptions {
  draggable?: Omit<DraggableProps, 'draggableId' | 'index' | 'children'>;
  droppable?: Omit<DroppableProps, 'droppableId' | 'children'>;
}

export interface DraggableListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onDragEnd' | 'placeholder'> {
  ids: string[];
  onDragEnd: OnDragEndResponder;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listComponent?: FunctionComponent<ListComponentProps>;
  listItemComponent?: FunctionComponent<ListItemComponentProps>;
  listItemBodyComponent?: FunctionComponent<ListItemBodyComponentProps>;
  placeholder?: FunctionComponent<Record<string, never>>;
  listId?: string;
  options?: DraggableListOptions;
}

const StyledListContainer = styled.div(() => ({
  [`&.${classes.draggingOver}`]: {},
  [`&.${classes.list}`]: {
    height: '100%',
  },
}));

const DefaultListComponent: FunctionComponent<ListComponentProps> = ({
  id,
  children,
}) => <ol>{children} </ol>;

const StyledDefaultListComponent = styled(DefaultListComponent)(() => ({
  paddingRight: '40px',
}));

export const DraggableList: FunctionComponent<DraggableListProps> = ({
  ids,
  onDragEnd,
  listId = 'droppable',
  dragHandleComponent,
  listComponent: ListComponent = StyledDefaultListComponent,
  listItemComponent,
  listItemBodyComponent,
  placeholder: Placeholder = DefaultPlaceholder,
  options = {},
  ...otherProps
}) => {
  return (
    <Droppable {...options.droppable} droppableId={listId}>
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
            <ListComponent id={listId}>
              {ids.length === 0 && <Placeholder />}
              {ids.map((id, index) => (
                <DraggableListItem
                  {...options.draggable}
                  index={index}
                  key={id}
                  id={id}
                  listId={listId}
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
