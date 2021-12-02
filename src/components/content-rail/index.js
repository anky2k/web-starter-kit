import { useState } from 'react'
import Card, { CardLoader } from '../commons/card';
import Tray from '../commons/tray';
import useMedia, { breakpoints } from '../../hooks/use-media'
import { trimLowerCase } from '../../utils/string';

function ContentContainer({ title, content, total, currentIndex }) {
    const type = useMedia(breakpoints, ['lg', 'md', 'sm'], 'md');
    return (
        <div className={`ml-2 mt-2 ${currentIndex === (total - 1) && 'pb-20'}`}>
            <h1 className="text-base md:text-xl lg:text-2xl ml-2 
            font-extrabold text-white">
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

function ContentRail({ data = [], categories = [] }) {
    const [games] = useState(data)  
    return (        
        <>
            <div className="w-full h-full flex flex-col mt-2">
                {   
                    categories.map(
                        (data, index) => 
                            <ContentContainer 
                                currentIndex={index}
                                total={categories.length}
                                key={index} 
                                title={data}
                                content={filterByType(data, games)}
                            />
                        )    
                }
            </div>
        </>            
      );
}

export default ContentRail
