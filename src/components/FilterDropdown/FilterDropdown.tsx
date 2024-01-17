import React from 'react';
import styles from './FilterDropdown.module.css';

interface FilterDropdownProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  // Function to handle changes in the filter selection
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue);
  };

  return (
    <div className={styles.filterDropdown}>
      <label htmlFor='filterSelector'>Filters:</label>
      <select
        id='filterSelector'
        className={styles.filterSelector}
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value='OPEN'>Open Issues</option>
        <option value='CLOSED'>Closed Issues</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
