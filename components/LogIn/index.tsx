"use client";
import { type FormEvent, useState } from "react";
import { users } from "@/data/Users";
import { useApp } from "@/context/AppContext";
export default function Login() {
  const { login } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    const ok = users.find(
      (u) => u.username === username.trim() && u.password === password,
    );
    if (ok) {
      login(ok);
      setError("");
    } else
      setError(
        "Username or password doesn't match. Try one of the demo accounts below.",
      );
  }
  return (
    <section className="login-page">
      <div className="login-panel">
        <p className="eyebrow">THE RECIPE CLUB</p>
        <h1>
          Cook something
          <br />
          <em>worth remembering.</em>
        </h1>
        <p>
          Sign in to get personalised recipes, save favourites and build your
          own collection.
        </p>
      </div>
      <form className="login-form" onSubmit={submit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. anu"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="button primary full" type="submit">
          Log in →
        </button>
        <div className="demo ">
          <strong className="text-2xl">Demo accounts</strong>
          <span className="text-xl">anu / anu123</span>
          <span className="text-xl">john / john123</span>
          <span className="text-xl">jane / jane123</span>
          <span className="text-xl">alice / alice123</span>
        </div>
      </form >
    </section >
  );
}
