import { Meta, Story } from '@storybook/react';

import { TransferListProps } from './TransferList';
import { TransferListList } from './TransferListList';
import { UncontrolledTransferList } from './UncontrolledTransferList';

export default {
  title: 'Snowfox/Controls/UncontrolledTransferList',
  component: UncontrolledTransferList,
} as Meta;

const TwoListTemplate: Story<TransferListProps> = (args) => (
  <UncontrolledTransferList {...args}>
    <TransferListList id="first" />
    <TransferListList id="second" />
  </UncontrolledTransferList>
);

export const SimpleTransferList = TwoListTemplate.bind({});
SimpleTransferList.args = {
  ids: {
    first: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  },
};

const ThreeListTemplate: Story<TransferListProps> = (args) => (
  <UncontrolledTransferList {...args}>
    <TransferListList id="first" />
    <TransferListList id="second" />
    <TransferListList id="third" />
  </UncontrolledTransferList>
);

export const ThreeWayTransferList = ThreeListTemplate.bind({});
ThreeWayTransferList.args = {
  ids: {
    first: Array.from({ length: 3 }).map((_, i) => String(i + 1)),
    second: Array.from({ length: 3 }).map((_, i) => String(i + 4)),
    third: Array.from({ length: 3 }).map((_, i) => String(i + 7)),
  },
};
