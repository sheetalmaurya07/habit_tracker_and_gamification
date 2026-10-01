import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import AddHabit from "./pages/AddHabit";
import Progress from "./pages/Progress";
import Achievements from "./pages/Achievements";

function App() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>

                {/* Home */}
                <Route
                    path="/"
                    element={
                        token
                            ? <Navigate to="/dashboard" />
                            : <Navigate to="/login" />
                    }
                />

                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Main Application */}
                <Route
                    path="/dashboard"
                    element={
                        token
                            ? <Dashboard />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/habits"
                    element={
                        token
                            ? <Habits />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/add-habit"
                    element={
                        token
                            ? <AddHabit />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/progress"
                    element={
                        token
                            ? <Progress />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/achievements"
                    element={
                        token
                            ? <Achievements />
                            : <Navigate to="/login" />
                    }
                />

                {/* Unknown URL */}
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;