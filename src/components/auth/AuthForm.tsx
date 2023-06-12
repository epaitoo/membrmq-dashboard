import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RxPerson } from 'react-icons/rx';
import ErrorComponent from '../ui/Error';
import LoadingButton from '../ui/LoadingButton';

interface IsSignUpProp {
  isSignUp: boolean;
}

const AuthForm = ({ isSignUp }: IsSignUpProp): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      resetForm();
      setErrorMessage('Please enter a valid email and password');
      return;
    }

    try {
      if (!isSignUp) {
        try {
          const res = await axios.post('/api/login', { email, password });
          resetForm();

          if (res.status == 200) {
            router.push('/');
          }
        } catch (error: Error | any) {
          setErrorMessage(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const res = await axios.post('/api/register', { email, password });

          if (res.status == 200) {
            router.push('/');
          }
        } catch (error: Error | any) {
          setErrorMessage(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred while signing up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='bg-[#F4F7FF] py-20 lg:py-[120px]'>
        <div className='container mx-auto'>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]'>
                <div className='mb-10 text-center md:mb-16'>
                  <div className='bg-yellow-200 text-yellow-800 py-4 text-center'>
                    The backend hosting for the project  has reached its limit. Please check the{' '}
                    <Link href='https://github.com/epaitoo/membrmq-dashboard'>
                      GitHub repository (Here)
                    </Link>{' '}
                    to view the project source code.
                    Thanks!
                  </div>

                  <Link href='/' className='mx-auto inline-block max-w-[160px]'>
                    <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                      <RxPerson size={50} />
                    </div>
                  </Link>
                  <div className='mb-10 text-center md:mb-16'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </div>
                  <div>
                    {error && (
                      <ErrorComponent
                        message={error}
                        onClose={() => setErrorMessage('')}
                      />
                    )}
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className='mb-6'>
                    <input
                      type='email'
                      id='email'
                      placeholder='Email'
                      className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='mb-6'>
                    <input
                      type='password'
                      id='password'
                      placeholder='Password'
                      className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='mb-10'>
                    <LoadingButton
                      isLoading={isLoading}
                      buttonText={isSignUp ? 'Sign Up' : 'Sign In'}
                      loadingText='Loading...'
                    />
                  </div>
                </form>
                {/* <Link
                  href='/'
                  className='mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline'
                >
                  Forget Password?
                </Link> */}
                <p className='text-base text-[#adadad]'>
                  {isSignUp ? 'Already a member?' : 'Not a member yet? '}
                  <Link
                    href={isSignUp ? '/auth/signin' : '/auth/signup'}
                    className='text-primary hover:underline'
                  >
                    {isSignUp ? ' Sign In' : ' Sign Up'}
                  </Link>
                </p>
                <div>
                  <span className='absolute top-1 right-1'>
                    <svg
                      width='40'
                      height='40'
                      viewBox='0 0 40 40'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='1.39737'
                        cy='38.6026'
                        r='1.39737'
                        transform='rotate(-90 1.39737 38.6026)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='1.39737'
                        cy='1.99122'
                        r='1.39737'
                        transform='rotate(-90 1.39737 1.99122)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='13.6943'
                        cy='38.6026'
                        r='1.39737'
                        transform='rotate(-90 13.6943 38.6026)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='13.6943'
                        cy='1.99122'
                        r='1.39737'
                        transform='rotate(-90 13.6943 1.99122)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='25.9911'
                        cy='38.6026'
                        r='1.39737'
                        transform='rotate(-90 25.9911 38.6026)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='25.9911'
                        cy='1.99122'
                        r='1.39737'
                        transform='rotate(-90 25.9911 1.99122)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='38.288'
                        cy='38.6026'
                        r='1.39737'
                        transform='rotate(-90 38.288 38.6026)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='38.288'
                        cy='1.99122'
                        r='1.39737'
                        transform='rotate(-90 38.288 1.99122)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='1.39737'
                        cy='26.3057'
                        r='1.39737'
                        transform='rotate(-90 1.39737 26.3057)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='13.6943'
                        cy='26.3057'
                        r='1.39737'
                        transform='rotate(-90 13.6943 26.3057)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='25.9911'
                        cy='26.3057'
                        r='1.39737'
                        transform='rotate(-90 25.9911 26.3057)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='38.288'
                        cy='26.3057'
                        r='1.39737'
                        transform='rotate(-90 38.288 26.3057)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='1.39737'
                        cy='14.0086'
                        r='1.39737'
                        transform='rotate(-90 1.39737 14.0086)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='13.6943'
                        cy='14.0086'
                        r='1.39737'
                        transform='rotate(-90 13.6943 14.0086)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='25.9911'
                        cy='14.0086'
                        r='1.39737'
                        transform='rotate(-90 25.9911 14.0086)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='38.288'
                        cy='14.0086'
                        r='1.39737'
                        transform='rotate(-90 38.288 14.0086)'
                        fill='#3056D3'
                      />
                    </svg>
                  </span>
                  <span className='absolute left-1 bottom-1'>
                    <svg
                      width='29'
                      height='40'
                      viewBox='0 0 29 40'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='2.288'
                        cy='25.9912'
                        r='1.39737'
                        transform='rotate(-90 2.288 25.9912)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='14.5849'
                        cy='25.9911'
                        r='1.39737'
                        transform='rotate(-90 14.5849 25.9911)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='26.7216'
                        cy='25.9911'
                        r='1.39737'
                        transform='rotate(-90 26.7216 25.9911)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='2.288'
                        cy='13.6944'
                        r='1.39737'
                        transform='rotate(-90 2.288 13.6944)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='14.5849'
                        cy='13.6943'
                        r='1.39737'
                        transform='rotate(-90 14.5849 13.6943)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='26.7216'
                        cy='13.6943'
                        r='1.39737'
                        transform='rotate(-90 26.7216 13.6943)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='2.288'
                        cy='38.0087'
                        r='1.39737'
                        transform='rotate(-90 2.288 38.0087)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='2.288'
                        cy='1.39739'
                        r='1.39737'
                        transform='rotate(-90 2.288 1.39739)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='14.5849'
                        cy='38.0089'
                        r='1.39737'
                        transform='rotate(-90 14.5849 38.0089)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='26.7216'
                        cy='38.0089'
                        r='1.39737'
                        transform='rotate(-90 26.7216 38.0089)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='14.5849'
                        cy='1.39761'
                        r='1.39737'
                        transform='rotate(-90 14.5849 1.39761)'
                        fill='#3056D3'
                      />
                      <circle
                        cx='26.7216'
                        cy='1.39761'
                        r='1.39737'
                        transform='rotate(-90 26.7216 1.39761)'
                        fill='#3056D3'
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
