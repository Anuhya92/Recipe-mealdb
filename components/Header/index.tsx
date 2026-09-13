"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
export default function Header() {
  const { user } = useApp();
  return (
    <header className="site-header">
      <Link href="/" className="brand">
         Swedish Tastes
      </Link>
      {user && (
        <div className="header-user">
          <span className="status-dot" />
          <span>Hi, {user.username}</span>
        </div>
      )}
    </header>
  );
}
