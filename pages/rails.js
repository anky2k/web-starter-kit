// import Rails from '../src/components/rails';
// import { withNoIndex } from '../src/components/commons/with-seo';

// export default withNoIndex(Rails);

import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';

const Rails = props => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: 'contact us'
        }}
      />
      <span className="font-bold m-auto text-purple-800 text-4xl">{t('welcome')}</span>
    </div>
  );
};

export default Rails;
