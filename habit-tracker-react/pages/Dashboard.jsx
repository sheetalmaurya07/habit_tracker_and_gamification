import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const navigate = useNavigate();
    const [habits, setHabits] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || !user.id) {
            navigate("/login");
            return;
        }

        api.get("/api/habits", { params: { userId: user.id } })
            .then((res) => setHabits(res.data))
            .catch((err) => console.error("Dashboard error:", err))
            .finally(() => setLoading(false));
    }, [navigate, user.id]);

    const completed = habits.filter(h => h.completed).length;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dashboard-page">
            <nav className="navbar">
                <div className="navbar-brand">🌱 Habit Quest</div>
                <div className="navbar-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/habits">Habits</Link>
                    <Link to="/progress">Progress</Link>
                    <Link to="/achievements">Achievements</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>

            <main style={{ padding: "30px", maxWidth: "1100px", margin: "auto" }}>
                <h1>Welcome, {user.name || "User"}! 👋</h1>
                <p>Keep building good habits every day.</p>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", margin: "25px 0" }}>
                    <div className="auth-card" style={{ width: "220px" }}>
                        <h3>Total Habits</h3>
                        <h2>{loading ? "..." : habits.length}</h2>
                    </div>
                    <div className="auth-card" style={{ width: "220px" }}>
                        <h3>Completed</h3>
                        <h2>{loading ? "..." : completed}</h2>
                    </div>
                    <div className="auth-card" style={{ width: "220px" }}>
                        <h3>Points</h3>
                        <h2>{user.points || 0} ⭐</h2>
                    </div>
                </div>

                <div className="auth-card" style={{ width: "100%" }}>
                    <h2>Quick Actions</h2>
                    <p><Link to="/add-habit">➕ Add a new habit</Link></p>
                    <p><Link to="/habits">📋 Manage your habits</Link></p>
                    <p><Link to="/progress">📈 View progress</Link></p>
                    <p><Link to="/achievements">🏆 View achievements</Link></p>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
