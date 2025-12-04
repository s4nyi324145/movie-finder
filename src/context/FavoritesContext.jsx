import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [favoritesSeries, setFavoritesSeries] = useState([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        favoritesSeries,
        setFavoritesSeries
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
