"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email === "error@example.com") {
        setErrors({ general: "Invalid email or password. Please try again." });
        setIsSubmitting(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setErrors({ general: "Something went wrong. Please try again later." });
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 25%, #f5f0ff 50%, #ffffff 75%, #f0f4ff 100%)",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#7c3aed", margin: 0 }}>NoteNest</h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Collaborative Knowledge Base for Teams</p>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
          border: "1px solid #f3f4f6",
          padding: "32px",
        }}>
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#111827", textAlign: "center", margin: "0 0 6px" }}>Welcome back</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center", margin: "0 0 28px" }}>Sign in to your account to continue</p>

          {errors.general && (
            <div style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "12px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              padding: "14px",
              fontSize: "14px",
              color: "#dc2626",
            }}>
              <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label htmlFor="email" style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#111827", marginBottom: "8px" }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af" }} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    border: `1px solid ${errors.email ? "#f87171" : "#e5e7eb"}`,
                    backgroundColor: "#f9fafb",
                    paddingLeft: "40px",
                    paddingRight: "16px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#ef4444" }}>
                  <AlertCircle style={{ width: 14, height: 14 }} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label htmlFor="password" style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>Password</label>
                <Link href="/forgot-password" style={{ fontSize: "12px", color: "#7c3aed", textDecoration: "none" }}>Forgot password?</Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af" }} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    border: `1px solid ${errors.password ? "#f87171" : "#e5e7eb"}`,
                    backgroundColor: "#f9fafb",
                    paddingLeft: "40px",
                    paddingRight: "16px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
              </div>
              {errors.password && (
                <p id="password-error" style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#ef4444" }}>
                  <AlertCircle style={{ width: 14, height: 14 }} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "#ffffff",
                fontWeight: 500,
                padding: "12px",
                borderRadius: "12px",
                fontSize: "14px",
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.6 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (<><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />Signing in...</>) : (<>Sign in<ArrowRight style={{ width: 16, height: 16 }} /></>)}
            </button>
          </form>

          {/* Divider */}
          <div style={{ position: "relative", margin: "24px 0" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}><div style={{ width: "100%", borderTop: "1px solid #e5e7eb" }} /></div>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", fontSize: "12px" }}><span style={{ backgroundColor: "#ffffff", padding: "0 12px", color: "#9ca3af" }}>or continue with</span></div>
          </div>

          {/* Google */}
          <button style={{
            width: "100%",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "12px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#374151",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}>
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        {/* Footer */}
        <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#7c3aed", fontWeight: 500, textDecoration: "none" }}>Sign up</Link>
        </p>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
