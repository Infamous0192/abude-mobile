import { Card } from '@mantine/core';

import { LoginForm } from '../components';

const Login: React.FC = () => {
  return (
    <Card
      className="h-screen md:h-auto w-full md:max-w-md mx-auto px-6 py-8 pb-14"
      shadow="sm"
      p={0}
      radius="md"
    >
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <LoginForm />
    </Card>
  );
};

export default Login;
