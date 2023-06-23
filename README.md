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

## Documentation and Interactive Demo
[Visit The Storybook Page](https://master--617ed0e7e88637004aa2ac53.chromatic.com/?path=/story/snowfox-controls-uncontrolledtransferlist--three-way-transfer-list)
