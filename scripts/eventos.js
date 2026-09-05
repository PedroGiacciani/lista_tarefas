//Script responsável pelos eventos, acionados por outros scripts

//Importações
import { Tarefa } from "./tarefa.js";

//Declaração de variáveis globais
var data = new Date() 
var agora = `${data.toLocaleDateString('pt-BR')} ${data.getHours()}:${data.getMinutes()}`

//Variáveis do menu
var menu = document.getElementById('menu-flutuante')
var tarefaSelecionada = 0
export function adicionarTarefa(listaTarefas, titulo, resposta){
    var regra1 = /^\w/
    var regra2 = /^.{3,30}$/

    if(titulo.length == 0){
        resposta.innerText = ``
        resposta.innerText = `Digite um título para adicionar uma tarefa!!!`
        resposta.style.color = '#A81C07'
    }else if(!regra1.test(titulo)||!regra2.test(titulo)){
        resposta.innerText = ``
        resposta.innerText = `Seu titulo de tarefa não pode começar com caracteres especiais e precisa ter de 3 a 30!!!`
        resposta.style.color = '#A81C07'
    }
    else{
        const tarefa = new Tarefa(titulo, agora)
        resposta.innerText =''
        resposta.innerText = `Tarefa registrada!! - ${tarefa.titulo}, criada em ${tarefa.dataCriacao}`
        resposta.style.color = `#0b3d2e`

        listaTarefas.push(tarefa)
        localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
        console.log('tarefa adicionada')
    }
}

function criarCardTarefa(element, index, campoListaTarefas){
    var cardTarefa = document.createElement('div')
    cardTarefa.setAttribute('id', `${index}`)
    var checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    var nomeTarefa = document.createElement('p')
    var statusTarefa = document.createElement('mark')
    
    nomeTarefa.textContent = `${element.titulo}`
    if(element.concluida){
        statusTarefa.textContent = `Concluída`
        statusTarefa.style.background = 'green'
    }else{
        statusTarefa.textContent = `Em andamento`
        statusTarefa.style.background = 'red'
    }

    cardTarefa.appendChild(checkBox)
    cardTarefa.appendChild(nomeTarefa)
    cardTarefa.appendChild(statusTarefa)
    campoListaTarefas.appendChild(cardTarefa)
}

export function mostrarTarefas(listaTarefas, campoListaTarefas, resposta){
    campoListaTarefas.innerHTML = `` 
    if(!listaTarefas.length){
        var resposta = document.createElement('p')
        campoListaTarefas.appendChild(resposta)
        resposta.textContent = `Nenhuma tarefa criada ainda! Para ver sua lista de tarefas, comece criando uma no formulário acima`
        resposta.style.color = `#A81C07`
    }else{
        listaTarefas.forEach(element => {
            var index = listaTarefas.indexOf(element)
            criarCardTarefa(element, index, campoListaTarefas)
            var cardTarefa = document.getElementById(`${index}`)

            cardTarefa.addEventListener('contextmenu', (event) => {    
                event.preventDefault()
                menu.style.top = `${event.clientY}px`
                if(event.clientX/window.innerWidth * 100 > 65){
                    menu.style.left = `${event.clientX - 150}px`
                }else{
                    menu.style.left = `${event.clientX}px`
                }
                menu.show()
                tarefaSelecionada = element
            })

        })
        console.log('tarefas carregadas')
    }
}

document.addEventListener('click', () => menu.close())

export function excluirTarefa(listaTarefas, resposta){
    var indice = listaTarefas.indexOf(tarefaSelecionada)
    listaTarefas.splice(indice, 1)
    localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
    resposta.innerText = ''
    resposta.innerText = `Tarefa ${tarefaSelecionada.titulo} Excluída!!`
    resposta.style.color = '#A81C07'
}

export function editarTarefa(listaTarefas, resposta){
    var indice = listaTarefas.indexOf(tarefaSelecionada)
    var nome = tarefaSelecionada.titulo
    listaTarefas.forEach(pos => {
        const tarefa = new Tarefa(pos.titulo, pos.dataCriacao)
        if(tarefa.titulo == listaTarefas[indice].titulo){
            var novoTitulo = prompt('Qual será o novo título da tarefa?')
            tarefa.renomear(novoTitulo)
            listaTarefas[indice].titulo = tarefa.titulo
            localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
        }
    })
    resposta.innerText = `` 
    resposta.innerText = `Tarefa ${nome} renomeada para ${listaTarefas[indice].titulo}!!!`
    resposta.style.color = '#0b3d2e'
}