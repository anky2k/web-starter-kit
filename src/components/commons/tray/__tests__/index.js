import React from 'react';
import { render, cleanup as cleanupReact } from '@testing-library/react';
import Tray from '../index';

describe('Tray Component', () => {
  beforeEach(() => {
    cleanupReact();
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();

    // you can also pass the mock implementation
    // to jest.fn as an argument
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect
    }));
  });

  it('should render the tray container and respective tray content', () => {
    const { getAllByTestId } = render(
      <Tray>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Tray>
    );
    expect(getAllByTestId('dt-tray-content').length).toEqual(3);
  });

  it('should be able to render single tray content', () => {
    const { getAllByTestId } = render(
      <Tray>
        <div>1</div>
      </Tray>
    );
    expect(getAllByTestId('dt-tray-content').length).toEqual(1);
  });

  it('should attach intersection observer on every tray content', () => {
    render(
      <Tray>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Tray>
    );
    expect(window.IntersectionObserver().observe).toHaveBeenCalledTimes(3);
  });
});
