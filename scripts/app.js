//Esse é o script para as funções que integram todo o sistema

//Importações
import { 
    adicionarTarefa,
    excluirTarefa, 
    mostrarTarefas, 
    editarTarefa 
} from "./eventos.js"

//Declaração das variáveis principais

//Variáveis de section#adicionar-tarefa
var inputTarefa = document.getElementById('iadd-tarefa')
var btnAddTarefa = document.getElementById('btn-adicionar-tarefa')
var campoResposta = document.getElementById('add-tarefa-response')
var resposta = document.createElement('p')
campoResposta.appendChild(resposta)

//Variáveis de section#campo-tarefas
var pesquisaTarefa = document.getElementById('ipesquisar-tarefa')
var btnPesquisaTarefa = document.getElementById('btn-pesquisar-tarefa')
var campoListaTarefas = document.getElementById('lista-tarefas')
var campoStatusTarefas = document.getElementById('status-tarefas')

//Variavéis de dialog
var excluir = document.getElementById('excluir')
var editar = document.getElementById('editar')

//Variáveis globais
var listaTarefas = JSON.parse(localStorage.getItem('bancoTarefas')) || []

inputTarefa.addEventListener('keypress', (event) => {
    if(event.key == 'Enter'){
        adicionarTarefa(listaTarefas, inputTarefa.value, resposta)
        mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
        inputTarefa.value = ``
        inputTarefa.focus()
    }
})

btnAddTarefa.addEventListener('click', () => {
    adicionarTarefa(listaTarefas, inputTarefa.value, resposta)
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
    inputTarefa.value = ``
    inputTarefa.focus()
})

document.addEventListener('DOMContentLoaded', () => mostrarTarefas(listaTarefas, campoListaTarefas, resposta))

excluir.addEventListener('click', () => {
    excluirTarefa(listaTarefas, resposta)
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
})

editar.addEventListener('click', () => {
    editarTarefa(listaTarefas)
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
})