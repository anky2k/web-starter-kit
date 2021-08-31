import { getFirstTruthyValue, pipeAll, callOnce } from '../functional';

it('should return the value from the function which resolves with a truthy value', () => {
  const fn1 = () => ('');
  const fn2 = () => (undefined);
  const fn3 = () => ('i am function 3');
  const fn4 = () => (null);
  const fn5 = () => (false);
  expect(getFirstTruthyValue(fn1, fn2, fn3, fn4, fn5)).toBe('i am function 3');
});

it('should return the value from the first function which resolves with a truthy value', () => {
  const fn1 = () => ('');
  const fn2 = () => (undefined);
  const fn3 = () => ('i am function 3');
  const fn4 = () => (null);
  const fn5 = () => ('i am function 5');
  expect(getFirstTruthyValue(fn1, fn2, fn3, fn4, fn5)).toBe('i am function 3');
});

it('should return last value when all are falsy', () => {
  const fn1 = () => ('');
  const fn2 = () => (undefined);
  const fn3 = () => (null);

  expect(getFirstTruthyValue(fn1, fn2, fn3)).toBe(null);
});

it('should run every function in the list on the input to give final output', () => {
  const fn1 = str => (`${str}1`);
  const fn2 = str => (`${str}2`);
  const fn3 = str => (`${str}3`);
  expect(pipeAll(fn1, fn2, fn3)('0')).toBe('0123');
});

it('should call the promise only once', async () => {
  const mockPromise = jest.fn().mockResolvedValueOnce('data');
  const fn = callOnce(mockPromise);
  fn(2);
  fn();
  const data = await fn();
  expect(mockPromise).toBeCalledTimes(1);
  expect(mockPromise).toBeCalledWith(2);
  expect(data).toBe('data');

  const mockPromise1 = jest.fn().mockResolvedValueOnce('data');
  const fn1 = callOnce(mockPromise1);
  fn1(1);
  fn1();
  const data1 = await fn1();
  expect(mockPromise1).toBeCalledTimes(1);
  expect(mockPromise1).toBeCalledWith(1);
  expect(data1).toBe('data');
});
