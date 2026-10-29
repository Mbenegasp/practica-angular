import { Component, inject, signal } from '@angular/core';
import { CUTS, PantalonForm, SIZES } from '../../model/pantalon-model';
import { form, FormField, FormRoot, min, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { PantalonService } from '../../services/pantalon-service';

@Component({
  imports: [FormRoot, FormField],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form {
  private readonly pantalonService = inject(PantalonService);
  protected readonly cuts = CUTS;
  protected readonly sizes = SIZES;

  private readonly formularioVacio: PantalonForm = {
    modelName: '',
    salePrice: Number.NaN,
    isInStore: false,
    size: '',
    cut: '',
    notes: '',
  };

  private readonly formularioModelo = signal({ ...this.formularioVacio });

  protected readonly formulario = form(
    this.formularioModelo,
    (pantalon) => {
      required(pantalon.modelName, { message: 'campo requerio' });
      required(pantalon.salePrice, { message: 'Precio requerido' });
      min(pantalon.salePrice, 0, { message: 'No puede ser menor a 0' });
      required(pantalon.size, { message: 'Campo requerido' });
      required(pantalon.cut, { message: 'debe seleccionar un corte' });
      required(pantalon.notes, { message: 'campo requerido' });
    },
    {
      submission: {
        action: async (fieldTree) => {
          await firstValueFrom(this.pantalonService.add(fieldTree().value()));
          alert('Producto agregado muy satisfactoriamente');
          this.resetForm();
        },
        onInvalid: () => {
          alert('Formulario invalido papuchu');
        },
      },
    },
  );
  resetForm() {
    this.formulario().reset({ ...this.formularioVacio });
  }
}
