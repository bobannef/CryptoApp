import React, { useContext, useEffect, useState } from "react";
import { checkEmail, checkPassword } from "../components/Validator";
import styles from "../styles/register.module.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "./Register";
import { toast } from "react-toastify";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (existingUsers && existingUsers.length > 0) {
      const firstUser = existingUsers[0];
      setFormData({
        email: firstUser.email,
        password: firstUser.password,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailResults = checkEmail(formData.email);
    const passwordResults = checkPassword(formData.password);
    setEmailErrors(emailResults);
    setPasswordErrors(passwordResults);

    const existingUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (existingUsers) {
      const existingUser = existingUsers.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      if (existingUser) {
        logIn(existingUser);
        navigate("/home");
      } else {
        toast.error("Invalid email or password", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      alert("No users registered yet. Please register first.");
      navigate("/register");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          className={`${styles.formGroup} ${
            emailErrors.length > 0 ? styles.error : ""
          }`}
        >
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleInputChange}
          />
          {formData.email && emailErrors.length > 0 && (
            <div className={`${styles.msg}`}>{emailErrors.join(", ")}</div>
          )}
        </div>
        <div
          className={`${styles.formGroup} ${
            passwordErrors.length > 0 ? styles.error : ""
          }`}
        >
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            className={styles.input}
            value={formData.password}
            onChange={handleInputChange}
          />
          {formData.password && passwordErrors.length > 0 && (
            <div className={`${styles.msg}`}>{passwordErrors.join(", ")}</div>
          )}
        </div>

        <button className={styles.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
