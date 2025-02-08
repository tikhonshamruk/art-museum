import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  private navigationEnd = toSignal(this.router.events.pipe(filter(event => event instanceof NavigationEnd)));

  // Computed signal to determine if it's the home page
  isHomePage = computed(() => {
    const nav = this.navigationEnd();
    if (nav) {
      const currentUrl = (nav as NavigationEnd).url;
      return currentUrl === '/home' || currentUrl === '/';
    }
    return false; // По умолчанию возвращаем false, если navigationEnd равен null
  });
}
