import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function UserTest() {
  return (
    <>
      <SignedIn>
        <h1>Test protected page</h1>
      </SignedIn>
      <SignedOut>
        <h1>Must be signed in</h1>
      </SignedOut>
    </>
  );
}
