import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';

const About = props => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: 'contact us'
        }}
      />
      <div className="flex flex-col gap-y-6 ml-4 mt-8">
        <h1 className="text-white text-2xl underline">Contact</h1>
        <p className="text-white cursor-pointer">
          <a href="mailto:manpreet@advysors.com">manpreet@advysors.com</a>
        </p>
        <p className="text-white cursor-pointer">
          <a href="mailto:kashish@advysors.com">kashish@advysors.com</a>
        </p>
      </div>
    </div>
  );
};

export default About;
