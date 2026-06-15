import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

      // Store user details
      if (rememberMe) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      } else {
        sessionStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // Redirect to Dashboard after successful login
      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>

      <form
        className="login-form"
        onSubmit={handleLogin}
      >
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        {/* Password */}
        <div className="password-container">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onCopy={(e) =>
              e.preventDefault()
            }
            onCut={(e) =>
              e.preventDefault()
            }
            onPaste={(e) =>
              e.preventDefault()
            }
            onDragStart={(e) =>
              e.preventDefault()
            }
            onContextMenu={(e) =>
              e.preventDefault()
            }
            required
          />

          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>
        </div>

        {/* Remember Me */}
        <div className="remember-me">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) =>
              setRememberMe(
                e.target.checked
              )
            }
          />

          <label htmlFor="remember">
            Remember Me
          </label>
        </div>

        {/* Login Button */}
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;