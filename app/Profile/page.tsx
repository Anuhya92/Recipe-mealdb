"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function ProfilePage() {
  const { user, savedMeals, favouriteCategory, logout } = useApp();
  if (!user)
    return (
      <section className="page-shell">
        <div className="empty-state">
          <p className="eyebrow">PROFILE</p>
          <h1>You&apos;re not logged in</h1>
          <p>Head home to sign in and access your saved recipes.</p>
          <Link className="button primary" href="/">
            Go to login
          </Link>
        </div>
      </section>
    );
  return (
    <section className="page-shell">
      <div className="profile-head">
        <div>
          <p className="eyebrow">YOUR PROFILE</p>
          <h1>Hi, {user.username}.</h1>
          <p>
            Favourite category:{" "}
            <strong>{favouriteCategory || user.category}</strong>
          </p>
        </div>
        
      </div>
      <div className="stat-row">
        <div>
          <strong>{savedMeals.length}</strong>
          <span>Saved recipes</span>
        </div>
        <div>
          <strong>{favouriteCategory || user.category}</strong>
          <span>Favourite category</span>
        </div>
      </div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR COLLECTION</p>
          <h2>Saved recipes</h2>
        </div>
      </div>
      {savedMeals.length ? (
        <div className="meal-grid">
          {savedMeals.map((meal) => (
            <Link
              href={`/meal/${meal.idMeal}`}
              className="meal-card"
              key={meal.idMeal}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div>
                <h2>{meal.strMeal}</h2>
                <span>Open recipe →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No saved recipes yet</h2>
          <p>
            Browse categories and tap “Save recipe” on anything you want to
            keep.
          </p>
          <Link className="button primary" href="/Categories">
            Find a recipe
          </Link>
        </div>
      )}
    </section>
  );
}
