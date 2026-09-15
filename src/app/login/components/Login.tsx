"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    agreeTerms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(null);
    setSuccess(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Invalid username or password.");
        return;
      }

      router.push(data.user?.role === "ADMIN" ? "/admin/dashboard" : "/");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        const messages = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.message || "Failed to submit request.";
        setError(messages);
        return;
      }

      setSuccess(
        "Access request submitted! You will receive your login credentials via email once approved.",
      );
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        agreeTerms: false,
      }));
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isSignUp ? handleRequestAccess : handleLogin;

  return (
    <div className="w-full bg-[#F4F0E7] mx-auto flex flex-col flex-1 box-border relative overflow-hidden">
      {/* Background Hero Section (Underlay) */}
      <div className="relative flex flex-1 items-center justify-center w-full">
        {/* Background Visual Structure */}
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 items-center pointer-events-none select-none opacity-80 lg:opacity-100">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:pl-16 xl:pl-20 py-12 lg:py-16">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-[64px] font-black tracking-tight text-[#000000] uppercase leading-[1.08] mb-4">
              NEBULOID GAMES
            </h1>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[32px] font-bold text-[#000000] leading-snug mb-5">
              Play. Think. Challenge Yourself.
            </h2>
            <p className="text-[#333333] text-sm sm:text-base md:text-[17px] font-normal leading-relaxed max-w-[490px] mb-8">
              A collection of interactive games designed and crafted by Nebuloid
              to challenge your logic, speed, memory, and creativity.
            </p>
            <div>
              <div className="inline-flex items-center justify-center px-7 py-3 bg-[#FEF6E4] text-[#000000] border border-[#E6DCC3] rounded-[14px] font-serif text-[15px] sm:text-[16px] font-bold tracking-[0.08em] uppercase">
                EXPLORE NOW
              </div>
            </div>
          </div>

          {/* Right 3D Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end px-6 sm:px-10 lg:pr-12 xl:pr-16 py-8 lg:py-12 relative w-full h-full">
            <div className="relative w-full max-w-[580px] xl:max-w-[640px] aspect-[1.3/1] flex items-center justify-center">
              <Image
                src="/hero-img.png"
                alt="Nebuloid 3D Math and Logic Games Illustration"
                fill
                priority
                className="object-contain object-center lg:object-right"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Centered Glassmorphic Modal Card */}
        <div className="relative z-20 my-10 py-12 px-4 w-full flex justify-center backdrop-blur-xs">
          <div className="relative w-full max-w-[490px] rounded-[28px] border border-black/30 shadow-[0px_10px_35px_-5px_rgba(0,0,0,0.18)] p-7 sm:p-9 overflow-hidden transition-all duration-300 isolate">
            {/* Backdrop Blur Background Layer (Only blurs what is behind the card) */}
            <div
              className="absolute inset-0 bg-[#F4F0E7]/70 backdrop-blur-md pointer-events-none -z-10"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            />

            {/* Form Content Layer - 100% Crisp, Sharp, No Blur */}
            <div className="relative z-10">
              {/* Header Title */}
              <h2 className="font-serif text-3xl sm:text-[34px] font-bold text-black text-center mb-6 tracking-tight">
                {isSignUp ? "Sign up" : "Log in"}
              </h2>

              <div className="absolute top-0 right-0 bg-amber-400 w-8 h-8 text-center flex justify-center items-center font-bold text-white rounded-full">
                <Link href="/">
                  ✕
                </Link>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {/* Error/Success Messages */}
                {error && (
                  <div className="rounded-[14px] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="rounded-[14px] border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                  </div>
                )}

                {!isSignUp ? (
                  /* Login Fields */
                  <>
                    <div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="User Name"
                        required
                        className="w-full h-[50px] px-5 bg-white/20 border border-black/40 rounded-[14px] text-black placeholder:text-[#666666] text-[15px] outline-none focus:border-black focus:ring-1 focus:ring-black/20 transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full h-[50px] px-5 bg-white/20 border border-black/40 rounded-[14px] text-black placeholder:text-[#666666] text-[15px] outline-none focus:border-black focus:ring-1 focus:ring-black/20 transition-all"
                      />
                    </div>
                    {/* Options row */}
                    <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#222222] px-1 pt-0.5">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-black/40 text-black accent-black cursor-pointer"
                        />
                        <span>Remember Me</span>
                      </label>

                      <Link
                        href="/"
                        className="text-[#2563EB] hover:underline font-medium"
                      >
                        Forget Password?
                      </Link>
                    </div>
                  </>
                ) : (
                  /* Sign Up / Request Access Fields */
                  <>
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full h-[50px] px-5 bg-white/20 border border-black/40 rounded-[14px] text-black placeholder:text-[#666666] text-[15px] outline-none focus:border-black focus:ring-1 focus:ring-black/20 transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        required
                        className="w-full h-[50px] px-5 bg-white/20 border border-black/40 rounded-[14px] text-black placeholder:text-[#666666] text-[15px] outline-none focus:border-black focus:ring-1 focus:ring-black/20 transition-all"
                      />
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#222222] px-1 pt-0.5">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                        className="w-4 h-4 rounded border-black/40 text-black accent-black shrink-0 cursor-pointer"
                      />
                      <label
                        htmlFor="agreeTerms"
                        className="cursor-pointer select-none leading-tight"
                      >
                        I agree to the{" "}
                        <span className="font-bold text-black hover:underline">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="font-bold text-black hover:underline">
                          Privacy Policy
                        </span>
                      </label>
                    </div>
                  </>
                )}

                {/* Centered Submit Button */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-9 py-2.5 min-w-[130px] h-[44px] flex items-center justify-center bg-[#FEF6E4] hover:bg-[#FAEDD0] text-[#000000] border border-[#E6DCC3] rounded-[14px] font-serif text-[16px] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:shadow-sm active:scale-95 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Please wait..."
                      : isSignUp
                        ? "REQUEST ACCESS"
                        : "LOGIN"}
                  </button>
                </div>

                {/* Bottom Toggle Link */}
                <div className="text-center pt-1">
                  <p className="text-xs sm:text-[13px] text-[#444444]">
                    {!isSignUp ? (
                      <>
                        Don&apos;t Have An Account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsSignUp(true);
                            setError(null);
                            setSuccess(null);
                          }}
                          className="font-bold text-black hover:underline cursor-pointer ml-1"
                        >
                          Request Access
                        </button>
                      </>
                    ) : (
                      <>
                        Already Have An Account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsSignUp(false);
                            setError(null);
                            setSuccess(null);
                          }}
                          className="font-bold text-black hover:underline cursor-pointer ml-1"
                        >
                          Login
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>

      {/* Bottom Feature Strip */}
      <div className="w-full border-t border-black grid grid-cols-3 bg-[#F4F0E7] shrink-0">
        {/* Item 1 */}
        <div className="flex items-center justify-center px-6 py-5 border-r border-black">
          <span className="font-serif text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold text-black uppercase tracking-tight text-center">
            14+ UNIQUE GAMES
          </span>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-center px-6 py-5 border-r border-black">
          <span className="font-serif text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold text-black uppercase tracking-tight text-center">
            CRAFTED BY NEBULOID
          </span>
        </div>

        {/* Item 3 */}
        <div className="flex items-center justify-center px-6 py-5">
          <span className="font-serif text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold text-black uppercase tracking-tight text-center">
            PLAY <span className="italic font-serif font-normal">&amp;</span>{" "}
            GROW
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
