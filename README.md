# Github GraphQL API mini app

Small client application for experimenting with Next.js and GraphQL.

## Overview

This project is a small client application built with Next.js and GraphQL (GitHub GraphQL API) to display and categorize issues from the [ReactJS GitHub repository](https://github.com/reactjs/reactjs.org/issues). Unit testing is added as well.

## Features

- Displays a list of issues from the [ReactJS GitHub repository](https://github.com/reactjs/reactjs.org/issues).

- Implements pagination to allow users to navigate through multiple pages of issues.

- Adds filters to categorize issues based on their status (open/closed).

## Usage

- Clone the repository.
- Install dependencies using `npm install`.
- Run the application with `npm run dev`.

## Testing

Unit tests are written to ensure the reliability of the components.

Run tests with:

```bash
npm test
```

## Project Main Structure

- **`components/`**: Centralized directory for React components, hosting key functionalities.
  - `IssuePage/:` Core component directory.
  - `Pagination/`: Handles pagination.
  - `FilterComponent/`: Provides filters based on issue status.

All subfolders contain individual components, along with their respective test files and stylesheets.

## IssuesPage Component Overview

As the primary logic hub, the `IssuesPage` component drives core functionalities and UI rendering.

### Implemented Functionality:

- **GraphQL Integration:**
  - Implemented a GraphQL query (`GET_ISSUES`) to fetch issues from the ReactJS repository using Apollo's `useQuery` hook.
- **State management**
  - Utilized state variables (`currentPage`, `cursors` and `issueState`) for efficient page navigation and issue filtering.
- **Loading and Error Handling:**
  - Incorporated loading and error states for better user experience during data retrieval.
- **Pagination Handling:**
  - Implemented `handlePageChange` function to manage page changes when interacted with the `Pagination` component, updating state and triggering data refetch.
- **Filter Handling:**
  - Created `handleFilterChange` function to update issue state based on the selected filter when interacted with the `FilterDropdown` component.
    Resets the current page for a streamlined user experience.
- **Rendering Components:**
  - Rendered the main container, header, filter dropdown, issue list and pagination component for a complete user interface.

### GitHub GraphQL API Rate Limiting

Please be aware of the GitHub GraphQL API rate limits. You may need to authenticate to increase your rate limit.
