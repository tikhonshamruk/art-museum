import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FavoritesService } from '../../../help/favorites.service';
import { PaginationArtworkInterface } from '../../../auth/pagination.interface';
import { RouterModule } from '@angular/router';
import { UrlPipePipe } from '../../../help/url-pipe.pipe';
import { CommonModule } from '@angular/common';
import { DotsPipe } from '../../../help/dots.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [RouterModule, UrlPipePipe, CommonModule, DotsPipe, FormsModule],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})

export class WorksComponent implements OnInit, OnChanges {
  @Input() data?: PaginationArtworkInterface[] = [];
  @Input() name: string = '';
  @Input() subname: string = '';
  sortCriteria: string = 'default';
  sortedData: PaginationArtworkInterface[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
      // Не инициализируем sortedData в ngOnInit, ждем поступления данных
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.sortedData = [...changes['data'].currentValue]; // Инициализация при первом получении данных
    }
  }

  onSortCriteriaChange(): void {
      this.sortData();
  }

  sortData(): void {
      if (!this.data) {
          return;
      }

      switch (this.sortCriteria) {
          case 'title':
              this.sortedData = [...this.data].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
              break;
          case 'artist':
              this.sortedData = [...this.data].sort((a, b) => (a.artist_title || '').localeCompare(b.artist_title || ''));
              break;
          case 'default':
              this.sortedData = [...this.data]; // Возвращаем к исходному порядку
              break;
          default:
              this.sortedData = [...this.data];
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

// export class WorksComponent{
//   @Input() data?: PaginationArtworkInterface[] = []
//   @Input() name: string = ''
//   @Input() subname: string = ''

//  constructor(private favoritesService: FavoritesService){}

//   toggleFavorite(art: any): void {
//     if (this.favoritesService.isFavorite(art.id)) {
//       this.favoritesService.removeFromFavorites(art.id);
//     } else {
//       this.favoritesService.addToFavorites(art);
//     }
//   }

//   isFavorite(artId: number): boolean {
//     return this.favoritesService.isFavorite(artId);
//   }

// }
