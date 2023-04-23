import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css'],
})
export class ProdutoListComponent {
  @Input() produtos?: Produto[];

  @Output() editar: EventEmitter<Produto> = new EventEmitter();
  @Output() excluir: EventEmitter<number> = new EventEmitter();

  editarProduto(produto: Produto): void {
    this.editar.emit(produto);
  }

  excluirProduto(id: number): void {
    this.excluir.emit(id);
  }
}
