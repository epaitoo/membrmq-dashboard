import { GetServerSideProps } from 'next';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';

interface Member {
  fullName: string;
  phoneNumber: string;
  email: string | null;
  group: string;
}

interface MembersProps {
  data: Member[];
}

export default function members({ data }: MembersProps) {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>Members</h2>
        <h2>Welcome Back, User</h2>
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
                      <BsThreeDotsVertical />
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
 
  return {
    props: {}, 
  }
}
