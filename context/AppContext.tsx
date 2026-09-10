"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { UserType, RecipeType } from "@/types/UserType";

type AppContextType = {
  user: UserType | null;
  favouriteCategory: string;
  savedMeals: RecipeType[];
  login: (u: UserType) => void;
  logout: () => void;
  setFavouriteCategory: (c: string) => void;
  toggleSaved: (m: RecipeType) => void;
  isSaved: (id: string) => boolean;
};

const AppContext = createContext<AppContextType | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [favouriteCategory, setFavouriteCategory] = useState("");
  const [savedMeals, setSavedMeals] = useState<RecipeType[]>([]);
  function login(u: UserType) {
    setUser(u);
    setFavouriteCategory(u.category || "Chicken");
    setSavedMeals(u.recipes || []);
  }
  function logout() {
    setUser(null);
    setFavouriteCategory("");
    setSavedMeals([]);
  }
  function toggleSaved(m: RecipeType) {
    setSavedMeals((prev) =>
      prev.some((x) => x.idMeal === m.idMeal)
        ? prev.filter((x) => x.idMeal !== m.idMeal)
        : [m, ...prev],
    );
  }
  function isSaved(id: string) {
    return savedMeals.some((x) => x.idMeal === id);
  }
  const value = useMemo(
    () => ({
      user,
      favouriteCategory,
      savedMeals,
      login,
      logout,
      setFavouriteCategory,
      toggleSaved,
      isSaved,
    }),
    [user, favouriteCategory, savedMeals],
  );
  return <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>;
}
export function useApp() {
  const c = useContext(AppContext);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}
