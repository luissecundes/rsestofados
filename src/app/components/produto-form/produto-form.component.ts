import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
})
export class ProdutoFormComponent {
  // Propriedades para exibir título e botão do formulário
  titulo: string = 'Novo Produto';
  botao: string = 'Salvar';

  // Formulário reativo para adicionar/editar produtos
  produtoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    usadoNovo: new FormControl(false, Validators.required),
    retratilReclinavel: new FormControl(false, Validators.required),
    dataVenda: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private produtoService: ProdutoService) {}

  onSubmit() {
    // Lógica para salvar/editar produto
  }
}
