import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, ReactNode, useContext } from 'react';

import {
  DraggableList,
  DraggableListOptions,
} from '../DraggableList/DraggableList';
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
  /** The id of the list. */
  id: string;

  /** Specify a custom component to render a drag handle. */
  dragHandleComponent?: FunctionComponent<Record<string, never>>;

  /** Specify a custom component to render the list container.
   * Defaults to a ol element
   */
  listComponent?: FunctionComponent<ListComponentProps>;

  /** Specify a custom component to render the list item container.
   * Defaults to a li element
   */
  listItemComponent?: FunctionComponent<ListItemComponentProps>;

  /** Specify a custom component to render the body of each list item.
   *  Defaults to a span element containing the id of the item.
   */
  listItemBodyComponent?: FunctionComponent<ListItemBodyComponentProps>;

  /** Additional configuration options for drag and drop behaviour. */
  options?: DraggableListOptions;
}

/**
 * A list holding items that can receive or send items to other lists.
 */
export const TransferListList: FunctionComponent<TransferListListProps> = ({
  id,
  className,
  options,
  ...otherProps
}: TransferListListProps) => {
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
