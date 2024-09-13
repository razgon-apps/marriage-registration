export const APP_ID = Number(
  new URLSearchParams(document.location.search).get('vk_app_id'),
);
export const APP_URL = `https://vk.com/app${APP_ID}`;
export const GROUP_ID = '';
export const NAME_PROJECT = 'marriage-registration';
export const APP_AVATAR = '';
export const ROUTE_URL =
  process.env.NODE_ENV === 'production' ? '/marriage-registration' : '';
export const ADMINS = [738505078, 859733533];
export const SHARING_TEXT = `👉 Наше приложение - vk.me/public216163041 Пиши "Начать"`;
export const URL_PROXY = 'https://proxy.rzgn.ru';

// 769019442,
