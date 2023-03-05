import { useSession, signIn, signOut } from 'next-auth/react';
import * as React from 'react';

import Card from '../components/card';

import type { NextPage } from 'next';

const AdminPage: NextPage = () => {
    const { data: session, status } = useSession();

    // States
    const [userEmail, setUserEmail] = React.useState('');

    // Effects
    React.useEffect(() => {
        if (session && session.user && session.user.email) {
            setUserEmail(session?.user?.email);
        }
    }, [session]);

    return (
        <>
            <Card>
                <h2>Admin</h2>
            </Card>

            <Card hide={status as string === 'authenticated'}>
                <p>Not signed in.</p>
                <div>
                    <button onClick={() => signIn('github')}>Sign in</button>
                </div>
            </Card>

            <Card hide={status as string !== 'authenticated'}>
                <p>Signed in as {userEmail}</p>
                <div>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            </Card>
        </>
    );
};

export default AdminPage;
