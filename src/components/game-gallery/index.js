import { useState } from 'react'
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Card from './card';
import { srGetAllGames } from '../../sources/games';

function Loader() {
    return (
        <div className="grid place-items-center h-2/3">
            <div
                className="
                    animate-spin
                    rounded-full
                    h-24
                    w-24
                    border-t-2 border-b-2 border-purple-500
                "
            />
        </div>
    )
}

function Gallery() {
    const [games, setGames] = useState([])
    const dataFetcher = () => srGetAllGames();
    const onDataFetched = data => setGames(data.data);
    const [fetchState] = useFetcher(dataFetcher, onDataFetched);
    
    return (
        <ComponentStateHandler
          state={fetchState}
          Loader={Loader}
        >           
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {   
                    games.map((data, index) => <div key={index} className="p-2"><Card data={data} /></div>)    
                }
            </div>
        </ComponentStateHandler>
      );
}

export default Gallery
