
import Image from 'next/image'
import useDrawer from '../../../hooks/use-drawer';
import PhoneLoginFlow from '../../phone-number-login'

const myLoader = ({ src }) => {
    // return src ? `https://d1lf3l2ndx18vw.cloudfront.net${src}` : `https://picsum.photos/seed/${src}${new Date().getTime()}/150`
    return `https://picsum.photos/seed/${new Date().getTime()}/150`
}
  

function Card({ data }) {
    const { src, name, desc, playstoreLink }  = data;
    const { show, close } = useDrawer();
    return (
        <div>
            <div role="button" onClick={() => show('', () => (<PhoneLoginFlow playstoreLink={playstoreLink} onClose={close}/>))} 
                className="card row-span-3 shadow-lg compact bg-base-100">             
                <div className="w-32 h-40 md:w-72 md:h-48 lg:w-72 lg:h-48">
                <Image
                    loader={myLoader}
                    className={`
                        position-relative overflow-hidden
                        animate-appear bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
                    `}
                    src={src || `https://picsum.photos/seed/${new Date().getTime()}/150`} 
                    alt={name}
                    layout="fill"
                    object-fit="cover"
                    role="presentation"
                    placeholder="blur"                
                    blurDataURL={`data:image/jpeg;base64,
                    /9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj
                    /2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj
                    /wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf
                    /EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf
                    /aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==`}
                    />            
                </div>            
            </div> 
            <div 
                className="card-body p-0 bg-gray-500" 
                onClick={() => show('', () => (<PhoneLoginFlow playstoreLink={playstoreLink} onClose={close}/>))} role="presentation">
                <div>
                    <div                         
                        className="w-32 md:w-full lg:w-full capitalize           
                        absolute
                        font-medium
                        top-[80px] md:top-[130px] lg:top-[130px]
                        line-clamp-2 text-base leading-normal mt-0 mb-2 px-3 py-2 text-white">{name}</div>
                    <p className="text-base-content text-opacity-40">{desc}</p>
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
            {/* <div className="card-body p-0" onClick={() => show('', () => (<PhoneLoginFlow playstoreLink={playstoreLink} onClose={close}/>))} role="presentation">
                <div>
                    <div className="w-32 md:w-full lg:w-full capitalize                    
                    line-clamp-2 text-base leading-normal mt-0 mb-2 px-3 py-2 text-white">{name}</div>
                    <p className="text-base-content text-opacity-40">{desc}</p>
                </div>                 
            </div> */}
        </div>
    )
}

export { CardLoader }

export default Card

