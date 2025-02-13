import { Component, inject, Input, OnInit } from '@angular/core';
import { ArtResponseInterface, ArtworkInterface } from '../../auth/auth.interface';
import { AuthService } from '../../auth/auth.service';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  data: ArtworkInterface[] = [];
  searchTerm: string = '';
  searchResults: ArtworkInterface[] = [];
  isSearchValid: boolean = true;
  showNoResults: boolean = false; // Флаг для отображения "No results found"
  private searchSubject = new Subject<string>();

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService
      .getArt()
      .pipe(
        tap((response: ArtResponseInterface) => {
          this.data = response.data;
        })
      )
      .subscribe();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.performSearch();
    });
  }

  onSearchInput(): void {
    this.validateSearchTerm(this.searchTerm); // Валидируем searchTerm

    if (this.isSearchValid) {
      this.showNoResults = false; // Скрываем "No results found"
      this.searchSubject.next(this.searchTerm);
    } else {
      this.searchResults = []; // Очищаем результаты
      this.showNoResults = false; //скрываем результаты если они были
    }
  }

  private validateSearchTerm(term: string): void {
    // Проверяем, что запрос не пустой и не состоит только из пробелов, если  - устанавливаем isSearchValid = false
    this.isSearchValid = term.trim().length > 0;
  }

  private performSearch(): void {
    if (this.searchTerm && this.isSearchValid) {
      this.searchResults = this.data.filter((art) =>
        art.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showNoResults = this.searchResults.length === 0; //показываем если ничего не нашли
    } else {
      this.searchResults = [];
      this.showNoResults = false; // Скрываем сообщение, когда поле пустое
    }
  }

  goToArt(artId: number): void {
    this.router.navigate(['/art', artId]);
  }
}