import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';

const About = props => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: 'about us'
        }}
      />
      <span className="font-bold m-auto text-purple-800 text-4xl">{t('welcome')}</span>
    </div>
  );
};

export default About;
