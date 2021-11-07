import { DragIndicator } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Meta, Story } from '@storybook/react';

import { ReorderableListProps } from './ReorderableList';
import { UncontrolledReorderableList } from './UncontrolledReorderableList';

export default {
  title: 'Reorderable List',
  component: UncontrolledReorderableList,
} as Meta;

const Template: Story<ReorderableListProps> = (args) => (
  <UncontrolledReorderableList {...args} />
);

export const UnstyledList = Template.bind({});
UnstyledList.args = {
  ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
};

const ListItemBody = ({ id }: { id: string }) => (
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

export const MaterialUIExample = Template.bind({});
MaterialUIExample.args = {
  ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  listComponent: List,
  listItemComponent: ListItem,
  listItemBodyComponent: ListItemBody,
};

export const WithDragHandle = Template.bind({});
WithDragHandle.args = {
  ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  dragHandleComponent: DragIndicator,
  listComponent: List,
  listItemComponent: ListItem,
  listItemBodyComponent: ListItemBody,
};
