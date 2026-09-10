export type RecipeType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type UserType = {
  username: string;
  password: string;
  category: string;
  recipes: RecipeType[];
};
