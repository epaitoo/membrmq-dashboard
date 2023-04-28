import type { NextApiRequest, NextApiResponse } from 'next';
import { API_BASEURL } from '../../utils/api';
import { serialize } from 'cookie';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = req.cookies;

  try {
    const response = await fetch(`${API_BASEURL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    if (response.ok) {
      res.setHeader('Set-Cookie', [
        serialize('accessToken', '', {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          expires:  new Date(0),
        }),

        serialize('refreshToken', '', {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          expires:  new Date(0),
        }),
      ]);

      res.status(200).json({ message: 'Logged out successfully' })
    } else {
      res.status(response.status).json({ message: `Something went wrong: ${response.statusText}` })
    }
  } catch (error: any) {
    res.status(500).json({
      error: `Error logging out: ${error.message}`
    });
  }
}