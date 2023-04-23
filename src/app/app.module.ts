import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { ProdutoSearchComponent } from './components/produto-search/produto-search.component';
import { ProdutoService } from './services/produto.service';
import { RouterModule, Routes } from '@angular/router';



// definindo as rotas da aplicação
const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/:id', component: ProdutoFormComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    ProdutoListComponent,
    ProdutoFormComponent,
    ProdutoSearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // importando o RouterModule e definindo as rotas
    RouterModule.forRoot(routes),
  ],
  providers: [ProdutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
