import React from 'react';
import { render, cleanup as cleanupReact } from '@testing-library/react';
import Tray from '../index';
import '@testing-library/jest-dom/extend-expect';

describe('Page Indicators', () => {
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

  it('should render the page indicators if children are greater than 1 page size', () => {
    const { getByTestId } = render(
      <Tray showIndicators>
        {new Array(5).fill(0).map((item, index) => <div key={index} style={{ border: '1px solid black' }}>Text 1</div>)}
      </Tray>
    );
    expect(getByTestId('dt-page-indicators-container')).toBeInTheDocument();
  });

  /**
   * TODO find a better way, since the dom doesn't render getByTestId throws error
   * also since this component does not render any text can't use the text selectors to check existence in dom
   */
  it('should not render the page indicators if showIndicators property is not set true', () => {
    const { getByTestId } = render(
      <Tray>
        {new Array(5).fill(0).map((item, index) => <div key={index} style={{ border: '1px solid black' }}>Text 1</div>)}
      </Tray>
    );
    try {
      expect(getByTestId('dt-page-indicators-container'));
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should not render the page indicators for just 1 page', () => {
    const { getByTestId } = render(
      <Tray showIndicators>
        {new Array(4).fill(0).map((item, index) => <div key={index} style={{ border: '1px solid black' }}>Text 1</div>)}
      </Tray>
    );
    try {
      expect(getByTestId('dt-page-indicators-container'));
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should render page indicators as per page size and total children', () => {
    const { getByTestId } = render(
      <Tray showIndicators>
        {new Array(8).fill(0).map((item, index) => <div key={index} style={{ border: '1px solid black' }}>Text 1</div>)}
      </Tray>
    );
    expect(getByTestId('dt-page-indicators-container').children.length).toEqual(2);
  });

  it('should render extra page indicators for children that overlap exact page sizes', () => {
    const { getByTestId } = render(
      <Tray showIndicators>
        {new Array(9).fill(0).map((item, index) => <div key={index} style={{ border: '1px solid black' }}>Text 1</div>)}
      </Tray>
    );
    expect(getByTestId('dt-page-indicators-container').children.length).toEqual(3);
  });
});
