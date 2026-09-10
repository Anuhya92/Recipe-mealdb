"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Navigation() {
  const { user, logout } = useApp();
  const router = useRouter();

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/Categories">Categories</Link>
        <Link href="/Profile">Profile</Link>
      </div>
      <button className="nav-logout" type="button" onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
}
