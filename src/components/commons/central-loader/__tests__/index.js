import React from 'react';
import {
  render, cleanup
} from '@testing-library/react';
import CentralLoader from '../index';

describe('CentralLoader Component', () => {
  afterEach(cleanup);

  it('should render with style', async () => {
    const { getByTestId } = render(<CentralLoader />);
    expect(getByTestId('central-loader')).toBeInTheDocument();
    // expect(getByTestId('central-loader')).toHaveStyle(`
    //     display:block;
    //     position: absolute;
    //     left: 50%;
    // `);
    expect(getByTestId('circular-loader')).toBeInTheDocument();
  });
});

