
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
           ABILITY_UPGRADES: {
           'diamond_bonus': {
             name: 'Увеличение алмазов',
             description: 'Увеличивает количество алмазов за экспедицию',
              baseCost: 1,
              costIncrease: 1.5,
              maxLevel: 10,
              effect: 0.02,
                stateKey:'diamondBonus',
           },
          'experience_bonus': {
             name: 'Увеличение опыта',
              description: 'Увеличивает количество получаемого опыта',
              baseCost: 1,
             costIncrease: 1.5,
             maxLevel: 10,
              effect: 0.02,
             stateKey:'experienceBonus',
            },
           'click_bonus': {
               name: 'Увеличение силы клика',
               description: 'Увеличивает силу клика',
              baseCost: 2,
               costIncrease: 1.8,
              maxLevel: 10,
               effect: 0.05,
                 stateKey:'clickBonus',
           },
           'expedition_speed': {
               name: 'Ускорение экспедиций',
                description: 'Ускоряет экспедиции',
              baseCost: 2,
               costIncrease: 1.8,
              maxLevel: 10,
              effect: 0.05,
                stateKey:'expeditionSpeed',
           },
              'luck_bonus': {
              name: 'Увеличение удачи',
                description: 'Увеличивает шанс выпадения редких предметов',
               baseCost: 2,
              costIncrease: 1.8,
               maxLevel: 10,
                effect: 0.05,
               stateKey:'luckBonus',
          }
        }
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
         diamondBonusLevel: 0,
       experienceBonusLevel: 0,
        clickBonusLevel: 0,
       expeditionSpeedLevel: 0,
          luckBonusLevel:0,
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

    // 7. Игровые механики
     const applyClick = () => {
        const clickBonus = 1 + gameState.clickBonusLevel * gameConfig.ABILITY_UPGRADES['click_bonus'].effect;
        gameState.clickCount += (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins) * clickBonus) * gameState.prestigeMultiplier;
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
            diamondBonusLevel: 0,
            experienceBonusLevel: 0,
             clickBonusLevel: 0,
            expeditionSpeedLevel: 0,
            luckBonusLevel: 0,
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
    elements.inventory.inventoryContainer.style.display = (tabId === 'profile') ? 'block' : 'none';

    if (tabId === 'profile') {
        const profileInfo = document.getElementById('profile-info');
        const profileInventory = document.getElementById('profile-inventory');
        const profileAbilities = document.getElementById('profile-abilities');
        const profileContainer = document.getElementById('profile-container');

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
                profileTabButtons.forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                if(tab === 'profile-abilities'){
                   updateAbilityUpgradesDisplay()
                }
            });
        });
        updateProfile();
        updateInventoryDisplay();
    } else {
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

    const profileModal = document.getElementById('profile-modal');
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
        const speedBonus = 1 - gameState.expeditionSpeedLevel * gameConfig.ABILITY_UPGRADES['expedition_speed'].effect
        gameState.expeditionDuration = Math.round(gameConfig.EXPEDITION_DURATIONS[type] * speedBonus);
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
        const diamondBonus = 1 + gameState.diamondBonusLevel * gameConfig.ABILITY_UPGRADES['diamond_bonus'].effect;
       const diamondGain = Math.round(reward * calculateDiamondBonus(gameState.artifacts) * diamondBonus);
        gameState.diamonds += diamondGain;
        const expeditionType = gameState.activeExpedition;
        gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
         const experienceBonus = 1 + gameState.experienceBonusLevel * gameConfig.ABILITY_UPGRADES['experience_bonus'].effect
        const expGain = Math.round(diamondGain * 0.25 * (gameState.level + 1)* experienceBonus);
        gameState.experience += expGain;
       displayMessage(`Экспедиция "${gameConfig.EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${diamondGain} алмазов и ${expGain} опыта`, 'gold', '1.2em');
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
        if(type === 'skins'){
          if(gameState.skins[item]){
               gameState.skins[item] += 1;
              displayMessage(`Выпал предмет: ${gameConfig.SKIN_NAMES[item]} x${gameState.skins[item]}`, 'green');
             return `${gameConfig.SKIN_NAMES[item]} x${gameState.skins[item]}`;
          }else{
             gameState.skins[item] = 1;
              displayMessage(`Выпал предмет: ${gameConfig.SKIN_NAMES[item]}`, 'green');
            return gameConfig.SKIN_NAMES[item];
           }

         } else if (type === 'artifacts') {
             if(gameState.artifacts[item]){
               gameState.artifacts[item] += 1;
                 displayMessage(`Выпал предмет: ${gameConfig.ARTIFACT_NAMES[item]} x${gameState.artifacts[item]}`, 'green');
                return `${gameConfig.ARTIFACT_NAMES[item]} x${gameState.artifacts[item]}`;
             }else{
                 gameState.artifacts[item] = 1;
                 displayMessage(`Выпал предмет: ${gameConfig.ARTIFACT_NAMES[item]}`, 'green');
                 return gameConfig.ARTIFACT_NAMES[item];
             }
        }

    return item;
};

    const updateProfile = () => {
       const profileInfo = document.getElementById('profile-info');
        if (!profileInfo) return;
        profileInfo.innerHTML = `
            <p>Уровень: ${gameState.level}</p>
            <p>Опыт: ${gameState.experience}</p>
            <p>Очки уровня: ${gameState.levelPoints}</p>
        `;
    };

    const updateInventoryDisplay = () => {
         const skinsDisplay = document.getElementById('skins-display');
         const artifactsDisplay = document.getElementById('artifacts-display');

        if(!skinsDisplay || !artifactsDisplay){
            return;
        }
           skinsDisplay.innerHTML = '<h3>Скины</h3>';
        for (const skin in gameState.skins) {
            const skinItem = document.createElement('div');
           skinItem.textContent = `${gameConfig.SKIN_NAMES[skin]} x${gameState.skins[skin]}`;
            skinsDisplay.appendChild(skinItem);
        }
         artifactsDisplay.innerHTML = '<h3>Артефакты</h3>';
        for (const artifact in gameState.artifacts) {
            const artifactItem = document.createElement('div');
           artifactItem.textContent = `${gameConfig.ARTIFACT_NAMES[artifact]} x${gameState.artifacts[artifact]}`;
            artifactsDisplay.appendChild(artifactItem);
        }
    };

    const buyAbilityUpgrade = (abilityKey) => {
            const ability = gameConfig.ABILITY_UPGRADES[abilityKey];
            if (!ability) {
                displayMessage('Неизвестная способность!', 'red');
                return;
            }
            const currentLevel = gameState[`${ability.stateKey}Level`] || 0;
            if (currentLevel >= ability.maxLevel) {
                displayMessage('Максимальный уровень способности!', 'red');
                return;
            }
            const cost = Math.round(ability.baseCost * Math.pow(ability.costIncrease, currentLevel));

            if (gameState.levelPoints >= cost) {
                gameState.levelPoints -= cost;
               gameState[`${ability.stateKey}Level`] = currentLevel + 1;
               updateAbilityUpgradesDisplay();
                updateProfile();
                saveData();
                displayMessage(`Улучшение "${ability.name}" куплено!`, 'green');
             } else {
                displayMessage(`Недостаточно очков уровня! (нужно ${cost})`, 'red');
            }
    };

 const updateAbilityUpgradesDisplay = () => {
      const abilitiesContainer = document.getElementById('abilities-display');
       abilitiesContainer.innerHTML = '';
        for (const key in gameConfig.ABILITY_UPGRADES) {
            const ability = gameConfig.ABILITY_UPGRADES[key];
            const currentLevel = gameState[`${ability.stateKey}Level`] || 0;
            const cost = Math.round(ability.baseCost * Math.pow(ability.costIncrease, currentLevel));

            const abilityDiv = document.createElement('div');
            abilityDiv.classList.add('ability-upgrade');

            const abilityInfo = document.createElement('div');
           abilityInfo.innerHTML = `
           <h3>${ability.name} (${currentLevel}/${ability.maxLevel})</h3>
           <p>${ability.description}</p>
           <p>Цена: ${cost}</p>
            `;
           abilityDiv.appendChild(abilityInfo);


           const buyButton = document.createElement('button');
           buyButton.textContent = 'Купить';
            buyButton.addEventListener('click', () => buyAbilityUpgrade(key));
            if (currentLevel >= ability.maxLevel) {
                buyButton.disabled = true;
            }
           abilityDiv.appendChild(buyButton);

            abilitiesContainer.appendChild(abilityDiv);
         }
    };
    let autoSaveInterval;
     const setupAutoSave = () => {
       autoSaveInterval = setInterval(saveData, 5000);
    };

    const clearAutoSave = () => {
       clearInterval(autoSaveInterval);
    };
    setupAutoSave();
    loadGame();

    elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', () => {
         if (gameState.clickCount >= gameState.clickUpgradeCost) {
                gameState.clickCount -= gameState.clickUpgradeCost;
                gameState.clickValue += 0.5;
                gameState.clickUpgradeCost *= 2;
             updateDisplay();
             saveData();
              displayMessage('Улучшение клика куплено!', 'green');
        } else {
             displayMessage('Недостаточно кликов!', 'red');
        }
    });
     elements.clicker.upgradeAutoButton.addEventListener('click', () => {
         if (gameState.clickCount >= gameState.autoUpgradeCost) {
             gameState.clickCount -= gameState.autoUpgradeCost;
             gameState.autoClickerValue++;
              gameState.autoUpgradeCost *= 2;
            startAutoClicker();
            updateDisplay();
             saveData();
              displayMessage('Куплен авто кликер!', 'green');
           } else {
              displayMessage('Недостаточно кликов!', 'red');
          }
      });
    elements.clicker.upgradeClickLevelButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
             gameState.clickUpgradeLevelCost *= 2;
           updateDisplay();
           saveData();
            displayMessage('Уровень клика улучшен!', 'green');
        } else {
           displayMessage('Недостаточно кликов!', 'red');
       }
   });
    elements.shop.prestigeButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier = calculatePrestigeBonus(gameState.artifacts);
             gameState.prestigeCost *= 5
              updateDisplay();
             saveData();
             displayMessage('Совершен престиж!', 'gold', '1.2em');
         } else {
              displayMessage('Недостаточно кликов!', 'red');
           }
       });

     elements.shop.buyKeyButton.addEventListener('click', buyKey);
      elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);

    elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
       button.addEventListener('click', () => startExpedition(button.dataset.type));
    });

    elements.menu.menuButton.addEventListener('click', () => {
          elements.menu.menu.classList.toggle('active');
    });
    elements.menu.menuItems.forEach(item => {
         item.addEventListener('click', () => switchTab(item.dataset.tab));
    });
    elements.menu.resetButton.addEventListener('click', resetGame);
});
