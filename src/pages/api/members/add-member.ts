import type { NextApiRequest, NextApiResponse } from 'next';
import { API_BASEURL } from '../../../utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = req.cookies;

  try {
    const response = await fetch(`${API_BASEURL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(req.body),
    });
    if (response.ok) {
      res.status(200).json({
        message: 'Member created successfully',
      });
    } else {
      res.status(response.status).json({
        error: `Error Creating member: ${response.statusText}`,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      error: `Error updating member: ${error.message}`
    });
  }
}