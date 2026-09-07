"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/";
      console.log("Logged in:", data.user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">
        {/* Brand */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white font-semibold">
            W
          </div>

          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111]">
            Welcome back
          </h1>

          <p className="mt-2 text-[14px] text-[#737373]">
            Sign in to continue to your workspace
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[13px] font-medium text-[#333]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-11 w-full rounded-lg border border-black/[0.12] bg-white px-3.5 text-sm outline-none transition placeholder:text-[#a3a3a3] focus:border-black/40 focus:ring-4 focus:ring-black/[0.04]"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[13px] font-medium text-[#333]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-[12px] font-medium text-[#666] hover:text-black"
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="h-11 w-full rounded-lg border border-black/[0.12] bg-white px-3.5 text-sm outline-none transition placeholder:text-[#a3a3a3] focus:border-black/40 focus:ring-4 focus:ring-black/[0.04]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#111] text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/[0.08]" />
            <span className="text-[11px] text-[#999]">OR</span>
            <div className="h-px flex-1 bg-black/[0.08]" />
          </div>

          <button
            type="button"
            className="h-11 w-full rounded-lg border border-black/[0.1] bg-white text-sm font-medium text-[#222] transition hover:bg-[#fafafa]"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-[#737373]">
          Don't have an account?{" "}
          <span className="cursor-pointer font-medium text-[#111]">
            Create one
          </span>
        </p>
      </div>
    </main>
  );
}
