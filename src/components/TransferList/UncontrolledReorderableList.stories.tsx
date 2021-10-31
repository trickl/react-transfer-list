import InboxIcon from '@mui/icons-material/Inbox';
import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import { Meta, Story } from '@storybook/react';

import { DragHandle } from '../DragHandle/DragHandle';
import { ReorderableListProps } from './ReorderableList';
import { UncontrolledReorderableList } from './UncontrolledReorderableList';

export default {
  title: 'Snowfox/Controls/UncontrolledReorderableList',
  component: UncontrolledReorderableList,
} as Meta;

const Template: Story<ReorderableListProps> = (args) => (
  <UncontrolledReorderableList {...args} />
);

export const SimpleNumberedList = Template.bind({});
SimpleNumberedList.args = {
  ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
};

const CustomListItemBody = ({ id }: { id: string }) => (
  <>
    <ListItemAvatar>
      <Avatar>
        <InboxIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={`item ${id}`}
      secondary={Number(id) % 2 === 0 ? `Whatever for ${id}` : undefined}
    />
  </>
);

export const CustomListItemBodyExample = Template.bind({});
CustomListItemBodyExample.args = {
  ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  listItemBodyComponent: CustomListItemBody,
};

const CustomDragHandle = () => <DragHandle variant="dots2x3" />;

export const CustomDragHandleExample = Template.bind({});
CustomDragHandleExample.args = {
  ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  dragHandleComponent: CustomDragHandle,
};
