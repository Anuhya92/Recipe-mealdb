"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Navigation() {
  const { user, logout } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-links">
        <Link className={pathname === "/" ? "active" : ""} href="/">Home</Link>
        <Link className={pathname === "/Categories" || pathname.startsWith("/category/") ? "active" : ""} href="/Categories">Categories</Link>
        <Link className={pathname === "/Profile" ? "active" : ""} href="/Profile">Profile</Link>
      </div>
      <button className="nav-logout" type="button" onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
}
