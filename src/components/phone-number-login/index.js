import { useState } from 'react';



const EnterNumber = ({ onClose, onSubmit }) => (
    <div className="form-control w-full items-center mt-8">            
        <input type="tel" placeholder="Enter your mobile number" className="input input-bordered w-3/4" />
        <div className="mt-6 grid grid-cols-2 w-3/4">
            <button className="btn btn-outline mr-3" onClick={() => onClose()}>Cancel</button> 
            <button className="btn bg-gradient-to-r from-pink-500 hover:to-yellow-500" onClick={() => onSubmit('otp')}>Proceed</button> 
        </div>                  
    </div>
)

const EnterOtp = ({ onSubmit, onClose, playstoreLink  }) => (
    <div className="form-control w-full items-center mt-8">            
        <input type="tel" placeholder="Enter OTP" className="input input-bordered w-3/4" />    

        <div className="mt-6 grid grid-cols-2 w-3/4">
            <button className="btn btn-outline mr-3" onClick={() => onSubmit('number')}>Back</button> 
            <button 
                className="btn bg-gradient-to-r from-pink-500 hover:to-yellow-500"
                onClick={
                    () => {
                        window.open(playstoreLink);
                        onClose();
                    }                       
                }
            >
                Proceed
            </button> 
        </div>                  
    </div>
)

const PhoneLoginFlow = ({ onClose, playstoreLink }) => {
    const [flow, setFlow] = useState('number')
    const [error, setError] = useState('')

    if(flow === 'number') return (<EnterNumber onClose={onClose} onSubmit={transitionTo => setFlow(transitionTo)}/>)
    if(flow === 'otp') return (<EnterOtp onClose={onClose} playstoreLink={playstoreLink} onSubmit={transitionTo => setFlow(transitionTo)} />)    
}

export default PhoneLoginFlow;
