import { Component } from '@angular/core';
import { FavoritesService } from '../../help/favorites.service';
import { CommonModule } from '@angular/common';
import { UrlPipePipe } from '../../help/url-pipe.pipe';
import { RouterModule } from '@angular/router';
import { DotsPipe } from '../../help/dots.pipe';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, UrlPipePipe, RouterModule,DotsPipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorites: any[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFromFavorites(artId: number): void {
    this.favoritesService.removeFromFavorites(artId);
    this.favorites = this.favoritesService.getFavorites();
  }
}
