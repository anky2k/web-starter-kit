import React from 'react';
import {
  render, cleanup
} from '@testing-library/react';
import Dialog from '../index';

describe('Dialog Component', () => {
  afterEach(cleanup);

  it('should not be visible by default', async () => {
    const { getByTestId } = render(<Dialog />);
    expect(getByTestId('dialog-container')).toBeInTheDocument();
    // expect(getByTestId('dialog-container')).toHaveStyle('display: none');
  });

  //   it('should render with basic styling expectations of a dialog', async () => {
  //     const { getByTestId } = render(<Dialog visible />);
  //     expect(getByTestId('dialog-container')).toBeInTheDocument();
  //     // eslint-disable-next-line max-len
  //     expect(getByTestId('dialog-container')).toHaveStyle(`display: block;
  //     position: fixed;
  //     z-index: 3;
  //     max-height: 500px;
  //     overflow-y: auto;
  //     top: 50%;
  //     left: 50%;`);
  //   });

  //   it('should be able to render title when passed as a prop', async () => {
  //     const { getByTestId } = render(<Dialog visible title="Dialog title" />);
  //     expect(getByTestId('dialog-container')).toBeInTheDocument();
  //     expect(getByTestId('dialog-close')).toBeInTheDocument();
  //     expect(getByTestId('dialog-title')).toBeInTheDocument();
  //     expect(getByTestId('dialog-title').innerHTML).toEqual('Dialog title');
  //     expect(getByTestId('dialog-container')).toHaveStyle('display: block');
  //   });

//   it('should call a function on click of close button', async () => {
//     const fn = jest.fn();
//     const { getByTestId } = render(<Dialog visible title="Dialog title" close={fn} />);
//     fireEvent.click(getByTestId('dialog-close'));
//     expect(fn).toHaveBeenCalled();
//   });
});

