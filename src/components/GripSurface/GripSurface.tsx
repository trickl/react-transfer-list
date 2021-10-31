import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { FunctionComponent, HTMLProps } from 'react';

const useStyles = makeStyles({
  surface: {
    border: 'none',
    verticalAlign: 'middle',
    backgroundColor: 'transparent',
    backgroundImage:
      'radial-gradient(grey 30%, transparent 0), radial-gradient(grey 30%, transparent 0)',
    backgroundSize: (variant) => {
      switch (variant) {
        case 'small-dots':
          return '4px 4px';
        case 'large-dots':
          return '8px 8px';
        case 'dots':
        default:
          return '6px 6px';
      }
    },
    backgroundRepeat: 'repeat',
    opacity: 0.5,

    '&:hover': {
      opacity: 1.0,
      cursor: 'grab',
      '&:active': {
        cursor: 'grabbing',
      },
    },
  },
});

export interface GripSurfaceProps extends HTMLProps<HTMLDivElement> {
  variant?: 'small-dots' | 'dots' | 'large-dots';
}

export const GripSurface: FunctionComponent<GripSurfaceProps> = ({
  variant = 'dots',
  className,
  ...otherProps
}) => {
  const classes = useStyles({ variant });
  return <div className={cn(className, classes.surface)} {...otherProps} />;
};
