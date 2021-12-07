
import Img from '../image'
import { IconImg } from '../image'
import useDrawer from '../../../hooks/use-drawer';
import PhoneLoginFlow from '../../phone-number-login'


function CarouselCard({ data }) {
    const { src, name, desc, playstoreLink, id }  = data;
    const iconUrl = `/images/${id}/icon.png`
    const imageUrl = `/images/${id}/landscape/ss1.jpg`
    const { show, close } = useDrawer();
    return (
        <div>
            <div role="button" onClick={() => show('', () => (<PhoneLoginFlow playstoreLink={playstoreLink} onClose={close}/>))} 
                className="card row-span-3 shadow-lg compact bg-base-100">             
                <div className="w-32 h-40 md:w-72 md:h-60 lg:w-72 lg:h-60">
                    <Img                    
                        src={imageUrl} 
                        alt={name}                    
                    />            
                </div>            
            </div> 
            <div 
                className="card-body p-0 ml-1 md:mt-1 lg:mt-1" 
                onClick={() => show('', () => (<PhoneLoginFlow playstoreLink={playstoreLink} onClose={close}/>))} role="presentation">
                <div className="flex justify-start">
                    <div
                        className="w-8 h-8 mt-4 md:mt-2 lg:mt-2"
                     >
                        <IconImg                    
                            src={iconUrl} 
                            alt={name}                    
                        />              
                    </div>            
                    <div                         
                        className="w-full capitalize           
                        font-medium
                        line-clamp-2 text-base leading-normal mt-0 mb-2 px-3 py-2 text-white">{name}
                    </div>
                </div>                 
            </div>
        </div>
    )
}

function CarouselCardLoader({ data }) {
    return (
        <div>
            <div className="card shadow-lg compact bg-base-100">             
                <div className="w-32 h-40 md:w-72 md:h-60 lg:w-72 lg:h-60
                    bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />                
            </div>             
        </div>
    )
}

export { CarouselCardLoader }

export default CarouselCard
