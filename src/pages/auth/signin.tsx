import AuthForm from '../../components/auth/AuthForm';

export default function signInPage() {
  return (
    <div>
      <AuthForm isSignUp={false} />
    </div>
  );
}