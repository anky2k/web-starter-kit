import {
  get, post, put, patch, del
} from '../index';

afterEach(fetch.resetMocks);
const accept = 'application/json';
const url = '/foo';
const body = { foo: 'bar' };

const standardAssertionsWithMethod = methodName => {
  expect(fetch.mock.calls.length).toBe(1);
  expect(fetch.mock.calls[0][0]).toBe(url);
  expect(fetch.mock.calls[0][1].method).toBe(methodName);
  expect(fetch.mock.calls[0][1].headers.Accept).toBe(accept);
};

const assertBody = () => {
  expect(fetch.mock.calls[0][1].body).toBe(JSON.stringify(body));
};

Object.entries({ get, delete: del })
  .forEach(([methodName, fn]) => {
    it(`should make a ${methodName} request`, () => {
      fetch.mockResponseOnce();
      fn(url);
      standardAssertionsWithMethod(methodName);
    });
  });

Object.entries({ post, put, patch })
  .forEach(([methodName, fn]) => {
    it(`should make a ${methodName} request`, () => {
      fetch.mockResponseOnce();
      fn(url, body);
      standardAssertionsWithMethod(methodName);
      assertBody();
    });
  });
