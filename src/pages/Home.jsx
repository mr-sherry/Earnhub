import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Home.module.css';
import {
    Star as StarIcon,
    Star, Users, DollarSign, Gift, Shield,
    TrendingUp, CheckCircle, ChevronDown, Play, Zap
} from 'lucide-react';

// Animation variants
const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const tapEffect = {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.03 },
};
const FilledStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffc107" viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.416 8.264L12 19.771l-7.416 4.089L6 15.596 0 9.748l8.332-1.73z" />
    </svg>
);

const Home = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [counters, setCounters] = useState({ users: 0, withdrawals: 0, earnings: 0 });


    const testimonials = [
        { name: "Ahmad Khan", text: "Earned ₨50,000 in 3 months!", rating: 5, avatar: "AK" },
        { name: "Sara Ahmed", text: "Perfect for students, quick payments!", rating: 5, avatar: "SA" },
        { name: "Muhammad Ali", text: "Won ₨1000 in daily spin!", rating: 5, avatar: "MA" },
        { name: "Fatima Noor", text: "Best referral program. Helped my entire group earn daily.", rating: 5, avatar: "FN" },
        { name: "Usman Tariq", text: "Withdrew to Binance in 30 seconds. 100% real.", rating: 5, avatar: "UT" },
        { name: "Hira Qureshi", text: "Learned about crypto and earned too. Amazing concept!", rating: 5, avatar: "HQ" },
        { name: "Bilal Rauf", text: "Started for fun, now it pays my phone bills monthly.", rating: 5, avatar: "BR" },
        { name: "Areeba Shah", text: "TimeDrop tasks are 🔥. Easy and high paying.", rating: 5, avatar: "AS" }
    ];


    useEffect(() => {
        const timer = setTimeout(() => {
            setCounters({ users: 50000, withdrawals: 2500000, earnings: 10000 });
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            let startTime;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = (currentTime - startTime) / duration;
                if (progress < 1) {
                    setCount(Math.floor(end * progress));
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(animate);
        }, [end, duration]);
        return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
    };

    const FeatureCard = ({ icon: Icon, title, description }) => (
        <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            {...tapEffect}
            className={`${styles.glassCard} ${styles.hoverGlow}`}
        >
            <div className={styles.cardIcon}><Icon /></div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardText}>{description}</p>
        </motion.div>
    );

    const StepCard = ({ number, title, description, icon: Icon }) => (
        <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            {...tapEffect}
            className={styles.stepCard}
        >
            <div className={styles.stepNumber}>{number}</div>
            <Icon className={styles.stepIcon} />
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardText}>{description}</p>
        </motion.div>
    );

    const TestimonialCard = ({ name, text, rating, avatar }) => (
        <div className={styles.testimonialCard}>
            <div className={styles.stars}>
                {[...Array(rating)].map((_, i) => <FilledStar key={i} />)}
            </div>
            <p className={styles.testimonialText}>“{text}”</p>
            <div className={styles.avatar}>{avatar}</div>
            <div className={styles.userName}>{name}</div>
        </div>
    );

    return (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className={styles.landingWrapper}>

            {/* Hero Section */}
            <motion.section
                className={styles.heroSection}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.container}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Earn Daily Without Investment
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Complete Tasks, Invite Friends, Spin &amp; Win – All in One App.
                    </motion.p>
                    <div className={styles.buttonGroup}>
                        <motion.button {...tapEffect} className={styles.primaryButton}>
                            <Play className={styles.icon} /> Get Started
                        </motion.button>
                        <motion.button {...tapEffect} className={styles.secondaryButton}>
                            How It Works
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* How It Works */}
            <motion.section id="how-it-works" className={styles.section} variants={staggerContainer}>
                <h2 className={styles.sectionTitle}>How It Works</h2>
                <motion.div className={styles.cardGrid}>
                    {[1, 2, 3, 4, 5].map((step, i) => (
                        <StepCard
                            key={i}
                            number={step}
                            title={["Sign Up", "Complete Tasks", "Refer Friends", "Spin & Win", "Withdraw"][i]}
                            description={[
                                "Quick registration with referral bonus",
                                "Install apps, quizzes, etc.",
                                "Earn from their activity",
                                "Daily spins, free rewards",
                                "Instant JazzCash/EasyPaisa"
                            ][i]}
                            icon={[Users, CheckCircle, Gift, Zap, DollarSign][i]}
                        />
                    ))}
                </motion.div>
            </motion.section>

            {/* Features */}
            <motion.section id="features" className={styles.section} variants={staggerContainer}>
                <h2 className={styles.sectionTitle}>Features</h2>
                <motion.div className={styles.cardGrid}>
                    {[
                        {
                            icon: TrendingUp,
                            title: "Referral Growth",
                            description: "Multiply your earnings by building a referral network. Every task completed by your referrals earns you a commission. It’s a passive income model where your early outreach pays off long-term. Top referrers unlock special perks and badges."
                        },
                        {
                            icon: CheckCircle,
                            title: "Learn & Earn",
                            description: "Complete micro-learning modules and short quizzes to earn while improving your knowledge. This feature combines education with earning, making it perfect for students and lifelong learners. Topics include finance, crypto, productivity, and more."
                        },
                        {
                            icon: Zap,
                            title: "TimeDrop Tasks",
                            description: "Get exclusive access to high-paying, limited-time offers that expire fast. These flash opportunities reward speed and activity, letting you earn more in less time. Users who act quickly benefit from the highest-paying tasks before they vanish."
                        },
                        {
                            icon: Gift,
                            title: "Daily Spin",
                            description: "Stay engaged with our daily spin wheel. Win points, cash bonuses, or booster multipliers just by logging in daily. It's a fun, gamified way to reward consistency and increase your daily earnings potential — with no risk involved."
                        },
                        {
                            icon: DollarSign,
                            title: "Fast Withdrawals",
                            description: "Withdraw your earnings instantly through JazzCash, EasyPaisa, or Binance with no minimum delay. Our withdrawal system is secure, automated, and trusted — ensuring your money reaches you when you need it, with full transparency."
                        },
                        {
                            icon: Shield,
                            title: "Secure & Anti-Cheat",
                            description: "EarnHub is built with anti-bot measures, fraud detection, and user verification to ensure fair play. Your efforts are protected, and bad actors are blocked. We prioritize transparency, data integrity, and a trustworthy reward system."
                        }
                    ].map((f, i) => (
                        <FeatureCard key={i} {...f} />
                    ))}
                </motion.div>
            </motion.section>

            {/* Testimonials */}
            <motion.section id="testimonials" className={styles.section} variants={staggerContainer}>
                <h2 className={styles.sectionTitle}>Success Stories</h2>
                <div className={styles.testimonialWrapper}>
                    <motion.div
                        className={styles.testimonialTrack}
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    >
                        {[...testimonials, ...testimonials].map((review, index) => (
                            <TestimonialCard key={index} {...review} />
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* FAQ */}
            <motion.section id="faq" className={styles.section} variants={staggerContainer}>
                <h2 className={styles.sectionTitle}>FAQ</h2>
                <div className={styles.faqContainer}>
                    {[
                        {
                            q: "Is it free?",
                            a: `Absolutely. EarnHub is—and always will be—100 % free to join and use.
    • No sign-up fee, monthly subscription, or hidden “maintenance” charge.  
    • You never have to load money or buy credits to unlock tasks; the platform is funded by advertisers and partners, so all earnings flow to you.  
    • Optional boosters (e.g., NFT multipliers) are entirely voluntary and do not affect your base earning potential.`
                        },
                        {
                            q: "How do I withdraw?",
                            a: `We support three instant payout rails: JazzCash, EasyPaisa, and Binance Pay.  
    1. Tap **“Wallet → Withdraw.”**  
    2. Choose your preferred method.  
    3. Enter the amount (min PKR 100 or crypto equivalent).  
    4. Confirm; funds usually arrive within 60 seconds, 24 × 7.  
    • Zero withdrawal fee on JazzCash/EasyPaisa; Binance charges its standard network fee only.  
    • Account name/number must match your verified profile to prevent fraud.`
                        },
                        {
                            q: "What tasks are available?",
                            a: `EarnHub offers four high-yield task types so you can pick what fits your schedule:  
    • **Install & Try Apps:** Download, open for 30 sec, earn up to ₨400 per install via AdGem/OfferToro.  
    • **Learn & Earn Quizzes:** Short micro-courses (tech, finance, crypto); score 80 %+ to claim bonus points.  
    • **Referral Actions:** Every time your invitee completes a task, you earn a lifetime commission—perfect passive income.  
    • **TimeDrop Flash Tasks:** Limited-time, high-payout offers released randomly; grab them fast for 2-5× normal rates.`
                        }
                    ]
                        .map((faq, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUpVariant}
                                className={styles.faqCard}
                            >
                                <motion.button
                                    {...tapEffect}
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className={styles.faqQuestion}
                                >
                                    {faq.q}
                                    <ChevronDown className={activeFaq === index ? styles.iconRotated : ''} />
                                </motion.button>
                                {activeFaq === index && <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={styles.faqAnswer}>
                                    {faq.a}
                                </motion.p>}
                            </motion.div>
                        ))}
                </div>
            </motion.section>



        </motion.div>
    );
};

export default Home;
