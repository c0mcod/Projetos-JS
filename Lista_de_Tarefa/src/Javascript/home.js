const addTarefa = document.querySelector('.addTask');
const modal = document.querySelector('.modal-task')
const campoNome = document.querySelector('.nameTask');
const campoDescricao = document.querySelector('.descripTask');
const containerTask = document.querySelector('.list-tasks');
const closeModal = document.querySelector('.close');
const notFoundTask = document.querySelector('.notFound');

function atualizarMensagem() {
    // botei esse monte de console log pq por algum motivo do demonio não tava sumindo o aviso de "não há tarefas!"
    // descobri que era pq eu não tinha chamado a função depois de adicionar no evento '-'
    console.log("Número de tarefas no container:", containerTask.children.length);
    if (containerTask.children.length === 0) {
        notFoundTask.classList.remove('hidden');
        console.log("Mensagem visível (não há tarefas)");
    } else {
        notFoundTask.classList.add('hidden');
        console.log("Mensagem escondida (há tarefas)");
    }
}


// Ao clicar no botão de "adicionar tarefa", uma div estilizada apareça e a mensagem de "não há tarefas adicionadas!" suma
addTarefa.addEventListener('click', () => {
    // primeira coisa que tem que acontecer para o usuario, é aparecer o modal com as informações que a gente vai usar
    modal.style.display = 'flex';
})

const submitTask = document.querySelector('.submit')
submitTask.addEventListener('click', () => {

    // Agora precisamos pegar os VALORES inseridos nos inputs do modal pra trabalhar nas divs que irão ser inseridas com 
    // esses dados
    // VALORES guardados nas variaveis nomeInput e descrInput
    const nomeInput = campoNome.value.trim();
    const descrInput = campoDescricao.value.trim();

    // Agora que temos os valores, precisamos verificar se eles não estão vazios
    if (nomeInput === '' || descrInput === '') {
        alert('Preencha todos os campos!');
        return;
    };

    // Agora que temos os valores e eles não estão vazios, podemos criar a div
    const newTask = document.createElement('div');
    newTask.classList.add('task');

    newTask.innerHTML = `
    <div class="task-container">
        <div class="info">
            <h3>${nomeInput}</h3>
            <p>${descrInput}</p>
        <div>
            <button class="delete-task">Excluir</button>
    </div>
        `

    containerTask.appendChild(newTask);
    atualizarMensagem();
    modal.style.display = 'none';

    campoNome.value = '';
    campoDescricao.value = ''

    const removeTask = newTask.querySelector('.delete-task');
    removeTask.addEventListener('click', () => {
        newTask.remove();
        atualizarMensagem();
    });
});
// função pra fechar o modal 
closeModal.addEventListener("click", () => {
    modal.style.display = 'none';
});

atualizarMensagem();


