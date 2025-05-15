import { SignedIn, SignedOut, SignUp } from '@clerk/clerk-react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { Box, Flex } from '@mantine/core';
import ClerkStyle from '../styles/Clerk.module.css';

export default function SignUpPage() {
  return (
    <>
      <SignedOut>
        <Box className={ClerkStyle.mainWrapper}>
          <Flex justify={'center'} align={'center'}>
            <SignUp
              routing="hash"
              signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL}
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold',
                  card: 'w-[500px] max-w-full p-8 shadow-lg rounded-lg',
                  headerTitle: 'text-2xl font-bold',
                  footerActionText: 'text-sm text-gray-500',
                },
                variables: {
                  colorPrimary: '#2d4ab4',
                },
              }}
            />
          </Flex>
        </Box>
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </>
  );
}
