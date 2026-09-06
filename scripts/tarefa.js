//Script para funções relacionadas a tarefas e formulação delas

//Importações

//Classe tarefa
export class Tarefa{
    constructor(titulo, dataCriacao, concluida){
        this.titulo = titulo
        this.concluida = concluida
        this.dataCriacao = dataCriacao
    }

    renomear(novoTitulo){
        this.titulo = novoTitulo
    }

    mudarStatus(){
        if(!this.concluida){
            this.concluida = true
        }else{
            this.concluida = false
        }
    }
}