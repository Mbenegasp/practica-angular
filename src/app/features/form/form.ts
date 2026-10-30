import { Component, inject, OnInit, signal, input, output } from '@angular/core';
import { CUTS, PantalonForm, PantalonModel, SIZES } from '../../model/pantalon-model';
import { form, FormField, FormRoot, min, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { PantalonService } from '../../services/pantalon-service';

@Component({
  imports: [FormRoot, FormField],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form implements OnInit{
  private readonly pantalonService = inject(PantalonService);
  protected readonly cuts = CUTS;
  protected readonly sizes = SIZES;
  readonly pantalon = input<PantalonModel>();
  readonly editado = output<PantalonModel>();

  private readonly formularioVacio: PantalonForm = {
    modelName: '',
    salePrice: Number.NaN,
    isInStore: false,
    size: '',
    cut: '',
    notes: '',
  };

  private readonly formularioModelo = signal({ ...this.formularioVacio });

  ngOnInit() {
    const pantalon = this.pantalon()
    if(pantalon){
      this.formularioModelo.set({...pantalon});
    }
  }

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
          const pantalon = fieldTree().value();
          const pantalonEnEdicion = this.pantalon()
          if (pantalonEnEdicion){
            const pantalonActualizado = await firstValueFrom(this.pantalonService.update(pantalon, pantalonEnEdicion.id));
            this.editado.emit(pantalonActualizado);
            alert('Pantalon editado muy exitosamente, me hace feliz lo exitoso que esta esto')
          } else {
            await firstValueFrom(this.pantalonService.add(fieldTree().value()));
            alert('Producto agregado muy satisfactoriamente');
            this.resetForm();
          }
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
