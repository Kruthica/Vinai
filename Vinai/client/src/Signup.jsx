import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch =
    password === confirmPassword && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      // Clear form after successful signup
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to login page
      navigate("/setup");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    }
  };

  return (
    <div className="signup-container">
      <h1>Create Account</h1>

      <form
        className="signup-form"
        onSubmit={handleSubmit}
      >
        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
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

        {/* Confirm Password */}
        <div className="password-container">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
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
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>
        </div>

        {/* Real-Time Validation */}
        {confirmPassword &&
          password !==
            confirmPassword && (
            <p className="error-message">
              ❌ Passwords do not match
            </p>
          )}

        {confirmPassword &&
          password ===
            confirmPassword && (
            <p className="success-message">
              ✅ Passwords match
            </p>
          )}

        {/* Terms & Conditions */}
        <div className="remember-me">
          <input
            type="checkbox"
            id="terms"
            required
          />
          <label htmlFor="terms">
            I agree to the Terms &
            Conditions
          </label>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          disabled={!passwordsMatch}
          className="signup-btn"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;