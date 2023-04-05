import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons';
import { Link } from 'react-router-dom';

import { useLogin } from '../api';

export const LoginForm: React.FC = () => {
  const form = useForm({ initialValues: { username: '', password: '' } });
  const login = useLogin({
    config: {
      onError: ({ response }) => {
        form.setErrors((response?.data as any).errors);
      },
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login.mutateAsync({ data: form.values });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInput
          name="username"
          placeholder="Username"
          icon={<IconAt size={14} />}
          {...form.getInputProps('username')}
        />
      </div>
      <div className="mb-2">
        <PasswordInput
          name="password"
          placeholder="Password"
          icon={<IconLock size={14} />}
          {...form.getInputProps('password')}
        />
      </div>

      <div className="mb-4 flex justify-end text-sm">
        <Anchor component={Link} to="/">
          Lupa Password?
        </Anchor>
      </div>

      <Button type="submit" fullWidth loading={login.isLoading}>
        Masuk
      </Button>
    </form>
  );
};
