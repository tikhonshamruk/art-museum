import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtResponseInterface } from './auth.interface';
import { Observable } from 'rxjs';
import { PaginationResponse } from './pagination.interface';
import { GetArtworkResponseInterface } from './art.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  getArt():Observable<ArtResponseInterface>{
    return this.http.get<ArtResponseInterface>(`https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number`)
  }
  
  getArts(page:number):Observable<PaginationResponse>{
    return this.http.get<PaginationResponse>(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=3`)
  }

  getOther(page:number):Observable<PaginationResponse>{
    return this.http.get<PaginationResponse>(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=9`)
  }

  getImageUrl(imageId: string, iiifUrl: string): string {
    return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
  }

  getInfoArt(id:string):Observable<GetArtworkResponseInterface>{
    return this.http.get<GetArtworkResponseInterface>(`https://api.artic.edu/api/v1/artworks/${id}`)
  }

  getSearch(){
    return this.http.get(`https://api.artic.edu/api/v1/artworks`)
  }
}
