import { Component, inject } from '@angular/core';
import { PantalonService } from '../../services/pantalon-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from '../../ui/card/card';

@Component({
  imports: [Card],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  private readonly pantalonService = inject(PantalonService);
  protected readonly router = inject(Router);

  protected readonly pantalones = toSignal(this.pantalonService.getAll(), {
    initialValue: []
  })
}
