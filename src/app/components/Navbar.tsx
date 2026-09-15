"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  username: string;
  role: string;
}

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <header className="w-full bg-[#F4F0E7]">
      <nav
        className="w-full mx-auto bg-[#F4F0E7] border border-[#000000] flex items-center justify-between px-5 py-2 shadow-[0px_4px_50.2px_-12px_rgba(0,0,0,0.25)] box-border"
        style={{
          boxShadow: "0px 4px 50.2px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center h-full select-none focus:outline-none transition-opacity hover:opacity-90"
        >
          <Image
            src="/nebuloid-logo.png"
            alt="Nebuloid Gaming Logo"
            width={72}
            height={72}
            priority
            className="h-[72px] w-auto object-contain"
          />
        </Link>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.role === "ADMIN" && (
                <Link
                  href="/admin/dashboard"
                  className="px-5 py-2 h-[40px] flex items-center justify-center bg-[#22201D] hover:bg-[#333333] text-[#FEF6E4] border border-[#22201D] rounded-[14px] font-serif text-[14px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:shadow-sm active:scale-95 cursor-pointer select-none"
                >
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-8 py-2.5 min-w-[120px] h-[40px] flex items-center justify-center bg-[#FFF6E3] hover:bg-[#FAEDD0] text-[#000000] border border-[#E6DCC3] rounded-[14px] font-serif text-[18px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:shadow-sm active:scale-95 cursor-pointer select-none disabled:opacity-50"
              >
                {loggingOut ? "..." : "Logout"}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-8 py-2.5 min-w-[120px] h-[40px] flex items-center justify-center bg-[#FFF6E3] hover:bg-[#FAEDD0] text-[#000000] border border-[#E6DCC3] rounded-[14px] font-serif text-[18px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 hover:shadow-sm active:scale-95 cursor-pointer select-none"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
