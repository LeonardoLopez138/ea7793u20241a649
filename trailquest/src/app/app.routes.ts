import {Routes} from '@angular/router';
import {Home} from './trailquest/shared/presentation/views/home/home';

const pageNotFound = () => import('./trailquest/shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const adventureCampsRoutes = () => import('./trailquest/adventure-camps/adventure-camps.routes').then(m => m.adventureCampsRoutes);
const baseTitle = 'TrailQuest Adventure Camps';

/**
 * Root route configuration that composes bounded-context routes.
 */
export const routes: Routes = [
  { path: 'home',         component:     Home,                  title: `${baseTitle} - Home` },
  { path: 'reservations', loadChildren: adventureCampsRoutes },
  { path: '',             redirectTo:    '/home', pathMatch: 'full' },
  { path: '**',           loadComponent: pageNotFound,          title: `${baseTitle} - Page Not Found` }
];
