import { useState } from 'react'
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';
import Pill from '../commons/pill';
import Card from './card';
import { trimLowerCase } from '../../utils/string'
import { srGetAllGames } from '../../sources/games';

const GameTypes = ['All', 'HTML5' , 'Board', 'Other']

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

const [preserveList, getPreservedList] = (() => {
    let originalList = []
    const set = list => originalList = list
    const get = () => originalList
    return [set, get]
})();


const filterByType = (type, data) => data.filter(item => {
    if(trimLowerCase(type) === 'all') return true
    return trimLowerCase(item.type) === trimLowerCase(type)
})

function Gallery() {
    const [games, setGames] = useState([])
    const dataFetcher = () => srGetAllGames();
    const onDataFetched = data => {
        preserveList(data.data)
        setGames(data.data)
    };
    const [fetchState] = useFetcher(dataFetcher, onDataFetched);
    return (
        <ComponentStateHandler
          state={fetchState}
          Loader={Loader}
        >           
            <>
                <div className="rail-base pl-2 overflow-x-auto">
                    {
                        GameTypes.map(( type, index) => 
                        <Pill 
                            onClick={(e) => {
                                // const els = document.getElementsByClassName('dt-pill')
                                // Array.from(els).forEach(elem => {
                                //     elem.className = elem.className.split(' ').filter( item => ['bg-purple-600', 'text-white'].indexOf(item) >= 0 ).join(' ')
                                // })
                                // e.target.className = e.target.className.split(' ').filter(item => item === 'text-purple-500').push('bg-purple-600 text-white').join(' ')
                                setGames(filterByType(e.target.innerText, getPreservedList()))
                            }}
                            index={index}
                            key={index} 
                            text={type}
                        />
                        )
                    }             
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {   
                        games.map((data, index) => <div key={index} className="p-2"><Card data={data} /></div>)    
                    }
                </div>
            </>            
        </ComponentStateHandler>
      );
}

export default Gallery
