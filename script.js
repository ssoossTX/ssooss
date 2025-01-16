
document.addEventListener('DOMContentLoaded', () => {
    // --- Константы ---
    const SAVE_KEY = 'clickerData';
    const EVENT_INTERVAL_MIN = 60000;
    const EVENT_INTERVAL_MAX = 120000;
    const MESSAGE_DURATION = 3000;
    const AUTO_CLICK_INTERVAL = 1000;
    const PRESTIGE_BASE_COST = 10000;
    const EXPEDITION_DURATIONS = {
        'easy': 60000,
        'medium': 300000,
        'hard': 600000,
    };

    const EXPEDITION_TYPES = {
        'easy': 'легкая',
        'medium': 'средняя',
        'hard': 'тяжелая',
    };

    const SKIN_BOX_COST = 500;
    const ARTIFACT_BOX_COST = 1000;

    const SKIN_REWARDS = [
        'Обычный скин',
        'Редкий скин',
        'Эпический скин',
        'Легендарный скин',
        'Уникальный скин'
    ];

    const ARTIFACT_REWARDS = [
        'Увеличение клика на 1',
        'Увеличение автокликера на 1',
        'Множитель клика x1.1',
        'Множитель перерождения х1.1'
    ];

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
        skinBoxCount: 0,
        artifactBoxCount: 0,
        prestigeCost: PRESTIGE_BASE_COST,
        skins: [],
        artifacts: []
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
        globalMessageDisplay: document.getElementById('global-message'),
        prestigeButton: document.getElementById('prestige-button'),
        prestigeLevelDisplay: document.getElementById('prestige-level'),
        achievementsDisplay: document.getElementById('achievements'),
        resetButton: document.getElementById('reset-button'),
        menuButton: document.querySelector('.menu-toggle'),
        menu: document.getElementById('menu-items'),
        gameContent: document.getElementById('game-content'),
        clickerTab: document.getElementById('clicker-tab'),
        shopTab: document.getElementById('shop-tab'),
        menuItems: document.querySelectorAll('.menu-items li button'),
        mapContainer: document.getElementById('map-container'),
        skinBoxButton: document.getElementById('buy-skin-box'),
        artifactBoxButton: document.getElementById('buy-artifact-box'),
        openSkinBoxButton: document.getElementById('open-skin-box'),
        openArtifactBoxButton: document.getElementById('open-artifact-box'),
        expeditionProgressDisplay: document.getElementById('expedition-progress'),
        diamondDisplay: document.getElementById('diamond-display'),
        skinBoxCountDisplay: document.getElementById('skin-box-count'),
        artifactBoxCountDisplay: document.getElementById('artifact-box-count'),
        prestigeCostDisplay: document.getElementById('prestige-cost'),
        shopContent: document.getElementById('shop-content'),
    };

    const tWebApp = window.Telegram && window.Telegram.WebApp;
    if (tWebApp) {
        tWebApp.ready();
    }

     // --- Обновление UI ---
    const updateDisplay = () => {
        elements.clickCountDisplay.textContent = Math.round(gameState.clickCount) + " ✨";
        elements.clickUpgradeCostDisplay.textContent = gameState.clickUpgradeCost + " ✨";
        elements.autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost + " ✨";
        elements.clickUpgradeLevelDisplay.textContent = gameState.clickUpgradeLevel;
        elements.clickUpgradeLevelCostDisplay.textContent = gameState.clickUpgradeLevelCost + " ✨";
        elements.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
        elements.achievementsDisplay.textContent = `Достижения: ${gameState.achievementCount} 🏆`;
        elements.diamondDisplay.textContent = `Алмазы: ${gameState.diamonds} 💎`;
        elements.skinBoxCountDisplay.textContent = `Ящики скинов: ${gameState.skinBoxCount} 📦`;
        elements.artifactBoxCountDisplay.textContent = `Ящики артефактов: ${gameState.artifactBoxCount} 📦`;
         elements.prestigeCostDisplay.textContent = `Стоимость: ${gameState.prestigeCost} ✨`;
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

     const displayMessage = (msg, color = 'white', fontSize = '1em') => {
         elements.globalMessageDisplay.textContent = msg;
        elements.globalMessageDisplay.style.color = color;
        elements.globalMessageDisplay.style.fontSize = fontSize;
        setTimeout(() => {
            elements.globalMessageDisplay.textContent = '';
            elements.globalMessageDisplay.style.fontSize = '1em';
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


    const startRandomEvent = () => {
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
           skinBoxCount: 0,
            artifactBoxCount: 0,
            prestigeCost: PRESTIGE_BASE_COST,
            skins: [],
            artifacts: []
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
         if (gameState.expeditionInterval) {
            clearInterval(gameState.expeditionInterval);
            gameState.expeditionInterval = null;
        }
        clearAutoSave();
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
        elements.gameContent.style.display = tabId === 'clicker' ? 'block' : 'none';
        elements.shopContent.style.display = tabId === 'shop' ? 'block' : 'none';
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
            button.textContent = `${EXPEDITION_TYPES[type]} (Стоимость: ${cost} 💎, Награда: ${minReward}-${maxReward} 💎)`;

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
        const reward = gameState.expeditionReward;
        gameState.diamonds += reward;
        const expeditionType = gameState.activeExpedition;
        gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;

          displayMessage(`Экспедиция "${EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${reward} 💎`, 'gold', '1.2em');
        updateDisplay();
        saveData();
    };

  const openSkinBox = () => {
    if (gameState.skinBoxCount > 0) {
        gameState.skinBoxCount--;
         const reward = SKIN_REWARDS[Math.floor(Math.random() * SKIN_REWARDS.length)];
        gameState.skins.push(reward);
        displayMessage(`Открыт ящик со скинами! Получен: ${reward}`, 'lime', '1.2em');
         updateDisplay();
        saveData();
    } else {
        displayMessage('Нет ящиков со скинами для открытия!', 'red');
    }
};

const openArtifactBox = () => {
    if (gameState.artifactBoxCount > 0) {
        gameState.artifactBoxCount--;
        const reward = ARTIFACT_REWARDS[Math.floor(Math.random() * ARTIFACT_REWARDS.length)];
         gameState.artifacts.push(reward);
          applyArtifactReward(reward);
         displayMessage(`Открыт ящик с артефактами! Получен: ${reward}`, 'lime', '1.2em');
         updateDisplay();
        saveData();
    } else {
        displayMessage('Нет ящиков с артефактами для открытия!', 'red');
    }
};

  const applyArtifactReward = (reward) => {
    switch (reward) {
        case 'Увеличение клика на 1':
              gameState.clickValue++;
               break;
            case 'Увеличение автокликера на 1':
                 gameState.autoClickerValue++;
                startAutoClicker();
                 break;
            case 'Множитель клика x1.1':
                gameState.prestigeMultiplier *= 1.1;
                  break;
             case 'Множитель перерождения х1.1':
                   gameState.prestigeMultiplier *= 1.1;
                break;
        }
    };

    const buySkinBox = () => {
        if (gameState.clickCount >= SKIN_BOX_COST) {
            gameState.clickCount -= SKIN_BOX_COST;
            gameState.skinBoxCount++;
            updateDisplay();
              displayMessage('Куплен ящик со скинами! 📦', 'green');
            saveData();
        } else {
             displayMessage('Недостаточно кликов! ✨', 'red');
        }
    };

   const buyArtifactBox = () => {
       if (gameState.clickCount >= ARTIFACT_BOX_COST) {
            gameState.clickCount -= ARTIFACT_BOX_COST;
            gameState.artifactBoxCount++;
            updateDisplay();
              displayMessage('Куплен ящик с артефактами! 📦', 'green');
            saveData();
        } else {
            displayMessage('Недостаточно кликов! ✨', 'red');
        }
    };

    // --- Обработчики событий ---
    elements.clickButton.addEventListener('click', applyClick);

    elements.upgradeClickLevelButton.addEventListener('click', () => {
       if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 2.5);
            updateDisplay();
              displayMessage('Уровень улучшения клика повышен! ✨', 'lime');
        } else {
            displayMessage('Недостаточно кликов! ✨', 'red');
        }
    });

    elements.upgradeClickButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
             gameState.clickValue++;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.8);
            updateDisplay();
              displayMessage('Улучшение клика приобретено! ✨', 'lime');
        } else {
            displayMessage('Недостаточно кликов! ✨', 'red');
        }
    });

    elements.upgradeAutoButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
           gameState.autoClickerValue++;
           startAutoClicker();
            gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 2.2);
            updateDisplay();
              displayMessage('Автокликер приобретен! ✨', 'lime');
        } else {
            displayMessage('Недостаточно кликов! ✨', 'red');
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
              displayMessage('Перерождение! ✨', 'gold');
        } else {
           displayMessage(`Недостаточно кликов! ✨ (нужно ${gameState.prestigeCost} ✨)`, 'red');
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

    elements.skinBoxButton.addEventListener('click', buySkinBox);
    elements.artifactBoxButton.addEventListener('click', buyArtifactBox);
    elements.openSkinBoxButton.addEventListener('click', openSkinBox);
    elements.openArtifactBoxButton.addEventListener('click', openArtifactBox);

    // --- Инициализация ---
     const AUTO_SAVE_INTERVAL = 30000; // 30 секунд

    //Функция для авто сохранения
    const autoSave = () => {
         saveData();
    };
    //Устанавливаем интервал сохранения
    let autoSaveInterval = setInterval(autoSave, AUTO_SAVE_INTERVAL);

    //   Очищаем авто сохранения
     const clearAutoSave = () => {
        if (autoSaveInterval) {
            clearInterval(autoSaveInterval);
            autoSaveInterval = null;
        }
    }
    window.addEventListener('beforeunload', () => {
        clearAutoSave()
        saveData();
    });

    loadGame();
     if (autoSaveInterval == null) {
        autoSaveInterval = setInterval(autoSave, AUTO_SAVE_INTERVAL);
    }
    startRandomEvent();
    checkAchievements();
    switchTab('clicker');
      updateExpeditionButtonInfo();
      if (gameState.activeExpedition) {
        startExpeditionTimer();
    }

     const globalMessageContainer = document.createElement('div');
    globalMessageContainer.id = 'global-message';
    globalMessageContainer.style.position = 'fixed';
    globalMessageContainer.style.top = '10px';
    globalMessageContainer.style.left = '50%';
    globalMessageContainer.style.transform = 'translateX(-50%)';
    globalMessageContainer.style.zIndex = '1000';
    globalMessageContainer.style.backgroundColor = '#2c3e50';
    globalMessageContainer.style.padding = '10px';
    globalMessageContainer.style.borderRadius = '5px';
    globalMessageContainer.style.color = 'white';
    document.body.appendChild(globalMessageContainer);
    elements.globalMessageDisplay = globalMessageContainer;

});
