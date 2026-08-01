import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './en_US.json';
import zhCN from './zh_CN.json';
import koKR from './ko_KR.json';

const resources = {
	'en-US': {
		translation: enUS,
	},
	'zh-CN': {
		translation: zhCN,
	},
	'ko-KR': {
		translation: koKR,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'zh-CN',
	fallbackLng: 'zh-CN',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
