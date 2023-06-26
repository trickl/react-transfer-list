import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, useCallback, useMemo } from 'react';
import { DraggableProps, DroppableProps } from 'react-beautiful-dnd';

import { DraggableList } from '../DraggableList/DraggableList';
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
  ids: string[];
  onChange: (ids: string[]) => void;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listComponent?: FunctionComponent<ListComponentProps>;
  listItemComponent?: FunctionComponent<ListItemComponentProps>;
  listItemBodyComponent?: FunctionComponent<ListItemBodyComponentProps>;
  options?: { draggable?: DraggableProps; droppable?: DroppableProps };
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
}) => {
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
