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
                battle: {
                    type: 'wave',
                    waves: [
                        {
                            monsters: [{
                                name: 'Слизень',
                                health: 50,
                                damage: 5,
                                exp: 50,
                                diamonds: 5,
                            },
                            {
                                name: 'Слизень',
                                health: 50,
                                damage: 5,
                                exp: 50,
                                diamonds: 5,
                             }],
                             waveReward: {
                                 experience: 100,
                                 diamonds: 10,
                            },
                        },
                        {
                            monsters: [{
                                 name: 'Слизень',
                                health: 70,
                                damage: 7,
                                 exp: 70,
                                diamonds: 7,
                            },
                             {
                                 name: 'Слизень',
                                 health: 70,
                                 damage: 7,
                                exp: 70,
                                diamonds: 7,
                             }],
                             waveReward: {
                                 experience: 150,
                                 diamonds: 15,
                            },
                        },
                         {
                            monsters: [{
                                name: 'Босс слизней',
                                health: 250,
                                damage: 15,
                                exp: 250,
                                diamonds: 25,
                            }],
                              waveReward: {
                                 experience: 200,
                                 diamonds: 20,
                            },
                        },
                    ],
                },
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
                battle: {
                    type: 'wave',
                     waves: [
                         {
                            monsters: [{
                                name: 'Гоблин',
                                health: 100,
                                damage: 10,
                                exp: 100,
                                diamonds: 10,
                                },
                                 {
                                name: 'Гоблин',
                                health: 100,
                                damage: 10,
                                exp: 100,
                                diamonds: 10,
                            }],
                             waveReward: {
                                 experience: 150,
                                 diamonds: 15,
                            },
                        },
                        {
                            monsters: [{
                                 name: 'Гоблин',
                                 health: 150,
                                 damage: 15,
                                 exp: 150,
                                diamonds: 15,
                            },
                             {
                                name: 'Гоблин',
                                 health: 150,
                                 damage: 15,
                                 exp: 150,
                                diamonds: 15,
                            }],
                             waveReward: {
                                 experience: 200,
                                 diamonds: 20,
                            },
                         },
                         {
                            monsters: [{
                                 name: 'Босс гоблинов',
                                 health: 500,
                                damage: 30,
                                exp: 500,
                                diamonds: 50,
                            }],
                               waveReward: {
                                 experience: 300,
                                 diamonds: 30,
                            },
                        },
                    ],
                },
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
                battle: {
                    type: 'wave',
                    waves: [
                        {
                             monsters: [{
                                name: 'Орк',
                                 health: 200,
                                 damage: 20,
                                  exp: 200,
                                diamonds: 20,
                            },
                             {
                                 name: 'Орк',
                                 health: 200,
                                damage: 20,
                                exp: 200,
                                diamonds: 20,
                            }],
                             waveReward: {
                                 experience: 250,
                                 diamonds: 25,
                            },
                         },
                       {
                            monsters: [{
                                 name: 'Орк',
                                 health: 300,
                                 damage: 25,
                                exp: 300,
                                diamonds: 25,
                             },
                             {
                                 name: 'Орк',
                                  health: 300,
                                 damage: 25,
                                exp: 300,
                                diamonds: 25,
                            }],
                             waveReward: {
                                 experience: 300,
                                 diamonds: 30,
                            },
                        },
                        {
                            monsters: [{
                                name: 'Босс орков',
                                health: 750,
                                damage: 40,
                                exp: 750,
                                diamonds: 75,
                            }],
                            waveReward: {
                                 experience: 400,
                                 diamonds: 40,
                            },
                        },
                    ],
                },
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
                  battle: {
                    type: 'wave',
                    waves: [
                        {
                             monsters: [{
                                  name: 'Рыцарь',
                                health: 400,
                                damage: 30,
                                exp: 400,
                                diamonds: 30,
                                },
                                {
                                    name: 'Рыцарь',
                                health: 400,
                                damage: 30,
                                exp: 400,
                                diamonds: 30,
                                }],
                            waveReward: {
                                 experience: 400,
                                 diamonds: 40,
                            },
                        },
                        {
                           monsters: [{
                                name: 'Рыцарь',
                                health: 500,
                                damage: 35,
                                exp: 500,
                                diamonds: 35,
                             },
                            {
                               name: 'Рыцарь',
                                health: 500,
                                damage: 35,
                                 exp: 500,
                                 diamonds: 35,
                            }],
                            waveReward: {
                                 experience: 500,
                                 diamonds: 50,
                            },
                        },
                       {
                            monsters: [{
                                name: 'Босс Рыцарей',
                                 health: 1000,
                                damage: 60,
                                 exp: 1000,
                                diamonds: 100,
                             }],
                            waveReward: {
                                 experience: 600,
                                 diamonds: 60,
                            },
                        },
                    ],
                },
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
                  battle: {
                    type: 'wave',
                     waves: [
                          {
                            monsters: [{
                                 name: 'Дракон',
                                health: 800,
                                 damage: 50,
                                exp: 800,
                                diamonds: 50,
                                },
                                 {
                                 name: 'Дракон',
                                health: 800,
                                 damage: 50,
                                exp: 800,
                                diamonds: 50,
                             }],
                             waveReward: {
                                 experience: 800,
                                 diamonds: 80,
                             },
                         },
                        {
                            monsters: [{
                                 name: 'Дракон',
                                 health: 1000,
                                damage: 70,
                                exp: 1000,
                                diamonds: 70,
                             },
                                {
                                    name: 'Дракон',
                                health: 1000,
                                damage: 70,
                                exp: 1000,
                                diamonds: 70,
                             }],
                            waveReward: {
                                 experience: 1000,
                                 diamonds: 100,
                            },
                         },
                          {
                            monsters: [{
                               name: 'Босс Драконов',
                                health: 2000,
                                damage: 100,
                                 exp: 2000,
                                diamonds: 200,
                             }],
                              waveReward: {
                                 experience: 1200,
                                 diamonds: 120,
                             },
                        },
                    ],
                },
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
           },
           activeDungeon: null,
           currentBattle: null, // Добавляем состояние для текущего боя
            dungeonStartTime: null,
             dungeonDuration: 0,
             dungeonRewards: null,
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
            dungeonBattleContainer: document.getElementById('dungeon-battle-container'),
            attackButton: document.getElementById('attack-button'), // Добавляем кнопку атаки
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
            finishDungeon();
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
            },
             activeDungeon: null,
            dungeonStartTime: null,
             dungeonDuration: 0,
             dungeonRewards: null,
            currentBattle: null,
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
      elements.dungeon.dungeonBattleContainer.style.display = 'none'; // Скрываем контейнер боя
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
        if (gameState.diamonds < dungeonConfig.cost) {
            const needed = dungeonConfig.cost - gameState.diamonds;
            displayMessage(`Не хватает ${needed} алмазов для этого подземелья`, 'red');
            return;
        }
        gameState.diamonds -= dungeonConfig.cost;
        gameState.activeDungeon = type;
        gameState.dungeonRewards = dungeonConfig.rewards;
        startBattle(type); // Начинаем бой вместо таймера
        updateDisplay();
        displayMessage(`Подземелье "${dungeonConfig.name}" началось!`, 'green');
    };

    const updateDungeonButtonInfo = () => {
    elements.dungeon.dungeonContainer.querySelectorAll('.dungeon-button').forEach(button => {
       const type = button.dataset.type;
       const dungeonConfig = gameConfig.DUNGEON_CONFIG[type];
        if (dungeonConfig) {
            button.textContent = `${dungeonConfig.name} (Стоимость: ${dungeonConfig.cost}💎)`;
            if(gameState.diamonds < dungeonConfig.cost){
                 button.classList.add('disabled');
                button.disabled = true
              } else {
                button.classList.remove('disabled');
                button.disabled = false
              }
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

const startBattle = (type) => {
    const dungeonConfig = gameConfig.DUNGEON_CONFIG[type];
    const battleConfig = dungeonConfig.battle;
    gameState.currentBattle = {
        type: battleConfig.type,
        waves: [...battleConfig.waves], // Копируем массив волн
        currentWaveIndex: 0,
        currentMonsterIndex: 0,
        playerHealth: 1000000000,
        waveReward: battleConfig.waves.waveReward,
    };
    elements.dungeon.dungeonContainer.style.display = 'none';
    const battleContainer = document.getElementById('dungeon-battle-container');
    battleContainer.style.display = 'block';
    updateBattleDisplay();
};

const updateBattleDisplay = () => {
    const battleLog = document.getElementById('battle-log');
    const monsterInfo = document.getElementById('monster-info');

    if (!gameState.currentBattle) {
      battleLog.textContent = 'Бой закончен.';
      monsterInfo.textContent = 'Бой закончен.';
        return;
    }
    if (gameState.currentBattle.waves.length === 0) {
         battleLog.textContent = 'Бой закончен.';
         monsterInfo.textContent = 'Бой закончен.';
        return;
    }
   const currentWave = gameState.currentBattle.waves[gameState.currentBattle.currentWaveIndex];
        if (!currentWave) {
        battleLog.textContent = 'Бой закончен.';
        monsterInfo.textContent = 'Бой закончен.';
            return;
    }
   if (currentWave.monsters.length === 0) {
      battleLog.textContent = 'Бой закончен.';
      monsterInfo.textContent = 'Бой закончен.';
      return;
    }
    const currentMonster = currentWave.monsters[gameState.currentBattle.currentMonsterIndex];
    if (!currentMonster) {
      battleLog.textContent = 'Бой закончен.';
      monsterInfo.textContent = 'Бой закончен.';
      return;
    }
        battleLog.textContent = `Волна ${gameState.currentBattle.currentWaveIndex + 1}. Бой против ${currentMonster.name}. Здоровье: ${currentMonster.health}`;
    monsterInfo.textContent = '';
};

const attack = () => {
   if (!gameState.currentBattle) return;
    const currentWave = gameState.currentBattle.waves[gameState.currentBattle.currentWaveIndex];
    if (!currentWave || currentWave.monsters.length === 0) return;
    const currentMonster = currentWave.monsters[gameState.currentBattle.currentMonsterIndex];
    if (!currentMonster) return;

    const clickValue = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
    const damage = clickValue; // Вычислить урон
    currentMonster.health -= damage;
    document.getElementById('battle-log').textContent = `Вы нанесли ${damage} урона!`;

    if (currentMonster.health <= 0) {
        document.getElementById('battle-log').textContent = `${currentMonster.name} повержен!`;
        gameState.experience += currentMonster.exp;
        gameState.diamonds += currentMonster.diamonds;
          gameState.currentBattle.currentMonsterIndex++;
        if (gameState.currentBattle.currentMonsterIndex >= currentWave.monsters.length) {
            gameState.currentBattle.currentMonsterIndex = 0;
            gameState.currentBattle.currentWaveIndex++;
            if (gameState.currentBattle.currentWaveIndex >= gameState.currentBattle.waves.length) {
                finishBattle();
                 return;
            }
             displayMessage(`Волна ${gameState.currentBattle.currentWaveIndex} начинается`, 'green');
       }
    }
    updateBattleDisplay();
};

 const finishBattle = () => {
    const battleContainer = document.getElementById('dungeon-battle-container');
    battleContainer.style.display = 'none';
    elements.dungeon.dungeonContainer.style.display = 'block';
    displayMessage('Битва окончена!');
    finishDungeon();
    checkLevelUp();
    updateDisplay();
    saveData();
};

    const checkLevelUp = () => {
        while (gameState.experience >= gameConfig.LEVEL_UP_BASE_EXP * gameState.level) {
            gameState.experience -= gameConfig.LEVEL_UP_BASE_EXP * gameState.level;
            gameState.level++;
             gameState.levelPoints += 2;
            displayMessage(`Уровень повышен до ${gameState.level}!`, 'green', '1.2em');
            updateProfile();
             saveData();
        }
    };

    const prestige = () => {
       if (gameState.clickCount < gameState.prestigeCost) {
           displayMessage('Недостаточно кликов для престижа', 'red');
           return;
       }

         if (gameState.activeExpedition) {
              displayMessage('Невозможно сделать престиж во время экспедиции', 'red');
            return;
          }
         if (gameState.activeDungeon) {
            displayMessage('Невозможно сделать престиж во время подземелья', 'red');
           return;
        }
        gameState.prestigeLevel++;
          gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts); // Престиж множитель
        gameState.clickCount = 0;
         gameState.autoClickerValue = 0;
         gameState.autoClickerInterval = null;
         gameState.clickUpgradeCost = 10;
        gameState.autoUpgradeCost = 50;
        gameState.clickUpgradeLevel = 1;
         gameState.clickUpgradeLevelCost = 100;
         gameState.prestigeCost *= 2;
         displayMessage('Престиж выполнен!', 'gold', '1.2em');
         updateDisplay();
         clearAllTimeouts();
        saveData();
      };


       const updateProfile = () => {
         document.getElementById('profile-level').textContent = `Уровень: ${gameState.level}`;
         document.getElementById('profile-points').textContent = `Очки Уровня: ${gameState.levelPoints}`;
       };

       const buyAbility = (ability) => {
           const config = gameConfig.ABILITY_CONFIG[ability];
           if (!config) return;
             if (gameState.levelPoints <= 0) {
                 displayMessage('Недостаточно очков уровня', 'red');
                 return;
            }

           if (gameState.abilities[ability] >= config.maxLevel) {
              displayMessage(`Максимальный уровень для ${config.name}`, 'red');
               return;
             }

         gameState.levelPoints -= config.costPerLevel;
          gameState.abilities[ability]++;
        updateProfile();
        updateAbilitiesDisplay();
         updateDisplay();
        saveData();
        displayMessage(`Улучшен навык "${config.name}"!`, 'green');
        };

      const updateAbilitiesDisplay = () => {
        const abilityContainer = document.getElementById('abilities-display');
        if (!abilityContainer) return;
        abilityContainer.innerHTML = '';

        for (const abilityKey in gameConfig.ABILITY_CONFIG) {
          const config = gameConfig.ABILITY_CONFIG[abilityKey];
          const currentLevel = gameState.abilities[abilityKey] || 0;
            const button = document.createElement('button');
              button.className = 'buy-ability-button';
              button.textContent = `${config.name} (Ур. ${currentLevel}/${config.maxLevel})`;
              button.title = config.description;
            if (gameState.levelPoints <= 0 || currentLevel >= config.maxLevel ) {
                button.classList.add('disabled');
                button.disabled = true
            } else {
                 button.classList.remove('disabled');
               button.disabled = false
            }
              button.addEventListener('click', () => buyAbility(abilityKey));
              abilityContainer.appendChild(button);
      }
};


    const applyRarity = (rarity, names, type) => {
        const itemsRarity = type === 'skins' ? gameConfig.SKIN_RARITY_CHANCE : gameConfig.ARTIFACT_RARITY_CHANCE;
        const itemsRarityNames = type === 'skins' ? gameConfig.SKIN_RARITY : gameConfig.ARTIFACT_RARITY;
        const randomValue = Math.random();
        let cumulativeProbability = 0;
        let selectedRarity = rarity;
        if(!selectedRarity){
            for (const itemRarity in itemsRarity) {
                 cumulativeProbability += itemsRarity[itemRarity];
                 if (randomValue <= cumulativeProbability) {
                      selectedRarity = itemRarity
                    break;
                   }
               }
          }
          if (selectedRarity) {
              const itemsWithRarity = Object.keys(names).filter(item => itemsRarityNames[item] == selectedRarity);
            if(itemsWithRarity.length > 0) {
              const randomItem = itemsWithRarity[Math.floor(Math.random() * itemsWithRarity.length)];
             if (type === 'skins') {
                    gameState.skins[randomItem] = (gameState.skins[randomItem] || 0) + 1;
              }
              if (type === 'artifacts') {
                  gameState.artifacts[randomItem] = (gameState.artifacts[randomItem] || 0) + 1;
                }
                return randomItem;
           }
      }
       return null;
    };


      const updateInventoryDisplay = () => {
        const skinsDisplay = document.getElementById('skins-display');
        const artifactsDisplay = document.getElementById('artifacts-display');
        if (!skinsDisplay || !artifactsDisplay) {
            return;
        }
        skinsDisplay.innerHTML = '';
        artifactsDisplay.innerHTML = '';

        // Для скинов
        for (const skin in gameState.skins) {
            const skinCount = gameState.skins[skin];
           if (skinCount > 0) {
             const skinName = gameConfig.SKIN_NAMES[skin]
             const skinRarity = gameConfig.SKIN_RARITY[skin]
            const skinElement = document.createElement('div');
            skinElement.classList.add('inventory-item');
            skinElement.classList.add(skinRarity);
            skinElement.textContent = `${skinName} x${skinCount}`;
           skinsDisplay.appendChild(skinElement);
           }
        }
       // Для артефактов
        for (const artifact in gameState.artifacts) {
              const artifactCount = gameState.artifacts[artifact];
            if (artifactCount > 0) {
                const artifactName = gameConfig.ARTIFACT_NAMES[artifact]
                const artifactRarity = gameConfig.ARTIFACT_RARITY[artifact]
                 const artifactElement = document.createElement('div');
                artifactElement.classList.add('inventory-item');
                 artifactElement.classList.add(artifactRarity);
                artifactElement.textContent = `${artifactName} x${artifactCount}`;
                artifactsDisplay.appendChild(artifactElement);
            }
      }
    };

     const buyKey = () => {
        if (gameState.diamonds < 10) {
            displayMessage('Недостаточно алмазов', 'red');
            return;
        }
        gameState.diamonds -= 10;
        gameState.keys++;
        updateDisplay();
        saveData();
        displayMessage('Ключ куплен!', 'green');
    };

    const buyChest = (rarity) => {
       const chestCost = rarity === 'common' ? 1 : rarity === 'rare' ? 3 : 5;
         if (gameState.keys < chestCost) {
            displayMessage('Недостаточно ключей', 'red');
            return;
       }
        gameState.keys -= chestCost;
         gameState.chests[rarity]++;
        updateDisplay();
         saveData();
        displayMessage(`${gameConfig.CHEST_RARITY_CHANCE[rarity] * 100}% шанс на ${rarity} предмет`, 'green');
    };

   const openChest = () => {
         if (gameState.chests.common <= 0 && gameState.chests.rare <= 0 && gameState.chests.epic <= 0) {
                displayMessage('Нет сундуков', 'red');
                return;
             }
       elements.shop.chestContainer.style.display = 'block';
         elements.shop.chestItemsDisplay.innerHTML = '';
         const chestItems = [];
            if(gameState.chests.common > 0) {
                const item = applyRarity(null, gameConfig.SKIN_NAMES, 'skins');
                if (item) {
                  chestItems.push(`${item}`);
                   gameState.chests.common--;
              }
           }
        if(gameState.chests.rare > 0) {
              const item = applyRarity('uncommon', gameConfig.SKIN_NAMES, 'skins');
              if (item) {
                chestItems.push(`${item}`);
                gameState.chests.rare--;
           }
        }
        if(gameState.chests.epic > 0) {
            const item = applyRarity('epic', gameConfig.SKIN_NAMES, 'skins');
            if (item) {
                  chestItems.push(`${item}`);
                  gameState.chests.epic--;
            }
       }
         if(chestItems.length > 0){
            elements.shop.chestItemsDisplay.innerHTML = `Выпали предметы: ${chestItems.join(', ')}`
         } else {
                elements.shop.chestItemsDisplay.textContent = 'Пусто'
         }
        updateDisplay();
        saveData();
    };

    const closeChest = () => {
       elements.shop.chestContainer.style.display = 'none';
    };

    const clearAutoSave = () => {
        clearInterval(autoSaveInterval);
    };


    // 8. События
    elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
           gameState.clickCount -= gameState.clickUpgradeCost;
           gameState.clickValue++;
           gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.5);
          updateDisplay();
            saveData();
           displayMessage('Улучшение клика куплено!', 'green');
      } else {
            displayMessage('Недостаточно кликов', 'red');
        }
    });
     elements.clicker.upgradeAutoButton.addEventListener('click', () => {
         if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
           gameState.autoClickerValue++;
           gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.5);
           startAutoClicker();
           updateDisplay();
             saveData();
            displayMessage('Автокликер куплен!', 'green');
        } else {
            displayMessage('Недостаточно кликов', 'red');
        }
    });
     elements.clicker.upgradeClickLevelButton.addEventListener('click', () => {
       if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
             gameState.clickCount -= gameState.clickUpgradeLevelCost;
             gameState.clickUpgradeLevel++;
             gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 2);
              updateDisplay();
               saveData();
            displayMessage('Улучшение уровня клика куплено!', 'green');
         } else {
            displayMessage('Недостаточно кликов', 'red');
        }
   });

     elements.shop.prestigeButton.addEventListener('click', prestige);
     elements.shop.buyKeyButton.addEventListener('click', buyKey);
     elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
     elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
     elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
     elements.shop.closeChestButton.addEventListener('click', closeChest);
     elements.dungeon.attackButton.addEventListener('click', attack); // Кнопка атаки

elements.menu.menuButton.addEventListener('click', () => {
    elements.menu.menuButton.classList.toggle('open'); // переключаем класс open для самой кнопки
    elements.menu.menuItems.classList.toggle('active');
});
    elements.menu.menuItems.forEach(item => {
            item.addEventListener('click', () => {
              switchTab(item.dataset.tab);
                 elements.menu.menu.classList.remove('open');
            });
        });
    elements.menu.resetButton.addEventListener('click', () => {
       if (confirm('Вы уверены, что хотите сбросить прогресс?')) {
            resetGame();
        }
    });
    elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
        button.addEventListener('click', () => {
            startExpedition(button.dataset.type);
        });
    });
      elements.dungeon.dungeonContainer.querySelectorAll('.dungeon-button').forEach(button => {
        button.addEventListener('click', () => {
            startDungeon(button.dataset.type);
        });
    });


    // 9. Инициализация
    let autoSaveInterval = setInterval(saveData, 5000);
     loadGame();
     switchTab('clicker');
});