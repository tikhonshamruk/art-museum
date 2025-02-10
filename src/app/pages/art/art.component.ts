import { FavoritesService } from './../../help/favorites.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { GetArtworkDataInterface, GetArtworkResponseInterface } from '../../auth/art.interface';
import { tap } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { UrlPipePipe } from '../../help/url-pipe.pipe';
import { RangeFormat } from '../../help/date.pipe';
import { DemensionsPipe } from '../../help/demensions.pipe';

@Component({
  selector: 'app-art',
  standalone: true,
  imports: [CommonModule,UrlPipePipe, RangeFormat, DemensionsPipe],
  templateUrl: './art.component.html',
  styleUrl: './art.component.scss'
})
export class ArtComponent implements OnInit {

  data?: GetArtworkDataInterface 

  favoritesService = inject(FavoritesService)
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authService.getInfoArt(id).pipe(
                  tap((response: GetArtworkResponseInterface)=>
                    {
                    this.data = response.data
                  }
                )
              ).subscribe();
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