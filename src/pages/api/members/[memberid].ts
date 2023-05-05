import type { NextApiRequest, NextApiResponse } from 'next';
import { API_BASEURL } from '../../../utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { memberid } = req.query;
  const { accessToken } = req.cookies;

  if (req.method === 'DELETE') {

    try {
      const response = await fetch(`${API_BASEURL}/members/${memberid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      });
      if (response.status === 204) {
        res.status(200).json({
          message: 'Member deleted successfully',
        });
      } else {
        res.status(response.status).json({
          message: 'Error deleting member',
        });
      }
      
    } catch (error: Error | any) {
      res.status(500).json({
        message: `${error.message}`
      });
    }
  }


  try {
    const response = await fetch(`${API_BASEURL}/members/${memberid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(req.body),
    });
  
    if (response.ok) {
      res.status(200).json({
        message: 'Member updated successfully',
      });
    } else {
      const msg = await response.json();
      res.status(response.status).json({
        message: `${msg.message}`,
      });
    }
  } catch (error: Error | any) {
    res.status(500).json({
      error: `Error updating member: ${error.message}`
    });
  }  
}
