import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Card from '../../components/card';

import styles from './index.module.scss';

const AdminNavCard = () => {
    const adminRoutes = [
        {
            name: 'Recipes',
            path: '/admin',
        },
        {
            name: 'Categories',
            path: '/admin/categories',
        },
        {
            name: 'Ingredients',
            path: '/admin/ingredients',
        },
        {
            name: 'Ingredient Units',
            path: '/admin/ingredient-units',
        },
        {
            name: 'Quantity Fractions',
            path: '/admin/quantity-fractions',
        },
        {
            name: 'Serving Units',
            path: '/admin/serving-units',
        },
    ];

    // Hooks
    const router = useRouter();
    const { data: session } = useSession();

    // States
    const [userEmail, setUserEmail] = React.useState('');

    // Effects
    React.useEffect(() => {
        if (session && session.user && session.user.email) {
            setUserEmail(session?.user?.email);
        }
    }, [session]);

    // Renderers
    return (
        <Card hide={!userEmail}>
            <p>Signed in as <b>{userEmail}</b></p>

            <p><b>Admin routes:</b></p>
            <ul className={styles['admin-links']}>
                {adminRoutes.map((adminRoute) => {
                    return (
                        <li key={`admin-route-${adminRoute.name}`}>
                            <Link aria-current={(adminRoute.path === router.pathname) ? 'page' : 'false'} href={adminRoute.path}>{adminRoute.name}</Link>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        </Card>
    );
};

export default AdminNavCard;
