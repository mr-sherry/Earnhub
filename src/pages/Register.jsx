// File: src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import {
    doc,
    setDoc,
    getDocs,
    collection,
    addDoc,
    query,
    where,
    serverTimestamp,
} from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Register.module.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [refCode, setRefCode] = useState('');
    const [isRefValid, setIsRefValid] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    /* -------------------- Handle ?ref=XXXX -------------------- */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get('ref');
        if (ref) {
            setRefCode(ref);
            validateReferral(ref);
        }
    }, [location]);

    const validateReferral = async (code) => {
        const q = query(collection(db, 'users'), where('referralCode', '==', code));
        const snapshot = await getDocs(q);
        setIsRefValid(!snapshot.empty);
    };

    /* -------------------- Register -------------------- */
    const handleRegister = async (e) => {
        e.preventDefault();
        if (refCode && !isRefValid) {
            setError('Invalid referral code.');
            return;
        }

        try {
            /* --- 1. Firebase Auth signup --- */
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            /* --- 2. Set Auth displayName --- */
            await updateProfile(user, { displayName: name });

            /* --- 3. Generate referral‑code (first 8 chars of UID) --- */
            const referralCode = user.uid.slice(0, 8);

            /* --- 4. Build default chart arrays (prevent Recharts errors) --- */
            const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => ({
                name: d,
                views: 0,
            }));
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => ({
                name: m,
                tasks: 0,
            }));
            const revenue = months.map((m) => ({ name: m.name, revenue: 0 }));

            /* --- 5. Save FULL user doc to Firestore --- */
            await setDoc(doc(db, 'users', user.uid), {
                /* Identity */
                uid: user.uid,
                name,
                email: user.email,
                avatar: `https://api.dicebear.com/7.x/micah/svg?seed=${name}`,
                role: 'Earner',

                /* Referral */
                referralCode,
                referredBy: refCode || '',
                referrals: 0,
                referralsList: [],

                /* Stats */
                totalPoints: 0,
                earnings: 0,
                tasksCompleted: 0,
                streak: 0,
                weeklyViews: weekdays,
                monthlyTasks: months,
                revenueStats: revenue,

                /* Meta */
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            /* --- 6. Record referral relationship (optional sub‑collection) --- */
            if (refCode) {
                await addDoc(collection(db, 'referrals', refCode, 'children'), {
                    referredUserId: user.uid,
                    completedTask: false,
                    date: serverTimestamp(),
                });
            }

            /* --- 7. Redirect to dashboard --- */
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    /* -------------------- UI -------------------- */
    return (
        <div className={styles.formContainer}>
            <div className={styles.glassCard}>
                <h2>Register</h2>
                {error && <p className={styles.errorText}>{error}</p>}
                <form onSubmit={handleRegister} className={styles.authForm}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {refCode && (
                        <>
                            <label>Referred By:</label>
                            <input
                                type="text"
                                value={refCode}
                                disabled
                                style={{ borderColor: isRefValid ? '#ccc' : 'red' }}
                            />
                            {!isRefValid && (
                                <p className={styles.errorText}>Referral code not found.</p>
                            )}
                        </>
                    )}

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
