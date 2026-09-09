//Script para funções relacionadas a tarefas e formulação delas

//Importações

//Classe tarefa
export class Tarefa{
    constructor(titulo, dataCriacao, dataConclusao, descricao,concluida){
        this.titulo = titulo
        this.dataCriacao = dataCriacao
        this.dataConclusao = dataConclusao
        this.descricao = descricao
        this.concluida = concluida
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