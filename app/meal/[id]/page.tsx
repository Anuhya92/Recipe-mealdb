"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import type { Meal } from "@/types/MealType";


export default function MealPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isSaved, toggleSaved } = useApp();
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((r) => r.json())
      .then((d) => setMeal(d.meals?.[0] ?? null));
  }, [id]);
  if (!user) {
    return (
      <section className="page-shell">
        <div className="empty-state">
          <p className="eyebrow">RECIPE</p>
          <h1>Please log in first</h1>
          <p>You need to be logged in to view and save recipes.</p>
          <Link className="button primary" href="/">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  if (!meal)
    return (
      <section className="page-shell">
        <div className="skeleton-card">Loading recipe…</div>
      </section>
    );
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[
      `strIngredient${i + 1}` as keyof Meal
    ];

    const measure = meal[
      `strMeasure${i + 1}` as keyof Meal
    ];

    if (typeof ingredient !== "string" || !ingredient.trim()) {
      return null;
    }

    return `${typeof measure === "string" ? measure.trim() : ""} ${ingredient.trim()}`.trim();
  }).filter((item): item is string => item !== null);

  return (
    <section className="page-shell">
      <Link className="back-link" href="/Categories">
        ← Back to categories
      </Link>
      <div className="recipe-detail">
        <img
          className="recipe-image"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <div className="recipe-copy">
          <span className="pill">
            {meal.strCategory} · {meal.strArea}
          </span>
          <h1>{meal.strMeal}</h1>
          <p>{meal.strTags || "A delicious recipe from TheMealDB."}</p>
          <div className="actions">
            <button className="button primary" onClick={() => toggleSaved(meal)}>
              {isSaved(meal.idMeal) ? "★ Saved to profile" : "☆ Save recipe"}
            </button>

            {meal.strYoutube && (
              <a
                className="button ghost"
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube →
              </a>
            )}


          </div>
        </div>
      </div>
      <div className="recipe-info">
        <div>
          <p className="eyebrow">INGREDIENTS</p>
          <h2>What you need</h2>
          <ul className="ingredients">
            {ingredients.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">METHOD</p>
          <h2>How to make it</h2>
          <p className="instructions">{meal.strInstructions}</p>
        </div>
      </div>
    </section>
  );
}
