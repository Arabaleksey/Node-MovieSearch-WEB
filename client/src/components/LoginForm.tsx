import React, { FC, useState } from "react";
import AuthService from "../services/AuthService";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email: any, password: any) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      console.log(response)
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };

  const registration = async (email: any, password: any) => {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button onClick={() => login(email, password)}>Login</button>
      <button onClick={() => registration(email, password)}>
        Registration
      </button>
    </div>
  );
};

export default LoginForm;
