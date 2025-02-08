import { Routes } from '@angular/router';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ArtComponent } from './pages/art/art.component';

export const routes: Routes = [
    {
        path: "", component: LayoutComponent, children: [
            {path: "", component: HomeComponent},
            {path: "favorites", component: FavoritesComponent},
            {path: "art/:id", component: ArtComponent}
        ]
    }
];
