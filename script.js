
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
            'easy': 60000,
            'medium': 300000,
            'hard': 600000,
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
        rating: {
             ratingContent: document.getElementById('rating-content'),
             ratingTable: document.getElementById('rating-table'),
              updateRatingButton: document.getElementById('update-rating-button'),
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

    const firebaseConfig = {
        apiKey: "AIzaSyCH-KqOdSyqOVwopPNVB6e3sn1iPQHemJM",
        authDomain: "reting-97f62.firebaseapp.com",
        projectId: "reting-97f62",
        storageBucket: "reting-97f62.firebasestorage.app",
        messagingSenderId: "541400270797",
        appId: "1:541400270797:web:1d83e2ab9968f0f29c6684",
    };
    

      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
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
     elements.rating.ratingContent.style.display = tabId === 'rating' ? 'block' : 'none';

    // Добавляем логику для переключения табов внутри профиля
    if (tabId === 'profile') {
        const profileInfo = document.getElementById('profile-info-content');
        const profileInventory = document.getElementById('profile-inventory');
         const profileContainer = document.getElementById('profile-container'); // Получаем контейнер профиля

        // Показываем контейнер профиля и вкладку "Профиль" по умолчанию
         profileContainer.style.display = 'block';
        profileInfo.style.display = 'block';
        profileInventory.style.display = 'none';

        const profileTabButtons = document.querySelectorAll('.profile-tab-button');
        profileTabButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const tab = event.target.dataset.tab;
                 profileInfo.style.display = (tab === 'profile-info') ? 'block' : 'none';
                profileInventory.style.display = (tab === 'profile-inventory') ? 'block' : 'none';
                // Убираем класс "active" у всех кнопок
                profileTabButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем класс "active" только активной кнопке
                event.target.classList.add('active');
             });
        });
        updateProfile();
         updateInventoryDisplay();
    } else {
        // Скрываем контейнер профиля, если открыта другая вкладка
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

     // Скрываем модальное окно профиля при переключении вкладок (уже не нужно, но оставим на всякий случай)
     const profileModal = document.getElementById('profile-modal'); // Получаем модальное окно
      if (profileModal) {
        profileModal.style.display = 'none';
    }
};

    // 8. Улучшения
    const buyClickUpgrade = () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue++;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.5);
            updateDisplay();
            saveData();
            displayMessage('Улучшение клика куплено!', 'green');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const buyAutoClicker = () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue++;
            gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.7);
            updateDisplay();
            startAutoClicker();
            saveData();
            displayMessage('Автокликер куплен!', 'green');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };

    const buyClickLevel = () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel++;
            gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 2.2);
             updateDisplay();
            saveData();
            displayMessage('Уровень улучшения клика куплен!', 'green');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };
   const updatePlayerRating = async () => {
         if (tWebApp) {
             const userId = tWebApp.initDataUnsafe.user.id;

          try {
                await db.collection('players').doc(String(userId)).set({
                  clickCount: gameState.clickCount,
                  prestigeLevel: gameState.prestigeLevel,
                });
                displayMessage('Рейтинг обновлен!', 'green');
          } catch (e) {
              console.error('Failed to save rating', e);
              displayMessage('Не удалось обновить рейтинг', 'red');
           }
         }
      };

      // Функция для получения и отображения рейтинга
      const fetchAndDisplayRating = async () => {
        elements.rating.ratingTable.innerHTML = '';
        try {
          const querySnapshot = await db.collection('players').orderBy('clickCount', 'desc').get();
          const ratingData = [];
          querySnapshot.forEach((doc) => {
             if (tWebApp) {
                const userId = tWebApp.initDataUnsafe.user.id;
                 const userName = tWebApp.initDataUnsafe.user.username ? tWebApp.initDataUnsafe.user.username : tWebApp.initDataUnsafe.user.first_name;
                 const player = doc.data();
                 if (userId == doc.id) {
                     ratingData.push({ ...player, name: `${userName} (Вы)`, id: doc.id });
                 }
                 else {
                     ratingData.push({ ...player, name: `${userName ? userName : doc.id}`, id: doc.id });
                 }

            } else {
                const player = doc.data();
                 ratingData.push({ ...player, name: doc.id, id: doc.id });
            }
          });
           if (ratingData.length === 0) {
                elements.rating.ratingTable.innerHTML = '<p>Рейтинг пуст.</p>';
              return;
          }
          let tableHtml = '<table><thead><tr><th>Место</th><th>Игрок</th><th>Кликов</th><th>Престиж</th></tr></thead><tbody>';
          ratingData.forEach((player, index) => {
                tableHtml += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${Math.round(player.clickCount)}</td><td>${player.prestigeLevel}</td></tr>`;
          });
          tableHtml += '</tbody></table>';
          elements.rating.ratingTable.innerHTML = tableHtml;

        } catch (e) {
          console.error('Failed to fetch rating', e);
          elements.rating.ratingTable.innerHTML = '<p>Не удалось получить рейтинг.</p>';
           displayMessage('Не удалось загрузить рейтинг', 'red');
        }
      };


    const applyPrestige = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.prestigeLevel++;
            gameState.prestigeMultiplier *= calculatePrestigeBonus(gameState.artifacts);
            gameState.clickValue = 1;
             gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.clickUpgradeLevel = 1;
            gameState.clickUpgradeLevelCost = 100;
             gameState.prestigeCost = Math.round(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.2, gameState.prestigeLevel));
             clearInterval(gameState.autoClickerInterval);
             gameState.autoClickerInterval = null;
            updateDisplay();
            saveData();
             displayMessage(`Перерождение! Множитель: ${gameState.prestigeMultiplier.toFixed(2)}`, 'purple', '1.3em');
        } else {
            displayMessage('Недостаточно кликов для перерождения!', 'red');
        }
    };

    // 9. Магазин
    const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
            updateDisplay();
            saveData();
            displayMessage('Ключ куплен!', 'green');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyChest = (type) => {
        const cost = (type === 'common' ? 5 : type === 'rare' ? 10 : 20);
        if (gameState.diamonds >= cost) {
            gameState.diamonds -= cost;
            gameState.chests[type]++;
            updateDisplay();
            saveData();
            displayMessage(`Куплен ${type} сундук!`, 'green');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const generateRandomItem = (rarityChance, itemNames, itemType) => {
            const randomValue = Math.random();
            let cumulativeChance = 0;
            for (const itemName in rarityChance) {
                cumulativeChance += rarityChance[itemName];
                if (randomValue <= cumulativeChance) {
                        const randomItemName = Object.keys(itemNames).filter(key => gameConfig[`${itemType}_RARITY`][key] === itemName)[Math.floor(Math.random() * Object.keys(itemNames).filter(key => gameConfig[`${itemType}_RARITY`][key] === itemName).length)];
                         return randomItemName;
                }
            }
    };
    const openChest = () => {
          if (gameState.keys <= 0 && (gameState.chests.common <= 0 && gameState.chests.rare <= 0 && gameState.chests.epic <= 0 )) {
             displayMessage('Нет ключей или сундуков', 'red');
            return;
        }
        elements.shop.chestContainer.style.display = 'block';
        elements.shop.chestItemsDisplay.innerHTML = '';
          let items = [];
         if(gameState.keys > 0) {
              gameState.keys--;
             const chestRarity = Math.random();
             let chestType;
            if (chestRarity <= gameConfig.CHEST_RARITY_CHANCE.epic) {
               chestType = 'epic';
             } else if (chestRarity <= (gameConfig.CHEST_RARITY_CHANCE.rare + gameConfig.CHEST_RARITY_CHANCE.epic)) {
                chestType = 'rare';
             } else {
                chestType = 'common';
             }
            if (chestType == 'common'){
                 for (let i = 0; i < 3; i++) {
                            const skinItem = generateRandomItem(gameConfig.SKIN_RARITY_CHANCE, gameConfig.SKIN_NAMES, 'SKIN');
                             if (skinItem) {
                                   items.push({ type: 'skin', name: skinItem, rarity: gameConfig.SKIN_RARITY[skinItem] });
                            }
                        }
                }else if (chestType == 'rare'){
                     for (let i = 0; i < 2; i++) {
                            const skinItem = generateRandomItem(gameConfig.SKIN_RARITY_CHANCE, gameConfig.SKIN_NAMES, 'SKIN');
                            if (skinItem) {
                                items.push({ type: 'skin', name: skinItem, rarity: gameConfig.SKIN_RARITY[skinItem] });
                             }
                       }
                       const artifactItem = generateRandomItem(gameConfig.ARTIFACT_RARITY_CHANCE, gameConfig.ARTIFACT_NAMES, 'ARTIFACT');
                        if(artifactItem) {
                             items.push({ type: 'artifact', name: artifactItem, rarity: gameConfig.ARTIFACT_RARITY[artifactItem]});
                          }
                 }else if (chestType == 'epic') {
                        const artifactItem = generateRandomItem(gameConfig.ARTIFACT_RARITY_CHANCE, gameConfig.ARTIFACT_NAMES, 'ARTIFACT');
                         if(artifactItem) {
                              items.push({ type: 'artifact', name: artifactItem, rarity: gameConfig.ARTIFACT_RARITY[artifactItem]});
                           }
                        const skinItem = generateRandomItem(gameConfig.SKIN_RARITY_CHANCE, gameConfig.SKIN_NAMES, 'SKIN');
                         if (skinItem) {
                           items.push({ type: 'skin', name: skinItem, rarity: gameConfig.SKIN_RARITY[skinItem] });
                       }
                }
             }else {
                  let chestType = Object.keys(gameState.chests).filter(key => gameState.chests[key] > 0)[0]
                if(chestType) {
                     gameState.chests[chestType]--;
                     if (chestType == 'common'){
                      for (let i = 0; i < 3; i++) {
                             const skinItem = generateRandomItem(gameConfig.SKIN_RARITY_CHANCE, gameConfig.SKIN_NAMES, 'SKIN');
                             if (skinItem) {
                                items.push({ type: 'skin', name: skinItem, rarity: gameConfig.SKIN_RARITY[skinItem] });
                            }
                        }
                    }else if (chestType == 'rare'){
                        for (let i = 0; i < 2; i++) {
                            const skinItem = generateRandomItem(gameConfig.SKIN_RARITY_CHANCE, gameConfig.SKIN_NAMES, 'SKIN');
                             if (skinItem) {
                                items.push({ type: 'skin', name: skinItem, rarity: gameConfig.SKIN_RARITY[skinItem] });
                             }
                       }
                       const artifactItem = generateRandomItem(gameConfig.ARTIFACT_RARITY_CHANCE, gameConfig.ARTIFACT_NAMES, 'ARTIFACT');
                       if(artifactItem) {
                           items.push({ type: 'artifact', name: artifactItem, rarity: gameConfig.ARTIFACT_RARITY[artifactItem]});
                         }
                  }else if (chestType == 'epic') {
                         const artifactItem = generateRandomItem(gameConfig.ARTIFACT_RARITY_CHANCE, gameConfig.ARTIFACT_NAMES, 'ARTIFACT');
                        if(artifactItem) {
                           items.push({ type: 'artifact', name: artifactItem, rarity: gameConfig.ARTIFACT_RARITY[artifactItem]});
                          }
                         const skinItem = generateRandomItem(gameConfig.SKIN_RARITY_CHANCE, gameConfig.SKIN_NAMES, 'SKIN');
                            if (skinItem) {
                               items.push({ type: 'skin', name: skinItem, rarity: gameConfig.SKIN_RARITY[skinItem] });
                             }
                      }
                }
         }

            items.forEach(item => {
                if(item.type === 'skin'){
                    gameState.skins[item.name] = (gameState.skins[item.name] || 0) + 1;
                    const rarityColor = item.rarity === 'common' ? 'grey' : item.rarity === 'uncommon' ? 'lime' : item.rarity === 'rare' ? 'blue' : 'purple';
                    const itemName = gameConfig.SKIN_NAMES[item.name];
                     const itemElement = document.createElement('p');
                     itemElement.textContent = `Скин: ${itemName} (${item.rarity})`;
                     itemElement.style.color = rarityColor;
                    elements.shop.chestItemsDisplay.appendChild(itemElement);
                } else if (item.type === 'artifact'){
                    gameState.artifacts[item.name] = (gameState.artifacts[item.name] || 0) + 1;
                    const rarityColor = item.rarity === 'common' ? 'grey' : item.rarity === 'uncommon' ? 'lime' : item.rarity === 'rare' ? 'blue' : 'purple';
                    const itemName = gameConfig.ARTIFACT_NAMES[item.name];
                      const itemElement = document.createElement('p');
                    itemElement.textContent = `Артефакт: ${itemName} (${item.rarity})`;
                    itemElement.style.color = rarityColor;
                     elements.shop.chestItemsDisplay.appendChild(itemElement);
                 }
             });
          updateChestDisplay();
          saveData();
        };

    const closeChest = () => {
        elements.shop.chestContainer.style.display = 'none';
    };

    // 10. Инвентарь
    const updateProfile = () => {
        const profileInfo = document.getElementById('profile-info-content');
         profileInfo.innerHTML = `
           <h3>Ваш профиль</h3>
           <p>Клик: ${gameState.clickValue}</p>
           <p>Автокликер: ${gameState.autoClickerValue}</p>
            <p>Уровень улучшения клика: ${gameState.clickUpgradeLevel}</p>
           <p>Множитель перерождения: ${gameState.prestigeMultiplier.toFixed(2)}</p>
           <p>Уровень перерождения: ${gameState.prestigeLevel}</p>
            <p>Достижения: ${gameState.achievementCount}</p>
       `;
    };

     const updateInventoryDisplay = () => {
        elements.inventory.skinsDisplay.innerHTML = '';
       for (const skin in gameState.skins) {
              const rarityColor = gameConfig.SKIN_RARITY[skin] === 'common' ? 'grey' : gameConfig.SKIN_RARITY[skin] === 'uncommon' ? 'lime' : gameConfig.SKIN_RARITY[skin] === 'rare' ? 'blue' : 'purple';
             const skinElement = document.createElement('p');
             skinElement.textContent = `${gameConfig.SKIN_NAMES[skin]} (${gameState.skins[skin]})`;
               skinElement.style.color = rarityColor;
            elements.inventory.skinsDisplay.appendChild(skinElement);
        }
        elements.inventory.artifactsDisplay.innerHTML = '';
          for (const artifact in gameState.artifacts) {
              const rarityColor = gameConfig.ARTIFACT_RARITY[artifact] === 'common' ? 'grey' : gameConfig.ARTIFACT_RARITY[artifact] === 'uncommon' ? 'lime' : gameConfig.ARTIFACT_RARITY[artifact] === 'rare' ? 'blue' : 'purple';
              const artifactElement = document.createElement('p');
             artifactElement.textContent = `${gameConfig.ARTIFACT_NAMES[artifact]} (${gameState.artifacts[artifact]})`;
             artifactElement.style.color = rarityColor;
           elements.inventory.artifactsDisplay.appendChild(artifactElement);
       }
    };

     // 11. Экспедиции
    const startExpedition = (type) => {
        if (gameState.diamonds >= gameConfig.EXPEDITION_COSTS[type]) {
            gameState.diamonds -= gameConfig.EXPEDITION_COSTS[type];
            gameState.activeExpedition = type;
            gameState.expeditionStartTime = Date.now();
             gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type];
             gameState.expeditionReward = gameConfig.EXPEDITION_REWARDS[type];
            updateDisplay();
            startExpeditionTimer();
            saveData();
            displayMessage(`Экспедиция ${gameConfig.EXPEDITION_TYPES[type]} началась!`, 'green');
        } else {
             displayMessage('Недостаточно алмазов для экспедиции!', 'red');
        }
    };

    const startExpeditionTimer = () => {
        gameState.expeditionInterval = setInterval(updateExpeditionProgressBar, 1000);
    };

    const finishExpedition = () => {
        if (gameState.activeExpedition) {
             const minReward = gameState.expeditionReward[0];
             const maxReward = gameState.expeditionReward[1];
              const diamondsReward = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;
            gameState.diamonds += diamondsReward * calculateDiamondBonus(gameState.artifacts);
            displayMessage(`Экспедиция ${gameConfig.EXPEDITION_TYPES[gameState.activeExpedition]} завершена! Вы получили ${diamondsReward} алмазов`, 'gold');
              gameState.activeExpedition = null;
            clearInterval(gameState.expeditionInterval);
              gameState.expeditionInterval = null;
            updateDisplay();
             saveData();
        }
    };

    const updateExpeditionButtonInfo = () => {
        const expeditionButtons = document.querySelectorAll('.expedition-button');
        expeditionButtons.forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.EXPEDITION_COSTS[type];
            button.textContent = `${gameConfig.EXPEDITION_TYPES[type]} (${cost}💎)`;
         });
    };

   // 12. Автосохранение
     const autoSaveInterval = 60000;
     let autoSaveTimer;

     const startAutoSave = () => {
           if (!autoSaveTimer) {
             autoSaveTimer = setInterval(() => {
                 saveData();
                  displayMessage('Игра сохранена автоматически', 'lightblue', '0.8em');
                }, autoSaveInterval);
           }
       };

     const clearAutoSave = () => {
          if (autoSaveTimer) {
            clearInterval(autoSaveTimer);
             autoSaveTimer = null;
          }
      };

    // 13. Назначение слушателей событий
    elements.clicker.clickButton.addEventListener('click', applyClick);
    elements.clicker.upgradeClickButton.addEventListener('click', buyClickUpgrade);
    elements.clicker.upgradeAutoButton.addEventListener('click', buyAutoClicker);
    elements.clicker.upgradeClickLevelButton.addEventListener('click', buyClickLevel);
    elements.shop.prestigeButton.addEventListener('click', applyPrestige);
    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);
    elements.menu.resetButton.addEventListener('click', resetGame);
   elements.rating.updateRatingButton.addEventListener('click', updatePlayerRating);
    elements.menu.menuButton.addEventListener('click', () => elements.menu.menu.classList.toggle('active'));
    elements.menu.menuItems.forEach(item => item.addEventListener('click', () => switchTab(item.dataset.tab)));
    elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => button.addEventListener('click', () => startExpedition(button.dataset.type)));

    // Инициализация игры
    loadGame();
    startAutoSave();
    updateDisplay();
    fetchAndDisplayRating();
    switchTab('clicker');
});
