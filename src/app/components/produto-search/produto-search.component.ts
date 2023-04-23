import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-produto-search',
  templateUrl: './produto-search.component.html',
  styleUrls: ['./produto-search.component.css']
})
export class ProdutoSearchComponent {
  nome$ = new Subject<string>();
  endereco$ = new Subject<string>();
  telefone$ = new Subject<string>();
  usadoNovo$ = new Subject<boolean>();
  tamanho$ = new Subject<string>();
  retratilReclinavel$ = new Subject<boolean>();

  @Output() search: EventEmitter<any> = new EventEmitter();

  constructor() {
    combineLatest([
      this.nome$.pipe(distinctUntilChanged()),
      this.endereco$.pipe(distinctUntilChanged()),
      this.telefone$.pipe(distinctUntilChanged()),
      this.usadoNovo$.pipe(distinctUntilChanged()),
      this.tamanho$.pipe(distinctUntilChanged()),
      this.retratilReclinavel$.pipe(distinctUntilChanged())
    ])
      .pipe(
        debounceTime(300)
      )
      .subscribe(([nome, endereco, telefone, usadoOuNovo, tamanho, retratilOuReclinavel]) => {
        this.search.emit({ nome, endereco, telefone, usadoOuNovo, tamanho, retratilOuReclinavel });
      });
  }

  searchProdutos(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.nome$.next(term);
  }

}
