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
            <SignUp routing="hash" signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL} />
          </Flex>
        </Box>
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </>
  );
}
