import { GetServerSideProps } from 'next';
import { RxPerson } from 'react-icons/rx';
import { parse } from 'cookie';
import { API_BASEURL } from '../../utils/api';
import { IUser } from '../../utils/user';
import { useState } from 'react';
import router from 'next/router';
import Header from '../../components/ui/Header';
import ErrorComponent from '../../components/ui/Error';
import LoadingButton from '../../components/ui/LoadingButton';

interface ICurrentUserProps {
  data: IUser | undefined;
}

interface reqBody {
  fullName: string;
  phoneNumber: string;
  email?: string;
}

export default function CurrentUser({ data }: ICurrentUserProps) {
  const [fullName, setFullName] = useState(data?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || '');
  const [email, setEmail] = useState(data?.email || '');
  const [error, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
      if (res.ok) {
        router.push('/auth/signin');
      } else {
        const msg = await res.json();
        throw new Error(`${msg.message}`);
      }
    } catch (error: Error | any) {
      setErrorMessage(`Oops, something went wrong:, ${error.message}`);
      console.log(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data: reqBody = {
      fullName,
      phoneNumber,
      email,
    };

    if (data.email === '' || !data.email) {
      delete data.email;
    }

    try {
      const res = await fetch('/api/users/updateUser', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/users/current-user');
      } else {
        const msg = await res.json();
        throw new Error(`${msg.message}`);
      }
    } catch (error: Error | any) {
      setErrorMessage(`Error Updating Member: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header
        pageTitle='User Profile'
        userName={fullName !== null ? fullName : ''}
        onClick={handleButtonClick}
        buttonName='Log Out'
      />
      <div className='bg-[#ffffff] py-20 lg:py-[120px]'>
        <div className='container mx-auto'>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]'>
                <div>{error && <ErrorComponent message={error} onClose={() => setErrorMessage('')} />}</div>
                <div className='mb-10 text-center md:mb-16'>
                  <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                    <RxPerson size={50} />
                  </div>
                  <div className='mb-10 text-center md:mb-16'>My Profile</div>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                      <label
                        htmlFor='fullName'
                        className='block text-gray-700 font-bold mb-2'
                      >
                        Full Name
                      </label>
                      <input
                        type='text'
                        name='fullName'
                        id='fullName'
                        className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='phoneNumber'
                        className='block text-gray-700 font-bold mb-2'
                      >
                        Phone Number
                      </label>
                      <input
                        type='text'
                        name='phoneNumber'
                        id='phoneNumber'
                        className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='email'
                        className='block text-gray-700 font-bold mb-2'
                      >
                        Email
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='mb-10'>
                      <LoadingButton
                        isLoading={isLoading}
                        buttonText='Edit Profile'
                        loadingText='Loading...'
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.accessToken;

  if (accessToken === undefined) {
    return {
      props: {},
    };
  }

  try {
    const res = await fetch(`${API_BASEURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });
    if (res.ok) {
      const data: IUser = await res.json();
      return {
        props: { data },
      };
    } else {
      const msg = await res.json();
      throw new Error(`${msg.message}`);
    }
  } catch (error: Error | any) {
    console.log('Cannot access Profile:', error.message);
  }

  return {
    props: {},
  };
};
