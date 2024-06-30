export const APP_ID = Number(
  new URLSearchParams(document.location.search).get('vk_app_id'),
);
export const APP_URL = `https://vk.com/app${APP_ID}`;
export const GROUP_ID = '';
export const NAME_PROJECT = 'marriage-registration';
export const APP_AVATAR = '';
export const ROUTE_URL =
  process.env.NODE_ENV === 'production' ? '/marriage-registration' : '';
export const ADMINS = [738505078, 769019442];
export const SHARING_TEXT = `Данное заявление было сделано с помощью приложения ${APP_URL}`;
export const URL_PROXY = 'https://proxy.rzgn.ru';
