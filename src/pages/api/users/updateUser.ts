import type { NextApiRequest, NextApiResponse } from 'next';
import { API_BASEURL } from '../../../utils/api';
import { serialize } from 'cookie';
import { USERNAME } from '../../../utils/tokenHelpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = req.cookies;

  try {
    const response = await fetch(`${API_BASEURL}/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(req.body),
    });
  
    if (response.ok) {

      // set the username in cookies
      const fullNameCookie = serialize(USERNAME, req.body.fullName, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
        httpOnly: false,
      })

      res.setHeader('Set-Cookie', [fullNameCookie]);

      res.status(200).json({
        message: 'Profile updated successfully',
      });
    } else {
      res.status(response.status).json({
        error: `Error updating Profile: ${response.statusText}`,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      error: `Error updating Profile: ${error.message}`
    });
  }  
}