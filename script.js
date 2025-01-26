// Хранилище для NPC
let npcs = JSON.parse(localStorage.getItem('npcs')) || [];

// Функция создания NPC
function addNPC() {
    const names = ['Элрик', 'Лиастра', 'Гарм', 'Торгрим', 'Нимра'];
    const roles = ['купец', 'стражник', 'жрец', 'пират', 'алхимик'];

    const newNPC = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        status: 'alive'
    };

    npcs.push(newNPC);
    saveData();
    updateList();
}

// Удаление NPC
function killNPC(id) {
    npcs = npcs.filter(npc => npc.id !== id);
    saveData();
    updateList();
}

// Сохранение в локальное хранилище
function saveData() {
    localStorage.setItem('npcs', JSON.stringify(npcs));
}

// Обновление списка на экране
function updateList() {
    const list = document.getElementById('npc-list');
    list.innerHTML = '';

    npcs.forEach(npc => {
        list.innerHTML += `
            <div class="npc-card">
                <div>
                    <strong>${npc.name}</strong><br>
                    <small>${npc.role}</small>
                </div>
                <button onclick="killNPC(${npc.id})">🗡️ Убить</button>
            </div>
        `;
    });
}

// Первая загрузка
updateList();