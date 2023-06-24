import { Card, List, ListItem, Paper, Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';

import { TransferListProps } from './TransferList';
import { TransferListList, TransferListListProps } from './TransferListList';
import { UncontrolledTransferList } from './UncontrolledTransferList';

export default {
  title: 'Transfer List',
  component: UncontrolledTransferList,
} as Meta;

const UnstyledTemplate: Story<TransferListProps> = (args) => (
  <UncontrolledTransferList {...args}>
    <TransferListList
      id="first"
      style={{ height: '100%', background: 'beige', margin: '10px' }}
    />
    <TransferListList
      id="second"
      style={{ height: '100%', background: 'aliceblue', margin: '10px' }}
    />
  </UncontrolledTransferList>
);

export const UnstyledList = UnstyledTemplate.bind({});
UnstyledList.args = {
  ids: {
    first: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  },
};

const ListItemBody = ({ id }: { id: string }) => (
  <Card sx={{ minWidth: '100px', textAlign: 'center' }}>
    <Typography variant="h3">{id}</Typography>
  </Card>
);

const MaterialList = ({ children }: { children?: ReactNode }) => (
  <Paper sx={{ height: '100%', minHeight: '100px', margin: '10px' }}>
    <List>{children}</List>
  </Paper>
);

const listProps: Partial<TransferListListProps> = {
  listComponent: MaterialList,
  listItemComponent: ({ children }) => <ListItem>{children}</ListItem>,
  listItemBodyComponent: ListItemBody,
};

const TwoListTemplate: Story<TransferListProps> = (args) => (
  <UncontrolledTransferList {...args}>
    <TransferListList id="first" {...listProps} />
    <TransferListList id="second" {...listProps} />
  </UncontrolledTransferList>
);

export const MaterialUIExample = TwoListTemplate.bind({});
MaterialUIExample.args = {
  ids: {
    first: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  },
};

const ThreeListTemplate: Story<TransferListProps> = (args) => (
  <UncontrolledTransferList {...args}>
    <TransferListList id="first" {...listProps} />
    <TransferListList id="second" {...listProps} />
    <TransferListList id="third" {...listProps} />
  </UncontrolledTransferList>
);

export const ThreeWayExample = ThreeListTemplate.bind({});
ThreeWayExample.args = {
  ids: {
    first: Array.from({ length: 3 }).map((_, i) => String(i + 1)),
    second: Array.from({ length: 3 }).map((_, i) => String(i + 4)),
    third: Array.from({ length: 3 }).map((_, i) => String(i + 7)),
  },
};
