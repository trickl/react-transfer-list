import { Paper } from '@mui/material';
import { Meta, Story } from '@storybook/react';

import { DragHandle, DragHandleProps } from './DragHandle';

export default {
  title: 'Snowfox/Controls/DragHandle',
  component: DragHandle,
} as Meta;

const Template: Story<DragHandleProps> = (args) => (
  <Paper>
    <DragHandle {...args} />
  </Paper>
);

export const Dots2x3 = Template.bind({});
Dots2x3.args = {
  variant: 'dots2x3',
};

export const Dots3x2 = Template.bind({});
Dots3x2.args = {
  variant: 'dots3x2',
};

export const Dots3x3 = Template.bind({});
Dots3x3.args = {
  variant: 'dots3x3',
};
