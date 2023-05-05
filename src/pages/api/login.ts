import { NextApiRequest, NextApiResponse } from 'next';
import { authTokenReq } from '../../utils/tokenHelpers';
import { API_BASEURL } from '../../utils/api';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;


  try {
    const tokens = await authTokenReq(
      `${API_BASEURL}/auth/signin`,
      email,
      password
    );

    res.setHeader('Set-Cookie', tokens);

    res.status(200).json({ message: 'Success!' });
  } catch (error: Error | any) {
    // console.log(error.message);
    res.status(error.response.status).json({ message: `${error.response.data.message}` });
  }
}
