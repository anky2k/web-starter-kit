
// import Image from 'next/image'
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
        <div className="card shadow-lg text-accent-content">
            {/* <Image 
                alt={name}                     
                src={src} 
                width={2400}
                height={1598}
                layout="responsive"
            /> */}
            <img 
                alt={name}                     
                src={src}>
            </img>
            <div className="card-body bg-gray-100">
                <h2 className="card-title text-gray-800">{name}</h2> 
                <p>{desc}</p> 
                <div className="card-actions">
                    <button onClick={() => show('Download', Prompt)}className="btn btn-secondary">Play Now</button>
                </div>
            </div>
        </div> 
    )
}

export default Card
