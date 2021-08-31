import React from 'react';
import { render, cleanup as cleanupReact } from '@testing-library/react';
import { cleanup as cleanupHooks, renderHook } from '@testing-library/react-hooks';
import usePreviousValue from '../use-previous';

describe('usePreviousValue', () => {
  beforeEach(() => {
    cleanupHooks();
    cleanupReact();
  });

  it('should return undefined after the first render', () => {
    const { result } = renderHook(() => usePreviousValue(10));

    expect(result.current).toBe(undefined);
  });

  it('should return the previous value of a given variable', () => {
    const TestComponent = props => {
      const { value } = props;
      const prev = usePreviousValue(value);

      return <p>{prev}</p>;
    };

    const { container, rerender } = render(<TestComponent value={1} />);
    rerender(<TestComponent value={2} />);

    expect(container.querySelector('p').innerHTML).toEqual('1');
  });
});
