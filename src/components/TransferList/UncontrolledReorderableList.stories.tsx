import DragIndicator from '@mui/icons-material/DragIndicator';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import { UncontrolledReorderableList } from './UncontrolledReorderableList';

const meta = {
  component: UncontrolledReorderableList,
} satisfies Meta<typeof UncontrolledReorderableList>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const UnstyledList: Story = {
  render: (args) => <UncontrolledReorderableList {...args} />,
  args: {
    ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  },
};

export const MaterialUIExample: Story = {
  render: (args) => <UncontrolledReorderableList {...args} />,
  args: {
    ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
    listComponent: List,
    listItemComponent: ({ children }) => <ListItem>{children}</ListItem>,
    listItemBodyComponent: ListItemBody,
  },
};

export const WithDragHandle: Story = {
  render: (args) => <UncontrolledReorderableList {...args} />,
  args: {
    ids: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
    dragHandleComponent: DragIndicator,
    listComponent: List,
    listItemComponent: ({ children }) => <ListItem>{children}</ListItem>,
    listItemBodyComponent: ListItemBody,
  },
};
