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
                baseValue: 1.0,
                increment: 0.5,
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
        dungeonFinished: false
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
        elements.map.expeditionProgressDisplay.textContent = `Экспедиция ${gameConfig.EXPEDITION_TYPES[gameState.activeExpedition]}: ${progress}% (${remainingSeconds} сек. осталось)`;
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
        elements.dungeon.dungeonProgressDisplay.textContent = `Подземелье ${gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].name}: ${progress}% (${remainingSeconds} сек. осталось)`;
        updateDungeonBattleUI();
        if (remaining <= 0 && !gameState.dungeonFinished) {
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
        elements.inventory.inventoryContainer.style.display = tabId === 'profile' ? 'block' : 'none';

        if (tabId === 'profile') {
            activateProfileTabs();
        }

        updateDisplay();
    };

    const activateProfileTabs = () => {
        const profileTabButtons = document.querySelectorAll('.profile-tab-button');
        profileTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                document.querySelectorAll('.profile-tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                document.getElementById(targetTab).style.display = 'block';
                profileTabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            });
        });
    };

    // 8. Обработчики событий
    document.querySelectorAll('.expedition-button').forEach(button => {
        button.addEventListener('click', () => {
            const expeditionType = button.getAttribute('data-type');
            if (gameState.diamonds >= gameConfig.EXPEDITION_COSTS[expeditionType]) {
                startExpedition(expeditionType);
            } else {
                displayMessage('Недостаточно алмазов!', 'red');
            }
        });
    });

    document.querySelectorAll('.dungeon-button').forEach(button => {
        button.addEventListener('click', () => {
            const dungeonType = button.getAttribute('data-type');
            if (gameState.keys >= gameConfig.DUNGEON_CONFIG[dungeonType].cost) {
                startDungeon(dungeonType);
            } else {
                displayMessage('Недостаточно ключей!', 'red');
            }
        });
    });

    document.getElementById('click-button').addEventListener('click', applyClick);
    document.getElementById('upgrade-click').addEventListener('click', () => {
        if (gameState.diamonds >= gameState.clickUpgradeCost) {
            gameState.diamonds -= gameState.clickUpgradeCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeCost = Math.floor(gameState.clickUpgradeCost * 1.5);
            updateDisplay();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    });

    document.getElementById('upgrade-auto').addEventListener('click', () => {
        if (gameState.diamonds >= gameState.autoUpgradeCost) {
            gameState.diamonds -= gameState.autoUpgradeCost;
            gameState.autoClickerValue++;
            gameState.autoUpgradeCost = Math.floor(gameState.autoUpgradeCost * 1.5);
            updateDisplay();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    });

    document.getElementById('upgrade-click-level').addEventListener('click', () => {
        if (gameState.diamonds >= gameState.clickUpgradeLevelCost) {
            gameState.diamonds -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevelCost = Math.floor(gameState.clickUpgradeLevelCost * 1.5);
            gameState.clickUpgradeLevel++;
            updateDisplay();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    });

    document.getElementById('prestige-button').addEventListener('click', () => {
        if (gameState.diamonds >= gameState.prestigeCost) {
            gameState.diamonds -= gameState.prestigeCost;
            gameState.prestigeLevel++;
            gameState.prestigeCost *= 1.5;
            gameState.clickValue *= gameState.prestigeMultiplier;
            gameState.autoClickerValue *= gameState.prestigeMultiplier;
            updateDisplay();
            displayMessage('Престиж успешно активирован!', 'gold', '1.2em');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    });

    document.getElementById('reset-button').addEventListener('click', resetGame);

    // 9. Функции для экспедиций
    const startExpedition = (expeditionType) => {
        const config = gameConfig.EXPEDITION_CONFIG[expeditionType];
        if (!config) return;
        gameState.activeExpedition = expeditionType;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = config.duration;
        gameState.expeditionReward = config.reward;
        startExpeditionTimer();
        displayMessage(`Экспедиция "${config.name}" запущена`, 'green', '1.2em');
    };

    const startExpeditionTimer = () => {
        if (gameState.expeditionInterval) {
            clearInterval(gameState.expeditionInterval);
        }
        gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
    };

    const finishExpedition = () => {
        clearInterval(gameState.expeditionInterval);
        gameState.expeditionInterval = null;
        gameState.activeExpedition = null;
        gameState.diamonds += gameState.expeditionReward;
        updateDisplay();
        displayMessage(`Экспедиция завершена! Получено ${gameState.expeditionReward} алмазов`, 'gold', '1.2em');
    };

    // 10. Функции для подземелий
    const startDungeon = (dungeonType) => {
        const config = gameConfig.DUNGEON_CONFIG[dungeonType];
        if (!config) return;
        if (gameState.keys < config.cost) {
            displayMessage('Недостаточно ключей!', 'red');
            return;
        }
        gameState.activeDungeon = dungeonType;
        gameState.dungeonStartTime = Date.now();
        gameState.dungeonDuration = config.duration;
        gameState.dungeonRewards = config.rewards;
        gameState.dungeonState = {
            currentWave: 0,
            playerHealth: 100,
            enemyHealth: 100,
            enemyName: null,
            waves: config.waves,
        };
        startDungeonTimer();
        openDungeonBattleModal();
    };

    const startDungeonTimer = () => {
        if (gameState.dungeonInterval) {
            clearInterval(gameState.dungeonInterval);
        }
        gameState.dungeonInterval = setInterval(updateDungeonProgressBar, 1000);
    };

    const finishDungeon = (success) => {
        clearInterval(gameState.dungeonInterval);
        gameState.dungeonInterval = null;
        gameState.activeDungeon = null;
        gameState.dungeonStartTime = null;
        gameState.dungeonDuration = 0;
        gameState.dungeonRewards = null;
        gameState.dungeonFinished = true;
        if (success) {
            const [minDiamonds, maxDiamonds] = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].diamonds;
            const [minKeys, maxKeys] = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].keys;
            const [minExp, maxExp] = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].experience;
            const [minArtifacts, maxArtifacts] = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].artifacts;

            const diamondBonus = calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus);
            const luckBonus = calculateAbilityBonus('dungeon_luck', gameState.abilities.dungeon_luck);

            gameState.diamonds += Math.floor(Math.random() * (maxDiamonds - minDiamonds + 1)) + minDiamonds * diamondBonus;
            gameState.keys += Math.floor(Math.random() * (maxKeys - minKeys + 1)) + minKeys * luckBonus;
            gameState.experience += Math.floor(Math.random() * (maxExp - minExp + 1)) + minExp * luckBonus;

            updateDisplay();
            closeDungeonBattleModal();
            displayMessage(`Подземелье завершено! Получено ${gameState.diamonds} алмазов, ${gameState.keys} ключей, ${gameState.experience} опыта`, 'gold', '1.2em');
        } else {
            displayMessage('Вы проиграли подземелье!', 'red');
        }
    };

    const updateDungeonBattleUI = () => {
        const currentWave = gameState.dungeonState.currentWave;
        const currentWaveConfig = gameState.dungeonState.waves[currentWave];
        elements.dungeon.enemyNameDisplay.textContent = `Враг: ${currentWaveConfig.enemyName}`;
        elements.dungeon.enemyHealthDisplay.textContent = `Здоровье врага: ${currentWaveConfig.enemyHealth}`;
        elements.dungeon.playerHealthDisplay.textContent = `Здоровье: ${gameState.dungeonState.playerHealth}`;
    };

    const updateExpeditionButtonInfo = () => {
        const expeditionButtons = document.querySelectorAll('.expedition-button');
        expeditionButtons.forEach(button => {
            const type = button.getAttribute('data-type');
            const cost = gameConfig.EXPEDITION_COSTS[type];
            button.textContent = `Экспедиция ${gameConfig.EXPEDITION_TYPES[type]} (Цена: ${cost}💎)`;
        });
    };

    const updateDungeonButtonInfo = () => {
        const dungeonButtons = document.querySelectorAll('.dungeon-button');
        dungeonButtons.forEach(button => {
            const type = button.getAttribute('data-type');
            const cost = gameConfig.DUNGEON_CONFIG[type].cost;
            button.textContent = `Подземелье ${gameConfig.DUNGEON_CONFIG[type].name} (Цена: ${cost}🔑)`;
        });
    };

    // 11. Обновление UI для инвентаря
    const updateInventoryDisplay = () => {
        const skinsContainer = document.getElementById('skins-display');
        const artifactsContainer = document.getElementById('artifacts-display');

        skinsContainer.innerHTML = '';
        artifactsContainer.innerHTML = '';

        for (const [skinId, count] of Object.entries(gameState.skins)) {
            const skin = gameConfig.SKIN_NAMES[skinId];
            const rarity = gameConfig.SKIN_RARITY[skinId];
            const skinItem = document.createElement('div');
            skinItem.className = 'skin-item';
            skinItem.innerHTML = `
                <img src="https://via.placeholder.com/60" alt="${skin}">
                <span>${skin} (${rarity}) x${count}</span>
            `;
            skinsContainer.appendChild(skinItem);
        }

        for (const [artifactId, count] of Object.entries(gameState.artifacts)) {
            const artifact = gameConfig.ARTIFACT_NAMES[artifactId];
            const rarity = gameConfig.ARTIFACT_RARITY[artifactId];
            const artifactItem = document.createElement('div');
            artifactItem.className = 'artifact-item';
            artifactItem.innerHTML = `
                <img src="https://via.placeholder.com/60" alt="${artifact}">
                <span>${artifact} (${rarity}) x${count}</span>
            `;
            artifactsContainer.appendChild(artifactItem);
        }
    };

    // 12. Обработчик атаки в подземелье
    document.getElementById('modal-player-attack').addEventListener('click', () => {
        if (gameState.dungeonFinished) return;
        const currentWave = gameState.dungeonState.currentWave;
        const currentWaveConfig = gameState.dungeonState.waves[currentWave];
        const damage = gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins) * calculateAbilityBonus('dungeon_luck', gameState.abilities.dungeon_luck);
        currentWaveConfig.enemyHealth -= damage;
        gameState.dungeonState.enemyHealth = currentWaveConfig.enemyHealth;

        const log = document.getElementById('battle-log');
        log.innerHTML += `<p>Вы нанесли ${damage} урона ${currentWaveConfig.enemyName}.</p>`;

        if (currentWaveConfig.enemyHealth <= 0) {
            gameState.dungeonState.currentWave++;
            if (gameState.dungeonState.currentWave < gameState.dungeonState.waves.length) {
                const nextWave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
                gameState.dungeonState.enemyHealth = nextWave.enemyHealth;
                gameState.dungeonState.enemyName = nextWave.enemyName;
                log.innerHTML += `<p>Враг ${gameState.dungeonState.enemyName} уничтожен. Следующая волна.</p>`;
            } else {
                finishDungeon(true);
                log.innerHTML += `<p>Вы победили в подземелье!</p>`;
            }
        } else {
            log.innerHTML += `<p>Враг ${currentWaveConfig.enemyName} имеет ${currentWaveConfig.enemyHealth} здоровья.</p>`;
        }

        updateDungeonBattleUI();
    });

    // 13. Загрузка игры
    loadGame();

    // 14. Обработчик клика по меню
    document.getElementById('menu-toggle').addEventListener('click', () => {
        const menu = document.getElementById('menu-items');
        menu.classList.toggle('open');
    });

    // 15. Обработчик открытия сундука
    document.getElementById('open-chest-button').addEventListener('click', () => {
        if (gameState.chests.common + gameState.chests.rare + gameState.chests.epic === 0) {
            displayMessage('У вас нет сундуков!', 'red');
            return;
        }
        const chestType = ['common', 'rare', 'epic'][Math.floor(Math.random() * 3)];
        const chest = document.getElementById('chest-container');
        chest.style.display = 'block';

        const reward = Math.floor(Math.random() * 100) + 1;
        if (reward <= 50) {
            const skinType = Object.keys(gameConfig.SKIN_RARITY_CHANCE)[Math.floor(Math.random() * 3)];
            const skinId = Object.keys(gameConfig.SKIN_RARITY).find(key => gameConfig.SKIN_RARITY[key] === skinType);
            gameState.skins[skinId] = (gameState.skins[skinId] || 0) + 1;
            displayMessage(`Вы получили скин: ${gameConfig.SKIN_NAMES[skinId]}`, 'gold', '1.2em');
        } else {
            const artifactType = Object.keys(gameConfig.ARTIFACT_RARITY_CHANCE)[Math.floor(Math.random() * 3)];
            const artifactId = Object.keys(gameConfig.ARTIFACT_RARITY).find(key => gameConfig.ARTIFACT_RARITY[key] === artifactType);
            gameState.artifacts[artifactId] = (gameState.artifacts[artifactId] || 0) + 1;
            displayMessage(`Вы получили артефакт: ${gameConfig.ARTIFACT_NAMES[artifactId]}`, 'gold', '1.2em');
        }

        updateInventoryDisplay();
        updateChestDisplay();
    });

    // 16. Обработчик закрытия сундука
    document.getElementById('close-chest-button').addEventListener('click', () => {
        document.getElementById('chest-container').style.display = 'none';
    });
});
