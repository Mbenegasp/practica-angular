import { Component, inject, OnInit, signal } from '@angular/core';
import { PantalonService } from '../../services/pantalon-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PantalonModel } from '../../model/pantalon-model';

@Component({
  imports: [],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details implements OnInit {
  private readonly pantalonService = inject(PantalonService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly id = this.route.snapshot.paramMap.get('id')!;
  protected readonly pantalon = signal<PantalonModel | undefined>(undefined);

  ngOnInit() {
    this.pantalonService.getById(this.id).subscribe({
      next: (pantalon) => {
        this.pantalon.set(pantalon);
      },
    });
  }

  borrarPantalon() {
    if (!confirm('Esta completamente seguro que desea con ansias borrar este hermoso pantalon?'))
      return;
    this.pantalonService.delete(this.id).subscribe({
      next: () => {
        alert('pantalon borrado tristemente con exito');
        this.router.navigate(['/catalogo']);
      },
      error: () => {
        alert('Felizmente hubo un error al borrar el pantalon');
      },
    });
  }
}
