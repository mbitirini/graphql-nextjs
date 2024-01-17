import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('renders page number and buttons correctly', () => {
    const totalPages = 5;
    const currentPage = 3;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    // Ensure page number is displayed correctly
    expect(
      screen.getByText(`Page ${currentPage} of ${totalPages}`)
    ).toBeInTheDocument();

    // Ensure Previous button is not disabled on the first page
    const previousButton = screen.getByText('< Previous');
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).not.toHaveAttribute('disabled');

    // Ensure Next button is not disabled on the last page
    const nextButton = screen.getByText('Next >');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toHaveAttribute('disabled');
  });

  test('triggers callbacks on button click', () => {
    const onNextMock = jest.fn();
    const onPreviousMock = jest.fn();
    const totalPages = 5;
    const currentPage = 3;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={onNextMock}
        onPrevious={onPreviousMock}
      />
    );

    const previousButton = screen.getByText('< Previous');
    const nextButton = screen.getByText('Next >');

    // Click on Previous button
    fireEvent.click(previousButton);
    expect(onPreviousMock).toHaveBeenCalledTimes(1);

    // Click on Next button
    fireEvent.click(nextButton);
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  test('disables previous button on first page', () => {
    const totalPages = 5;
    const currentPage = 1;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    const previousButton = screen.getByText('< Previous');
    const nextButton = screen.getByText('Next >');

    // Ensure Previous button is disabled on the first page
    expect(previousButton).toHaveAttribute('disabled');

    // Ensure Next button is not disabled on the first page
    expect(nextButton).not.toHaveAttribute('disabled');
  });

  test('disables next button on last page', () => {
    const totalPages = 5;

    render(
      <Pagination
        currentPage={totalPages}
        totalPages={totalPages}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    const previousButton = screen.getByText('< Previous');
    const nextButton = screen.getByText('Next >');

    // Ensure Previous button is disabled on the first page
    expect(previousButton).not.toHaveAttribute('disabled');

    // Ensure Next button is not disabled on the first page
    expect(nextButton).toHaveAttribute('disabled');
  });
});
