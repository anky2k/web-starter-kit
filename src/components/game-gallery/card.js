
import Image from 'next/image'
import useDrawer from '../../hooks/use-drawer';
import PhoneLoginFlow from '../phone-number-login'

const myLoader = ({ src }) => {
    return `https://d1lf3l2ndx18vw.cloudfront.net${src}`
    // return `https://picsum.photos/seed/${src}`
  }
  

function Card({ data }) {
    const { src, name, desc }  = data;
    const { show, close } = useDrawer();
    return (
        <div>
            <div role="button" onClick={() => show('', () => (<PhoneLoginFlow onClose={close}/>))} className="card row-span-3 shadow-lg compact bg-base-100">             
                <div className="w-32 h-48">
                <Image
                    loader={myLoader}
                    className={`
                        position-relative overflow-hidden
                        animate-appear bg-purple-100
                    `}
                    src={src} 
                    // src={`${new Date().getTime()}/150`} 
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
            <div className="card-body" onClick={() => show('', () => (<PhoneLoginFlow onClose={close}/>))} role="presentation">
                <div>
                    <h2 className="card-title text-gray-600">{name}</h2>                 
                    <p className="text-base-content text-opacity-40">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
