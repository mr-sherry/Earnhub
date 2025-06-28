import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './SideBar/Sidebar';
import styles from './Header.module.css';
import logo from '../assets/brand.png'

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <img src={logo} alt="" />
            </h1>

            {/* Desktop Nav */}
            <nav className={styles.navDesktop}>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/tasks">Tasks</Link>
                        <Link to="/learn-earn">Learn & Earn</Link>
                        <Link to="/timedrop">TimeDrop</Link>
                        <Link to="/referral">Referrals</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>

            {/* Mobile Hamburger */}
            <div className={styles.hamburger} onClick={toggleSidebar}>
                {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
                user={user}
                handleLogout={handleLogout}
            />
        </header>
    );
};

export default Header;
