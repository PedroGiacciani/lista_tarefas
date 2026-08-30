//Script responsável pelos eventos, acionados por outros scripts

//Importações
import { Tarefa } from "./tarefa.js";

//Declaração de variáveis globais
var data = new Date() 
var agora = `${data.toLocaleDateString('pt-BR')} ${data.getHours()}:${data.getMinutes()}`

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
    }
}

export function mostrarTarefas(campoListaTarefas, listaTarefas){
    if(!listaTarefas.length){
        var resposta = document.createElement('p')
        campoListaTarefas.appendChild(resposta)
        resposta.textContent = `Nenhuma tarefa criada ainda! Para ver sua lista de tarefas, comece criando uma no formulário acima`
        resposta.style.color = `#A81C07`
    }else{
        campoListaTarefas.innerHTML = ``

        //Criação do menu, precisa ser fora do forEach
        var menu = document.createElement('dialog')
        menu.classList.add('menu-flutuante')

        var lapis = document.createElement('i')
        lapis.classList.add('fa-solid')
        lapis.classList.add('fa-pencil')

        var lixeira = document.createElement('i')
        lixeira.classList.add('fa-solid')
        lixeira.classList.add('fa-trash')

        var excluir = document.createElement('p')
        excluir.textContent = 'Excluir tarefa'
        excluir.appendChild(lixeira)

        var editar = document.createElement('p')
        editar.textContent = 'Editar tarefa'
        editar.appendChild(lapis)

        menu.appendChild(excluir)
        menu.appendChild(editar)
        document.body.appendChild(menu)
        
        listaTarefas.forEach(element => {
            var cardTarefa = document.createElement('div')
            cardTarefa.classList.add('card-tarefa')
            var checkBox = document.createElement('input')
            checkBox.type = 'checkbox'
            var nomeTarefa = document.createElement('p')
            var statusTarefa = document.createElement('mark')
            // var dataTarefa = document.createElement('p')
            
            nomeTarefa.textContent = `${element.titulo}`
            // dataTarefa.textContent = `${element.dataCriacao}`
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
            // cardTarefa.appendChild(dataTarefa)
            campoListaTarefas.appendChild(cardTarefa)

            cardTarefa.addEventListener('contextmenu', (event) => {
                event.preventDefault()
                menu.style.top = `${event.clientY}px`
                if(event.clientX/window.innerWidth * 100 > 65){
                    menu.style.left = `${event.clientX - 150}px`
                }else{
                    menu.style.left = `${event.clientX}px`
                }
                menu.show()
            })

            menu.addEventListener('mouseleave', () => menu.close())
        })
    }
}