
import Img from '../image'
import { IconImg } from '../image'
import useDrawer from '../../../hooks/use-drawer';
import PhoneLoginFlow from '../../phone-number-login'
import { checkAuth } from '../../../sources/registration'

function Card({ data }) {
    const { src, name, desc, playstoreLink, id }  = data;
    const iconUrl = `/images/${id}/icon.png`
    const imageUrl = `/images/${id}/icon.png`
    const { show, close } = useDrawer();
    return (
        <div>
            <div role="button" 
             onClick={async () => {
                const userType = await checkAuth();    
                if(userType === 'new') {
                    show('Login', () => (<PhoneLoginFlow playstoreLink={playstoreLink} onClose={close}/>))
                }
                if(userType === 'existing') {
                    window.open(playstoreLink);
                }                    
            }
            } 
                className="card row-span-3 shadow-lg compact bg-base-100">             
                <div className="w-32 h-40 md:w-64 md:h-60 lg:w-64 lg:h-60">
                    <Img                    
                        src={imageUrl} 
                        alt={name}                    
                    />              
                </div>            
            </div> 
            <div 
                className="card-body p-0 ml-1 md:mt-1 lg:mt-1" 
                onClick={async () => {
                    const userType = await checkAuth();    
                    if(userType === 'new') {
                        show('Login', () => (<PhoneLoginFlow playstoreLink={playstoreLink} onClose={close}/>))
                    }
                    if(userType === 'existing') {
                        window.open(playstoreLink);
                    }                    
                }
                } 
                role="presentation">
                <div className="flex justify-center">
                    <div
                        className="align-baseline w-8 h-8 mt-4 md:mt-2 lg:mt-2"
                     >
                        <IconImg                    
                            src={iconUrl} 
                            alt={name}                    
                        />              
                    </div>            
                    <div                         
                        className="w-32 md:w-52 lg:w-52 capitalize
                        text-xs md:text-base lg:text-base
                        line-clamp-3 md:line-clamp-2 lg:line-clamp-2
                        leading-normal mt-0 mb-2 px-3 py-2 text-white">{name}
                    </div>
                </div>         
            </div>                                
        </div>
    )
}

function CardLoader({ data }) {
    const { show, close } = useDrawer();
    return (
        <div>
            <div className="card row-span-3 shadow-lg compact bg-base-100">             
                <div className="w-32 h-40 md:w-72 md:h-48 lg:w-72 lg:h-48 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />                
            </div>            
        </div>
    )
}

export { CardLoader }

export default Card

