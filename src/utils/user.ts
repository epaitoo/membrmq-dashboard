import { API_BASEURL } from './api';

export interface IUser {
  id?: string;
  fullName?: string | null
  email: string
  role?: string
  phoneNumber?: string | null
}

export const getUserFullName = async (accessToken: string): Promise<string> => {
  const response = await fetch(`${API_BASEURL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data.fullName;
}