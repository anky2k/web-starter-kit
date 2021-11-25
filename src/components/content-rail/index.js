import { useState } from 'react'
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Card, { CardLoader } from '../commons/card';
import Tray from '../commons/tray';
import useMedia, { breakpoints } from '../../hooks/use-media'
import { trimLowerCase } from '../../utils/string';
import { srGetAllGames } from '../../sources/games';

const GameTypes = ['HTML5' , 'Board', 'Other', 'Action', 'Arcade']

function Loader() {
    const type = useMedia(breakpoints, ['lg', 'md', 'sm'], 'md');
    return (     
        <div className={`ml-2 mt-2`}>            
            <Tray
                type={type}
            >
                {
                    new Array(4).fill(1).map((data, index) =>
                        <div 
                            key={index} 
                            className="p-2"
                        >
                            <CardLoader />
                        </div>
                    )    
                }
            </Tray>                
        </div>
    )
}

function ContentContainer({ title, content, total, currentIndex }) {
    const type = useMedia(breakpoints, ['lg', 'md', 'sm'], 'md');
    return (
        <div className={`ml-2 mt-2 ${currentIndex === (total - 1) && 'pb-20'}`}>
            <h1 className="text-base md:text-xl lg:text-2xl ml-2 
            font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-pink-200">
              {title}
            </h1>
            <Tray
                type={type}
            >
                {
                    content.map((data, index) =>
                        <div 
                            key={index} 
                            className="p-2"
                        >
                            <Card data={data} />
                        </div>
                    )    
                }
            </Tray>                
        </div>
    )
} 

const filterByType = (type, data) => data.filter(item => {
    return trimLowerCase(item.type) === trimLowerCase(type)
})

function ContentRail() {
    const [games, setGames] = useState([])
    const dataFetcher = () => srGetAllGames();
    const onDataFetched = data => {
        setGames(data.data)
    };
    const [fetchState] = useFetcher(dataFetcher, onDataFetched);
    return (
        <ComponentStateHandler
          state={fetchState}
          Loader={Loader}
        >           
            <>
                <div className="w-full h-full flex flex-col mt-2">
                    {   
                        GameTypes.map(
                            (data, index) => 
                                <ContentContainer 
                                    currentIndex={index}
                                    total={GameTypes.length}
                                    key={index} 
                                    title={data}
                                    content={filterByType(data, games)}
                                />
                            )    
                    }
                </div>
            </>            
        </ComponentStateHandler>
      );
}

export default ContentRail
