import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", { email, password });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify({
                id: response.data.userId,
                name: response.data.name,
                email: response.data.email,
                points: response.data.points
            }));

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setError(
                error.response
                    ? (typeof error.response.data === "string"
                        ? error.response.data
                        : "Invalid email or password")
                    : "Cannot connect to the server. Make sure Spring Boot is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>🌱 Habit Quest</h1>
                <h2>Login</h2>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>Don't have an account? <Link to="/register">Create Account</Link></p>
            </div>
        </div>
    );
}

export default Login;
