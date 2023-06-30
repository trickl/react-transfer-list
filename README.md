# React Transfer List
[![Build Status](https://app.travis-ci.com/trickl/react-transfer-list.svg?branch=master)](https://app.travis-ci.com/trickl/react-transfer-list)
[![Maintainability](https://api.codeclimate.com/v1/badges/b5f92597060361dda169/maintainability)](https://codeclimate.com/github/trickl/react-transfer-list/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b5f92597060361dda169/test_coverage)](https://codeclimate.com/github/trickl/react-transfer-list/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A customizable Transfer List supporting drag and drop.

## What is a transfer list?
A transfer list is a user interface component that allows users to move items between two lists. Typically, the component displays two lists side by side, with items that can be moved from one list to the other. The user can select one or more items in the source list and move them to the destination list by clicking a button or dragging and dropping them. Transfer lists are commonly used in web and mobile applications for tasks such as selecting items for a shopping cart or assigning tasks to team members. They perform a simular function to a multiple select, but offer certain trade-offs.

Transfer lists are generally more usable when the list of options is long or when the user needs to select multiple items from the list. Multi-select dropdowns can become unwieldy when the list of options is long, as the user needs to scroll through the list to find the desired options. Transfer lists allow the user to see all the available options at once and to move the selected items to the destination list, which can make the selection process faster and more efficient. Additionally, transfer lists can allow users to manually specify the order of selected items, which could be important in some cases, such as when selecting columns to display on a table.

| Feature                                |      Multi Select Dropdown      |          Transfer List          |
|:--------------------------------------:|:-------------------------------:|:-------------------------------:|
| Space on screen                        |          Compact                |            Large                |
| Can see all selected items at once     |          No                     |            Yes                  |
| Can choose order of items              |          No                     |            Yes                  |
 

## Basic Example Visualisation (not interactive)
![Transfer List Example Gif](https://github.com/trickl/react-transfer-list/blob/master/gifs/TransferListExample.gif)

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

### Storybook
[Visit The Storybook Page](
https://master--617ed0e7e88637004aa2ac53.chromatic.com/?path=/story/transfer-list--three-way-example)