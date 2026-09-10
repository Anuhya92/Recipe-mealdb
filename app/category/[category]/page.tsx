"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Meal } from "@/types/MealType";
import { useApp } from "@/context/AppContext";

export default function CategoryPage() {
  const { user } = useApp();
  const { category } = useParams<{ category: string }>();
  const name = decodeURIComponent(category);

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch meals for the selected category
  useEffect(() => {
    setLoading(true);

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
        name
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []);
      })
      .catch((error) => {
        console.error("Failed to fetch meals:", error);
        setMeals([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  // Only logged-in users can browse recipes
  if (!user) {
    return (
      <section className="page-shell">
        <div className="empty-state">
          <p className="eyebrow">CATEGORY</p>
          <h1>Please log in first</h1>
          <p>You need to be logged in to browse recipes.</p>

          <Link className="button primary" href="/">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <Link className="back-link" href="/Categories">
        ← All categories
      </Link>

      <div className="page-intro">
        <p className="eyebrow">CATEGORY</p>

        <h1>{name} recipes</h1>

        <p>
          {loading
            ? "Loading meals…"
            : `${meals.length} meals to explore in this category.`}
        </p>
      </div>

      {!loading && meals.length === 0 && (
        <div className="empty-state">
          <h2>No meals found</h2>
          <p>There are no recipes available in this category.</p>
        </div>
      )}

      <div className="meal-grid">
        {meals.map((meal) => (
          <Link
            href={`/meal/${meal.idMeal}`}
            className="meal-card"
            key={meal.idMeal}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />

            <div>
              <h2>{meal.strMeal}</h2>
              <span>View recipe →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}