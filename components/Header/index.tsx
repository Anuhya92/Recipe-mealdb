"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
export default function Header() {
  const { user } = useApp();
  return (
    <header className="site-header">
      <Link href="/" className="brand">
         plate & palate
      </Link>
      <div className="header-status">
        {user ? (
          <>
            <span className="status-dot" />
            {user.username}
          </>
        ) : (
          "Recipe discovery"
        )}
      </div>
    </header>
  );
}
