//Esse é o script para as funções que integram todo o sistema

//Importações
import { 
    adicionarTarefa,
    excluirTarefa, 
    mostrarTarefas, 
    editarTarefa,
    filtrarTarefas,
    pesquisarTarefa,
    excluirTodasTarefas
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
var filtroTarefa = document.getElementById('ifiltro')
var campoListaTarefas = document.getElementById('lista-tarefas')
var excluirTodas = document.getElementById('btn-excluir')

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

document.addEventListener('DOMContentLoaded', () => {
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
})

excluir.addEventListener('click', () => {
    excluirTarefa(listaTarefas, resposta)
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
})

editar.addEventListener('click', () => {
    editarTarefa(listaTarefas, resposta)
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
})

filtroTarefa.addEventListener('change', () => {
    filtrarTarefas(filtroTarefa.value, campoListaTarefas, resposta, listaTarefas)
})

pesquisaTarefa.addEventListener('input', () => {
    pesquisarTarefa(pesquisaTarefa.value, listaTarefas, campoListaTarefas, resposta)
})

excluirTodas.addEventListener('click', () => {
    excluirTodasTarefas(listaTarefas, resposta)
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
})