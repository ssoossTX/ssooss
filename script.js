
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
                },
           dungeonFinished: false // Флаг, показывающий, завершено ли подземелье (победа или поражение)
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
        dungeonList: document.getElementById('dungeon-list'), // Контейнер для списка подземелий
        dungeonBattle: document.getElementById('dungeon-battle'), // Контейнер для боя
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

  // Функция updateDungeonProgressBar
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
           updateDungeonBattleUI();

         if (remaining <= 0 && !gameState.dungeonFinished) {
             // Если время вышло и подземелье еще не завершено, считаем это проигрышем
            finishDungeon(false); // Вызываем finishDungeon с признаком проигрыша
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

   // Функция для отображения боя в подземелье
    const showDungeonBattle = () => {
        elements.dungeon.dungeonList.style.display = 'none';
        elements.dungeon.dungeonBattle.style.display = 'block';
    };
   // Функция для отображения списка подземелий
    const showDungeonList = () => {
        elements.dungeon.dungeonList.style.display = 'block';
        elements.dungeon.dungeonBattle.style.display = 'none';
    };


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
                },
            dungeonFinished: false
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
            } catch (e) {
                console.error('Failed to load game', e);
                displayMessage('Не удалось загрузить сохранение', 'red');
            }
        };

        if (tWebApp && tWebApp.CloudStorage) {
            tWebApp.CloudStorage.getItem(gameConfig.SAVE_KEY, (err, data) => {
                if (err) {
                    console.error("Error getting data from Telegram Cloud Storage:", err);
                    loadFromStorage(localStorage); // Fallback to localStorage
                } else {
                    if (data) {
                        loadFromStorage({
                            getItem: () => data
                        });
                    } else {
                        loadFromStorage(localStorage);
                    }
                }
            });
        } else {
            loadFromStorage(localStorage);
        }
    };

    // 8. Кнопки улучшений
    const upgradeClickValue = () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue++;
            gameState.clickUpgradeCost = Math.ceil(gameState.clickUpgradeCost * 1.15);
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const upgradeAutoClicker = () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue++;
            gameState.autoUpgradeCost = Math.ceil(gameState.autoUpgradeCost * 1.15);
            updateDisplay();
            startAutoClicker();
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const upgradeClickLevel = () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeLevelCost = Math.ceil(gameState.clickUpgradeLevelCost * 1.20);
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    // 9. Престиж
    const prestigeGame = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts) * (1 + (gameState.prestigeLevel * 0.2));
            gameState.clickValue = 1;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.achievements = [];
            gameState.achievementCount = 0;
            gameState.skins = {};
             gameState.artifacts = {};
            gameState.keys = 0;
             gameState.level = 1;
             gameState.experience = 0;
            gameState.levelPoints = gameState.levelPoints + 5;
            gameState.clickUpgradeLevel = 1;
             gameState.clickUpgradeLevelCost = 100;
            gameState.prestigeCost = Math.ceil(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.1, gameState.prestigeLevel));

            clearInterval(gameState.autoClickerInterval);
            gameState.autoClickerInterval = null;

            updateDisplay();
            saveData();
            displayMessage('Престиж выполнен! Бонус к кликам увеличен!', 'green', '1.2em');
            updateInventoryUI();
        } else {
            displayMessage('Недостаточно кликов для престижа!', 'red');
        }
    };

    // 10. Экспедиции
    const startExpedition = (type) => {
        if (gameState.activeExpedition) {
            displayMessage('Экспедиция уже в пути!', 'red');
            return;
        }
        if (gameState.diamonds < gameConfig.EXPEDITION_COSTS[type]) {
            displayMessage('Недостаточно алмазов!', 'red');
            return;
        }

        gameState.diamonds -= gameConfig.EXPEDITION_COSTS[type];
        gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] / calculateAbilityBonus('expedition_speed', gameState.abilities.expedition_speed);
        gameState.expeditionReward = Math.floor(Math.random() * (gameConfig.EXPEDITION_REWARDS[type][1] - gameConfig.EXPEDITION_REWARDS[type][0] + 1)) + gameConfig.EXPEDITION_REWARDS[type][0];
        updateDisplay();
        startExpeditionTimer();
        saveData();
    };

    const startExpeditionTimer = () => {
        clearInterval(gameState.expeditionInterval);
        gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
    };

    const finishExpedition = () => {
        clearInterval(gameState.expeditionInterval);
        gameState.expeditionInterval = null;
        gameState.activeExpedition = null;
        gameState.clickCount += gameState.expeditionReward;
        let diamondsReward = Math.floor(Math.random() * 5) + Math.floor(5 * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus));
        gameState.diamonds += diamondsReward;
         let experienceReward = Math.floor(Math.random() * 10) + Math.floor(10 * calculateAbilityBonus('exp_bonus', gameState.abilities.exp_bonus));
        gameState.experience += experienceReward;
         checkLevelUp();
        updateDisplay();
        displayMessage(`Экспедиция завершена! Получено ${gameState.expeditionReward} кликов и ${diamondsReward} алмазов и ${experienceReward} опыта`, 'green');
        saveData();
    };

     const checkLevelUp = () => {
        while (gameState.experience >= gameConfig.LEVEL_UP_BASE_EXP * gameState.level) {
            gameState.experience -= gameConfig.LEVEL_UP_BASE_EXP * gameState.level;
            gameState.level++;
            gameState.levelPoints += 3;
            displayMessage(`Уровень повышен! Достигнут ${gameState.level} уровень.`, 'blue');
            updateDisplay();
        }
         updateLevelUI();
    };

    const updateLevelUI = () => {
    };

    const updateLevelPointsUI = () => {
    };

    const updateInventoryUI = () => {
        updateSkinsDisplay();
        updateArtifactsDisplay();
    };

     const updateSkinsDisplay = () => {
        elements.inventory.skinsDisplay.innerHTML = '';
        for (const skinId in gameState.skins) {
            const skinCount = gameState.skins[skinId];
            const skinName = gameConfig.SKIN_NAMES[skinId] || skinId; // Получаем имя скина из gameConfig
             const rarity = gameConfig.SKIN_RARITY[skinId] || 'common'; // Получаем редкость скина

            const skinDiv = document.createElement('div');
            skinDiv.className = 'skin-item';
            skinDiv.dataset.skinId = skinId;

             // Добавляем класс редкости для стилизации
            skinDiv.classList.add(rarity + '-rarity');

            const skinImage = document.createElement('img');
            skinImage.src = `img/skins/${skinId}.png`; // Путь к изображению скина
            skinImage.alt = skinName;

            const skinInfo = document.createElement('div');
            skinInfo.className = 'skin-info';
            skinInfo.innerHTML = `<strong>${skinName}</strong><br>Количество: ${skinCount}<br>`;

            skinDiv.appendChild(skinImage);
            skinDiv.appendChild(skinInfo);

            elements.inventory.skinsDisplay.appendChild(skinDiv);
        }
    };

    const updateArtifactsDisplay = () => {
        elements.inventory.artifactsDisplay.innerHTML = '';
        for (const artifactId in gameState.artifacts) {
            const artifactCount = gameState.artifacts[artifactId];
            const artifactName = gameConfig.ARTIFACT_NAMES[artifactId] || artifactId; // Получаем имя артефакта из gameConfig
            const rarity = gameConfig.ARTIFACT_RARITY[artifactId] || 'common';

             const artifactDiv = document.createElement('div');
            artifactDiv.className = 'artifact-item';
            artifactDiv.dataset.artifactId = artifactId;
              artifactDiv.classList.add(rarity + '-rarity');

            const artifactImage = document.createElement('img');
            artifactImage.src = `img/artifacts/${artifactId}.png`; // Путь к изображению артефакта
            artifactImage.alt = artifactName;

            const artifactInfo = document.createElement('div');
            artifactInfo.className = 'artifact-info';
            artifactInfo.innerHTML = `<strong>${artifactName}</strong><br>Количество: ${artifactCount}<br>`;

            artifactDiv.appendChild(artifactImage);
            artifactDiv.appendChild(artifactInfo);

            elements.inventory.artifactsDisplay.appendChild(artifactDiv);
        }
    };

    const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
            updateDisplay();
            saveData();
            displayMessage('Ключ приобретен!', 'green');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyChest = (rarity) => {
        const cost = rarity === 'common' ? 1 : (rarity === 'rare' ? 3 : 5);
        if (gameState.keys >= cost) {
            gameState.keys -= cost;
            gameState.chests[rarity]++;
            updateDisplay();
            saveData();
            displayMessage(`${rarity} сундук приобретен!`, 'green');
        } else {
            displayMessage('Недостаточно ключей!', 'red');
        }
    };

     const openChest = () => {
        // Определяем, какой сундук открываем (сначала проверяем эпические, потом редкие, потом обычные)
        let chestRarity = '';
        if (gameState.chests.epic > 0) {
            chestRarity = 'epic';
        } else if (gameState.chests.rare > 0) {
            chestRarity = 'rare';
        } else if (gameState.chests.common > 0) {
            chestRarity = 'common';
        } else {
            displayMessage('У вас нет сундуков для открытия!', 'red');
            return;
        }

        // Уменьшаем количество сундуков
        gameState.chests[chestRarity]--;
        updateDisplay();
        saveData();

        // Открываем сундук и получаем награды
        const rewards = openChestReward(chestRarity);

        // Показываем награды в интерфейсе
        displayChestItems(rewards);

        // Показываем контейнер сундука
        elements.shop.chestContainer.style.display = 'block';
    };

    const closeChest = () => {
        elements.shop.chestContainer.style.display = 'none';
        elements.shop.chestItemsDisplay.innerHTML = ''; // Очищаем содержимое контейнера
        updateInventoryUI();
    };

     const openChestReward = (chestRarity) => {
         let rewards = {};

        // Шансы выпадения для каждого типа предмета в зависимости от редкости сундука
        let itemChances = {
            'skin': chestRarity === 'epic' ? 0.7 : (chestRarity === 'rare' ? 0.5 : 0.3),
            'artifact': chestRarity === 'epic' ? 0.3 : (chestRarity === 'rare' ? 0.5 : 0.7),
            'diamond': chestRarity === 'epic' ? 0.0 : 0.0,
            'key': chestRarity === 'epic' ? 0.0 : 0.0,
        };

        // Определяем, какие предметы выпали
        for (const itemType in itemChances) {
            if (Math.random() < itemChances[itemType]) {
                switch (itemType) {
                    case 'skin':
                        const skinRarity = getRandomRarity(gameConfig.SKIN_RARITY_CHANCE);
                        const skinId = getRandomSkinIdByRarity(skinRarity);
                        if (skinId) {
                            rewards['skin'] = rewards['skin'] || {};
                            rewards['skin'][skinId] = (rewards['skin'][skinId] || 0) + 1;
                            gameState.skins[skinId] = (gameState.skins[skinId] || 0) + 1; // Add the new skin
                        }
                        break;
                    case 'artifact':
                        const artifactRarity = getRandomRarity(gameConfig.ARTIFACT_RARITY_CHANCE);
                        const artifactId = getRandomArtifactIdByRarity(artifactRarity);
                        if (artifactId) {
                            rewards['artifact'] = rewards['artifact'] || {};
                            rewards['artifact'][artifactId] = (rewards['artifact'][artifactId] || 0) + 1;
                            gameState.artifacts[artifactId] = (gameState.artifacts[artifactId] || 0) + 1; // Add the new artifact
                        }
                        break;
                    case 'diamond':
                        const diamondReward = Math.floor(Math.random() * 10) + 1;
                        rewards['diamond'] = diamondReward;
                        gameState.diamonds += diamondReward;
                        break;
                    case 'key':
                        const keyReward = Math.floor(Math.random() * 3) + 1;
                        rewards['key'] = keyReward;
                        gameState.keys += keyReward;
                        break;
                }
            }
        }

        updateDisplay();
        saveData();
        return rewards;
    };

    const getRandomRarity = (rarityChances) => {
        let random = Math.random();
        let cumulativeChance = 0;
        for (const rarity in rarityChances) {
            cumulativeChance += rarityChances[rarity];
            if (random < cumulativeChance) {
                return rarity;
            }
        }
        return 'common'; // Default to common in case of any issues
    };

    const getRandomSkinIdByRarity = (rarity) => {
        const availableSkins = Object.keys(gameConfig.SKIN_RARITY).filter(skinId => gameConfig.SKIN_RARITY[skinId] === rarity);
        if (availableSkins.length === 0) return null;
        return availableSkins[Math.floor(Math.random() * availableSkins.length)];
    };

    const getRandomArtifactIdByRarity = (rarity) => {
        const availableArtifacts = Object.keys(gameConfig.ARTIFACT_RARITY).filter(artifactId => gameConfig.ARTIFACT_RARITY[artifactId] === rarity);
        if (availableArtifacts.length === 0) return null;
        return availableArtifacts[Math.floor(Math.random() * availableArtifacts.length)];
    };

    const displayChestItems = (rewards) => {
        elements.shop.chestItemsDisplay.innerHTML = ''; // Clear previous items

        for (const itemType in rewards) {
            switch (itemType) {
                case 'skin':
                    for (const skinId in rewards[itemType]) {
                        const skinCount = rewards[itemType][skinId];
                        const skinName = gameConfig.SKIN_NAMES[skinId] || skinId;
                         const rarity = gameConfig.SKIN_RARITY[skinId] || 'common'; // Получаем редкость скина

                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'chest-item';

                          itemDiv.classList.add(rarity + '-rarity');

                        itemDiv.innerHTML = `<img src="img/skins/${skinId}.png" alt="${skinName}">
                                             <p>${skinName} x${skinCount}</p>`;
                        elements.shop.chestItemsDisplay.appendChild(itemDiv);
                    }
                    break;
                case 'artifact':
                    for (const artifactId in rewards[itemType]) {
                        const artifactCount = rewards[itemType][artifactId];
                        const artifactName = gameConfig.ARTIFACT_NAMES[artifactId] || artifactId;
                         const rarity = gameConfig.ARTIFACT_RARITY[artifactId] || 'common';

                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'chest-item';
                            itemDiv.classList.add(rarity + '-rarity');

                        itemDiv.innerHTML = `<img src="img/artifacts/${artifactId}.png" alt="${artifactName}">
                                             <p>${artifactName} x${artifactCount}</p>`;
                        elements.shop.chestItemsDisplay.appendChild(itemDiv);
                    }
                    break;
                case 'diamond':
                    const diamondCount = rewards[itemType];
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'chest-item';
                    itemDiv.innerHTML = `<img src="img/diamond.png" alt="Diamond">
                                         <p>Алмазы x${diamondCount}</p>`;
                    elements.shop.chestItemsDisplay.appendChild(itemDiv);
                    break;
                case 'key':
                    const keyCount = rewards[itemType];
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'chest-item';
                    itemDiv.innerHTML = `<img src="img/key.png" alt="Key">
                                         <p>Ключи x${keyCount}</p>`;
                    elements.shop.chestItemsDisplay.appendChild(itemDiv);
                    break;
            }
        }
    };

    // 11. Подземелья

    const initializeDungeonList = () => {
        const dungeonList = elements.dungeon.dungeonList;
        dungeonList.innerHTML = '';

        for (const dungeonKey in gameConfig.DUNGEON_CONFIG) {
            const dungeon = gameConfig.DUNGEON_CONFIG[dungeonKey];
            const dungeonItem = document.createElement('li');
            dungeonItem.className = 'dungeon-item';
            dungeonItem.innerHTML = `
                <button data-dungeon-key="${dungeonKey}">
                    <strong>${dungeon.name}</strong>
                    <br>Стоимость: ${dungeon.cost} алмазов
                    <br>Длительность: ${dungeon.duration / 60000} мин
                </button>
            `;
            dungeonList.appendChild(dungeonItem);

            // Add event listener to the button
            const button = dungeonItem.querySelector('button');
            button.addEventListener('click', () => startDungeon(dungeonKey));
        }
    };

   const startDungeon = (dungeonKey) => {
         const dungeonConfig = gameConfig.DUNGEON_CONFIG[dungeonKey];

        if (!dungeonConfig) {
            displayMessage('Подземелье не найдено!', 'red');
            return;
        }

        if (gameState.activeDungeon) {
            displayMessage('Вы уже в подземелье!', 'red');
            return;
        }

        if (gameState.diamonds < dungeonConfig.cost) {
            displayMessage('Недостаточно алмазов для входа!', 'red');
            return;
        }

         gameState.diamonds -= dungeonConfig.cost;
        gameState.activeDungeon = dungeonKey;
        gameState.dungeonStartTime = Date.now();
        gameState.dungeonDuration = dungeonConfig.duration / calculateAbilityBonus('dungeon_speed', gameState.abilities.dungeon_speed);
        gameState.dungeonRewards = dungeonConfig.rewards; // Сохраняем награды

         // Инициализируем состояние подземелья
        gameState.dungeonState = {
            currentWave: 0,
            playerHealth: 100,
            enemyHealth: 100,
            enemyName: null,
            waves: dungeonConfig.waves, // Копируем волны из конфигурации
        };
         gameState.dungeonFinished = false; // Сбрасываем флаг завершения

        updateDisplay();
        startDungeonTimer();
        saveData();
         showDungeonBattle();
         startNextWave();
    };

    const startDungeonTimer = () => {
        clearInterval(gameState.dungeonInterval);
        gameState.dungeonInterval = setInterval(updateDungeonProgressBar, 1000);
    };

    const finishDungeon = (victory) => {
        clearInterval(gameState.dungeonInterval);
        gameState.dungeonInterval = null;

        gameState.activeDungeon = null;
        gameState.dungeonFinished = true; // Устанавливаем флаг завершения

        updateDisplay(); // Обновляем отображение

        if (victory) {
            displayMessage('Подземелье успешно пройдено!', 'green');
             // Выдаем награды только в случае победы
            grantDungeonRewards();

        } else {
            displayMessage('Вы проиграли в подземелье!', 'red');
            // Никаких наград за проигрыш
        }

        // Сбрасываем состояние подземелья (например, здоровье игрока и врагов)
        resetDungeonState();
          showDungeonList();

        saveData();
    };

    const resetDungeonState = () => {
      gameState.dungeonState = {
            currentWave: 0,
            playerHealth: 100,
            enemyHealth: 100,
            enemyName: null,
            waves: [],
        };
    };

    // Функция для выдачи наград за прохождение подземелья
   const grantDungeonRewards = () => {
        const rewards = gameState.dungeonRewards;

        if (!rewards) {
            console.warn('Нет наград для выдачи!');
            return;
        }

        // Выдача алмазов
        if (rewards.diamonds) {
            const diamondReward = Math.floor(Math.random() * (rewards.diamonds[1] - rewards.diamonds[0] + 1)) + rewards.diamonds[0];
            gameState.diamonds += diamondReward;
            displayMessage(`Получено ${diamondReward} алмазов!`, 'lightblue');
        }

        // Выдача ключей
        if (rewards.keys) {
            const keyReward = Math.floor(Math.random() * (rewards.keys[1] - rewards.keys[0] + 1)) + rewards.keys[0];
            gameState.keys += keyReward;
            displayMessage(`Получено ${keyReward} ключей!`, 'yellow');
        }

        // Выдача опыта
        if (rewards.experience) {
             const experienceReward = Math.floor(Math.random() * (rewards.experience[1] - rewards.experience[0] + 1)) + rewards.experience[0];
            gameState.experience += experienceReward;
            checkLevelUp();
            displayMessage(`Получено ${experienceReward} опыта!`, 'lightgreen');
        }

       // Выдача артефактов
       if (rewards.artifacts) {
           for (const rarity in rewards.artifacts) {
                const [minArtifacts, maxArtifacts] = rewards.artifacts[rarity];
               const numberOfArtifacts = Math.floor(Math.random() * (maxArtifacts - minArtifacts + 1)) + minArtifacts;

               for (let i = 0; i < numberOfArtifacts; i++) {
                    const artifactId = getRandomArtifactIdByRarity(rarity);
                    if (artifactId) {
                        gameState.artifacts[artifactId] = (gameState.artifacts[artifactId] || 0) + 1;
                        displayMessage(`Получен артефакт: ${gameConfig.ARTIFACT_NAMES[artifactId]} (${rarity})!`, 'lightcoral');
                   }
              }
          }
      }

        // Выдача скинов
        if (rewards.skins) {
            for (const rarity in rewards.skins) {
                const [minSkins, maxSkins] = rewards.skins[rarity];
                const numberOfSkins = Math.floor(Math.random() * (maxSkins - minSkins + 1)) + minSkins;

                for (let i = 0; i < numberOfSkins; i++) {
                    const skinId = getRandomSkinIdByRarity(rarity);
                    if (skinId) {
                        gameState.skins[skinId] = (gameState.skins[skinId] || 0) + 1;
                        displayMessage(`Получен скин: ${gameConfig.SKIN_NAMES[skinId]} (${rarity})!`, 'lightcoral');
                    }
                }
            }
        }

        updateDisplay();
        updateInventoryUI();
        saveData();
    };

     const updateDungeonBattleUI = () => {
       if (!gameState.activeDungeon) return;

        // Получаем текущую волну из dungeonState
        const currentWave = gameState.dungeonState.currentWave;
         const wave = gameState.dungeonState.waves[currentWave];
        if (!wave) return;

          elements.dungeon.enemyNameDisplay.textContent = wave.enemyName;
         elements.dungeon.playerHealthDisplay.textContent = `Здоровье игрока: ${gameState.dungeonState.playerHealth}`;
        elements.dungeon.enemyHealthDisplay.textContent = `Здоровье врага: ${gameState.dungeonState.enemyHealth}`;
    };

    const startNextWave = () => {
        if (!gameState.activeDungeon) return;

        const waves = gameState.dungeonState.waves;
        const currentWave = gameState.dungeonState.currentWave;

        if (currentWave >= waves.length) {
            finishDungeon(true); // Вызываем finishDungeon с признаком победы
            return;
        }

        const waveConfig = waves[currentWave];
        if (!waveConfig) return;

        // Инициализируем состояние волны
        gameState.dungeonState.enemyName = waveConfig.enemyName;
        gameState.dungeonState.enemyHealth = waveConfig.enemyHealth;

        updateDungeonBattleUI();
    };

      const playerAttack = () => {
          if (!gameState.activeDungeon) return;

        // Получаем текущую волну из dungeonState
        const currentWave = gameState.dungeonState.currentWave;
        const wave = gameState.dungeonState.waves[currentWave];

        if (!wave) {
            console.error('Нет текущей волны для боя.');
            return;
        }

        // Рассчитываем урон игрока
        let playerDamage = gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins) * gameState.prestigeMultiplier;

          // Наносим урон врагу
        gameState.dungeonState.enemyHealth -= playerDamage;

        // Если у врага закончилось здоровье
        if (gameState.dungeonState.enemyHealth <= 0) {
             displayMessage(`Победили ${gameState.dungeonState.enemyName}`, 'green');
            gameState.dungeonState.currentWave++;
           startNextWave(); // Запускаем следующую волну
           return;
        }

           // Враг атакует в ответ
         enemyAttack(wave);

         updateDungeonBattleUI();
    };

    const enemyAttack = (wave) => {
      if (!gameState.activeDungeon) return;
       if (!wave) {
            console.error('Нет текущей волны для боя.');
            return;
        }

        let enemyDamage = wave.attackDamage;
        gameState.dungeonState.playerHealth -= enemyDamage;

        // Если у игрока закончилось здоровье
        if (gameState.dungeonState.playerHealth <= 0) {
            displayMessage('Ваш персонаж погиб.', 'red');
            finishDungeon(false); // Завершаем подземелье с поражением
            return;
        }
    };

    const updateDungeonButtonInfo = () => {
    };

     // 12. Интерфейс пользователя (UI)
    const initializeUI = () => {
        // Menu
        elements.menu.menuButton.addEventListener('click', () => {
            elements.menu.menu.classList.toggle('active');
            elements.menu.menuButton.classList.toggle('active');
        });

        elements.menu.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target.dataset.target;

                document.querySelectorAll('.content-section').forEach(section => {
                    section.style.display = 'none';
                });

                document.getElementById(target).style.display = 'block';
                elements.menu.menu.classList.remove('active');
                 elements.menu.menuButton.classList.remove('active');
                elements.menu.gameContent.classList.add('active');
                elements.menu.clickerContent.classList.remove('active');
            });
        });

         elements.menu.resetButton.addEventListener('click', resetGame);

        // Clicker
        elements.clicker.clickButton.addEventListener('click', applyClick);
        elements.clicker.upgradeClickButton.addEventListener('click', upgradeClickValue);
        elements.clicker.upgradeAutoButton.addEventListener('click', upgradeAutoClicker);
        elements.clicker.upgradeClickLevelButton.addEventListener('click', upgradeClickLevel);

        // Shop
        elements.shop.prestigeButton.addEventListener('click', prestigeGame);
        elements.shop.buyKeyButton.addEventListener('click', buyKey);
        elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
        elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
        elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
        elements.shop.openChestButton.addEventListener('click', openChest);
        elements.shop.closeChestButton.addEventListener('click', closeChest);

         // Dungeon

       // Назначаем обработчик клика на область боя
        elements.dungeon.dungeonBattleArea.addEventListener('click', playerAttack);

        // Назначаем обработчик клика на фон подземелья
        elements.dungeon.dungeonBattle.addEventListener('click', playerAttack);
        // Map (Expeditions)
        document.querySelectorAll('.expedition-button').forEach(button => {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                startExpedition(type);
            });
        });

        // Initial display update
        updateDisplay();
        updateInventoryUI();
        updateLevelUI();
        updateLevelPointsUI();
        updateAchievementsDisplay();
         initializeDungeonList();
    };

     const updateExpeditionButtonInfo = () => {
        document.querySelectorAll('.expedition-button').forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.EXPEDITION_COSTS[type];
            button.textContent = `${gameConfig.EXPEDITION_TYPES[type]} (Стоимость: ${cost} алмазов)`;
        });
    };

    let autoSaveInterval;

    const startAutoSave = () => {
        autoSaveInterval = setInterval(saveData, 30000); // Сохранение каждые 30 секунд
    };

    const clearAutoSave = () => {
        clearInterval(autoSaveInterval);
    };

    // Start the game
    initializeUI();
    loadGame();
    startAutoClicker();
    startAutoSave();
});
