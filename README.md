# Plate & Palate — Recipe Finder

A multi-page Next.js (App Router) recipe app built around [TheMealDB](https://www.themealdb.com/api.php), using React Context for auth state, favourites and saved recipes, and dynamic routing for categories and meals.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to log in

There's no sign-up — you log in with one of the demo accounts below (username + password, matched against a static list in `data/Users.ts`). Each user has a different default favourite category, so you'll see different personalised content per user.

| Username | Password  | Default category |
|----------|-----------|-------------------|
| `anu`    | `anu123`  | Seafood           |
| `john`   | `john123` | Beef              |
| `jane`   | `jane123` | Vegetarian        |
| `alice`  | `alice123`| Dessert           |

Log in, click **Log out** in the nav to end the session, then log in again as a different user in the same tab — the context resets cleanly each time.


## Pages

- **`/` (Home)**
  - Logged out: shows the login form plus a random recipe fetched from TheMealDB.
  - Logged in: shows a personalised hero, a recipe fetched from the user's favourite category, and links to Categories / Profile.

- **`/Categories`** — fetches the list of categories from TheMealDB (`categories.php`). Each category card links to that category's meals and has a "favourite" toggle that's saved in context and reflected on the Home page.

- **`/category/[category]`** — dynamic route; fetches meals for the selected category (`filter.php?c=...`) and links to each meal's detail page.

- **`/meal/[id]`** — dynamic route; fetches full recipe detail (`lookup.php?i=...`) — ingredients, measures, instructions, YouTube link — and lets you save/unsave the recipe.

- **`/Profile`** — lists the logged-in user's saved recipes (from context) with a summary card for each, linking back to the recipe page.

All pages other than Home redirect logged-out visitors to a "please log in" prompt, and login state persists across route changes via a context provider in `app/layout.tsx`.


## Tech / requirements coverage

- **TypeScript** — strict mode, no `any`, typed API responses (`Meal`, `Category`, `UserType`).
- **Responsive styling** — plain CSS in `app/globals.css` with breakpoints down to 350px.
- **Context** — `AppContext` holds `user`, `favouriteCategory`, `savedMeals`; exposes `login`, `logout`, `setFavouriteCategory`, `toggleSaved`, `isSaved`. Values are read and updated from multiple pages (Home, Categories, meal detail, Profile, Navigation).
- **Dynamic routing** — `/category/[category]` and `/meal/[id]` render the same template for different data.
- **Persistent session across routes** — the provider sits in the root layout, so login survives navigation (but not a hard refresh, by design).
- **Log out / re-login in the same session** — via the Navigation component's logout button.