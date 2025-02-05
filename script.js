
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
            dungeonProgressDisplay: document.getElementById('dungeon-progress'),
            dungeonBattleArea: document.getElementById('dungeon-battle-area'), //Убрали видимость блока
          //Модальное окно
            dungeonBattleModal: document.getElementById('dungeon-battle-modal'),
            modalEnemyName: document.getElementById('modal-enemy-name'),
            modalPlayerHealth: document.getElementById('modal-player-health'),
            modalEnemyHealth: document.getElementById('modal-enemy-health'),
            modalPlayerAttack: document.getElementById('modal-player-attack'),
            battleLog: document.getElementById('battle-log'),
            closeButton: document.querySelector('.close-button'),
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
            elements.dungeon.dungeonBattleArea.style.display = 'none'; // скрываем блок, если подземелье не активно
            return;
        }
        elements.dungeon.dungeonBattleArea.style.display = 'none'; //Скрываем отображение боя
        const elapsed = Date.now() - gameState.dungeonStartTime;
        const remaining = Math.max(0, gameState.dungeonDuration - elapsed);
         const progress = Math.min(100, Math.round((elapsed / gameState.dungeonDuration) * 100));
        const remainingSeconds = Math.ceil(remaining / 1000);
         elements.dungeon.dungeonProgressDisplay.textContent = `Подземелье ${gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].name}: ${progress}%  (${remainingSeconds} сек. осталось)`;
           //updateDungeonBattleUI(); // теперь не вызываем тут

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
                      //updateDungeonBattleUI(); Закомментировано, чтобы не запускать UI до открытия модального окна
                }
                updateDisplay();
            } catch (
            console.error('Failed to load game', e);
            }
        };

        if (tWebApp) {
            tWebApp.CloudStorage.getItem(gameConfig.SAVE_KEY, (err, data) => {
                if (err) {
                    console.error('Error loading data from Telegram Cloud Storage:', err);
                } else if (data) {
                    loadFromStorage({
                        getItem: () => data
                    });
                } else {
                    gameState.clickValue = 1;
                    gameState.clickUpgradeLevel = 1;
                    updateDisplay();
                }
            });
        } else {
            loadFromStorage(localStorage);
        }
    };

    // 8. Апгрейды
    const buyClickUpgrade = () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue += 1;
            gameState.clickUpgradeCost = Math.ceil(gameState.clickUpgradeCost * 1.15);
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const buyAutoClickUpgrade = () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue += 1;
            gameState.autoUpgradeCost = Math.ceil(gameState.autoUpgradeCost * 1.15);
            updateDisplay();
            saveData();
            startAutoClicker();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const buyClickLevelUpgrade = () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel += 1;
            gameState.clickUpgradeLevelCost = Math.ceil(gameState.clickUpgradeLevelCost * 1.25);
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    // 9. Престиж
    const prestige = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.clickUpgradeLevel = 1;
            gameState.clickUpgradeLevelCost = 100;
            gameState.prestigeLevel += 1;
            gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts) + (gameState.prestigeLevel * 0.1);
            gameState.achievements = [];
            gameState.achievementCount = 0;
            gameState.diamonds += 10;
            gameState.prestigeCost = Math.ceil(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.5, gameState.prestigeLevel));
            clearInterval(gameState.autoClickerInterval);
            gameState.autoClickerInterval = null;
            updateDisplay();
            saveData();
            displayMessage('Престиж повышен!', 'green', '1.2em');
        } else {
            displayMessage('Недостаточно кликов для престижа!', 'red');
        }
    };

    // 10. Магазин
    const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys += 1;
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyChest = (rarity) => {
        const cost = {
            'common': 1,
            'rare': 3,
            'epic': 5
        };
        if (gameState.keys >= cost[rarity]) {
            gameState.keys -= cost[rarity];
            gameState.chests[rarity]++;
            updateDisplay();
            saveData();
        } else {
            displayMessage('Недостаточно ключей!', 'red');
        }
    };

    const openChest = () => {
        elements.shop.chestContainer.style.display = 'block';
        let items = [];
        for (const rarity in gameState.chests) {
            while (gameState.chests[rarity] > 0) {
                gameState.chests[rarity]--;
                let item = null;
                let random = Math.random();
                if (random < 0.5) {
                    item = getRandomSkin(rarity);
                    if (item) {
                        if (gameState.skins[item]) {
                            gameState.skins[item]++;
                        } else {
                            gameState.skins[item] = 1;
                        }
                        items.push(`<div class="chest-item skin-item" data-rarity="${gameConfig.SKIN_RARITY[item]}" data-name="${item}">Вы получили скин: ${gameConfig.SKIN_NAMES[item]} (${rarity})</div>`);
                    }
                } else {
                    item = getRandomArtifact(rarity);
                    if (item) {
                        if (gameState.artifacts[item]) {
                            gameState.artifacts[item]++;
                        } else {
                            gameState.artifacts[item] = 1;
                        }
                        items.push(`<div class="chest-item artifact-item" data-rarity="${gameConfig.ARTIFACT_RARITY[item]}" data-name="${item}">Вы получили артефакт: ${gameConfig.ARTIFACT_NAMES[item]} (${rarity})</div>`);
                    }
                }
            }
        }
        elements.shop.chestItemsDisplay.innerHTML = items.join('');
        updateDisplay();
        saveData();
    };

    const getRandomSkin = (rarity) => {
        let availableSkins = Object.keys(gameConfig.SKIN_NAMES).filter(skin => gameConfig.SKIN_RARITY[skin] === rarity);
        if (availableSkins.length === 0) return null;
        return availableSkins[Math.floor(Math.random() * availableSkins.length)];
    };

    const getRandomArtifact = (rarity) => {
        let availableArtifacts = Object.keys(gameConfig.ARTIFACT_NAMES).filter(artifact => gameConfig.ARTIFACT_RARITY[artifact] === rarity);
        if (availableArtifacts.length === 0) return null;
        return availableArtifacts[Math.floor(Math.random() * availableArtifacts.length)];
    };

    // 11. Экспедиции
    const startExpedition = (type) => {
        if (gameState.activeExpedition) {
            displayMessage('У вас уже есть активная экспедиция!', 'red');
            return;
        }
        if (gameState.diamonds < gameConfig.EXPEDITION_COSTS[type]) {
            displayMessage('Недостаточно алмазов для этой экспедиции!', 'red');
            return;
        }
        if (gameConfig.EXPEDITION_COSTS[type] > 0) {
            gameState.diamonds -= gameConfig.EXPEDITION_COSTS[type];
        }
        gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] / calculateAbilityBonus('expedition_speed', gameState.abilities.expedition_speed);
        const rewardRange = gameConfig.EXPEDITION_REWARDS[type];
        gameState.expeditionReward = Math.floor(Math.random() * (rewardRange[1] - rewardRange[0] + 1)) + rewardRange[0];
        startExpeditionTimer();
        updateDisplay();
        saveData();
        displayMessage(`Экспедиция типа ${gameConfig.EXPEDITION_TYPES[type]} началась!`, 'blue');
    };

    const startExpeditionTimer = () => {
        gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
    };

    const finishExpedition = () => {
        clearInterval(gameState.expeditionInterval);
        gameState.expeditionInterval = null;
        const diamondBonus = calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus);
        const rewardedDiamonds = Math.round(gameState.expeditionReward * diamondBonus);
        gameState.diamonds += rewardedDiamonds;
        gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
        updateDisplay();
        saveData();
        displayMessage(`Экспедиция завершена! Вы получили ${rewardedDiamonds} алмазов.`, 'green');
    };

    const updateExpeditionButtonInfo = () => {
        const expeditionButtons = document.querySelectorAll('.expedition-button');
        expeditionButtons.forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.EXPEDITION_COSTS[type];
            button.textContent = `${gameConfig.EXPEDITION_TYPES[type]} (${cost} Алмазов)`;
        });
    };
 // 12. Подземелья
    const startDungeon = (type) => {
        if (gameState.activeDungeon) {
            displayMessage('У вас уже есть активное подземелье!', 'red');
            return;
        }

        if (gameState.diamonds < gameConfig.DUNGEON_CONFIG[type].cost) {
            displayMessage('Недостаточно алмазов для этого подземелья!', 'red');
            return;
        }
        if (gameState.keys <= 0) {
            displayMessage('Недостаточно ключей для этого подземелья!', 'red');
            return;
        }

        gameState.keys -= 1;
        if (gameConfig.DUNGEON_CONFIG[type].cost > 0) {
            gameState.diamonds -= gameConfig.DUNGEON_CONFIG[type].cost;
        }

        gameState.activeDungeon = type;
        gameState.dungeonStartTime = Date.now();
        gameState.dungeonDuration = gameConfig.DUNGEON_CONFIG[type].duration / calculateAbilityBonus('dungeon_speed', gameState.abilities.dungeon_speed);
        gameState.dungeonRewards = gameConfig.DUNGEON_CONFIG[type].rewards;
        gameState.dungeonState.waves = [...gameConfig.DUNGEON_CONFIG[type].waves]; // Копируем волны
        gameState.dungeonState.currentWave = 0;
        gameState.dungeonState.playerHealth = 100;
        gameState.dungeonFinished = false; // Сбрасываем флаг

         startDungeonTimer();
        updateDisplay();
        saveData();
        displayMessage(`Подземелье ${gameConfig.DUNGEON_CONFIG[type].name} началось!`, 'purple');

    };
    const startDungeonTimer = () => {
        gameState.dungeonInterval = setInterval(() => {
            updateDungeonProgressBar();
            if (!gameState.dungeonFinished) {
                // Запускаем бой, только если подземелье не завершено
                startBattle();
            }
        }, 1000); // Обновляем UI и проверяем необходимость начать бой каждую секунду
    };
    // Функция для начала боя (теперь вызывается из таймера)
    const startBattle = () => {
        if (gameState.dungeonState.currentWave < gameState.dungeonState.waves.length) {
            // Инициализация значений для новой волны
            const currentWave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
            gameState.dungeonState.enemyName = currentWave.enemyName;
            gameState.dungeonState.enemyHealth = currentWave.enemyHealth;
            elements.dungeon.battleLog.innerHTML = ''; // Очищаем логи

            // Обновляем UI перед открытием модального окна
            updateDungeonBattleUI();
            // Показываем модальное окно
            elements.dungeon.dungeonBattleModal.style.display = 'block';
        } else {
            // Если все волны пройдены, завершаем подземелье с победой
            finishDungeon(true);
        }
    };
    const updateDungeonBattleUI = () => {
        elements.dungeon.modalEnemyName.textContent = `Враг: ${gameState.dungeonState.enemyName}`;
        elements.dungeon.modalPlayerHealth.textContent = `Здоровье игрока: ${gameState.dungeonState.playerHealth}`;
        elements.dungeon.modalEnemyHealth.textContent = `Здоровье врага: ${gameState.dungeonState.enemyHealth}`;
        elements.dungeon.modalPlayerAttack.textContent = `Урон игрока: ${gameState.clickValue}`;
    };
// Функция для завершения подземелья (победа или поражение)
    const finishDungeon = (isVictory) => {
        clearInterval(gameState.dungeonInterval);
        gameState.dungeonInterval = null;
        gameState.dungeonFinished = true; // Устанавливаем флаг завершения

        if (isVictory) {
            // Рассчитываем награды за победу
            const rewards = calculateDungeonRewards(gameState.dungeonRewards);

            gameState.diamonds += rewards.diamonds;
            gameState.keys += rewards.keys;
            gameState.experience += rewards.experience;

            for (const skin in rewards.skins) {
                if (gameState.skins[skin]) {
                    gameState.skins[skin]++;
                } else {
                    gameState.skins[skin] = 1;
                }
            }
             for (const artifact in rewards.artifacts) {
                if (gameState.artifacts[artifact]) {
                    gameState.artifacts[artifact]++;
                } else {
                    gameState.artifacts[artifact] = 1;
                }
            }
             // Увеличиваем уровень и даем поинты
            levelUp();
           // Выводим сообщение о победе и полученных наградах
            let rewardMessage = `Подземелье пройдено! Награды: ${rewards.diamonds} алмазов, ${rewards.keys} ключей, ${rewards.experience} опыта.`;
            if (Object.keys(rewards.skins).length > 0) {
                rewardMessage += ` Скины: ${Object.entries(rewards.skins).map(([skin, count]) => `${gameConfig.SKIN_NAMES[skin]} x${count}`).join(', ')}.`;
            }
             if (Object.keys(rewards.artifacts).length > 0) {
                rewardMessage += ` Артефакты: ${Object.entries(rewards.artifacts).map(([artifact, count]) => `${gameConfig.ARTIFACT_NAMES[artifact]} x${count}`).join(', ')}.`;
            }
           displayMessage(rewardMessage, 'green');
        } else {
            // Обработка поражения
            displayMessage('Вы проиграли в подземелье!', 'red');
        }

        // Обнуляем состояние подземелья
        gameState.activeDungeon = null;
        gameState.dungeonStartTime = null;
        gameState.dungeonDuration = 0;
        gameState.dungeonRewards = null;
        gameState.dungeonState = {
            currentWave: 0,
            playerHealth: 100,
            enemyHealth: 100,
             enemyName: null,
            waves: [],
        };
        gameState.dungeonFinished = false;

        updateDisplay();
        saveData();
        elements.dungeon.dungeonBattleModal.style.display = 'none'; //Скрываем модальное окно
    };
     // Функция для атаки
    const performAttack = () => {
        // Проверка, что бой идет
        if (gameState.activeDungeon && !gameState.dungeonFinished) {
            // Получаем урон игрока
            const playerDamage = gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins);

            // Вычисляем урон врага
            const enemyDamage = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].waves[gameState.dungeonState.currentWave].attackDamage;

            // Обновляем здоровье врага и игрока
            gameState.dungeonState.enemyHealth -= playerDamage;
            gameState.dungeonState.playerHealth -= enemyDamage;

            // Логируем атаку
            logBattleEvent(`Вы нанесли ${playerDamage} урона. Враг нанес ${enemyDamage} урона.`);

            // Проверяем, жив ли враг
            if (gameState.dungeonState.enemyHealth <= 0) {
                logBattleEvent(`Враг повержен!`);
                // Переходим к следующей волне
                gameState.dungeonState.currentWave++;

                // Если все волны пройдены, завершаем подземелье
                if (gameState.dungeonState.currentWave >= gameState.dungeonState.waves.length) {
                    finishDungeon(true);
                    return;
                } else {
                    // Начинаем новую волну
                    startBattle();
                }
            }

            // Проверяем, жив ли игрок
            if (gameState.dungeonState.playerHealth <= 0) {
                logBattleEvent(`Вы погибли!`);
                finishDungeon(false);
                return;
            }
            updateDungeonBattleUI();
        }
    };
// Функция для логирования событий боя
    const logBattleEvent = (event) => {
        const logEntry = document.createElement('div');
        logEntry.textContent = event;
        elements.dungeon.battleLog.appendChild(logEntry);
        elements.dungeon.battleLog.scrollTop = elements.dungeon.battleLog.scrollHeight; // Автопрокрутка
    };
    // Функция для генерации наград
    const calculateDungeonRewards = (rewardsConfig) => {
        const rewards = {
            diamonds: 0,
            keys: 0,
            experience: 0,
            skins: {},
            artifacts: {},
        };

        // Алмазы
        if (rewardsConfig.diamonds) {
            const [min, max] = rewardsConfig.diamonds;
            rewards.diamonds = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Ключи
        if (rewardsConfig.keys) {
            const [min, max] = rewardsConfig.keys;
            rewards.keys = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Опыт
        if (rewardsConfig.experience) {
            const [min, max] = rewardsConfig.experience;
            rewards.experience = Math.floor(Math.random() * (max - min + 1)) + min;
             const expBonus = calculateAbilityBonus('exp_bonus', gameState.abilities.exp_bonus);
            rewards.experience = Math.round(rewards.experience * expBonus);
        }

        // Скины
        for (const rarity in rewardsConfig.skins) {
            const [min, max] = rewardsConfig.skins[rarity];
            const count = Math.floor(Math.random() * (max - min + 1)) + min;
            for (let i = 0; i < count; i++) {
                const skin = getRandomSkin(rarity);
                if (skin) {
                    if (rewards.skins[skin]) {
                        rewards.skins[skin]++;
                    } else {
                        rewards.skins[skin] = 1;
                    }
                }
            }
        }

        // Артефакты
        for (const rarity in rewardsConfig.artifacts) {
            const [min, max] = rewardsConfig.artifacts[rarity];
            const count = Math.floor(Math.random() * (max - min + 1)) + min;
            for (let i = 0; i < count; i++) {
                const artifact = getRandomArtifact(rarity);
                if (artifact) {
                    if (rewards.artifacts[artifact]) {
                        rewards.artifacts[artifact]++;
                    } else {
                        rewards.artifacts[artifact] = 1;
                    }
                }
            }
        }

        return rewards;
    };
    const updateDungeonButtonInfo = () => {
        const dungeonButtons = document.querySelectorAll('.dungeon-button');
        dungeonButtons.forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.DUNGEON_CONFIG[type].cost;
            const dungeonName = gameConfig.DUNGEON_CONFIG[type].name;
            button.textContent = `${dungeonName} (${cost} Алмазов, 1 Ключ)`;
        });
    };
      const levelUp = () => {
        const requiredExperience = gameConfig.LEVEL_UP_BASE_EXP * gameState.level;
        if (gameState.experience >= requiredExperience) {
            gameState.experience -= requiredExperience;
            gameState.level++;
            gameState.levelPoints += 10; // или другое значение
            displayMessage(`Уровень повышен! Теперь ваш уровень ${gameState.level}`, 'blue');
            saveData(); // сохраняем данные
        }
    };

    // 13. Инвентарь
    const updateInventoryDisplay = () => {
        elements.inventory.skinsDisplay.innerHTML = '';
        elements.inventory.artifactsDisplay.innerHTML = '';

        for (const skin in gameState.skins) {
            const skinDiv = document.createElement('div');
            skinDiv.classList.add('inventory-item', 'skin-item');
            skinDiv.dataset.rarity = gameConfig.SKIN_RARITY[skin];
            skinDiv.dataset.name = skin;
            skinDiv.textContent = `${gameConfig.SKIN_NAMES[skin]} x${gameState.skins[skin]}`;
            elements.inventory.skinsDisplay.appendChild(skinDiv);
        }

        for (const artifact in gameState.artifacts) {
            const artifactDiv = document.createElement('div');
            artifactDiv.classList.add('inventory-item', 'artifact-item');
            artifactDiv.dataset.rarity = gameConfig.ARTIFACT_RARITY[artifact];
            artifactDiv.dataset.name = artifact;
            artifactDiv.textContent = `${gameConfig.ARTIFACT_NAMES[artifact]} x${gameState.artifacts[artifact]}`;
            elements.inventory.artifactsDisplay.appendChild(artifactDiv);
        }
    };

    // 14. Обработчики событий
    elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', buyClickUpgrade);
    elements.clicker.upgradeAutoButton.addEventListener('click', buyAutoClickUpgrade);
    elements.clicker.upgradeClickLevelButton.addEventListener('click', buyClickLevelUpgrade);
    elements.shop.prestigeButton.addEventListener('click', prestige);
    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', () => {
        elements.shop.chestContainer.style.display = 'none';
    });

    const expeditionButtons = document.querySelectorAll('.expedition-button');
    expeditionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            startExpedition(type);
        });
    });
      const dungeonButtons = document.querySelectorAll('.dungeon-button');
        dungeonButtons.forEach(button => {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                startDungeon(type);
            });
        });
    elements.dungeon.closeButton.addEventListener('click', () => {
        elements.dungeon.dungeonBattleModal.style.display = 'none';
    });
    // Добавляем обработчик клика на кнопку атаки
    document.getElementById('attack-button').addEventListener('click', performAttack);
    elements.menu.menuButton.addEventListener('click', () => {
        elements.menu.menu.classList.toggle('active');
    });

    elements.menu.menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = e.target.dataset.target;
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
            elements.menu.menu.classList.remove('active');
            if (target === 'inventory-content') {
                updateInventoryDisplay();
            }
        });
    });

    elements.menu.resetButton.addEventListener('click', resetGame);

    // 15. Автосохранение
    let autoSaveInterval;

    const setAutoSave = () => {
        autoSaveInterval = setInterval(saveData, 60000);
    };

    const clearAutoSave = () => {
        clearInterval(autoSaveInterval);
    };

    // Инициализация
    loadGame();
    updateDisplay();
    setAutoSave();
});

    // 16. Telegram WebApp integration
    if (tWebApp) {
        tWebApp.onEvent('themeChanged', function () {
            document.body.className = tWebApp.colorScheme;
        });
    }
});