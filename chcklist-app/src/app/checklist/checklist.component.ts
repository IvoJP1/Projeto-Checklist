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
  mostrarModal: boolean = false;
  criterioOrdenacao: string = 'criacao';

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

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  get tarefasOrdenadas() {
    return this.tarefas.slice().sort((a, b) => {
      if (this.criterioOrdenacao === 'data') {
        const dataA = a.data ? new Date(a.data).getTime() : 0;
        const dataB = b.data ? new Date(b.data).getTime() : 0;
        return dataA - dataB;
      }

      if (this.criterioOrdenacao === 'prioridade') {
        const prioridades: { [key: string]: number } = {
          alta: 1,
          media: 2,
          baixa: 3,
        };
        return (
          (prioridades[a.prioridade] || 4) - (prioridades[b.prioridade] || 4)
        );
      }

      return 0;
    });
  }

  get tarefasAtivas() {
    const hoje = new Date();
    return this.tarefas.filter(
      (tarefa) =>
        !tarefa.concluida && (!tarefa.data || new Date(tarefa.data) >= hoje)
    );
  }

  get tarefasConcluidas() {
    return this.tarefas.filter((tarefa) => tarefa.concluida);
  }

  get tarefasExpiradas() {
    const hoje = new Date();
    return this.tarefas.filter(
      (tarefa) =>
        !tarefa.concluida && tarefa.data && new Date(tarefa.data) < hoje
    );
  }
}
