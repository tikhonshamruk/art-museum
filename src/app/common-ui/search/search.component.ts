import { Component, Input } from '@angular/core';
import { ArtworkInterface } from '../../auth/auth.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() searchData: ArtworkInterface[] = [];
}
