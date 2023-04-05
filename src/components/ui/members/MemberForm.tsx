import Link from 'next/link';
import { RxPerson } from 'react-icons/rx';

const MemberForm = () => {
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
                <div className='mb-10 text-center md:mb-16'>Add Member</div>
                <form>
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
                      // value={fullName}
                      // onChange={(e) => setFullName(e.target.value)}
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

                      // value={fullName}
                      // onChange={(e) => setFullName(e.target.value)}
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
                      type='text'
                      name='email'
                      id='email'
                      className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'

                      // value={fullName}
                      // onChange={(e) => setFullName(e.target.value)}
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
                      // value={fullName}
                      // onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
