import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checklist',
  imports: [CommonModule, FormsModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css',
})
export class ChecklistComponent implements OnInit {
  novaTarefa: string = '';
  dataMaxima: string = '';
  prioridade: string = '';
  tarefas: {
    nome: string;
    data?: string;
    concluida: boolean;
    prioridade: string;
  }[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const tarefasSalvas = localStorage.getItem('tarefas');
      if (tarefasSalvas) {
        this.tarefas = JSON.parse(tarefasSalvas);
      }
    }
  }

  adicionarTarefa() {
    if (this.novaTarefa.trim()) {
      this.tarefas.push({
        //descricao: this.novaTarefa.trim(),
        nome: this.novaTarefa.trim(),
        data: this.dataMaxima ? this.dataMaxima : undefined,
        concluida: false,
        prioridade: this.prioridade || 'baixa',
      });
      this.novaTarefa = '';
      this.dataMaxima = '';
      this.prioridade = '';

      this.salvarTarefas();
    }
  }

  removerTarefa(
    /*index: number*/ tarefa: {
      nome: string;
      data?: string;
      concluida: boolean;
    }
  ) {
    //this.tarefas.splice(index, 1);
    this.tarefas = this.tarefas.filter((t) => t !== tarefa);
    this.salvarTarefas();
  }

  salvarTarefas() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }
  }
}
