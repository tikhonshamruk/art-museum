import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArtworkInterface } from '../../auth/auth.interface';
import { RouterModule } from '@angular/router';
import { UrlPipePipe } from '../../help/url-pipe.pipe';
import { FavoritesService } from '../../help/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [RouterModule, UrlPipePipe, CommonModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent implements OnInit, OnChanges {
  @Input() data?: ArtworkInterface[];

  constructor(private favoritesService: FavoritesService){}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('Data changed:', this.data);
    }
  }


  toggleFavorite(art: any): void {
    if (this.favoritesService.isFavorite(art.id)) {
      this.favoritesService.removeFromFavorites(art.id);
    } else {
      this.favoritesService.addToFavorites(art);
    }
  }

  isFavorite(artId: number): boolean {
    return this.favoritesService.isFavorite(artId);
  }
}
