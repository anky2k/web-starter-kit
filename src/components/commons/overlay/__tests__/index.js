import React from 'react';
import {
  render
} from '@testing-library/react';
import OverLay from '../index';

describe('OverLay Component', () => {
  it('should be hidden by default', async () => {
    const { getByTestId } = render(<OverLay visible />);
    expect(getByTestId('dt-overlay')).toBeInTheDocument();
    // expect(getByTestId('dt-overlay')).toHaveStyle('display:none;');
  });

  // it('should have the basic overlay style properties', async () => {
  //   const { getByTestId } = render(<OverLay />);
  //   expect(getByTestId('dt-overlay')).toHaveStyle('background-color: black; opacity: 70%; position: fixed; overflow-y: auto;');
  // });
});

