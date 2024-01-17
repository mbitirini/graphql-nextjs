import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterDropdown from './FilterDropdown';

describe('FilterDropdown', () => {
  test('renders correctly with default props', () => {
    const selectedFilter = 'OPEN';
    const onFilterChangeMock = jest.fn();

    render(
      <FilterDropdown
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChangeMock}
      />
    );

    // Ensure the label and dropdown are rendered
    expect(screen.getByLabelText('Filters:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Ensure the default selected option is rendered
    expect(screen.getByDisplayValue('Open Issues')).toBeInTheDocument();
  });

  test('triggers onFilterChange callback on selection change', () => {
    const selectedFilter = 'OPEN';
    const onFilterChangeMock = jest.fn();

    render(
      <FilterDropdown
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChangeMock}
      />
    );

    // Change the selected option
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'CLOSED' } });

    // Ensure the onFilterChange callback is triggered with the correct value
    expect(onFilterChangeMock).toHaveBeenCalledWith('CLOSED');
  });
});
