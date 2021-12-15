import { useState, useRef, forwardRef } from 'react';
import { sendOtp, verifyOtp, login } from '../../sources/registration'
import { validatePhone, validateOtp } from '../../utils/validation'
import { useRouter } from 'next/router';
import Countdown from 'react-countdown';

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
                    disabled={loading}
                    className={`btn ${loading ? 'loading' : ''} bg-gradient-to-r from-pink-500 hover:to-yellow-500 text-xs md:text-base lg:text-base`}
                    onClick={(e) => {
                        setLoading(true)
                        const phoneNumber = ref.current.value
                        if (!validatePhone(phoneNumber)) {
                            setError('please enter a valid phone number')
                            setLoading(false)
                            e.stopPropagation()
                            return
                        }
                        sendOtp({ id: phoneNumber })
                        onSubmit('otp')
                        setLoading(false)
                        e.stopPropagation()
                    }}>Proceed</button>
            </div>
        </div>
    )
});

EnterNumber.displayName = 'EnterNumber'

const renderer = ({ minutes, seconds }) => <span className="text-pink-700 text-base m-auto">retry in {minutes} : {seconds}</span>;

const EnterOtp = forwardRef((props, ref) => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [action, setAction] = useState('Proceed')
    const [attempt, setAttempt] = useState(1)
    const [loading, setLoading] = useState(false)
    const { onSubmit, onClose, playstoreLink, phoneNumber } = props
    return (
        <div className="form-control w-full items-center mt-8">
            <div className="flex gap-x-2">
                <div className="flex flex-col gap-y-2">
                    <input type="tel" ref={ref} placeholder="Enter OTP" className={`input input-bordered ${error ? 'border-red-600' : 'border-gray-300'}`} />
                    {
                        error ? (<label className="text-red-600 text-sm">{error}</label>)
                            : (<Countdown
                                zeroPadTime={2}
                                key={attempt}
                                renderer={renderer}
                                date={Date.now() + (5 * 60 * 1000)}
                                onComplete={() => setAction('Retry')}
                            />)
                    }
                </div>
            </div>
            <div className="mt-6 grid grid-cols-2 w-3/4">
                <button className="btn btn-outline mr-3 text-xs md:text-base lg:text-base" onClick={(e) => {
                    onSubmit('number')
                    e.stopPropagation()
                }}>Back</button>
                <button
                    disabled={loading}
                    className={`btn ${loading ? 'loading' : ''} bg-gradient-to-r from-pink-500 hover:to-yellow-500 text-xs md:text-base lg:text-base`}
                    onClick={
                        async (e) => {
                            try {
                                setLoading(true)
                                if (e.currentTarget.textContent === 'Retry') {
                                    sendOtp({ id: phoneNumber })
                                    setError('')
                                    setAttempt(attempt + 1)
                                    setAction('Proceed')
                                    setLoading(false)
                                    return
                                }
                                if (e.currentTarget.textContent === 'Proceed') {
                                    const otp = ref.current.value
                                    if (!validateOtp(otp)) {
                                        setError('please enter a valid otp')
                                        setLoading(false)
                                        e.stopPropagation()
                                        return
                                    }
                                    await verifyOtp({ number: phoneNumber, otp })
                                    const { data } = await login({ id: phoneNumber })
                                    if (data === 'success') {
                                        playstoreLink ? router.push(`/success?link=${playstoreLink}`) : router.push(`/success`)
                                        onClose();
                                    } else {
                                        setError('failed to send sms please retry')
                                        setAction('Retry')
                                    }
                                }
                            } catch (e) {
                                console.log(e)
                            }
                            setLoading(false)
                            e.stopPropagation()
                        }
                    }
                >
                    {action}
                </button>
            </div>
        </div >
    )
});

EnterOtp.displayName = 'EnterOtp'

const PhoneLoginFlow = ({ onClose, playstoreLink }) => {
    const [flow, setFlow] = useState('number')
    const otp = useRef(null)
    const phoneNumber = useRef(null)
    if (flow === 'number') return (<EnterNumber ref={phoneNumber} onClose={onClose} onSubmit={transitionTo => setFlow(transitionTo)} />)
    if (flow === 'otp') return (<EnterOtp ref={otp} phoneNumber={phoneNumber.current.value} onClose={onClose} playstoreLink={playstoreLink} onSubmit={transitionTo => setFlow(transitionTo)} />)
}

export default PhoneLoginFlow;
