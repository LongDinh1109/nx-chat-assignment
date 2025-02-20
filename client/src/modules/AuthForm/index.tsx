import Input from '../../components/Input';
import Form from '../../components/Form';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import Spinner from '../../components/Spinner';

export const LoginForm: React.FC = () => {
  const { handleLogin, isLoading } = useAppContext();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username);
  };

  return (
    <div className="min-h-screen relative">
      {isLoading && (
        <div className="w-full h-full bg-gray-500 opacity-50 fixed">
          <Spinner />
        </div>
      )}
      <div className="h-screen m-auto flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Form
          onSubmit={handleSubmit}
          error={null}
          header={'Sign in to your account'}
        >
          <div className="w-[300px] mx-auto rounded-md shadow-sm -space-y-px">
            <Input
              value={username}
              onChange={setUsername}
              placeholder="Username"
              isRequired={false}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Sign in</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
