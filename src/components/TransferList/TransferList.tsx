import styled from '@emotion/styled';
import cn from 'classnames';
import { FunctionComponent, HTMLProps, useCallback } from 'react';

import { TransferListContextProvider } from './TransferListContext';

const PREFIX = 'TransferList';

const classes = {
  container: `${PREFIX}-container`,
};

const Container = styled('div')(() => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export interface TransferListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  ids: { [droppableId: string]: string[] };
  onChange?: (droppableId: string, ids: string[]) => void;
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
    <Container className={cn(classes.container, className)}>
      <TransferListContextProvider listIds={ids} onChange={handleChange}>
        {children}
      </TransferListContextProvider>
    </Container>
  );
};
