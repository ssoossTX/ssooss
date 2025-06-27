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
// --- Новое: здоровье и временный бонус ---
let health = 100;
let maxHealth = 100;
let clickBonus = 1; // множитель от уникальных предметов
let bonusTimeout = null;

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
document.querySelectorAll('.case-btn').forEach((btn, i) => {
    btn.textContent += ` — ${casePrices[i]} кликов`;
    btn.addEventListener('click', () => {
        if (clicks >= casePrices[i]) {
            clicks -= casePrices[i];
            clicksSpan.textContent = clicks;
            showToast('Покупка кейса скоро будет доступна!');
            saveProgress();
        } // else: больше не показываем уведомление о нехватке кликов
    });
});

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
        if (typeof window.prestigeMultiplier === 'undefined') window.prestigeMultiplier = 1;
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

// === ТРЕНИРОВОЧНЫЕ ЭКСПЕДИЦИИ и БАШНИ ===
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
    trainTowerBtn.textContent = 'Тренировочная башня (доступно с 0 ур.)';
    trainTowerBtn.addEventListener('click', () => {
        addExp(3);
        showToast('Вы получили 3 опыта за тренировочную башню!', 'info');
        saveProgress();
    });
    towersDiv.prepend(trainTowerBtn);
}

// === ЭКСПЕДИЦИИ ===
const expeditionBtns = document.querySelectorAll('.expedition-btn');
const expeditionLevels = [2, 5, 10, 20]; // 4 экспедиции
const expeditionRewards = [
    {exp: 5, diamonds: 2, keyChance: 0.05, keyType: 'common'},
    {exp: 12, diamonds: 6, keyChance: 0.03, keyType: 'rare'},
    {exp: 25, diamonds: 15, keyChance: 0.01, keyType: 'epic'},
    {exp: 50, diamonds: 30, keyChance: 0.02, keyType: 'epic'}
];
expeditionBtns.forEach((btn, i) => {
    if(btn.classList.contains('training')) return;
    btn.textContent += ` (c ${expeditionLevels[i]} ур.)`;
    btn.addEventListener('click', () => {
        if (level < expeditionLevels[i]) {
            showToast(`Экспедиция доступна с ${expeditionLevels[i]} уровня!`, 'error');
            return;
        }
        addExp(expeditionRewards[i].exp);
        diamonds += expeditionRewards[i].diamonds;
        let msg = `Экспедиция завершена! +${expeditionRewards[i].exp} опыта, +${expeditionRewards[i].diamonds} алмазиков.`;
        if (Math.random() < expeditionRewards[i].keyChance) {
            keys[expeditionRewards[i].keyType]++;
            msg += `\nВы получили ключ (${expeditionRewards[i].keyType})!`;
        }
        // --- ДРОП ПРЕДМЕТА ---
        // Для экспедиций: дроп из обычного кейса
        const lootPool = caseTypes[0].loot;
        let rand = Math.random() * 100, sum = 0, lootItem = lootPool[0];
        for (let item of lootPool) {
            sum += item.chance;
            if (rand < sum) { lootItem = item; break; }
        }
        inventory.push(lootItem.name);
        msg += `\nДобыча: ${lootItem.name} (${lootItem.rarity}) — ${lootItem.effect}`;
        updateProfile();
        updateInventory();
        saveProgress();
        showToast(msg, 'success', 3500);
    });
});

// === БАШНИ ===
const towerBtns = document.querySelectorAll('.tower-btn');
const towerLevels = [3, 7, 12, 18, 25, 35]; // 6 башен
const towerRewards = [
    {exp: 7, drop: 'Обычный сундук', relicChance: 0.05},
    {exp: 15, drop: 'Редкий сундук', relicChance: 0.08},
    {exp: 30, drop: 'Эпический сундук', relicChance: 0.12},
    {exp: 50, drop: 'Мифический сундук', relicChance: 0.18},
    {exp: 80, drop: 'Легендарный сундук', relicChance: 0.25},
    {exp: 120, drop: 'Башенный сундук', relicChance: 0.35}
];
towerBtns.forEach((btn, i) => {
    if(btn.classList.contains('training')) return;
    btn.textContent += ` (c ${towerLevels[i]} ур.)`;
    btn.addEventListener('click', () => {
        if (level < towerLevels[i]) {
            showToast(`Башня ${i+1} доступна с ${towerLevels[i]} уровня!`, 'error');
            return;
        }
        addExp(towerRewards[i].exp);
        let msg = `Вы прошли башню! +${towerRewards[i].exp} опыта, дроп: ${towerRewards[i].drop}`;
        if (Math.random() < towerRewards[i].relicChance) {
            msg += ' и получили реликвию!';
        }
        // --- ДРОП ПРЕДМЕТА ---
        // Для башен: дроп из редкого кейса (i<=2) или эпического (i>2)
        let lootPool = i <= 2 ? caseTypes[1].loot : caseTypes[2].loot;
        let rand = Math.random() * 100, sum = 0, lootItem = lootPool[0];
        for (let item of lootPool) {
            sum += item.chance;
            if (rand < sum) { lootItem = item; break; }
        }
        inventory.push(lootItem.name);
        msg += `\nДобыча: ${lootItem.name} (${lootItem.rarity}) — ${lootItem.effect}`;
        updateProfile();
        updateInventory();
        saveProgress();
        showToast(msg, 'success', 3500);
    });
});

// --- Открытие кейсов за алмазики и ключи ---
const inventory = [];
const caseTypes = [
    {
        name: 'Обычный кейс', price: 100, key: 'common', loot: [
            { name: 'Зелье', rarity: 'Обычный', chance: 60, effect: 'Восстанавливает немного здоровья' },
            { name: 'Монета', rarity: 'Обычный', chance: 30, effect: 'Добавляет 10 кликов' },
            { name: 'Камень', rarity: 'Редкий', chance: 10, effect: 'Можно обменять на опыт' }
        ]
    },
    {
        name: 'Редкий кейс', price: 500, key: 'rare', loot: [
            { name: 'Редкое зелье', rarity: 'Редкий', chance: 50, effect: 'Восстанавливает много здоровья' },
            { name: 'Редкая монета', rarity: 'Редкий', chance: 35, effect: 'Добавляет 50 кликов' },
            { name: 'Редкий камень', rarity: 'Эпический', chance: 15, effect: 'Можно обменять на много опыта' }
        ]
    },
    {
        name: 'Эпический кейс', price: 2000, key: 'epic', loot: [
            { name: 'Эпический артефакт', rarity: 'Легендарный', chance: 5, effect: 'Дает уникальную способность' },
            { name: 'Эпическая монета', rarity: 'Эпический', chance: 45, effect: 'Добавляет 200 кликов' },
            { name: 'Эпический камень', rarity: 'Эпический', chance: 50, effect: 'Можно обменять на огромное количество опыта' }
        ]
    }
];

// Добавляем кнопки инфо о дропе и обработчики
const caseBtns = document.querySelectorAll('.case-btn');
caseBtns.forEach((btn, i) => {
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
        } else {
            showToast('Недостаточно алмазиков или ключей!', 'error');
            return;
        }
        inventory.push(lootItem.name);
        updateProfile();
        updateInventory();
        saveProgress();
        showToast(`Вы получили: ${lootItem.name} (${lootItem.rarity}) — ${lootItem.effect}`, 'success');
    });
});
function updateInventory() {
    inventoryList.innerHTML = inventory.length ? inventory.map((item, idx) => {
        // Найти объект предмета по имени
        let found = null;
        for (let c of caseTypes) {
            found = c.loot.find(l => l.name === item);
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
        return `<div>${item}${found ? ` <span style='color:#888;font-size:0.95em;'>(${found.rarity})</span>` : ''}${effectText ? ` <span style='color:#2980b9;font-size:0.97em;margin-left:8px;'>${effectText}</span>` : ''} ${btn}</div>`;
    }).join('') : '<em>Пусто</em>';
}
updateInventory();
// --- Новое: обработчик использования предметов ---
inventoryList.addEventListener('click', function(e) {
    if (e.target.classList.contains('use-item-btn')) {
        const idx = +e.target.dataset.idx;
        const itemName = inventory[idx];
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
        // Удалить предмет из инвентаря
        inventory.splice(idx, 1);
        updateInventory();
        updateProfile();
        saveProgress();
    }
});

// --- Модификация клика с учётом бонуса ---
clickerBtn.addEventListener('click', () => {
    clicks += Math.floor(clickPower * (window.prestigeMultiplier || 1) * clickBonus);
    clicksSpan.textContent = clicks;
    saveProgress();
});

// === СОХРАНЕНИЕ/ЗАГРУЗКА ПРОГРЕССА ===
function saveProgress() {
    const data = {
        clicks, clickPower, upgradeCost, prestigeCost, level, exp, expToNext, points,
        abilities, diamonds, keys
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
    updateProfile();
    clicksSpan.textContent = clicks;
    upgradeBtn.textContent = `Улучшить (+${clickPower}/клик) — ${upgradeCost} кликов`;
    document.querySelector('.prestige-btn').textContent = `Престиж — ${prestigeCost} кликов`;
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
