"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import type { Category } from "@/types/MealType";

export default function CategoriesPage() {
  const { user, favouriteCategory, setFavouriteCategory } = useApp();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((r) => r.json()).then((d) => setCategories(d.categories || []))
      .finally(() => setLoading(false));
  }, []);
  if (!user) {
    return (
      <section className="page-shell">
        <div className="empty-state">
          <p className="eyebrow">DISCOVER</p>
          <h1>Please log in first</h1>
          <p>You need to be logged in to browse recipe categories.</p>
          <Link className="button primary" href="/">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return <section className="page-shell">
    <div className="page-intro">
      <p className="eyebrow">DISCOVER</p>
      <h1>Recipe categories</h1><p>Pick a category to browse its meals. Your favourite is saved in shared context and powers your home page.</p>
      </div>
    {loading ? <div className="grid">{Array.from({ length: 6 }).map((_, i) => <div className="skeleton-card" key={i}>Loading…</div>)}</div> :
      <div className="category-grid">{categories.map((cat) => <article className={`category-card ${favouriteCategory === cat.strCategory ? "selected" : ""}`} key={cat.idCategory}>
        <img src={cat.strCategoryThumb} alt="" />
        <div>
          <p className="eyebrow">{cat.strCategory}</p>
          <h2>{cat.strCategory}</h2>
          <p>{cat.strCategoryDescription?.slice(0, 105)}…</p>
          <div className="card-actions">
            <Link className="text-link" href={`/category/${encodeURIComponent(cat.strCategory)}`}>Browse meals →</Link>
            <button className="heart-button" onClick={() => setFavouriteCategory(cat.strCategory)} aria-label={`Set ${cat.strCategory} as favourite`}>
              {favouriteCategory === cat.strCategory ? "★ Favourite" : "☆ Favourite"}
            </button>
          </div>
        </div>
      </article>
    )}
      </div>}
  </section>;
}
