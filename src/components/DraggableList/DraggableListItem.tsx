import { Card, ListItem, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export interface DraggableItemProps {
  id: string;
  index: number;
  dragHandleComponent?: FunctionComponent<Record<string, never>>;
  listItemBodyComponent?: FunctionComponent<{ id: string }>;
}

const useStyles = makeStyles({
  dragHandle: {
    marginRight: '5px',
  },
  dragging: {
    background: 'rgb(235, 235, 235)',
  },
  listItem: {
    marginBottom: '0',
  },
  defaultListItemBodyCard: {
    width: '100%',
    textAlign: 'center',
  },
});

const DefaultListItemBody = ({ id }: { id: string }) => {
  const classes = useStyles();
  return (
    <Card className={classes.defaultListItemBodyCard}>
      <ListItemText primary={<Typography variant="h3">{id}</Typography>} />
    </Card>
  );
};

export const DraggableListItem: FunctionComponent<DraggableItemProps> = ({
  index,
  id,
  dragHandleComponent: DragHandleComponent,
  listItemBodyComponent: ListItemBodyComponent = DefaultListItemBody,
}) => {
  const classes = useStyles();
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(DragHandleComponent == null
            ? { ...provided.dragHandleProps }
            : undefined)}
          disableGutters={true}
          className={cn(
            classes.listItem,
            snapshot.isDragging ? classes.dragging : undefined
          )}
        >
          {DragHandleComponent && (
            <div className={classes.dragHandle} {...provided.dragHandleProps}>
              <DragHandleComponent />
            </div>
          )}
          <ListItemBodyComponent id={id} />
        </ListItem>
      )}
    </Draggable>
  );
};
