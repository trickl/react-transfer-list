import styled from '@emotion/styled';
import cn from 'classnames';
import { DraggableListItemBodyProps } from 'components/DraggableList/DraggableListItem';
import { FunctionComponent, HTMLProps, ReactNode, useContext } from 'react';

import { DraggableList } from '../DraggableList/DraggableList';
import { TransferListContext } from './TransferListContext';

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

const StyledDraggableList = styled(DraggableList)(({ theme }) => ({
  [`&.${classes.list}`]: {
    height: '100%',
  },
}));

export interface TransferListListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onDragEnd' | 'as' | 'placeholder'> {
  id: string;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemBodyComponent?: FunctionComponent<DraggableListItemBodyProps>;
}

export const TransferListList: FunctionComponent<TransferListListProps> = ({
  id,
  className,
  ...otherProps
}) => {
  const { handleDragEnd, listIds } = useContext(TransferListContext);

  return (
    <Container className={cn(classes.container, className)}>
      <StyledDraggableList
        className={classes.list}
        droppableId={id}
        ids={listIds[id] ?? []}
        onDragEnd={handleDragEnd}
        {...otherProps}
      />
    </Container>
  );
};
