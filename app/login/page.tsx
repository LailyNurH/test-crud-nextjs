"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setButtonDisabled(user.email === "" || user.password === "");
  }, [user]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://stg-dafbin.fly.dev/login", user);
      console.log("loginsuccess", response.data);

      if (response.status === 200) {
        const { data, token } = response.data;
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("token", token);

        router.push("/person");
      }
    } catch (error) {
      console.log("login failed ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl mb-4">{loading ? "Processing" : "Login"}</h1>

      <div className="grid gap-4">
        <div>
          <label htmlFor="email" className="text-lg">Email</label>
          <input
            className="py-2 px-4 rounded border-2 border-gray-300 w-full"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-lg">Password</label>
          <input
            className="py-2 px-4 rounded border-2 border-gray-300 w-full"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        <button
          className={`py-2 px-4 rounded border-2 border-gray-300 ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
          disabled={buttonDisabled}
          onClick={handleLogin}
        >
          {loading ? "Processing" : "Login"}
        </button>
      </div>
    </div>
  );
}