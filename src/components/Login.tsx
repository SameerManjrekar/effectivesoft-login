import React, { useState } from "react";
import "../App.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // track if user has interacted with each field
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const emailError = !email
    ? "Email is required"
    : !EMAIL_RE.test(email)
    ? "Enter a valid email"
    : null;

  const passwordError = !password
    ? "Password is required"
    : password.length < 8
    ? "Min 8 characters"
    : null;

  const invalid = !!emailError || !!passwordError;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouchedEmail(true);
    setTouchedPassword(true);

    if (invalid) return;

    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: { id: number } = await res.json();

      const token = `placeholder-token-${data.id}`;
      sessionStorage.setItem("auth_token", token);
      setMessage(`Successfully Signed in. Id is ${data.id}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <form className="card" onSubmit={onSubmit} noValidate>
        <h1 className="title">Sign in</h1>

        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouchedEmail(true)}
          className={`input ${touchedEmail && emailError ? "input-error" : ""}`}
        />
        {touchedEmail && emailError && <div className="hint">{emailError}</div>}

        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="pw-block">
          <input
            id="password"
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouchedPassword(true)}
            className={`input ${
              touchedPassword && passwordError ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="link-btn link-inline"
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        {touchedPassword && passwordError && (
          <div className="hint">{passwordError}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`btn ${submitting ? "btn-disabled" : ""}`}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
      </form>
    </div>
  );
}
