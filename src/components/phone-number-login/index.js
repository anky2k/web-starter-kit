import { useState } from 'react';


const EnterNumber = ({ onClose, onSubmit }) => (
    <div className="form-control w-full items-center mt-8">            
        <input type="tel" placeholder="Enter your mobile number" className="input input-bordered w-2/4" />
        <div className="mt-6 grid grid-cols-2 w-2/4">
            <button className="btn btn-outline btn-primary mr-3" onClick={() => onClose()}>Cancel</button> 
            <button className="btn btn-primary" onClick={() => onSubmit('otp')}>Proceed</button> 
        </div>                  
    </div>
)

const EnterOtp = ({ onSubmit }) => (
    <div className="form-control w-full items-center mt-8">            
        <input type="tel" placeholder="Enter OTP" className="input input-bordered w-2/4" />
        <div className="mt-6 grid grid-cols-2 w-2/4">
            <button className="btn btn-outline btn-primary mr-3" onClick={() => onSubmit('number')}>Back</button> 
            <button className="btn btn-primary">Proceed</button> 
        </div>                  
    </div>
)

const PhoneLoginFlow = ({ onClose }) => {
    const [flow, setFlow] = useState('number')

    if(flow === 'number') return (<EnterNumber onSubmit={transitionTo => setFlow(transitionTo)}/>)
    if(flow === 'otp') return (<EnterOtp onSubmit={transitionTo => setFlow(transitionTo)} />)    
}

export default PhoneLoginFlow;
