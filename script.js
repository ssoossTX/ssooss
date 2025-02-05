
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
             dungeonBattleArea: document.getElementById('dungeon-battle-area'),
            enemyNameDisplay: document.getElementById('enemy-name'),
             playerHealthDisplay: document.getElementById('player-health'),
            enemyHealthDisplay: document.getElementById('enemy-health'),
              modal: {
                   modalElement: document.getElementById('dungeon-battle-modal'),
                   enemyName: document.getElementById('modal-enemy-name'),
                   playerHealth: document.getElementById('modal-player-health'),
                   enemyHealth: document.getElementById('modal-enemy-health'),
                   attackButton: document.getElementById('modal-player-attack'),
                   battleLog: document.getElementById('battle-log'),
                   closeButton: document.querySelector('#dungeon-battle-modal .close-button'),
               },
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

    // Функция для отображения модального окна
    const openModal = () => {
        elements.dungeon.modal.modalElement.style.display = 'block';
    };

    // Функция для скрытия модального окна
    const closeModal = () => {
        elements.dungeon.modal.modalElement.style.display = 'none';
    };

    // Функция для добавления сообщений в лог боя
    const logBattle = (message) => {
        const logEntry = document.createElement('p');
        logEntry.textContent = message;
        elements.dungeon.modal.battleLog.appendChild(logEntry);
        elements.dungeon.modal.battleLog.scrollTop = elements.dungeon.modal.battleLog.scrollHeight; // Автопрокрутка
    };

    const clearBattleLog = () => {
        elements.dungeon.modal.battleLog.innerHTML = ''; // Очистить лог
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
            console.log('Игра сохранена');
        } catch (error) {
            console.error('Ошибка сохранения игры:', error);
            displayMessage('Ошибка сохранения!', 'red');
        }
    };

    const loadData = () => {
        try {
            let savedDataString = null;
            if (tWebApp) {
                tWebApp.CloudStorage.getItem(gameConfig.SAVE_KEY, (data) => {
                    savedDataString = data;
                    if (savedDataString) {
                        try {
                            const savedData = JSON.parse(savedDataString);
                            gameState = { ...gameState, ...savedData };
                            console.log('Игра загружена из Telegram Cloud Storage');
                        } catch (parseError) {
                            console.error('Ошибка разбора данных из Telegram Cloud Storage:', parseError);
                            displayMessage('Ошибка загрузки данных!', 'red');
                        }
                    } else {
                        console.log('Нет сохраненных данных в Telegram Cloud Storage, начинаем новую игру');
                        displayMessage('Новая игра!', 'green');
                    }
                     startAutoClicker(); // Запуск автокликера после загрузки данных
                     updateDisplay(); // Обновление интерфейса после загрузки данных
                });
            } else {
                savedDataString = localStorage.getItem(gameConfig.SAVE_KEY);
                if (savedDataString) {
                    try {
                        const savedData = JSON.parse(savedDataString);
                         gameState = { ...gameState, ...savedData };
                        console.log('Игра загружена из localStorage');
                    } catch (parseError) {
                        console.error('Ошибка разбора данных из localStorage:', parseError);
                        displayMessage('Ошибка загрузки данных!', 'red');
                    }
                } else {
                    console.log('Нет сохраненных данных в localStorage, начинаем новую игру');
                    displayMessage('Новая игра!', 'green');
                }
                startAutoClicker(); // Запуск автокликера после загрузки данных
                updateDisplay(); // Обновление интерфейса после загрузки данных
            }
        } catch (error) {
            console.error('Ошибка загрузки игры:', error);
            displayMessage('Ошибка загрузки!', 'red');
        }
    };

    let autoSaveInterval;
    const startAutoSave = () => {
        autoSaveInterval = setInterval(saveData, 30000); // Автосохранение каждые 30 секунд
    };

    const clearAutoSave = () => {
        clearInterval(autoSaveInterval);
    };

    // 8. Покупка улучшений
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
      if (gameState.diamonds >= gameState.clickUpgradeLevelCost) {
            gameState.diamonds -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
           gameState.clickUpgradeLevelCost = Math.ceil(gameState.clickUpgradeLevelCost * 1.5);
            updateDisplay();
            displayMessage(`Уровень клика повышен до ${gameState.clickUpgradeLevel}!`, 'lime');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };
    
    // 9. Престиж
    const prestigeGame = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.autoClickerValue = 0;
            gameState.clickValue = 1;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts);
            gameState.prestigeCost = Math.ceil(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.5, gameState.prestigeLevel));
             clearInterval(gameState.autoClickerInterval);
             gameState.autoClickerInterval = null;
            updateDisplay();
            displayMessage('Престиж выполнен!', 'green', '1.3em');
        } else {
            displayMessage('Недостаточно кликов для престижа!', 'red');
        }
    };

    // 10. Магазин (покупка и открытие сундуков)
    const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
            updateDisplay();
            displayMessage('Ключ куплен!', 'lime');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyChest = (rarity) => {
        const chestCosts = {
            'common': 1,
            'rare': 5,
            'epic': 25
        };
        if (gameState.keys >= chestCosts[rarity]) {
            gameState.keys -= chestCosts[rarity];
            gameState.chests[rarity]++;
            updateDisplay();
            displayMessage(`${gameConfig.EXPEDITION_TYPES[rarity]} сундук куплен!`, 'lime');
        } else {
            displayMessage('Недостаточно ключей!', 'red');
        }
    };

    const openChest = () => {
        elements.shop.chestContainer.style.display = 'block';
        const chestItems = [];
        const chestRarity = Object.keys(gameState.chests).find(rarity => gameState.chests[rarity] > 0);
        if (!chestRarity) {
            displayMessage('Нет сундуков для открытия!', 'red');
            elements.shop.chestContainer.style.display = 'none';
            return;
        }

        gameState.chests[chestRarity]--;

        let reward;
        if (chestRarity === 'common') {
            reward = getRandomReward('skin');
        } else if (chestRarity === 'rare') {
            reward = getRandomReward(['skin', 'artifact'])[Math.floor(Math.random() * 2)];
        } else if (chestRarity === 'epic') {
            reward = getRandomReward('artifact');
        }

        if (reward.type === 'skin') {
            if (gameState.skins[reward.item]) {
                gameState.skins[reward.item]++;
            } else {
                gameState.skins[reward.item] = 1;
            }
            chestItems.push({ type: 'skin', item: reward.item, name: gameConfig.SKIN_NAMES[reward.item], rarity: gameConfig.SKIN_RARITY[reward.item] });
        } else if (reward.type === 'artifact') {
            if (gameState.artifacts[reward.item]) {
                gameState.artifacts[reward.item]++;
            } else {
                gameState.artifacts[reward.item] = 1;
            }
            chestItems.push({ type: 'artifact', item: reward.item, name: gameConfig.ARTIFACT_NAMES[reward.item], rarity: gameConfig.ARTIFACT_RARITY[reward.item] });
        }

        updateDisplay();

        let itemsDisplay = '';
        chestItems.forEach(item => {
            itemsDisplay += `<p>${item.name} (${item.rarity})</p>`;
        });
        elements.shop.chestItemsDisplay.innerHTML = itemsDisplay;
    };

    const closeChest = () => {
        elements.shop.chestContainer.style.display = 'none';
        updateInventoryDisplay();
        gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts);
        updateDisplay();
    };

    const getRandomReward = (type) => {
        let rarity;
        let item;

        if (type === 'skin' || (Array.isArray(type) && type.includes('skin'))) {
            rarity = getRandomRarity(gameConfig.SKIN_RARITY_CHANCE);
            const skinsOfRarity = Object.keys(gameConfig.SKIN_RARITY).filter(skin => gameConfig.SKIN_RARITY[skin] === rarity);
            item = skinsOfRarity[Math.floor(Math.random() * skinsOfRarity.length)];
            return { type: 'skin', item: item };
        } else if (type === 'artifact' || (Array.isArray(type) && type.includes('artifact'))) {
            rarity = getRandomRarity(gameConfig.ARTIFACT_RARITY_CHANCE);
            const artifactsOfRarity = Object.keys(gameConfig.ARTIFACT_RARITY).filter(artifact => gameConfig.ARTIFACT_RARITY[artifact] === rarity);
            item = artifactsOfRarity[Math.floor(Math.random() * artifactsOfRarity.length)];
            return { type: 'artifact', item: item };
        }
    };

    const getRandomRarity = (rarityChances) => {
        const rand = Math.random();
        let cumulativeProbability = 0;
        for (const rarity in rarityChances) {
            cumulativeProbability += rarityChances[rarity];
            if (rand < cumulativeProbability) {
                return rarity;
            }
        }
    };

    // 11. Экспедиции

    // Функция для запуска экспедиции
    const startExpedition = (type) => {
      if (gameState.activeExpedition) {
            displayMessage('Экспедиция уже в пути!', 'red');
            return;
        }
        if (gameState.diamonds < gameConfig.EXPEDITION_COSTS[type]) {
            displayMessage('Недостаточно алмазов для этой экспедиции!', 'red');
            return;
        }

        gameState.diamonds -= gameConfig.EXPEDITION_COSTS[type];
        gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] / calculateAbilityBonus('expedition_speed', gameState.abilities['expedition_speed']);
        gameState.expeditionReward = Math.floor(Math.random() * (gameConfig.EXPEDITION_REWARDS[type][1] - gameConfig.EXPEDITION_REWARDS[type][0] + 1)) + gameConfig.EXPEDITION_REWARDS[type][0];

        updateDisplay();
        saveData(); // Сохраняем состояние игры после начала экспедиции

        // Запускаем интервал для обновления прогресса (можно оставить, если нужен UI)
        gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
        displayMessage(`Экспедиция ${gameConfig.EXPEDITION_TYPES[type]} началась!`, 'lime');
    };

    // Функция для завершения экспедиции
    const finishExpedition = () => {
        if (!gameState.activeExpedition) {
            return;
        }
        clearInterval(gameState.expeditionInterval);
        gameState.expeditionInterval = null;
        gameState.diamonds += Math.ceil(gameState.expeditionReward * calculateDiamondBonus(gameState.artifacts) * calculateAbilityBonus('diamond_bonus', gameState.abilities['diamond_bonus']));
        let experienceReward = Math.ceil(100 * calculateAbilityBonus('exp_bonus', gameState.abilities['exp_bonus'])); // Пример награды опытом

        gameState.experience += experienceReward;
        gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
        updateDisplay();

        displayMessage(`Экспедиция завершена! Получено ${gameState.diamonds} алмазов и ${experienceReward} опыта!`, 'gold', '1.1em');
        checkLevelUp();
        saveData(); // Сохраняем состояние игры после завершения экспедиции
    };

    const updateExpeditionButtonInfo = () => {
        const expeditionButtons = document.querySelectorAll('.expedition-button');

        expeditionButtons.forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.EXPEDITION_COSTS[type];
            const name = gameConfig.EXPEDITION_TYPES[type];
            button.textContent = `${name} (${cost} алмазов)`;
        });
    };

    // 12. Подземелья
    const startDungeon = (dungeonType) => {
        if (gameState.activeDungeon) {
            displayMessage('Подземелье уже в процессе!', 'red');
            return;
        }

       if (gameState.diamonds < gameConfig.DUNGEON_CONFIG[dungeonType].cost) {
            displayMessage('Недостаточно алмазов для этого подземелья!', 'red');
            return;
        }

        gameState.diamonds -= gameConfig.DUNGEON_CONFIG[dungeonType].cost;
        gameState.activeDungeon = dungeonType;
        gameState.dungeonStartTime = Date.now();
        gameState.dungeonDuration = gameConfig.DUNGEON_CONFIG[dungeonType].duration / calculateAbilityBonus('dungeon_speed', gameState.abilities['dungeon_speed']);
        gameState.dungeonRewards = gameConfig.DUNGEON_CONFIG[dungeonType].rewards;
        gameState.dungeonState = {
            currentWave: 0,
            playerHealth: 100,
            enemyHealth: 100,
            enemyName: null,
            waves: gameConfig.DUNGEON_CONFIG[dungeonType].waves,
        };
       gameState.dungeonFinished = false; // Сбрасываем флаг завершения подземелья
        updateDungeonBattleUI(); // Инициализация UI перед началом подземелья
        elements.dungeon.dungeonBattleArea.style.display = 'block';
        updateDisplay();
        saveData();

        // Запускаем интервал для обновления прогресса
         gameState.dungeonInterval = setInterval(updateDungeonProgressBar, 1000);

        displayMessage(`Подземелье ${gameConfig.DUNGEON_CONFIG[dungeonType].name} началось!`, 'lime');
        startNextWave(); // Начинаем первую волну сразу после начала подземелья
    };

   const startNextWave = () => {
       if (gameState.dungeonState.currentWave < gameState.dungeonState.waves.length) {
            const wave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
            gameState.dungeonState.enemyName = wave.enemyName;
            gameState.dungeonState.enemyHealth = wave.enemyHealth;
            gameState.dungeonState.playerHealth = 100; // Восстанавливаем здоровье игрока в начале каждой волны
            updateDungeonBattleUI();
            displayMessage(`Волна ${gameState.dungeonState.currentWave + 1}: ${wave.enemyName} появился!`, 'yellow');
       } else {
            finishDungeon(true); // Завершаем подземелье с признаком победы, если все волны пройдены
       }
    };

    const playerAttack = () => {
        if (!gameState.activeDungeon || gameState.dungeonFinished) {
            return; // Выходим, если подземелье не активно или уже завершено
        }
        if (gameState.dungeonState.enemyHealth <= 0 || gameState.dungeonState.playerHealth <= 0) {
           return; // Выходим, если здоровье одного из участников <= 0
       }

         // Получаем урон игрока с учетом бонусов и уровня
        let playerDamage = gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities['click_bonus']);
        playerDamage = Math.round(playerDamage); // Округляем урон

        logBattle(`Вы нанесли ${playerDamage} урона ${gameState.dungeonState.enemyName}.`);
        gameState.dungeonState.enemyHealth -= playerDamage;
        updateDungeonBattleUI(); // Обновляем UI после атаки

        if (gameState.dungeonState.enemyHealth <= 0) {
            logBattle(`${gameState.dungeonState.enemyName} повержен!`);
            gameState.dungeonState.currentWave++;
            setTimeout(startNextWave, 1500); // Задержка перед началом следующей волны
            return; // Прерываем выполнение функции, чтобы избежать дальнейших действий
        }

        // Атака противника
        setTimeout(() => {
            enemyAttack();
        }, 1000); // Задержка перед атакой противника
    };

    const enemyAttack = () => {
        if (!gameState.activeDungeon || gameState.dungeonFinished) {
            return; // Выходим, если подземелье не активно или уже завершено
        }

       let enemyDamage = gameState.dungeonState.waves[gameState.dungeonState.currentWave].attackDamage;
        logBattle(`${gameState.dungeonState.enemyName} нанес вам ${enemyDamage} урона.`);
        gameState.dungeonState.playerHealth -= enemyDamage;
        updateDungeonBattleUI(); // Обновляем UI после атаки противника

        if (gameState.dungeonState.playerHealth <= 0) {
            logBattle('Вы были повержены!');
            finishDungeon(false); // Завершаем подземелье с признаком проигрыша
        }
    };

   const finishDungeon = (isVictory) => {
       clearInterval(gameState.dungeonInterval);
        gameState.dungeonInterval = null;
       gameState.dungeonFinished = true; // Устанавливаем флаг завершения подземелья

        if (isVictory) {
            displayMessage('Подземелье пройдено!', 'lime', '1.3em');
           grantDungeonRewards(); // Выдаем награды за прохождение
        } else {
             displayMessage('Вы проиграли в подземелье!', 'red', '1.3em');
        }

        // Обнуляем состояние подземелья после его завершения
        gameState.activeDungeon = null;
        gameState.dungeonStartTime = null;
        gameState.dungeonDuration = 0;
        elements.dungeon.dungeonBattleArea.style.display = 'none'; // Скрываем область боя
        updateDisplay();
        closeModal(); // Закрываем модальное окно после завершения
         clearBattleLog(); // Очищаем лог боя
        saveData();
    };

    const updateDungeonBattleUI = () => {
         if (!gameState.activeDungeon) {
            return;
        }

        elements.dungeon.modal.enemyName.textContent = gameState.dungeonState.enemyName;
        elements.dungeon.modal.playerHealth.textContent = gameState.dungeonState.playerHealth;
        elements.dungeon.modal.enemyHealth.textContent = gameState.dungeonState.enemyHealth;
        elements.dungeon.enemyNameDisplay.textContent = gameState.dungeonState.enemyName;
        elements.dungeon.playerHealthDisplay.textContent = gameState.dungeonState.playerHealth;
        elements.dungeon.enemyHealthDisplay.textContent = gameState.dungeonState.enemyHealth;
    };

    
    const grantDungeonRewards = () => {
      let diamondsReward = Math.floor(Math.random() * (gameState.dungeonRewards.diamonds[1] - gameState.dungeonRewards.diamonds[0] + 1)) + gameState.dungeonRewards.diamonds[0];
         let keysReward = Math.floor(Math.random() * (gameState.dungeonRewards.keys[1] - gameState.dungeonRewards.keys[0] + 1)) + gameState.dungeonRewards.keys[0];
         let experienceReward = Math.floor(Math.random() * (gameState.dungeonRewards.experience[1] - gameState.dungeonRewards.experience[0] + 1)) + gameState.dungeonRewards.experience[0];

        gameState.diamonds += diamondsReward;
        gameState.keys += keysReward;
        gameState.experience += experienceReward;
        checkLevelUp();

        let rewardMessage = `Получено: ${diamondsReward} алмазов, ${keysReward} ключей, ${experienceReward} опыта`;

        // Проверяем и выдаем артефакты
        if (gameState.dungeonRewards.artifacts) {
            for (const rarity in gameState.dungeonRewards.artifacts) {
                let artifactCount = Math.floor(Math.random() * (gameState.dungeonRewards.artifacts[rarity][1] - gameState.dungeonRewards.artifacts[rarity][0] + 1)) + gameState.dungeonRewards.artifacts[rarity][0];
                if (artifactCount > 0) {
                     for (let i = 0; i < artifactCount; i++) {
                       let reward = getRandomReward('artifact');
                        if (gameState.artifacts[reward.item]) {
                            gameState.artifacts[reward.item]++;
                        } else {
                             gameState.artifacts[reward.item] = 1;
                        }
                        rewardMessage += `, ${gameConfig.ARTIFACT_NAMES[reward.item]} (${rarity})`;
                   }
               }
            }
        }

        // Проверяем и выдаем скины
        if (gameState.dungeonRewards.skins) {
            for (const rarity in gameState.dungeonRewards.skins) {
                 let skinCount = Math.floor(Math.random() * (gameState.dungeonRewards.skins[rarity][1] - gameState.dungeonRewards.skins[rarity][0] + 1)) + gameState.dungeonRewards.skins[rarity][0];
                if (skinCount > 0) {
                     for (let i = 0; i < skinCount; i++) {
                        let reward = getRandomReward('skin');
                         if (gameState.skins[reward.item]) {
                            gameState.skins[reward.item]++;
                         } else {
                            gameState.skins[reward.item] = 1;
                         }
                         rewardMessage += `, ${gameConfig.SKIN_NAMES[reward.item]} (${rarity})`;
                   }
                }
            }
        }

       updateDisplay();
        updateInventoryDisplay();
        displayMessage(rewardMessage, 'gold', '1.1em');
    };


    const updateDungeonButtonInfo = () => {
        const dungeonButtons = document.querySelectorAll('.dungeon-button');

       dungeonButtons.forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.DUNGEON_CONFIG[type].cost;
            const name = gameConfig.DUNGEON_CONFIG[type].name;
             button.textContent = `${name} (${cost} алмазов)`;
        });
    };

    // 13. Уровни и способности

    const checkLevelUp = () => {
        let requiredExperience = gameConfig.LEVEL_UP_BASE_EXP * gameState.level;
        while (gameState.experience >= requiredExperience) {
            gameState.experience -= requiredExperience;
            gameState.level++;
            gameState.levelPoints += 3; // Даем 3 очка за уровень
            requiredExperience = gameConfig.LEVEL_UP_BASE_EXP * gameState.level; // Рассчитываем опыт для следующего уровня
            displayMessage(`Уровень повышен до ${gameState.level}!`, 'lime', '1.3em');
        }
        updateLevelDisplay();
    };

    const updateLevelDisplay = () => {
        document.getElementById('level-display').textContent = `Уровень: ${gameState.level}`;
        document.getElementById('level-points-display').textContent = `Очки: ${gameState.levelPoints}`;
    };

     const spendAbilityPoint = (ability) => {
         if (gameState.levelPoints > 0 && gameState.abilities[ability] < gameConfig.ABILITY_CONFIG[ability].maxLevel) {
            gameState.levelPoints--;
            gameState.abilities[ability]++;
             updateLevelDisplay(); // Обновляем отображение уровня и очков
            updateAbilityDisplay(ability); // Обновляем отображение способности
            displayMessage(`Улучшена способность "${gameConfig.ABILITY_CONFIG[ability].name}"`, 'lime');
        } else {
            displayMessage('Недостаточно очков способностей или достигнут максимальный уровень!', 'red');
        }
    };

    const updateAbilityDisplay = (ability) => {
        const abilityLevelElement = document.getElementById(`${ability}-level`);
        if (abilityLevelElement) {
            abilityLevelElement.textContent = `Уровень: ${gameState.abilities[ability]}`;
        }
    };

    // 14. Инвентарь

    const updateInventoryDisplay = () => {
        let skinsHTML = '';
        for (const skin in gameState.skins) {
            skinsHTML += `<p>${gameConfig.SKIN_NAMES[skin]} (${gameConfig.SKIN_RARITY[skin]}): ${gameState.skins[skin]}</p>`;
        }
        elements.inventory.skinsDisplay.innerHTML = skinsHTML || '<p>Нет скинов</p>';

        let artifactsHTML = '';
        for (const artifact in gameState.artifacts) {
            artifactsHTML += `<p>${gameConfig.ARTIFACT_NAMES[artifact]} (${gameConfig.ARTIFACT_RARITY[artifact]}): ${gameState.artifacts[artifact]}</p>`;
        }
        elements.inventory.artifactsDisplay.innerHTML = artifactsHTML || '<p>Нет артефактов</p>';
    };

    // 15. Меню

    const toggleMenu = () => {
        elements.menu.menu.classList.toggle('active');
        elements.menu.gameContent.classList.toggle('blur');
        elements.menu.clickerContent.classList.toggle('blur');
    };

    // 16. Слушатели событий

    // Клик
    elements.clicker.clickButton.addEventListener('click', applyClick);

    // Апгрейды
    elements.clicker.upgradeClickButton.addEventListener('click', upgradeClick);
    elements.clicker.upgradeAutoButton.addEventListener('click', upgradeAutoClicker);
      elements.clicker.upgradeClickLevelButton.addEventListener('click', upgradeClickLevel);

    // Престиж
    elements.shop.prestigeButton.addEventListener('click', prestigeGame);

    // Магазин
    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);

    // Экспедиции
    document.querySelectorAll('.expedition-button').forEach(button => {
        button.addEventListener('click', () => startExpedition(button.dataset.type));
    });

    // Подземелья
    document.querySelectorAll('.dungeon-button').forEach(button => {
        button.addEventListener('click', () => startDungeon(button.dataset.type));
    });

    // Модальное окно подземелья:
    elements.dungeon.modal.attackButton.addEventListener('click', playerAttack);
    elements.dungeon.modal.closeButton.addEventListener('click', closeModal);

    // Меню
    elements.menu.menuButton.addEventListener('click', toggleMenu);
    elements.menu.menuItems.forEach(item => {
        item.addEventListener('click', toggleMenu);
    });
    elements.menu.resetButton.addEventListener('click', resetGame);

    // Способности
     document.querySelectorAll('.ability-button').forEach(button => {
        button.addEventListener('click', () => spendAbilityPoint(button.dataset.ability));
    });

    // 17. Инициализация

    loadData();
    startAutoSave();
    updateLevelDisplay();
    updateInventoryDisplay();
    updateExpeditionButtonInfo();
    updateDungeonButtonInfo();

    // Инициализация отображения уровней способностей при загрузке
    for (const ability in gameState.abilities) {
        updateAbilityDisplay(ability);
    }
});
