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

addTarefa.addEventListener('click', () => {
    modal.style.display = 'flex';
})

const submitTask = document.querySelector('.submit')
submitTask.addEventListener('click', () => {

    var nomeInput = campoNome.value.trim();
    var descrInput = campoDescricao.value.trim();

    if (nomeInput === '' || descrInput === '') {
        alert('Preencha todos os campos!');
        return;
    };

    const newTask = document.createElement('div');
    newTask.classList.add('task');

    newTask.innerHTML = `
    <div class="task-container">
        <div class="info">
            <h3>${nomeInput}</h3>
            <p>${descrInput}</p>
        <div>
            <button class="delete-task">Excluir</button>
            <button class="edit-task">Editar</button>
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

    const editTaskbtn = newTask.querySelector('.edit-task');
    editTaskbtn.addEventListener('click', () => {
        editModal.style.display = 'flex';

        const currentName = newTask.querySelector('h3').textContent;
        const currentDescription = newTask.querySelector('p').textContent;

        document.querySelector('.nameTaskEdit').value = currentName;
        document.querySelector('.descripTaskEdit').value = currentDescription;

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
        })
    })
});

darkMode.addEventListener("click", () => {
    const body = document.querySelector('.body');
    body.style.backgroundColor = '#222831';
})

closeModal.addEventListener("click", () => {
    modal.style.display = 'none';
});
atualizarMensagem();
