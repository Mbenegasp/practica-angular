import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PantalonForm, PantalonModel } from '../model/pantalon-model';

@Service()
export class PantalonService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/trousers';

  getAll() {
    return this.http.get<PantalonModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<PantalonModel>(`${this.url}/${id}`);
  }

  add(pantalon: PantalonForm) {
    return this.http.post<PantalonModel>(this.url, pantalon);
  }

  update(pantalon: PantalonForm, id: string) {
    return this.http.put<PantalonModel>(`${this.url}/${id}`, pantalon);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
