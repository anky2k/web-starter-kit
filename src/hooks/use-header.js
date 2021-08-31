import {
  createContext, useContext, useState, useRef
} from 'react';
import { useRouter } from 'next/router';
import Header from '../components/commons/header';
import useTranslation from './use-translation';

const HeaderContext = createContext(
  {
    onHeaderBack: () => { },
    setHeaderProps: () => { }
  }
);

export const HeaderProvider = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [state, setState] = useState({
    title: t('lblDefaultHeader')
  });
  const backFnRef = useRef(null);

  const goBack = () => {
    backFnRef.current ? backFnRef.current() : router.back();
  };
  const onHeaderBack = fn => {
    backFnRef.current = fn && fn;
  };

  const setHeaderProps = ({ title = t('lblDefaultHeader'), subTitle = '' }) => {
    setState({
      title,
      subTitle
    });
  };

  return (
    <HeaderContext.Provider value={{ onHeaderBack, setHeaderProps }}>
      <Header
        title={state.title}
        subTitle={state.subTitle}
        onClick={goBack}
      />
      {children}
    </HeaderContext.Provider>
  );
};

export default () => useContext(HeaderContext);
