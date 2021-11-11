
import Image from 'next/image'
import useDrawer from '../../hooks/use-drawer';

function Prompt () {
    return (
        <div>Enter Mobile Number</div>
    )
}

function Card({ data }) {
    const { src, name, desc }  = data;
    const { show } = useDrawer();
    return (
        <div role="button" onClick={() => show('Title', Prompt)} className="card shadow-lg text-accent-content">
            <Image 
                alt={name}                     
                src={src} 
                width={18}
                height={28}
                layout="responsive"
            />
            {/* <img 
                alt={name}                     
                src={src}>
            </img> */}
            <div className="card-body bg-white">
                <h2 className="card-title text-gray-800">{name}</h2>                 
            </div>
        </div> 
    )
}

export default Card
