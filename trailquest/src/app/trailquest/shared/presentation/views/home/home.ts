import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {map} from 'rxjs';
import {AdventureCampsStore} from '../../../../adventure-camps/application/adventure-camps.store';
import {AdventureCampSummary} from '../../../../adventure-camps/presentation/components/adventure-camp-summary/adventure-camp-summary';

/**
 * Home view that lists the adventure camps with their reservations and capacity.
 *
 * @author Leonardo Lopez Torres
 */
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, AdventureCampSummary],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private store = inject(AdventureCampsStore);
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * Signal for the list of adventure camps.
   */
  readonly adventureCamps = this.store.adventureCamps;

  /**
   * Signal for the current error message.
   */
  readonly error = this.store.error;

  private readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches)),
    {initialValue: false}
  );

  /**
   * Number of summaries displayed per grid row.
   */
  readonly columns = computed(() => this.isHandset() ? 1 : 2);
}
