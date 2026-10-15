import {Component, signal} from '@angular/core';
import {Layout} from './trailquest/shared/presentation/components/layout/layout';

/**
 * Root component of the TrailQuest Adventure Camps application.
 *
 * @author Leonardo Lopez Torres
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trailquest');
}
