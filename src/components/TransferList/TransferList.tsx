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
  /** The ids of the lists and the respective ids of each item in each list. */
  ids: { [listId: string]: string[] };

  /** Called when a request to change the items in a list is made. */
  onChange?: (listId: string, ids: string[]) => void;
}

/**
 * The `TransferList` component is a container for two or more lists of items that can be moved between lists.
 */
export const TransferList: FunctionComponent<TransferListProps> = ({
  ids,
  onChange,
  className,
  children,
}: TransferListProps) => {
  const handleChange = useCallback(
    (listId: string, ids: string[]) => {
      onChange?.(listId, ids);
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
