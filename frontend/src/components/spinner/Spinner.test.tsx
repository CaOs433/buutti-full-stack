import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

test('renders loading text', () => {
    render(Spinner);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
});

test('renders spinner element', () => {
    render(Spinner);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
});
