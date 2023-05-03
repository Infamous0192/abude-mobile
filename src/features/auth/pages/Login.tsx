import { LoginForm } from '../components';

export const Login: React.FC = () => {
  return (
    <main className="w-full mx-auto px-6 py-16 pb-14">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <LoginForm />
    </main>
  );
};
