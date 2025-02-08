import { Component, inject, OnInit} from '@angular/core';
import { SearchComponent } from '../../common-ui/search/search.component';
import { AuthService } from '../../auth/auth.service';
import { ArtResponseInterface, ArtworkInterface } from '../../auth/auth.interface';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../common-ui/pagination/pagination.component';
import { tap } from 'rxjs';
import { PaginationArtworkInterface, PaginationResponse } from '../../auth/pagination.interface';
import { UrlPipePipe } from '../../help/url-pipe.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, RouterModule, CommonModule, PaginationComponent, UrlPipePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  baseUrl : string = ''
  currentPage!: number

  data: ArtworkInterface[] = []
  arts: PaginationArtworkInterface[] = []

  myAuthService = inject(AuthService)
  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.myAuthService.getArt().subscribe(
      (response: ArtResponseInterface)=>{
        this.data = response.data
        console.log(this.data)
      }
    )

    this.baseUrl= this.router.url.split("?")[0]

        this.route.queryParams.subscribe((params:Params)=>{
          this.currentPage = Number(params['page'] || '1')
          
          this.myAuthService.getArts(this.currentPage).pipe(
            tap((response: PaginationResponse)=>
              {
              this.arts = response.data
            }
          )
        ).subscribe(); 
        })
  }
}
