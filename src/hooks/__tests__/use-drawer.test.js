import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useDrawer, { DrawerProvider } from '../use-drawer';
import { OverLayProvider } from '../use-overlay';
import '../../test/util';

it('should be a function', () => {
  expect(useDrawer).toBeDefined();
});

it('should return an object', () => {
  const { result } = renderHook(() => useDrawer());
  expect(result.current).toBeDefined();
});

it('should return close and show: functions', () => {
  const { result } = renderHook(() => useDrawer());
  expect(result.current.close).toBeDefined();
  expect(result.current.show).toBeDefined();
});

it('should be able show drawer', async () => {
  window.resizeTo(420, 360);
  const ChildComponent = () => (<div data-testid="dt-drawer-child">I will be rendered inside the drawer</div>);
  const TestComponent = () => {
    const { show } = useDrawer();
    return (
      <>
        <div data-testid="dt-children">
          <button data-testid="dt-showDrawer" onClick={() => show('Title', ChildComponent)}>Show Drawer</button>
        </div>
      </>
    );
  };

  const {
    getByTestId
  } = render(
    <DrawerProvider>
      <TestComponent />
    </DrawerProvider>
  );

  expect(getByTestId('drawer-container')).toBeInTheDocument();
  // expect(getByTestId('drawer-container')).toHaveStyle('max-height: 0px');
  // fireEvent.click(getByTestId('dt-showDrawer'));
  // expect(getByTestId('drawer-container')).toHaveStyle('max-height: 50%');
  // expect(getByTestId('dt-drawer-child')).toBeInTheDocument();
});

it('should be able hide the drawer on click of close button inside drawer', async () => {
  const ChildComponent = () => (<div data-testid="dt-drawer-child">I will be rendered inside the drawer</div>);
  const TestComponent = () => {
    const { show } = useDrawer();
    return (
      <>
        <div data-testid="dt-children">
          <button data-testid="dt-showDrawer" onClick={() => show('Title', ChildComponent)}>Show Drawer</button>
        </div>
      </>
    );
  };

  const { getByTestId } = render(
    <DrawerProvider>
      <TestComponent />
    </DrawerProvider>
  );

  fireEvent.click(getByTestId('dt-showDrawer'));
  // expect(getByTestId('drawer-container')).toHaveStyle('max-height: 50%');
  // expect(getByTestId('dt-drawer-child')).toBeInTheDocument();
  // fireEvent.click(getByTestId('drawer-close'));
  // expect(getByTestId('drawer-container')).toHaveStyle('max-height: 0px');
});

it('should render with overlay and hide by hiding it', async () => {
  const ChildComponent = () => (<div data-testid="dt-drawer-child">I will be rendered inside the drawer</div>);
  const TestComponent = () => {
    const { show } = useDrawer();
    return (
      <>
        <div data-testid="dt-children">
          <button data-testid="dt-showDrawer" onClick={() => show('Title', ChildComponent)}>Show Drawer</button>
        </div>
      </>
    );
  };

  const { getByTestId } = render(
    <OverLayProvider>
      <DrawerProvider>
        <TestComponent />
      </DrawerProvider>
    </OverLayProvider>
  );

  expect(getByTestId('drawer-container')).toBeInTheDocument();

  // expect(getByTestId('dt-overlay')).toHaveStyle('display: none');
  // fireEvent.click(getByTestId('dt-showDrawer'));
  // expect(getByTestId('dt-overlay')).toHaveStyle('display: block');
  // fireEvent.click(getByTestId('drawer-close'));
  // expect(getByTestId('dt-overlay')).toHaveStyle('display: none');
});
