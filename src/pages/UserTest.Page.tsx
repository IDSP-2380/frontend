import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export default function UserTest() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const token = await getToken();
        const res = await axios.get('http://localhost:3000/api/user/test', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch protected data', err);
      }
    };

    fetchTestData();
  }, [getToken]);

  return (
    <>
      <SignedIn>
        <h1>Test protected page</h1>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>loading data</p>}
      </SignedIn>
      <SignedOut>
        <h1>Must be signed in</h1>
      </SignedOut>
    </>
  );
}
