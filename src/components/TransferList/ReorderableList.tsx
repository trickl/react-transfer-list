import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, useCallback, useMemo } from 'react';

import {
  DraggableList,
  DraggableListOptions,
} from '../DraggableList/DraggableList';
import { TransferListContextProvider } from './TransferListContext';
import {
  ListComponentProps,
  ListItemBodyComponentProps,
  ListItemComponentProps,
} from './TransferListList';

const PREFIX = 'ReorderableList';

const classes = {
  container: `${PREFIX}-container`,
};

const Container = styled('div')(() => ({
  [`&.${classes.container}`]: {},
}));

export interface ReorderableListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  /** The ids of the items in the list. */
  ids: string[];

  /** Called when a request to change the order of the items is made. */
  onChange: (ids: string[]) => void;

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

export const ReorderableList: FunctionComponent<ReorderableListProps> = ({
  ids,
  onChange,
  className,
  dragHandleComponent,
  listComponent,
  listItemComponent,
  listItemBodyComponent,
  options,
}: ReorderableListProps) => {
  const handleChange = useCallback(
    (_: string, ids: string[]) => {
      onChange(ids);
    },
    [onChange]
  );

  const listIds = useMemo(() => ({ droppable: ids }), [ids]);

  return (
    <Container className={cn(classes.container, className)}>
      <TransferListContextProvider listIds={listIds} onChange={handleChange}>
        {({ handleDragEnd }) => (
          <DraggableList
            listId="droppable"
            ids={listIds['droppable']}
            onDragEnd={handleDragEnd}
            {...{
              dragHandleComponent,
              listComponent,
              listItemComponent,
              listItemBodyComponent,
            }}
            options={options}
          />
        )}
      </TransferListContextProvider>
    </Container>
  );
};
