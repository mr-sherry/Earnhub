// Tasks.jsx
import React from 'react';
import styles from './Tasks.module.css';

const tasks = {
    "Task Ready": [
        { title: "Hero title concept", tag: "Copywriting", comments: 3, attachments: 7 },
        { title: "Icons for services section", tag: "UI Design", comments: 2, attachments: 5 },
    ],
    "In Progress": [
        { title: "Replace lorem text", tag: "UI Design", comments: 5, attachments: 5 },
        { title: "Generate SVGs", tag: "Illustration", comments: 8, attachments: 7 },
    ],
    "Needs Review": [
        { title: "Check copied content", tag: "Copywriting", comments: 4, attachments: 0 },
        { title: "About page design", tag: "UI Design", comments: 6, attachments: 5 },
    ],
    "Done": [
        { title: "Send illustrations to production", tag: "Illustration", comments: 12, attachments: 5 },
        { title: "Text alignment fix", tag: "Illustration", comments: 3, attachments: 7 },
    ],
};

const TaskCard = ({ task }) => (
    <div className={styles.taskCard}>
        <span className={`${styles.tag} ${styles[task.tag.replace(/\s+/g, '')]}`}>{task.tag}</span>
        <p className={styles.taskTitle}>{task.title}</p>
        <div className={styles.taskFooter}>
            <span>💬 {task.comments}</span>
            <span>📎 {task.attachments}</span>
        </div>
    </div>
);

const Tasks = () => {
    return (
        <div className={styles.boardWrapper}>
            <h1 className={styles.pageTitle}>EarnHub Tasks</h1>
            <div className={styles.boardGrid}>
                {Object.entries(tasks).map(([status, items]) => (
                    <div key={status} className={styles.column}>
                        <h2 className={styles.columnTitle}>{status}</h2>
                        {items.map((task, i) => <TaskCard key={i} task={task} />)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
