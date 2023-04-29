import axios from 'axios';
import { serialize } from 'cookie';
import jwtDecode from 'jwt-decode';
import { getUserFullName } from './user';

export const ACCESS_TOKEN: string = 'accessToken';
export const REFRESH_TOKEN: string = 'refreshToken';
export const USERNAME: string = 'username';

export const authTokenReq = async (
  url: string,
  email: string,
  password: string
) => {
  const response = await axios.post(url, {
    email,
    password,
  });

  const accessToken = serialize(ACCESS_TOKEN, response.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, 
    path: '/',
  });

  const refreshToken = serialize(REFRESH_TOKEN, response.data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  const fullName = await getUserFullName(response.data.access_token);
  const fullNameCookie = serialize(USERNAME, fullName, {
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    httpOnly: false,
  });

  return [accessToken, refreshToken, fullNameCookie];
};

export const isTokenExpired = (token: string | undefined): boolean => {
  if (token === undefined) return true;

  const decodedToken: any = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);

  return decodedToken.exp < currentTime;
};



