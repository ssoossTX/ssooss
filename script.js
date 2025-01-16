
document.addEventListener('DOMContentLoaded', () => {
    // --- Константы ---
    const SAVE_KEY = 'clickerData';
    const EVENT_INTERVAL_MIN = 60000;
    const EVENT_INTERVAL_MAX = 120000;
    const BONUS_DURATION = 10000;
    const MESSAGE_DURATION = 3000;
    const AUTO_CLICK_INTERVAL = 1000;
    const PRESTIGE_BASE_COST = 10000;
    const EXPEDITION_DURATIONS = {
        'easy': 60000,
        'medium': 300000,
        'hard': 600000,
    };

    const EXPEDITION_TYPES = {
        'easy': 'Легкая',
        'medium': 'Средняя',
        'hard': 'Тяжелая',
    };

    // --- Состояния игры ---
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
        bonusActive: false,
        achievements: [],
        achievementCount: 0,
        autoClickerInterval: null,
        bonusTimeout: null,
        randomEventTimeout: null,
        diamonds: 0,
        activeExpedition: null,
        expeditionStartTime: null,
        expeditionDuration: 0,
        expeditionReward: 0,
        expeditionCosts: {
            'easy': 0,
            'medium': 10,
            'hard': 100,
        },
        expeditionRewards: {
            'easy': [1, 5],
            'medium': [10, 50],
            'hard': [100, 500],
        },
        prestigeCost: PRESTIGE_BASE_COST,
    };

    // --- UI элементы ---
    const elements = {
        clickCountDisplay: document.getElementById('click-count'),
        clickButton: document.getElementById('click-button'),
        upgradeClickButton: document.querySelector('#upgrade-click .buy-upgrade'),
        upgradeAutoButton: document.querySelector('#upgrade-auto .buy-upgrade'),
        upgradeClickLevelButton: document.querySelector('#upgrade-click-level .buy-upgrade'),
        clickUpgradeCostDisplay: document.getElementById('click-upgrade-cost'),
        autoUpgradeCostDisplay: document.getElementById('auto-upgrade-cost'),
        clickUpgradeLevelDisplay: document.getElementById('click-upgrade-level-display'),
        clickUpgradeLevelCostDisplay: document.getElementById('click-upgrade-level-cost'),
        messageDisplay: document.getElementById('message'),
        prestigeButton: document.getElementById('prestige-button'),
        prestigeLevelDisplay: document.getElementById('prestige-level'),
        achievementsDisplay: document.getElementById('achievements'),
        resetButton: document.getElementById('reset-button'),
        menuButton: document.querySelector('.menu-toggle'),
        menu: document.getElementById('menu-items'),
        gameContent: document.getElementById('game-content'),
        menuItems: document.querySelectorAll('.menu-items li button'),
        mapContainer: document.getElementById('map-container'),
        expeditionProgressDisplay: document.getElementById('expedition-progress'),
        diamondDisplay: document.getElementById('diamond-display'),
        prestigeCostDisplay: document.getElementById('prestige-cost'),
    };

    const tWebApp = window.Telegram && window.Telegram.WebApp;
    if (tWebApp) {
        tWebApp.ready();
    }

    // --- Обновление UI ---
    const updateDisplay = () => {
        elements.clickCountDisplay.textContent = Math.round(gameState.clickCount);
        elements.clickUpgradeCostDisplay.textContent = gameState.clickUpgradeCost;
        elements.autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost;
        elements.clickUpgradeLevelDisplay.textContent = gameState.clickUpgradeLevel;
        elements.clickUpgradeLevelCostDisplay.textContent = gameState.clickUpgradeLevelCost;
        elements.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
        elements.achievementsDisplay.textContent = `Достижения: ${gameState.achievementCount}`;
        elements.diamondDisplay.textContent = `Алмазы: ${gameState.diamonds}`;
        elements.prestigeCostDisplay.textContent = `Стоимость: ${gameState.prestigeCost}`;
        updateExpeditionProgress();
        updateExpeditionButtonInfo();
    };

    const updateExpeditionProgress = () => {
        if (!gameState.activeExpedition) {
            elements.expeditionProgressDisplay.textContent = '';
            return;
        }

        const elapsed = Date.now() - gameState.expeditionStartTime;
        const remaining = Math.max(0, gameState.expeditionDuration - elapsed);
        const progress = Math.min(100, Math.round((elapsed / gameState.expeditionDuration) * 100));
        const remainingSeconds = Math.ceil(remaining / 1000);
        elements.expeditionProgressDisplay.textContent = `Экспедиция ${EXPEDITION_TYPES[gameState.activeExpedition]}: ${progress}%  (${remainingSeconds} сек. осталось)`;

        if (remaining <= 0) {
            finishExpedition();
        }
    };

    const displayMessage = (msg, color = 'white') => {
        elements.messageDisplay.textContent = msg;
        elements.messageDisplay.style.color = color;
        setTimeout(() => {
            elements.messageDisplay.textContent = '';
        }, MESSAGE_DURATION);
    };

    // --- Основная логика игры ---
    const applyClick = () => {
        gameState.clickCount += (gameState.clickValue * gameState.clickUpgradeLevel) * gameState.prestigeMultiplier;
        updateDisplay();
        checkAchievements();
    };

    const autoClick = () => {
        gameState.clickCount += (gameState.autoClickerValue * gameState.clickUpgradeLevel) * gameState.prestigeMultiplier;
        updateDisplay();
    };

    const startAutoClicker = () => {
        if (gameState.autoClickerValue > 0 && !gameState.autoClickerInterval) {
            gameState.autoClickerInterval = setInterval(autoClick, AUTO_CLICK_INTERVAL);
        }
    };

    const applyBonus = () => {
        gameState.bonusActive = true;
        gameState.clickValue *= 2;
        gameState.autoClickerValue *= 2;
    };

    const removeBonus = () => {
        gameState.bonusActive = false;
        gameState.clickValue /= 2;
        gameState.autoClickerValue /= 2;
    };

    const handleBonusEvent = () => {
        applyBonus()
        displayMessage('Случайный бонус: удвоенный урон!', 'blue');
        updateDisplay();
        clearTimeout(gameState.bonusTimeout);
        gameState.bonusTimeout = setTimeout(() => {
            removeBonus();
            displayMessage('Действие бонуса закончилось!');
            updateDisplay();
        }, BONUS_DURATION);
    };

    const handlePenaltyEvent = () => {
        displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
        gameState.clickValue /= 2;
        updateDisplay();
        setTimeout(() => {
            gameState.clickValue *= 2;
            displayMessage('Штраф закончился!');
            updateDisplay();
        }, BONUS_DURATION);
    };

    const startRandomEvent = () => {
        const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';
        eventType === 'bonus' ? handleBonusEvent() : handlePenaltyEvent();
        gameState.randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (EVENT_INTERVAL_MAX - EVENT_INTERVAL_MIN) + EVENT_INTERVAL_MIN);
    };

    // --- Достижения ---
    const checkAchievements = () => {
        const achievementConditions = {
            '100000 clicks': gameState.clickCount >= 100000,
            '1000000 clicks': gameState.clickCount >= 1000000,
            'first prestige': gameState.prestigeLevel >= 1,
            '5 autoClicker': gameState.autoClickerValue >= 5,
        };

        for (const [achievement, condition] of Object.entries(achievementConditions)) {
            if (condition && !gameState.achievements.includes(achievement)) {
                addAchievement(achievement);
            }
        }
    };

    const addAchievement = (achievement) => {
        gameState.achievements.push(achievement);
        gameState.achievementCount++;
        updateDisplay();
        saveData();
    };

    // --- Управление игрой ---
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
            bonusActive: false,
            achievements: [],
            achievementCount: 0,
            autoClickerInterval: null,
            bonusTimeout: null,
            randomEventTimeout: null,
            diamonds: 0,
            activeExpedition: null,
            expeditionStartTime: null,
            expeditionDuration: 0,
            expeditionReward: 0,
            expeditionCosts: {
                'easy': 0,
                'medium': 10,
                'hard': 100,
            },
            expeditionRewards: {
                'easy': [1, 5],
                'medium': [10, 50],
                'hard': [100, 500],
            },
            prestigeCost: PRESTIGE_BASE_COST,
        };
        clearAllTimeouts();
        startRandomEvent();
        updateDisplay();
        clearSaveData();
        displayMessage('Прогресс сброшен!', 'orange');
    };

    const clearAllTimeouts = () => {
        clearInterval(gameState.autoClickerInterval);
        gameState.autoClickerInterval = null;
        clearTimeout(gameState.bonusTimeout);
        clearTimeout(gameState.randomEventTimeout);
        if (gameState.expeditionInterval) {
            clearInterval(gameState.expeditionInterval);
            gameState.expeditionInterval = null;
        }
    };

    const clearSaveData = () => {
        if (tWebApp) {
            tWebApp.CloudStorage.removeItem(SAVE_KEY);
        } else {
            localStorage.removeItem(SAVE_KEY);
        }
    };

    const saveData = () => {
        try {
            const {
                autoClickerInterval,
                bonusTimeout,
                randomEventTimeout,
                expeditionInterval,
                ...dataToSave
            } = gameState;
             const dataString = JSON.stringify(dataToSave);
            if (tWebApp) {
                tWebApp.CloudStorage.setItem(SAVE_KEY, dataString);
            } else {
                localStorage.setItem(SAVE_KEY, dataString);
            }
        } catch (e) {
            console.error('Failed to save game', e);
            displayMessage('Не удалось сохранить игру', 'red');
        }
    };

    const loadGame = () => {
        const loadFromStorage = (storage) => {
            const savedDataString = storage.getItem(SAVE_KEY);
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
                 if (gameState.bonusActive) {
                     handleBonusEvent();
                 }
                updateDisplay();
            } catch (e) {
                clearSaveData();
                console.error('Failed to load game', e)
                displayMessage('Не удалось загрузить игру', 'red');
            }
        };

        if (tWebApp) {
            tWebApp.CloudStorage.getItem(SAVE_KEY, (err, value) => {
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
        elements.gameContent.style.display = tabId === 'shop' ? 'block' : 'none';
        elements.mapContainer.classList.toggle('active', tabId === 'map');
        elements.menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tab === tabId) {
                item.classList.add('active');
            }
        });
    };

    // --- Экспедиции ---
    const startExpedition = (type) => {
        if (gameState.activeExpedition) {
            displayMessage('Уже есть активная экспедиция', 'red');
            return;
        }
        const cost = gameState.expeditionCosts[type];

        if (cost > 0 && gameState.diamonds < cost) {
            const needed = cost - gameState.diamonds;
            displayMessage(`Не хватает ${needed} алмазов для этой экспедиции`, 'red');
            return;
        }

        gameState.diamonds -= cost;
        gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = EXPEDITION_DURATIONS[type];
        const [minReward, maxReward] = gameState.expeditionRewards[type];
        gameState.expeditionReward = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;

        startExpeditionTimer();
        updateDisplay();
        displayMessage(`Экспедиция "${EXPEDITION_TYPES[type]}" началась!`, 'green');
    };

    const updateExpeditionButtonInfo = () => {
        elements.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
            const type = button.dataset.type;
            const cost = gameState.expeditionCosts[type];
            const [minReward, maxReward] = gameState.expeditionRewards[type];
            button.textContent = `${EXPEDITION_TYPES[type]} (Стоимость: ${cost}💎, Награда: ${minReward}-${maxReward}💎)`;

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
        gameState.expeditionInterval = setInterval(updateExpeditionProgress, 1000);
    };

    const finishExpedition = () => {
        clearInterval(gameState.expeditionInterval);
        gameState.expeditionInterval = null;
        const reward = gameState.expeditionReward
         gameState.diamonds += reward;
        const expeditionType = gameState.activeExpedition;
        gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;

        displayMessage(`Экспедиция "${EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${reward} алмазов`, 'gold');
         updateDisplay();
          saveData(); // Сохранение после завершения экспедиции
    };


    // --- Обработчики событий ---
    elements.clickButton.addEventListener('click', applyClick);

    elements.upgradeClickLevelButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 2.5);
            updateDisplay();
            displayMessage('Уровень улучшения клика повышен!');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    elements.upgradeClickButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue++;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.8);
            updateDisplay();
            displayMessage('Улучшение клика приобретено!');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    elements.upgradeAutoButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue++;
            startAutoClicker();
            gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 2.2);
            updateDisplay();
            displayMessage('Автокликер приобретен!');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    elements.prestigeButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier *= 2;
            gameState.clickCount = 0;
            gameState.clickValue = 1;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.clickUpgradeLevel = 1;
            gameState.clickUpgradeLevelCost = 100;
            gameState.prestigeCost = Math.round(PRESTIGE_BASE_COST * Math.pow(10, gameState.prestigeLevel));
            clearAllTimeouts();
            updateDisplay();
            displayMessage('Перерождение!');
        } else {
            displayMessage(`Недостаточно кликов! (нужно ${gameState.prestigeCost})`, 'red');
        }
    });

    elements.resetButton.addEventListener('click', resetGame);

    elements.menuButton.addEventListener('click', () => {
        elements.menu.classList.toggle('active');
        elements.menuButton.classList.toggle('active');
    });

    elements.menuItems.forEach(item => {
        item.addEventListener('click', () => {
            switchTab(item.dataset.tab);
            elements.menu.classList.remove('active');
            elements.menuButton.classList.remove('active');
        });
    });

    elements.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
        button.addEventListener('click', () => {
            startExpedition(button.dataset.type);
        });
    });

    // --- Инициализация ---
    window.addEventListener('beforeunload', saveData);
    loadGame();
    startRandomEvent();
    checkAchievements();
    switchTab('shop');
    updateExpeditionButtonInfo();
    if (gameState.activeExpedition) {
        startExpeditionTimer();
    }
});
        
