
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
                isAttacking: false, // Флаг, чтобы избежать одновременных атак
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
        dungeonBattleArea: document.getElementById('dungeon-battle-area'),
        enemyNameDisplay: document.getElementById('enemy-name'),
        playerHealthDisplay: document.getElementById('player-health'),
        enemyHealthDisplay: document.getElementById('enemy-health'),
        dungeonBattleModal: document.getElementById('dungeon-battle-modal'), // Получаем модальное окно
         playerAttackButton: document.getElementById('player-attack'), // Получаем кнопку атаки игрока
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

    // Код для открытия модального окна
    const openDungeonBattleModal = () => {
         elements.dungeon.dungeonBattleModal.style.display = 'block';
         elements.dungeon.playerAttackButton.disabled = false; // Разрешаем атаковать в начале волны
    };

    // Код для закрытия модального окна
     const closeDungeonBattleModal = () => {
        elements.dungeon.dungeonBattleModal.style.display = 'none';
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
                   isAttacking: false,
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
                updateDisplay();
            } catch (e) {
                console.error('Failed to load game', e);
            }
        };

        if (tWebApp) {
            tWebApp.CloudStorage.getItem(gameConfig.SAVE_KEY, (success, result) => {
                if (success) {
                    loadFromStorage({
                        getItem: () => result
                    });
                } else {
                    console.error('Failed to load data from Telegram Cloud Storage.');
                }
            });
        } else {
            loadFromStorage(localStorage);
        }
    };

    const autoSave = () => {
        saveData();
    };

    let autoSaveInterval = null;

    const startAutoSave = () => {
        if (!autoSaveInterval) {
            autoSaveInterval = setInterval(autoSave, 5000);
        }
    };

    const clearAutoSave = () => {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    };

    // 8. Улучшения
    const upgradeClick = () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue++;
            gameState.clickUpgradeCost = Math.ceil(gameState.clickUpgradeCost * 1.15);
            updateDisplay();
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
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const upgradeClickLevel = () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeLevelCost = Math.ceil(gameState.clickUpgradeLevelCost * 1.2);
            updateDisplay();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const applyPrestige = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier *= (1.1 * calculatePrestigeBonus(gameState.artifacts));
            gameState.clickValue = 1;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.achievements = [];
            gameState.achievementCount = 0;
            gameState.prestigeCost = Math.ceil(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.2, gameState.prestigeLevel));
            gameState.keys = 0;
            gameState.chests = {
                'common': 0,
                'rare': 0,
                'epic': 0
            };
             gameState.skins = {};
            clearAllTimeouts();
            updateDisplay();
            displayMessage('Престиж получен!', 'green', '1.5em');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

   // 9. Экспедиции
    const startExpedition = (type) => {
    if (gameState.activeExpedition) {
        displayMessage('Уже в экспедиции!', 'red');
        return;
    }

    const cost = gameConfig.EXPEDITION_COSTS[type];
    if (gameState.diamonds < cost) {
        displayMessage('Недостаточно алмазов!', 'red');
        return;
    }

    gameState.diamonds -= cost;
    gameState.activeExpedition = type;
    gameState.expeditionStartTime = Date.now();
    gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] / calculateAbilityBonus('expedition_speed', gameState.abilities['expedition_speed']);
    gameState.expeditionReward = Math.floor(Math.random() * (gameConfig.EXPEDITION_REWARDS[type][1] - gameConfig.EXPEDITION_REWARDS[type][0] + 1)) + gameConfig.EXPEDITION_REWARDS[type][0];

    updateDisplay();
    saveData();
    displayMessage(`Экспедиция ${gameConfig.EXPEDITION_TYPES[type]} началась!`, 'blue');
};

 const finishExpedition = () => {
    if (!gameState.activeExpedition) return;
    const diamondBonus = calculateAbilityBonus('diamond_bonus', gameState.abilities['diamond_bonus']);
      const expBonus = calculateAbilityBonus('exp_bonus', gameState.abilities['exp_bonus']);
    const diamondsReward = Math.ceil(gameState.expeditionReward * diamondBonus);

    gameState.diamonds += diamondsReward;
     let experienceReward = Math.ceil(gameState.expeditionReward * expBonus);
        gameState.experience += experienceReward;
        displayMessage(`Получено ${experienceReward} опыта!`, 'lime');
    levelUp();
    displayMessage(`Получено ${diamondsReward} алмазов за экспедицию!`, 'green');

    gameState.activeExpedition = null;
    gameState.expeditionStartTime = null;
    gameState.expeditionDuration = 0;
    gameState.expeditionReward = 0;

    updateDisplay();
    saveData();
};

    const updateExpeditionButtonInfo = () => {
        for (const type in gameConfig.EXPEDITION_TYPES) {
            const button = document.getElementById(`start-expedition-${type}`);
            if (button) {
                const cost = gameConfig.EXPEDITION_COSTS[type];
                button.textContent = `${gameConfig.EXPEDITION_TYPES[type]} (Стоимость: ${cost} Алмазов)`;
            }
        }
    };

    // 10. Магазин
    const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
            updateDisplay();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyChest = (rarity) => {
        const cost = (rarity === 'common') ? 1 : (rarity === 'rare') ? 3 : 5;
        if (gameState.keys >= cost) {
            gameState.keys -= cost;
            gameState.chests[rarity]++;
            updateDisplay();
        } else {
            displayMessage('Недостаточно ключей!', 'red');
        }
    };

    const openChest = () => {
        elements.shop.chestItemsDisplay.innerHTML = ''; // Очистка содержимого
        elements.shop.chestContainer.style.display = 'block';

        let totalChests = gameState.chests.common + gameState.chests.rare + gameState.chests.epic;
        if (totalChests === 0) {
            displayMessage('Нет сундуков для открытия!', 'red');
            return;
        }

        let rarity;
        if (gameState.chests.epic > 0) {
            rarity = 'epic';
            gameState.chests.epic--;
        } else if (gameState.chests.rare > 0) {
            rarity = 'rare';
            gameState.chests.rare--;
        } else {
            rarity = 'common';
            gameState.chests.common--;
        }

          const luckBonus = calculateAbilityBonus('luck_bonus', gameState.abilities['luck_bonus']);
        const rollItem = (chanceObject) => {
            let roll = Math.random();
            let cumulativeChance = 0;
            for (const item in chanceObject) {
                cumulativeChance += chanceObject[item] * luckBonus;
                if (roll < cumulativeChance) {
                    return item;
                }
            }
            return Object.keys(chanceObject)[Object.keys(chanceObject).length - 1];
        };

        const addItemToChestDisplay = (itemType, itemName) => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `Вы получили ${itemName}!`;
            elements.shop.chestItemsDisplay.appendChild(itemDiv);
        };

        const handleSkinReward = () => {
            const skinId = rollItem(gameConfig.SKIN_RARITY_CHANCE);
                const luckBonus = calculateAbilityBonus('luck_bonus', gameState.abilities['luck_bonus']);
            const skinRarity = gameConfig.SKIN_RARITY[skinId];
            const skinName = gameConfig.SKIN_NAMES[skinId] || skinId;

            if (!gameState.skins[skinId]) {
                gameState.skins[skinId] = 1;
            } else {
                gameState.skins[skinId]++;
            }
                displayMessage(`Получен скин ${skinName} (${skinRarity})`, 'skyblue');
            addItemToChestDisplay('skin', skinName);
        };

        const handleArtifactReward = () => {
            const artifactId = rollItem(gameConfig.ARTIFACT_RARITY_CHANCE);
            const luckBonus = calculateAbilityBonus('luck_bonus', gameState.abilities['luck_bonus']);
            const artifactRarity = gameConfig.ARTIFACT_RARITY[artifactId];
            const artifactName = gameConfig.ARTIFACT_NAMES[artifactId] || artifactId;
            if (!gameState.artifacts[artifactId]) {
                gameState.artifacts[artifactId] = 1;
            } else {
                gameState.artifacts[artifactId]++;
            }
                displayMessage(`Получен артефакт ${artifactId} (${artifactRarity})`, 'skyblue');
            addItemToChestDisplay('artifact', artifactName);
        };

        if (rarity === 'common') {
            handleSkinReward();
        } else if (rarity === 'rare') {
            handleSkinReward();
            if (Math.random() < 0.5) {
                handleSkinReward();
            }
        } else if (rarity === 'epic') {
            handleArtifactReward();
            if (Math.random() < 0.7) {
                handleSkinReward();
            }
        }

        updateDisplay();
        updateInventoryDisplay();
        saveData();
    };

    const closeChest = () => {
        elements.shop.chestContainer.style.display = 'none';
    };

    //11. Инвентарь
    const updateInventoryDisplay = () => {
        elements.inventory.skinsDisplay.innerHTML = '';
        elements.inventory.artifactsDisplay.innerHTML = '';

        for (const skinId in gameState.skins) {
            const skinCount = gameState.skins[skinId];
            const skinName = gameConfig.SKIN_NAMES[skinId] || skinId;
            const skinElement = document.createElement('div');
            skinElement.textContent = `${skinName}: ${skinCount}`;
            elements.inventory.skinsDisplay.appendChild(skinElement);
        }

        for (const artifactId in gameState.artifacts) {
            const artifactCount = gameState.artifacts[artifactId];
            const artifactName = gameConfig.ARTIFACT_NAMES[artifactId] || artifactId;
            const artifactElement = document.createElement('div');
            artifactElement.textContent = `${artifactName}: ${artifactCount}`;
            elements.inventory.artifactsDisplay.appendChild(artifactElement);
        }
    };

   // 12. Уровни и опыт
    const calculateLevelUpRequirement = (level) => {
        return Math.floor(gameConfig.LEVEL_UP_BASE_EXP * Math.pow(1.1, level - 1));
    };

    const levelUp = () => {
        let requiredExperience = calculateLevelUpRequirement(gameState.level);
        while (gameState.experience >= requiredExperience) {
            gameState.experience -= requiredExperience;
            gameState.level++;
            gameState.levelPoints += 3;
            displayMessage(`Уровень повышен! Теперь уровень ${gameState.level}.`, 'lime', '1.3em');
            requiredExperience = calculateLevelUpRequirement(gameState.level);
        }
        updateLevelUI();
        saveData();
    };

    const updateLevelUI = () => {
        const levelDisplay = document.getElementById('level-display');
        const experienceDisplay = document.getElementById('experience-display');
        const levelPointsDisplay = document.getElementById('level-points-display');

        levelDisplay.textContent = `Уровень: ${gameState.level}`;
        experienceDisplay.textContent = `Опыт: ${gameState.experience} / ${calculateLevelUpRequirement(gameState.level)}`;
        levelPointsDisplay.textContent = `Очки Улучшений: ${gameState.levelPoints}`;

        updateAbilityButtons();
    };

    //13. Способности
    const updateAbilityButtons = () => {
        const abilitiesContainer = document.getElementById('abilities-container');
        abilitiesContainer.innerHTML = '';

        for (const ability in gameConfig.ABILITY_CONFIG) {
            const config = gameConfig.ABILITY_CONFIG[ability];
            const abilityLevel = gameState.abilities[ability];
            const button = document.createElement('button');
            button.textContent = `${config.name} (Уровень ${abilityLevel}): ${config.description} (Стоимость: ${config.costPerLevel})`;
            button.addEventListener('click', () => upgradeAbility(ability));
            button.disabled = gameState.levelPoints < config.costPerLevel || abilityLevel >= config.maxLevel;
            abilitiesContainer.appendChild(button);
        }
    };

    const upgradeAbility = (ability) => {
        const config = gameConfig.ABILITY_CONFIG[ability];
        if (gameState.levelPoints >= config.costPerLevel && gameState.abilities[ability] < config.maxLevel) {
            gameState.levelPoints -= config.costPerLevel;
            gameState.abilities[ability]++;
            updateLevelUI();
            updateAbilityButtons();
            saveData();
        } else {
            displayMessage('Недостаточно очков или максимальный уровень!', 'red');
        }
    };

    // 14. Подземелья
    const startDungeon = (dungeonKey) => {
         const dungeonConfig = gameConfig.DUNGEON_CONFIG[dungeonKey];

        if (!dungeonConfig) {
            displayMessage('Неверный ключ подземелья!', 'red');
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
         gameState.dungeonDuration = dungeonConfig.duration / calculateAbilityBonus('dungeon_speed', gameState.abilities['dungeon_speed']);
         gameState.dungeonFinished = false; // Сбрасываем флаг завершения
          gameState.dungeonState.currentWave = 0;
        gameState.dungeonState.playerHealth = 100;
         gameState.dungeonState.waves = [...dungeonConfig.waves]; // Копируем массив волн
         gameState.dungeonState.isAttacking = false;
         startNextWave();
          openDungeonBattleModal();
        updateDisplay();
        saveData();
        displayMessage(`Вход в ${dungeonConfig.name} открыт!`, 'purple');
    };
    
    // Функция для обновления интерфейса битвы в подземелье
  const updateDungeonBattleUI = () => {
      if (!gameState.activeDungeon) return;
        const dungeonState = gameState.dungeonState;

      if (dungeonState.enemyName !== null) {
          elements.dungeon.enemyNameDisplay.textContent = `Враг: ${dungeonState.enemyName}`;
      }
        elements.dungeon.playerHealthDisplay.textContent = `Здоровье игрока: ${dungeonState.playerHealth}`;
        elements.dungeon.enemyHealthDisplay.textContent = `Здоровье врага: ${dungeonState.enemyHealth}`;
    };

    // Функция для начала следующей волны
     const startNextWave = () => {
        const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
        const currentWaveIndex = gameState.dungeonState.currentWave;

        if (currentWaveIndex < dungeonConfig.waves.length) {
            const wave = dungeonConfig.waves[currentWaveIndex];
            gameState.dungeonState.enemyName = wave.enemyName;
            gameState.dungeonState.enemyHealth = wave.enemyHealth;
              elements.dungeon.playerAttackButton.disabled = false; // Разрешаем атаковать в начале волны
            updateDungeonBattleUI();
        } else {
            // Если волн больше нет, подземелье пройдено
            finishDungeon(true); // Передаем true, чтобы указать, что подземелье пройдено
        }
    };
    
     const playerAttack = () => {
    if (gameState.dungeonState.isAttacking) return; // Проверяем, идет ли уже атака
    gameState.dungeonState.isAttacking = true; // Устанавливаем флаг атаки

    // Запрещаем повторные нажатия кнопки атаки до завершения текущей атаки
     elements.dungeon.playerAttackButton.disabled = true;

     // Получаем текущую силу атаки игрока
     let playerDamage = gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins) * gameState.prestigeMultiplier;

     // Имитируем задержку перед нанесением урона
      setTimeout(() => {
         // Наносим урон врагу
        gameState.dungeonState.enemyHealth -= playerDamage;

        // Проверяем, убит ли враг
        if (gameState.dungeonState.enemyHealth <= 0) {
            // Если враг убит, переходим к следующей волне
            gameState.dungeonState.isAttacking = false; // Сбрасываем флаг атаки
            gameState.dungeonState.currentWave++;
              displayMessage(`Враг повержен!`, 'lime');
            startNextWave(); // Начинаем следующую волну
             } else {
            // Если враг не убит, он атакует игрока
            enemyAttack();
        }
          updateDungeonBattleUI();
            elements.dungeon.playerAttackButton.disabled = false;
              gameState.dungeonState.isAttacking = false;
    }, 500); // Задержка в 500 миллисекунд (0.5 секунды)
};
    
   // Функция для атаки врага
    const enemyAttack = () => {
       const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
        const currentWaveIndex = gameState.dungeonState.currentWave;

        if (currentWaveIndex < dungeonConfig.waves.length) {
            const wave = dungeonConfig.waves[currentWaveIndex];
              // Запрещаем повторные нажатия кнопки атаки до завершения текущей атаки
            elements.dungeon.playerAttackButton.disabled = true;

            setTimeout(() => {
                // Наносим урон игроку
                gameState.dungeonState.playerHealth -= wave.attackDamage;

                // Проверяем, умер ли игрок
                if (gameState.dungeonState.playerHealth <= 0) {
                    // Если игрок умер, завершаем подземелье с поражением
                    finishDungeon(false); // Передаем false, чтобы указать, что игрок проиграл
                 } else {
                    // Если игрок не умер, разрешаем ему атаковать снова
                    elements.dungeon.playerAttackButton.disabled = false;
                }

                updateDungeonBattleUI();
            }, 500); // Задержка в 500 миллисекунд (0.5 секунды)
        }
    };

    // Функция для завершения подземелья
    const finishDungeon = (isVictory) => {
        const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
         gameState.dungeonFinished = true; // Устанавливаем флаг, что подземелье завершено

        if (isVictory) {
            displayMessage(`${dungeonConfig.name} пройдено!`, 'green', '1.5em');
              const luckBonus = calculateAbilityBonus('dungeon_luck', gameState.abilities['dungeon_luck']);
            // Выдаем награды
            for (const rewardType in dungeonConfig.rewards) {
                if (rewardType === 'diamonds') {
                    const [minDiamonds, maxDiamonds] = dungeonConfig.rewards[rewardType];
                    const diamondBonus = calculateAbilityBonus('diamond_bonus', gameState.abilities['diamond_bonus']);
                    let diamondsReward = Math.floor((Math.random() * (maxDiamonds - minDiamonds + 1) + minDiamonds) * diamondBonus);
                     gameState.diamonds += diamondsReward;
                    displayMessage(`Получено ${diamondsReward} алмазов за прохождение подземелья!`, 'green');
                } else if (rewardType === 'keys') {
                    const [minKeys, maxKeys] = dungeonConfig.rewards[rewardType];
                    const keysReward = Math.floor(Math.random() * (maxKeys - minKeys + 1) + minKeys);
                     gameState.keys += keysReward;
                   displayMessage(`Получено ${keysReward} ключей за прохождение подземелья!`, 'gold');
                }
                 else if (rewardType === 'experience') {
                   const expBonus = calculateAbilityBonus('exp_bonus', gameState.abilities['exp_bonus']);
                    const [minExp, maxExp] = dungeonConfig.rewards[rewardType];
                    let experienceReward = Math.floor((Math.random() * (maxExp - minExp + 1) + minExp) * expBonus);
                    gameState.experience += experienceReward;
                     displayMessage(`Получено ${experienceReward} опыта!`, 'lime');
                     levelUp();
                }
                else if (rewardType === 'artifacts') {
                 for (const rarity in dungeonConfig.rewards[rewardType]) {
                  const luckBonus = calculateAbilityBonus('luck_bonus', gameState.abilities['luck_bonus']);
                    if (Math.random() < luckBonus) {
                        const artifactId = rollItem(gameConfig.ARTIFACT_RARITY_CHANCE);
                       const artifactRarity = gameConfig.ARTIFACT_RARITY[artifactId];
                        const artifactName = gameConfig.ARTIFACT_NAMES[artifactId] || artifactId;
                        if (!gameState.artifacts[artifactId]) {
                            gameState.artifacts[artifactId] = 1;
                        } else {
                            gameState.artifacts[artifactId]++;
                        }
                         displayMessage(`Получен артефакт ${artifactName} (${artifactRarity})`, 'skyblue');
                      }
                  }
                }
            }
        } else {
            displayMessage(`Поражение в ${dungeonConfig.name}!`, 'red', '1.5em');
             gameState.dungeonState.playerHealth = 100; // Восстанавливаем здоровье игрока
        }

        // Закрываем модальное окно битвы
        closeDungeonBattleModal();
        // Сбрасываем активное подземелье и его состояние
        gameState.activeDungeon = null;
        gameState.dungeonStartTime = null;
        gameState.dungeonDuration = 0;
        gameState.dungeonState = {
            currentWave: 0,
            playerHealth: 100,
            enemyHealth: 100,
            enemyName: null,
            waves: [],
            isAttacking: false,
        };

        updateDisplay();
        updateInventoryDisplay();
        saveData();
    };

    const updateDungeonButtonInfo = () => {
        for (const dungeonKey in gameConfig.DUNGEON_CONFIG) {
            const dungeon = gameConfig.DUNGEON_CONFIG[dungeonKey];
            const button = document.getElementById(`start-dungeon-${dungeonKey}`);
            if (button) {
                button.textContent = `${dungeon.name} (Стоимость: ${dungeon.cost} Алмазов)`;
            }
        }
    };

    // 15. Обработчики событий
    elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', upgradeClick);
    elements.clicker.upgradeAutoButton.addEventListener('click', upgradeAutoClicker);
    elements.clicker.upgradeClickLevelButton.addEventListener('click', upgradeClickLevel);
    elements.shop.prestigeButton.addEventListener('click', applyPrestige);
    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);
    elements.dungeon.playerAttackButton.addEventListener('click', playerAttack);

    document.querySelectorAll('.start-expedition').forEach(button => {
        button.addEventListener('click', (event) => {
            const type = event.target.dataset.expeditionType;
            startExpedition(type);
        });
    });

    document.querySelectorAll('.start-dungeon').forEach(button => {
        button.addEventListener('click', (event) => {
            const dungeonKey = event.target.dataset.dungeonKey;
            startDungeon(dungeonKey);
        });
    });

    elements.menu.menuButton.addEventListener('click', () => {
        elements.menu.menu.classList.toggle('active');
    });

    elements.menu.menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target.dataset.target;
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
            elements.menu.menu.classList.remove('active');
        });
    });

    elements.menu.resetButton.addEventListener('click', () => {
        const confirmReset = confirm('Вы уверены, что хотите сбросить прогресс?');
        if (confirmReset) {
            resetGame();
        }
    });

    // 16. Инициализация
    loadGame();
    startAutoClicker();
    startAutoSave();
    updateDisplay();
    updateInventoryDisplay();
    updateLevelUI();
    updateAbilityButtons();
    updateExpeditionButtonInfo();
    updateDungeonButtonInfo();

    // Обновление прогресса экспедиции каждую секунду
    setInterval(updateExpeditionProgressBar, 1000);
    // Обновление прогресса подземелья каждую секунду
     setInterval(updateDungeonProgressBar, 1000);
});
