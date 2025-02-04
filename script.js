
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
                waves: [
                    {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 30,
                        attackDamage: 3,
                    },
                     {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 30,
                         attackDamage: 3,
                     },
                     {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 30,
                         attackDamage: 3,
                     },
                    {
                     enemyName: 'Слабый гоблин',
                        enemyHealth: 50,
                         attackDamage: 3,
                      },
                ],
                rewards: {
                    diamonds: [10, 20],
                    keys: [1, 2],
                    experience: [100, 200],
                    skins: {
                        'common': [0, 1],
                    },
                },
            },
           'easy': {
                name: 'Легкое Подземелье',
                cost: 50,
                duration: 120000,
                waves: [
                    {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 50,
                        attackDamage: 5,
                    },
                    {
                        enemyName: 'Гоблин-лучник',
                        enemyHealth: 70,
                        attackDamage: 7,
                    },
                    {
                        enemyName: 'Злой гоблин',
                        enemyHealth: 100,
                        attackDamage: 10,
                    },
                ],
                rewards: {
                    diamonds: [50, 100],
                    keys: [1, 3],
                    experience: [250, 500],
                     artifacts: {
                        'common': [0, 1],
                    },
                },
            },
             'medium': {
                name: 'Среднее Подземелье',
                cost: 200,
                duration: 300000,
                 waves: [
                    {
                        enemyName: 'Гоблин-воин',
                        enemyHealth: 100,
                        attackDamage: 10,
                    },
                    {
                        enemyName: 'Гоблин-маг',
                        enemyHealth: 80,
                        attackDamage: 15,
                    },
                    {
                        enemyName: 'Элитный гоблин',
                        enemyHealth: 150,
                        attackDamage: 20,
                    },
                      {
                        enemyName: 'Гоблин-шаман',
                        enemyHealth: 120,
                        attackDamage: 15,
                    },
                ],
                rewards: {
                   diamonds: [150, 300],
                    keys: [2, 4],
                    experience: [750, 1250],
                    artifacts: {
                       'uncommon': [0, 1],
                        'common': [0, 1],
                     },
                },
            },
           'hard': {
                name: 'Сложное Подземелье',
                cost: 500,
                duration: 600000,
                   waves: [
                    {
                        enemyName: 'Гоблин-берсерк',
                        enemyHealth: 150,
                        attackDamage: 15,
                    },
                    {
                        enemyName: 'Гоблин-рыцарь',
                        enemyHealth: 200,
                        attackDamage: 25,
                    },
                    {
                        enemyName: 'Гоблин-палач',
                        enemyHealth: 180,
                        attackDamage: 20,
                    },
                       {
                        enemyName: 'Гоблин-босс',
                        enemyHealth: 300,
                           attackDamage: 30,
                    },
                ],
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
            },
            'legendary': {
                 name: 'Легендарное Подземелье',
                cost: 1000,
                duration: 1200000,
                  waves: [
                    {
                        enemyName: 'Минотавр',
                        enemyHealth: 250,
                        attackDamage: 30,
                    },
                    {
                        enemyName: 'Гарпия',
                         enemyHealth: 200,
                        attackDamage: 35,
                    },
                    {
                       enemyName: 'Дракон',
                        enemyHealth: 350,
                        attackDamage: 50,
                    },
                      {
                       enemyName: 'Король Лич',
                        enemyHealth: 500,
                        attackDamage: 70,
                    },
                ],
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
            dungeonStartTime: null,
             dungeonDuration: 0,
             dungeonRewards: null,
              dungeonState: {
                currentWave: 0,
                playerHealth: 100,
                enemyHealth: 100,
                 enemyName: null,
                waves: [],
                }
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
             dungeonBattleArea: document.getElementById('dungeon-battle-area'),
            enemyNameDisplay: document.getElementById('enemy-name'),
             playerHealthDisplay: document.getElementById('player-health'),
            enemyHealthDisplay: document.getElementById('enemy-health'),
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
            elements.dungeon.dungeonBattleArea.style.display = 'none';
            return;
        }
        elements.dungeon.dungeonBattleArea.style.display = 'block';
        const elapsed = Date.now() - gameState.dungeonStartTime;
        const remaining = Math.max(0, gameState.dungeonDuration - elapsed);
        const progress = Math.min(100, Math.round((elapsed / gameState.dungeonDuration) * 100));
        const remainingSeconds = Math.ceil(remaining / 1000);
        elements.dungeon.dungeonProgressDisplay.textContent = `Подземелье ${gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].name}: ${progress}%  (${remainingSeconds} сек. осталось)`;
        updateDungeonBattleUI();

        if (remaining <= 0) {
            finishDungeon(); // Завершаем подземелье
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
                dungeonState: {
                currentWave: 0,
                playerHealth: 100,
                 enemyHealth: 100,
                    enemyName: null,
                waves: [],
                }
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
                      updateDungeonBattleUI();
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
         const profileTabButtons = document.querySelectorAll('.profile-tab-button');
         // Функция для активации таба
        const activateTab = (tab) => {
            profileInfo.style.display = (tab === 'profile-info') ? 'block' : 'none';
            profileInventory.style.display = (tab === 'profile-inventory') ? 'block' : 'none';
            profileAbilities.style.display = (tab === 'profile-abilities') ? 'block' : 'none';
            profileTabButtons.forEach(btn => btn.classList.remove('active'));
            profileTabButtons.forEach(btn => {
               if (btn.dataset.tab === tab) {
                   btn.classList.add('active');
               }
            });
         };

        // Показываем контейнер профиля и вкладку "Профиль" по умолчанию
        profileContainer.style.display = 'block';
         activateTab('profile-info');

        profileTabButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const tab = event.target.dataset.tab;
                  activateTab(tab);
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
        gameState.dungeonState.waves = dungeonConfig.waves;
        gameState.diamonds -= dungeonConfig.cost;
        gameState.activeDungeon = type;
        gameState.dungeonStartTime = Date.now();
         gameState.dungeonDuration = dungeonConfig.duration / calculateAbilityBonus('dungeon_speed', gameState.abilities.dungeon_speed);
        gameState.dungeonRewards = dungeonConfig.rewards;
           gameState.dungeonState.currentWave = 0; // Устанавливаем первую волну
           gameState.dungeonState.playerHealth = 100;
        // Запускаем таймер подземелья
        startDungeonTimer();
        updateDisplay();
         displayMessage(`Началось подземелье "${dungeonConfig.name}".`, 'green');
        startDungeonWave();
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
    const dungeonConfig = gameConfig.DUNGEON_CONFIG[dungeonType];
    const rewards = gameState.dungeonRewards;

    gameState.activeDungeon = null;
    gameState.dungeonStartTime = null;
    gameState.dungeonDuration = 0;
    gameState.dungeonRewards = null;
    //gameState.dungeonState.waves = [];
    gameState.dungeonState.enemyName = null;

    let gainedDiamonds = 0;
    let gainedKeys = 0;
    let gainedExp = 0;
    const gainedSkins = {};
    const gainedArtifacts = {};

    let message = `Подземелье "${dungeonConfig.name}" `;

    // Проверяем, выполнил ли игрок условия победы: жив и все волны пройдены
    const playerWon = (gameState.dungeonState.playerHealth > 0 && gameState.dungeonState.currentWave >= dungeonConfig.waves.length);

    if (playerWon) {
        message += 'успешно завершено!'; // Все волны пройдены
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
                        if (skin) {
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
                        if (artifact) {
                            gainedArtifacts[artifact] = (gainedArtifacts[artifact] || 0) + 1
                        }
                    }
                }
            }
        }
    } else {
        message = `Провал! Вы не успели завершить подземелье "${dungeonConfig.name}"!`;
    }
      gameState.dungeonState= {
                currentWave: 0,
                playerHealth: 100,
                enemyHealth: 100,
                 enemyName: null,
                waves: [],
                };
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
  const startDungeonWave = () => {
        const currentWave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
         gameState.dungeonState.enemyName = currentWave.enemyName;
        gameState.dungeonState.enemyHealth = currentWave.enemyHealth;
        displayMessage(`Волна ${gameState.dungeonState.currentWave + 1}. Враг: ${currentWave.enemyName}`, 'blue');
       setTimeout(enemyAttack, 1000);
    };

 const playerAttack = () => {
    if (!gameState.activeDungeon) return;
    if (gameState.dungeonState.enemyHealth <= 0) return;
    const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
    const currentWave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
    let damage = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
     damage = Math.round(damage * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus));
      gameState.dungeonState.enemyHealth -= damage;
    displayMessage(`Вы нанесли ${damage} урона ${currentWave.enemyName}`, 'green');
    updateDungeonBattleUI();
    if (gameState.dungeonState.enemyHealth <= 0) {
        displayMessage(`${currentWave.enemyName} повержен!`, 'gold');
        gameState.dungeonState.currentWave++;
         if (gameState.dungeonState.currentWave < dungeonConfig.waves.length) {
            setTimeout(startDungeonWave, 1000);
        }
    else{
       finishDungeon();
    }
    }
};

 const enemyAttack = () => {
        if (!gameState.activeDungeon) return;
        if (gameState.dungeonState.playerHealth <= 0) return;

         const currentWave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
         const attackDamage = currentWave.attackDamage;
        gameState.dungeonState.playerHealth -= attackDamage;

        displayMessage(`Враг ${currentWave.enemyName} нанёс вам ${attackDamage} урона!`, 'red');

        updateDungeonBattleUI();
        if (gameState.dungeonState.playerHealth <= 0) {
            displayMessage('Вы погибли!', 'red');
            finishDungeon(); // Завершаем подземелье с поражением
        }
        else
        {
           setTimeout(enemyAttack, 1000);
        }
    };

    const updateDungeonBattleUI = () => {
        if (!gameState.activeDungeon) return;
         elements.dungeon.enemyNameDisplay.textContent = gameState.dungeonState.enemyName;
        elements.dungeon.playerHealthDisplay.textContent = `Ваше здоровье: ${gameState.dungeonState.playerHealth}`;
        elements.dungeon.enemyHealthDisplay.textContent = `Здоровье врага: ${gameState.dungeonState.enemyHealth}`;
    };

    const applyRarity = (chance, names, type) => {
        const random = Math.random();
        let rarity = 'common';

        if (type === 'chests') {
            if (random < gameConfig.CHEST_RARITY_CHANCE.epic) rarity = 'epic';
            else if (random < gameConfig.CHEST_RARITY_CHANCE.rare + gameConfig.CHEST_RARITY_CHANCE.epic) rarity = 'rare';
        } else if (type === 'skins') {
            if (random < gameConfig.SKIN_RARITY_CHANCE.epic) rarity = 'epic';
            else if (random < gameConfig.SKIN_RARITY_CHANCE.rare + gameConfig.SKIN_RARITY_CHANCE.epic) rarity = 'rare';
            else if (random < gameConfig.SKIN_RARITY_CHANCE.uncommon + gameConfig.SKIN_RARITY_CHANCE.rare + gameConfig.SKIN_RARITY_CHANCE.epic) rarity = 'uncommon';
        } else if (type === 'artifacts') {
            if (random < gameConfig.ARTIFACT_RARITY_CHANCE.epic) rarity = 'epic';
            else if (random < gameConfig.ARTIFACT_RARITY_CHANCE.rare + gameConfig.ARTIFACT_RARITY_CHANCE.epic) rarity = 'rare';
            else if (random < gameConfig.ARTIFACT_RARITY_CHANCE.uncommon + gameConfig.ARTIFACT_RARITY_CHANCE.rare + gameConfig.ARTIFACT_RARITY_CHANCE.epic) rarity = 'uncommon';
        }
        if (chance === null) {
            const availableItems = Object.keys(names).filter(item => gameConfig[type.toUpperCase()][item] === rarity);
            if (availableItems.length === 0) {
                return null;
            }
            const item = availableItems[Math.floor(Math.random() * availableItems.length)];
            return item;
        }
        if (random < chance) {
            const availableItems = Object.keys(names).filter(item => gameConfig[type.toUpperCase()][item] === rarity);
            if (availableItems.length === 0) {
                return null;
            }
            const item = availableItems[Math.floor(Math.random() * availableItems.length)];
            return item;
        }
        return null;
    };

    const openChest = (rarity) => {
        if (gameState.keys <= 0) {
            displayMessage('Не хватает ключей для открытия сундука', 'red');
            return;
        }
        if (gameState.chests[rarity] <= 0) {
            displayMessage(`Нет ${rarity} сундуков для открытия`, 'red');
            return;
        }
        gameState.keys--;
        gameState.chests[rarity]--;
        updateDisplay();

        const items = {};
        const skin = applyRarity(null, gameConfig.SKIN_NAMES, 'skins');
        const artifact = applyRarity(null, gameConfig.ARTIFACT_NAMES, 'artifacts');

        if (skin) {
            gameState.skins[skin] = (gameState.skins[skin] || 0) + 1
            items[skin] = (items[skin] || 0) + 1;
        }
        if (artifact) {
            gameState.artifacts[artifact] = (gameState.artifacts[artifact] || 0) + 1;
            items[artifact] = (items[artifact] || 0) + 1;
        }

        let message = `Открыт ${rarity} сундук! `;
        if (Object.keys(items).length > 0) {
            message += `Выпали предметы: ${Object.keys(items).map(item => `${item} x${items[item]}`).join(', ')}.`;
        } else {
            message += 'Пусто.';
        }
        displayMessage(message, 'gold', '1.2em');
        saveData();
    };

    const updateInventoryDisplay = () => {
        elements.inventory.skinsDisplay.innerHTML = '';
        elements.inventory.artifactsDisplay.innerHTML = '';

        for (const skin in gameState.skins) {
            const skinDiv = document.createElement('div');
            skinDiv.classList.add('inventory-item');
            skinDiv.textContent = `${gameConfig.SKIN_NAMES[skin] || skin} x${gameState.skins[skin]}`;
            elements.inventory.skinsDisplay.appendChild(skinDiv);
        }

        for (const artifact in gameState.artifacts) {
            const artifactDiv = document.createElement('div');
            artifactDiv.classList.add('inventory-item');
            artifactDiv.textContent = `${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${gameState.artifacts[artifact]}`;
            elements.inventory.artifactsDisplay.appendChild(artifactDiv);
        }
    };

    const checkLevelUp = () => {
        const requiredExp = gameConfig.LEVEL_UP_BASE_EXP * gameState.level;
        if (gameState.experience >= requiredExp) {
            gameState.experience -= requiredExp;
            gameState.level++;
            gameState.levelPoints++;
            updateDisplay();
            updateProfile();
            updateAbilitiesDisplay();
            displayMessage(`Уровень повышен! Теперь вы ${gameState.level} уровня!`, 'green', '1.2em');
        }
    };

    const updateProfile = () => {
        const profileLevelDisplay = document.getElementById('profile-level');
        const profileExpDisplay = document.getElementById('profile-exp');
        const profileLevelPointsDisplay = document.getElementById('profile-level-points');

        profileLevelDisplay.textContent = `Уровень: ${gameState.level}`;
        profileExpDisplay.textContent = `Опыт: ${gameState.experience} / ${gameConfig.LEVEL_UP_BASE_EXP * gameState.level}`;
        profileLevelPointsDisplay.textContent = `Очки Улучшений: ${gameState.levelPoints}`;
    };

    const updateAbilitiesDisplay = () => {
        const abilitiesDisplay = document.getElementById('abilities-display');
        abilitiesDisplay.innerHTML = '';

        for (const ability in gameState.abilities) {
            const abilityConfig = gameConfig.ABILITY_CONFIG[ability];
             let abilityDiv = document.createElement('div');
            abilityDiv.classList.add('ability-item');

           let abilityName = document.createElement('span');
            abilityName.textContent = `${abilityConfig.name} (Уровень ${gameState.abilities[ability]})`;
            abilityDiv.appendChild(abilityName);
            let abilityDescription = document.createElement('p');
            abilityDescription.textContent = abilityConfig.description;
            abilityDiv.appendChild(abilityDescription);
           let abilityCost = document.createElement('span');
           abilityCost.textContent = `Стоимость: ${abilityConfig.costPerLevel}`;
            abilityDiv.appendChild(abilityCost);
           let abilityButton = document.createElement('button');
            abilityButton.textContent = 'Улучшить';
            abilityButton.disabled = gameState.levelPoints < abilityConfig.costPerLevel || gameState.abilities[ability] >= abilityConfig.maxLevel;
            abilityButton.addEventListener('click', () => {
                if (gameState.levelPoints >= abilityConfig.costPerLevel) {
                    gameState.levelPoints -= abilityConfig.costPerLevel;
                    gameState.abilities[ability]++;
                    updateAbilitiesDisplay();
                    updateProfile();
                     updateExpeditionProgressBar();
                     updateDungeonProgressBar();
                    saveData();
                } else {
                    displayMessage('Не хватает очков улучшений!', 'red');
                }
            });
            abilityDiv.appendChild(abilityButton);
           abilitiesDisplay.appendChild(abilityDiv);
        }
    };

    // 8. Обработчики событий
    elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue++;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.15);
            updateDisplay();
            saveData();
            displayMessage('Клик улучшен!', 'green');
        } else {
            displayMessage('Не хватает кликов!', 'red');
        }
    });

    elements.clicker.upgradeAutoButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue++;
            gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.15);
            updateDisplay();
            saveData();
            startAutoClicker();
            displayMessage('Авто-клик улучшен!', 'green');
        } else {
            displayMessage('Не хватает кликов!', 'red');
        }
    });

    elements.clicker.upgradeClickLevelButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 1.25);
            updateDisplay();
            saveData();
            displayMessage('Уровень клика повышен!', 'green');
        } else {
            displayMessage('Не хватает кликов!', 'red');
        }
    });

    elements.shop.prestigeButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.clickValue = 1;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier *= calculatePrestigeBonus(gameState.artifacts);
            gameState.achievements = [];
            gameState.achievementCount = 0;
            gameState.skins = {};
            gameState.prestigeCost = Math.round(gameState.prestigeCost * 2.5);
            updateDisplay();
            saveData();
            displayMessage('Престиж выполнен!', 'gold', '1.2em');
        } else {
            displayMessage('Не хватает кликов!', 'red');
        }
    });

    elements.shop.buyKeyButton.addEventListener('click', () => {
        if (gameState.diamonds >= 1) {
            gameState.diamonds--;
            gameState.keys++;
            updateDisplay();
            saveData();
            displayMessage('Куплен ключ!', 'green');
        } else {
            displayMessage('Не хватает алмазов!', 'red');
        }
    });

    elements.shop.buyCommonChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 5) {
            gameState.diamonds -= 5;
            gameState.chests.common++;
            updateDisplay();
            saveData();
            displayMessage('Куплен обычный сундук!', 'green');
        } else {
            displayMessage('Не хватает алмазов!', 'red');
        }
    });

    elements.shop.buyRareChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 25) {
            gameState.diamonds -= 25;
            gameState.chests.rare++;
            updateDisplay();
            saveData();
            displayMessage('Куплен редкий сундук!', 'green');
        } else {
            displayMessage('Не хватает алмазов!', 'red');
        }
    });

    elements.shop.buyEpicChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 100) {
            gameState.diamonds -= 100;
            gameState.chests.epic++;
            updateDisplay();
            saveData();
            displayMessage('Куплен эпический сундук!', 'green');
        } else {
            displayMessage('Не хватает алмазов!', 'red');
        }
    });

    elements.shop.openChestButton.addEventListener('click', () => {
        elements.shop.chestContainer.style.display = 'block';
    });

    document.querySelectorAll('.open-chest').forEach(button => {
        button.addEventListener('click', () => {
            const rarity = button.dataset.rarity;
            openChest(rarity);
            elements.shop.chestContainer.style.display = 'none';
        });
    });

    elements.shop.closeChestButton.addEventListener('click', () => {
        elements.shop.chestContainer.style.display = 'none';
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
    elements.dungeon.dungeonBattleArea.addEventListener('click', playerAttack);
    elements.menu.menuButton.addEventListener('click', () => {
        elements.menu.menu.classList.toggle('open');
    });

    elements.menu.menuItems.forEach(item => {
        item.addEventListener('click', () => {
            switchTab(item.dataset.tab);
            elements.menu.menu.classList.remove('open');
        });
    });

    elements.menu.resetButton.addEventListener('click', () => {
        const confirmReset = confirm('Вы уверены, что хотите сбросить прогресс?');
        if (confirmReset) {
            resetGame();
        }
    });

    let autoSaveInterval = setInterval(saveData, 30000);

    const clearAutoSave = () => {
        clearInterval(autoSaveInterval);
    };

    // 9. Инициализация
    loadGame();
    switchTab('clicker'); // Показываем кликер при запуске
});
