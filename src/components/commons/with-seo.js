/* eslint-disable react/display-name */
import { SeoMeta, DonotIndex } from './head-meta/seo-meta';

const withSeo = Component => ({ ...props }) => (
  <>
    <SeoMeta />
    <Component {...props} />
  </>
);

const withNoIndex = Component => ({ ...props }) => (
  <>
    <DonotIndex />
    <Component {...props} />
  </>
);

export {
  withSeo,
  withNoIndex
};
