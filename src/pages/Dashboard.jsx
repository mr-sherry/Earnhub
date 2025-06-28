// Dashboard.jsx
import React from 'react';
import styles from './Dashboard.module.css';

import { Briefcase, Users, DollarSign, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
} from 'recharts';

import { useApp } from '../context/AppContext';   // 🔑 global data here

/* ---------- presentational KPI card ---------- */
const StatCard = ({ icon, label, value, change }) => (
    <div className={styles.card}>
        <div className={styles.icon}>{icon}</div>
        <div>
            <h3>{label}</h3>
            <p className={styles.value}>{value}</p>
            <p className={styles.change}>{change}</p>
        </div>
    </div>
);

/* ======================= DASHBOARD ======================= */
const Dashboard = () => {
    const { dashboardData, loadingDashboard } = useApp();

    /* ----- loading / empty states ----- */
    if (loadingDashboard) return <div className={styles.loading}>Loading dashboard…</div>;
    if (!dashboardData)
        return (
            <div className={styles.noData}>
                No data available for this account. (Ask admin to initialise your record.)
            </div>
        );

    /* ----- destructure with sensible fallbacks ----- */
    const {
        tasksCompleted = 0,
        newUsersToday = 0,
        totalEarned = 0,
        referrals = 0,
        weeklyViews = [],
        monthlyTasks = [],
        revenueStats = [],
        referralsList = [],
    } = dashboardData;

    return (
        <motion.div
            className={styles.dashboard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* background blobs / gradient */}
            <div className={styles.blobBg} />

            <h1 className={styles.title}>EarnHub Dashboard</h1>

            {/* ---------- KPI CARDS ---------- */}
            <div className={styles.statsGrid}>
                <StatCard
                    icon={<Briefcase />}
                    label="Tasks Completed"
                    value={tasksCompleted.toLocaleString()}
                />
                <StatCard
                    icon={<Users />}
                    label="New Users Today"
                    value={newUsersToday.toLocaleString()}
                />
                <StatCard
                    icon={<DollarSign />}
                    label="Total Earned"
                    value={`${totalEarned.toLocaleString()} PKR`}
                />
                <StatCard
                    icon={<UserPlus />}
                    label="Referrals"
                    value={`+${referrals.toLocaleString()}`}
                />
            </div>

            {/* ---------- CHARTS ---------- */}
            <div className={styles.chartsGrid}>
                {/* Weekly views bar chart */}
                <div className={styles.chart}>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={weeklyViews}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="name" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip />
                            <Bar dataKey="views" fill="#00c6ff" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Monthly tasks line chart */}
                <div className={styles.chart}>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={monthlyTasks}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="name" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="tasks"
                                stroke="#00ffcc"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue stats line chart */}
                <div className={styles.chart}>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={revenueStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="name" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#ff5db1"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ---------- REFERRALS LEADERBOARD ---------- */}
            <div className={styles.referralsBox}>
                <h2>Top Referrals</h2>
                <ul>
                    {referralsList.map((ref, i) => (
                        <li key={i} className={styles.referralItem}>
                            <span>{ref.name}</span>
                            <span>{ref.points} pts</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default Dashboard;
