import Link from 'next/link';
import * as React from 'react';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href='/'>
                        <a>Flatbread</a>
                    </Link>
                </li>
                <li>
                    <Link href='/settings'>
                        <a>Settings</a>
                    </Link>
                </li>
            </ul>

            <hr />
        </nav>
    );
};

export default NavBar;
