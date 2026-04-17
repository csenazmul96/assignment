import React from 'react';
import styles from "./Header.module.css";
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <nav className={styles.nav}>
                    <NavLink to="/todos" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink } >
                        Todo List
                    </NavLink>
                    <NavLink to="/form-builder" className={({ isActive }) => isActive? `${styles.navLink} ${styles.navLinkActive}`: styles.navLink}>
                        Form Builder
                    </NavLink>
                    <NavLink to="/form-preview" className={({ isActive }) =>isActive? `${styles.navLink} ${styles.navLinkActive}`: styles.navLink}>
                        Form Preview
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;