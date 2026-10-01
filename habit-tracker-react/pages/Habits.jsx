import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Habits() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [habits, setHabits] = useState([]);
    const [error, setError] = useState("");

    const loadHabits = async () => {
        try {
            const res = await api.get("/api/habits", { params: { userId: user.id } });
            setHabits(res.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load habits.");
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token") || !user.id) navigate("/login");
        else loadHabits();
    }, []);

    const completeHabit = async (id) => {
        try {
            await api.put(`/api/habits/${id}/complete`);
            await loadHabits();
        } catch (err) {
            console.error(err);
            setError("Unable to complete habit.");
        }
    };

    const resetHabit = async (id) => {
        try {
            await api.put(`/api/habits/${id}/reset`);
            await loadHabits();
        } catch (err) {
            console.error(err);
            setError("Unable to reset habit.");
        }
    };

    const deleteHabit = async (id) => {
        if (!window.confirm("Delete this habit?")) return;
        try {
            await api.delete(`/api/habits/${id}`);
            await loadHabits();
        } catch (err) {
            console.error(err);
            setError("Unable to delete habit.");
        }
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
                </div>
            </nav>

            <main style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
                <h1>📋 My Habits</h1>
                <Link to="/add-habit">➕ Add Habit</Link>
                {error && <div className="error" style={{ marginTop: "15px" }}>{error}</div>}

                {habits.length === 0 ? (
                    <div className="auth-card" style={{ width: "100%", marginTop: "25px" }}>
                        <p>No habits found. Add your first habit!</p>
                    </div>
                ) : (
                    <div style={{ marginTop: "25px" }}>
                        {habits.map(habit => (
                            <div className="auth-card" style={{ width: "100%", marginBottom: "15px" }} key={habit.id}>
                                <h2>{habit.name} {habit.completed ? "✅" : "⏳"}</h2>
                                <p>{habit.description || "No description"}</p>
                                <p>Frequency: {habit.frequency || "Not specified"}</p>

                                {!habit.completed ? (
                                    <button onClick={() => completeHabit(habit.id)}>Complete +10 ⭐</button>
                                ) : (
                                    <button onClick={() => resetHabit(habit.id)}>Reset</button>
                                )}
                                <button onClick={() => deleteHabit(habit.id)} style={{ marginLeft: "10px" }}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Habits;
