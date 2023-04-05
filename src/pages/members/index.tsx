import { parse } from 'cookie';
import { GetServerSideProps } from 'next';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { API_BASEURL } from '../../utils/api';
import MemberTableOptions from '../../components/ui/members/MemberTableOptions';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface Member {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string | null;
  group: string;
}

interface MembersProps {
  data: Member[] | undefined;
}

export default function Members({ data }: MembersProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const router = useRouter();

  const handleMemberOptionsToggle = (memberId: string) => {
    if (selectedMemberId === memberId) {
      setSelectedMemberId(null);
    } else {
      setSelectedMemberId(memberId);
    }
  };

  const handleClick = (path: string) => {
    router.push(path);
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>Members</h2>
        <div className='flex items-center'>
          <h2 className='hidden md:block mr-4'>Welcome Back, User</h2>
          <button onClick={(e) => handleClick('/members/add-member')} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
            Add Member
          </button>
        </div>
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Name</span>
            <span className='sm:text-left text-right'>Phone</span>
            <span className='hidden md:grid'>Email</span>
            <span className='hidden sm:grid'>Group</span>
          </div>
          <ul>
            {data == undefined || data.length < 1
              ? 'Data is Currently Empty'
              : data.map((member, id) => (
                  <li
                    key={id}
                    className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'
                  >
                    <div className='flex items-center'>
                      <div className='bg-purple-100 p-3 rounded-lg'>
                        <BsPersonFill className='text-purple-800' />
                      </div>
                      <p className='pl-4'>{member.fullName}</p>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right'>
                      {member.phoneNumber}
                    </p>
                    <p className='hidden md:flex'>
                      {member.email === null ? 'N/A' : member.email}
                    </p>
                    <div className='sm:flex hidden justify-between items-center'>
                      <p>{member.group}</p>
                      <BsThreeDotsVertical
                        onClick={() => handleMemberOptionsToggle(member.id)}
                      />
                    </div>
                    {selectedMemberId === member.id && (
                      <MemberTableOptions
                        showOptions={true}
                        selectedMember={selectedMemberId}
                      />
                    )}
                  </li>
                ))}
          </ul>
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
    const res = await fetch(`${API_BASEURL}/members`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });

    if (res.ok) {
      const data: Member[] = await res.json();
      return {
        props: { data },
      };
    }
  } catch (error) {
    console.log('Something went wrong accessing members', error);
  }

  return {
    props: {},
  };
};
