import {Routes} from '@angular/router';

const reservationForm = () => import('./presentation/views/reservation-form/reservation-form').then(m => m.ReservationForm);

/**
 * Route tree for adventure camps presentation views.
 */
export const adventureCampsRoutes: Routes = [
  { path: 'new', loadComponent: reservationForm, title: 'TrailQuest Adventure Camps - New Reservation' }
];
