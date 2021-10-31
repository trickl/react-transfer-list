import { Meta } from '@storybook/react';
import { ReactElement } from 'react';

import { GripSurface } from './GripSurface';

export default {
  title: 'Snowfox/Controls/GripSurface',
  component: GripSurface,
} as Meta;

export const gripSurface = (): ReactElement => {
  return (
    <GripSurface style={{ width: '8px', height: '12px', padding: '1em' }} />
  );
};
