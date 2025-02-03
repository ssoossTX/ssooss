1document.addEventListener('DOMContentLoaded', () => {
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
                 waves: [
                    {
                        mobCount: 5,
                        mobHealth: 100,
                        mobDamage: 5,
                        rewardMultiplier: 1,
                    },
                    {
                       mobCount: 10,
                        mobHealth: 120,
                        mobDamage: 8,
                         rewardMultiplier: 1.5,
                   },
                ],
                boss: {
                   health: 500,
                   damage: 20,
                    rewardMultiplier: 2,
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
                 waves: [
                    {
                        mobCount: 10,
                        mobHealth: 200,
                        mobDamage: 10,
                         rewardMultiplier: 1,
                    },
                    {
                       mobCount: 15,
                        mobHealth: 250,
                        mobDamage: 12,
                         rewardMultiplier: 1.5,
                   },
                    {
                       mobCount: 20,
                        mobHealth: 300,
                       mobDamage: 15,
                         rewardMultiplier: 2,
                   },
                ],
                 boss: {
                   health: 1000,
                   damage: 30,
                    rewardMultiplier: 3,
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
               waves: [
                    {
                       mobCount: 20,
                        mobHealth: 400,
                        mobDamage: 15,
                         rewardMultiplier: 1,
                    },
                    {
                       mobCount: 25,
                        mobHealth: 450,
                        mobDamage: 18,
                         rewardMultiplier: 1.5,
                   },
                    {
                       mobCount: 30,
                        mobHealth: 500,
                       mobDamage: 20,
                         rewardMultiplier: 2,
                   },
                    {
                       mobCount: 35,
                        mobHealth: 600,
                       mobDamage: 25,
                         rewardMultiplier: 2.5,
                   },
                ],
                boss: {
                   health: 2000,
                   damage: 50,
                    rewardMultiplier: 4,
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
                waves: [
                    {
                       mobCount: 30,
                        mobHealth: 600,
                        mobDamage: 20,
                         rewardMultiplier: 1,
                    },
                    {
                       mobCount: 40,
                        mobHealth: 700,
                        mobDamage: 25,
                         rewardMultiplier: 1.5,
                   },
                    {
                       mobCount: 50,
                        mobHealth: 800,
                        mobDamage: 30,
                         rewardMultiplier: 2,
                   },
                    {
                       mobCount: 60,
                        mobHealth: 1000,
                       mobDamage: 40,
                        rewardMultiplier: 2.5,
                   },
                    {
                       mobCount: 70,
                        mobHealth: 1200,
                       mobDamage: 45,
                         rewardMultiplier: 3,
                   },
                ],
               boss: {
                   health: 3500,
                   damage: 80,
                    rewardMultiplier: 6,
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
                 waves: [
                    {
                        mobCount: 50,
                       mobHealth: 1000,
                       mobDamage: 40,
                         rewardMultiplier: 1,
                    },
                    {
                       mobCount: 60,
                       mobHealth: 1200,
                        mobDamage: 50,
                         rewardMultiplier: 1.5,
                   },
                    {
                       mobCount: 70,
                        mobHealth: 1400,
                       mobDamage: 60,
                        rewardMultiplier: 2,
                   },
                    {
                       mobCount: 80,
                        mobHealth: 1600,
                       mobDamage: 70,
                        rewardMultiplier: 2.5,
                   },
                    {
                       mobCount: 90,
                       mobHealth: 1800,
                       mobDamage: 80,
                         rewardMultiplier: 3,
                   },
                      {
                       mobCount: 100,
                       mobHealth: 2000,
                       mobDamage: 90,
                         rewardMultiplier: 3.5,
                   },
                ],
                boss: {
                   health: 5000,
                   damage: 120,
                    rewardMultiplier: 8,
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
        },
        MOB_CONFIG: {
           mob: {
             health: 100,
                damage: 10
           }
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
            dungeonStartTime: null,
             dungeonDuration: 0,
             dungeonRewards: null,
             currentWave: 0,
              mobsInWave: [],
              bossFight: false,
              bossHealth: 0,
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
               dungeonCombatLog: document.getElementById('dungeon-combat-log'),
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
             currentWave: 0,
              mobsInWave: [],
             bossFight: false,
            bossHealth: 0,
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
        gameState.currentWave = 0;
        gameState.mobsInWave = [];
       gameState.bossFight = false;
       gameState.bossHealth = 0;
       startDungeonWave(dungeonConfig);
        startDungeonTimer();
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
     gameState.currentWave = 0;
     gameState.mobsInWave = [];
     gameState.bossFight = false;
      gameState.bossHealth = 0;


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

    const checkLevelUp = () => {
      const requiredExp =  gameConfig.LEVEL_UP_BASE_EXP * Math.pow(1.5, gameState.level - 1);
      if (gameState.experience >= requiredExp) {
           gameState.level++;
           gameState.experience -= requiredExp;
           gameState.levelPoints++;
           displayMessage(`Уровень повышен! Текущий уровень: ${gameState.level}`, 'green', '1.2em');
             checkLevelUp();
       }
          updateProfile();
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
        const item = openChestLogic(chestType);
        if (item) {
            const itemElement = document.createElement('div');
            itemElement.textContent = `Выпал предмет: ${item}`;
            elements.shop.chestItemsDisplay.appendChild(itemElement);
            displayMessage(`Выпал предмет: ${item}`, 'green', '1.2em');
        }
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
    const allSkins = Object.keys(gameConfig.SKIN_NAMES);
    const allArtifacts = Object.keys(gameConfig.ARTIFACT_NAMES);

    const itemTypeRoll = Math.random();
    const skinChance = 0.5;
    let item = null;
    if (itemTypeRoll <= skinChance) {
        item = applyRarity(null, gameConfig.SKIN_NAMES, 'skins');
    } else {
        item = applyRarity(null, gameConfig.ARTIFACT_NAMES, 'artifacts');
    }
    return item;
};

const applyRarity = (rarityChances, names, type) => {
    const allItems = Object.keys(names);
    if (allItems.length === 0) {
        return null;
    }
    const item = getRandomItem(allItems, names, type);
    return item;
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

const createItemPopup = (itemType, itemId, itemName, count, rarity, bonuses) => {
    const popup = document.createElement('div');
    popup.classList.add('item-popup');
    const imagePath = `${itemId}.jpg`;
    popup.innerHTML = `
        <div class="popup-content">
             <span class="item-popup-close-button">&times;</span>
             ${getImageTag(itemId, imagePath, itemName)}
            <h3>${itemName}</h3>
            <p>Количество: ${count}</p>
            <p>Редкость: ${rarity}</p>
             ${bonuses ? `<p>Бонусы: ${bonuses}</p>` : ''}
        </div>
    `;
    document.body.appendChild(popup);
    // Обработчик для закрытия окна по крестику
    const closeButton = popup.querySelector('.item-popup-close-button');
    closeButton.addEventListener('click', () => {
        popup.remove();
    });
    // Обработчик для закрытия окна по клику вне его
    document.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.remove();
        }
    });
};

const getImageTag = (itemId, imagePath, itemName) => {
    // Проверяем, существует ли картинка
    const img = new Image();
    img.src = imagePath;
    // Если картинка загрузилась, возвращаем тег img
    if (img.complete || img.naturalWidth !== 0) {
        return `<img src="${imagePath}" alt="${itemName}">`;
    }
    // В противном случае, возвращаем пустую строку или другое значение по умолчанию
    return '';
};


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
        const imagePath = `${skin}.jpg`;
        skinElement.innerHTML = `${getImageTag(skin, imagePath, gameConfig.SKIN_NAMES[skin] || skin)} <span>${gameConfig.SKIN_NAMES[skin] || skin} x${skins[skin]}</span>`;
        skinElement.addEventListener('click', () => {
            const rarity = gameConfig.SKIN_RARITY[skin];
            let bonuses = '';
            if (gameConfig.SKIN_EFFECTS[skin]) {
                for (const effect in gameConfig.SKIN_EFFECTS[skin]) {
                    bonuses += `${effect}: ${gameConfig.SKIN_EFFECTS[skin][effect]} \n`;
                }
            }
            createItemPopup('skins', skin, gameConfig.SKIN_NAMES[skin] || skin, skins[skin], rarity || 'Неизвестно', bonuses);
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
        const imagePath = `${artifact}.jpg`;
        artifactElement.innerHTML = `${getImageTag(artifact, imagePath, gameConfig.ARTIFACT_NAMES[artifact] || artifact)} <span>${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${artifacts[artifact]}</span>`;
        artifactElement.addEventListener('click', () => {
            const rarity = gameConfig.ARTIFACT_RARITY[artifact];
            let bonuses = '';
            if (gameConfig.ARTIFACT_EFFECTS[artifact]) {
                for (const effect in gameConfig.ARTIFACT_EFFECTS[artifact]) {
                    bonuses += `${effect}: ${gameConfig.ARTIFACT_EFFECTS[artifact][effect]} \n`;
                }
            }
            createItemPopup('artifacts', artifact, gameConfig.ARTIFACT_NAMES[artifact] || artifact, artifacts[artifact], rarity || 'Неизвестно', bonuses);
        });
        elements.inventory.artifactsDisplay.appendChild(artifactElement);
    }
};
    const updateProfile = () => {
        const profileInfo = document.getElementById('profile-info');
        profileInfo.innerHTML = ''; // Очищаем предыдущую информацию

        const clickValue = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
        const clickPowerInfo = document.createElement('p');
        clickPowerInfo.textContent = `Сила клика: ${clickValue.toFixed(2)} (база ${gameState.clickValue}, уровень ${gameState.clickUpgradeLevel}, усиление скинами: ${calculateClickBonus(gameState.skins).toFixed(2)}, усиление способностью: ${calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus).toFixed(2)}, престиж ${gameState.prestigeMultiplier.toFixed(2)})`;
        profileInfo.appendChild(clickPowerInfo);
    
        const clickCountInfo = document.createElement('p');
        clickCountInfo.textContent = `Количество кликов: ${Math.round(gameState.clickCount)}`;
        profileInfo.appendChild(clickCountInfo);

        const levelInfo = document.createElement('p');
        levelInfo.textContent = `Уровень: ${gameState.level}`;
        profileInfo.appendChild(levelInfo);

        const experienceInfo = document.createElement('p');
        experienceInfo.textContent = `Опыт: ${gameState.experience}/${Math.round(gameConfig.LEVEL_UP_BASE_EXP * Math.pow(1.5, gameState.level - 1))}`;
        profileInfo.appendChild(experienceInfo);
      
        const levelPointsInfo = document.createElement('p');
        levelPointsInfo.textContent = `Очки уровня: ${gameState.levelPoints}`;
         profileInfo.appendChild(levelPointsInfo);

        const diamondsInfo = document.createElement('p');
        diamondsInfo.textContent = `Алмазов: ${gameState.diamonds}`;
        profileInfo.appendChild(diamondsInfo);


        const prestigeLevelInfo = document.createElement('p');
        prestigeLevelInfo.textContent = `Уровень престижа: ${gameState.prestigeLevel}`;
        profileInfo.appendChild(prestigeLevelInfo);

        const autoClickerInfo = document.createElement('p');
        autoClickerInfo.textContent = `Автокликеров: ${gameState.autoClickerValue}`;
        profileInfo.appendChild(autoClickerInfo);

        const autoClickerBonusInfo = document.createElement('p');
            autoClickerBonusInfo.textContent = `Бонус автокликеров: x${calculateAutoClickBonus(gameState.skins).toFixed(2)}`;
            profileInfo.appendChild(autoClickerBonusInfo);


        const prestigeBonusInfo = document.createElement('p');
        prestigeBonusInfo.textContent = `Бонус престижа: x${calculatePrestigeBonus(gameState.artifacts).toFixed(2)}`;
        profileInfo.appendChild(prestigeBonusInfo);

        const diamondBonusInfo = document.createElement('p');
        diamondBonusInfo.textContent = `Бонус алмазов: x${calculateDiamondBonus(gameState.artifacts).toFixed(2)}`;
        profileInfo.appendChild(diamondBonusInfo);
        
        const expeditionSpeedBonusInfo = document.createElement('p');
          expeditionSpeedBonusInfo.textContent = `Скорость экспедиций: x${calculateAbilityBonus('expedition_speed', gameState.abilities.expedition_speed).toFixed(2)}`;
        profileInfo.appendChild(expeditionSpeedBonusInfo);

        const skinsAndArtifacts = document.createElement('div');
         skinsAndArtifacts.innerHTML = '<h3>Скины и Артефакты</h3>';
         profileInfo.appendChild(skinsAndArtifacts);

         const ownedSkins = document.createElement('div');
        ownedSkins.innerHTML = '<h4>Скины</h4>';
        for (const skin in gameState.skins) {
          if (gameState.skins.hasOwnProperty(skin) && gameState.skins[skin] > 0) {
            ownedSkins.innerHTML += `<p>${gameConfig.SKIN_NAMES[skin] || skin} (x${gameState.skins[skin]})</p>`;
           }
         }
        profileInfo.appendChild(ownedSkins);

        const ownedArtifacts = document.createElement('div');
            ownedArtifacts.innerHTML = '<h4>Артефакты</h4>';
            for (const artifact in gameState.artifacts) {
                if (gameState.artifacts.hasOwnProperty(artifact) && gameState.artifacts[artifact] > 0) {
                ownedArtifacts.innerHTML += `<p>${gameConfig.ARTIFACT_NAMES[artifact] || artifact} (x${gameState.artifacts[artifact]})</p>`;
               }
             }
        profileInfo.appendChild(ownedArtifacts);
    };
    
    
 const updateAbilitiesDisplay = () => {
        const abilitiesList = document.getElementById('abilities-list');
        abilitiesList.innerHTML = '';
    
         for (const abilityId in gameConfig.ABILITY_CONFIG) {
             if (gameConfig.ABILITY_CONFIG.hasOwnProperty(abilityId)) {
               const ability = gameConfig.ABILITY_CONFIG[abilityId];
              const abilityItem = document.createElement('div');
                abilityItem.classList.add('ability-item');

            const currentLevel = gameState.abilities[abilityId] || 0;
            const maxLevel = ability.maxLevel;
             let buttonText = `Улучшить (уровень ${currentLevel}/${maxLevel})`;
           if(currentLevel >= maxLevel) {
             buttonText = 'Макс. Уровень';
           }
              abilityItem.innerHTML = `
                  <p>${ability.name} (${currentLevel}/${maxLevel})<br><small>${ability.description}</small></p>
                  <button data-ability="${abilityId}" ${currentLevel >= maxLevel ? 'class="disabled" disabled' : ''}>${buttonText}</button>
                `;
                
                
             const buyButton = abilityItem.querySelector('button');
               buyButton.addEventListener('click', () => {
                    buyAbility(abilityId);
                });
                abilitiesList.appendChild(abilityItem);
          }
        }
    };
    
     const buyAbility = (abilityId) => {
    const ability = gameConfig.ABILITY_CONFIG[abilityId];
    if (!ability) return;

        const currentLevel = gameState.abilities[abilityId] || 0;
           const maxLevel = ability.maxLevel;

        if(currentLevel >= maxLevel) {
         displayMessage('Максимальный уровень!', 'red');
          return;
       }

    if (gameState.levelPoints >= ability.costPerLevel) {
        gameState.levelPoints -= ability.costPerLevel;
        gameState.abilities[abilityId] = currentLevel + 1;
          displayMessage(`Улучшена способность ${ability.name}!`, 'green');
          updateAbilitiesDisplay();
          updateProfile();
        saveData();
    } else {
        displayMessage(`Недостаточно очков уровня для улучшения ${ability.name}`, 'red');
       }
    };
// 8. Обработчики событий
elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue++;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.1);
            updateDisplay();
              displayMessage('Улучшение силы клика куплено', 'green');
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    elements.clicker.upgradeAutoButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue++;
            gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.2);
              displayMessage('Куплен автокликер!', 'green');
             startAutoClicker();
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

     elements.clicker.upgradeClickLevelButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 1.3);
            updateDisplay();
              displayMessage('Повышен уровень кликов!', 'green');
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    elements.shop.prestigeButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
             gameState.clickCount -= gameState.prestigeCost;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts);
            gameState.prestigeCost = Math.round(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.3, gameState.prestigeLevel));
            gameState.clickValue = 1;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            clearInterval(gameState.autoClickerInterval);
              gameState.autoClickerInterval = null;
            updateDisplay();
            checkAchievements();
            displayMessage('Сделан престиж!', 'gold', '1.2em');
           saveData();
        } else {
            displayMessage(`Необходимо ${gameState.prestigeCost} кликов для престижа`, 'red');
        }
    });

    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);

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


  elements.menu.menuButton.addEventListener('click', () => {
      elements.menu.menu.classList.toggle('active');
  });

  elements.menu.menuItems.forEach(item => {
      item.addEventListener('click', (event) => {
           const tabId = event.target.dataset.tab;
           switchTab(tabId);
             elements.menu.menu.classList.remove('active'); // Закрываем меню после выбора таба
        });
   });


   elements.menu.resetButton.addEventListener('click', () => {
        const confirmation = confirm('Вы уверены, что хотите сбросить прогресс?');
        if (confirmation) {
            resetGame();
        }
    });
    
    const startDungeonWave = (dungeonConfig) => {
            const currentWaveConfig = dungeonConfig.waves[gameState.currentWave];
            if (!currentWaveConfig) {
              if(dungeonConfig.boss) {
                 startBossFight(dungeonConfig);
              } else {
                   finishDungeon();
                  }
              return;
            }
        gameState.mobsInWave = [];
            for (let i = 0; i < currentWaveConfig.mobCount; i++) {
               const mob =  {
                    health: currentWaveConfig.mobHealth,
                     maxHealth: currentWaveConfig.mobHealth,
                     damage: currentWaveConfig.mobDamage,
                     rewardMultiplier: currentWaveConfig.rewardMultiplier,
                    };
                 gameState.mobsInWave.push(mob);
             }
          updateDungeonCombatLog(`Волна ${gameState.currentWave + 1} начинается!`)
   }
  const startBossFight = (dungeonConfig) => {
          gameState.bossFight = true;
          gameState.bossHealth = dungeonConfig.boss.health;
          gameState.bossMaxHealth = dungeonConfig.boss.health;
          gameState.bossDamage = dungeonConfig.boss.damage;
          gameState.bossRewardMultiplier = dungeonConfig.boss.rewardMultiplier;
         updateDungeonCombatLog(`Начался бой с боссом!`)
     }


const attackMob = () => {
    if (gameState.bossFight) {
          attackBoss();
           return;
        }

    if (gameState.mobsInWave.length === 0) {
            gameState.currentWave++;
            const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
            startDungeonWave(dungeonConfig);
            return;
       }
     const mob = gameState.mobsInWave[0];
     const damage = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
     mob.health -= damage;
   if (mob.health <= 0) {
      const mobReward = (mob.rewardMultiplier * Math.floor(Math.random() * (100 - 50 + 1)) + 50) ;
            updateDungeonCombatLog(`Вы нанесли ${damage.toFixed(2)} урона и убили моба, получено ${mobReward.toFixed(2)} опыта.`);
            gameState.experience += mobReward;
            checkLevelUp();
         gameState.mobsInWave.shift();
       } else {
            updateDungeonCombatLog(`Вы нанесли ${damage.toFixed(2)} урона, у моба осталось ${mob.health.toFixed(2)} здоровья.`);
       }

      mobAttack();
  };
  const attackBoss = () => {
     if (gameState.bossHealth <= 0) {
        finishDungeon();
          return;
     }

       const damage = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
       gameState.bossHealth -= damage;
      if (gameState.bossHealth <= 0) {
           const bossReward = (gameState.bossRewardMultiplier * Math.floor(Math.random() * (1000 - 500 + 1)) + 500) ;
           updateDungeonCombatLog(`Вы нанесли ${damage.toFixed(2)} урона и убили босса, получено ${bossReward.toFixed(2)} опыта!`);
            gameState.experience += bossReward;
            checkLevelUp();
             finishDungeon();
         } else {
           updateDungeonCombatLog(`Вы нанесли ${damage.toFixed(2)} урона, у босса осталось ${gameState.bossHealth.toFixed(2)} здоровья.`);
         }
       bossAttack();
  }

  const mobAttack = () => {
   if (gameState.mobsInWave.length === 0) return;
     const mob = gameState.mobsInWave[0];
     const damage = mob.damage;
       gameState.clickCount -= damage;
      updateDungeonCombatLog(`Моб нанес ${damage.toFixed(2)} урона, у вас осталось ${gameState.clickCount.toFixed(2)} кликов`);
      if (gameState.clickCount <= 0) {
         finishDungeon();
          gameState.clickCount = 0;
       }
   };
     const bossAttack = () => {
       if (gameState.bossHealth <= 0) return;
        const damage = gameState.bossDamage;
      gameState.clickCount -= damage;
      updateDungeonCombatLog(`Босс нанес ${damage.toFixed(2)} урона, у вас осталось ${gameState.clickCount.toFixed(2)} кликов`);
      if (gameState.clickCount <= 0) {
         finishDungeon();
          gameState.clickCount = 0;
       }
     }

   const updateDungeonCombatLog = (message) => {
      const logEntry = document.createElement('p');
      logEntry.textContent = message;
      elements.dungeon.dungeonCombatLog.appendChild(logEntry);
       elements.dungeon.dungeonCombatLog.scrollTop = elements.dungeon.dungeonCombatLog.scrollHeight;
    };

    elements.clicker.clickButton.addEventListener('click', () => {
        if (gameState.activeDungeon) {
            attackMob();
        } else {
         applyClick();
        }
    });

    let autoSaveInterval = null;
    const startAutoSave = () => {
        if (autoSaveInterval) {
            clearInterval(autoSaveInterval);
        }
        autoSaveInterval = setInterval(saveData, 60000); // Каждые 60 секунд
    };
     const clearAutoSave = () => {
        if (autoSaveInterval) {
            clearInterval(autoSaveInterval);
            autoSaveInterval = null;
         }
    };

    startAutoSave();
    loadGame();
});