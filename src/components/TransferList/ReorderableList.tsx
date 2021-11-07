import styled from '@emotion/styled';
import cn from 'classnames';
import {
  FunctionComponent,
  HTMLProps,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

import { DraggableList } from '../DraggableList/DraggableList';
import { TransferListContextProvider } from './TransferListContext';

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
  listComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemComponent?: FunctionComponent<{ children?: ReactNode }>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
}

export const ReorderableList: FunctionComponent<ReorderableListProps> = ({
  ids,
  onChange,
  className,
  dragHandleComponent,
  listComponent,
  listItemComponent,
  listItemBodyComponent,
}) => {
  const handleChange = useCallback(
    (_, ids) => {
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
            droppableId="droppable"
            ids={listIds['droppable']}
            onDragEnd={handleDragEnd}
            {...{
              dragHandleComponent,
              listComponent,
              listItemComponent,
              listItemBodyComponent,
            }}
          />
        )}
      </TransferListContextProvider>
    </Container>
  );
};
