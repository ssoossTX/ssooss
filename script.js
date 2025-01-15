
document.addEventListener('DOMContentLoaded', () => {
    // --- Константы ---
    const SAVE_KEY = 'clickerData';
    const EVENT_INTERVAL_MIN = 60000;
    const EVENT_INTERVAL_MAX = 120000;
    const BONUS_DURATION = 10000;
    const MESSAGE_DURATION = 3000;
    const AUTO_CLICK_INTERVAL = 1000;
    const PLAYER_NAME_KEY = 'playerName'; // Ключ для сохранения имени игрока
      const SERVER_URL = 'https://your-server.com'; // Замените на URL вашего сервера

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
        playerName: null,
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
        menuButton: document.querySelector('.menu-toggle'),
        menu: document.getElementById('menu-items'),
        gameContent: document.getElementById('game-content'),
        ratingContent: document.getElementById('rating-content'),
        menuItems: document.querySelectorAll('.menu-items li button'),
        ratingList: document.getElementById('rating-list'),
          nameInputContainer: document.getElementById('name-input-container'),
          playerNameInput: document.getElementById('player-name'),
          setNameButton: document.getElementById('set-name-button'),
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
        updateRating(); // Обновляем рейтинг после каждого клика
    }

    function autoClick() {
        gameState.clickCount += (gameState.autoClickerValue * gameState.clickUpgradeLevel) * gameState.prestigeMultiplier;
        updateDisplay();
        updateRating(); // Обновляем рейтинг после автоклика
    }

    function startAutoClicker() {
        if (gameState.autoClickerValue > 0 && !gameState.autoClickerInterval) {
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
            gameState.clickValue *= 2;
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
            playerName: null,
        };
        clearAllTimeouts();
        startRandomEvent();
        updateDisplay();
        clearSaveData();
        displayMessage('Прогресс сброшен!', 'orange');
        showNameInput();
    }

    function clearAllTimeouts() {
        clearInterval(gameState.autoClickerInterval);
        gameState.autoClickerInterval = null;
        clearTimeout(gameState.bonusTimeout);
        clearTimeout(gameState.randomEventTimeout);
    }
    function clearSaveData() {
        if (tWebApp) {
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
            if (savedDataString) {
                try {
                    const savedData = JSON.parse(savedDataString);
                    gameState = { ...gameState, ...savedData };
                    startAutoClicker();
                     if (gameState.bonusActive) {
                         handleBonusEvent();
                     }
                    updateDisplay();
                      loadPlayerName(); // Загружаем имя игрока
                     getRating(); // Загружаем рейтинг при загрузке игры
                } catch (e) {
                    console.error('Error parsing saved data', e);
                    clearSaveData();
                     showNameInput();
                }
            } else {
                 showNameInput();
            }
        }
         if (tWebApp) {
             tWebApp.CloudStorage.getItem(SAVE_KEY, (err, value) => {
                if (err) {
                    console.error('Error loading data from Telegram', err);
                    return;
                }
                if (value) {
                     loadFromStorage({ getItem: () => value });
                } else {
                     showNameInput();
                }
            });
        } else {
           loadFromStorage(localStorage);
        }
    }

     function loadPlayerName() {
        const loadFromStorage = (storage) => {
             const playerName = storage.getItem(PLAYER_NAME_KEY);
                if (playerName) {
                   gameState.playerName = playerName
                } else {
                      showNameInput();
                 }
        }
          if (tWebApp) {
           tWebApp.CloudStorage.getItem(PLAYER_NAME_KEY, (err, value) => {
                if (err) {
                     console.error('Error loading player name data from Telegram', err);
                    return;
               }
               if (value) {
                   loadFromStorage({ getItem: () => value });
               } else {
                     showNameInput();
               }
          });
         } else {
           loadFromStorage(localStorage);
        }
    }

      function savePlayerName() {
           if(gameState.playerName){
              if (tWebApp) {
                  tWebApp.CloudStorage.setItem(PLAYER_NAME_KEY, gameState.playerName);
              } else {
                 localStorage.setItem(PLAYER_NAME_KEY, gameState.playerName);
               }
           }
       }

      function clearPlayerName() {
            if (tWebApp) {
                tWebApp.CloudStorage.removeItem(PLAYER_NAME_KEY);
            } else {
                localStorage.removeItem(PLAYER_NAME_KEY);
           }
       }
    // --- Рейтинг ---

    async function updateRating() {
      if (!gameState.playerName) {
        return;
      }
      const playerName = gameState.playerName;
      const newScore = gameState.clickCount + (gameState.prestigeLevel * 100000);
      try {
            const response = await fetch(`${SERVER_URL}/update_rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: playerName, score: newScore }),
            });

            if (!response.ok) {
                console.error('Failed to update rating', response.status);
            } else {
                   getRating();
            }
        } catch (error) {
            console.error('Error while updating rating', error);
        }
    }

    async function getRating() {
          try {
              const response = await fetch(`${SERVER_URL}/get_rating`);
             if (!response.ok) {
                  console.error('Failed to get rating', response.status);
                  return;
              }
            const rating = await response.json();
            displayRating(rating);
          } catch (error) {
            console.error('Error getting rating:', error);
        }
    }

    function displayRating(rating) {
      elements.ratingList.innerHTML = '';
      rating.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${player.name}: ${Math.round(player.score)}`;
        elements.ratingList.appendChild(li);
      });
    }


     function showNameInput() {
           elements.gameContent.style.display = 'none';
           elements.ratingContent.style.display = 'none';
        elements.nameInputContainer.style.display = 'block';
    }

    function hideNameInput() {
         elements.nameInputContainer.style.display = 'none';
        elements.gameContent.style.display = 'block';
    }

    function switchTab(tabId) {
        elements.gameContent.style.display = tabId === 'shop' ? 'block' : 'none';
        elements.ratingContent.style.display = tabId === 'rating' ? 'block' : 'none';

        elements.menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tab === tabId) {
                item.classList.add('active');
            }
        })
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
        elements.menu.classList.toggle('active');
        elements.menuButton.classList.toggle('active');
    });

      elements.setNameButton.addEventListener('click', () => {
        const newName = elements.playerNameInput.value.trim();
            if (newName) {
                 gameState.playerName = newName;
                 savePlayerName();
                  hideNameInput();
                 updateRating();
            } else {
                  displayMessage('Введите имя!', 'red');
          }
     });

     elements.menu.addEventListener('click', (event) => {
         if (event.target.dataset.action === 'change-name'){
             showNameInput();
             elements.menu.classList.remove('active');
            elements.menuButton.classList.remove('active');
        }
     });

    elements.menuItems.forEach(item => {
          item.addEventListener('click', () => {
             const tabId = item.dataset.tab;
              switchTab(tabId)
              elements.menu.classList.remove('active');
            elements.menuButton.classList.remove('active');
          })
      })


    // --- Инициализация ---
    window.addEventListener('beforeunload', saveData);
    loadGame();
    startRandomEvent();
    checkAchievements();
     switchTab('shop');
    getRating();
});
        
