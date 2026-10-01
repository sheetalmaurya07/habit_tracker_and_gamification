import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Achievements() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("token") || !user.id) {
            navigate("/login");
            return;
        }

        api.get("/api/habits", { params: { userId: user.id } })
            .then(res => setHabits(res.data))
            .catch(err => console.error(err));
    }, []);

    const completed = habits.filter(h => h.completed).length;
    const points = user.points || 0;

    const achievements = [
        { title: "🌱 First Step", text: "Create your first habit.", unlocked: habits.length >= 1 },
        { title: "⭐ First Completion", text: "Complete your first habit.", unlocked: completed >= 1 },
        { title: "🔥 5 Points", text: "Reach at least 50 points.", unlocked: points >= 50 },
        { title: "🏆 10 Completions", text: "Complete 10 habits.", unlocked: completed >= 10 }
    ];

    return (
        <div className="dashboard-page">
            <nav className="navbar">
                <div className="navbar-brand">🌱 Habit Quest</div>
                <div className="navbar-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/habits">Habits</Link>
                    <Link to="/progress">Progress</Link>
                    <Link to="/achievements">Achievements</Link>
                </div>
            </nav>

            <main style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
                <h1>🏆 Achievements</h1>

                {achievements.map((item, index) => (
                    <div className="auth-card" style={{ width: "100%", marginBottom: "15px" }} key={index}>
                        <h2>{item.title} {item.unlocked ? "✅" : "🔒"}</h2>
                        <p>{item.text}</p>
                        <strong>{item.unlocked ? "Unlocked" : "Locked"}</strong>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Achievements;
