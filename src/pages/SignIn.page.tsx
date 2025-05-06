import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

console.log(import.meta.env.VITE_CLERK_SIGN_UP_URL);

export default function SignInPage() {
  return (
    <>
      <SignedOut>
        <SignIn routing="hash" signUpUrl={import.meta.env.VITE_CLERK_SIGN_UP_URL} />
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </>
  );
}
