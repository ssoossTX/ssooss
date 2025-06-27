// Минимальный рабочий JS для предотвращения белого экрана
// (добавьте сюда вашу игровую логику после проверки)
document.addEventListener('DOMContentLoaded', function() {
    // Проверка наличия основных элементов
    // УДАЛЕНО: конфликтующий обработчик clickerBtn и переменная let clicks = 0
    // Простейшее меню (без ошибок)
    const sidebar = document.getElementById('sidebar');
    const openSidebar = document.getElementById('openSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    if (openSidebar && sidebar) {
        openSidebar.addEventListener('click', () => {
            sidebar.classList.add('open');
            if (window.innerWidth <= 700) document.body.classList.add('menu-open');
        });
    }
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    }
    // Переключение вкладок
    const menuItems = document.querySelectorAll('.menu-list li');
    const tabs = document.querySelectorAll('.tab');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.menu-list li.active').classList.remove('active');
            item.classList.add('active');
            tabs.forEach(tab => tab.classList.remove('active'));
            document.getElementById('tab-' + item.dataset.tab).classList.add('active');
            sidebar.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
});

// --- Глобальные переменные ---
let clicks = 0;
let clickPower = 1;
let upgradeCost = 10;
let prestigeCost = 1000;
let level = 1;
let exp = 0;
let expToNext = 20;
let points = 0;
let abilities = [
    { name: 'Сила', value: 0 },
    { name: 'Ловкость', value: 0 },
    { name: 'Интеллект', value: 0 }
];
let diamonds = 0;
let keys = { common: 0, rare: 0, epic: 0 };
const casePrices = [100, 500, 2000];
// === Перемещено: объявление caseTypes ===
const caseTypes = [
    {
        name: 'Обычный кейс',
        price: 50,
        key: 'common',
        loot: [
            { name: 'Зелье лечения', rarity: 'Обычный', chance: 60, effect: 'Восстанавливает здоровье' },
            { name: 'Малый клик-бонус', rarity: 'Обычный', chance: 25, effect: 'Добавляет 10 кликов' },
            { name: 'Книга опыта', rarity: 'Обычный', chance: 10, effect: 'Дает опыт' },
            { name: 'Редкий эликсир', rarity: 'Редкий', chance: 4, effect: 'Восстанавливает здоровье' },
            { name: 'Редкий клик-бонус', rarity: 'Редкий', chance: 1, effect: 'Добавляет 50 кликов' }
        ]
    },
    {
        name: 'Редкий кейс',
        price: 200,
        key: 'rare',
        loot: [
            { name: 'Большое зелье лечения', rarity: 'Редкий', chance: 50, effect: 'Восстанавливает здоровье' },
            { name: 'Большой клик-бонус', rarity: 'Редкий', chance: 30, effect: 'Добавляет 50 кликов' },
            { name: 'Книга опыта', rarity: 'Редкий', chance: 10, effect: 'Дает опыт' },
            { name: 'Эпический эликсир', rarity: 'Эпический', chance: 8, effect: 'Восстанавливает здоровье' },
            { name: 'Эпический клик-бонус', rarity: 'Эпический', chance: 2, effect: 'Добавляет 200 кликов' }
        ]
    },
    {
        name: 'Эпический кейс',
        price: 1000,
        key: 'epic',
        loot: [
            { name: 'Эпическое зелье лечения', rarity: 'Эпический', chance: 60, effect: 'Восстанавливает здоровье' },
            { name: 'Эпический клик-бонус', rarity: 'Эпический', chance: 25, effect: 'Добавляет 200 кликов' },
            { name: 'Книга опыта', rarity: 'Эпический', chance: 10, effect: 'Дает опыт' },
            { name: 'Легендарный артефакт', rarity: 'Легендарный', chance: 5, effect: 'Дает уникальную способность' }
        ]
    }
];
// --- Новое: здоровье и временный бонус ---
let health = 100;
let maxHealth = 100;
let clickBonus = 1; // множитель от уникальных предметов
let bonusTimeout = null;
// --- Мультипликатор престижа ---
if (typeof window.prestigeMultiplier !== 'number') window.prestigeMultiplier = 1;

// --- DOM элементы ---
const clickerBtn = document.getElementById('clickerBtn');
const clicksSpan = document.getElementById('clicks');
const upgradeBtn = document.querySelector('.upgrade-btn');
const playerName = document.getElementById('playerName');
const playerLevel = document.getElementById('playerLevel');
const playerPoints = document.getElementById('playerPoints');
const inventoryList = document.getElementById('inventoryList');
const abilitiesList = document.getElementById('abilitiesList');
// --- Новое: здоровье ---
let healthBar = document.getElementById('healthBar');
if (!healthBar) {
    healthBar = document.createElement('div');
    healthBar.id = 'healthBar';
    healthBar.style = 'height:22px;background:#eee;border-radius:8px;margin:10px 0;overflow:hidden;position:relative;';
    let inner = document.createElement('div');
    inner.id = 'healthInner';
    inner.style = 'height:100%;background:linear-gradient(90deg,#27ae60,#2ecc40);width:100%;transition:width .3s;';
    healthBar.appendChild(inner);
    let label = document.createElement('span');
    label.id = 'healthLabel';
    label.style = 'position:absolute;left:50%;top:0;transform:translateX(-50%);color:#222;font-weight:bold;line-height:22px;';
    healthBar.appendChild(label);
    document.querySelector('.profile')?.prepend(healthBar);
}
function updateHealthBar() {
    let inner = document.getElementById('healthInner');
    let label = document.getElementById('healthLabel');
    if (inner) inner.style.width = Math.max(0, Math.min(health, maxHealth)) / maxHealth * 100 + '%';
    if (label) label.textContent = `Здоровье: ${health} / ${maxHealth}`;
}
// === Улучшенная система способностей ===
function getStrengthBonus() {
    return abilities[0]?.value || 0; // сила
}
function getAgilityBonus() {
    return abilities[1]?.value || 0; // ловкость
}
function getIntellectBonus() {
    return abilities[2]?.value || 0; // интеллект
}
// Урон игрока в подземельях с учётом силы
function getPlayerDmg() {
    return Math.floor(8 + (level * 1.5) + getStrengthBonus() * 3);
}
// Максимальное HP игрока в подземельях с учётом ловкости
function getPlayerMaxDungeonHp() {
    return maxHealth + getAgilityBonus() * 15;
}
// Модифицированная функция начисления опыта с учётом интеллекта
function addExp(amount) {
    let intBonus = getIntellectBonus();
    let mult = 1 + intBonus * 0.07; // +7% опыта за 1 интеллект
    let realAmount = Math.round(amount * mult);
    exp += realAmount;
    while (exp >= expToNext) {
        exp -= expToNext;
        levelUp();
    }
    updateProfile();
    saveProgress();
}
// Улучшенный вывод бонусов в интерфейсе
function updateProfile() {
    playerLevel.textContent = level;
    playerPoints.textContent = points;
    document.getElementById('expBar').style.width = (exp / expToNext * 100) + '%';
    document.getElementById('expText').textContent = `${exp} / ${expToNext} опыта`;
    abilitiesList.innerHTML = abilities.map((a, i) => {
        let bonus = '';
        if (i === 0 && a.value > 0) bonus = ` <span style='color:#27ae60'>(+${a.value*3} урона)</span>`;
        if (i === 1 && a.value > 0) bonus = ` <span style='color:#2980b9'>(+${a.value*15} HP)</span>`;
        if (i === 2 && a.value > 0) bonus = ` <span style='color:#f39c12'>(+${(a.value*7).toFixed(0)}% опыта)</span>`;
        return `<div>${a.name}: ${a.value}${bonus} <button class='ability-up' data-idx='${i}' ${points === 0 ? 'disabled' : ''}>+</button></div>`;
    }).join('');
    document.getElementById('diamonds').textContent = diamonds;
    document.getElementById('keyCommon').textContent = keys.common;
    document.getElementById('keyRare').textContent = keys.rare;
    document.getElementById('keyEpic').textContent = keys.epic;
    if (document.getElementById('prestigeMultiplier')) {
        let mult = (typeof window.prestigeMultiplier === 'number' ? window.prestigeMultiplier : 1);
        document.getElementById('prestigeMultiplier').textContent = mult.toFixed(2) + 'x';
    }
    updateHealthBar();
}
// Используйте getPlayerMaxDungeonHp() в startDungeon и startTrainingBattle
// --- Функции ---
// Обновление профиля с алмазами и ключами
function updateProfile() {
    playerLevel.textContent = level;
    playerPoints.textContent = points;
    document.getElementById('expBar').style.width = (exp / expToNext * 100) + '%';
    document.getElementById('expText').textContent = `${exp} / ${expToNext} опыта`;
    // abilities
    abilitiesList.innerHTML = abilities.map((a, i) =>
        `<div>${a.name}: ${a.value} <button class='ability-up' data-idx='${i}' ${points === 0 ? 'disabled' : ''}>+</button></div>`
    ).join('');
    // diamonds & keys
    document.getElementById('diamonds').textContent = diamonds;
    document.getElementById('keyCommon').textContent = keys.common;
    document.getElementById('keyRare').textContent = keys.rare;
    document.getElementById('keyEpic').textContent = keys.epic;
    // Мультипликатор престижа
    if (document.getElementById('prestigeMultiplier')) {
        let mult = (typeof window.prestigeMultiplier === 'number' ? window.prestigeMultiplier : 1);
        document.getElementById('prestigeMultiplier').textContent = mult.toFixed(2) + 'x';
    }
    updateHealthBar();
}

// Инициализация профиля при старте
updateProfile();

// Кликер: только клики, без опыта
clickerBtn.addEventListener('click', () => {
    clicks += clickPower;
    clicksSpan.textContent = clicks;
    saveProgress();
});

// Функция повышения уровня с поздравлением и наградой
function levelUp() {
    level++;
    points += 3;
    const diamondReward = 5 + Math.floor(level * 0.5);
    diamonds += diamondReward;
    showToast(`Поздравляем! Вы достигли ${level} уровня!\nВы получили 3 поинта и ${diamondReward} алмазиков!`, 'info', 4000);
    expToNext = Math.floor(expToNext * 1.2 + 5);
}

// Исправленный addExp с уведомлением
function addExp(amount) {
    exp += amount;
    while (exp >= expToNext) {
        exp -= expToNext;
        levelUp();
    }
    updateProfile();
    saveProgress();
}

// Улучшение способностей
abilitiesList.addEventListener('click', e => {
    if (e.target.classList.contains('ability-up')) {
        const idx = +e.target.dataset.idx;
        if (points > 0) {
            abilities[idx].value++;
            points--;
            updateProfile();
            saveProgress();
        }
    }
});

// Магазин, карта, подземелья (цены)
// УДАЛЕНО: устаревший обработчик покупки кейса за клики
document.querySelectorAll('.case-btn').forEach((btn, i) => {
    btn.textContent = `${caseTypes[i].name} — ${caseTypes[i].price} алмазиков или 1 ключ`;
    // Кнопка инфо
    let infoBtn = document.createElement('button');
    infoBtn.textContent = 'Инфо о дропе';
    infoBtn.style = 'margin-left:12px; background:#2980b9; color:#fff; border:none; border-radius:5px; padding:6px 14px; cursor:pointer; font-size:0.95em;';
    btn.parentNode.insertBefore(infoBtn, btn.nextSibling);
    // Модальное окно/блок для дропа
    let dropInfo = document.createElement('div');
    dropInfo.style = 'display:none; position:fixed; left:0; top:0; width:100vw; height:100vh; background:rgba(0,0,0,0.55); z-index:99999; align-items:center; justify-content:center;';
    dropInfo.innerHTML = `<div style='background:linear-gradient(135deg,#f8fafc 60%,#e0e7ef 100%); color:#222; border-radius:22px; padding:44px 36px; min-width:320px; max-width:96vw; box-shadow:0 12px 48px #0008; text-align:center; position:relative; font-family:inherit; border:2px solid #dfe6e9;'>
        <h2 style='margin-top:0; margin-bottom:22px; font-size:1.7em; letter-spacing:0.5px; color:#2980b9; text-shadow:0 2px 8px #dfe6e9;'>${caseTypes[i].name} — дроп</h2>
        <table style='width:100%; border-collapse:separate; border-spacing:0 10px; margin-bottom:28px; font-size:1.13em;'>
            <thead><tr style='background:#f7fafd; color:#2980b9; font-weight:700;'><th style="padding:10px 12px; border-radius:10px 0 0 10px;">🎁 Предмет</th><th style="padding:10px 12px;">⭐ Редкость</th><th style="padding:10px 12px;">🎲 Шанс</th><th style="padding:10px 12px; border-radius:0 10px 10px 0;">✨ Эффект</th></tr></thead>
            <tbody>
                ${caseTypes[i].loot.map(item => `<tr style="background:${item.rarity==='Легендарный'?'#fff6d6':item.rarity==='Эпический'?'#e5e9ff':item.rarity==='Редкий'?'#e3f0fb':'#f7fafd'}; color:${item.rarity==='Легендарный'?'#b9770e':item.rarity==='Эпический'?'#6c5ce7':item.rarity==='Редкий'?'#0984e3':'#222'}; font-weight:${item.rarity==='Легендарный'?'bold':'normal'}; box-shadow:0 2px 8px #0001; border-radius:8px;">
                    <td style='padding:10px 12px; display:flex; align-items:center; gap:8px;'>${item.rarity==='Легендарный'?'<span style="font-size:1.3em;">👑</span>':''}${item.rarity==='Эпический'?'<span style="font-size:1.2em;">💎</span>':''}${item.rarity==='Редкий'?'<span style="font-size:1.1em;">🔷</span>':''}${item.name}</td>
                    <td style='padding:10px 12px;'>${item.rarity}</td>
                    <td style='padding:10px 12px;'>${item.chance}%</td>
                    <td style='padding:10px 12px;'>${item.effect}</td>
                </tr>`).join('')}
            </tbody>
        </table>
        <button class='close-drop-info' style='background:linear-gradient(90deg,#e74c3c,#c0392b); color:#fff; border:none; border-radius:10px; padding:14px 44px; font-size:1.13em; cursor:pointer; box-shadow:0 2px 12px #e74c3c33; transition:background .2s; font-weight:600; letter-spacing:0.5px;'>Закрыть</button>
    </div>`;
    document.body.appendChild(dropInfo);
    infoBtn.addEventListener('click', () => {
        dropInfo.style.display = 'flex';
    });
    dropInfo.querySelector('.close-drop-info').addEventListener('click', () => {
        dropInfo.style.display = 'none';
    });
    // Обработчик открытия кейса
    btn.addEventListener('click', () => {
        if (diamonds < caseTypes[i].price && keys[caseTypes[i].key] <= 0) {
            if (typeof window.showToast === 'function') showToast('Недостаточно алмазиков или ключей!', 'error');
            return;
        }
        // Выбор предмета по шансам
        let rand = Math.random() * 100, sum = 0, lootItem = caseTypes[i].loot[0];
        for (let item of caseTypes[i].loot) {
            sum += item.chance;
            if (rand < sum) { lootItem = item; break; }
        }
        if (diamonds >= caseTypes[i].price) {
            diamonds -= caseTypes[i].price;
        } else if (keys[caseTypes[i].key] > 0) {
            keys[caseTypes[i].key]--;
        }
        if (addToInventory(lootItem.name)) {
            updateProfile();
            updateInventory();
            saveProgress();
            if (typeof window.showToast === 'function') showToast(`Вы получили: ${lootItem.name} (${lootItem.rarity}) — ${lootItem.effect}`, 'success');
        }
    });
}); // конец forEach

// --- Улучшение кликов ---
upgradeBtn.addEventListener('click', () => {
    if (clicks >= upgradeCost) {
        clicks -= upgradeCost;
        clickPower++;
        upgradeCost = Math.floor(upgradeCost * 1.5 + 5);
        clicksSpan.textContent = clicks;
        upgradeBtn.textContent = `Улучшить (+${clickPower}/клик) — ${upgradeCost} кликов`;
        showToast(`Клик улучшен! Теперь +${clickPower}/клик.`, 'success');
        saveProgress();
    } else {
        showToast(`Недостаточно кликов для улучшения! Нужно ${upgradeCost}`, 'error');
    }
});

// Престиж (заглушка с ценой)
document.querySelector('.prestige-btn').textContent = `Престиж — ${prestigeCost} кликов`;
document.querySelector('.prestige-btn').addEventListener('click', () => {
    if (clicks >= prestigeCost) {
        // --- Улучшенная механика престижа ---
        const bonusDiamonds = Math.floor((level + clicks + exp) / 10) + 10;
        showToast(`Престиж совершен! Вы получили ${bonusDiamonds} алмазиков и +10% к приросту кликов!`, 'success', 4000);
        // Сохраняем бонусы
        diamonds += bonusDiamonds;
        // Бонус к приросту кликов (мультипликатор)
        if (typeof window.prestigeMultiplier !== 'number') window.prestigeMultiplier = 1;
        window.prestigeMultiplier = +(window.prestigeMultiplier * 1.1).toFixed(2);
        // Сброс прогресса, кроме алмазов и мультипликатора
        clicks = 0;
        clickPower = 1;
        upgradeCost = 10;
        prestigeCost = Math.floor(prestigeCost * 2.2);
        level = 1;
        exp = 0;
        expToNext = 20;
        points = 0;
        abilities = [
            { name: 'Сила', value: 0 },
            { name: 'Ловкость', value: 0 },
            { name: 'Интеллект', value: 0 }
        ];
        keys = { common: 0, rare: 0, epic: 0 };
        // inventory не сбрасываем, если хотите - добавьте: inventory.length = 0;
        // Применяем мультипликатор к кликам
        // === Универсальный обработчик клика с учётом престижа ===
        if (typeof window.prestigeMultiplier === 'undefined') window.prestigeMultiplier = 1;
        // Удаляем все старые обработчики клика
        const newClickerBtn = clickerBtn.cloneNode(true);
        clickerBtn.parentNode.replaceChild(newClickerBtn, clickerBtn);
        newClickerBtn.addEventListener('click', () => {
            clicks += Math.floor(clickPower * window.prestigeMultiplier);
            clicksSpan.textContent = clicks;
            saveProgress();
        });
        updateProfile();
        clicksSpan.textContent = clicks;
        upgradeBtn.textContent = `Улучшить (+${clickPower}/клик) — ${upgradeCost} кликов`;
        document.querySelector('.prestige-btn').textContent = `Престиж — ${prestigeCost} кликов`;
        saveProgress();
    } else {
        showToast(`Недостаточно кликов для престижа! Нужно ${prestigeCost}`, 'error');
    }
});

// === TOAST-УВЕДОМЛЕНИЯ ===
(function(){
    if (window.showToast) return;
    const style = document.createElement('style');
    style.textContent = `
    .toast-container { position: fixed; z-index: 9999; right: 24px; bottom: 24px; display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
    .toast { min-width: 220px; max-width: 350px; background: #222; color: #fff; padding: 14px 22px; border-radius: 8px; box-shadow: 0 2px 12px #0004; font-size: 1rem; opacity: 0; transform: translateY(30px); transition: opacity .3s, transform .3s; pointer-events: auto; }
    .toast.toast-show { opacity: 1; transform: translateY(0); }
    .toast-success { background: linear-gradient(90deg,#2ecc40,#27ae60); }
    .toast-error { background: linear-gradient(90deg,#e74c3c,#c0392b); }
    .toast-info { background: linear-gradient(90deg,#3498db,#2980b9); }
    `;
    document.head.appendChild(style);
    let container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    window.showToast = function(msg, type = 'info', timeout = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('toast-show'), 10);
        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => toast.remove(), 300);
        }, timeout);
    };
})();

// === ТРЕНИРОВОЧНОЕ ПОДЗЕМЕЛЬЕ и ЭКСПЕДИЦИИ ===
document.addEventListener('DOMContentLoaded', function() {
    const expeditionsDiv = document.querySelector('.expeditions');
    const towersDiv = document.querySelector('.towers');
    // Добавляем тренировочную экспедицию, если её нет
    if (expeditionsDiv && !expeditionsDiv.querySelector('.training')) {
        const trainExpBtn = document.createElement('button');
        trainExpBtn.className = 'expedition-btn training';
        trainExpBtn.textContent = 'Тренировочная экспедиция (доступно с 0 ур.)';
        trainExpBtn.addEventListener('click', () => {
            addExp(2);
            showToast('Вы получили 2 опыта за тренировочную экспедицию!', 'info');
            saveProgress();
        });
        expeditionsDiv.prepend(trainExpBtn);
    }
    // Добавляем тренировочное подземелье, если его нет
    if (towersDiv && !towersDiv.querySelector('.training')) {
        const trainTowerBtn = document.createElement('button');
        trainTowerBtn.className = 'tower-btn training';
        trainTowerBtn.textContent = 'Тренировочное подземелье (выбор монстра)';
        trainTowerBtn.addEventListener('click', () => {
            openTrainingDungeonModal();
        });
        towersDiv.prepend(trainTowerBtn);
    }
    // --- Снимаем все старые обработчики с обычных экспедиций ---
    document.querySelectorAll('.expedition-btn').forEach(btn => {
        if (btn.classList.contains('training')) return;
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    // --- Навешиваем новые обработчики с наградами по сложности ---
    document.querySelectorAll('.expedition-btn').forEach(btn => {
        if (btn.classList.contains('training')) return;
        // Определяем требуемый уровень для экспедиции
        let requiredLevel = 1;
        let expReward = 5, msg = 'Экспедиция завершена! Получено 5 опыта.';
        let duration = 3, dropChance = 0.2, possibleDrops = ['Зелье лечения'];
        if (btn.classList.contains('easy')) {
            requiredLevel = 1;
            expReward = 5;
            msg = 'Лёгкая экспедиция завершена! Получено 5 опыта.';
            duration = 3;
            dropChance = 0.2;
            possibleDrops = ['Зелье лечения', 'Малый клик-бонус'];
        }
        if (btn.classList.contains('medium')) {
            requiredLevel = 5;
            expReward = 12;
            msg = 'Средняя экспедиция завершена! Получено 12 опыта.';
            duration = 6;
            dropChance = 0.28;
            possibleDrops = ['Большое зелье лечения', 'Большой клик-бонус', 'Книга опыта'];
        }
        if (btn.classList.contains('hard')) {
            requiredLevel = 12;
            expReward = 25;
            msg = 'Сложная экспедиция завершена! Получено 25 опыта.';
            duration = 10;
            dropChance = 0.35;
            possibleDrops = ['Эпическое зелье лечения', 'Эпический клик-бонус', 'Книга опыта'];
        }
        if (btn.classList.contains('extreme')) {
            requiredLevel = 20;
            expReward = 50;
            msg = 'Экстремальная экспедиция завершена! Получено 50 опыта.';
            duration = 16;
            dropChance = 0.45;
            possibleDrops = ['Легендарный артефакт', 'Камень времени', 'Эпический клик-бонус'];
        }
        // Добавляем отображение уровня в текст кнопки, если ещё не добавлено
        if (!btn.textContent.match(/\(с \d+ ур\./)) {
            btn.textContent += ` (c ${requiredLevel} ур.)`;
        }
        // --- Новый блок: сохранение и восстановление таймера экспедиции ---
        let expeditionKey = 'expeditionTimer_' + btn.className.replace(/\s/g, '_');
        function startExpeditionTimer(remaining) {
            btn.disabled = true;
            let sec = remaining;
            let origText = btn.textContent;
            btn.textContent = `Экспедиция в пути... (${sec} сек)`;
            let endTime = Date.now() + sec * 1000;
            localStorage.setItem(expeditionKey, JSON.stringify({ endTime, expReward, msg, dropChance, possibleDrops }));
            let timer = setInterval(() => {
                let left = Math.ceil((endTime - Date.now()) / 1000);
                btn.textContent = `Экспедиция в пути... (${left} сек)`;
                if (left <= 0) {
                    clearInterval(timer);
                    btn.disabled = false;
                    btn.textContent = origText;
                    addExp(expReward);
                    showToast(msg, 'success');
                    if (Math.random() < dropChance) {
                        let drop = possibleDrops[Math.floor(Math.random()*possibleDrops.length)];
                        addToInventory(drop);
                        updateInventory();
                        showToast(`Бонус: найден предмет — ${drop}!`, 'info');
                    }
                    localStorage.removeItem(expeditionKey);
                    saveProgress();
                }
            }, 1000);
        }
        // При загрузке — если есть активная экспедиция, восстановить таймер
        let saved = localStorage.getItem(expeditionKey);
        if (saved) {
            try {
                let data = JSON.parse(saved);
                let left = Math.ceil((data.endTime - Date.now()) / 1000);
                if (left > 0) {
                    // Восстановить таймер
                    startExpeditionTimer(left);
                } else {
                    // Время истекло, сразу выдать награду
                    addExp(data.expReward);
                    showToast(data.msg, 'success');
                    if (Math.random() < data.dropChance) {
                        let drop = data.possibleDrops[Math.floor(Math.random()*data.possibleDrops.length)];
                        addToInventory(drop);
                        updateInventory();
                        showToast(`Бонус: найден предмет — ${drop}!`, 'info');
                    }
                    localStorage.removeItem(expeditionKey);
                    saveProgress();
                }
            } catch(e) { localStorage.removeItem(expeditionKey); }
        }
        btn.addEventListener('click', function() {
            if (level < requiredLevel) {
                showToast(`Требуется ${requiredLevel} уровень для этой экспедиции!`, 'error');
                return;
            }
            // Если уже есть таймер — не запускать повторно
            if (localStorage.getItem(expeditionKey)) return;
            startExpeditionTimer(duration);
        });
    });
});

// === ТРЕНИРОВОЧНОЕ ПОДЗЕМЕЛЬЕ ===
const expeditionsDiv = document.querySelector('.expeditions');
const towersDiv = document.querySelector('.towers');
if (expeditionsDiv && !expeditionsDiv.querySelector('.training')) {
    const trainExpBtn = document.createElement('button');
    trainExpBtn.className = 'expedition-btn training';
    trainExpBtn.textContent = 'Тренировочная экспедиция (доступно с 0 ур.)';
    trainExpBtn.addEventListener('click', () => {
        addExp(2);
        showToast('Вы получили 2 опыта за тренировочную экспедицию!', 'info');
        saveProgress();
    });
    expeditionsDiv.prepend(trainExpBtn);
}
if (towersDiv && !towersDiv.querySelector('.training')) {
    const trainTowerBtn = document.createElement('button');
    trainTowerBtn.className = 'tower-btn training';
    trainTowerBtn.textContent = 'Тренировочное подземелье (выбор монстра)';
    trainTowerBtn.addEventListener('click', () => {
        openTrainingDungeonModal();
    });
    towersDiv.prepend(trainTowerBtn);
}

function openTrainingDungeonModal() {
    // Создаём модальное окно выбора
    let modal = document.createElement('div');
    modal.className = 'training-dungeon-modal';
    modal.style = 'position:fixed;left:0;top:0;width:100vw;height:100vh;background:rgba(24,28,36,0.92);z-index:100000;display:flex;align-items:center;justify-content:center;';
    // Выбор башни
    let towerSelect = `<label>Башня:<br><select id='train-tower-sel'>${towerNames.map((n,i)=>`<option value='${i}'>${n}</option>`).join('')}</select></label>`;
    // Выбор ранга
    let rankSelect = `<label>Ранг:<br><select id='train-rank-sel'>${monsterRanks.map(r=>`<option value='${r}'>${r}</option>`).join('')}</select></label>`;
    // Выбор типа (монстр/босс)
    let bossSelect = `<label>Тип:<br><select id='train-type-sel'><option value='monster'>Обычный монстр</option><option value='boss'>Босс</option></select></label>`;
    // Контейнер для выбора монстра
    let monsterSelect = `<label>Монстр:<br><select id='train-monster-sel'></select></label>`;
    // Кнопки
    let btns = `<button id='train-start-btn' style='margin:12px 18px 0 0;background:#27ae60;color:#fff;padding:10px 24px;border:none;border-radius:7px;font-size:1.1em;cursor:pointer;'>Начать бой</button><button id='train-cancel-btn' style='margin-top:12px;background:#e74c3c;color:#fff;padding:10px 24px;border:none;border-radius:7px;font-size:1.1em;cursor:pointer;'>Отмена</button>`;
    modal.innerHTML = `<div style='background:#232b39;padding:32px 28px;border-radius:16px;min-width:320px;text-align:center;color:#fff;'><h3>Тренировочное подземелье</h3><div style='display:flex;flex-direction:column;gap:12px;align-items:center;'>${towerSelect}${rankSelect}${bossSelect}${monsterSelect}</div>${btns}</div>`;
    document.body.appendChild(modal);
    // Функция обновления списка монстров
    function updateMonsterList() {
        let towerIdx = +modal.querySelector('#train-tower-sel').value;
        let isBoss = modal.querySelector('#train-type-sel').value === 'boss';
        let list = towerMonsters[towerIdx];
        let sel = modal.querySelector('#train-monster-sel');
        sel.innerHTML = list.map((m,i)=>`<option value='${i}'>${isBoss?'Босс ':''}${m.name}</option>`).join('');
    }
    modal.querySelector('#train-tower-sel').onchange = updateMonsterList;
    modal.querySelector('#train-type-sel').onchange = updateMonsterList;
    updateMonsterList();
    // Кнопка отмены
    modal.querySelector('#train-cancel-btn').onclick = ()=>modal.remove();
    // Кнопка старта боя
    modal.querySelector('#train-start-btn').onclick = function() {
        let towerIdx = +modal.querySelector('#train-tower-sel').value;
        let rank = modal.querySelector('#train-rank-sel').value;
        let isBoss = modal.querySelector('#train-type-sel').value === 'boss';
        let monsterIdx = +modal.querySelector('#train-monster-sel').value;
        startTrainingBattle(towerIdx, monsterIdx, rank, isBoss);
        modal.remove();
    };
}

function startTrainingBattle(towerIdx, monsterIdx, rank, isBoss) {
    // Генерируем монстра по выбору
    let base = towerMonsters[towerIdx][monsterIdx];
    let rankIdx = monsterRanks.indexOf(rank);
    let rankMult = 1 + (monsterRanks.length-rankIdx-1)*0.15 + (isBoss?1:0);
    let monster = {
        ...base,
        rank: rank,
        isBoss: isBoss,
        name: (isBoss?'Босс ':'') + base.name,
        hp: Math.round(base.baseHp * rankMult * (isBoss?2:1)),
        atk: Math.round(base.baseAtk * rankMult * (isBoss?2:1))
    };
    // Состояние тренировки
    window.trainingBattle = {
        monster,
        monsterHp: monster.hp,
        playerHp: getPlayerMaxDungeonHp()
    };
    renderTrainingBattleUI();
}

function renderTrainingBattleUI() {
    let modal = document.getElementById('trainingBattleUI');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'trainingBattleUI';
        modal.style = 'position:fixed;left:0;top:0;width:100vw;height:100vh;background:linear-gradient(135deg,#181c24 60%,#232b39 100%);z-index:100001;display:flex;align-items:center;justify-content:center;';
        document.body.appendChild(modal);
    }
    let b = window.trainingBattle;
    if (!b) { modal.style.display = 'none'; return; }
    modal.style.display = 'flex';
    let m = b.monster;
    modal.innerHTML = `<div style='background:rgba(24,28,36,0.98);border-radius:18px;box-shadow:0 8px 32px #000a;padding:36px 44px;min-width:340px;max-width:96vw;text-align:center;position:relative;color:#fff;'>
        <h2 style='margin-bottom:10px;'>Тренировка: ${m.name} <span style="color:#888;">[${m.rank}]</span>${m.isBoss?' <span style="color:#e67e22;">(Босс)</span>':''}</h2>
        <div style='margin-bottom:10px;'>Здоровье монстра: <b>${b.monsterHp}</b> / ${m.hp}</div>
        <div style='margin-bottom:10px;'>Атака монстра: <b>${m.atk}</b></div>
        <div style='margin-bottom:18px;'>Ваша атака: <b>${getPlayerDmg()}</b></div>
        <div style='margin-bottom:18px;'>Ваше здоровье: <b>${b.playerHp}</b> / ${maxHealth}</div>
        <button id='trainAttackBtn' style='background:#27ae60;color:#fff;padding:10px 28px;border:none;border-radius:7px;font-size:1.1em;margin:0 8px 12px 0;cursor:pointer;'>Атаковать</button>
        <button id='trainHealBtn' style='background:#2980b9;color:#fff;padding:10px 18px;border:none;border-radius:7px;font-size:1.1em;margin:0 8px 12px 0;cursor:pointer;'>Восстановить HP</button>
        <button id='trainExitBtn' style='background:#e74c3c;color:#fff;padding:10px 18px;border:none;border-radius:7px;font-size:1.1em;margin:0 8px 12px 0;cursor:pointer;'>Выйти</button>
        <div id='trainMsg' style='margin-top:18px;min-height:32px;'></div>
    </div>`;
    document.getElementById('trainAttackBtn').onclick = trainingBattleAttack;
    document.getElementById('trainHealBtn').onclick = trainingBattleHeal;
    document.getElementById('trainExitBtn').onclick = function() {
        window.trainingBattle = null;
        modal.style.display = 'none';
    };
}

function trainingBattleAttack() {
    let b = window.trainingBattle;
    let m = b.monster;
    let playerDmg = getPlayerDmg();
    b.monsterHp -= playerDmg;
    let msg = `Вы нанесли ${playerDmg} урона!`;
    document.getElementById('trainMsg').innerHTML = msg;
    setTimeout(() => {
        if (b.monsterHp <= 0) {
            msg += '<br>Монстр повержен!<br><span style="color:#3498db;">Получено опыта: 1</span><br><span style="color:#27ae60;">Получено: Зелье лечения</span>';
            addExp(1);
            addToInventory('Зелье лечения');
            updateInventory();
            window.trainingBattle = null;
            setTimeout(()=>{
                document.getElementById('trainingBattleUI').style.display = 'none';
            }, 1200);
            document.getElementById('trainMsg').innerHTML = msg;
            return;
        }
        // Монстр атакует
        let monsterDmg = m.atk;
        b.playerHp -= monsterDmg;
        msg += `<br>Монстр атакует и наносит ${monsterDmg} урона!`;
        document.getElementById('trainMsg').innerHTML = msg;
        if (b.playerHp <= 0) {
            msg += '<br><span style="color:#e74c3c;font-weight:bold;">Вы проиграли! Тренировка завершена.</span>';
            window.trainingBattle = null;
            setTimeout(()=>{
                document.getElementById('trainingBattleUI').style.display = 'none';
            }, 1200);
            document.getElementById('trainMsg').innerHTML = msg;
            return;
        }
        setTimeout(renderTrainingBattleUI, 600);
    }, 600);
}

function trainingBattleHeal() {
    let b = window.trainingBattle;
    b.playerHp = maxHealth;
    showToast('Здоровье полностью восстановлено!', 'success');
    renderTrainingBattleUI();
}

// === СОХРАНЕНИЕ/ЗАГРУЗКА ПРОГРЕССА ===
function saveProgress() {
    const data = {
        clicks, clickPower, upgradeCost, prestigeCost, level, exp, expToNext, points,
        abilities, diamonds, keys,
        prestigeMultiplier: typeof window.prestigeMultiplier === 'number' ? window.prestigeMultiplier : 1,
        inventory,
        // --- Сохраняем прогресс подземелья ---
        dungeonState: dungeonState ? dungeonState : null,
        dungeonActive: !!dungeonState // теперь зависит только от наличия dungeonState
    };
    localStorage.setItem('rpgSave', JSON.stringify(data));
}
function loadProgress() {
    const data = JSON.parse(localStorage.getItem('rpgSave'));
    if (!data) return;
    clicks = data.clicks;
    clickPower = data.clickPower;
    upgradeCost = data.upgradeCost;
    prestigeCost = data.prestigeCost;
    level = data.level;
    exp = data.exp;
    expToNext = data.expToNext;
    points = data.points;
    abilities = data.abilities;
    diamonds = data.diamonds;
    keys = data.keys;
    window.prestigeMultiplier = typeof data.prestigeMultiplier === 'number' ? data.prestigeMultiplier : 1;
    // --- Миграция инвентаря ---
    if (Array.isArray(data.inventory)) {
        if (typeof data.inventory[0] === 'string') {
            // Старый формат: массив строк
            inventory = [];
            data.inventory.forEach(name => {
                let found = inventory.find(obj => obj.name === name);
                if (found) found.count++;
                else inventory.push({ name, count: 1 });
            });
        } else {
            // Новый формат
            inventory = data.inventory.map(obj => ({ name: obj.name, count: obj.count }));
        }
    } else {
        inventory = [];
    }
    // --- Восстановление прогресса подземелья ---
    dungeonState = data.dungeonState || null;
    window.dungeonState = dungeonState; // делаем глобальной
    dungeonActive = !!dungeonState;
    updateProfile();
    clicksSpan.textContent = clicks;
    upgradeBtn.textContent = `Улучшить (+${clickPower}/клик) — ${upgradeCost} кликов`;
    document.querySelector('.prestige-btn').textContent = `Престиж — ${prestigeCost} кликов`;
    updateInventory();
    // Если подземелье было активно — отрисовать интерфейс
    if (dungeonActive && dungeonState) {
        renderDungeonUI();
    }
    renderTowerButtons(); // обновить кнопки башен и "Продолжить подземелье"
}
window.addEventListener('DOMContentLoaded', loadProgress);

// --- ДОБАВИТЬ saveProgress() ПОСЛЕ ВСЕХ ИЗМЕНЕНИЙ ---
clickerBtn.addEventListener('click', () => {
    clicks += clickPower;
    clicksSpan.textContent = clicks;
    saveProgress();
});

// === КНОПКА СБРОСА ПРОГРЕССА ===
const clickerTab = document.getElementById('tab-clicker');
if (clickerTab && !document.getElementById('resetGameBtn')) {
    const resetWrap = document.createElement('div');
    resetWrap.style = 'display:flex; justify-content:center; margin-top:32px;';
    const resetBtn = document.createElement('button');
    resetBtn.id = 'resetGameBtn';
    resetBtn.textContent = 'Сбросить игру';
    resetBtn.style = 'background:#e74c3c; color:#fff; border:none; border-radius:6px; padding:12px 28px; font-size:1.1em; cursor:pointer;';
    resetBtn.onclick = function() {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
            localStorage.removeItem('rpgSave');
            location.reload();
        }
    };
    resetWrap.appendChild(resetBtn);
    clickerTab.appendChild(resetWrap);
}

// --- Открытие кейсов за алмазики и ключи ---
let inventory = [];
const caseBtns = document.querySelectorAll('.case-btn');
function addToInventory(itemName) {
    let found = inventory.find(obj => obj.name === itemName);
    if (found) {
        found.count++;
    } else {
        inventory.push({ name: itemName, count: 1 });
    }
    return true;
}
function updateInventory() {
    inventoryList.innerHTML = inventory.length ? inventory.map((obj, idx) => {
        // Найти объект предмета по имени
        let found = null;
        for (let c of caseTypes) {
            found = c.loot.find(l => l.name === obj.name);
            if (found) break;
        }
        let effectText = '';
        if (found) {
            if (found.effect.includes('Восстанавливает')) {
                let amount = found.rarity === 'Обычный' ? 20 : found.rarity === 'Редкий' ? 50 : 100;
                effectText = `Восстанавливает ${amount} здоровья`;
            } else if (found.effect.includes('Добавляет')) {
                let amount = 0;
                if (found.effect.includes('10 кликов')) amount = 10;
                if (found.effect.includes('50 кликов')) amount = 50;
                if (found.effect.includes('200 кликов')) amount = 200;
                effectText = `Добавляет ${amount} кликов`;
            } else if (found.effect.includes('опыт')) {
                let amount = found.rarity === 'Редкий' ? 15 : found.rarity === 'Эпический' ? 50 : 5;
                effectText = `Дает ${amount} опыта`;
            } else if (found.effect.includes('уникальная способность')) {
                effectText = 'Клики x2 на 60 секунд';
            }
        }
        let btn = `<button class='use-item-btn' data-idx='${idx}' style='margin-left:10px;background:#27ae60;color:#fff;border:none;border-radius:5px;padding:4px 12px;cursor:pointer;'>Использовать</button>`;
        return `<div>${obj.name && found ? obj.name : 'Неизвестно'}${found ? ` <span style='color:#888;font-size:0.95em;'>(${found.rarity})</span>` : ''}${obj.count > 1 ? ` <span style='color:#0ff;font-weight:bold;'>×${obj.count}</span>` : ''}${effectText ? ` <span style='color:#2980b9;font-size:0.97em;margin-left:8px;'>${effectText}</span>` : ''} ${btn}</div>`;
    }).join('') : '<em>Пусто</em>';
}

// --- Новое: обработчик использования предметов ---
inventoryList.addEventListener('click', function(e) {
    if (e.target.classList.contains('use-item-btn')) {
        const idx = +e.target.dataset.idx;
        const obj = inventory[idx];
        const itemName = obj.name;
        // Найти объект предмета
        let found = null;
        for (let c of caseTypes) {
            found = c.loot.find(l => l.name === itemName);
            if (found) break;
        }
        if (!found) return;
        // Эффекты
        if (found.effect.includes('Восстанавливает')) {
            let amount = found.rarity === 'Обычный' ? 20 : found.rarity === 'Редкий' ? 50 : 100;
            health = Math.min(maxHealth, health + amount);
            showToast(`Здоровье восстановлено на ${amount}!`, 'success');
        } else if (found.effect.includes('Добавляет')) {
            let amount = 0;
            if (found.effect.includes('10 кликов')) amount = 10;
            if (found.effect.includes('50 кликов')) amount = 50;
            if (found.effect.includes('200 кликов')) amount = 200;
            clicks += amount;
            clicksSpan.textContent = clicks;
            showToast(`Получено ${amount} кликов!`, 'success');
        } else if (found.effect.includes('опыт')) {
            let amount = found.rarity === 'Редкий' ? 15 : found.rarity === 'Эпический' ? 50 : 5;
            addExp(amount);
            showToast(`Получено ${amount} опыта!`, 'success');
        } else if (found.effect.includes('уникальная способность')) {
            // Временный бонус к кликам на 60 сек
            if (bonusTimeout) clearTimeout(bonusTimeout);
            clickBonus = 2;
            showToast('Уникальная способность! Клики x2 на 60 секунд!', 'info', 4000);
            bonusTimeout = setTimeout(() => {
                clickBonus = 1;
                showToast('Бонус кликов завершён.', 'info');
            }, 60000);
        }
        // Удалить предмет из инвентаря (или уменьшить count)
        if (obj.count > 1) {
            obj.count--;
        } else {
            inventory.splice(idx, 1);
        }
        updateInventory();
        updateProfile();
        saveProgress();
    }
});

// === ПОДЗЕМЕЛЬЯ И БОЕВАЯ СИСТЕМА ===
// Ранги монстров (от сильного к слабому)
const monsterRanks = ['S','A','B','C','D','E','F','G'];
// Примеры монстров для башен (можно расширять)
const towerNames = [
    'Кристаллическая цитадель',
    'Проклятый некрополь',
    'Лес иллюзий',
    'Вулкан забвения',
    'Обитель времени'
];
const towerMonsters = [
    // Кристаллическая цитадель
    [
        { name: 'Кристальный гоблин', baseHp: 30, baseAtk: 5, drops: ['Малый клик-бонус','Зелье лечения'] },
        { name: 'Осколочный слизень', baseHp: 25, baseAtk: 4, drops: ['Зелье лечения'] },
        { name: 'Сверкающая крыса', baseHp: 20, baseAtk: 3, drops: ['Книга опыта'] }
    ],
    // Проклятый некрополь
    [
        { name: 'Скелет-воин', baseHp: 50, baseAtk: 9, drops: ['Большое зелье лечения'] },
        { name: 'Орк-некромант', baseHp: 60, baseAtk: 10, drops: ['Большой клик-бонус','Большое зелье лечения'] },
        { name: 'Волк-призрак', baseHp: 40, baseAtk: 8, drops: ['Книга опыта'] }
    ],
    // Лес иллюзий
    [
        { name: 'Древесный демон', baseHp: 120, baseAtk: 18, drops: ['Эпический клик-бонус','Эпическое зелье лечения'] },
        { name: 'Гарпия-мираж', baseHp: 80, baseAtk: 14, drops: ['Книга опыта'] },
        { name: 'Тролль-иллюзионист', baseHp: 100, baseAtk: 16, drops: ['Эпическое зелье лечения'] }
    ],
    // Вулкан забвения
    [
        { name: 'Огненный дракон', baseHp: 200, baseAtk: 30, drops: ['Легендарный артефакт'] },
        { name: 'Феникс-пепельник', baseHp: 150, baseAtk: 22, drops: ['Эпический клик-бонус'] },
        { name: 'Лавовый голем', baseHp: 180, baseAtk: 25, drops: ['Эпическое зелье лечения'] }
    ],
    // Обитель времени
    [
        { name: 'Тёмный властелин времени', baseHp: 350, baseAtk: 50, drops: ['Легендарный артефакт','Камень времени'] },
        { name: 'Архидемон эпох', baseHp: 300, baseAtk: 45, drops: ['Камень времени'] },
        { name: 'Бессмертный рыцарь', baseHp: 320, baseAtk: 48, drops: ['Легендарный артефакт'] }
    ]
];
// Состояние боя
let dungeonState = null; // { tower: 0-4, floor: 1+, monster: {...}, monsterHp, isBoss, playerHp, relicDrop }
let dungeonActive = false;
function startDungeon(towerIdx) {
    if (dungeonActive) {
        showToast('Сначала завершите текущее подземелье!', 'error');
        return;
    }
    dungeonActive = true;
    dungeonState = {
        tower: towerIdx,
        floor: 1,
        playerHp: getPlayerMaxDungeonHp(),
        relicDrop: false
    };
    nextDungeonFloor();
    renderDungeonUI();
}
function nextDungeonFloor() {
    const towerIdx = dungeonState.tower;
    const floor = dungeonState.floor;
    const isBoss = floor % 10 === 0;
    // Выбор монстра
    let monsterPool = towerMonsters[towerIdx];
    let monster = { ...monsterPool[Math.floor(Math.random()*monsterPool.length)] };
    // Рандомный ранг
    let rankIdx = Math.floor(Math.random()*monsterRanks.length);
    let rank = monsterRanks[rankIdx];
    // Усиление характеристик по рангу и этажу
    let rankMult = 1 + (monsterRanks.length-rankIdx-1)*0.15 + (isBoss?1:0);
    monster.rank = rank;
    monster.hp = Math.round(monster.baseHp * rankMult * (isBoss?2:1) * (1+floor/20));
    monster.atk = Math.round(monster.baseAtk * rankMult * (isBoss?2:1) * (1+floor/20));
    monster.isBoss = isBoss;
    monster.name = (isBoss?'Босс ':'') + monster.name;
    dungeonState.monster = monster;
    dungeonState.monsterHp = monster.hp;
    dungeonState.isBoss = isBoss;
    // Шанс реликвии
    dungeonState.relicDrop = isBoss && Math.random()<0.25;
}
function renderDungeonUI() {
    let dungeonDiv = document.getElementById('dungeonUI');
    if (!dungeonDiv) {
        dungeonDiv = document.createElement('div');
        dungeonDiv.id = 'dungeonUI';
        dungeonDiv.style = 'position:fixed;left:0;top:0;width:100vw;height:100vh;background:linear-gradient(135deg,#181c24 60%,#232b39 100%);z-index:99999;display:flex;align-items:center;justify-content:center;';
        document.body.appendChild(dungeonDiv);
    }
    if (!dungeonState) { dungeonDiv.style.display='none'; return; }
    dungeonDiv.style.display = 'flex';
    const m = dungeonState.monster;
    dungeonDiv.innerHTML = `<div style='background:rgba(24,28,36,0.98);border-radius:18px;box-shadow:0 8px 32px #000a;padding:36px 44px;min-width:340px;max-width:96vw;text-align:center;position:relative;color:#fff;'>
        <h2 style='margin-bottom:10px;'>Этаж ${dungeonState.floor}${m.isBoss?' <span style="color:#e67e22;">(Босс)</span>':''}</h2>
        <div style='font-size:1.3em;font-weight:bold;margin-bottom:10px;'>${m.name} <span style="color:#888;">[${m.rank}]</span></div>
        <div style='margin-bottom:10px;'>Здоровье монстра: <b>${dungeonState.monsterHp}</b> / ${m.hp}</div>
        <div style='margin-bottom:10px;'>Атака монстра: <b>${m.atk}</b></div>
        <div style='margin-bottom:18px;'>Ваша атака: <b>${getPlayerDmg()}</b></div>
        <div style='margin-bottom:18px;'>Ваше здоровье: <b>${dungeonState.playerHp}</b> / ${maxHealth}</div>
        <button id='dungeonAttackBtn' style='background:#27ae60;color:#fff;padding:10px 28px;border:none;border-radius:7px;font-size:1.1em;margin:0 8px 12px 0;cursor:pointer;'>Атаковать</button>
        <button id='dungeonHealBtn' style='background:#2980b9;color:#fff;padding:10px 18px;border:none;border-radius:7px;font-size:1.1em;margin:0 8px 12px 0;cursor:pointer;'>Использовать предмет</button>
        <button id='dungeonExitBtn' style='background:#f1c40f;color:#222;padding:10px 18px;border:none;border-radius:7px;font-size:1.1em;margin:0 8px 12px 0;cursor:pointer;'>Сохранить и выйти</button>
        <button id='dungeonGiveUpBtn' style='background:#e74c3c;color:#fff;padding:10px 18px;border:none;border-radius:7px;font-size:1.1em;margin:0 8px 12px 0;cursor:pointer;'>Сдаться</button>
        <div id='dungeonMsg' style='margin-top:18px;min-height:32px;'></div>
    </div>`;
    document.getElementById('dungeonAttackBtn').onclick = dungeonAttack;
    document.getElementById('dungeonHealBtn').onclick = dungeonUseItem;
    document.getElementById('dungeonExitBtn').onclick = dungeonExit;
    document.getElementById('dungeonGiveUpBtn').onclick = dungeonGiveUp;
    // Блокировка кнопок на время анимации
    const attackBtn = document.getElementById('dungeonAttackBtn');
    const healBtn = document.getElementById('dungeonHealBtn');
    const exitBtn = document.getElementById('dungeonExitBtn');
    if (attackBtn) attackBtn.disabled = false;
    if (healBtn) healBtn.disabled = false;
    if (exitBtn) exitBtn.disabled = false;
}
function getPlayerDmg() {
    return Math.floor(8 + (level*1.5) + (abilities[0].value*2));
}
function dungeonAttack() {
    const attackBtn = document.getElementById('dungeonAttackBtn');
    if (attackBtn) attackBtn.disabled = true;
    let m = dungeonState.monster;
    let playerDmg = getPlayerDmg();
    dungeonState.monsterHp -= playerDmg;
    let msg = `Вы нанесли ${playerDmg} урона!`;
    document.getElementById('dungeonMsg').innerHTML = msg;
    // Анимация урона
    setTimeout(() => {
        if (dungeonState.monsterHp <= 0) {
            msg += '<br>Монстр повержен!';
            let drop = m.drops[Math.floor(Math.random()*m.drops.length)];
            addToInventory(drop);
            msg += `<br>Добыча: <b>${drop}</b> ${getItemEffectText(drop)}`;
            if (dungeonState.relicDrop) {
                addToInventory('Камень времени');
                msg += `<br><span style='color:#e67e22;font-weight:bold;'>Вам выпала реликвия: Камень времени! (x2 ко всему дропу и кликам)</span>`;
            }
            // --- Новый блок: выдача опыта за победу над монстром ---
            let rankExpMap = { S: 30, A: 22, B: 16, C: 12, D: 8, E: 5, F: 3, G: 2 };
            let baseExp = rankExpMap[m.rank] || 2;
            if (m.isBoss) baseExp = Math.round(baseExp * 2.5); // боссы дают больше
            addExp(baseExp);
            msg += `<br><span style='color:#3498db;'>Получено опыта: ${baseExp}</span>`;
            dungeonState.floor++;
            nextDungeonFloor();
            setTimeout(renderDungeonUI, 1200);
            document.getElementById('dungeonMsg').innerHTML = msg;
            updateInventory();
            saveProgress();
            return;
        }
        // Монстр атакует
        let monsterDmg = m.atk;
        dungeonState.playerHp -= monsterDmg;
        msg += `<br>Монстр атакует и наносит ${monsterDmg} урона!`;
        document.getElementById('dungeonMsg').innerHTML = msg;
        if (dungeonState.playerHp <= 0) {
            msg += '<br><span style="color:#e74c3c;font-weight:bold;">Вы проиграли! Вас выбросило из подземелья.</span>';
            health = 1;
            dungeonState = null;
            dungeonActive = false;
            setTimeout(renderDungeonUI, 1500);
            updateProfile();
            saveProgress();
            return;
        }
        setTimeout(() => {
            renderDungeonUI();
        }, 600);
        saveProgress();
    }, 600);
}
function getItemEffectText(itemName) {
    let found = null;
    for (let c of caseTypes) {
        found = c.loot.find(l => l.name === itemName);
        if (found) break;
    }
    if (!found) return '';
    if (found.effect.includes('Восстанавливает')) {
        let amount = found.rarity === 'Обычный' ? 20 : found.rarity === 'Редкий' ? 50 : 100;
        return `<span style='color:#27ae60;font-size:0.97em;'>(+${amount} HP)</span>`;
    } else if (found.effect.includes('Добавляет')) {
        let amount = 0;
        if (found.effect.includes('10 кликов')) amount = 10;
        if (found.effect.includes('50 кликов')) amount = 50;
        if (found.effect.includes('200 кликов')) amount = 200;
        return `<span style='color:#0ff;font-size:0.97em;'>(+${amount} кликов)</span>`;
    } else if (found.effect.includes('опыт')) {
        let amount = found.rarity === 'Редкий' ? 15 : found.rarity === 'Эпический' ? 50 : 5;
        return `<span style='color:#2980b9;font-size:0.97em;'>(+${amount} опыта)</span>`;
    } else if (found.effect.includes('уникальная способность')) {
        return `<span style='color:#e67e22;font-size:0.97em;'>Клики x2 на 60 сек</span>`;
    }
    return '';
}
function dungeonUseItem() {
    let healItems = inventory.filter(obj => {
        let found = null;
        for (let c of caseTypes) {
            found = c.loot.find(l => l.name === obj.name && l.effect.includes('Восстанавливает'));
            if (found) break;
        }
        return found;
    });
    if (!healItems.length) {
        showToast('Нет предметов для лечения!', 'error');
        return;
    }
    let list = healItems.map((obj, idx) => {
        let effect = getItemEffectText(obj.name);
        return `<button class='heal-btn' style='margin:4px 0;' data-idx='${idx}'>${obj.name} ×${obj.count} ${effect}</button>`;
    }).join('<br>');
    let modal = document.createElement('div');
    modal.className = 'dungeon-modal';
    modal.style = 'position:fixed;left:0;top:0;width:100vw;height:100vh;background:rgba(24,28,36,0.92);z-index:100000;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `<div style='background:#232b39;padding:32px 28px;border-radius:16px;min-width:220px;text-align:center;color:#fff;'><h3>Выберите предмет для лечения</h3>${list}<br><button class='cancel-btn'>Отмена</button></div>`;
    document.body.appendChild(modal);
    modal.querySelectorAll('.heal-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = +btn.dataset.idx;
            const obj = healItems[idx];
            let found = null;
            for (let c of caseTypes) {
                found = c.loot.find(l => l.name === obj.name && l.effect.includes('Восстанавливает'));
                if (found) break;
            }
            let amount = found.rarity === 'Обычный' ? 20 : found.rarity === 'Редкий' ? 50 : 100;
            dungeonState.playerHp = Math.min(maxHealth, dungeonState.playerHp + amount);
            showToast(`Здоровье восстановлено на ${amount}!`, 'success');
            if (obj.count > 1) obj.count--; else inventory.splice(inventory.indexOf(obj),1);
            updateInventory();
            saveProgress();
            modal.remove();
            renderDungeonUI();
        };
    });
    modal.querySelector('.cancel-btn').onclick = function() {
        modal.remove();
    };
}
function dungeonExit() {
    showToast('Прогресс подземелья сохранён. Вы можете вернуться позже.', 'info');
    let dungeonDiv = document.getElementById('dungeonUI');
    if (dungeonDiv) dungeonDiv.style.display = 'none';
    saveProgress();
    renderTowerButtons();
}
function dungeonGiveUp() {
    showToast('Вы сдались и покинули подземелье. Прогресс утерян.', 'error');
    if (dungeonState) health = dungeonState.playerHp;
    dungeonState = null;
    window.dungeonState = null;
    dungeonActive = false;
    renderDungeonUI();
    updateProfile();
    saveProgress();
    renderTowerButtons();
}

// === КНОПКИ БАШЕН и ПРОДОЛЖИТЬ ПОДЗЕМЕЛЬЕ ===
function renderTowerButtons() {
    const towersDiv2 = document.querySelector('.towers');
    if (!towersDiv2) return;
    let old = document.getElementById('dungeonStartBtns');
    if (old) old.remove();
    let wrap = document.createElement('div');
    wrap.id = 'dungeonStartBtns';
    wrap.style = 'margin:18px 0 0 0;display:flex;gap:12px;flex-wrap:wrap;';
    // Кнопка "Продолжить подземелье" если есть сохранённый прогресс
    if (window.dungeonState) {
        let contBtn = document.createElement('button');
        contBtn.textContent = 'Продолжить подземелье';
        contBtn.style = 'background:#27ae60;color:#fff;padding:10px 18px;border:none;border-radius:7px;font-size:1.1em;cursor:pointer;';
        contBtn.onclick = () => renderDungeonUI();
        wrap.appendChild(contBtn);
    }
    for (let i=0;i<5;i++) {
        let btn = document.createElement('button');
        btn.textContent = `Войти в "${towerNames[i]}"`;
        btn.style = 'background:#8e44ad;color:#fff;padding:10px 18px;border:none;border-radius:7px;font-size:1.1em;cursor:pointer;';
        btn.onclick = ()=>startDungeon(i);
        // Если уже есть dungeonState и это та же башня — дизейблим кнопку
        if (window.dungeonState && window.dungeonState.tower === i) {
            btn.disabled = true;
            btn.textContent += ' (идёт прохождение)';
        }
        wrap.appendChild(btn);
    }
    towersDiv2.appendChild(wrap);
}

// В конце файла (или после определения башен) сразу вызываем для первичной отрисовки:
renderTowerButtons();
