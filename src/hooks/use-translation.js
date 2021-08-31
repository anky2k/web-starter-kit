import React, {
  createContext, useState, useCallback, useContext, useEffect
} from 'react';
import { trimFirstChar } from '../utils/string';
import { getFirstTruthyValue } from '../utils/functional';
import { localStorage } from '../utils/storage';
import { getLocales } from '../sources/app';
import { isGlobalRoute } from '../config';

const TranslationContext = createContext({
  language: 'en-in',
  t: () => { },
  setLanguage: () => { }
});

export const supportedLanguages = {
  'hi-in': {
    text: 'हिंदी',
    code: 'hi-in'
  },
  'en-in': {
    text: 'English',
    code: 'en-in'
  },
  'bn-in': {
    text: 'বাংলা',
    code: 'bn-in'
  }
};

const setLanguagePref = lang => (localStorage.set('pref-lang', lang));

export const getDefaultLanguage = () => 'en-in';
const getLanguagePref = () => (localStorage.get('pref-lang'));
const getLanguageFromPath = () => {
  const pathIndex = isGlobalRoute() ? 1 : 0;
  return trimFirstChar(window.location.pathname).split('/')[pathIndex];
};
const getLanguageFromBrowser = () => (navigator.language.split('-')[0]);
const getLanguage = () => (getFirstTruthyValue(getLanguageFromPath, getLanguagePref, getLanguageFromBrowser));

// const redirectToLanguageContext = language => {
//   // if on the same language context
//   if (language === getLanguageFromPath()) {
//     return;
//   }
//   if (language === getDefaultLanguage() && !getLanguageFromPath()) {
//     return;
//   }
//   const path = trimFirstChar(window.location.pathname); // /hi/repos => hi/repos
//   const query = window.location.search;
//   const { origin } = window.location;
//   if (language === getDefaultLanguage() && getLanguageFromPath()) {
//     const updatedPath = path.split('/').splice(1, path.split('/').length).join('/');
//     window.location.href = `${origin}/${updatedPath}${query}`;
//     return;
//   }
//   const goto = path ? `${origin}/${language}/${path}${query}` : `${origin}/${language}${query}`;
//   window.location.href = goto;
// };

const refreshTranslations = async (locale, locales, setTranslations) => {
  try {
    const clLocales = await getLocales(locale);
    setTranslations({ ...locales, ...clLocales });
  } catch (e) {
    console.log(e);
  }
};

export const TranslationProvider = ({ children, locales, locale }) => {
  const [language, setLang] = useState(locale);
  const [translations, setTranslations] = useState(locales);
  const t = useCallback(key => (translations[key] || ''));

  useEffect(() => {
    (async () => {
      const language = getLanguage();
      refreshTranslations(locale, locales, setTranslations);
      if (!supportedLanguages[language]) return;
      setLanguagePref(language);
      // if (language !== getDefaultLanguage()) redirectToLanguageContext(language);
    })();
  }, []);

  const setLanguage = useCallback(async language => {
    setLanguagePref(language);
    setLang(language);
    // redirectToLanguageContext(language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{
      language, t, setLanguage
    }}
    >
      {/* TODO add custom loader common for any blocking activity on the page */}
      {!translations ? ('loading ....') : (children)}
    </TranslationContext.Provider>
  );
};

export default () => useContext(TranslationContext);
