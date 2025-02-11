import { Component, Input, OnInit } from '@angular/core';
import { FavoritesService } from '../../../help/favorites.service';
import { PaginationArtworkInterface } from '../../../auth/pagination.interface';
import { RouterModule } from '@angular/router';
import { UrlPipePipe } from '../../../help/url-pipe.pipe';
import { CommonModule } from '@angular/common';
import { DotsPipe } from '../../../help/dots.pipe';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [RouterModule, UrlPipePipe, CommonModule, DotsPipe],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent{
  @Input() data?: PaginationArtworkInterface[] = []
  @Input() name: string = ''
  @Input() subname: string = ''
//  data ?:  PaginationArtworkInterface[]

 constructor(private favoritesService: FavoritesService){}

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
