import { styled } from '@mui/styles';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, useCallback } from 'react';

import { TransferListContextProvider } from './TransferListContext';

const PREFIX = 'TransferList';

const classes = {
  container: `${PREFIX}-container`,
};

const StyledDiv = styled('div')(({ theme }: { theme: Theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
}));

export interface TransferListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  ids: { [droppableId: string]: string[] };
  onChange?: (droppableId: string, ids: string[]) => void;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
}

export const TransferList: FunctionComponent<TransferListProps> = ({
  ids,
  onChange,
  className,
  children,
}) => {
  const handleChange = useCallback(
    (droppableId: string, ids: string[]) => {
      onChange?.(droppableId, ids);
    },
    [onChange]
  );

  return (
    <StyledDiv className={cn(classes.container, className)}>
      <TransferListContextProvider listIds={ids} onChange={handleChange}>
        {children}
      </TransferListContextProvider>
    </StyledDiv>
  );
};
