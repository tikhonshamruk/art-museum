import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{
  // @Input() currentPage?: number
  // @Input() url?: string

  // pagesCount:number = 3;
  // pages: number[] = [];


  // ngOnInit(): void {
  //   for (let i = 1; i <= this.pagesCount; i++) {
  //     this.pages.push(i);
  //   }
  //   console.log('currentPage', this.currentPage)
  // }

  @Input() currentPage: number = 1; // Current page number
  @Input() totalPages: number = 10; // Total number of pages
  @Input() displayedPageCount: number = 4; // Number of pages to display

  pages: number[] = []; // Array of page numbers to display
  firstVisiblePage: number = 1; // First page number in the visible range

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateVisiblePages();
  }

  ngOnChanges(): void {
      this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    // Ensure currentPage is within valid range
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));

    // Calculate firstVisiblePage
    this.firstVisiblePage = Math.max(1, this.currentPage - Math.floor(this.displayedPageCount / 2));

    // Adjust firstVisiblePage if it exceeds the total number of pages
    if (this.firstVisiblePage + this.displayedPageCount - 1 > this.totalPages) {
      this.firstVisiblePage = Math.max(1, this.totalPages - this.displayedPageCount + 1);
    }

    // Generate the pages array based on firstVisiblePage and displayedPageCount
    this.pages = Array.from({ length: Math.min(this.displayedPageCount, this.totalPages) }, (_, i) => this.firstVisiblePage + i);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
        this.currentPage--;
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
    }
  }
}
