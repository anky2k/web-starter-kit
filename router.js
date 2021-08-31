import Router, { useRouter } from 'next/router';
import { withBasePath } from './src/config';

Router.pushState = (path, data = {}, opt = { getInitialProps: true }) => {
  const updatedPath = withBasePath(path);
  window.sessionStorage.setItem(updatedPath.replace(/\//g, ''), JSON.stringify(data));
  Router.push(`/${path}`, updatedPath, opt);
};

export default Router;
export { useRouter };
