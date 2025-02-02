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
            'skin_common_1': 'Кепка',
            'skin_uncommon_1': 'Плащь',
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
            'easy': [1, 500],
            'medium': [10, 50],
            'hard': [100, 500],
        },
        EXPEDITION_DURATIONS: {
            'easy': 6000,
            'medium': 300000,
            'hard': 600000,
        },
         LEVEL_UP_BASE_EXP: 100,
         DUNGEON_CONFIG: {
            'tutorial': {
                name: 'Обучение',
                cost: 0,
                duration: 60000,
                rewards: {
                    diamonds: [10, 20],
                    keys: [1, 2],
                    experience: [100, 200],
                    skins: {
                        'common': [0, 1],
                    },
                },
                enemies: {
                    'weak_goblin': {
                       name: 'Слабый гоблин',
                      health: 100,
                   }
                }
            },
           'easy': {
                name: 'Легкое Подземелье',
                cost: 50,
                duration: 120000,
                rewards: {
                    diamonds: [50, 100],
                    keys: [1, 3],
                    experience: [250, 500],
                     artifacts: {
                        'common': [0, 1],
                    },
                },
                enemies: {
                    'goblin': {
                        name: 'Гоблин',
                        health: 500,
                    },
                     'slime': {
                        name: 'Слизень',
                         health: 350,
                   },
                }
            },
             'medium': {
                name: 'Среднее Подземелье',
                cost: 200,
                duration: 300000,
                rewards: {
                   diamonds: [150, 300],
                    keys: [2, 4],
                    experience: [750, 1250],
                    artifacts: {
                       'uncommon': [0, 1],
                        'common': [0, 1],
                     },
                },
                 enemies: {
                    'orc': {
                        name: 'Орк',
                         health: 1000,
                  },
                 'skeleton': {
                         name: 'Скелет',
                         health: 1500,
                  },
                 'spider': {
                         name: 'Паук',
                        health: 1300,
                 },
                 }
            },
           'hard': {
                name: 'Сложное Подземелье',
                cost: 500,
                duration: 600000,
                rewards: {
                    diamonds: [400, 700],
                     keys: [3, 5],
                     experience: [1500, 2500],
                      artifacts: {
                        'rare': [0, 1],
                        'uncommon': [0, 1],
                        'common': [0, 1],
                     },
                },
                  enemies: {
                    'troll': {
                       name: 'Тролль',
                        health: 2000,
                   },
                    'wolf': {
                         name: 'Волк',
                       health: 2500,
                    },
                    'golem': {
                         name: 'Голем',
                        health: 3000,
                    },
                }
            },
            'legendary': {
                 name: 'Легендарное Подземелье',
                cost: 1000,
                duration: 1200000,
                rewards: {
                    diamonds: [800, 1200],
                    keys: [4, 6],
                    experience: [3000, 5000],
                    artifacts: {
                        'epic': [0, 1],
                        'rare': [0, 1],
                        'uncommon': [0, 1],
                        'common': [0, 1],
                     },
                },
                   enemies: {
                    'dragon': {
                       name: 'Дракон',
                       health: 10000,
                    },
                     'lich': {
                         name: 'Лич',
                         health: 8000,
                     },
                   'demon': {
                         name: 'Демон',
                          health: 7000,
                   },
                    'titan': {
                         name: 'Титан',
                         health: 12000,
                   },
                }
           },
         },
           ABILITY_CONFIG: {
            'diamond_bonus': {
                name: 'Бонус к алмазам',
                description: 'Увеличивает количество алмазов за экспедиции',
                 costPerLevel: 1,
                baseValue: 1.0, // Начальное значение
                increment: 0.5, // Увеличение за уровень
                maxLevel: 50,
            },
            'exp_bonus': {
                name: 'Бонус к опыту',
                description: 'Увеличивает количество опыта за экспедиции',
                 costPerLevel: 1,
                baseValue: 1.0,
                 increment: 0.5,
                 maxLevel: 50,
            },
            'click_bonus': {
                name: 'Бонус к кликам',
                 description: 'Увеличивает силу кликов',
                  costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.5,
                maxLevel: 100,
            },
             'expedition_speed': {
                name: 'Скорость Экспедиций',
                description: 'Уменьшает время экспедиций',
                costPerLevel: 1,
                baseValue: 1.0,
                 increment: 0.5,
                maxLevel: 10,
            },
              'luck_bonus': {
                name: 'Удача',
                description: 'Увеличивает шанс выпадения редких предметов',
                costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.1,
                maxLevel: 5,
            },
               'dungeon_speed': {
                name: 'Скорость Подземелий',
                description: 'Уменьшает время прохождения подземелий',
                costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.5,
                maxLevel: 10,
            },
            'dungeon_luck': {
                name: 'Удача в Подземелье',
                description: 'Увеличивает шанс выпадения редких предметов в подземелье',
                costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.1,
                maxLevel: 5,
            },
               'dungeon_damage': {
                name: 'Урон в Подземельях',
                description: 'Увеличивает урон в подземельях',
                costPerLevel: 1,
                baseValue: 1,
                increment: 0.5,
                 maxLevel: 100,
             },
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
        level: 1,
        experience: 0,
        levelPoints: 0,
           abilities: {
             'diamond_bonus': 0,
             'exp_bonus': 0,
             'click_bonus': 0,
             'expedition_speed': 0,
              'luck_bonus': 0,
               'dungeon_speed': 0,
               'dungeon_luck': 0,
                'dungeon_damage': 0,
           },
           activeDungeon: null,
            dungeonStartTime: null,
             dungeonDuration: 0,
             dungeonRewards: null,
             dungeonEnemies: null,
             currentEnemyIndex: 0,
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
         dungeon: {
            dungeonContainer: document.getElementById('dungeon-container'),
            dungeonProgressDisplay: document.getElementById('dungeon-progress'),
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
    
     const updateDungeonProgressBar = () => {
        if (!gameState.activeDungeon) {
            elements.dungeon.dungeonProgressDisplay.textContent = '';
            return;
        }
        const elapsed = Date.now() - gameState.dungeonStartTime;
        const remaining = Math.max(0, gameState.dungeonDuration - elapsed);
        const progress = Math.min(100, Math.round((elapsed / gameState.dungeonDuration) * 100));
        const remainingSeconds = Math.ceil(remaining / 1000);
         elements.dungeon.dungeonProgressDisplay.textContent = `Подземелье ${gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].name}: ${progress}%  (${remainingSeconds} сек. осталось)`;

        if (remaining <= 0) {
            //finishDungeon();  <--- Removed, бой будет продолжаться в startDungeonFight
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
        updateDungeonProgressBar();
        updateDungeonButtonInfo();
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
    
     const calculateAbilityBonus = (ability, level) => {
      const config = gameConfig.ABILITY_CONFIG[ability];
        if (!config) return 1;
          return config.baseValue + (config.increment * level);
    };

    // 7. Игровые механики
    const applyClick = () => {
        gameState.clickCount += (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
        updateDisplay();
        checkAchievements();
    };

    const autoClick = () => {
        gameState.clickCount += (gameState.autoClickerValue * gameState.clickUpgradeLevel * calculateAutoClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
        updateDisplay();
    };

    const startAutoClicker = () => {
        if (gameState.autoClickerValue > 0 && !gameState.autoClickerInterval) {
            gameState.autoClickerInterval = setInterval(autoClick, gameConfig.AUTO_CLICK_INTERVAL);
        }
    };

    const checkAchievements = () => {
        const achievementConditions = {
            '100000 clicks': () => gameState.clickCount >= 100000,
            '1000000 clicks': () => gameState.clickCount >= 1000000,
            'first prestige': () => gameState.prestigeLevel >= 1,
            '5 autoClicker': () => gameState.autoClickerValue >= 5,
        };

        for (const [achievement, condition] of Object.entries(achievementConditions)) {
            if (condition() && !gameState.achievements.includes(achievement)) {
                addAchievement(achievement);
            }
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
            level: 1,
            experience: 0,
            levelPoints: 0,
              abilities: {
                'diamond_bonus': 0,
                'exp_bonus': 0,
                'click_bonus': 0,
                'expedition_speed': 0,
                 'luck_bonus': 0,
                 'dungeon_speed': 0,
                 'dungeon_luck': 0,
                  'dungeon_damage': 0,
            },
             activeDungeon: null,
            dungeonStartTime: null,
             dungeonDuration: 0,
             dungeonRewards: null,
              dungeonEnemies: null,
             currentEnemyIndex: 0,
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
        if (gameState.dungeonInterval) {
            clearInterval(gameState.dungeonInterval);
             gameState.dungeonInterval = null;
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
                dungeonInterval,
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
                 if (gameState.activeDungeon) {
                    startDungeonTimer();
                     startDungeonFight()
                }
                updateDisplay();
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
      elements.dungeon.dungeonContainer.style.display = tabId === 'dungeon' ? 'block' : 'none';
    elements.inventory.inventoryContainer.style.display = (tabId === 'profile') ? 'block' : 'none';

    // Добавляем логику для переключения табов внутри профиля
    if (tabId === 'profile') {
        const profileInfo = document.getElementById('profile-info');
        const profileInventory = document.getElementById('profile-inventory');
         const profileAbilities = document.getElementById('profile-abilities');
        const profileContainer = document.getElementById('profile-container'); // Получаем контейнер профиля

        // Показываем контейнер профиля и вкладку "Профиль" по умолчанию
        profileContainer.style.display = 'block';
        profileInfo.style.display = 'block';
        profileInventory.style.display = 'none';
          profileAbilities.style.display = 'none';

        const profileTabButtons = document.querySelectorAll('.profile-tab-button');
        profileTabButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const tab = event.target.dataset.tab;
                profileInfo.style.display = (tab === 'profile-info') ? 'block' : 'none';
                profileInventory.style.display = (tab === 'profile-inventory') ? 'block' : 'none';
                 profileAbilities.style.display = (tab === 'profile-abilities') ? 'block' : 'none';
                // Убираем класс "active" у всех кнопок
                profileTabButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем класс "active" только активной кнопке
                event.target.classList.add('active');
            });
        });
         updateAbilitiesDisplay();
        updateProfile();
        updateInventoryDisplay();
    } else {
        // Скрываем контейнер профиля, если открыта другая вкладка
        const profileContainer = document.getElementById('profile-container');
        if (profileContainer) {
            profileContainer.style.display = 'none';
        }
    }

    elements.menu.menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.tab === tabId) {
            item.classList.add('active');
        }
    });

    // Скрываем модальное окно профиля при переключении вкладок (уже не нужно, но оставим на всякий случай)
    const profileModal = document.getElementById('profile-modal'); // Получаем модальное окно
    if (profileModal) {
        profileModal.style.display = 'none';
    }
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
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] / calculateAbilityBonus('expedition_speed', gameState.abilities.expedition_speed);
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
         let diamondGain = Math.round(reward * calculateDiamondBonus(gameState.artifacts)); // Алмазы с бонусом
        diamondGain = Math.round(diamondGain * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus));
        gameState.diamonds += diamondGain;
        const expeditionType = gameState.activeExpedition;
        gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
    
        // Расчет опыта, зависимого от количества полученных алмазов
       let expGain = Math.round(diamondGain * 0.25 * (gameState.level + 1)); // Модификатор * уровень (можно изменить)
       expGain = Math.round(expGain * calculateAbilityBonus('exp_bonus', gameState.abilities.exp_bonus));
        gameState.experience += expGain;
        displayMessage(`Экспедиция "${gameConfig.EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${diamondGain} алмазов и ${expGain} опыта`, 'gold', '1.2em');
        checkLevelUp();
        updateDisplay();
        saveData();
    };

  const startDungeon = (type) => {
       if (gameState.activeDungeon) {
          displayMessage('Уже есть активное подземелье', 'red');
            return;
       }
        const dungeonConfig = gameConfig.DUNGEON_CONFIG[type];
        if (!dungeonConfig) {
           displayMessage(`Подземелье "${type}" не найдено`, 'red');
            return;
       }
       if(gameState.diamonds < dungeonConfig.cost){
          const needed = dungeonConfig.cost - gameState.diamonds;
            displayMessage(`Не хватает ${needed} алмазов для этого подземелья`, 'red');
            return;
       }

        gameState.diamonds -= dungeonConfig.cost;
        gameState.activeDungeon = type;
        gameState.dungeonStartTime = Date.now();
         gameState.dungeonDuration = dungeonConfig.duration / calculateAbilityBonus('dungeon_speed', gameState.abilities.dungeon_speed);
        gameState.dungeonRewards = dungeonConfig.rewards;
        gameState.dungeonEnemies = Object.values(dungeonConfig.enemies); // Получаем список врагов
        gameState.currentEnemyIndex = 0;
          startDungeonFight();
        startDungeonTimer();
        updateDisplay();
        displayMessage(`Подземелье "${dungeonConfig.name}" началось!`, 'green');
    };
    
   const startDungeonFight = () => {
    if (!gameState.activeDungeon || !gameState.dungeonEnemies || gameState.currentEnemyIndex >= gameState.dungeonEnemies.length) {
        return;
    }

      const currentEnemy = gameState.dungeonEnemies[gameState.currentEnemyIndex];
    //  console.log(currentEnemy)
      let dungeonDamage = calculateAbilityBonus('dungeon_damage', gameState.abilities.dungeon_damage) * gameState.clickUpgradeLevel;
       let clickDamage = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
         let totalDamage = dungeonDamage + clickDamage;
    //  console.log(dungeonDamage, clickDamage, totalDamage);
        currentEnemy.health -= totalDamage;
    
     const dungeonProgress = elements.dungeon.dungeonProgressDisplay;
        if (dungeonProgress) {
            const progress = Math.max(0, Math.min(100, (1 - currentEnemy.health / gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].enemies[Object.keys(gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].enemies)[gameState.currentEnemyIndex]].health ) * 100));
             dungeonProgress.textContent = `Подземелье ${gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].name}: Враг: ${currentEnemy.name} ${progress.toFixed(0)}% `;
        }
   // Проверка если враг побежден
    if(currentEnemy.health <= 0){
        gameState.currentEnemyIndex++;
        if(gameState.currentEnemyIndex >= gameState.dungeonEnemies.length){
              finishDungeon();
        } else {
           startDungeonFight()
        }
     } else {
         setTimeout(startDungeonFight, 100); // Бой продолжается
     }
};

   const updateDungeonButtonInfo = () => {
        elements.dungeon.dungeonContainer.querySelectorAll('.dungeon-button').forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.DUNGEON_CONFIG[type].cost;
            button.textContent = `${gameConfig.DUNGEON_CONFIG[type].name} (Стоимость: ${cost}💎)`;
            if (gameState.diamonds < cost) {
                button.classList.add('disabled');
                  button.disabled = true
            } else {
                button.classList.remove('disabled');
                 button.disabled = false
            }
        });
    };

    const startDungeonTimer = () => {
        gameState.dungeonInterval = setInterval(updateDungeonProgressBar, 1000);
    };

    const finishDungeon = () => {
    clearInterval(gameState.dungeonInterval);
     gameState.dungeonInterval = null;

    const dungeonType = gameState.activeDungeon;
    const rewards = gameState.dungeonRewards;
     gameState.activeDungeon = null;
     gameState.dungeonStartTime = null;
      gameState.dungeonDuration = 0;
    gameState.dungeonRewards = null;
     gameState.dungeonEnemies = null;
     gameState.currentEnemyIndex = 0;

   let gainedDiamonds = 0;
    let gainedKeys = 0;
    let gainedExp = 0;
    const gainedSkins = {};
    const gainedArtifacts = {};

   if (rewards) {
        if (rewards.diamonds) {
            const [minDiamonds, maxDiamonds] = rewards.diamonds;
            gainedDiamonds = Math.floor(Math.random() * (maxDiamonds - minDiamonds + 1)) + minDiamonds;
             gainedDiamonds = Math.round(gainedDiamonds * calculateDiamondBonus(gameState.artifacts));
             gainedDiamonds = Math.round(gainedDiamonds * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus));
             gameState.diamonds += gainedDiamonds;
        }
        if (rewards.keys) {
           const [minKeys, maxKeys] = rewards.keys;
            gainedKeys = Math.floor(Math.random() * (maxKeys - minKeys + 1)) + minKeys;
             gameState.keys += gainedKeys;
        }
           if (rewards.experience) {
                const [minExp, maxExp] = rewards.experience;
               gainedExp = Math.floor(Math.random() * (maxExp - minExp + 1)) + minExp;
                gainedExp = Math.round(gainedExp * calculateAbilityBonus('exp_bonus', gameState.abilities.exp_bonus));
             gameState.experience += gainedExp;
            }
        if (rewards.skins) {
            for (const skinRarity in rewards.skins) {
                const [minSkins, maxSkins] = rewards.skins[skinRarity];
                const numSkins = Math.floor(Math.random() * (maxSkins - minSkins + 1)) + minSkins;
                for (let i = 0; i < numSkins; i++) {
                    const skin = applyRarity(null, gameConfig.SKIN_NAMES, 'skins');
                   if(skin) {
                      gainedSkins[skin] = (gainedSkins[skin] || 0) + 1
                   }
                }
            }
        }
          if (rewards.artifacts) {
            for (const artifactRarity in rewards.artifacts) {
                const [minArtifacts, maxArtifacts] = rewards.artifacts[artifactRarity];
                const numArtifacts = Math.floor(Math.random() * (maxArtifacts - minArtifacts + 1)) + minArtifacts;
                for (let i = 0; i < numArtifacts; i++) {
                  const artifact = applyRarity(null, gameConfig.ARTIFACT_NAMES, 'artifacts');
                    if(artifact) {
                      gainedArtifacts[artifact] = (gainedArtifacts[artifact] || 0) + 1
                   }
                }
            }
        }
    }
     let message = `Подземелье "${gameConfig.DUNGEON_CONFIG[dungeonType].name}" завершено!`;
       if (gainedDiamonds > 0) {
          message += ` Получено ${gainedDiamonds} алмазов.`;
         }
          if (gainedKeys > 0) {
            message += ` Получено ${gainedKeys} ключей.`;
        }
        if (gainedExp > 0) {
             message += ` Получено ${gainedExp} опыта.`;
        }
         if (Object.keys(gainedSkins).length > 0) {
          message += ` Выпали предметы: ${Object.keys(gainedSkins).map(skin => `${skin} x${gainedSkins[skin]}`).join(', ')}.`;
       }
           if (Object.keys(gainedArtifacts).length > 0) {
            message += ` Выпали предметы: ${Object.keys(gainedArtifacts).map(artifact => `${artifact} x${gainedArtifacts[artifact]}`).join(', ')}.`;
       }
     displayMessage(message, 'gold', '1.2em');
    checkLevelUp();
    updateDisplay();
    saveData();
};
    const applyRarity = (min, names, type) => {
        const randomValue = Math.random();
        let rarity;

        if (type === 'skins') {
            if (randomValue < gameConfig.SKIN_RARITY_CHANCE.common) rarity = 'common';
            else if (randomValue < gameConfig.SKIN_RARITY_CHANCE.common + gameConfig.SKIN_RARITY_CHANCE.uncommon) rarity = 'uncommon';
            else if (randomValue < gameConfig.SKIN_RARITY_CHANCE.common + gameConfig.SKIN_RARITY_CHANCE.uncommon + gameConfig.SKIN_RARITY_CHANCE.rare) rarity = 'rare';
             else rarity = 'epic';
        } else {
            if (randomValue < gameConfig.ARTIFACT_RARITY_CHANCE.common) rarity = 'common';
            else if (randomValue < gameConfig.ARTIFACT_RARITY_CHANCE.common + gameConfig.ARTIFACT_RARITY_CHANCE.uncommon) rarity = 'uncommon';
           else if (randomValue < gameConfig.ARTIFACT_RARITY_CHANCE.common + gameConfig.ARTIFACT_RARITY_CHANCE.uncommon + gameConfig.ARTIFACT_RARITY_CHANCE.rare) rarity = 'rare';
            else  rarity = 'epic';
        }
         const filteredNames = Object.keys(names).filter(key => {
            const checkRarity = type === 'skins' ? gameConfig.SKIN_RARITY[key] : gameConfig.ARTIFACT_RARITY[key];
            return checkRarity === rarity;
        });
         if(filteredNames.length === 0) {
          return null;
        }
        const randomIndex = Math.floor(Math.random() * filteredNames.length);
        return filteredNames[randomIndex];
    };

    const buyUpgrade = (type) => {
        let cost;
        if (type === 'click') {
            cost = gameState.clickUpgradeCost;
        } else if (type === 'auto') {
            cost = gameState.autoUpgradeCost;
        } else if (type === 'clickLevel') {
             cost = gameState.clickUpgradeLevelCost;
        }

        if (gameState.clickCount >= cost) {
            if (type === 'click') {
                gameState.clickCount -= cost;
                gameState.clickValue *= 1.25;
                gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.5);
            } else if (type === 'auto') {
                gameState.clickCount -= cost;
                gameState.autoClickerValue += 1;
                gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.5);
                startAutoClicker();
            } else if (type === 'clickLevel') {
                gameState.clickCount -= cost;
                gameState.clickUpgradeLevel++;
                gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 1.5);
           }
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно кликов', 'red');
        }
    };

    const buyKey = () => {
        if (gameState.diamonds >= 5) {
            gameState.diamonds -= 5;
            gameState.keys += 1;
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно алмазов', 'red');
        }
    };

    const buyChest = (rarity) => {
        const cost = rarity === 'common' ? 1 : rarity === 'rare' ? 5 : 10;
        if (gameState.keys >= cost) {
            gameState.keys -= cost;
            gameState.chests[rarity] += 1;
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно ключей', 'red');
        }
    };

     const openChest = () => {
        elements.shop.chestContainer.style.display = 'block';
        elements.shop.chestItemsDisplay.innerHTML = '';
        const chestRarityToOpen = ['epic', 'rare', 'common'].find(rarity => gameState.chests[rarity] > 0);
          if(chestRarityToOpen) {
            gameState.chests[chestRarityToOpen]--;
             const items = openChestItem(chestRarityToOpen);
          let message = `Выпали предметы:`;
           if (Object.keys(items.skins).length > 0) {
          message += ` ${Object.keys(items.skins).map(skin => `${skin} x${items.skins[skin]}`).join(', ')}`;
       }
        if (Object.keys(items.artifacts).length > 0) {
          message += ` ${Object.keys(items.artifacts).map(artifact => `${artifact} x${items.artifacts[artifact]}`).join(', ')}`;
       }
         elements.shop.chestItemsDisplay.textContent = message;
           updateDisplay();
           saveData();
        } else {
             elements.shop.chestContainer.style.display = 'none';
            displayMessage('Нет сундуков для открытия', 'red');
        }

    };

   const openChestItem = (rarity) => {
        let skinCount = 0;
         let artifactCount = 0;
            const items = {
               skins: {},
               artifacts: {}
        }
        if (rarity === 'common') {
             skinCount = 1;
         } else if (rarity === 'rare') {
            skinCount = 1;
            artifactCount = 1;
        } else {
             skinCount = 2;
             artifactCount = 2;
        }
         for(let i = 0; i < skinCount; i++) {
             const skin = applyRarity(null, gameConfig.SKIN_NAMES, 'skins');
               if(skin) {
                   items.skins[skin] = (items.skins[skin] || 0) + 1
                   gameState.skins[skin] = (gameState.skins[skin] || 0) + 1;
                }
         }
          for(let i = 0; i < artifactCount; i++) {
              const artifact = applyRarity(null, gameConfig.ARTIFACT_NAMES, 'artifacts');
               if(artifact) {
                  items.artifacts[artifact] = (items.artifacts[artifact] || 0) + 1
                   gameState.artifacts[artifact] = (gameState.artifacts[artifact] || 0) + 1;
               }
        }
       return items;
    };


    const closeChest = () => {
        elements.shop.chestContainer.style.display = 'none';
    };

    const prestige = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts);
            gameState.clickUpgradeCost = 10;
           gameState.clickUpgradeLevel = 1;
             gameState.clickUpgradeLevelCost = 100;
            gameState.autoUpgradeCost = 50;
             gameState.autoClickerValue = 0;
              clearInterval(gameState.autoClickerInterval);
             gameState.autoClickerInterval = null;
            gameState.prestigeCost = Math.round(gameState.prestigeCost * 10);
              gameState.abilities = {
               'diamond_bonus': 0,
                'exp_bonus': 0,
                 'click_bonus': 0,
                 'expedition_speed': 0,
                  'luck_bonus': 0,
                  'dungeon_speed': 0,
                  'dungeon_luck': 0,
                   'dungeon_damage': 0,
            };
            updateDisplay();
            saveData();
             displayMessage('Престиж активирован! Игра началась заново.', 'gold');
        } else {
            displayMessage('Недостаточно кликов для престижа', 'red');
        }
    };

    const updateInventoryDisplay = () => {
       elements.inventory.skinsDisplay.innerHTML = '';
        for (const skin in gameState.skins) {
             const skinDiv = document.createElement('div');
            skinDiv.classList.add('inventory-item');
              const skinName = gameConfig.SKIN_NAMES[skin];
             skinDiv.textContent = `${skinName} x${gameState.skins[skin]}`;
            elements.inventory.skinsDisplay.appendChild(skinDiv);
       }
        elements.inventory.artifactsDisplay.innerHTML = '';
        for (const artifact in gameState.artifacts) {
           const artifactDiv = document.createElement('div');
            artifactDiv.classList.add('inventory-item');
             const artifactName = gameConfig.ARTIFACT_NAMES[artifact];
             artifactDiv.textContent = `${artifactName} x${gameState.artifacts[artifact]}`;
             elements.inventory.artifactsDisplay.appendChild(artifactDiv);
        }
    };

    const checkLevelUp = () => {
        const levelUpExp = gameConfig.LEVEL_UP_BASE_EXP * (gameState.level * gameState.level + gameState.level);
            if(gameState.experience >= levelUpExp) {
                 gameState.level++;
                gameState.experience -= levelUpExp;
                gameState.levelPoints++;
              displayMessage(`Вы достигли ${gameState.level} уровня`, 'green', '1.2em');
            checkLevelUp()
        }
    };

     const updateProfile = () => {
       const levelDisplay = document.getElementById('profile-level');
         const levelPointsDisplay = document.getElementById('profile-level-points');
          const expDisplay = document.getElementById('profile-exp');
      levelDisplay.textContent = `Уровень: ${gameState.level}`;
       levelPointsDisplay.textContent = `Очки умений: ${gameState.levelPoints}`;
        const levelUpExp = gameConfig.LEVEL_UP_BASE_EXP * (gameState.level * gameState.level + gameState.level);
     expDisplay.textContent = `Опыт: ${gameState.experience} / ${levelUpExp}`;
    };

     const updateAbilitiesDisplay = () => {
         const abilityList = document.getElementById('abilities-list');
          abilityList.innerHTML = '';
        for (const abilityKey in gameConfig.ABILITY_CONFIG) {
             const ability = gameConfig.ABILITY_CONFIG[abilityKey];
             const abilityDiv = document.createElement('div');
             abilityDiv.classList.add('ability-item');
             const level = gameState.abilities[abilityKey];
           abilityDiv.innerHTML = `
                 <p><strong>${ability.name} (Ур. ${level})</strong></p>
                 <p>${ability.description}</p>
                 <p>Стоимость: ${ability.costPerLevel} очков умений</p>
                 <button class="upgrade-ability-button" data-ability="${abilityKey}">Улучшить</button>
                 `;
             abilityList.appendChild(abilityDiv);
        }
    };

     const upgradeAbility = (abilityKey) => {
        if (gameState.levelPoints > 0) {
          const ability =  gameConfig.ABILITY_CONFIG[abilityKey];
             if (gameState.abilities[abilityKey] >= ability.maxLevel) {
                 displayMessage('Максимальный уровень', 'red');
                 return;
            }
           gameState.abilities[abilityKey]++;
           gameState.levelPoints--;
             updateAbilitiesDisplay();
            updateProfile();
           updateDisplay();
            saveData();
          displayMessage(`Умение "${ability.name}" улучшено`, 'green');
        } else {
            displayMessage('Недостаточно очков умений', 'red');
        }
   };

    // 8. Инициализация
    const init = () => {
        elements.clicker.clickButton.addEventListener('click', applyClick);
        elements.clicker.upgradeClickButton.addEventListener('click', () => buyUpgrade('click'));
        elements.clicker.upgradeAutoButton.addEventListener('click', () => buyUpgrade('auto'));
        elements.clicker.upgradeClickLevelButton.addEventListener('click', () => buyUpgrade('clickLevel'));
        elements.shop.prestigeButton.addEventListener('click', prestige);
        elements.shop.buyKeyButton.addEventListener('click', buyKey);
        elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
        elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
        elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
         elements.shop.openChestButton.addEventListener('click', openChest);
         elements.shop.closeChestButton.addEventListener('click', closeChest);
        elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
            button.addEventListener('click', () => startExpedition(button.dataset.type));
        });
          elements.dungeon.dungeonContainer.querySelectorAll('.dungeon-button').forEach(button => {
            button.addEventListener('click', () => startDungeon(button.dataset.type));
        });

       elements.inventory.inventoryContainer.addEventListener('click', function (event) {
           if (event.target && event.target.classList.contains('upgrade-ability-button')) {
              const abilityKey = event.target.dataset.ability;
               upgradeAbility(abilityKey);
          }
        });

      elements.menu.menuItems.forEach(item => {
            item.addEventListener('click', () => switchTab(item.dataset.tab));
        });
        elements.menu.menuButton.addEventListener('click', () => {
            elements.menu.menu.classList.toggle('open');
        });

         elements.menu.resetButton.addEventListener('click', resetGame);
        loadGame();
        startAutoSave();
        switchTab('clicker');
         elements.menu.menu.classList.remove('open'); // Скрываем меню после инициализации
    };

     const autoSaveInterval = 60000; // 60 seconds
    let autoSaveTimer = null;

    const startAutoSave = () => {
        autoSaveTimer = setInterval(() => {
            saveData();
            displayMessage('Игра автоматически сохранена', 'green');
        }, autoSaveInterval);
    };

    const clearAutoSave = () => {
        clearInterval(autoSaveTimer);
        autoSaveTimer = null;
    };

    init();
});