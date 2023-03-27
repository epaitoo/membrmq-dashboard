import AuthForm from '../../components/auth/AuthForm';

export default function signUpPage() {
  return (
    <div>
      <AuthForm isSignUp={true} />
    </div>
  );
}