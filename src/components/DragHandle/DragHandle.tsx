import { makeStyles } from '@mui/styles';
import { FunctionComponent, HTMLProps } from 'react';

import { GripSurface, GripSurfaceProps } from '../GripSurface/GripSurface';

enum DragHandleVariant {
  'dots2x3',
  'dots3x2',
  'dots3x3',
}

export type DragHandleVariantType = keyof typeof DragHandleVariant;

interface DragHandleVariantDefinition {
  width: string;
  height: string;
  surface: GripSurfaceProps['variant'];
}

const variants: {
  [key in keyof typeof DragHandleVariant]: DragHandleVariantDefinition;
} = {
  dots2x3: {
    width: '12px',
    height: '18px',
    surface: 'dots',
  },
  dots3x2: {
    width: '18px',
    height: '12px',
    surface: 'dots',
  },
  dots3x3: {
    width: '18px',
    height: '18px',
    surface: 'dots',
  },
};

const useStyles = makeStyles({
  surface: {
    width: ({ variant }: { variant: DragHandleVariantType }) =>
      variants[variant]?.width,
    height: ({ variant }: { variant: DragHandleVariantType }) =>
      variants[variant]?.height,
  },
});

export interface DragHandleProps extends HTMLProps<HTMLDivElement> {
  variant?: DragHandleVariantType;
}

export const DragHandle: FunctionComponent<DragHandleProps> = ({
  variant = 'dots2x3',
  ...otherProps
}) => {
  const classes = useStyles({ variant });
  return (
    <div {...otherProps}>
      <GripSurface
        className={classes.surface}
        variant={variants[variant]?.surface}
      />
    </div>
  );
};
