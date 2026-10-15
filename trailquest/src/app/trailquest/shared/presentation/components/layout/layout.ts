import {Component, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {TranslatePipe} from '@ngx-translate/core';
import {map} from 'rxjs';
import {LanguageSwitcher} from '../language-switcher/language-switcher';

/**
 * Application shell with toolbar, language switcher and navigation sidenav.
 *
 * @author Leonardo Lopez Torres
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule,
    TranslatePipe, LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * Signal that indicates whether the viewport is a handset.
   */
  readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches)),
    {initialValue: false}
  );

  /**
   * Signal that indicates whether the sidenav is opened.
   */
  readonly opened = signal(true);

  /**
   * Navigation options displayed in the sidenav.
   */
  readonly options = [
    {link: '/home', label: 'nav-home', icon: 'home'},
    {link: '/reservations/new', label: 'nav-new-reservation', icon: 'add_circle'}
  ];

  /**
   * Opens or closes the sidenav.
   */
  toggleMenu(): void {
    this.opened.update(value => !value);
  }
}
