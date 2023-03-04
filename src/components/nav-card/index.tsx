import Link from 'next/link';
import * as React from 'react';

import Icon from '../icon';

import styles from './index.module.scss';

import type { Route } from '../../types';

type ComponentsProps = {
    activeRoute: string;
    routes: Route[];
}

const NavCard = ({ activeRoute, routes }: ComponentsProps) => {
    // Renderers
    return (
        <>
            <nav className={styles.container}>
                <ul>
                    {routes.map((route, index) => {
                        return (
                            <li key={`nav-link-${index}`}>
                                <Link className={(activeRoute === route.path) ? styles.active : ''} href={route.path}>
                                    <Icon ariaHidden={true} Icon={route.icon} />
                                    {route.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className={styles['hide-overflow']}></div>
        </>
    );
};

export default NavCard;
