import parseResponse from '../parse-response';

beforeEach(fetch.resetMocks);

it('should json-parse responses with Content-Type: application/json', () => {
  fetch.mockResponseOnce(JSON.stringify({ foo: 'bar' }), {
    headers: { 'Content-Type': 'application/json' }
  });

  return fetch('/foo/bar')
    .then(parseResponse)
    .then(parsed => {
      expect(typeof parsed).toBe('object');
      expect(typeof parsed.headers).toBe('object');
      expect(parsed.headers.get('Content-Type')).toEqual('application/json');

      expect(typeof parsed.data).toBe('object');
      expect(parsed.data.foo).toBe('bar');
    });
});

it('should text-parse responses with Content-Type: test/json', () => {
  fetch.mockResponseOnce('hello world', {
    headers: { 'Content-Type': 'text/plain' }
  });

  return fetch('/foo/bar')
    .then(parseResponse)
    .then(({ headers, data }) => {
      expect(headers.get('Content-Type')).toBe('text/plain');
      expect(data).toEqual('hello world');
    });
});

it('should handle error responses with Content-Type: application/json', () => {
  fetch.mockResponseOnce(JSON.stringify({
    code: 123,
    message: 'errory error'
  }), {
    status: 404,
    headers: { 'Content-type': 'application/json' }
  });

  return fetch('/foo/bar')
    .then(parseResponse)
    .then(() => { throw new Error('This should not be called'); })
    .catch(error => {
      expect(error).toBeInstanceOf(Error);
      expect(error.code).toBe(123);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('errory error');
    });
});

it('should handle error responses with Content-Type: text/plain', () => {
  fetch.mockResponseOnce('errory error', {
    status: 404,
    headers: { 'Content-type': 'text/plain' }
  });

  return fetch('/foo/bar')
    .then(parseResponse)
    .then(() => { throw new Error('This should not be called'); })
    .catch(error => {
      expect(error).toBeInstanceOf(Error);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('errory error');
    });
});

it('should handle link headers for pagination', () => {
  fetch.mockResponse('hello world', {
    headers: {
      'Content-Type': 'text/plain',
      Link:
        '</foo/bar?page=3&per_page=100>; rel="next", '
        + '</foo/bar?page=1&per_page=100>; rel="prev"'

    }
  });

  return fetch('/foo/bar')
    .then(parseResponse)
    .then(({ next, prev }) => {
      expect(next).toBeInstanceOf(Function);
      expect(prev).toBeInstanceOf(Function);

      return next().then(() => {
        expect(fetch.mock.calls.length).toBe(2);
        expect(fetch.mock.calls[1][0]).toBe('/foo/bar?page=3&per_page=100');
      });
    });
});
