import { renderHook } from '@testing-library/react-hooks';
import '../../test/util';
import useMedia, { breakpoints } from '../use-media';

it('should be a function', () => {
  expect(useMedia).toBeDefined();
});

it('should return an object', () => {
  const { result } = renderHook(() => useMedia(breakpoints, [1, 2, 3], 0));
  expect(result.current).toBeDefined();
});

it('should return 1 for the desktop break point', () => {
  window.resizeTo(1080, 768);
  const { result } = renderHook(() => useMedia(breakpoints, [1, 2, 3], 0));
  expect(result.current).toEqual(1);
});

it('should return 2 for the tablet break point', () => {
  window.resizeTo(800, 600);
  const { result } = renderHook(() => useMedia(breakpoints, [1, 2, 3], 0));
  expect(result.current).toEqual(2);
});

it('should return 3 for the tablet break point', () => {
  window.resizeTo(420, 360);
  const { result } = renderHook(() => useMedia(breakpoints, [1, 2, 3], 0));
  expect(result.current).toEqual(3);
});

it('should return 0 (default) if break point doesnt match', () => {
  window.resizeTo(200, 100);
  const { result } = renderHook(() => useMedia(breakpoints, [1, 2, 3], 0));
  expect(result.current).toEqual(0);
});
