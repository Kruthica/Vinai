import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Setup from "./Setup";
import Dashboard from "./Dashboard";

import "./App.css";

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">Vinai</h1>

        <div className="nav-links">
          <a href="#">Features</a>
          <a href="#">About</a>

          <Link to="/login">
            Login
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="badge">
          Smart Task Management
        </div>

        <h1>
          Organize your tasks
          <br />
          with clarity and focus
        </h1>

        <p>
          A modern productivity
          platform that adapts to your
          energy, schedule, and
          lifestyle.
        </p>

        <div className="buttons">
          <Link to="/signup">
            <button className="primary-btn">
              Get Started
            </button>
          </Link>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing Routes */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* New Routes */}
        <Route
          path="/setup"
          element={<Setup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;