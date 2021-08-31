import {
  render, fireEvent, cleanup
} from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useLoader, { LoaderProvider } from '../use-loader';

afterEach(cleanup);

it('should be a function', () => {
  expect(useLoader).toBeDefined();
});

it('should return an object', () => {
  const { result } = renderHook(() => useLoader());
  expect(result.current).toBeDefined();
});

it('should have functions to get showLoader and hideLoader', async () => {
  const { result } = renderHook(() => useLoader());
  const { showLoader, hideLoader } = result.current;
  expect(showLoader).toBeDefined();
  expect(hideLoader).toBeDefined();
});

it('should be able to show and hide loader by calling functions', async () => {
  const TestComponent = () => {
    const { showLoader, hideLoader } = useLoader();

    return (
      <>
        <div data-testid="hide-loader" onClick={hideLoader} role="presentation">hide Loader</div>
        <div
          data-testid="show-loader"
          onClick={() => showLoader()}
          role="presentation"

        >
          show Loader
        </div>
      </>
    );
  };

  const {
    getByTestId, queryByTestId
  } = render(
    <LoaderProvider>
      <TestComponent />
    </LoaderProvider>
  );

  fireEvent.click(getByTestId('show-loader'));
  expect(getByTestId('central-loader')).toBeInTheDocument();
  fireEvent.click(getByTestId('hide-loader'));
  expect(queryByTestId('central-loader')).not.toBeInTheDocument();
});
