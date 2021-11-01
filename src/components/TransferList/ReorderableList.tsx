import { styled } from '@mui/styles';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, useCallback, useMemo } from 'react';

import { DraggableList } from '../DraggableList/DraggableList';
import { TransferListContextProvider } from './TransferListContext';

const PREFIX = 'ReorderableList';

const classes = {
  container: `${PREFIX}-container`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(1),
  },
}));

export interface ReorderableListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  ids: string[];
  onChange: (ids: string[]) => void;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
}

export const ReorderableList: FunctionComponent<ReorderableListProps> = ({
  ids,
  onChange,
  className,
  dragHandleComponent,
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
    <StyledDiv className={cn(classes.container, className)}>
      <TransferListContextProvider listIds={listIds} onChange={handleChange}>
        {({ handleDragEnd }) => (
          <DraggableList
            droppableId="droppable"
            ids={listIds['droppable']}
            onDragEnd={handleDragEnd}
            {...{ dragHandleComponent, listItemBodyComponent }}
          />
        )}
      </TransferListContextProvider>
    </StyledDiv>
  );
};
