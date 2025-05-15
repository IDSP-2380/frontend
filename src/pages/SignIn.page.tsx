import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Box, Flex } from '@mantine/core';
import ClerkStyle from '../styles/Clerk.module.css';

console.log(import.meta.env.VITE_CLERK_SIGN_UP_URL);

export default function SignInPage() {
  return (
    <>
      <SignedOut>
        <Box className={ClerkStyle.mainWrapper}>
          <Flex justify={'center'} align={'center'}>
            <SignIn routing="hash" signUpUrl={import.meta.env.VITE_CLERK_SIGN_UP_URL} />
          </Flex>
        </Box>
        {/* <SignIn
          routing="hash"
          signUpUrl={import.meta.env.VITE_CLERK_SIGN_UP_URL}
          appearance={{
            elements: {
              formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold',
              card: 'shadow-lg rounded-lg p-6',
              headerTitle: 'text-2xl font-bold',
              footerActionText: 'text-sm text-gray-500',
            },
            variables: {
              colorPrimary: '#6366f1',
            },
          }}
        /> */}
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </>
  );
}
