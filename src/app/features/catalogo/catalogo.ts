import { Component, computed, inject, signal } from '@angular/core';
import { PantalonService } from '../../services/pantalon-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from '../../ui/card/card';
import { Cut, CUTS } from '../../model/pantalon-model';

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

  protected readonly cuts = CUTS;
  protected readonly filtro = signal<Cut | '' | string>('')
  protected readonly ordenamiento = signal<'asc' | 'desc' | string>('asc');

  protected readonly pantalonesFiltrados = computed(() => {
    const pantalones = this.pantalones();

    const filtro = this.filtro();
    const pantalonesFiltrados = pantalones.filter((pantalon) => {
      return !filtro || pantalon.cut === filtro;
    })

    switch (this.ordenamiento()) {
      case 'asc': 
        return pantalonesFiltrados.sort((a, b) => a.salePrice - b.salePrice)
      case 'desc':
        return pantalonesFiltrados.sort((a, b) => b.salePrice - a.salePrice)
      default:
        return pantalonesFiltrados;
    }
  })
}
