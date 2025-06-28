// TimeDrop.jsx
import React, { useEffect, useState } from 'react';
import styles from './TimeDrop.module.css';

const timeDropQuestion = {
    q: 'How often can you claim Time Drop?',
    options: ['Once a day', 'Every 2 hours', 'Every hour', 'Every minute'],
    answer: 2
};

const TimeDrop = () => {
    const [nextClaimTime, setNextClaimTime] = useState(null);
    const [now, setNow] = useState(Date.now());
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState(false);

    useEffect(() => {
        const last = localStorage.getItem('lastTimeDrop');
        if (last) setNextClaimTime(Number(last) + 3600000);
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const canClaim = !nextClaimTime || now >= nextClaimTime;

    const handleAnswer = (index) => {
        const isCorrect = index === timeDropQuestion.answer;
        setAnswered(true);
        setCorrect(isCorrect);
        if (isCorrect) {
            localStorage.setItem('lastTimeDrop', Date.now());
            setNextClaimTime(Date.now() + 3600000);
        }
    };

    const getCountdown = () => {
        const remaining = nextClaimTime - now;
        if (remaining <= 0) return '00:00:00';
        const h = Math.floor(remaining / 3600000).toString().padStart(2, '0');
        const m = Math.floor((remaining % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((remaining % 60000) / 1000).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className={styles.timeDropCard}>
            <h2>🕒 Time Drop Quiz</h2>
            {!canClaim ? (
                <p className={styles.timer}>Next question in: <strong>{getCountdown()}</strong></p>
            ) : !answered ? (
                <>
                    <p className={styles.question}>{timeDropQuestion.q}</p>
                    <div className={styles.options}>
                        {timeDropQuestion.options.map((opt, i) => (
                            <button key={i} onClick={() => handleAnswer(i)} className={styles.optionBtn}>{opt}</button>
                        ))}
                    </div>
                </>
            ) : (
                <p className={styles.result}>{correct ? '✅ Correct! Reward Claimed.' : '❌ Wrong! Try next hour.'}</p>
            )}
        </div>
    );
};

export default TimeDrop;
