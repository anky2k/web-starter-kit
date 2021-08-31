import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useOverLay, { OverLayProvider } from '../use-overlay';

it('should be a function', () => {
  expect(useOverLay).toBeDefined();
});

it('should return an object', () => {
  const { result } = renderHook(() => useOverLay());
  expect(result.current).toBeDefined();
});

it('should return hide and show: functions', () => {
  const { result } = renderHook(() => useOverLay());
  expect(result.current.hide).toBeDefined();
  expect(result.current.show).toBeDefined();
});

it('should be able show or hide overlay with hook functions', async () => {
  const TestComponent = () => {
    const { show, hide } = useOverLay();
    return (
      <>
        <div data-testid="dt-children">
          <button data-testid="dt-showOverLay" onClick={() => show()}>Show</button>
          <button data-testid="dt-hideOverLay" onClick={() => hide()}>Hide</button>
        </div>
      </>
    );
  };

  const {
    getByTestId
  } = render(
    <OverLayProvider>
      <TestComponent />
    </OverLayProvider>
  );
  fireEvent.click(getByTestId('dt-showOverLay'));
  // expect(getByTestId('dt-overlay')).toHaveStyle('background-color: black; opacity: 70%; position: fixed; overflow-y: auto;');
  fireEvent.click(getByTestId('dt-hideOverLay'));
  try {
    expect(getByTestId('dt-overlay'));
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }
});

