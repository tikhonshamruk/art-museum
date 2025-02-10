import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlPipePipe } from '../../help/url-pipe.pipe';
import { FavoritesService } from '../../help/favorites.service';
import { CommonModule } from '@angular/common';
import { PaginationArtworkInterface, PaginationResponse } from '../../auth/pagination.interface';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';
import { DotsPipe } from '../../help/dots.pipe';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [RouterModule, UrlPipePipe, CommonModule, DotsPipe],
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent implements OnInit, OnChanges {
   data ?:  PaginationArtworkInterface[]
   
   authService = inject(AuthService)

  constructor(private favoritesService: FavoritesService){}

  ngOnInit(): void {
    this.authService.getOther(1).pipe(
                tap((response: PaginationResponse)=>
                  {
                  this.data = response.data
                }
              )
            ).subscribe(); 
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
