export const predicateRunner = (...args) => value => {
  for (let i = 0; i < args.length; i += 1) {
    const fn = args[i];
    if (fn(value)) {
      return fn(value);
    }
  }
  return null;
};
export const getFirstTruthyValue = (...fns) => {
  let returnVal = '';
  fns.some(fn => {
    returnVal = fn();
    return !!returnVal;
  });
  return returnVal;
};

export const pipeAll = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const callOnce = _promise => {
  let calledOnce = false;
  const channel = {};
  channel.waitOn = new Promise((resolve, reject) => {
    channel.resolve = resolve;
    channel.reject = reject;
  });
  return async params => {
    if (!calledOnce) {
      calledOnce = !calledOnce;
      try {
        const resp = await _promise(params);
        channel.resolve(resp);
      } catch (err) {
        channel.reject(err);
      }
      calledOnce = !calledOnce;
    }
    return channel.waitOn;
  };
};
