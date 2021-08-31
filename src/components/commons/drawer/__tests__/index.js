import React from 'react';
import {
  render, cleanup, fireEvent
} from '@testing-library/react';
import Drawer from '../index';

describe('Drawer Component', () => {
  afterEach(cleanup);

  it('should not be visible by default', async () => {
    const { getByTestId } = render(<Drawer />);
    expect(getByTestId('drawer-container')).toBeInTheDocument();
    // expect(getByTestId('drawer-container')).toHaveStyle('max-height: 0px');
  });

  // it('should be visible with type medium and close button if visible prop is true', async () => {
  //   const { getByTestId } = render(<Drawer visible />);
  //   expect(getByTestId('drawer-container')).toBeInTheDocument();
  //   expect(getByTestId('drawer-close')).toBeInTheDocument();
  //   expect(getByTestId('drawer-container')).toHaveStyle('max-height: 50%');
  // });

  // it('should be able to render type small', async () => {
  //   const { getByTestId } = render(<Drawer visible type="sm" />);
  //   expect(getByTestId('drawer-container')).toBeInTheDocument();
  //   expect(getByTestId('drawer-close')).toBeInTheDocument();
  //   expect(getByTestId('drawer-container')).toHaveStyle('max-height: 40%');
  // });

  // it('should be able to render type large', async () => {
  //   const { getByTestId } = render(<Drawer visible type="lg" />);
  //   expect(getByTestId('drawer-container')).toBeInTheDocument();
  //   expect(getByTestId('drawer-close')).toBeInTheDocument();
  //   expect(getByTestId('drawer-container')).toHaveStyle('max-height: 75%');
  // });

  // it('should be able to render title when passed as a prop', async () => {
  //   const { getByTestId } = render(<Drawer visible title="drawer title" />);
  //   expect(getByTestId('drawer-container')).toBeInTheDocument();
  //   expect(getByTestId('drawer-close')).toBeInTheDocument();
  //   expect(getByTestId('drawer-title')).toBeInTheDocument();
  //   expect(getByTestId('drawer-title').innerHTML).toEqual('drawer title');
  //   expect(getByTestId('drawer-container')).toHaveStyle('max-height: 50%');
  // });

  it('should call a function on click of close button', async () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Drawer visible title="drawer title" close={fn} />);
    fireEvent.click(getByTestId('drawer-close'));
    expect(fn).toHaveBeenCalled();
  });
});

