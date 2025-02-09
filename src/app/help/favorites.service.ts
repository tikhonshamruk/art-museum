import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKey = 'favorites';

  constructor() {}

  getFavorites(): any[] {
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addToFavorites(art: any): void {
    const favorites = this.getFavorites();
    if (!favorites.find(fav => fav.id === art.id)) {
      favorites.push(art);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(artId: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav.id !== artId);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  isFavorite(artId: number): boolean {
    const favorites = this.getFavorites();
    return !!favorites.find(fav => fav.id === artId);
  }
}