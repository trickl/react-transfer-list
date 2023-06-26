import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, ReactNode, useContext } from 'react';
import { DraggableProps, DroppableProps } from 'react-beautiful-dnd';

import { DraggableList } from '../DraggableList/DraggableList';
import { TransferListContext } from './TransferListContext';

export interface ListComponentProps {
  id: string;
  children?: ReactNode;
}

export interface ListItemComponentProps {
  listId: string;
  id: string;
  children?: ReactNode;
}

export interface ListItemBodyComponentProps {
  listId: string;
  id: string;
}

const PREFIX = 'TransferListList';

const classes = {
  container: `${PREFIX}-container`,
  list: `${PREFIX}-list`,
};

const Container = styled.div(() => ({
  [`&.${classes.container}`]: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  [`${classes.list}`]: {
    height: '100%',
  },
}));

const StyledDraggableList = styled(DraggableList)(() => ({
  [`&.${classes.list}`]: {
    height: '100%',
  },
}));

export interface TransferListListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onDragEnd' | 'as' | 'placeholder'> {
  id: string;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listComponent?: FunctionComponent<ListComponentProps>;
  listItemComponent?: FunctionComponent<ListItemComponentProps>;
  listItemBodyComponent?: FunctionComponent<ListItemBodyComponentProps>;
  options?: { draggable?: DraggableProps; droppable?: DroppableProps };
}

export const TransferListList: FunctionComponent<TransferListListProps> = ({
  id,
  className,
  options,
  ...otherProps
}) => {
  const { handleDragEnd, listIds } = useContext(TransferListContext);

  return (
    <Container className={cn(classes.container, className)}>
      <StyledDraggableList
        className={classes.list}
        listId={id}
        ids={listIds[id] ?? []}
        onDragEnd={handleDragEnd}
        options={options}
        {...otherProps}
      />
    </Container>
  );
};
