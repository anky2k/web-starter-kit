
const createElement = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  return script;
};

const injectScripUrl = (scriptUrl = '') => {
  if (!scriptUrl) {
    console.warn('you need to pass the script url!!!');
    return false;
  }
  const elem = createElement();
  elem.async = true;
  elem.src = scriptUrl;
  document.body.appendChild(elem);
  const promise = new Promise(resolve => {
    elem.onload = () => {
      resolve({
        loaded: true
      });
    };
  });
  return promise;
};

const injectScriptSrc = (scriptSrc = '') => {
  if (!scriptSrc) {
    console.warn('you need to pass the script source!!!');
    return false;
  }
  const elem = createElement();
  elem.text = scriptSrc;
  document.body.appendChild(elem);
  return Promise.resolve({ loaded: true });
};

export function inject(scriptUrl, scriptSrc) {
  if (!scriptUrl && !scriptSrc) {
    console.warn('please pass a script url or src');
  }
  return (scriptUrl ? injectScripUrl(scriptUrl) : injectScriptSrc(scriptSrc));
}
