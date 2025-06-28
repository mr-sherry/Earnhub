import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, closeSidebar, user, handleLogout }) => {
    return (
        <>
            {/* Backdrop overlay */}
            {isOpen && <div className={styles.backdrop} onClick={closeSidebar} />}

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.menu}>
                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
                            <Link to="/tasks" onClick={closeSidebar}>Tasks</Link>
                            <Link to="/learn-earn" onClick={closeSidebar}>Learn & Earn</Link>
                            <Link to="/timedrop" onClick={closeSidebar}>TimeDrop</Link>
                            <Link to="/referral" onClick={closeSidebar}>Referrals</Link>
                            <Link to="/profile" onClick={closeSidebar}>Profile</Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeSidebar();
                                }}
                                className={styles.logoutBtn}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={closeSidebar}>Login</Link>
                            <Link to="/register" onClick={closeSidebar}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
