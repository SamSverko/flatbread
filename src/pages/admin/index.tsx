import * as React from 'react';

import AdminNavCard from '../../components/admin-nav-card';
import Card from '../../components/card';

// import styles from '../../styles/admin.module.scss';

import type { NextPage } from 'next';

const Admin: NextPage = () => {
    return (
        <>
            <Card>
                <h2>Admin / Recipes</h2>
            </Card>

            <AdminNavCard />
        </>
    );
};

export default Admin;
