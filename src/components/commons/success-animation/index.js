import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../../../../public/animations/success-animation.json'

const Success = () => {    
    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };    

    return (
        <div className="w-3/5 h-3/5 md:w-2/6 md:h-2/6 lg:w-1/4 lg:h-1/4 m-auto">
            <Lottie 
                options={defaultOptions}                
            />            
        </div>
    )
}

export default Success;
