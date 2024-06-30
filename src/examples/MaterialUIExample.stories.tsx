import { List, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode, useState } from 'react';

import { TransferList } from '../components/TransferList/TransferList';
import { TransferListList } from '../components/TransferList/TransferListList';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

interface TransferListProps {
  ids: {
    first: readonly number[];
    second: readonly number[];
  };
}

function MaterialUITransferList({ ids }: TransferListProps) {
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<readonly number[]>(ids.first);
  const [right, setRight] = useState<readonly number[]>(ids.second);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleChange = (listId: string, ids: string[]) => {
    if (listId === 'left') {
      setLeft(ids.map(Number));
    } else {
      setRight(ids.map(Number));
    }
  };

  const ListItemComponent: FunctionComponent<{
    value: number;
    children?: ReactNode;
  }> = ({ value, children }) => {
    return (
      <ListItemButton key={value} role="listitem" onClick={handleToggle(value)}>
        {children}
      </ListItemButton>
    );
  };

  const ListItemBodyComponent: FunctionComponent<{ value: number }> = ({
    value,
  }) => {
    const labelId = `transfer-list-item-${value}-label`;
    return (
      <>
        <ListItemIcon>
          <Checkbox
            checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`List item ${value + 1}`} />
      </>
    );
  };

  const customList = (id: string) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <TransferListList
        id={id}
        listComponent={({ children }: { children?: ReactNode }) => (
          <List dense component="div" role="list">
            {children}
          </List>
        )}
        listItemComponent={({ id, children }) => (
          <ListItemComponent value={Number(id)}>{children}</ListItemComponent>
        )}
        listItemBodyComponent={({ id }) => (
          <ListItemBodyComponent value={Number(id)} />
        )}
      />
    </Paper>
  );

  return (
    <TransferList
      ids={{
        left: left.map(String),
        right: right.map(String),
      }}
      onChange={handleChange}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList('left')}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('right')}</Grid>
      </Grid>
    </TransferList>
  );
}

const meta = {
  component: MaterialUITransferList,
} satisfies Meta<typeof MaterialUITransferList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaterialUIExample: Story = {
  render: (args) => <MaterialUITransferList {...args} />,
  args: {
    ids: {
      first: Array.from({ length: 4 }).map((_, i) => i),
      second: Array.from({ length: 4 }).map((_, i) => i + 4),
    },
  },
};
