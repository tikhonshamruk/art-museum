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
  isSearchValid: boolean = true; // Добавляем переменную для валидации
  private searchSubject = new Subject<string>(); // Subject для дебаунса

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

    // Подписываемся на Subject и реализуем дебаунс
    this.searchSubject.pipe(
      debounceTime(300),      // Ждем 300мс после последнего ввода
      distinctUntilChanged()  // Игнорируем, если значение не изменилось
    ).subscribe(() => {
      this.performSearch(); // Выполняем поиск
    });
  }

  onSearchInput(): void {
    this.isSearchValid = this.validateSearchTerm(this.searchTerm); // Выполняем валидацию

    if (this.isSearchValid) {
      this.searchSubject.next(this.searchTerm); // Отправляем значение в Subject
    } else {
      this.searchResults = []; // Очищаем результаты
    }
  }

  private validateSearchTerm(term: string): boolean {
    // Проверяем, что запрос не пустой и не состоит только из пробелов
    return term.trim().length > 0;
  }

  private performSearch(): void {
    // Выполняем фильтрацию данных
    if (this.searchTerm) {
      this.searchResults = this.data.filter((art) =>
        art.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  goToArt(artId: number): void {
    this.router.navigate(['/art', artId]);
  }
}