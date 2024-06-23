import styled from '@emotion/styled';
import { FunctionComponent } from 'react';

const Container = styled('div')((theme) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100px',
  minWidth: '100px',
  padding: '10px',
}));

export const DefaultPlaceholder: FunctionComponent<
  Record<string, never>
> = () => {
  return <Container>No items selected</Container>;
};
