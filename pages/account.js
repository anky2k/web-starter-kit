import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import { isSubscribed } from '../src/utils/app';
import PhoneLoginFlow from '../src/components/phone-number-login'
import Confirm from '../src/components/commons/confirm'
import useDrawer from '../src/hooks/use-drawer';


const Account = props => {
  const { t } = useTranslation();
  const { show, close } = useDrawer();
  return (
    <div className="flex justify-center mt-16">
      <SeoMeta
        data={{
          title: 'game blogs'
        }}
      />
      <button 
          className={`btn-lg cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-2xl hover:to-yellow-200`}
          onClick={
            (e) => {
              if(e.currentTarget.textContent === 'Subscribe')
                show('', () => (<PhoneLoginFlow onClose={close}/>))
              else  
                show('', () => (<Confirm title="Are you sure you want to unsubscribe" />))
            } 
          }
      >{`${isSubscribed() ? 'UnSubscribe' : 'Subscribe'}`}</button>
    </div>
  );
};

export default Account;
