// LearnEarn.jsx
import React, { useState } from 'react';
import styles from './LearnEarn.module.css';

const articleText = `EarnHub is a platform where users can earn rewards through tasks, quizzes, referrals, and time-based challenges. Designed for non-tech users, it makes earning online simple, engaging, and rewarding.`;

const questions = [
    { q: 'What is EarnHub?', options: ['Game', 'Earning Platform', 'Social Media', 'Bank'], answer: 1 },
    { q: 'Which feature does EarnHub offer?', options: ['Quizzes', 'Investments', 'Streaming', 'Trading'], answer: 0 },
    { q: 'Is EarnHub beginner-friendly?', options: ['Yes', 'No', 'Only Experts', 'Unclear'], answer: 0 },
    { q: 'Which is NOT part of EarnHub?', options: ['Referrals', 'Mining', 'Learning', 'Gambling'], answer: 3 },
    { q: 'What kind of users does EarnHub target?', options: ['Designers', 'Developers', 'Non-tech', 'Writers'], answer: 2 },
];

const LearnEarn = () => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (i) => {
        if (i === questions[step - 1].answer) setScore(score + 1);
        setStep(step + 1);
    };

    return (
        <div className={styles.quizContainer}>
            {step === 0 && (
                <div className={styles.articleCard}>
                    <h2>Quiz of the Week</h2>
                    <p className={styles.articleText}>{articleText}</p>
                    <button onClick={() => setStep(1)} className={styles.startBtn}>Start Quiz</button>
                </div>
            )}

            {step > 0 && step <= questions.length && (
                <div className={styles.quizCard}>
                    <p className={styles.progress}>Question {step} of {questions.length}</p>
                    <h3 className={styles.question}>{questions[step - 1].q}</h3>
                    <div className={styles.options}>
                        {questions[step - 1].options.map((opt, i) => (
                            <button key={i} onClick={() => handleAnswer(i)} className={styles.optionBtn}>{opt}</button>
                        ))}
                    </div>
                </div>
            )}

            {step > questions.length && (
                <div className={styles.resultCard}>
                    <h2>Quiz Completed!</h2>
                    <p className={styles.scoreText}>Your Score: {score} / {questions.length}</p>
                    <button onClick={() => { setStep(0); setScore(0); }} className={styles.retryBtn}>Try Again</button>
                </div>
            )}
        </div>
    );
};

export default LearnEarn;
