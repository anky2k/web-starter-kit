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
      <div className="flex flex-col gap-y-6 ml-8 mt-8">
        <h1 className="text-white text-2xl underline">About Us</h1>
        <p className="text-white">
          <span className="text-pink-600 font-bold first-letter:text-4xl">Gameium Zone</span> is a digital gaming platform. Our vision is to provide an uninterrupted advertisement free gaming experience to our users.
        </p>
        <p className="text-white">
          Our mission is to continuously <span className="text-pink-600 font-bold">edutane</span> (educate + entertain) and engage our users in the <span className="text-pink-600 font-bold">zone</span> of their <span className="text-pink-600 font-bold">respective/habitual</span> genre.
        </p>
        <p className="text-white">
          We have launched in 2021 and have bundled subscription service, a game publisher and we are diligently working towards unfolding many innovative initiatives in coming time.
        </p>
      </div>
    </div>
  );
};

export default About;
