import Success from '../src/components/commons/success-animation'
import { useRouter } from 'next/router';

const SuccessPage = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col justify-center items-center gap-y-8">
          <Success />
          <div className="text-white text-3xl"> Subscribed Successfully.</div>
          <div>
            { 
                router.query.link && <button 
                    className={`btn-lg cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-2xl hover:to-yellow-200`}
                    onClick={() => window.open(router.query.link, '_self')}
                > Download Now </button>
            }
            { 
                !router.query.link && <button 
                    className={`btn-lg cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-2xl hover:to-yellow-200`}
                    onClick={() => router.push('/')}
                > Explore </button>
            }
          </div>
        </div>
    );
} 
  
  export default SuccessPage;
  