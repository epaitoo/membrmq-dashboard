import { GetServerSideProps } from 'next';
import MemberForm from '../../components/ui/members/MemberForm';
import { Member } from '../../utils/member';
import { API_BASEURL } from '../../utils/api';
import { parse } from 'cookie';

interface MemberDetailsProps {
  member: Member;
}

export default function MemberDetails({ member }: MemberDetailsProps) {
  return (
    <div>
      <MemberForm member={member} action='EDIT' />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const memberId = params?.memberid;

  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.accessToken;

  // console.log(memberId);

  if (memberId === undefined) {
    return {
      props: {},
    };
  }

  try {
    const response = await fetch(`${API_BASEURL}/members/${memberId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });
    if (response.ok) {
      const member: Member = await response.json();

      return {
        props: { member },
      };
    }
  } catch (error) {
    console.log('Error getting Member:', error);
  }

  return {
    props: {},
  };
};
