import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage?: number
  @Input() url?: string

  pagesCount:number = 9;
  pages: number[] = [];
  ngOnInit(): void {
    for (let i = 1; i <= this.pagesCount; i++) {
      this.pages.push(i);
    }
    console.log('currentPage', this.currentPage)
  }
}
