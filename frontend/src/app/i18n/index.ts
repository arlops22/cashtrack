import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import ptCommon from './locales/pt-BR/common.json';
import br from '../../assets/br.svg';
import en from '../../assets/en.svg';

export const resources = {
    en: { common: enCommon },
    'pt-BR': { common: ptCommon },
} as const;

const MOMENT_LOCALES: Record<string, string> = { en: 'en', 'pt-BR': 'pt-br' };

export const LANGUAGES = [
    { value: 'en', label: 'EN', flag: en },
    { value: 'pt-BR', label: 'BR', flag: br },
];

function syncLocale(lng: string) {
    document.documentElement.lang = lng;
    moment.locale(MOMENT_LOCALES[lng] ?? 'en');
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        supportedLngs: LANGUAGES.map(language => language.value),
        defaultNS: 'common',
        interpolation: { escapeValue: false },
        detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    })
    .then(() => syncLocale(i18n.language));

export default i18n;
