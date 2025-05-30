import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('token');
export const saveToken = (token:any) => Cookies.set('token', token, { expires: 1 });
export const removeToken = () => Cookies.remove('token');
