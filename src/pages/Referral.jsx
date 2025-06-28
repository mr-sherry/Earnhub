// File: src/pages/Referral.jsx
import React, { useEffect, useState } from 'react';
import styles from './Referral.module.css';
import QRCode from 'react-qr-code';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const Referral = () => {
    const { user } = useAuth(); // Firebase Auth user
    const [copied, setCopied] = useState(false);
    const [referralCode, setReferralCode] = useState('');
    const [referralsList, setReferralsList] = useState([]);
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [referralEarnings, setReferralEarnings] = useState(0);

    useEffect(() => {
        if (!user?.uid) return;

        const fetchReferralData = async () => {
            try {
                const ref = doc(db, 'users', user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setReferralCode(data.referralCode || '');
                    setReferralsList(data.referralsList || []);
                    setTotalReferrals(data.referrals || 0);
                    setReferralEarnings(data.referralEarnings || 0);
                }
            } catch (err) {
                console.error('Error fetching referral data:', err);
            }
        };

        fetchReferralData();
    }, [user]);

    const referralLink = `https://earnhub.app/r/${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Optional: filter active referrals (those who earned points or have status === 'Active')
    const activeReferrals = referralsList.filter(r => r.status === 'Active' || r.points > 0);

    return (
        <div className={styles.referralContainer}>
            <h1 className={styles.pageTitle}>Your Referral Hub</h1>

            {/* QR Code and Invite Link */}
            <div className={styles.shareCard}>
                <QRCode size={150} value={referralLink} bgColor="#0f2027" fgColor="#fff" />
                <div>
                    <p className={styles.refText}>Invite Link</p>
                    <div className={styles.linkBox}>
                        <span>{referralLink}</span>
                        <button onClick={handleCopy} className={styles.copyBtn}>Copy</button>
                    </div>
                    {copied && <p className={styles.copied}>Link copied ✔</p>}
                </div>
            </div>

            {/* KPI Summary */}
            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}><h3>Total Referrals</h3><p>{totalReferrals}</p></div>
                <div className={styles.kpiCard}><h3>Active Referrals</h3><p>{activeReferrals.length}</p></div>
                <div className={styles.kpiCard}><h3>Referral Earnings</h3><p>₨{referralEarnings}</p></div>
                <div className={styles.kpiCard}><h3>Tier</h3><p>Silver {1 + activeReferrals.length * 0.01}×</p></div>
            </div>

            {/* Progress Bar (example logic: 50 referrals = full bar) */}
            <div className={styles.milestoneBar}>
                <h3>Milestone Progress</h3>
                <div className={styles.progressOuter}>
                    <div
                        className={styles.progressInner}
                        style={{ width: `${Math.min((totalReferrals / 50) * 100, 100)}%` }}
                    />
                </div>
                <p>Next reward in {50 - totalReferrals} invites</p>
            </div>

            {/* Referral Table */}
            <div className={styles.referralList}>
                <h3>Referred Users</h3>
                <table className={styles.table}>
                    <thead>
                        <tr><th>Name</th><th>Joined</th><th>Points</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {referralsList.map((r, i) => (
                            <tr key={i}>
                                <td>{r.name || 'Unnamed'}</td>
                                <td>{r.joinedAt ? new Date(r.joinedAt.seconds * 1000).toLocaleDateString() : '-'}</td>
                                <td>{r.points || 0}</td>
                                <td>{r.status || 'Pending'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* FAQs */}
            <div className={styles.faq}>
                <details>
                    <summary>How are referral points calculated?</summary>
                    <p>Each active referral earns you 25 points once they complete 1 task.</p>
                </details>
                <details>
                    <summary>What counts as active?</summary>
                    <p>Anyone who signs up and completes at least one task.</p>
                </details>
                <details>
                    <summary>How many referrals can I earn from monthly?</summary>
                    <p>Unlimited, but bonus milestones reset monthly.</p>
                </details>
            </div>
        </div>
    );
};

export default Referral;
