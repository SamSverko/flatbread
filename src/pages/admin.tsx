import { getServerSession } from 'next-auth/next';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Card from '../components/card';

import authOptions from './api/auth/[...nextauth]';
import { prisma } from '../prisma/db';
import { getCategoryFormat } from '../prisma/utils';

import type { GetServerSideProps, NextPage } from 'next';

type AdminProps = {
    courseTypes: string[];
    cuisines: string[];
    dietaryRestrictions: string[];
    dishTypes: string[];
}

const Admin: NextPage<AdminProps> = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
}: AdminProps) => {
    console.log(courseTypes, cuisines, dietaryRestrictions, dishTypes);

    // Session
    const { data: session } = useSession();

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

            <Card hide={!userEmail}>
                <p>Signed in as {userEmail}</p>
                <div>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            </Card>
        </>
    );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const courseTypes = await prisma.courseType.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const cuisines = await prisma.cuisine.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const dietaryRestrictions = await prisma.dietaryRestriction.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const dishTypes = await prisma.dishType.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    return {
        props: {
            courseTypes: courseTypes.map(courseType => courseType.name),
            dietaryRestrictions: dietaryRestrictions.map(dietaryRestriction => dietaryRestriction.name),
            cuisines: cuisines.map(cuisine => cuisine.name),
            dishTypes: dishTypes.map(dishType => dishType.name),
            session: session,
        },
    };
};
