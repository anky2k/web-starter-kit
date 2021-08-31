import parseLinkHeader from 'parse-link-header';

const parseBody = async res => {
  if (res.type === 'cors') {
    return res.json();
  }
  switch (res.headers.get('content-type').split(';')[0]) {
    case 'application/json': return res.json();
    case 'text/plain': return res.text();
    default: return res.blob();
  }
};

const handleError = async res => {
  if (res.ok) return;

  const body = await parseBody(res);
  const error = new Error(body.message || body);
  error.statusCode = res.status;
  error.code = body.code;
  throw error;
};

const pagination = res => {
  const linkHeader = parseLinkHeader(res.headers.get('link'));

  if (!linkHeader) return {};

  return Object.values(linkHeader).reduce(
    (acc, { rel, url }) => ({
      ...acc,
      [rel]: () => fetch(url)
    }),
    {}
  );
};

const parseResponse = async res => {
  if (!res.ok) return handleError(res);
  return {
    message: res.statusText,
    success: res.ok,
    status: res.status,
    headers: res.headers,
    data: await parseBody(res),
    ...pagination(res)
  };
};

export default parseResponse;
