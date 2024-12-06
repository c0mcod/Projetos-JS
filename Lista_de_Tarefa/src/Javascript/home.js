// DECLARAÇÃO DE CONSTANTES
const addTarefa = document.querySelector('.addTask');
const modal = document.querySelector('.modal-task')
const campoNome = document.querySelector('.nameTask');
const campoDescricao = document.querySelector('.descripTask');
const containerTask = document.querySelector('.list-tasks');
const closeModal = document.querySelector('.close-btn');
const notFoundTask = document.querySelector('.notFound');
const darkMode = document.querySelector('.dark-btn');
const findTask = document.querySelector('.findTask');
const editModal = document.querySelector('.modal-task-edit');
const submitEdit = document.querySelector('.submit');

// FUNÇÃO PARA ATUALIZAR MENSAGEM DE FUNDO
function atualizarMensagem() {
    console.log("Número de tarefas no container:", containerTask.children.length);
    if (containerTask.children.length === 0) {
        notFoundTask.classList.remove('hidden');
        console.log("Mensagem visível (não há tarefas)");
    } else {
        notFoundTask.classList.add('hidden');
        console.log("Mensagem escondida (há tarefas)");
    }
}

// FUNÇÃO PARA DISPARAR O MODAL DE ADICIONAMENTO DE TAREFA
addTarefa.addEventListener('click', () => {
    modal.style.display = 'flex';
})

// FUNÇÃO PARA ENVIAR A NOVA ANOTAÇÃO
const submitTask = document.querySelector('.submit')
submitTask.addEventListener('click', () => {

    var nomeInput = campoNome.value.trim();
    var descrInput = campoDescricao.value.trim();
    // validação de formulário
    if (nomeInput === '' || descrInput === '') {
        alert('Preencha todos os campos!');
        return;
    };

    // criação da estrutura da anotação
    const newTask = document.createElement('div');
    newTask.classList.add('task-container');

    // Inicialmente, defina o status como "pending" (valor padrão)
    newTask.setAttribute('data-status', 'pending');

    newTask.innerHTML = `
    <div class="info">
        <h3>${nomeInput}</h3>
        <p>${descrInput}</p>
        <div>
            <button class="delete-task">Excluir</button>
            <button class="edit-task">Editar</button>
        </div>

        <div class="status">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="status-${nomeInput}" id="radio-pending-${nomeInput}" value="pending" checked>
                <label class="form-check-label" for="radio-pending-${nomeInput}">Pendente</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="status-${nomeInput}" id="radio-completed-${nomeInput}" value="completed">
                <label class="form-check-label" for="radio-completed-${nomeInput}">Concluída</label>
            </div>
        </div>
    </div>
`;

    // Atualizar o status dinamicamente ao clicar em um botão de rádio
    const radioButtons = newTask.querySelectorAll('input[name="status-' + nomeInput + '"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            newTask.setAttribute('data-status', e.target.value);
        });
    });


    // adiciona a nova anotação dentro do container com "appendChild"
    containerTask.appendChild(newTask);

    // chama a função para atualizar o fundo
    atualizarMensagem();

    // fecha o modal
    modal.style.display = 'none';

    // limpar os campos
    campoNome.value = '';
    campoDescricao.value = ''

    // evento para remover uma tarefa
    const removeTask = newTask.querySelector('.delete-task');
    removeTask.addEventListener('click', () => {

        // remove a tarefa
        newTask.remove();

        // atualiza a mensagem de fundo
        atualizarMensagem();
    });

    // EVENTO PARA EDITAR TAREFA
    const editTaskbtn = newTask.querySelector('.edit-task');
    editTaskbtn.addEventListener('click', () => {

        // Dispara o modal de edição
        editModal.style.display = 'flex';
        // Salva os textos contidos nas tags "h3" e "p" da tarefa selecionada
        const currentName = newTask.querySelector('h3').textContent;
        const currentDescription = newTask.querySelector('p').textContent;

        // Substitui o valor dos campos originais com "value" nas variaveis 
        document.querySelector('.nameTaskEdit').value = currentName;
        document.querySelector('.descripTaskEdit').value = currentDescription;

        // atribuindo a alteração atual com a nova tarefa
        currentEditingTask = newTask;

        const saveEditBtn = document.querySelector('.submit-edit');

        saveEditBtn.addEventListener("click", () => {
            const updateName = document.querySelector('.nameTaskEdit').value.trim();
            const updateDescription = document.querySelector('.descripTaskEdit').value.trim();

            if (updateName === '' || updateDescription === '') {
                alert('Preencha todos os campos!');
                return;
            };

            currentEditingTask.querySelector('h3').textContent = updateName
            currentEditingTask.querySelector('p').textContent = updateDescription

            editModal.style.display = 'none';
        });
    });
});


closeModal.addEventListener("click", () => {
    modal.style.display = 'none';
});

const closeBtnEdit = document.querySelector('.close-btn-edit');
const modalTaskEdit = document.querySelector('.modal-task-edit');
closeBtnEdit.addEventListener("click", () => {
    modalTaskEdit.style.display = "none";
})

// FILTRAR TAREFAS
// Selecionar elementos do menu de filtro
const taskCompleted = document.getElementById("filter-completed");
const taskPending = document.getElementById("filter-pending");
const taskAll = document.getElementById("filter-all");

// Adicionar eventos aos botões do menu de filtro com a função
taskCompleted.addEventListener("click", () => filtrarTarefas("completed"));
taskPending.addEventListener("click", () => filtrarTarefas("pending"));
taskAll.addEventListener("click", () => filtrarTarefas("all"));

// Função de filtro
function filtrarTarefas(filtro) {
    // Selecionar todas as tarefas
    const tasks = document.querySelectorAll(".task-container");

    tasks.forEach(task => {
        const status = task.getAttribute("data-status");

        if (filtro === "all") {
            // Mostrar todas as tarefas
            task.style.display = "block";
        } else if (status === filtro) {
            // Mostrar apenas as tarefas com o status igual ao parametro da função
            task.style.display = "block";
        } else {
            // Ocultar tarefas que não correspondem com o filtro
            task.style.display = "none";
        }
    });
}


atualizarMensagem();
