import { useState } from 'react';
import { RxPerson } from 'react-icons/rx';
import { Member } from '../../../utils/member';
import router from 'next/router';
import Header from '../Header';

interface MemberFormFieldsProps {
  member?: Member;
  action?: string;
}

const MemberForm = ({ member, action }: MemberFormFieldsProps) => {
  let formattedDate: string = '';
  if (member?.birthday !== undefined) {
    const date = new Date(member?.birthday);
    formattedDate = date.toLocaleDateString('en-GB');
  }

  const [fullName, setFullName] = useState(member?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(member?.phoneNumber || '');
  const [email, setEmail] = useState(member?.email || '');
  const [group, setGroup] = useState(member?.group || '');
  const [birthday, setBirthday] = useState(formattedDate || '');

  interface reqBody {
    fullName: string;
    phoneNumber: string;
    email?: string;
    group: string;
    birthday: string;
  }

  const handleButtonClick = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
      if (res.ok) {
        router.push('/auth/signin');
      } else {
        console.log('Cannot Logout User at this moment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: reqBody = {
      fullName,
      phoneNumber,
      email,
      group,
      birthday,
    };

    if (data.email === '' || !data.email) {
      delete data.email;
    }

    try {
      if (action === 'EDIT') {
        const res = await fetch(`/api/members/${member?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          router.push('/members');
        } else {
          console.log('Error Updating Member');
        }
      } else if (action === 'CREATE') {
        const res = await fetch('/api/members/add-member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          router.push('/members');
        } else {
          console.log('Error Creating Member');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header
        pageTitle={action === 'EDIT' ? 'Edit Member' : 'Add Member'}
        userName='User'
        onClick={handleButtonClick}
        buttonName='Log Out'
      />
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
                    {action === 'view/edit' ? 'Member Details' : 'Add Member'}
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
                    <div className='mb-4'>
                      <label
                        htmlFor='email'
                        className='block text-gray-700 font-bold mb-2'
                      >
                        Birthday
                      </label>
                      <input
                        type='text'
                        name='birthday'
                        id='birthday'
                        className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='group'
                        className='block text-gray-700 font-bold mb-2'
                      >
                        Group
                      </label>
                      <input
                        type='text'
                        name='group'
                        id='group'
                        className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                      />
                    </div>
                    <div className='mb-10'>
                      <input
                        type='submit'
                        value='submit'
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
    </div>
  );
};

export default MemberForm;
