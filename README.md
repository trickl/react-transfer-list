# React Transfer List
[![Build Status](https://app.travis-ci.com/trickl/react-transfer-list.svg?branch=master)](https://app.travis-ci.com/trickl/react-transfer-list)
[![Maintainability](https://api.codeclimate.com/v1/badges/b5f92597060361dda169/maintainability)](https://codeclimate.com/github/trickl/react-transfer-list/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b5f92597060361dda169/test_coverage)](https://codeclimate.com/github/trickl/react-transfer-list/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM](https://img.shields.io/npm/v/react-transfer-list)](https://www.npmjs.com/package/react-transfer-list)
[![Storybook](https://github.com/storybookjs/brand/blob/master/badge/badge-storybook.svg)](https://www.chromatic.com/build?appId=617ed0e7e88637004aa2ac53)

Welcome to the repository for our Transfer List Component—a dynamic, user-friendly UI interface element designed for efficiently managing selections from a sizable set of options. This component enhances user interaction by allowing for an intuitive and visual shifting of items between two lists: available items and selected items. Users can easily select, filter, and move multiple items between these lists, providing a clear view of their choices at any given time.

## Why Use a Transfer List?

While both transfer lists and multi-select dropdowns serve the function of allowing users to make multiple selections, the transfer list offers several distinct advantages:

### Enhanced Usability
The transfer list component visually separates available options and selected items into two distinct columns, making it easier for users to review their selections. This separation is particularly useful when dealing with large numbers of choices, reducing the cognitive load on users and minimizing selection errors.

### Improved Interaction
Transfer lists support various operations such as filtering, searching, and sorting within each list, enhancing the user's ability to manage large sets of data effectively. This is a significant improvement over multi-select dropdowns, which can become cumbersome and difficult to navigate as the number of options grows.

### Better Organization
The dual-list format allows users to clearly see which items have been selected and which are still available, providing a more organized interface compared to the scrolling necessary in multi-select dropdowns. This organization is crucial in scenarios where clarity and precision of selection are important.

### Versatility and Flexibility
This component is versatile and can be easily adapted for different applications, supporting both simple and complex data structures. It is also highly customizable to fit the specific needs of your application, whether you need to adjust the layout, styling, or functionality.

Explore our repository to find out how the Transfer List Component can enhance your application's interface by providing a more structured, intuitive, and user-friendly selection mechanism. Happy coding!

## Basic Example Visualisation (not interactive)
![Transfer List Example Gif](https://github.com/trickl/react-transfer-list/blob/master/gifs/TransferListExample.gif)

## Interactive Examples
Available here [![Storybook](https://github.com/storybookjs/brand/blob/master/badge/badge-storybook.svg)](https://www.chromatic.com/build?appId=617ed0e7e88637004aa2ac53)

## Install
```bash
npm i react-transfer-list
```

## Features
* Highly Customizable
* Only requires [emotion](https://emotion.sh/docs/introduction) and [React](https://reactjs.org/)

## Documentation 

### Usage

### TransferList

```<TransferList />``` is the top level component for holding lists that can exchange items.

```jsx
import { useCallback, useState } from 'react';
import { TransferList, TransferListList } from 'react-transfer-list';

const App = () => {
  const initialIds: Record<string, string[]> = {
    first: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  };
  const [ids, setIds] = useState(initialIds);

  const handleChange = useCallback((listId: string, ids: string[]) => {
    setIds((orig) => {
      orig[listId] = [...ids];
      return {...orig};
    });
  }, []);

  return (
    <TransferList ids={ids} onChange={handleChange}>
      <TransferListList
        id="first"
        style={{ height: '100%', background: 'beige', margin: '10px' }}
      />
      <TransferListList
        id="second"
        style={{ height: '100%', background: 'aliceblue', margin: '10px' }}
      />
    </TransferList>
  );
};

```
### Adding buttons

To add buttons controlling behaviour, add click handlers to directly manipulate the ids.
For example, to transfer all items from one list to another, you could use the following click handler

```jsx
const transferAll = (from: string, to: string) => {
    handleChange(to, ids[from] ?? []);
    handleChange(from, []);
  }
```

<!-- props-table-start -->
#### Properties

| Property | PropType | Required | Default | Description |
|----------|----------|----------|---------|-------------|
| ids | ```Record<string, string[]>``` | yes |  | The ids of the lists and the respective ids of each item in each list. |
| onChange | `` |  |  | Called when a request to change the items in a list is made. |

<!-- props-table-end -->


### TransferListList

```<TransferListList />``` are lists that can exchange items within a ```<TransferList />``` .

<!-- props-table-start -->
#### Properties

| Property | PropType | Required | Default | Description |
|----------|----------|----------|---------|-------------|
| id | ```string``` | yes |  | The id of the list. |
| dragHandleComponent | `` |  |  | Specify a custom component to render a drag handle. |
| listComponent | `` |  |  | Specify a custom component to render the list container.<br>Defaults to a ol element |
| listItemComponent | `` |  |  | Specify a custom component to render the list item container.<br>Defaults to a li element |
| listItemBodyComponent | `` |  |  | Specify a custom component to render the body of each list item.<br> Defaults to a span element containing the id of the item. |
| options | `` |  |  | Additional configuration options for drag and drop behaviour. |

<!-- props-table-end -->


###ReorderableList

```<ReorderableList />``` is a single list of items whose order can be updated by drag and drop.

```jsx
import { useCallback, useState } from 'react';
import { ReorderableList } from 'react-transfer-list';

const App = () => {
  const [ids, setIds] = useState<string[]>(['1', '2', '3']);
  const handleChange = useCallback((ids: string[]) => {
    setIds(ids);
  }, []);
  return <ReorderableList ids={ids} onChange={handleChange} />;
};

```

<!-- props-table-start -->
#### Properties

| Property | PropType | Required | Default | Description |
|----------|----------|----------|---------|-------------|
| ids | ```string[]``` | yes |  | The ids of the items in the list. |
| onChange | `` | yes |  | Called when a request to change the order of the items is made. |
| dragHandleComponent | `` |  |  | Specify a custom component to render a drag handle. |
| listComponent | `` |  |  | Specify a custom component to render the list container.<br>Defaults to a ol element |
| listItemComponent | `` |  |  | Specify a custom component to render the list item container.<br>Defaults to a li element |
| listItemBodyComponent | `` |  |  | Specify a custom component to render the body of each list item.<br> Defaults to a span element containing the id of the item. |
| options | `` |  |  | Additional configuration options for drag and drop behaviour. |

<!-- props-table-end -->
