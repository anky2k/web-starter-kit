import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import Link from 'next/link'
import { trimLowerCase } from '../../src/utils/string'
import { srGetCategories } from '../../src/sources/games';

const Categories = props => {
  const { data = [] } = props.res
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: 'some game portal'
        }}
      />
      <div className="w-full overflow-x-hidden">     
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {   
                data.map((type, index) => 
                    <Link 
                        key={index}
                        passHref
                        href="/categories/[type]" as={`/categories/${trimLowerCase(type)}`}>
                        <a 
                            key={index}
                            className="card text-center shadow-2xl lg:card-side cursor-pointer
                            bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-accent-content 
                            ml-3 mb-3"
                        >
                            <div className="pt-14 pl-8 w-32 h-40 md:w-72 md:h-48 lg:w-72 lg:h-48 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">                
                                <p className="font-bold text-xl capitalize">{type}</p>                   
                            </div>
                        </a>
                    </Link>                    
            )    
            }
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const { type } = params;

  let res = await srGetCategories()
  if (!res) {
    return {
      notFound: true,
    }
  }  

  return {
    props: { res },
  }
}


export default Categories;