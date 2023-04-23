import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly STORAGE_KEY = 'produtos';

  constructor(private storage: LocalStorage) {}

  create(produto: Produto): Observable<boolean> {
    return this.getProdutos().pipe(
      switchMap(produtos => {
        const newId = produtos?.length + 1 ?? 1;
        produto.id = newId;
        const updatedProdutos = [...(produtos ?? []), produto];
        return this.storage.setItem(this.STORAGE_KEY, updatedProdutos);
      })
    );
  }



  read(): Observable<Produto[]> {
    return this.getProdutos();
    console.log()
  }

  update(produto: Produto): void {
    this.getProdutos().subscribe(produtos => {
      const index = produtos.findIndex(p => p.id === produto.id);
      if (index >= 0) {
        produtos[index] = produto;
        this.storage.setItem(this.STORAGE_KEY, produtos).subscribe(() => {});
        console.log(produto)

      }
    });
  }

  delete(id: number): Observable<null> {
    return this.getProdutos().pipe(
      switchMap(produtos => {
        const index = produtos.findIndex(p => p.id === id);
        if (index >= 0) {
          produtos.splice(index, 1);
          return this.storage.setItem(this.STORAGE_KEY, produtos).pipe(map(() => null));
        } else {
          return of(null);
        }
      })
    );
  }



  private getProdutos(): Observable<Produto[]> {
    return this.storage.getItem(this.STORAGE_KEY) as Observable<Produto[]>;
  }
}
