//Script responsável pelos eventos, acionados por outros scripts

//Importações
import { Tarefa } from "./tarefa.js";

//Declaração de variáveis globais
var data = new Date() 
var agora = `${data.toLocaleDateString('pt-BR')}`
// var hora = `${data.getHours()}:${data.getMinutes()}`

//Variáveis de dialog
var menu = document.getElementById('menu-flutuante')
var tarefaSelecionada = 0

//Regex
var regra1 = /^\w/
var regra2 = /^.{3,30}$/
var regraData1 = /^(\d{4})-(0?[1-9]||1[0-2])-(0?[1-9]||[12][0-9]||3[01])$/
var regraData2 = /^(0?[1-9]||[12][0-9]||3[01])\/(0?[1-9]||1[0-2])\/(\d{4})$/

export function adicionarTarefa(listaTarefas, titulo, data, descricao, resposta){
    var validarDataC = data.replace(regraData1, `$1$2$3`)
    var dataConclusao = data.replace(regraData1, `$3/$2/$1`)
    var dataAgora = agora.replace(regraData2, `$3$2$1`)
    if(titulo.length == 0){
        resposta.innerText = ``
        resposta.innerText = `Coloque um título na sua tarefa.`
        resposta.style.color = '#A81C07'
    }else if(dataConclusao.length == 0 || Number(validarDataC) < Number(dataAgora)){
        resposta.innerText = ``
        resposta.innerText = `Coloque uma data de conclusão válida na sua tarefa.`
        resposta.style.color = '#A81C07'
    }else if(!regra1.test(titulo)||!regra2.test(titulo)){
        resposta.innerText = ``
        resposta.innerText = `Seu titulo de tarefa não pode começar com caracteres especiais e precisa ter de 3 a 30!!!`
        resposta.style.color = '#A81C07'
    }
    else{
        const tarefa = new Tarefa(titulo.toLowerCase(), `${agora}`, dataConclusao, descricao, false)
        resposta.innerText =''
        resposta.innerText = `Tarefa registrada!! - ${tarefa.titulo}, criada em ${tarefa.dataCriacao}`
        resposta.style.color = `#0b3d2e`

        listaTarefas.push(tarefa)
        localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
    }
}

function criarCardTarefa(element, index, campoListaTarefas){
    var cardTarefa = document.createElement('div')
    cardTarefa.setAttribute('id', `${index}`)
    cardTarefa.classList.add('card-tarefa')

    var cardTarefaSup = document.createElement('section')
    cardTarefaSup.classList.add('card-tarefa-sup')

    var checkBox = document.createElement('input')
    checkBox.setAttribute('id', `ch${index}`)
    checkBox.type = 'checkbox'

    var btnMenu = document.createElement('i')
    btnMenu.classList.add('fa-solid')
    btnMenu.classList.add('fa-angle-down')
    btnMenu.setAttribute('id', `bt${index}`)

    var divCheckMenu = document.createElement('div')
    divCheckMenu.classList.add('check-menu')
    divCheckMenu.appendChild(btnMenu)
    divCheckMenu.appendChild(checkBox)

    var conteudoTarefa = document.createElement('section')
    conteudoTarefa.classList.add('conteudo-tarefa-fechado')
    conteudoTarefa.setAttribute('id', `ct${index}`)

    var desc = document.createElement('p')
    desc.classList.add('description')
    desc.textContent = `Descrição: ${element.descricao}`

    var dataCriacao = document.createElement('p')
    dataCriacao.classList.add('data-criacao')
    dataCriacao.textContent = `Criado em: ${element.dataCriacao}`

    var dataConclusao = document.createElement('p')
    dataConclusao.classList.add('data-conclusao')
    dataConclusao.textContent = `Data limite: ${element.dataConclusao}`

    conteudoTarefa.appendChild(desc)
    conteudoTarefa.appendChild(dataCriacao)
    conteudoTarefa.appendChild(dataConclusao)
    
    var nomeTarefa = document.createElement('p')
    var statusTarefa = document.createElement('mark')
    
    nomeTarefa.textContent = `${element.titulo}`
    if(element.concluida){
        statusTarefa.textContent = `Concluída`
        statusTarefa.style.background = 'green'
        checkBox.checked = true
    }else if(!element.concluida){
        statusTarefa.textContent = `Em andamento`
        statusTarefa.style.background = 'red'
        checkBox.checked = false
    }

    cardTarefaSup.appendChild(divCheckMenu)
    cardTarefaSup.appendChild(nomeTarefa)
    cardTarefaSup.appendChild(statusTarefa)
    cardTarefa.append(cardTarefaSup)
    cardTarefa.append(conteudoTarefa)
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
                menu.style.top = `${event.layerY}px`
                if(event.clientX/window.innerWidth * 100 > 65){
                    menu.style.left = `${event.clientX - 150}px`
                }else{
                    menu.style.left = `${event.clientX}px`
                }
                menu.show()
                tarefaSelecionada = element
            })

            var checkBox = document.getElementById(`ch${index}`)
            checkBox.addEventListener('change', () => {
                mudarStatusTarefa(listaTarefas, checkBox, element, campoListaTarefas, resposta)
            })

            var btnMenu = document.getElementById(`bt${index}`)
            var conteudoTarefa = document.getElementById(`ct${index}`)
            btnMenu.addEventListener('click', () => {
                abrirConteudoTarefa(conteudoTarefa, btnMenu)
            })
        })
    }
    atualizarDados(listaTarefas)
}

document.addEventListener('click', () => menu.close())

export function excluirTarefa(listaTarefas, resposta){
    var indice = listaTarefas.indexOf(tarefaSelecionada)
    if(confirm(`Deseja mesmo excluir a tarefa: ${tarefaSelecionada.titulo}?`)){
        listaTarefas.splice(indice, 1)
        localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
        resposta.innerText = ''
        resposta.innerText = `Tarefa: ${tarefaSelecionada.titulo} Excluída!!`
        resposta.style.color = '#A81C07'
    }
}

export function editarTarefa(listaTarefas, resposta){
    var indice = listaTarefas.indexOf(tarefaSelecionada)
    var nome = tarefaSelecionada.titulo
    listaTarefas.forEach(pos => {
        const tarefa = new Tarefa(pos.titulo, pos.dataCriacao, pos.dataConclusao, pos.descricao, pos.concluida)
        if(tarefa.titulo == listaTarefas[indice].titulo){
            var novoTitulo = prompt('Qual será o novo título da tarefa?')
            console.log(novoTitulo)
            if(regra1.test(novoTitulo) && regra2.test(novoTitulo) && novoTitulo != null){
                tarefa.renomear(novoTitulo)
                listaTarefas[indice].titulo = tarefa.titulo
                localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
            }else if(novoTitulo == null){
                alert('Operação cancelada')
            }
            else{
                alert('Seu titulo de tarefa não pode começar com caracteres especiais e precisa ter de 3 a 30!!!')
            }
        }
    })
    resposta.innerText = `` 
    resposta.innerText = `Tarefa ${nome} renomeada para ${listaTarefas[indice].titulo}!!!`
    resposta.style.color = '#0b3d2e'
}

function mudarStatusTarefa(listaTarefas, checkBox, element, campoListaTarefas, resposta){
    var indice = listaTarefas.indexOf(element)
    console.log(checkBox.checked)
    const tarefa = new Tarefa(element.titulo, element.dataCriacao, element.dataConclusao, element.descricao, element.concluida)
    console.log(tarefa)
    tarefa.mudarStatus()
    listaTarefas[indice].concluida = tarefa.concluida
    localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
    if(listaTarefas[indice].concluida){
        resposta.innerText = ``
        resposta.innerText = `Tarefa: ${listaTarefas[indice].titulo} concluída!`
        resposta.style.color = '#0b3d2e'
    }else{
        resposta.innerText = ``
        resposta.innerText = `Tarefa: ${listaTarefas[indice].titulo} em andamento!`
        resposta.style.color = '#A81C07'
    }
    mostrarTarefas(listaTarefas, campoListaTarefas, resposta)
}

export function filtrarTarefas(valor, campoListaTarefas, resposta, listaTarefas){
    var novaLista = []
    console.log(valor)
    if(valor == 'Todas'){
        novaLista = listaTarefas
    }else{
        novaLista = listaTarefas.filter(pos => String(pos.concluida) == valor)
        console.log(novaLista)
    }
    mostrarTarefas(novaLista, campoListaTarefas, resposta)
}

export function pesquisarTarefa(valor, listaTarefas, campoListaTarefas, resposta){
    var novaLista = listaTarefas.filter(pos => pos.titulo.toLowerCase().includes(valor) )
    mostrarTarefas(novaLista, campoListaTarefas, resposta)
}

function atualizarDados(listaTarefas){
    var campoStatusTarefas = document.getElementById('status-tarefas')
    if(listaTarefas.length == 0 || !listaTarefas){
        campoStatusTarefas.innerText = `Tarefas concluídas: 0/0`
    }else{
        var concluidas = listaTarefas.filter(pos => pos.concluida == true)
        campoStatusTarefas.innerText = `Tarefas concluídas: ${concluidas.length}/${listaTarefas.length}`
    }
}

export function excluirTodasTarefas(listaTarefas, resposta){
    if(!listaTarefas.length){
        alert('Não há tarefas para serem excluídas!')
    }else if(confirm('Deseja mesmo excluir todas as tarefas?? Essa opção não tem volta')){
        listaTarefas.splice(listaTarefas[-1], listaTarefas.length)
        localStorage.setItem('bancoTarefas', JSON.stringify(listaTarefas))
        resposta.innerText = ''
        resposta.innerText = `Toda as tarefas foram excluídas!`
        resposta.style.color = '#A81C07'
    }
}

function abrirConteudoTarefa(conteudoTarefa, btnMenu){
    if(conteudoTarefa.className == 'conteudo-tarefa-fechado'){
        conteudoTarefa.classList.remove('conteudo-tarefa-fechado')
        conteudoTarefa.classList.add('conteudo-tarefa-aberto')

        btnMenu.classList.remove('fa-angle-down')
        btnMenu.classList.add('fa-angle-up')
    }else{
        conteudoTarefa.classList.remove('conteudo-tarefa-aberto')
        conteudoTarefa.classList.add('conteudo-tarefa-fechado')

        btnMenu.classList.remove('fa-angle-up')
        btnMenu.classList.add('fa-angle-down')
    }
}