
document.addEventListener('DOMContentLoaded', () => {
    // 1. gameConfig (все константы и настройки)
    const gameConfig = {
        SAVE_KEY: 'clickerData',
        MESSAGE_DURATION: 3000,
        AUTO_CLICK_INTERVAL: 1000,
        PRESTIGE_BASE_COST: 10000,
        EXPEDITION_TYPES: {
            'easy': 'Легкая',
            'medium': 'Средняя',
            'hard': 'Тяжелая',
        },
        CHEST_RARITY_CHANCE: {
            'common': 0.7,
            'rare': 0.25,
            'epic': 0.05,
        },
        SKIN_RARITY_CHANCE: {
            'common': 0.6,
            'uncommon': 0.3,
            'rare': 0.08,
            'epic': 0.02,
        },
        ARTIFACT_RARITY_CHANCE: {
            'common': 0.7,
            'uncommon': 0.2,
            'rare': 0.08,
            'epic': 0.02,
        },
        SKIN_EFFECTS: {
            'skin_common_1': { clickValueBonus: 1.05 },
            'skin_common_2': { autoClickerBonus: 1.05 },
            'skin_uncommon_1': { clickValueBonus: 1.1 },
            'skin_uncommon_2': { autoClickerBonus: 1.1 },
            'skin_rare_1': { clickValueBonus: 1.2 },
            'skin_rare_2': { autoClickerBonus: 1.2 },
            'skin_epic_1': { clickValueBonus: 1.5 },
            'skin_epic_2': { autoClickerBonus: 1.5 },
            'skin_common_3': { clickValueBonus: 1.03 },
            'skin_uncommon_3': { clickValueBonus: 1.08 },
            'skin_rare_3': { clickValueBonus: 1.15 },
            'skin_epic_3': { clickValueBonus: 1.35 },
        },
        ARTIFACT_EFFECTS: {
            'artifact_common_1': { prestigeMultiplierBonus: 1.1 },
            'artifact_uncommon_1': { prestigeMultiplierBonus: 1.2 },
            'artifact_rare_1': { prestigeMultiplierBonus: 1.3 },
            'artifact_epic_1': { prestigeMultiplierBonus: 1.5 },
            'artifact_common_2': { diamondBonus: 1.05 },
            'artifact_uncommon_2': { diamondBonus: 1.1 },
            'artifact_rare_2': { diamondBonus: 1.2 },
            'artifact_epic_2': { diamondBonus: 1.5 },
            'artifact_common_3': { clickValueBonus: 1.05 },
            'artifact_uncommon_3': { clickValueBonus: 1.1 },
            'artifact_rare_3': { clickValueBonus: 1.2 },
            'artifact_epic_3': { clickValueBonus: 1.5 },
            'artifact_common_4': { autoClickerBonus: 1.05 },
            'artifact_uncommon_4': { autoClickerBonus: 1.1 },
            'artifact_rare_4': { autoClickerBonus: 1.2 },
            'artifact_epic_4': { autoClickerBonus: 1.5 },
        },
        SKIN_NAMES: {
            'skin_common_1': 'Простой Наборчик',
            'skin_uncommon_1': 'Потрепанный Костюм',
            'skin_rare_1': 'Элитный Наряд',
            'skin_epic_1': 'Легендарное Облачение',
            'skin_common_2': 'Усиленные Перчатки',
            'skin_uncommon_2': 'Автоматизированные Руки',
            'skin_rare_2': 'Механические Конечности',
            'skin_epic_2': 'Драконьи Лапы',
            'skin_common_3': 'Древняя Маска',
            'skin_uncommon_3': 'Оркская Маска',
            'skin_rare_3': 'Скифский Шлем',
            'skin_epic_3': 'Гномский Шлем',
        },
        ARTIFACT_NAMES: {
            'artifact_common_1': 'Бронзовый Амулет',
            'artifact_uncommon_1': 'Серебряный Талисман',
            'artifact_rare_1': 'Золотой Кулон',
            'artifact_epic_1': 'Платиновый Оберег',
            'artifact_common_2': 'Алмазная Монета',
            'artifact_uncommon_2': 'Рубиновое Кольцо',
            'artifact_rare_2': 'Сапфировая Тиара',
            'artifact_epic_2': 'Изумрудный Скипетр',
            'artifact_common_3': 'Древний Камень',
            'artifact_uncommon_3': 'Волшебная Пыль',
            'artifact_rare_3': 'Кристальный Шар',
            'artifact_epic_3': 'Посох Мага',
            'artifact_common_4': 'Простой Моторчик',
            'artifact_uncommon_4': 'Шестерёнчатый Механизм',
            'artifact_rare_4': 'Паровой Двигатель',
            'artifact_epic_4': 'Реактивный Движок',
        },
        SKIN_RARITY: {
            'skin_common_1': 'common',
            'skin_common_2': 'common',
            'skin_uncommon_1': 'uncommon',
            'skin_uncommon_2': 'uncommon',
            'skin_rare_1': 'rare',
            'skin_rare_2': 'rare',
            'skin_epic_1': 'epic',
            'skin_epic_2': 'epic',
            'skin_common_3': 'common',
            'skin_uncommon_3': 'uncommon',
            'skin_rare_3': 'rare',
            'skin_epic_3': 'epic',
        },
        ARTIFACT_RARITY: {
            'artifact_common_1': 'common',
            'artifact_uncommon_1': 'uncommon',
            'artifact_rare_1': 'rare',
            'artifact_epic_1': 'epic',
            'artifact_common_2': 'common',
            'artifact_uncommon_2': 'uncommon',
            'artifact_rare_2': 'rare',
            'artifact_epic_2': 'epic',
            'artifact_common_3': 'common',
            'artifact_uncommon_3': 'uncommon',
            'artifact_rare_3': 'rare',
            'artifact_epic_3': 'epic',
            'artifact_common_4': 'common',
            'artifact_uncommon_4': 'uncommon',
            'artifact_rare_4': 'rare',
            'artifact_epic_4': 'epic',
        },
        EXPEDITION_COSTS: {
            'easy': 0,
            'medium': 10,
            'hard': 100,
        },
        EXPEDITION_REWARDS: {
            'easy': [1, 5],
            'medium': [10, 50],
            'hard': [100, 500],
        },
        EXPEDITION_DURATIONS: {
            'easy': 60000,
            'medium': 300000,
            'hard': 600000,
        },
    };

    // 2. Состояние игры
    let gameState = {
        clickCount: 0,
        clickValue: 1,
        autoClickerValue: 0,
        clickUpgradeCost: 10,
        autoUpgradeCost: 50,
        clickUpgradeLevel: 1,
        clickUpgradeLevelCost: 100,
        prestigeLevel: 0,
        prestigeMultiplier: 1,
        achievements: [],
        achievementCount: 0,
        autoClickerInterval: null,
        diamonds: 0,
        activeExpedition: null,
        expeditionStartTime: null,
        expeditionDuration: 0,
        expeditionReward: 0,
        keys: 0,
        chests: {
            'common': 0,
            'rare': 0,
            'epic': 0
        },
        skins: {},
        artifacts: {},
        prestigeCost: gameConfig.PRESTIGE_BASE_COST,
    };

    // 3. Объекты DOM элементов
    const elements = {
        clicker: {
            clickCountDisplay: document.getElementById('click-count'),
            clickButton: document.getElementById('click-button'),
            upgradeClickButton: document.querySelector('#upgrade-click .buy-upgrade'),
            upgradeAutoButton: document.querySelector('#upgrade-auto .buy-upgrade'),
            upgradeClickLevelButton: document.querySelector('#upgrade-click-level .buy-upgrade'),
            clickUpgradeCostDisplay: document.getElementById('click-upgrade-cost'),
            autoUpgradeCostDisplay: document.getElementById('auto-upgrade-cost'),
            clickUpgradeLevelDisplay: document.getElementById('click-upgrade-level-display'),
            clickUpgradeLevelCostDisplay: document.getElementById('click-upgrade-level-cost'),
        },
        shop: {
            diamondDisplay: document.getElementById('diamonds-menu'),
            prestigeCostDisplay: document.getElementById('prestige-cost'),
            prestigeButton: document.getElementById('prestige-button'),
            prestigeLevelDisplay: document.getElementById('prestige-level'),
            keyDisplay: document.getElementById('key-display'),
            chestDisplay: {
                common: document.getElementById('common-chest-count'),
                rare: document.getElementById('rare-chest-count'),
                epic: document.getElementById('epic-chest-count'),
            },
            buyKeyButton: document.getElementById('buy-key-button'),
            buyCommonChestButton: document.getElementById('buy-common-chest-button'),
            buyRareChestButton: document.getElementById('buy-rare-chest-button'),
            buyEpicChestButton: document.getElementById('buy-epic-chest-button'),
            openChestButton: document.getElementById('open-chest-button'),
            chestItemsDisplay: document.getElementById('chest-items'),
            closeChestButton: document.getElementById('close-chest-button'),
            chestContainer: document.getElementById('chest-container'),
        },
        map: {
            mapContainer: document.getElementById('map-container'),
            expeditionProgressDisplay: document.getElementById('expedition-progress'),
        },
        inventory: {
            inventoryContainer: document.getElementById('inventory-container'),
            skinsDisplay: document.getElementById('skins-display'),
            artifactsDisplay: document.getElementById('artifacts-display'),
        },
        global: {
            messageDisplay: document.getElementById('message'),
            globalMessageDisplay: document.getElementById('global-message'),
        },
        menu: {
            menuButton: document.querySelector('.menu-toggle'),
            menu: document.getElementById('menu-items'),
            menuItems: document.querySelectorAll('.menu-items li button'),
            clickerContent: document.getElementById('clicker-content'),
            gameContent: document.getElementById('game-content'),
            resetButton: document.getElementById('reset-button'),
        }
    };
    const tWebApp = window.Telegram && window.Telegram.WebApp;

    if (tWebApp) {
        tWebApp.ready();
    }

    // 4. Обновление дисплея
    const updateClickCountDisplay = () => {
        elements.clicker.clickCountDisplay.textContent = Math.round(gameState.clickCount);
    };

    const updateUpgradeCostDisplay = () => {
        elements.clicker.clickUpgradeCostDisplay.textContent = gameState.clickUpgradeCost;
        elements.clicker.autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost;
        elements.clicker.clickUpgradeLevelDisplay.textContent = gameState.clickUpgradeLevel;
        elements.clicker.clickUpgradeLevelCostDisplay.textContent = gameState.clickUpgradeLevelCost;
    };

    const updatePrestigeDisplay = () => {
        elements.shop.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
        elements.shop.prestigeCostDisplay.textContent = `Стоимость: ${gameState.prestigeCost}`;
    };

    const updateAchievementsDisplay = () => {
        elements.global.messageDisplay.textContent = `Достижения: ${gameState.achievementCount}`;
    };

    const updateDiamondDisplay = () => {
        elements.shop.diamondDisplay.textContent = `Алмазы: ${gameState.diamonds}`;
    };

    const updateKeyDisplay = () => {
        elements.shop.keyDisplay.textContent = `Ключи: ${gameState.keys}`;
    };

    const updateChestDisplay = () => {
        elements.shop.chestDisplay.common.textContent = `Обычные: ${gameState.chests.common}`;
        elements.shop.chestDisplay.rare.textContent = `Редкие: ${gameState.chests.rare}`;
        elements.shop.chestDisplay.epic.textContent = `Эпические: ${gameState.chests.epic}`;
    };

    const updateExpeditionProgressBar = () => {
        if (!gameState.activeExpedition) {
            elements.map.expeditionProgressDisplay.textContent = '';
            return;
        }
        const elapsed = Date.now() - gameState.expeditionStartTime;
        const remaining = Math.max(0, gameState.expeditionDuration - elapsed);
        const progress = Math.min(100, Math.round((elapsed / gameState.expeditionDuration) * 100));
        const remainingSeconds = Math.ceil(remaining / 1000);
        elements.map.expeditionProgressDisplay.textContent = `Экспедиция ${gameConfig.EXPEDITION_TYPES[gameState.activeExpedition]}: ${progress}%  (${remainingSeconds} сек. осталось)`;
        if (remaining <= 0) {
            finishExpedition();
        }
    };

    const updateDisplay = () => {
        updateClickCountDisplay();
        updateUpgradeCostDisplay();
        updatePrestigeDisplay();
        updateAchievementsDisplay();
        updateDiamondDisplay();
        updateKeyDisplay();
        updateChestDisplay();
        updateExpeditionProgressBar();
        updateExpeditionButtonInfo();
        updateInventoryDisplay();
    };

    // 5. Сообщения
    const displayMessage = (msg, color = 'white', fontSize = '1em') => {
        elements.global.globalMessageDisplay.textContent = msg;
        elements.global.globalMessageDisplay.style.color = color;
        elements.global.globalMessageDisplay.style.fontSize = fontSize;
        elements.global.globalMessageDisplay.style.display = 'block';
        setTimeout(() => {
            elements.global.globalMessageDisplay.style.display = 'none';
            elements.global.globalMessageDisplay.style.fontSize = '1em';
        }, gameConfig.MESSAGE_DURATION);
    };

    // 6. Функции для расчета бонусов
    const calculateClickBonus = (skins) => {
        let clickBonus = 1;
        for (const skin in skins) {
            if (gameConfig.SKIN_EFFECTS[skin] && gameConfig.SKIN_EFFECTS[skin].clickValueBonus) {
                clickBonus *= gameConfig.SKIN_EFFECTS[skin].clickValueBonus * skins[skin];
            }
        }
        return clickBonus;
    };

    const calculateAutoClickBonus = (skins) => {
        let autoClickBonus = 1;
        for (const skin in skins) {
            if (gameConfig.SKIN_EFFECTS[skin] && gameConfig.SKIN_EFFECTS[skin].autoClickerBonus) {
                autoClickBonus *= gameConfig.SKIN_EFFECTS[skin].autoClickerBonus * skins[skin];
            }
        }
        return autoClickBonus;
    };

    const calculatePrestigeBonus = (artifacts) => {
        let prestigeBonus = 1;
        for (const artifact in artifacts) {
            if (gameConfig.ARTIFACT_EFFECTS[artifact] && gameConfig.ARTIFACT_EFFECTS[artifact].prestigeMultiplierBonus) {
                prestigeBonus *= gameConfig.ARTIFACT_EFFECTS[artifact].prestigeMultiplierBonus * artifacts[artifact];
            }
        }
        return prestigeBonus;
    };

    const calculateDiamondBonus = (artifacts) => {
        let diamondBonus = 1;
        for (const artifact in artifacts) {
            if (gameConfig.ARTIFACT_EFFECTS[artifact] && gameConfig.ARTIFACT_EFFECTS[artifact].diamondBonus) {
                diamondBonus *= gameConfig.ARTIFACT_EFFECTS[artifact].diamondBonus * artifacts[artifact];
            }
        }
        return diamondBonus;
    };

    // 7. Игровые механики
    const applyClick = () => {
        gameState.clickCount += (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
        updateDisplay();
        checkAchievements();
        saveData();
    };

    const startAutoClicker = () => {
        if (gameState.autoClickerInterval) {
            clearInterval(gameState.autoClickerInterval);
        }
        if (gameState.autoClickerValue > 0) {
            gameState.autoClickerInterval = setInterval(() => {
                gameState.clickCount += (gameState.autoClickerValue * calculateAutoClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
                updateDisplay();
                checkAchievements();
                saveData();
            }, gameConfig.AUTO_CLICK_INTERVAL);
        }
    };

    const checkAchievements = () => {
        if (gameState.clickCount >= 100 && !gameState.achievements.includes('Первые 100 кликов')) {
            addAchievement('Первые 100 кликов');
        }
        if (gameState.clickCount >= 1000 && !gameState.achievements.includes('Первая 1000 кликов')) {
            addAchievement('Первая 1000 кликов');
        }
        if (gameState.autoClickerValue >= 1 && !gameState.achievements.includes('Первый автокликер')) {
            addAchievement('Первый автокликер');
        }
        if (gameState.prestigeLevel >= 1 && !gameState.achievements.includes('Первое перерождение')) {
            addAchievement('Первое перерождение');
        }
         if (gameState.clickUpgradeLevel >= 1 && !gameState.achievements.includes('Улучшение клика')) {
            addAchievement('Улучшение клика');
        }
    };

    const addAchievement = (achievement) => {
        gameState.achievements.push(achievement);
        gameState.achievementCount++;
        updateDisplay();
        saveData();
        displayMessage(`Достижение: "${achievement}" получено`, 'gold', '1.2em');
    };

    const resetGame = () => {
        gameState = {
            clickCount: 0,
            clickValue: 1,
            autoClickerValue: 0,
            clickUpgradeCost: 10,
            autoUpgradeCost: 50,
             clickUpgradeLevel: 1,
            clickUpgradeLevelCost: 100,
            prestigeLevel: 0,
            prestigeMultiplier: 1,
            achievements: [],
            achievementCount: 0,
            autoClickerInterval: null,
            diamonds: 0,
            activeExpedition: null,
            expeditionStartTime: null,
            expeditionDuration: 0,
            expeditionReward: 0,
            keys: 0,
            chests: {
                'common': 0,
                'rare': 0,
                'epic': 0
            },
            skins: {},
            artifacts: {},
            prestigeCost: gameConfig.PRESTIGE_BASE_COST,
        };
        clearAllTimeouts();
        updateDisplay();
        clearSaveData();
         displayMessage('Прогресс сброшен!', 'orange');
    };

    const clearAllTimeouts = () => {
        clearInterval(gameState.autoClickerInterval);
        gameState.autoClickerInterval = null;
          if (gameState.expeditionInterval) {
            clearInterval(gameState.expeditionInterval);
            gameState.expeditionInterval = null;
        }
        clearAutoSave();
    };

    const clearSaveData = () => {
       if (tWebApp) {
            tWebApp.CloudStorage.removeItem(gameConfig.SAVE_KEY);
       } else {
            localStorage.removeItem(gameConfig.SAVE_KEY);
       }
    };

    const saveData = () => {
        try {
            const {
                autoClickerInterval,
                 expeditionInterval,
                ...dataToSave
            } = gameState;
            const dataString = JSON.stringify(dataToSave);
             if (tWebApp) {
                tWebApp.CloudStorage.setItem(gameConfig.SAVE_KEY, dataString);
           } else {
                 localStorage.setItem(gameConfig.SAVE_KEY, dataString);
           }
        } catch (e) {
            console.error('Failed to save game', e);
        }
    };

    const loadGame = () => {
         const loadFromStorage = (storage) => {
            const savedDataString = storage.getItem(gameConfig.SAVE_KEY);
            if (!savedDataString) {
                 gameState.clickValue = 1;
                gameState.clickUpgradeLevel = 1;
                updateDisplay();
                switchTab('clicker');
                return;
            }
            try {
                const savedData = JSON.parse(savedDataString);
                gameState = { ...gameState, ...savedData };
                if (savedData.clickValue == undefined) {
                    gameState.clickValue = 1;
               }
                if (savedData.clickUpgradeLevel == undefined) {
                    gameState.clickUpgradeLevel = 1;
               }
                startAutoClicker();
               if (gameState.activeExpedition) {
                  startExpeditionTimer();
                }
                 updateDisplay();
                  switchTab('clicker');
            } catch (e) {
                 clearSaveData();
                console.error('Failed to load game', e);
                 displayMessage('Не удалось загрузить игру', 'red');
            }
        };
        if (tWebApp) {
           tWebApp.CloudStorage.getItem(gameConfig.SAVE_KEY, (err, value) => {
                 if (!value) {
                    gameState.clickValue = 1;
                   gameState.clickUpgradeLevel = 1;
                     updateDisplay();
                    switchTab('clicker');
                   return;
               }
               loadFromStorage({ getItem: () => value });
           });
       } else {
            loadFromStorage(localStorage);
        }
    };

    const switchTab = (tabId) => {
         elements.menu.clickerContent.style.display = tabId === 'clicker' ? 'block' : 'none';
        elements.menu.gameContent.style.display = tabId === 'shop' ? 'block' : 'none';
         elements.map.mapContainer.style.display = tabId === 'map' ? 'block' : 'none';
         elements.inventory.inventoryContainer.style.display = tabId === 'profile' ? 'block' : 'none';
         elements.menu.menuItems.forEach(item => {
            item.classList.remove('active');
           if (item.dataset.tab === tabId) {
                item.classList.add('active');
            }
        });
    };

    const startExpedition = (type) => {
        if (gameState.activeExpedition) {
             displayMessage('Уже есть активная экспедиция', 'red');
           return;
       }
         const cost = gameConfig.EXPEDITION_COSTS[type];
        if (cost > 0 && gameState.diamonds < cost) {
             const needed = cost - gameState.diamonds;
            displayMessage(`Не хватает ${needed} алмазов для этой экспедиции`, 'red');
           return;
       }
       gameState.diamonds -= cost;
       gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type];
        const [minReward, maxReward] = gameConfig.EXPEDITION_REWARDS[type];
       gameState.expeditionReward = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;
        startExpeditionTimer();
        updateDisplay();
        displayMessage(`Экспедиция "${gameConfig.EXPEDITION_TYPES[type]}" началась!`, 'green');
    };

    const updateExpeditionButtonInfo = () => {
         elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.EXPEDITION_COSTS[type];
             const [minReward, maxReward] = gameConfig.EXPEDITION_REWARDS[type];
            button.textContent = `${gameConfig.EXPEDITION_TYPES[type]} (Стоимость: ${cost}💎, Награда: ${minReward}-${maxReward}💎)`;
           if (cost > 0 && gameState.diamonds < cost) {
                button.classList.add('disabled');
                button.disabled = true
            } else {
                button.classList.remove('disabled');
               button.disabled = false
           }
        });
    };

    const startExpeditionTimer = () => {
        gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
   };

    const finishExpedition = () => {
       clearInterval(gameState.expeditionInterval);
         gameState.expeditionInterval = null;
        const reward = gameState.expeditionReward;
       gameState.diamonds += Math.round(reward * calculateDiamondBonus(gameState.artifacts));
         const expeditionType = gameState.activeExpedition;
         gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
         gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
          elements.map.expeditionProgressDisplay.textContent = '';
        displayMessage(`Экспедиция "${gameConfig.EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${Math.round(reward * calculateDiamondBonus(gameState.artifacts))} алмазов`, 'gold', '1.2em');
        updateDisplay();
       saveData();
    };

   const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
            updateDisplay();
             displayMessage('Куплен ключ!', 'green');
        } else {
             displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyChest = (type) => {
        let cost = 0;
       if (type === 'common') {
           cost = 5;
        } else if (type === 'rare') {
             cost = 10;
       } else if (type === 'epic') {
           cost = 20;
        }
         if (gameState.diamonds >= cost) {
            gameState.diamonds -= cost;
             gameState.chests[type]++;
            updateDisplay();
           displayMessage(`Куплен ${type} сундук!`, 'green');
         } else {
             displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const openChest = () => {
        elements.shop.chestItemsDisplay.innerHTML = '';
        let chestType = null;
        if (gameState.chests.epic > 0) {
            chestType = 'epic';
        } else if (gameState.chests.rare > 0) {
           chestType = 'rare';
       } else if (gameState.chests.common > 0) {
           chestType = 'common';
       }
        if (!chestType) {
           displayMessage('Нет сундуков для открытия', 'red');
            return;
        }

        if (gameState.keys > 0) {
            gameState.keys--;
           gameState.chests[chestType]--;
            const items = openChestLogic(chestType);
            items.forEach(item => {
               const itemElement = document.createElement('div');
                 itemElement.textContent = item;
               elements.shop.chestItemsDisplay.appendChild(itemElement);
            });
            elements.shop.chestContainer.style.display = 'block';
           updateDisplay();
             saveData();
       } else {
            displayMessage('Нет ключей для открытия', 'red');
        }
    };

    const closeChest = () => {
        elements.shop.chestContainer.style.display = 'none';
    };
    const openChestLogic = (chestType) => {
         const items = [];
        const roll = Math.random();
         if (roll <= 0.3) {
            items.push('Пусто');
            return items;
        }
       const roll_items = Math.random();
         switch (chestType) {
           case 'epic':
              if(roll_items <= 0.5){
                    applyRarity(gameConfig.SKIN_RARITY_CHANCE, gameConfig.SKIN_NAMES, 'skins', items, roll_items)
               } else {
                    applyRarity(gameConfig.ARTIFACT_RARITY_CHANCE, gameConfig.ARTIFACT_NAMES, 'artifacts', items, roll_items)
                }
                break;
            case 'rare':
                 if(roll_items <= 0.5){
                    applyRarity({ rare: gameConfig.SKIN_RARITY_CHANCE.rare, uncommon: gameConfig.SKIN_RARITY_CHANCE.uncommon, common: 1 }, gameConfig.SKIN_NAMES, 'skins', items, roll_items)
                 } else {
                      applyRarity({ rare: gameConfig.ARTIFACT_RARITY_CHANCE.rare, uncommon: gameConfig.ARTIFACT_RARITY_CHANCE.uncommon, common: 1 }, gameConfig.ARTIFACT_NAMES, 'artifacts', items, roll_items);
                 }
                 break;
             case 'common':
                if(roll_items <= 0.5){
                  applyRarity({ uncommon: gameConfig.SKIN_RARITY_CHANCE.uncommon, common: 1 }, gameConfig.SKIN_NAMES, 'skins', items, roll_items);
                 }else {
                     applyRarity({ uncommon: gameConfig.ARTIFACT_RARITY_CHANCE.uncommon, common: 1 }, gameConfig.ARTIFACT_NAMES, 'artifacts', items, roll_items);
                 }
                 break;
        }
        return items;
    };

     const applyRarity = (rarityChances, names, type, items, roll) => {
         let totalChance = 0;
            for (const rarity in rarityChances) {
                totalChance += rarityChances[rarity];
              if (roll <= totalChance) {
                    const filteredItems = Object.keys(names).filter(key => key.includes(rarity));
                  items.push(getRandomItem(filteredItems, names, type));
                     return;
                }
           }
         if(items.length == 0) {
                items.push("Пусто");
         }
     };

    function getRandomItem(itemsArray, names, type) {
         const item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
         if (type === 'skins') {
             gameState.skins[item] = (gameState.skins[item] || 0) + 1;
         } else if (type === 'artifacts') {
            gameState.artifacts[item] = (gameState.artifacts[item] || 0) + 1;
         }
         return names[item];
   }

    const updateInventoryDisplay = () => {
       elements.inventory.skinsDisplay.innerHTML = '';
        const skins = {};
        for (const skin in gameState.skins) {
            if (gameState.skins.hasOwnProperty(skin) && gameState.skins[skin] > 0) {
               skins[skin] = gameState.skins[skin];
            }
         }
       for (const skin in skins) {
          const skinElement = document.createElement('div');
           skinElement.textContent = `${gameConfig.SKIN_NAMES[skin] || skin} x${skins[skin]}`;
             skinElement.dataset.expanded = 'false';
           skinElement.addEventListener('click', () => {
                 const rarity = gameConfig.SKIN_RARITY[skin];
               let bonuses = '';
                if(gameConfig.SKIN_EFFECTS[skin]){
                    for (const effect in gameConfig.SKIN_EFFECTS[skin]) {
                      bonuses += `${effect}: ${gameConfig.SKIN_EFFECTS[skin][effect]} \n`;
                    }
                 }
               if(skinElement.dataset.expanded == 'false'){
                  skinElement.textContent = `${gameConfig.SKIN_NAMES[skin] || skin} x${skins[skin]} \n Редкость: ${rarity || 'Неизвестно'} \n Бонусы:\n${bonuses}`;
                 skinElement.dataset.expanded = 'true';
                   skinElement.style.width = 'auto';
                    skinElement.style.minWidth = '200px';
                   skinElement.style.height = 'auto';
                     skinElement.style.minHeight = '100px';

               } else {
                   skinElement.textContent = `${gameConfig.SKIN_NAMES[skin] || skin} x${skins[skin]}`;
                    skinElement.dataset.expanded = 'false';
                   skinElement.style.width = 'calc(33.333% - 10px)';
                    skinElement.style.minWidth = '90px';
                  skinElement.style.height = 'auto';
                   skinElement.style.minHeight = 'auto';
                }
            });
            elements.inventory.skinsDisplay.appendChild(skinElement);
        }

       elements.inventory.artifactsDisplay.innerHTML = '';
       const artifacts = {};
        for (const artifact in gameState.artifacts) {
          if (gameState.artifacts.hasOwnProperty(artifact) && gameState.artifacts[artifact] > 0) {
                artifacts[artifact] = gameState.artifacts[artifact];
           }
        }
        for (const artifact in artifacts) {
            const artifactElement = document.createElement('div');
           artifactElement.textContent = `${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${artifacts[artifact]}`;
            artifactElement.dataset.expanded = 'false';
           artifactElement.addEventListener('click', () => {
                const rarity = gameConfig.ARTIFACT_RARITY[artifact];
               let bonuses = '';
               if (gameConfig.ARTIFACT_EFFECTS[artifact]) {
                    for (const effect in gameConfig.ARTIFACT_EFFECTS[artifact]) {
                      bonuses += `${effect}: ${gameConfig.ARTIFACT_EFFECTS[artifact][effect]} \n`;
                  }
                }
             if (artifactElement.dataset.expanded == 'false') {
                  artifactElement.textContent = `${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${artifacts[artifact]} \nРедкость: ${rarity || 'Неизвестно'} \n Бонусы:\n ${bonuses}`;
                    artifactElement.dataset.expanded = 'true';
                   artifactElement.style.width = 'auto';
                    artifactElement.style.minWidth = '200px';
                      artifactElement.style.height = 'auto';
                     artifactElement.style.minHeight = '100px';

                }else {
                    artifactElement.textContent = `${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${artifacts[artifact]}`;
                      artifactElement.dataset.expanded = 'false';
                    artifactElement.style.width = 'calc(33.333% - 10px)';
                     artifactElement.style.minWidth = '90px';
                       artifactElement.style.height = 'auto';
                     artifactElement.style.minHeight = 'auto';
                }
           });
          elements.inventory.artifactsDisplay.appendChild(artifactElement);
       }
    };
    // 8. Запуск игры
     elements.clicker.clickButton.addEventListener('click', applyClick);
     elements.menu.menuButton.addEventListener('click', () => {
        elements.menu.menu.classList.toggle('active');
        elements.menu.menuButton.classList.toggle('active');
     });

    elements.menu.menuItems.forEach(item => {
        item.addEventListener('click', () => {
             const tabId = item.dataset.tab;
            switchTab(tabId);
            elements.menu.menu.classList.remove('active');
            elements.menu.menuButton.classList.remove('active');
       });
   });

    elements.clicker.upgradeClickButton.addEventListener('click', () => {
         if (gameState.clickCount >= gameState.clickUpgradeCost) {
             gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.5);
           gameState.clickValue = Math.round(gameState.clickValue * 1.2);
            updateDisplay();
            displayMessage('Улучшен клик', 'green');
             saveData();
         } else {
           displayMessage('Недостаточно кликов', 'red');
        }
    });

    elements.clicker.upgradeAutoButton.addEventListener('click', () => {
         if (gameState.clickCount >= gameState.autoUpgradeCost) {
           gameState.clickCount -= gameState.autoUpgradeCost;
             gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.5);
            gameState.autoClickerValue += Math.round(1 * gameState.prestigeMultiplier);
             startAutoClicker();
           updateDisplay();
            displayMessage('Улучшен автокликер', 'green');
            saveData();
       } else {
            displayMessage('Недостаточно кликов', 'red');
        }
    });
     elements.clicker.upgradeClickLevelButton.addEventListener('click', () => {
         if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
               gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevelCost =  Math.round(gameState.clickUpgradeLevelCost * 2);
              gameState.clickUpgradeLevel++;
             updateDisplay();
             displayMessage('Уровень клика повышен', 'green');
             saveData();
        } else {
           displayMessage('Недостаточно кликов', 'red');
      }
    });

    elements.shop.prestigeButton.addEventListener('click', () => {
       if (gameState.clickCount >= gameState.prestigeCost) {
           gameState.clickCount = 0;
            gameState.prestigeLevel++;
           gameState.prestigeCost = Math.round(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.2, gameState.prestigeLevel));
           gameState.prestigeMultiplier = Math.round(calculatePrestigeBonus(gameState.artifacts) * (1 + gameState.prestigeLevel * 0.5));
             gameState.clickUpgradeCost = 10;
             gameState.autoUpgradeCost = 50;
             gameState.autoClickerValue = 0;
           gameState.clickValue = 1;
            gameState.clickUpgradeLevel = 1;
             gameState.clickUpgradeLevelCost = 100;
           startAutoClicker();
           updateDisplay();
          displayMessage('Перерождение!', 'gold', '1.2em');
            saveData();
        } else {
             displayMessage('Недостаточно кликов', 'red');
        }
   });
    elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
       button.addEventListener('click', () => {
            startExpedition(button.dataset.type);
        });
    });
    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
     elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
   elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);
   elements.menu.resetButton.addEventListener('click', resetGame);
   loadGame();
   clearAutoSave();
   setAutoSave();
    function setAutoSave() {
      window.autoSaveInterval = setInterval(() => {
            saveData();
         }, 60000);
  }
     function clearAutoSave() {
        if(window.autoSaveInterval)
           clearInterval(window.autoSaveInterval)
    }
     switchTab('clicker');
});
