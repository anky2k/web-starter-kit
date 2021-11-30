import { SeoMeta } from '../../src/components/commons/head-meta/seo-meta';
import { srGetAllGames } from '../../src/sources/games';
import Card from '../../src/components/commons/card';
import { trimLowerCase } from '../../src/utils/string'

const Types = props => {
  const games = props.res
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
            games.map((data, index) => <div key={index} className="p-2"><Card data={data} /></div>)    
        }
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
    return {
      paths: [        
        '/categories/all',
        '/categories/html5',
        '/categories/board',
        '/categories/other'
      ],
      fallback: true,
    }
  }

export async function getStaticProps(context) {
    const { params } = context;
    const { type } = params;

    let res = await srGetAllGames()
    if (!res) {
      return {
        notFound: true,
      }
    }

    const filterByType = (type, data) => data.filter(item => {
        if(type === 'all') return true
        return trimLowerCase(item.type) === trimLowerCase(type)
    })

    res = filterByType(type, res.data)
  
    return {
      props: { res },
    }
  }


export default Types