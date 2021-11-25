import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import { useRouter } from 'next/router'

const CategoriesType = props => {
  const router = useRouter()
  const { type } = router.query
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: props.title
        }}
      />
      <div className="w-full overflow-x-hidden">     
        {type}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const types = ['All', 'HTML5' , 'Board', 'Other']
  return {
    props: {
        title: 'some game',
        types: types
    }
  };
}

export default CategoriesType;