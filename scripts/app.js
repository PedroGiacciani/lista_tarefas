//Esse é o script para as funções que integram todo o sistema

//Importações
import { adicionarTarefa, mostrarTarefas } from "./eventos.js"

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
var cardTarefa = document.getElementsByClassName('card-tarefa')

//Variáveis do menu
var menu = document.getElementById('menu-flutuante')
var editar = document.getElementById('editar')
var excluir = document.getElementById('excluir')  

//Variáveis globais
var listaTarefas = JSON.parse(localStorage.getItem('bancoTarefas')) || []

inputTarefa.addEventListener('keypress', (event) => {
    if(event.key == 'Enter'){
        adicionarTarefa(listaTarefas, inputTarefa.value, resposta)
        mostrarTarefas(campoListaTarefas, listaTarefas, resposta)
        inputTarefa.value = ``
        inputTarefa.focus()
    }
})

btnAddTarefa.addEventListener('click', () => {
    adicionarTarefa(listaTarefas, inputTarefa.value, resposta)
    mostrarTarefas(campoListaTarefas, listaTarefas, resposta)
    inputTarefa.value = ``
    inputTarefa.focus()
})

document.addEventListener('DOMContentLoaded', () => mostrarTarefas(campoListaTarefas, listaTarefas, resposta))

console.log(cardTarefa)
cardTarefa.forEach(element => {
    element.addEventListener('contextmenu', (event) => {    
        event.preventDefault()
        menu.style.top = `${event.clientY}px`
        if(event.clientX/window.innerWidth * 100 > 65){
            menu.style.left = `${event.clientX - 150}px`
        }else{
            menu.style.left = `${event.clientX}px`
        }
        menu.show()
    })
})
