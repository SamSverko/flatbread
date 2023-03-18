import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    action: (type: 'yes' | 'no') => void;
    children: JSX.Element | JSX.Element[];
    header: string;
}

const AlertDialog = ({
    action,
    children,
    header,
}: ComponentProps) => {
    // Refs
    const headerRef = React.useRef(null);

    // Effects
    React.useEffect(() => {
        const header = headerRef.current;
        if (header) (header as HTMLElement).focus();

        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

        return function cleanup() {
            document.body.style.removeProperty('height');
            document.body.style.removeProperty('overflow');
        };
    }, []);

    // Event listeners
    function handleOnClickAction(type: 'yes' | 'no') {
        action(type);
    }

    function handleOnKeyUpAlert(event: React.KeyboardEvent) {
        if (event.key === 'Escape') {
            action('no');
        }
    }

    // Renderers
    return (
        <div className={styles.container}>
            <div className={styles.background}></div>
            <div
                aria-describedby='alert-body'
                aria-labelledby='alert-header'
                aria-modal='true'
                className={styles.alert}
                onKeyUp={handleOnKeyUpAlert}
                role='alertdialog'
            >
                <div className={styles.header}>
                    <h2 id='alert-header' ref={headerRef} tabIndex={-1}>{header}</h2>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.actions}>
                    <button className='secondary' onClick={() => handleOnClickAction('no')}>No</button>
                    <button onClick={() => handleOnClickAction('yes')}>Yes</button>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog;
