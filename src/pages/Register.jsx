import React, { useState } from "react";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassword,
  checkUsername,
} from "../components/Validator";
import { useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css";

export const LOCAL_STORAGE_KEY = "userData";

export const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([]);
  const navigate = useNavigate();

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
    const usernameResults = checkUsername(formData.userName);
    const emailResults = checkEmail(formData.email);
    const passwordResults = checkPassword(formData.password);
    const confirmPasswordResults = checkConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    setUsernameErrors(usernameResults);
    setEmailErrors(emailResults);
    setPasswordErrors(passwordResults);
    setConfirmPasswordErrors(confirmPasswordResults);
    if (
      usernameResults.length === 0 &&
      emailResults.length === 0 &&
      passwordResults.length === 0 &&
      confirmPasswordResults.length === 0
    ) {
      const newUser = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      const userList =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updatedUserList = [...userList, newUser];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUserList));

      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          className={`${styles.formGroup} ${
            usernameErrors.length > 0 ? styles.error : ""
          }`}
        >
          <label htmlFor="userName" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            name="userName"
            className={styles.input}
            value={formData.userName}
            onChange={handleInputChange}
          />
          {usernameErrors.length > 0 && (
            <div className={`${styles.msg}`}>{usernameErrors.join(", ")}</div>
          )}
        </div>
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
          {emailErrors.length > 0 && (
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
          {passwordErrors.length > 0 && (
            <div className={`${styles.msg}`}>{passwordErrors.join(", ")}</div>
          )}
        </div>

        <div
          className={`${styles.formGroup} ${
            confirmPasswordErrors.length > 0 ? styles.error : ""
          }`}
        >
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className={styles.input}
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {confirmPasswordErrors.length > 0 && (
            <div className={`${styles.msg}`}>
              {confirmPasswordErrors.join(", ")}
            </div>
          )}
        </div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
