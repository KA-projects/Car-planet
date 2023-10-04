"use client";

import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useAppSelector, useAppDispath } from "@/layers/lib/hooks/redux";

const LoginForm: FC = () => {
  const dispatch = useAppDispath();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const status = useAppSelector((state) => state.auth.status);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (status === "succeeded" && typeof accessToken === "string") {
      localStorage.setItem("token", accessToken);
      console.count("status");
    }
  }, [status, accessToken]);

  const handleLogin = async () => {
    dispatch(login({ email, password }));
  };

  console.log("isAuth: ", isAuth);
  console.log("status: ", status);
  console.log("token: ", localStorage.getItem("token"));

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setEmail(e.currentTarget.value)}
        value={email}
        placeholder="email"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
        value={password}
        placeholder="password"
      />

      <button onClick={handleLogin}>Login </button>
    </div>
  );
};

export default LoginForm;
