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
         if (tWebApp) {
            tWebApp.CloudStorage.setItem(gameConfig.SAVE_KEY, JSON.stringify(gameState));
        } else {
            localStorage.setItem(gameConfig.SAVE_KEY, JSON.stringify(gameState));
        }
    };

    const loadGame = () => {
        let savedData;
        if (tWebApp) {
             savedData = tWebApp.CloudStorage.getItem(gameConfig.SAVE_KEY);
        } else {
             savedData = localStorage.getItem(gameConfig.SAVE_KEY);
        }
        
        if (savedData) {
            try {
                gameState = JSON.parse(savedData);
                startAutoClicker();
                 if (gameState.activeExpedition) {
                     gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
                }
               if(gameState.activeDungeon){
                     gameState.dungeonInterval = setInterval(updateDungeonProgressBar, 1000);
               }
              
                displayMessage('Прогресс загружен!', 'green');
                 updateProfile();
                updateInventoryDisplay();
            } catch (e) {
                displayMessage('Ошибка загрузки сохранения.', 'red');
                  console.error('Failed to load game:', e);
                   clearSaveData();
            }
        } else {
            displayMessage('Новая игра.', 'blue');
           updateProfile();
                updateInventoryDisplay();
        }
    };

   const autoSave = () => {
        saveData();
         displayMessage('Игра сохранена', 'green', '0.8em');
    };

   const startAutoSave = () => {
         autoSave();
        gameState.autoSaveInterval = setInterval(autoSave, 10000);
     };
    
    const clearAutoSave = () => {
         if (gameState.autoSaveInterval) {
            clearInterval(gameState.autoSaveInterval);
            gameState.autoSaveInterval = null;
        }
    };

    // 8. Улучшения
   const buyClickUpgrade = () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue += 1;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.2);
            updateDisplay();
           saveData();
            displayMessage(`Улучшение клика куплено!`, 'green');
        } else {
            displayMessage(`Недостаточно кликов!`, 'red');
        }
    };

    const buyAutoClicker = () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue += 1;
            gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.3);
              startAutoClicker();
            updateDisplay();
           saveData();
            displayMessage(`Куплен автокликер!`, 'green');
        } else {
            displayMessage(`Недостаточно кликов!`, 'red');
        }
    };

    const buyClickLevelUpgrade = () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
             gameState.clickCount -= gameState.clickUpgradeLevelCost;
              gameState.clickUpgradeLevel +=1;
              gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 2.5);
            updateDisplay();
             saveData();
            displayMessage('Уровень кликов улучшен!', 'green');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    // 9. Престиж
  const prestige = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.clickValue = 1;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.clickUpgradeLevel = 1;
            gameState.clickUpgradeLevelCost = 100;
            gameState.prestigeLevel += 1;
            gameState.prestigeMultiplier *= calculatePrestigeBonus(gameState.artifacts);
             gameState.prestigeCost = Math.round(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.5, gameState.prestigeLevel));
              clearAllTimeouts();
              startAutoClicker();
            updateDisplay();
             saveData();
            displayMessage(`Престиж получен!`, 'gold', '1.2em');
             checkAchievements();
        } else {
            displayMessage(`Недостаточно кликов!`, 'red');
        }
    };
    // 10. Магазин
     const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
            updateDisplay();
             saveData();
            displayMessage(`Куплен ключ!`, 'green');
        } else {
            displayMessage(`Недостаточно алмазов!`, 'red');
        }
    };

    const buyChest = (rarity) => {
        const chestCost = {
            common: 1,
            rare: 3,
            epic: 5,
        };

        if (gameState.keys >= chestCost[rarity]) {
            gameState.keys -= chestCost[rarity];
            gameState.chests[rarity]++;
            updateDisplay();
            saveData();
            displayMessage(`Куплен ${rarity} сундук!`, 'green');
        } else {
            displayMessage(`Недостаточно ключей!`, 'red');
        }
    };

    const openChest = () => {
        elements.shop.chestContainer.style.display = 'block';
        elements.shop.chestItemsDisplay.innerHTML = '';
        const items = [];
        let totalChests = gameState.chests.common + gameState.chests.rare + gameState.chests.epic;
        if (totalChests > 0) {
            for (let i = 0; i < gameState.chests.common; i++) {
                items.push(...generateChestLoot('common'));
            }
            for (let i = 0; i < gameState.chests.rare; i++) {
                items.push(...generateChestLoot('rare'));
            }
            for (let i = 0; i < gameState.chests.epic; i++) {
                items.push(...generateChestLoot('epic'));
            }
        gameState.chests = {
             'common': 0,
              'rare': 0,
              'epic': 0
        };
        updateChestDisplay();
        displayLoot(items);
         saveData();
        } else {
            displayMessage(`Нет сундуков для открытия!`, 'red');
            elements.shop.chestContainer.style.display = 'none';
        }

    };

    const generateChestLoot = (rarity) => {
        const loot = [];
        const chestRarityConfig = {
             common: {
                 skins: ['common'],
                 artifacts: ['common'],
             },
            rare: {
                skins: ['common', 'uncommon', 'rare'],
               artifacts: ['common', 'uncommon'],
            },
            epic: {
                skins: ['common', 'uncommon', 'rare', 'epic'],
                artifacts: ['common', 'uncommon', 'rare', 'epic'],
            }
        };
        
         const rarityConfig = chestRarityConfig[rarity];
            
        if(rarityConfig.skins){
            for (let i = 0; i < 1; i++) {
                 const skinRarity = getRandomItem(rarityConfig.skins);
                if(skinRarity){
                   const skinKey = getRandomSkinByRarity(skinRarity);
                      if(skinKey){
                        loot.push({ type: 'skin', item: skinKey, rarity: skinRarity });
                      }
                 }
           }
        }

         if(rarityConfig.artifacts){
            for (let i = 0; i < 1; i++) {
                 const artifactRarity = getRandomItem(rarityConfig.artifacts);
                 if(artifactRarity){
                    const artifactKey = getRandomArtifactByRarity(artifactRarity);
                    if(artifactKey){
                      loot.push({ type: 'artifact', item: artifactKey, rarity: artifactRarity });
                    }
                 }
            }
       }
        return loot;
    };
    
    const displayLoot = (items) => {
       items.forEach(item => {
         const itemElement = document.createElement('div');
           if (item.type === 'skin') {
               const skinName = gameConfig.SKIN_NAMES[item.item];
               const rarityName = item.rarity;
               const color = getColorByRarity(item.rarity)
                itemElement.textContent = `Скин: ${skinName}  (${rarityName})`;
               itemElement.style.color = color;
                if(gameState.skins[item.item]){
                 gameState.skins[item.item] += 1;
                } else {
                 gameState.skins[item.item] = 1;
               }
              } else if (item.type === 'artifact') {
                const artifactName = gameConfig.ARTIFACT_NAMES[item.item];
                  const rarityName = item.rarity;
                  const color = getColorByRarity(item.rarity)
                  itemElement.textContent = `Артефакт: ${artifactName}  (${rarityName})`;
                    itemElement.style.color = color;
                 if(gameState.artifacts[item.item]){
                    gameState.artifacts[item.item] += 1;
                } else {
                   gameState.artifacts[item.item] = 1;
                }
              }
            elements.shop.chestItemsDisplay.appendChild(itemElement);
       });
       updateInventoryDisplay();
    };
    
   const getColorByRarity = (rarity) => {
            switch (rarity) {
                case 'common':
                    return 'white';
                case 'uncommon':
                    return 'green';
                case 'rare':
                    return 'blue';
                case 'epic':
                    return 'purple';
                default:
                    return 'white';
            }
    };

    const closeChest = () => {
         elements.shop.chestContainer.style.display = 'none';
    };
    // 11. Экспедиции
   const startExpedition = (type) => {
        if (gameState.activeExpedition) {
            displayMessage(`Экспедиция уже идет!`, 'red');
            return;
        }

        const cost = gameConfig.EXPEDITION_COSTS[type];
        if (gameState.diamonds < cost) {
            displayMessage(`Недостаточно алмазов!`, 'red');
            return;
        }
        gameState.diamonds -= cost;
         gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] / calculateAbilityBonus('expedition_speed', gameState.abilities.expedition_speed);
          gameState.activeExpedition = type;
          gameState.expeditionStartTime = Date.now();
           gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
        displayMessage(`Экспедиция в ${gameConfig.EXPEDITION_TYPES[type]} началась!`, 'green');
         updateDisplay();
          saveData();
    };

    const finishExpedition = () => {
         clearInterval(gameState.expeditionInterval);
         gameState.expeditionInterval = null;
        const rewards = gameConfig.EXPEDITION_REWARDS[gameState.activeExpedition];
       const minReward = rewards[0];
         const maxReward = rewards[1];
         const diamondReward = Math.round(getRandomNumber(minReward, maxReward) * calculateDiamondBonus(gameState.artifacts) * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus));
        gameState.diamonds += diamondReward;
        gameState.activeExpedition = null;
         displayMessage(`Экспедиция завершена! Получено ${diamondReward} алмазов.`, 'green');
           updateDisplay();
         saveData();
    };

    const updateExpeditionButtonInfo = () => {
        Object.keys(gameConfig.EXPEDITION_TYPES).forEach(type => {
            const button = document.querySelector(`#start-${type}-expedition`);
             if(button){
                   button.textContent = `Отправить в ${gameConfig.EXPEDITION_TYPES[type]} Экспедицию (${gameConfig.EXPEDITION_COSTS[type]} алмазов)`;
             }
       });
    };
    // 12. Подземелье
     const startDungeon = (type) => {
        if (gameState.activeDungeon) {
            displayMessage(`Подземелье уже идет!`, 'red');
            return;
        }
           const cost = gameConfig.DUNGEON_CONFIG[type].cost;
        if (gameState.diamonds < cost) {
            displayMessage(`Недостаточно алмазов!`, 'red');
            return;
        }

       gameState.diamonds -= cost;
        gameState.dungeonDuration =  gameConfig.DUNGEON_CONFIG[type].duration / calculateAbilityBonus('dungeon_speed', gameState.abilities.dungeon_speed);
        gameState.activeDungeon = type;
          gameState.dungeonStartTime = Date.now();
            gameState.dungeonInterval = setInterval(updateDungeonProgressBar, 1000);
           gameState.dungeonState.waves = gameConfig.DUNGEON_CONFIG[type].waves;
          gameState.dungeonState.currentWave = 0;
           gameState.dungeonState.playerHealth = 100;
        startNextWave();
          displayMessage(`Подземелье ${gameConfig.DUNGEON_CONFIG[type].name} началось!`, 'green');
         updateDisplay();
        saveData();
    };
  const finishDungeon = () => {
        clearInterval(gameState.dungeonInterval);
        gameState.dungeonInterval = null;
          const dungeonRewards = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].rewards;
           const dungeonRewardItems = [];
             if(dungeonRewards){
              if(dungeonRewards.diamonds){
                     const minDiamondsReward = dungeonRewards.diamonds[0];
                    const maxDiamondsReward = dungeonRewards.diamonds[1];
                  const diamondsReward = Math.round(getRandomNumber(minDiamondsReward, maxDiamondsReward) * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus));
                   gameState.diamonds += diamondsReward;
                   dungeonRewardItems.push({type: 'diamonds', count: diamondsReward});
              }
               if(dungeonRewards.experience){
                 const minExperienceReward = dungeonRewards.experience[0];
                 const maxExperienceReward = dungeonRewards.experience[1];
                   const experienceReward = Math.round(getRandomNumber(minExperienceReward, maxExperienceReward) * calculateAbilityBonus('exp_bonus', gameState.abilities.exp_bonus));
                    gameState.experience += experienceReward;
                   dungeonRewardItems.push({type: 'experience', count: experienceReward});
                  checkLevelUp();
             }
              if (dungeonRewards.keys){
                  const minKeyReward = dungeonRewards.keys[0];
                   const maxKeyReward = dungeonRewards.keys[1];
                  const keyReward = getRandomNumber(minKeyReward, maxKeyReward);
                  gameState.keys += keyReward;
                   dungeonRewardItems.push({type: 'keys', count: keyReward});
              }
              if(dungeonRewards.skins){
                  for(const rarity in dungeonRewards.skins){
                      const minSkins = dungeonRewards.skins[rarity][0];
                      const maxSkins = dungeonRewards.skins[rarity][1];
                      for(let i = 0; i < getRandomNumber(minSkins, maxSkins); i++){
                            const skinKey = getRandomSkinByRarity(rarity);
                            if(skinKey){
                             if(gameState.skins[skinKey]){
                                   gameState.skins[skinKey] += 1;
                                  } else {
                                     gameState.skins[skinKey] = 1;
                                 }
                                dungeonRewardItems.push({type: 'skin', item: skinKey, rarity: rarity});
                            }
                      }
                  }
               }
               if(dungeonRewards.artifacts){
                     for(const rarity in dungeonRewards.artifacts){
                      const minArtifacts = dungeonRewards.artifacts[rarity][0];
                      const maxArtifacts = dungeonRewards.artifacts[rarity][1];
                       for(let i = 0; i < getRandomNumber(minArtifacts, maxArtifacts); i++){
                             const artifactKey = getRandomArtifactByRarity(rarity);
                             if(artifactKey){
                                 if(gameState.artifacts[artifactKey]){
                                      gameState.artifacts[artifactKey] += 1;
                                 } else {
                                   gameState.artifacts[artifactKey] = 1;
                                 }
                             dungeonRewardItems.push({type: 'artifact', item: artifactKey, rarity: rarity});
                           }
                      }
                   }
             }
      }
    gameState.activeDungeon = null;
          displayMessage(`Подземелье ${gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].name} завершено, награды: ${getRewardsText(dungeonRewardItems)}`, 'green');
            updateDisplay();
          updateInventoryDisplay();
        saveData();
    };

     const getRewardsText = (items) => {
          let rewardsText = '';
          items.forEach(item => {
             if(item.type === 'diamonds'){
                  rewardsText +=  `${item.count} алмазов, `;
             } else if (item.type === 'experience') {
                  rewardsText +=  `${item.count} опыта, `;
             }else if(item.type === 'keys'){
                rewardsText += `${item.count} ключей, `;
            }else if(item.type === 'skin'){
                 rewardsText += `${gameConfig.SKIN_NAMES[item.item]} (${item.rarity}), `;
            } else if (item.type === 'artifact'){
                 rewardsText += `${gameConfig.ARTIFACT_NAMES[item.item]} (${item.rarity}), `;
            }
          });
          return rewardsText.slice(0, -2);
      };
    
    const updateDungeonButtonInfo = () => {
        Object.keys(gameConfig.DUNGEON_CONFIG).forEach(type => {
              const button = document.querySelector(`#start-${type}-dungeon`);
              if(button){
                   button.textContent = `Начать ${gameConfig.DUNGEON_CONFIG[type].name} (${gameConfig.DUNGEON_CONFIG[type].cost} алмазов)`;
              }
        });
    };
     const startNextWave = () => {
         if(gameState.dungeonState.currentWave >= gameState.dungeonState.waves.length){
              finishDungeon();
              return;
         }
          const currentWave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
        gameState.dungeonState.enemyName = currentWave.enemyName;
        gameState.dungeonState.enemyHealth = currentWave.enemyHealth;
         updateDungeonBattleUI();
    };

      const applyDungeonClick = () => {
        if(!gameState.activeDungeon) return;
         if(gameState.dungeonState.enemyHealth <= 0) {
          gameState.dungeonState.currentWave += 1;
           startNextWave();
              return;
       }
         const clickDamage =  (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
            gameState.dungeonState.enemyHealth = Math.max(0, gameState.dungeonState.enemyHealth - clickDamage);
             if (gameState.dungeonState.enemyHealth <= 0) {
                 displayMessage('Монстр повержен!', 'green');
             }
         updateDungeonBattleUI();
    };

      const updateDungeonBattleUI = () => {
        if(gameState.activeDungeon){
            elements.dungeon.enemyNameDisplay.textContent =  gameState.dungeonState.enemyName;
            elements.dungeon.playerHealthDisplay.textContent =  `Здоровье: ${gameState.dungeonState.playerHealth}`;
           elements.dungeon.enemyHealthDisplay.textContent =  `Здоровье: ${gameState.dungeonState.enemyHealth}`;
        }
     };

     const checkLevelUp = () => {
          const levelUpExp = gameConfig.LEVEL_UP_BASE_EXP * gameState.level;
          if(gameState.experience >= levelUpExp) {
             gameState.level += 1;
              gameState.experience -= levelUpExp;
               gameState.levelPoints += 1;
            displayMessage(`Уровень повышен! Теперь ${gameState.level}. Получено очко уровня.`, 'green');
           checkLevelUp();
           updateProfile();
        }
     };
    // 13. Профиль
   const updateProfile = () => {
     document.getElementById('profile-level').textContent = gameState.level;
        document.getElementById('profile-experience').textContent = gameState.experience;
       document.getElementById('profile-level-points').textContent = gameState.levelPoints;
       document.getElementById('profile-diamonds').textContent = gameState.diamonds;
       document.getElementById('profile-keys').textContent = gameState.keys;
     Object.keys(gameState.abilities).forEach(ability => {
              const abilityLevelElement = document.getElementById(`ability-${ability}-level`);
                if (abilityLevelElement) {
                    abilityLevelElement.textContent = gameState.abilities[ability];
                }
            const abilityLevelUpButton = document.getElementById(`ability-${ability}-upgrade`);
            const config = gameConfig.ABILITY_CONFIG[ability];
            if (abilityLevelUpButton && config) {
                 if(gameState.levelPoints <= 0 || gameState.abilities[ability] >= config.maxLevel){
                      abilityLevelUpButton.disabled = true;
                    } else{
                    abilityLevelUpButton.disabled = false;
                   }
                }
            });
    };

     const levelUpAbility = (ability) => {
        if(gameState.levelPoints > 0){
             gameState.levelPoints -=1;
               gameState.abilities[ability] += 1;
          updateProfile();
            saveData();
             displayMessage(`Уровень способности ${gameConfig.ABILITY_CONFIG[ability].name} улучшен!`, 'green');
        }
     };
    // 14. Инвентарь
     const updateInventoryDisplay = () => {
        const skinsDisplay = elements.inventory.skinsDisplay;
        skinsDisplay.innerHTML = '';
        for (const skinKey in gameState.skins) {
           const skinCount = gameState.skins[skinKey];
           const skinName = gameConfig.SKIN_NAMES[skinKey] || 'Неизвестный скин';
              const skinRarity = gameConfig.SKIN_RARITY[skinKey];
              const color = getColorByRarity(skinRarity);
             const skinElement = document.createElement('div');
            skinElement.textContent = `${skinName} x ${skinCount} `;
               skinElement.style.color = color;
               skinsDisplay.appendChild(skinElement);
        }
        const artifactsDisplay = elements.inventory.artifactsDisplay;
        artifactsDisplay.innerHTML = '';
         for (const artifactKey in gameState.artifacts) {
            const artifactCount = gameState.artifacts[artifactKey];
            const artifactName = gameConfig.ARTIFACT_NAMES[artifactKey] || 'Неизвестный артефакт';
            const artifactRarity = gameConfig.ARTIFACT_RARITY[artifactKey];
              const color = getColorByRarity(artifactRarity)
            const artifactElement = document.createElement('div');
            artifactElement.textContent = `${artifactName} x ${artifactCount} `;
              artifactElement.style.color = color;
             artifactsDisplay.appendChild(artifactElement);
         }
     };
  
    // 15. Утилиты
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
     const getRandomItem = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const getRandomSkinByRarity = (rarity) => {
        const skinsWithRarity = Object.keys(gameConfig.SKIN_RARITY).filter(skinKey => gameConfig.SKIN_RARITY[skinKey] === rarity);
        if (skinsWithRarity.length === 0) return null;
        const skinKey = getRandomItem(skinsWithRarity);
        const chance = gameConfig.SKIN_RARITY_CHANCE[rarity];
        if (Math.random() <= chance){
          return skinKey
        } else {
          return null;
        }
    };

    const getRandomArtifactByRarity = (rarity) => {
        const artifactsWithRarity = Object.keys(gameConfig.ARTIFACT_RARITY).filter(artifactKey => gameConfig.ARTIFACT_RARITY[artifactKey] === rarity);
       if(artifactsWithRarity.length === 0) return null;
         const artifactKey =  getRandomItem(artifactsWithRarity);
         const chance = gameConfig.ARTIFACT_RARITY_CHANCE[rarity];
        if(Math.random() <= chance){
          return artifactKey;
        } else {
            return null;
        }
    };

   // 16. Меню и переключения
     const switchTab = (tabId) => {
         if (tabId === 'profile') {
             elements.menu.clickerContent.style.display = 'none';
               elements.menu.gameContent.style.display = 'none';
             document.getElementById('profile-container').style.display = 'flex';
                 document.querySelectorAll('.profile-tab-content').forEach(content => {
                         content.style.display = 'none';
                });
                document.getElementById('profile-info').style.display = 'block';
                 updateProfile();
                updateInventoryDisplay();
             } else {
             document.getElementById('profile-container').style.display = 'none';
          if (tabId === 'clicker') {
                elements.menu.clickerContent.style.display = 'block';
                elements.menu.gameContent.style.display = 'none';
             } else if (tabId === 'game') {
                elements.menu.clickerContent.style.display = 'none';
                  elements.menu.gameContent.style.display = 'block';
             }
           }
          
    };

  const switchProfileTab = (tabId) => {
         document.querySelectorAll('.profile-tab-content').forEach(content => {
             content.style.display = 'none';
         });
          document.getElementById(tabId).style.display = 'block';
    };

    const toggleMenu = () => {
        elements.menu.menu.classList.toggle('show');
    };
 // 17. Обработчики событий
    elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', buyClickUpgrade);
    elements.clicker.upgradeAutoButton.addEventListener('click', buyAutoClicker);
    elements.clicker.upgradeClickLevelButton.addEventListener('click', buyClickLevelUpgrade);

    elements.shop.prestigeButton.addEventListener('click', prestige);
    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);

    document.querySelectorAll('.start-expedition-button').forEach(button => {
        button.addEventListener('click', () => startExpedition(button.dataset.type));
    });
    document.querySelectorAll('.start-dungeon-button').forEach(button => {
       button.addEventListener('click', () => startDungeon(button.dataset.type));
    });
     document.getElementById('dungeon-battle-area').addEventListener('click', applyDungeonClick);
     
      elements.menu.menuButton.addEventListener('click', toggleMenu);
    elements.menu.resetButton.addEventListener('click', resetGame);
    elements.menu.menuItems.forEach(item => {
        item.addEventListener('click', () => {
           switchTab(item.dataset.tab);
             toggleMenu();
        });
    });
    document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.addEventListener('click', () => switchProfileTab(tab.dataset.tab));
    });
       Object.keys(gameConfig.ABILITY_CONFIG).forEach(ability => {
              const button = document.getElementById(`ability-${ability}-upgrade`);
               if (button) {
                 button.addEventListener('click', () => levelUpAbility(ability));
                }
            });
   // 18. Запуск игры
   loadGame();
   updateDisplay();
   startAutoSave();
});