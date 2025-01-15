document.addEventListener('DOMContentLoaded', () => {
    // --- Константы ---
    const SAVE_KEY = 'clickerData';
    const EVENT_INTERVAL_MIN = 60000;
    const EVENT_INTERVAL_MAX = 120000;
    const BONUS_DURATION = 10000;
    const MESSAGE_DURATION = 3000;
    const AUTO_CLICK_INTERVAL = 1000;

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
    };

    // --- UI элементы ---
    const elements = {
        clickCountDisplay: document.getElementById('click-count'),
        clickButton: document.getElementById('click-button'),
        upgradeClickButton: document.querySelector('#upgrade-click button'),
        upgradeAutoButton: document.querySelector('#upgrade-auto button'),
        upgradeClickLevelButton: document.querySelector('#upgrade-click-level button'),
        clickUpgradeCostDisplay: document.getElementById('click-upgrade-cost'),
        autoUpgradeCostDisplay: document.getElementById('auto-upgrade-cost'),
        clickUpgradeLevelDisplay: document.getElementById('click-upgrade-level-display'),
        clickUpgradeLevelCostDisplay: document.getElementById('click-upgrade-level-cost'),
        messageDisplay: document.getElementById('message'),
        prestigeButton: document.getElementById('prestige-button'),
        prestigeLevelDisplay: document.getElementById('prestige-level'),
        achievementsDisplay: document.getElementById('achievements'),
         resetButton: document.getElementById('reset-button'),
        menuButton: document.getElementById('menu-button'),
        menu: document.getElementById('menu'),
        closeMenuButton: document.getElementById('close-menu-button'),
         exportSaveButton: document.getElementById('export-save-button'),
         importSaveButton: document.getElementById('import-save-button'),
          importInput: document.getElementById('import-input'),
    };

    const tWebApp = window.Telegram && window.Telegram.WebApp;
    if (tWebApp) {
        tWebApp.ready();
    }

    // --- Обновление UI ---
    function updateDisplay() {
        elements.clickCountDisplay.textContent = Math.round(gameState.clickCount);
        elements.clickUpgradeCostDisplay.textContent = gameState.clickUpgradeCost;
        elements.autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost;
        elements.clickUpgradeLevelDisplay.textContent = gameState.clickUpgradeLevel;
        elements.clickUpgradeLevelCostDisplay.textContent = gameState.clickUpgradeLevelCost;
        elements.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
         elements.achievementsDisplay.textContent = `Достижения: ${gameState.achievementCount}`;
    }
    function displayMessage(msg, color = 'green') {
        elements.messageDisplay.textContent = msg;
        elements.messageDisplay.style.color = color;
        setTimeout(() => {
            elements.messageDisplay.textContent = '';
        }, MESSAGE_DURATION);
    }

    // --- Основная логика игры ---
    function applyClick() {
        gameState.clickCount += (gameState.clickValue * gameState.clickUpgradeLevel) * gameState.prestigeMultiplier;
        updateDisplay();
        checkAchievements();
    }

    function autoClick() {
        gameState.clickCount += (gameState.autoClickerValue * gameState.clickUpgradeLevel) * gameState.prestigeMultiplier;
        updateDisplay();
    }

     function startAutoClicker() {
          if(gameState.autoClickerValue > 0 && !gameState.autoClickerInterval) {
               gameState.autoClickerInterval = setInterval(autoClick, AUTO_CLICK_INTERVAL);
          }
     }

    function handleBonusEvent() {
          gameState.bonusActive = true;
        gameState.clickValue *= 2;
        gameState.autoClickerValue *= 2;
        displayMessage('Случайный бонус: удвоенный урон!', 'blue');
        updateDisplay();
         clearTimeout(gameState.bonusTimeout);
           gameState.bonusTimeout = setTimeout(() => {
               gameState.bonusActive = false;
             gameState.clickValue /= 2;
                gameState.autoClickerValue /= 2;
              displayMessage('Действие бонуса закончилось!');
                updateDisplay();
            }, BONUS_DURATION);
     }

    function handlePenaltyEvent() {
           displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
          gameState.clickValue /= 2;
            updateDisplay();
            setTimeout(() => {
                 gameState.clickValue *=2;
                displayMessage('Штраф закончился!');
                updateDisplay();
            }, BONUS_DURATION);
    }
    function startRandomEvent() {
        const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';
          if (eventType === 'bonus') {
            handleBonusEvent();
        } else {
            handlePenaltyEvent();
        }
            gameState.randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (EVENT_INTERVAL_MAX - EVENT_INTERVAL_MIN) + EVENT_INTERVAL_MIN);
        }

    // --- Достижения ---
    function checkAchievements() {
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
    }

    function addAchievement(achievement) {
        gameState.achievements.push(achievement);
        gameState.achievementCount++;
         updateDisplay();
        saveData();
    }

     // --- Управление игрой ---
     function resetGame() {
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
        };
          clearAllTimeouts();
        startRandomEvent();
         updateDisplay();
          clearSaveData();
        displayMessage('Прогресс сброшен!', 'orange');
     }

     function clearAllTimeouts() {
          clearInterval(gameState.autoClickerInterval);
        gameState.autoClickerInterval = null;
        clearTimeout(gameState.bonusTimeout);
        clearTimeout(gameState.randomEventTimeout);
    }
      function clearSaveData() {
           if(tWebApp) {
            tWebApp.CloudStorage.removeItem(SAVE_KEY);
        } else {
               localStorage.removeItem(SAVE_KEY);
          }
      }
      function saveData() {
          const data = { ...gameState };
        delete data.autoClickerInterval;
        delete data.bonusTimeout;
         delete data.randomEventTimeout;

          const dataString = JSON.stringify(data);
        if (tWebApp) {
            tWebApp.CloudStorage.setItem(SAVE_KEY, dataString);
        } else {
            localStorage.setItem(SAVE_KEY, dataString);
        }
    }


     function loadGame() {
        const loadFromStorage = (storage) => {
             const savedDataString = storage.getItem(SAVE_KEY);
             if(savedDataString) {
                 try{
                     const savedData = JSON.parse(savedDataString);
                     gameState = { ...gameState, ...savedData };
                     startAutoClicker();
                      if (gameState.bonusActive) {
                           handleBonusEvent();
                         }
                     updateDisplay();
                 } catch (e) {
                     console.error('Error parsing saved data', e);
                    clearSaveData();
                 }
             }
        }
        if (tWebApp) {
            tWebApp.CloudStorage.getItem(SAVE_KEY, (err, value) => {
                if(err){
                     console.error('Error loading data from Telegram', err);
                    return;
                }
                if(value){
                    loadFromStorage({getItem: () => value});
                }
            });
        } else {
              loadFromStorage(localStorage);
        }
    }

    function exportSave() {
        const data = JSON.stringify(gameState);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clicker_save.json';
        a.click();
        URL.revokeObjectURL(url);
    }
    function importSave() {
        const file = elements.importInput.files[0];
        if (!file) {
            displayMessage('Файл не выбран', 'red');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const savedData = JSON.parse(event.target.result);
                 gameState = { ...gameState, ...savedData };
                 clearAllTimeouts();
                startAutoClicker();
                startRandomEvent();
               updateDisplay();
               saveData();
                displayMessage('Сохранение импортировано!');
            } catch (e) {
                console.error('Error parsing save data', e);
                  displayMessage('Ошибка при импорте сохранения', 'red');
            }
        };
        reader.readAsText(file);
        elements.importInput.value = '';
    }

    // --- Обработчики событий ---
    elements.clickButton.addEventListener('click', applyClick);

    elements.upgradeClickLevelButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
             gameState.clickCount -= gameState.clickUpgradeLevelCost;
           gameState.clickUpgradeLevel++;
           gameState.clickUpgradeCost = 10;
            gameState.clickCount = 0;
          gameState.clickValue = 1;
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
        if (gameState.clickCount >= 10000) {
             gameState.prestigeLevel++;
           gameState.prestigeMultiplier *= 2;
            gameState.clickCount = 0;
            gameState.clickValue = 1;
             gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
             gameState.autoUpgradeCost = 50;
             gameState.clickUpgradeLevel = 1;
           gameState.clickUpgradeLevelCost = 100;
            clearAllTimeouts();
            updateDisplay();
           displayMessage('Перерождение!');
        } else {
            displayMessage('Недостаточно кликов! (нужно 10000)', 'red');
        }
    });
     elements.resetButton.addEventListener('click', resetGame);
     elements.menuButton.addEventListener('click', () => {
        elements.menu.style.display = 'flex';
    });
     elements.closeMenuButton.addEventListener('click', () => {
         elements.menu.style.display = 'none';
     });
     elements.exportSaveButton.addEventListener('click', exportSave);
     elements.importSaveButton.addEventListener('click', importSave);

    // --- Инициализация ---
      window.addEventListener('beforeunload', saveData);
    loadGame();
    startRandomEvent();
    checkAchievements();
});
