import { GetServerSideProps } from 'next';
import { RxPerson } from 'react-icons/rx';
import { parse } from 'cookie';
import { API_BASEURL } from '../../utils/api';
import { IUser } from '../../utils/user';
import { useState } from 'react';
import router from 'next/router';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: reqBody = {
      fullName,
      phoneNumber,
      email
    }

    if (data.email === '' || !data.email) {
      delete data.email;
    }

    try {
      const res = await fetch('/api/users/currentUser', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push('/users/current-user');
      } else {
        console.log('Error Updating Member');
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='bg-[#ffffff] py-20 lg:py-[120px]'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]'>
              <div className='mb-10 text-center md:mb-16'>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                  <RxPerson size={50} />
                </div>
                <div className='mb-10 text-center md:mb-16'>
                  My Profile
                </div>
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
                    <input
                      type='submit'
                      value='Edit Profile'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    />
                  </div>
                </form>
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
      console.log(`Something went wrong: ${res.statusText}`);
    }
  } catch (error) {
    console.log('Something went wrong accessing members', error);
  }

  return {
    props: {},
  };
};