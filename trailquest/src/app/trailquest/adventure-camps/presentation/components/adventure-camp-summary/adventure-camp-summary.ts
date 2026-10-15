import {Component, computed, inject, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {AdventureCamp} from '../../../domain/model/adventure-camp.entity';
import {AdventureCampsStore} from '../../../application/adventure-camps.store';

/**
 * Card that summarizes the reservations and capacity of a adevture camp
 * @author Leonardo Lopez Torres
 */
@Component({
  selector: 'app-adventure-camp-summary',
  imports: [MatCardModule, MatListModule],
  templateUrl: './adventure-camp-summary.html',
  styleUrl: './adventure-camp-summary.css'
})
export class AdventureCampSummary {
  private store = inject(AdventureCampsStore);

  /**
   * The adventure camp to summarize.
   */
  readonly adventureCamp = input.required<AdventureCamp>();

  /**
   * Reservations registered in the adventure camp.
   */
  readonly reservations = computed(() => this.store.getReservationsByAdventureCampId(this.adventureCamp().id)());

  /**
   * Sum of participants of all reservations of the adventure camp.
   */
  readonly totalParticipants = computed(() => this.store.getTotalParticipants(this.adventureCamp().id)());

  /**
   * Capacity minus the total participants registered.
   */
  readonly availableCapacity = computed(() => this.store.getAvailableCapacity(this.adventureCamp().id)());
}
