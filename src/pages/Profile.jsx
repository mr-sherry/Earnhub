// Profile.jsx
import React from "react";
import styles from "./Profile.module.css";

import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Profile = () => {
    const { user } = useAuth();            // Get user info from AuthContext
    const { dashboardData, loadingDashboard } = useApp(); // Get stats from AppContext

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    if (loadingDashboard) return <p>Loading profile…</p>;
    if (!user || !dashboardData) return <p>User data not available</p>;

    const avatar = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user.displayName || "User"}`;
    const name = user.displayName || "Anonymous";

    const {
        totalPoints = 0,
        earnings = 0,
        tasksCompleted = 0,
        referrals = 0,
    } = dashboardData;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.heroCard}>
                <img
                    src={avatar}
                    alt="Profile"
                    className={styles.avatar}
                />
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.role}>Earner</p>

                <div className={styles.stats}>
                    <div>
                        <p className={styles.statNumber}>{totalPoints}</p>
                        <p className={styles.statLabel}>Points</p>
                    </div>
                    <div>
                        <p className={styles.statNumber}>₨{earnings}</p>
                        <p className={styles.statLabel}>Earnings</p>
                    </div>
                    <div>
                        <p className={styles.statNumber}>{tasksCompleted}</p>
                        <p className={styles.statLabel}>Tasks</p>
                    </div>
                    <div>
                        <p className={styles.statNumber}>{referrals}</p>
                        <p className={styles.statLabel}>Referrals</p>
                    </div>
                </div>

                <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
