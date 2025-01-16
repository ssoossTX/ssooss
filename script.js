
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


    const ARTIFACTS = {
        'artifact1': { name: 'Древний амулет', description: 'Увеличивает силу клика.', price: 10000, rarity: 'Редкий', chance: 0.1, buff: { clickValue: 0.2 } },
        'artifact2': { name: 'Сфера маны', description: 'Увеличивает автоклик.', price: 10000, rarity: 'Редкий', chance: 0.1, buff: { autoClickerValue: 0.1 } },
        'artifact3': { name: 'Кристал опыта', description: 'Увеличивает уровень клика.', price: 10000, rarity: 'Эпический', chance: 0.05, buff: { clickUpgradeLevel: 0.05 } },
        'artifact4': { name: 'Кубок удачи', description: 'Увеличивает награды с экспедиций.', price: 10000, rarity: 'Эпический', chance: 0.05, buff: { expeditionReward: 0.1 } },
        'artifact5': { name: 'Сердце героя', description: 'Увеличивает множитель престижа.', price: 10000, rarity: 'Легендарный', chance: 0.01, buff: { prestigeMultiplier: 0.1 } },
    };

    const SKINS = {
        'skin1': { name: 'Огненный клик', description: 'Красный цвет кнопки клика', price: 1000, rarity: 'Обычный', chance: 0.3, buff: { buttonColor: 'red' } },
        'skin2': { name: 'Ледяной клик', description: 'Синий цвет кнопки клика', price: 1000, rarity: 'Обычный', chance: 0.3, buff: { buttonColor: 'blue' } },
        'skin3': { name: 'Золотой клик', description: 'Желтый цвет кнопки клика', price: 1000, rarity: 'Редкий', chance: 0.2, buff: { buttonColor: 'gold' } },
        'skin4': { name: 'Теневой клик', description: 'Черный цвет кнопки клика', price: 1000, rarity: 'Редкий', chance: 0.2, buff: { buttonColor: 'black' } },
         'skin5': { name: 'Зеленый клик', description: 'Зеленый цвет кнопки клика', price: 1000, rarity: 'Обычный', chance: 0.3, buff: { buttonColor: 'green' } },
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
        inventory: [],
        equipped: {
           buttonColor: null
        }
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
        shopContent: document.getElementById('shop-container'),
        profileContent: document.getElementById('profile-container'),
        menuItems: document.querySelectorAll('.menu-items li button'),
        mapContainer: document.getElementById('map-container'),
        expeditionProgressDisplay: document.getElementById('expedition-progress'),
        diamondDisplay: document.getElementById('diamond-display'),
        prestigeCostDisplay: document.getElementById('prestige-cost'),
           shopItemsContainer: document.getElementById('shop-items-container'),
        profileItemsContainer: document.getElementById('profile-items'),
        profileInfo: document.getElementById('profile-info')
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
          elements.clickButton.style.backgroundColor = gameState.equipped.buttonColor || '#2ecc71';
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

    const updateProfile = () => {
        elements.profileInfo.innerHTML = `
            <p><b>Уровень престижа:</b> ${gameState.prestigeLevel}</p>
            <p><b>Множитель престижа:</b> ${gameState.prestigeMultiplier}</p>
             <p><b>Клик:</b> ${gameState.clickValue * gameState.clickUpgradeLevel}</p>
              <p><b>Автоклик:</b> ${gameState.autoClickerValue * gameState.clickUpgradeLevel}</p>
           `;

          elements.profileItemsContainer.innerHTML = '';
         if (gameState.inventory.length > 0) {
             gameState.inventory.forEach(item => {
                const itemInfo = ARTIFACTS[item] || SKINS[item];
                if (itemInfo) {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('profile-item');
                    itemElement.innerHTML = `
                      <p><b>${itemInfo.name}</b> (${itemInfo.rarity})</p>
                         <p>${itemInfo.description}</p>
                         <p>Баффы: ${Object.entries(itemInfo.buff).map(([key, value]) => `${key}: ${value}`).join(', ') || 'Нет'}</p>
                    `;
                    elements.profileItemsContainer.appendChild(itemElement);
                }
            });
          } else {
            const noItemsElement = document.createElement('div');
              noItemsElement.innerHTML = "<p>Нет предметов</p>"
              elements.profileItemsContainer.appendChild(noItemsElement);
          }
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
            prestigeCost: PRESTIGE_BASE_COST,
             inventory: [],
            equipped: {
           buttonColor: null
            }
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
                   applyInventoryBuffs()
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
        elements.mapContainer.classList.toggle('active', tabId === 'map');
        elements.shopContent.classList.toggle('active', tabId === 'shop');
         elements.profileContent.classList.toggle('active', tabId === 'profile');
         elements.menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tab === tabId) {
                item.classList.add('active');
            }
        });
           if (tabId == 'profile') {
                 updateProfile()
             }
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
         const reward = gameState.expeditionReward;
        gameState.diamonds += reward;
        const expeditionType = gameState.activeExpedition;
        gameState.activeExpedition = null;
         gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;

        displayMessage(`Экспедиция "${EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${reward} алмазов`, 'gold', '1.2em');
        updateDisplay();
        saveData();
    };

    // --- Магазин ---
        const createShopItems = () => {
        elements.shopItemsContainer.innerHTML = '';

            const shopArtifactsContainer = document.createElement('div');
            shopArtifactsContainer.innerHTML = '<h2>Артефакты</h2>'
            elements.shopItemsContainer.appendChild(shopArtifactsContainer)
            for (const id in ARTIFACTS) {
                const artifact = ARTIFACTS[id];
                const itemElement = document.createElement('div');
               itemElement.classList.add('shop-item');
                 itemElement.innerHTML = `
                  <p><b>${artifact.name}</b> (${artifact.rarity})</p>
                  <p>${artifact.description}</p>
                   <p>Цена: ${artifact.price} кликов</p>
                     <p>Шанс: ${artifact.chance * 100}%</p>
                     <button class="buy-item" data-type="artifact" data-id="${id}">Купить</button>
                 `;
                shopArtifactsContainer.appendChild(itemElement);
             }

          const shopSkinsContainer = document.createElement('div');
            shopSkinsContainer.innerHTML = '<h2>Скины</h2>'
            elements.shopItemsContainer.appendChild(shopSkinsContainer)
            for (const id in SKINS) {
                const skin = SKINS[id];
                const itemElement = document.createElement('div');
               itemElement.classList.add('shop-item');
                 itemElement.innerHTML = `
                  <p><b>${skin.name}</b> (${skin.rarity})</p>
                  <p>${skin.description}</p>
                   <p>Цена: ${skin.price} кликов</p>
                    <p>Шанс: ${skin.chance * 100}%</p>
                   <button class="buy-item" data-type="skin" data-id="${id}">Купить</button>
                 `;
                shopSkinsContainer.appendChild(itemElement);
             }
        };

      const applyInventoryBuffs = () => {
          gameState.clickValue = 1;
           gameState.autoClickerValue = 0;
           gameState.prestigeMultiplier = 1;

            for (const itemId of gameState.inventory) {
                const itemInfo = ARTIFACTS[itemId] || SKINS[itemId];
               if (itemInfo) {
                    for( const buffName in itemInfo.buff) {
                        if (buffName == 'clickValue') {
                            gameState.clickValue += gameState.clickValue * itemInfo.buff[buffName];
                         } else if(buffName == 'autoClickerValue') {
                              gameState.autoClickerValue += gameState.autoClickerValue * itemInfo.buff[buffName]
                         }
                          else if(buffName == 'clickUpgradeLevel') {
                            gameState.clickUpgradeLevel += gameState.clickUpgradeLevel * itemInfo.buff[buffName]
                         } else if(buffName == 'prestigeMultiplier') {
                             gameState.prestigeMultiplier +=  gameState.prestigeMultiplier * itemInfo.buff[buffName]
                         }
                        else if(buffName == 'buttonColor') {
                             gameState.equipped.buttonColor = itemInfo.buff.buttonColor;
                           }
                           else if(buffName == 'expeditionReward') {
                                 gameState.expeditionReward +=  gameState.expeditionReward * itemInfo.buff[buffName]
                         }
                  }
              }
            }
          updateDisplay()
    };


    const buyItem = (type, id) => {
        const item = (type === 'artifact') ? ARTIFACTS[id] : SKINS[id];
         if (!item) {
            displayMessage('Такого предмета нет!', 'red');
            return;
        }

        if (gameState.clickCount < item.price) {
            displayMessage(`Недостаточно кликов! (нужно ${item.price})`, 'red');
            return;
        }

        gameState.clickCount -= item.price;
       const random = Math.random();
         if (random <= item.chance) {
               gameState.inventory.push(id);
              displayMessage(`Вы получили ${item.name}!`, 'gold', '1.2em');
             applyInventoryBuffs();
        } else {
           displayMessage(`Вы не получили предмет!`, 'grey');
        }
       saveData();
        updateDisplay();
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
    elements.shopItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('buy-item')) {
            const type = event.target.dataset.type;
             const id = event.target.dataset.id;
            buyItem(type, id);
        }
    });

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
        if(autoSaveInterval){
              clearInterval(autoSaveInterval);
               autoSaveInterval = null;
        }
    }

     window.addEventListener('beforeunload', () => {
          clearAutoSave()
        saveData();
    });
    loadGame();
    if (autoSaveInterval == null){
          autoSaveInterval = setInterval(autoSave, AUTO_SAVE_INTERVAL);
        }
    startRandomEvent();
    checkAchievements();
    switchTab('clicker');
     updateExpeditionButtonInfo();
    if (gameState.activeExpedition) {
        startExpeditionTimer();
    }
      createShopItems();
        applyInventoryBuffs()
    // Создаем контейнер для сообщений
    const globalMessageContainer = document.createElement('div');
    globalMessageContainer.id = 'global-message';
    globalMessageContainer.style.position = 'fixed';
    globalMessageContainer.style.top = '10px';
    globalMessageContainer.style.left = '50%';
    globalMessageContainer.style.transform = 'translateX(-50%)';
    globalMessageContainer.style.zIndex = '1000';
     globalMessageContainer.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
    globalMessageContainer.style.padding = '10px 20px';
    globalMessageContainer.style.borderRadius = '5px';
    globalMessageContainer.style.color = 'white';
    globalMessageContainer.style.textAlign = 'center';
      globalMessageContainer.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    document.body.appendChild(globalMessageContainer);
    elements.globalMessageDisplay = globalMessageContainer;
});
