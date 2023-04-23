import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from './models/produto';
import { ProdutoService } from './services/produto.service';
import { TAMANHOS } from './models/tamanhos';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RS Estofados';
  produtos: Produto[] = [];
  produtoForm: FormGroup;
  tamanhos = TAMANHOS;

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      usadoNovo: [true, Validators.required],
      tamanho: [TAMANHOS[0], Validators.required],
      retratilReclinavel: [true, Validators.required],
      dataVenda: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async criarProduto(): Promise<void> {
    const produto: Produto = this.produtoForm.value as Produto;
    await this.produtoService.create(produto).toPromise();
    await this.listarProdutos();
    this.produtoForm.reset();
    console.log(produto)

    Swal.fire({
      icon: 'success',
      title: 'Produto criado com sucesso!',
      showConfirmButton: false,
      timer: 1000
    });
  }

  atualizarProduto(produto: Produto): void {
    this.produtoService.update(produto);
    this.listarProdutos();
  }


  async excluirProduto(id: number): Promise<void> {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      await this.produtoService.delete(id).toPromise();
      await this.listarProdutos();
      Swal.fire(
        'Excluído!',
        'A ficha foi excluída com sucesso.',
        'success'
      );
    }
  }


    buscarProdutos(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target || !target.value) {
      this.listarProdutos();
      return;
    }
    const term = target && target.value ? target.value.trim().toLowerCase() : '';

    this.produtoService.read().subscribe(produtos => {
      this.produtos = produtos.filter(p => {
        return (
          (p.nome && p.nome.toLowerCase().includes(term)) ||
          (p.endereco && p.endereco.toLowerCase().includes(term)) ||
          (p.telefone && p.telefone.toLowerCase().includes(term)) ||
          (p.usadoNovo ? 'Usado' : 'Novo').includes(term) ||
          (p.tamanho && p.tamanho.toLowerCase().includes(term)) ||
          (p.retratilReclinavel ? 'Sim' : 'Não').includes(term) ||
          (p.email && p.email.toLowerCase().includes(term))
        );
      });
    });

  }

  listarProdutos(): void {
    this.produtoService.read().subscribe(produtos => {
      this.produtos = produtos;
      console.log(produtos)
    });
  }
}
