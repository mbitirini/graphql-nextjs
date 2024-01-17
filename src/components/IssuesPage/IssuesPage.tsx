import { useQuery, gql } from '@apollo/client';
import styles from './IssuesPage.module.css';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import React from 'react';

// Define interfaces for issue data structure

// structure of an individual issue
interface Issue {
  title: string;
  url: string;
}

// structure of the entire GraphQL API response for fetching issues
interface IssuesData {
  repository: {
    issues: {
      nodes: Issue[];
      totalCount: number;
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
    };
  };
}

// Define the possible states of an issue
type IssueState = 'OPEN' | 'CLOSED';

// Define the GraphQL query to fetch issues from the ReactJS repository
export const GET_ISSUES = gql`
  query GetIssues(
    $first: Int
    $states: [IssueState!]
    $orderBy: IssueOrder
    $after: String
  ) {
    repository(owner: "reactjs", name: "reactjs.org") {
      id
      issues(first: $first, states: $states, orderBy: $orderBy, after: $after) {
        nodes {
          title
          url
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

// Function to extract the issue number from the issue URL
// I could also get the number from query instead
const extractIssueNumber = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

const IssuesPage: React.FC = () => {
  // State variables for managing pagination and issue filtering

  // keeps track of the current page
  const [currentPage, setCurrentPage] = useState(1);
  // stores the cursors for each page
  const [cursors, setCursors] = useState<string[]>([]);
  // keeps track of the issue state (open or closed)
  const [issueState, setIssueState] = useState<IssueState>('OPEN');

  // Use Apollo useQuery hook to fetch data from the GraphQL API
  const { loading, error, data, refetch } = useQuery<IssuesData>(GET_ISSUES, {
    variables: {
      first: 25,
      states: [issueState],
      orderBy: { field: 'CREATED_AT', direction: 'DESC' },
    },
  });

  // Loading state: Display loading message
  if (loading)
    return (
      <p className={`${styles.loading} ${styles.centeredMessage}`}>
        Loading...
      </p>
    );

  // Error state: Display error message
  if (error)
    return (
      <p className={`${styles.error} ${styles.centeredMessage}`}>
        Error: {error.message}
      </p>
    );

  // Extract relevant data from the GraphQL response
  const issues = data?.repository?.issues?.nodes || [];
  const totalCount = data?.repository?.issues?.totalCount || 0;
  const pageInfo = data?.repository?.issues?.pageInfo;
  const totalPages = Math.ceil(totalCount / 25);

  /*
    Function to handle page changes
    Handles pagination by updating the current page, managing cursors and triggering data refetch
    Utilizes a cursors array to efficiently implement previous and next page functionality
  */
  const handlePageChange = (newPage: number) => {
    // Update cursors array if the cursor for the current page is not available
    // If moving to the next page, add the current page's endCursor to the cursors array
    if (newPage > cursors.length) {
      setCursors((prevCursors) => [...prevCursors, pageInfo?.endCursor || '']);
    }

    // Validate and handle page changes
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
      // Invalid page number or already on the selected page, do nothing
      return;
    }

    // Update current page
    setCurrentPage(newPage);

    // Determine the cursor for the new page
    const newCursor =
      newPage > currentPage
        ? pageInfo?.endCursor // Next page, use the current endCursor
        : cursors[newPage - 2] || null; // Previous page, use the stored cursor if available, otherwise null

    // Refetch data with the new cursor
    refetch({
      after: newCursor,
    });

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  /*
    Function to handle filter changes
    Updates the issue state based on the selected filter and resets the current page to 1
  */
  const handleFilterChange = (filter: string) => {
    setIssueState(filter as IssueState);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>React.js issues</h1>
      <div className={styles.filterContainer}>
        <FilterDropdown
          selectedFilter={issueState}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className={styles.issueListContainer}>
        <ul className={styles.issueList}>
          {issues.map((issue) => (
            <div className={styles.issue} key={issue.url}>
              <div>
                <a href={issue.url} target='_blank' rel='noopener noreferrer'>
                  {issue.title}
                </a>
              </div>
              <div className={styles.issueNumber}>
                #{extractIssueNumber(issue.url)}
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={() => handlePageChange(currentPage + 1)}
          onPrevious={() => handlePageChange(currentPage - 1)}
        />
      </div>
    </div>
  );
};

export default IssuesPage;
