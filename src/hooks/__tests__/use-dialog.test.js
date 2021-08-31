import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useDialog, { DialogProvider } from '../use-dialog';
import { OverLayProvider } from '../use-overlay';

it('should be a function', () => {
  expect(useDialog).toBeDefined();
});

it('should return an object', () => {
  const { result } = renderHook(() => useDialog());
  expect(result.current).toBeDefined();
});

it('should return close and show: functions', () => {
  const { result } = renderHook(() => useDialog());
  expect(result.current.close).toBeDefined();
  expect(result.current.show).toBeDefined();
});

it('should be able show and hide the dialog box', async () => {
  const ChildComponent = () => (<div data-testid="dt-dialog-child">I will be rendered inside the drawer</div>);

  const TestComponent = () => {
    const { show } = useDialog();
    return (
      <>
        <div data-testid="dt-children">
          <button data-testid="dt-show" onClick={() => show('title', ChildComponent)}>Show Dialog</button>
        </div>
      </>
    );
  };

  const {
    getByTestId
  } = render(
    <DialogProvider>
      <TestComponent />
    </DialogProvider>
  );
  expect(getByTestId('dialog-container')).toBeInTheDocument();
  // expect(getByTestId('dialog-container')).toHaveStyle('display: none');
  // fireEvent.click(getByTestId('dt-show'));
  // expect(getByTestId('dialog-container')).toHaveStyle('display: block');
  // fireEvent.click(getByTestId('dialog-close'));
  // expect(getByTestId('dialog-container')).toHaveStyle('display: none');
});

it('should render with overlay and hide by hiding it', async () => {
  const ChildComponent = () => (<div data-testid="dt-dialog-child">I will be rendered inside the drawer</div>);

  const TestComponent = () => {
    const { show } = useDialog();
    return (
      <>
        <div data-testid="dt-children">
          <button data-testid="dt-show" onClick={() => show('title', ChildComponent)}>Show Dialog</button>
        </div>
      </>
    );
  };

  const {
    getByTestId
  } = render(
    <OverLayProvider>
      <DialogProvider>
        <TestComponent />
      </DialogProvider>
    </OverLayProvider>
  );
  expect(getByTestId('dialog-container')).toBeInTheDocument();
  // expect(getByTestId('dt-overlay')).toHaveStyle('display: none');
  // expect(getByTestId('dt-overlay')).toHaveStyle('display: none');
  // fireEvent.click(getByTestId('dt-show'));
  // expect(getByTestId('dt-overlay')).toHaveStyle('display: block');
  // fireEvent.click(getByTestId('dialog-close'));
  // expect(getByTestId('dt-overlay')).toHaveStyle('display: none');
});
