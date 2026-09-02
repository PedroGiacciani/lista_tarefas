//Script para funções relacionadas a tarefas e formulação delas

//Importações

//Classe tarefa
export class Tarefa{
    constructor(titulo, dataCriacao){
        this.titulo = titulo
        this.concluida = false
        this.dataCriacao = dataCriacao
    }

    renomear(novoTitulo){
        this.titulo = novoTitulo
    }
}