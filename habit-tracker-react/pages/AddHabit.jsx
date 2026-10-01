import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function AddHabit() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("Daily");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post(`/api/habits?userId=${user.id}`, {
                name,
                description,
                frequency,
                completed: false
            });
            navigate("/habits");
        } catch (err) {
            console.error(err);
            setError("Unable to add habit.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>➕ Add Habit</h1>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label>Habit Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Drink Water" required />

                    <label>Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your habit" />

                    <label>Frequency</label>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Habit"}
                    </button>
                </form>

                <p><Link to="/habits">← Back to Habits</Link></p>
            </div>
        </div>
    );
}

export default AddHabit;
