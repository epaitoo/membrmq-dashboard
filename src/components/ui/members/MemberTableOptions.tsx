import { useRouter } from 'next/router';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';


interface MemberOptionsProps {
  showOptions: boolean;
  setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMember: string;
}

const MemberTableOptions = ({
  showOptions,
  setShowOptions,
  selectedMember,
}: 
MemberOptionsProps) => {
  const toggleOptions = () => setShowOptions && setShowOptions(!showOptions);
  const router = useRouter();

  const handleView = async () => {
    router.push(`/members/${selectedMember}`);
  };

  const handleEdit = () => {
    router.push(`/members/${selectedMember}`);
  };

  const handleDelete = () => {
    console.log('Delete Member', selectedMember);
    toggleOptions();
  };

  const optionItems = [
    { label: 'View', icon: <BsEye className='mr-2' />, onClick: handleView },
    { label: 'Edit', icon: <BsPencil className='mr-2' />, onClick: handleEdit },
    {
      label: 'Delete',
      icon: <BsTrash className='mr-2' />,
      onClick: handleDelete,
    },
  ];

  return (
    <div
      className={`${
        showOptions ? 'visible' : 'hidden'
      } absolute z-50 right-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='options-menu'
    >
      <div className='py-1' role='none'>
        {optionItems.map(({ label, icon, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            role='menuitem'
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemberTableOptions;
