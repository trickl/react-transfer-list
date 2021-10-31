import { render } from '@testing-library/react';

import { ReorderableList } from './ReorderableList';

describe('<ReorderableList />', () => {
  test('Shows list items', () => {
    const handleOnChange = jest.fn();
    const list = render(
      <ReorderableList ids={['1', '2', '3']} onChange={handleOnChange} />
    );
    expect(list.getByText('1')).toBeDefined();
    expect(list.getByText('2')).toBeDefined();
    expect(list.getByText('3')).toBeDefined();
  });
});
