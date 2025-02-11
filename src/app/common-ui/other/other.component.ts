import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlPipePipe } from '../../help/url-pipe.pipe';
import { FavoritesService } from '../../help/favorites.service';
import { CommonModule } from '@angular/common';
import { PaginationArtworkInterface, PaginationResponse } from '../../auth/pagination.interface';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';
import { DotsPipe } from '../../help/dots.pipe';
import { WorksComponent } from '../shared/works/works.component';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [WorksComponent],
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent implements OnInit, OnChanges {
   datas ?:  PaginationArtworkInterface[]
   
   authService = inject(AuthService)

  constructor(private favoritesService: FavoritesService){}

  ngOnInit(): void {
    this.authService.getOther(1).pipe(
                tap((response: PaginationResponse)=>
                  {
                  this.datas = response.data
                }
              )
            ).subscribe(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('Data changed:', this.datas);
    }
  }
}
