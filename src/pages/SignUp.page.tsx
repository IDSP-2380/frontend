import { SignedIn, SignedOut, SignUp } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <>
      <SignedOut>
        <SignUp routing="path" path="/sign-up" signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL} />
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </>
  );
}
