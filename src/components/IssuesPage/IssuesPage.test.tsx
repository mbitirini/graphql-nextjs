import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import IssuesPage, { GET_ISSUES } from './IssuesPage';

// Mock GraphQL response
const mockIssues = [
  {
    id: '1',
    title: 'Issue 1',
    url: 'https://github.com/reactjs/reactjs.org/issues/1',
  },
  {
    id: '2',
    title: 'Issue 2',
    url: 'https://github.com/reactjs/reactjs.org/issues/2',
  },
];

const mockGraphqlResponse = {
  repository: {
    id: 111,
    issues: {
      nodes: mockIssues,
      totalCount: mockIssues.length,
      pageInfo: {
        endCursor: 'end',
        hasNextPage: false,
      },
    },
  },
};

const mocks = [
  {
    request: {
      query: GET_ISSUES,
      variables: {
        first: 25,
        states: ['OPEN'],
        orderBy: { field: 'CREATED_AT', direction: 'DESC' },
      },
    },
    result: {
      data: mockGraphqlResponse,
    },
  },
];

describe('IssuesPage', () => {
  test('renders error state', async () => {
    const errorMock = [
      {
        request: {
          query: GET_ISSUES,
          variables: {
            first: 25,
            states: ['OPEN'],
            orderBy: { field: 'CREATED_AT', direction: 'DESC' },
          },
        },
        error: new Error('Mocked error'),
      },
    ];
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <IssuesPage />
      </MockedProvider>
    );

    // Ensure loading state is shown initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the component to finish rendering
    await waitFor(() => {});

    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders loading state initially', () => {
    // Render the component to simulate initial loading state
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IssuesPage />
      </MockedProvider>
    );

    // Ensure loading state is shown initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('fetches data correctly', async () => {
    // Render the component with the mock that provides data
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IssuesPage />
      </MockedProvider>
    );

    // Wait for the component to finish rendering and data fetching
    await waitFor(() => {});

    // Ensure that the list of issues is rendered
    mockIssues.forEach((issue) => {
      // Use getByRole to find links
      const issueLink = screen.getByRole('link', { name: issue.title });
      expect(issueLink).toBeInTheDocument();
    });
  });
});
