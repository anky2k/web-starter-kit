import { useState, useRef, forwardRef } from 'react';
import {srSendOtp, srVerifyOtp, srLogin} from '../../sources/registration'
import { validatePhone, validateOtp } from '../../utils/validation'
import { useRouter } from 'next/router';

const EnterNumber = forwardRef((props, ref) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { onClose, onSubmit } = props
    return (
        <div className="form-control w-full items-center mt-8">            
            <input type="tel" ref={ref} placeholder="Enter your mobile number" className={`input input-bordered w-3/4 ${error ? 'border-red-600' : 'border-gray-300'}`} />
            <label className="text-red-600 text-sm">{error}</label>
            <div className="mt-6 grid grid-cols-2 w-3/4">
                <button className="btn btn-outline mr-3 text-xs md:text-base lg:text-base" onClick={() => onClose()}>Cancel</button> 
                <button 
                    className={`btn ${loading ? 'loading' : ''} bg-gradient-to-r from-pink-500 hover:to-yellow-500 text-xs md:text-base lg:text-base`} 
                    onClick={(e) => {
                        setLoading(true)
                        const phoneNumber = ref.current.value
                        if(!validatePhone(phoneNumber)) {
                            setError('please enter a valid phone number')
                            setLoading(false)
                            e.stopPropagation()                        
                            return
                        }
                        srSendOtp({id: phoneNumber })  
                        onSubmit('otp')
                        setLoading(false)
                        e.stopPropagation()
                }}>Proceed</button> 
            </div>                  
        </div>
    )
});

EnterNumber.displayName = 'EnterNumber'

const EnterOtp = forwardRef((props, ref) => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { onSubmit, onClose, playstoreLink, phonNumber  } = props
    return (
        <div className="form-control w-full items-center mt-8">            
            <input type="tel" ref={ref} placeholder="Enter OTP" className={`input input-bordered w-3/4 ${error ? 'border-red-600' : 'border-gray-300'}`} />
            <label className="text-red-600 text-sm">{error}</label>
            <div className="mt-6 grid grid-cols-2 w-3/4">
                <button className="btn btn-outline mr-3 text-xs md:text-base lg:text-base" onClick={(e) => {
                    onSubmit('number')
                    e.stopPropagation()
                }}>Back</button> 
                <button 
                    className={`btn ${loading ? 'loading' : ''} bg-gradient-to-r from-pink-500 hover:to-yellow-500 text-xs md:text-base lg:text-base`} 
                    onClick={
                        async (e) => {
                            try {
                                setLoading(true)
                                const otp = ref.current.value
                                if(!validateOtp(otp)) {
                                    setError('please enter a valid otp')
                                    setLoading(false)
                                    e.stopPropagation()
                                    return
                                }
                                await srVerifyOtp({ number: phonNumber, otp})
                                const { data } = await srLogin({ id: phonNumber })
                                if(data === 'success'){ 
                                    playstoreLink ? router.push(`/success?link=${playstoreLink}`) : router.push(`/success`)
                                    onClose();
                                } else {
                                    // resent otp
                                }                            
                                
                            } catch(e) {
                                
                            }
                            setLoading(false)
                            e.stopPropagation()    
                        }                       
                    }
                >
                    Proceed
                </button> 
            </div>                  
        </div>
    )
});

EnterOtp.displayName = 'EnterOtp'

const PhoneLoginFlow = ({ onClose, playstoreLink }) => {
    const [flow, setFlow] = useState('number')        
    const otp = useRef(null)
    const phonNumber = useRef(null)
    if(flow === 'number') return (<EnterNumber ref={phonNumber} onClose={onClose} onSubmit={transitionTo => setFlow(transitionTo)}/>)
    if(flow === 'otp') return (<EnterOtp ref={otp} phonNumber={phonNumber.current.value} onClose={onClose} playstoreLink={playstoreLink} onSubmit={transitionTo => setFlow(transitionTo)} />)    
}

export default PhoneLoginFlow;
