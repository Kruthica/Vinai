import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [selectedView, setSelectedView] =
    useState("Today");

  const [selectedEnergy, setSelectedEnergy] =
    useState("Deep Focus");

  const [selectedPlace, setSelectedPlace] =
    useState("Office");

  const [sortBy, setSortBy] =
    useState("Priority");

  const [places, setPlaces] = useState([
    "Home",
    "Office",
    "Cafe",
  ]);

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const addTask = () => {
    const taskName = prompt(
      "Enter Task Name"
    );

    if (!taskName) return;

    const priority =
      prompt(
        "Priority (High / Medium / Low)"
      ) || "Medium";

    const energy =
      prompt(
        "Energy (Low Energy / Deep Focus / High Energy)"
      ) || "Deep Focus";

    const time =
      prompt(
        "Time Estimate (e.g. 30 min)"
      ) || "30 min";

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: taskName,
        priority,
        energy,
        time,
      },
    ]);
  };

  const deleteTask = (id) => {
    setTasks(
      tasks.filter(
        (task) => task.id !== id
      )
    );
  };

  const addPlace = () => {
    const newPlace =
      prompt("Enter place name");

    if (
      newPlace &&
      !places.includes(newPlace)
    ) {
      setPlaces([
        ...places,
        newPlace,
      ]);
    }
  };

  const removePlace = (place) => {
    setPlaces(
      places.filter(
        (p) => p !== place
      )
    );
  };

  return (
    <div
      className={`dashboard ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-box">
            V
          </div>

          <div>
            <h2>Vinai</h2>
            <p>MINDFUL CORE</p>
          </div>
        </div>

        <button
          className="add-task-btn"
          onClick={addTask}
        >
          + Add Task
        </button>

        <div className="section-title">
          CONTROL ROOM
        </div>

        <ul className="menu">

          <li
            className={
              selectedView ===
              "Universal Inbox"
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedView(
                "Universal Inbox"
              )
            }
          >
            📥 Universal Inbox
          </li>

          <li
            className={
              selectedView ===
              "Today"
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedView(
                "Today"
              )
            }
          >
            📅 Today
          </li>

          <li
            className={
              selectedView ===
              "Next 7 Days"
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedView(
                "Next 7 Days"
              )
            }
          >
            📆 Next 7 Days
          </li>

          <li
            className={
              selectedView ===
              "Calendar View"
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedView(
                "Calendar View"
              )
            }
          >
            🗓 Calendar View
          </li>

          <li
            className={
              selectedView ===
              "Focus Sessions"
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedView(
                "Focus Sessions"
              )
            }
          >
            ⏱ Focus Sessions
          </li>

        </ul>

        <div className="section-title">
          COMMITMENTS
        </div>

        <ul className="commitments">
          <li>🔵 Work</li>
          <li>🟤 Personal</li>
          <li>🟢 Side Hustle</li>
          <li>🟠 Learning</li>
        </ul>

        <div className="user-card">
          <h3>
            {user?.name || "User"}
          </h3>

          <p>
            {selectedEnergy}
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </aside>
          {/* MAIN CONTENT */}
          <main className="main-content">

<div className="header">
  <div>
    <h1>
      Good Afternoon,
      <br />
      {user?.name || "User"}.
    </h1>

    <p className="subtitle">
      ● BREATHE IN FOCUS
    </p>
  </div>

  <button
    className="theme-btn"
    onClick={() =>
      setDarkMode(!darkMode)
    }
  >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>

<div className="focus-header">
  <h2>{selectedView}</h2>

  <div className="filters">

    <button
      onClick={() =>
        setSortBy("Priority")
      }
    >
      Priority
    </button>

    <button
      onClick={() =>
        setSortBy("Energy")
      }
    >
      Energy
    </button>

    <button
      onClick={() =>
        setSortBy("Time")
      }
    >
      Time
    </button>

  </div>
</div>

{tasks.length === 0 ? (

  <div className="focus-card">

    <div className="empty-icon">
      ✳
    </div>

    <h3>
      No Tasks Added Yet
    </h3>

    <p>
      Click Add Task and create
      your first activity.
    </p>

  </div>

) : (

  <div className="tasks-container">

    {tasks.map((task) => (

      <div
        key={task.id}
        className="task-card"
      >
        <h3>{task.name}</h3>

        <p>
          Priority:
          {" "}
          {task.priority}
        </p>

        <p>
          Energy:
          {" "}
          {task.energy}
        </p>

        <p>
          Time:
          {" "}
          {task.time}
        </p>

        <button
          className="delete-btn"
          onClick={() =>
            deleteTask(task.id)
          }
        >
          Delete
        </button>

      </div>

    ))}

  </div>

)}

</main>

{/* RIGHT PANEL */}

<aside className="right-panel">

<div className="card">

  <h4>
    ⚡ ENERGY LEVEL
  </h4>

  <div
    className={`energy-item ${
      selectedEnergy ===
      "Low Energy"
        ? "active-energy"
        : ""
    }`}
    onClick={() =>
      setSelectedEnergy(
        "Low Energy"
      )
    }
  >
    <strong>
      ⚡ Low Energy
    </strong>

    <p>
      Busywork & admin tasks
    </p>
  </div>

  <div
    className={`energy-item ${
      selectedEnergy ===
      "Deep Focus"
        ? "active-energy"
        : ""
    }`}
    onClick={() =>
      setSelectedEnergy(
        "Deep Focus"
      )
    }
  >
    <strong>
      🧠 Deep Focus
    </strong>

    <p>
      Complex creative work
    </p>
  </div>

  <div
    className={`energy-item ${
      selectedEnergy ===
      "High Energy"
        ? "active-energy"
        : ""
    }`}
    onClick={() =>
      setSelectedEnergy(
        "High Energy"
      )
    }
  >
    <strong>
      🏃 High Energy
    </strong>

    <p>
      Fast execution mode
    </p>
  </div>

</div>

<div className="card">

  <h4>
    📍 WHERE ARE YOU?
  </h4>

  <div className="tags">

    {places.map((place) => (

      <div
        key={place}
        className={`place-tag ${
          selectedPlace ===
          place
            ? "active-tag"
            : ""
        }`}
      >
        <span
          onClick={() =>
            setSelectedPlace(
              place
            )
          }
        >
          {place}
        </span>

        <button
          onClick={() =>
            removePlace(place)
          }
        >
          ×
        </button>
      </div>

    ))}

  </div>

  <button
    className="place-btn"
    onClick={addPlace}
  >
    + Add Place
  </button>

</div>

<div className="card">

  <h4>
    🛡 LIFE MODE
  </h4>

  <h3>
    Hide work after 6 PM
  </h3>

  <p>
    Protect personal time and
    avoid burnout.
  </p>

</div>

</aside>

</div>
);
}

export default Dashboard;