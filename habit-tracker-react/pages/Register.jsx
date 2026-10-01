import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await api.post("/api/auth/register", { name, email, password });
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1200);
        } catch (error) {
            console.error("Registration error:", error);
            setError(
                error.response
                    ? (typeof error.response.data === "string"
                        ? error.response.data
                        : "Registration failed")
                    : "Cannot connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>🌱 Habit Quest</h1>
                <h2>Create Account</h2>

                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}

                <form onSubmit={handleRegister}>
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name"
                        value={name} onChange={(e) => setName(e.target.value)} required />

                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Password</label>
                    <input type="password" placeholder="Create a password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
