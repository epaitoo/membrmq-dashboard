import { NextApiRequest, NextApiResponse } from 'next';
import { authTokenReq } from '../../utils/tokenHelpers';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    const tokens = await authTokenReq(
      'http://localhost:7001/api/auth/signin',
      email,
      password
    );

    res.setHeader('Set-Cookie', tokens);

    res.status(200).json({ message: 'Success!' });
  } catch (error) {
    res.json({ message: 'Invalid credentials!' });
  }
}
