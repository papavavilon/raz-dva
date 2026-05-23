import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translation.json';
import ua from './ua/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ua: { translation: ua },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'p'],
  },
});

export default i18n;
