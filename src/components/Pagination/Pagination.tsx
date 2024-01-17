import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}) => {
  return (
    <div className={styles.pagination}>
      <button onClick={onPrevious} disabled={currentPage === 1}>
        &lt; Previous
      </button>
      <span className={styles.pageNumber}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
