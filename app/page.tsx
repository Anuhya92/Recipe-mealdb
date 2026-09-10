"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "@/components/LogIn";
import { useApp } from "@/context/AppContext";
import type { Meal } from "@/types/MealType";

export default function Home() {
  const { user, favouriteCategory } = useApp();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const endpoint = user
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(favouriteCategory || user.category)}`
      : "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const item = data.meals?.[0] ?? null;
        setMeal(item);
      })
      .catch(() => {
        if (!cancelled) setMeal(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      setLoading(true);
    };
  }, [user, favouriteCategory]);

  if (!user) {
    return (
      <section className="page-shell">
        <Login />
        <div className="section-heading">
          <div><p className="eyebrow">TODAY&apos;S PICK</p><h2>A recipe to get you started</h2></div>
        </div>
        {loading ? (
          <div className="skeleton-card">Finding something delicious…</div>
        ) : meal ? (
          <div className="feature-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div>
              <span className="pill">{meal.strCategory}</span>
              <h3>{meal.strMeal}</h3>
              <p>Log in to save recipes like this one to your profile.</p>
            </div>
          </div>
        ) : (
          <p>We couldn&apos;t load a recipe right now. Try again in a moment.</p>
        )}
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="hero">
        <div>
          <p className="eyebrow">WELCOME BACK, {user.username.toUpperCase()}</p>
          <h1>Your next favourite<br /><span>meal starts here.</span></h1>
          <p className="hero-copy">Explore recipes, choose a favourite category, and keep the dishes you love in one place.</p>
          <div className="actions">
            <Link className="button primary" href="/Categories">Explore categories</Link>
            <Link className="button ghost" href="/Profile">View saved recipes</Link>
          </div>
        </div>
        <div className="hero-card">
          <span className="pill">YOUR PICK</span>
          <strong>{favouriteCategory || user.category}</strong>
          <p>We use your context preference to personalise this page.</p>
        </div>
      </div>

      <div className="section-heading">
        <div><p className="eyebrow">PERSONALISED FOR YOU</p><h2>Tonight&apos;s inspiration</h2></div>
        <Link href="/Categories">See all →</Link>
      </div>
      {loading ? <div className="skeleton-card">Finding something delicious…</div> : meal ? (
        <Link href={`/meal/${meal.idMeal}`} className="feature-card">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div><span className="pill">FROM {favouriteCategory || user.category}</span><h3>{meal.strMeal}</h3><p>Open recipe →</p></div>
        </Link>
      ) : <p>We couldn&apos;t load a recipe right now. Try again in a moment.</p>}
    </section>
  );
}
