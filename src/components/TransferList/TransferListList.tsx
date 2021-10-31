import { Paper, styled } from '@mui/material';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, useContext } from 'react';

import { DraggableList } from '../DraggableList/DraggableList';
import { TransferListContext } from './TransferListContext';

const PREFIX = 'TransferListList';

const classes = {
  container: `${PREFIX}-container`,
  list: `${PREFIX}-list`,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    minWidth: 100,
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
  extends Omit<HTMLProps<HTMLDivElement>, 'onDragEnd' | 'as'> {
  id: string;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
}

export const TransferListList: FunctionComponent<TransferListListProps> = ({
  id,
  className,
  ...otherProps
}) => {
  const { handleDragEnd, listIds } = useContext(TransferListContext);

  return (
    <StyledPaper className={cn(classes.container, className)}>
      <StyledDraggableList
        className={classes.list}
        droppableId={id}
        ids={listIds[id] ?? []}
        onDragEnd={handleDragEnd}
        {...otherProps}
      />
    </StyledPaper>
  );
};
