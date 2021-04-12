import { render } from '@testing-library/react';
import React from 'react';
import { ExampleComp } from './Example';

describe('ExampleComp', () => {
    it('renders', () => {
        const { getByText } = render(<ExampleComp />);
        expect(getByText('Example Component')).toBeTruthy();
    });
});
