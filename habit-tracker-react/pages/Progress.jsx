import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Progress() {
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
    const total = habits.length;
    const percentage = total ? Math.round((completed / total) * 100) : 0;

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
                <h1>📈 Progress</h1>

                <div className="auth-card" style={{ width: "100%" }}>
                    <h2>{percentage}% Complete</h2>
                    <div style={{
                        width: "100%", height: "25px", background: "#ddd",
                        borderRadius: "20px", overflow: "hidden"
                    }}>
                        <div style={{
                            width: `${percentage}%`, height: "100%",
                            background: "#4caf50"
                        }} />
                    </div>

                    <p>{completed} of {total} habits completed.</p>
                </div>
            </main>
        </div>
    );
}

export default Progress;
