import { Component, input, output } from '@angular/core';
import { PantalonModel } from '../../model/pantalon-model';

@Component({
  imports: [],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  readonly pantalon = input.required<PantalonModel>();
  readonly navigationRequested = output();
}
