import Link from 'next/link';
import * as React from 'react';

import CogIcon from '../../public/icons/bx-cog.svg';
import CogSolidIcon from '../../public/icons/bxs-cog.svg';

import InfoCircleIcon from '../../public/icons/bx-info-circle.svg';
import InfoCircleSolidIcon from '../../public/icons/bxs-info-circle.svg';

import SearchIcon from '../../public/icons/bx-search.svg';
import SearchSolidIcon from '../../public/icons/bxs-search.svg';

import styles from './nav-bar.module.scss';

type NavBarProps = {
    activeRoute: string
}

const NavBar = ({ activeRoute }: NavBarProps) => {
    return (
        <nav className={styles.container}>
            <ul>
                <li>
                    <Link href='/settings'>
                        <a className={(activeRoute === '/settings') ? styles.active : ''}>
                            {(activeRoute === '/settings')
                                ? <CogSolidIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                                : <CogIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                            }
                            Settings
                        </a>
                    </Link>
                    <Link href='/about'>
                        <a className={(activeRoute === '/about') ? styles.active : ''}>
                            {(activeRoute === '/about')
                                ? <InfoCircleSolidIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                                : <InfoCircleIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                            }
                            About
                        </a>
                    </Link>
                    <Link href='/'>
                        <a className={(activeRoute === '/') ? styles.active : ''}>
                            {(activeRoute === '/')
                                ? <SearchSolidIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                                : <SearchIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                            }
                            Search
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
