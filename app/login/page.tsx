"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeSlash,
  LockKey,
  Sparkle,
} from "@phosphor-icons/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

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
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#111]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-[#111] text-white lg:flex lg:flex-col">
          {/* Hero image */}
          <div className="absolute inset-0">
            <img
              src="/images/login-hero.jpg"
              alt="Workly workspace"
              className="h-full w-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Subtle blue tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-black/50" />

            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full min-h-screen flex-col px-10 py-10">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#111]">
                W
              </div>

              <span className="text-[15px] font-semibold tracking-[-0.02em]">
                Workly
              </span>
            </div>

            {/* Main content */}
            <div className="mt-auto max-w-xl pb-10 pt-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-md">
                <Sparkle size={13} weight="fill" />
                Built for focused teams
              </div>

              <h1 className="max-w-[600px] text-[48px] font-semibold leading-[1.04] tracking-[-0.045em]">
                Everything your team needs to{" "}
                <span className="text-blue-400">move work forward.</span>
              </h1>

              <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-white/70">
                Plan projects, organize issues, collaborate with your team, and
                keep every moving piece in one focused workspace.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Organize projects",
                  "Track issues",
                  "Collaborate in real time",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[12px] text-white/75"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                      <Check size={11} weight="bold" />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[11px] text-white/45">
              <span>© {new Date().getFullYear()} Workly</span>
              <span>Project management, simplified.</span>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            RIGHT — LOGIN
        ───────────────────────────────────────── */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f9fb] px-5 py-10 sm:px-8">
          {/* Subtle background detail */}
          <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-500/[0.035] blur-3xl" />

          <div className="relative w-full max-w-[440px]">
            {/* Mobile brand */}
            <div className="mb-14 flex items-center justify-between lg:hidden">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111] text-[12px] font-bold text-white">
                  W
                </div>

                <span className="text-[14px] font-semibold tracking-[-0.02em]">
                  Workly
                </span>
              </Link>

              <span className="text-[11px] text-[#999]">Project workspace</span>
            </div>

            {/* Top context */}
            <div className="mb-10 flex items-center justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
          
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a8f98]">
                    Workspace access
                  </span>
                </div>

                <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.045em] text-[#111318]">
                  Welcome back.
                </h2>

                <p className="mt-2 text-[13px] leading-6 text-[#7a7f87]">
                  Sign in to pick up where your team left off.
                </p>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:flex">
                <LockKey
                  size={17}
                  weight="duotone"
                  className="text-[#70757d]"
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#60656d]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-[50px] w-full rounded-xl border border-black/[0.09] bg-white px-4 text-[13px] text-[#17191d] outline-none transition-all placeholder:text-[#aeb2b8] hover:border-black/[0.15] focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/[0.07]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#60656d]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-[11px] font-medium text-[#737880] transition-colors hover:text-blue-600"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="h-[50px] w-full rounded-xl border border-black/[0.09] bg-white px-4 pr-12 text-[13px] text-[#17191d] outline-none transition-all placeholder:text-[#aeb2b8] hover:border-black/[0.15] focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/[0.07]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#969aa1] transition-all hover:bg-black/[0.035] hover:text-[#333]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <Eye size={16} />
                      ) : (
                        <EyeSlash size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/10 bg-red-500/[0.035] px-3.5 py-3 text-[12px] leading-5 text-red-600">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Primary action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex h-[50px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#111318] text-[13px] font-semibold text-white shadow-[0_5px_18px_rgba(17,19,24,0.12)] transition-all hover:-translate-y-[1px] hover:bg-black hover:shadow-[0_8px_24px_rgba(17,19,24,0.16)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-[400%]" />

                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
                      Signing in
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Continue to Workly
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-black/[0.07]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a2a6ad]">
                  or continue with
                </span>

                <div className="h-px flex-1 bg-black/[0.07]" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="group flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-black/[0.09] bg-white text-[12px] font-semibold text-[#30343a] transition-all hover:border-black/[0.16] hover:bg-[#fcfcfc] hover:shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-black/[0.06] bg-white">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.91-4.18 2.91-7.21Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.75 9.75 0 0 0 12 21.75Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.64H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.52Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.13c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.24 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.24 2.52c.77-2.31 2.93-4.03 5.47-4.03Z"
                    />
                  </svg>
                </span>
                Continue with Google
              </button>
            </form>

            {/* Account creation */}
            <div className="mt-9 flex items-center justify-between border-t border-black/[0.06] pt-6">
              <p className="text-[11px] text-[#858990]">New to Workly?</p>

              <Link
                href="/register"
                className="group flex items-center gap-1 text-[11px] font-semibold text-[#202329] transition-colors hover:text-blue-600"
              >
                Create an account
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Security / legal */}
            <div className="mt-7 flex items-center justify-center gap-2 text-[9px] text-[#a5a8ae]">
              <span className="h-1 w-1 rounded-full bg-[#b9bdc3]" />
              Secure workspace access
              <span className="h-1 w-1 rounded-full bg-[#b9bdc3]" />
              Terms & Privacy
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
