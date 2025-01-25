
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
    const tWebApp = window.Telegram && window.Telegram.WebApp;
    let firebaseApp;
    let db;

     if (tWebApp) {
            tWebApp.ready();

            firebaseApp = firebase.initializeApp({
              apiKey: "your_api_key",
              authDomain: "your_auth_domain",
              projectId: "your_project_id",
              storageBucket: "your_storage_bucket",
              messagingSenderId: "your_messaging_sender_id",
              appId: "your_app_id"
            });

            db = firebase.firestore(firebaseApp);
        }

        const getAndUpdateLeaderboard = async () => {
            if (!db) return;

            try {
                const playersRef = db.collection('players');
                const snapshot = await playersRef.orderBy('clickCount', 'desc').get(); // Получаем всех игроков, отсортированных по кликам
                const leaderboard = [];
                snapshot.forEach(doc => {
                    leaderboard.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
              //  console.log(leaderboard)
                // Теперь у вас есть массив leaderboard, который отсортирован по кликам
                // Здесь нужно добавить логику для отображения рейтинга в UI
                 updateLeaderboardDisplay(leaderboard); // Функция отображения
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        const updateLeaderboardDisplay = (leaderboard) => {
          const leaderboardContainer = document.getElementById('leaderboard-container'); // Получаем div под рейтинг
            if(!leaderboardContainer) return
           leaderboardContainer.innerHTML = ''; // Очищаем предыдущий рейтинг

            leaderboard.forEach((player, index) => {
                const playerElement = document.createElement('p');
                playerElement.textContent = `#${index + 1}  ${player.id} - Кликов: ${Math.round(player.clickCount)}`;
                leaderboardContainer.appendChild(playerElement);
            });
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
        },
         rating: {
             ratingContent: document.getElementById('rating-content'),
              updateRatingButton: document.getElementById('update-rating-button'),
            },
    };
      elements.rating.updateRatingButton.addEventListener('click', getAndUpdateLeaderboard);
    
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
        updateRating();
    };

    const autoClick = () => {
        gameState.clickCount += (gameState.autoClickerValue * gameState.clickUpgradeLevel * calculateAutoClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
        updateDisplay();
         updateRating();
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
        updateRating();
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
                getAndUpdateLeaderboard();// Вызов getAndUpdateLeaderboard после загрузки игры
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
     const updateRating = async () => {
        if (!db) return;

        try {
            const userId = tWebApp ? tWebApp.initDataUnsafe?.user?.id : 'localUser'; // Use Telegram user ID or a fallback
            if (!userId) {
                console.log('User ID not found.');
                return;
            }
             const userRef = db.collection('players').doc(String(userId));
             await userRef.set({
                clickCount: gameState.clickCount,
             }, { merge: true });
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };
    
    const switchTab = (tabId) => {
    elements.menu.clickerContent.style.display = tabId === 'clicker' ? 'block' : 'none';
    elements.menu.gameContent.style.display = tabId === 'shop' ? 'block' : 'none';
    elements.map.mapContainer.style.display = tabId === 'map' ? 'block' : 'none';
    elements.inventory.inventoryContainer.style.display = (tabId === 'profile') ? 'block' : 'none';
    elements.rating.ratingContent.style.display = (tabId === 'rating') ? 'block' : 'none';
    // Добавляем логику для переключения табов внутри профиля
    if (tabId === 'profile') {
        const profileInfo = document.getElementById('profile-info');
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
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type];
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
        gameState.diamonds += Math.round(reward * calculateDiamondBonus(gameState.artifacts));
        const expeditionType = gameState.activeExpedition;
        gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
        gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
        displayMessage(`Экспедиция "${gameConfig.EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${Math.round(reward * calculateDiamondBonus(gameState.artifacts))} алмазов`, 'gold', '1.2em');
        updateDisplay();
        saveData();
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
    
    if (gameState.keys <= 0) {
            displayMessage('Нет ключей для открытия', 'red');
            return;
        }
    
        gameState.keys--;
        gameState.chests[chestType]--;
        updateDisplay();
        
        const rollItem = (itemType) => {
        let items = null;
        let rarityChances = null;

            if(itemType === 'skins') {
            items = Object.keys(gameConfig.SKIN_NAMES);
            rarityChances = gameConfig.SKIN_RARITY_CHANCE;
           }
        if(itemType === 'artifacts') {
            items = Object.keys(gameConfig.ARTIFACT_NAMES);
            rarityChances = gameConfig.ARTIFACT_RARITY_CHANCE;
           }

            if (!items) return null;

            const random = Math.random();
            let cumulativeChance = 0;
            let rarity = 'common';

            for (const key in rarityChances) {
                cumulativeChance += rarityChances[key];
                if (random <= cumulativeChance) {
                    rarity = key;
                    break;
                }
            }

           const filteredItems = items.filter(item => gameConfig[`${itemType.toUpperCase()}_RARITY`][item] === rarity);
            const randomIndex = Math.floor(Math.random() * filteredItems.length);
          return filteredItems[randomIndex];
        };
        
        const items = [];
        for (let i = 0; i < 3; i++) {
            const itemType = Math.random() < 0.5 ? 'skins' : 'artifacts';
             const item = rollItem(itemType);
            if (item) {
            items.push({type:itemType, item});
            }
        }
        
        
    items.forEach(item => {
           if(item.type === 'skins') {
            gameState.skins[item.item] = (gameState.skins[item.item] || 0) + 1;
               const imagePath = `${item.item}.jpg`;
                const newItemElement = document.createElement('div');
                newItemElement.innerHTML = `Выпал ${getImageTag(item.item, imagePath, gameConfig.SKIN_NAMES[item.item] || item.item)} <span>${gameConfig.SKIN_NAMES[item.item] || item.item}</span>`;
                 elements.shop.chestItemsDisplay.appendChild(newItemElement);
           }
             if(item.type === 'artifacts') {
            gameState.artifacts[item.item] = (gameState.artifacts[item.item] || 0) + 1;
                const imagePath = `${item.item}.jpg`;
                const newItemElement = document.createElement('div');
               newItemElement.innerHTML = `Выпал ${getImageTag(item.item, imagePath, gameConfig.ARTIFACT_NAMES[item.item] || item.item)} <span>${gameConfig.ARTIFACT_NAMES[item.item] || item.item}</span>`;
                 elements.shop.chestItemsDisplay.appendChild(newItemElement);
            }
        });
    
        elements.shop.chestContainer.style.display = 'block';
    };
    
    const closeChest = () => {
    elements.shop.chestContainer.style.display = 'none';
};

const getImageTag = (itemName, imagePath, name = '') => {
    if (imagePath) {
        return `<img class="item-image" src="img/${imagePath}" alt="${name}">`;
    }
    // В противном случае, возвращаем пустую строку или другое значение по умолчанию
    return '';
};


const updateInventoryDisplay = () => {
    elements.inventory.skinsDisplay.innerHTML = '';
    const skins = {};
    for (const skin in gameState.skins) {
        if (gameState.skins.hasOwnProperty(skin) && gameState.skins[skin] > 0) {
            skins[skin] = gameState.skins[skin];
        }
    }
    for (const skin in skins) {
        const skinElement = document.createElement('div');
        const imagePath = `${skin}.jpg`;
        skinElement.innerHTML = `${getImageTag(skin, imagePath, gameConfig.SKIN_NAMES[skin] || skin)} <span>${gameConfig.SKIN_NAMES[skin] || skin} x${skins[skin]}</span>`;
        skinElement.addEventListener('click', () => {
            const rarity = gameConfig.SKIN_RARITY[skin];
            let bonuses = '';
            if (gameConfig.SKIN_EFFECTS[skin]) {
                for (const effect in gameConfig.SKIN_EFFECTS[skin]) {
                    bonuses += `${effect}: ${gameConfig.SKIN_EFFECTS[skin][effect]} \n`;
                }
            }
            createItemPopup('skins', skin, gameConfig.SKIN_NAMES[skin] || skin, skins[skin], rarity || 'Неизвестно', bonuses);
        });
        elements.inventory.skinsDisplay.appendChild(skinElement);
    }

    elements.inventory.artifactsDisplay.innerHTML = '';
    const artifacts = {};
    for (const artifact in gameState.artifacts) {
        if (gameState.artifacts.hasOwnProperty(artifact) && gameState.artifacts[artifact] > 0) {
            artifacts[artifact] = gameState.artifacts[artifact];
        }
    }
    for (const artifact in artifacts) {
        const artifactElement = document.createElement('div');
        const imagePath = `${artifact}.jpg`;
        artifactElement.innerHTML = `${getImageTag(artifact, imagePath, gameConfig.ARTIFACT_NAMES[artifact] || artifact)} <span>${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${artifacts[artifact]}</span>`;
        artifactElement.addEventListener('click', () => {
            const rarity = gameConfig.ARTIFACT_RARITY[artifact];
            let bonuses = '';
            if (gameConfig.ARTIFACT_EFFECTS[artifact]) {
                for (const effect in gameConfig.ARTIFACT_EFFECTS[artifact]) {
                    bonuses += `${effect}: ${gameConfig.ARTIFACT_EFFECTS[artifact][effect]} \n`;
                }
            }
            createItemPopup('artifacts', artifact, gameConfig.ARTIFACT_NAMES[artifact] || artifact, artifacts[artifact], rarity || 'Неизвестно', bonuses);
        });
        elements.inventory.artifactsDisplay.appendChild(artifactElement);
    }
};
    const updateProfile = () => {
        const profileInfo = document.getElementById('profile-info');
        profileInfo.innerHTML = ''; // Очищаем предыдущую информацию

        const clickValue = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier;
        const clickPowerInfo = document.createElement('p');
        clickPowerInfo.textContent = `Сила клика: ${clickValue.toFixed(2)} (база ${gameState.clickValue}, уровень ${gameState.clickUpgradeLevel}, усиление скинами: ${calculateClickBonus(gameState.skins).toFixed(2)}, престиж ${gameState.prestigeMultiplier.toFixed(2)})`;
        profileInfo.appendChild(clickPowerInfo);
    
        const clickCountInfo = document.createElement('p');
        clickCountInfo.textContent = `Количество кликов: ${Math.round(gameState.clickCount)}`;
        profileInfo.appendChild(clickCountInfo);


        const diamondsInfo = document.createElement('p');
        diamondsInfo.textContent = `Алмазов: ${gameState.diamonds}`;
        profileInfo.appendChild(diamondsInfo);


        const prestigeLevelInfo = document.createElement('p');
        prestigeLevelInfo.textContent = `Уровень престижа: ${gameState.prestigeLevel}`;
        profileInfo.appendChild(prestigeLevelInfo);

        const autoClickerInfo = document.createElement('p');
        autoClickerInfo.textContent = `Автокликеров: ${gameState.autoClickerValue}`;
        profileInfo.appendChild(autoClickerInfo);

        const autoClickerBonusInfo = document.createElement('p');
            autoClickerBonusInfo.textContent = `Бонус автокликеров: x${calculateAutoClickBonus(gameState.skins).toFixed(2)}`;
            profileInfo.appendChild(autoClickerBonusInfo);


        const prestigeBonusInfo = document.createElement('p');
        prestigeBonusInfo.textContent = `Бонус престижа: x${calculatePrestigeBonus(gameState.artifacts).toFixed(2)}`;
        profileInfo.appendChild(prestigeBonusInfo);

        const diamondBonusInfo = document.createElement('p');
        diamondBonusInfo.textContent = `Бонус алмазов: x${calculateDiamondBonus(gameState.artifacts).toFixed(2)}`;
        profileInfo.appendChild(diamondBonusInfo);

        const skinsAndArtifacts = document.createElement('div');
         skinsAndArtifacts.innerHTML = '<h3>Скины и Артефакты</h3>';
         profileInfo.appendChild(skinsAndArtifacts);

         const ownedSkins = document.createElement('div');
        ownedSkins.innerHTML = '<h4>Скины</h4>';
        for (const skin in gameState.skins) {
          if (gameState.skins.hasOwnProperty(skin) && gameState.skins[skin] > 0) {
            ownedSkins.innerHTML += `<p>${gameConfig.SKIN_NAMES[skin] || skin} (x${gameState.skins[skin]})</p>`;
           }
         }
        profileInfo.appendChild(ownedSkins);

        const ownedArtifacts = document.createElement('div');
            ownedArtifacts.innerHTML = '<h4>Артефакты</h4>';
            for (const artifact in gameState.artifacts) {
                if (gameState.artifacts.hasOwnProperty(artifact) && gameState.artifacts[artifact] > 0) {
                ownedArtifacts.innerHTML += `<p>${gameConfig.ARTIFACT_NAMES[artifact] || artifact} (x${gameState.artifacts[artifact]})</p>`;
               }
             }
        profileInfo.appendChild(ownedArtifacts);
    };
// 8. Обработчики событий
elements.clicker.clickButton.addEventListener('click', applyClick);

elements.clicker.upgradeClickLevelButton.addEventListener('click', () => {
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

elements.clicker.upgradeClickButton.addEventListener('click', () => {
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

elements.clicker.upgradeAutoButton.addEventListener('click', () => {
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

elements.shop.prestigeButton.addEventListener('click', () => {
    if (gameState.clickCount >= gameState.prestigeCost) {
        gameState.prestigeLevel++;
        gameState.prestigeMultiplier = Math.round(gameState.prestigeMultiplier * calculatePrestigeBonus(gameState.artifacts));
        gameState.clickCount = 0;
        gameState.clickValue = 1;
        gameState.autoClickerValue = 0;
        gameState.clickUpgradeCost = 10;
        gameState.autoUpgradeCost = 50;
         gameState.clickUpgradeLevel = 1;
         gameState.clickUpgradeLevelCost = 100;
        gameState.prestigeCost = Math.round(gameConfig.PRESTIGE_BASE_COST * Math.pow(10, gameState.prestigeLevel));
        clearAllTimeouts();
        updateDisplay();
        displayMessage('Перерождение!');
        updateRating();
    } else {
        displayMessage(`Недостаточно кликов! (нужно ${gameState.prestigeCost})`, 'red');
    }
});

elements.shop.buyKeyButton.addEventListener('click', buyKey);
elements.shop.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
elements.shop.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
elements.shop.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
elements.shop.openChestButton.addEventListener('click', openChest);
elements.shop.closeChestButton.addEventListener('click', closeChest);
elements.menu.resetButton.addEventListener('click', resetGame);

elements.menu.menuButton.addEventListener('click', () => {
    elements.menu.menu.classList.toggle('active');
    elements.menu.menuButton.classList.toggle('active');
});

elements.menu.menuItems.forEach(item => {
    item.addEventListener('click', () => {
        switchTab(item.dataset.tab);
        elements.menu.menu.classList.remove('active');
        elements.menu.menuButton.classList.remove('active');
    });
});

elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
    button.addEventListener('click', () => {
        startExpedition(button.dataset.type);
    });
});
    
    
const AUTO_SAVE_INTERVAL = 10000;
const autoSave = () => {
    saveData();
};
let autoSaveInterval = setInterval(autoSave, AUTO_SAVE_INTERVAL);

const clearAutoSave = () => {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
};

const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          clearAutoSave();
          saveData();
        }
    };
    
document.addEventListener('visibilitychange', handleVisibilityChange);
    
if (tWebApp) {
    tWebApp.onEvent('mainButtonClicked', () => {
        saveData();
    });
}

loadGame();

if (autoSaveInterval == null) {
    autoSaveInterval = setInterval(autoSave, AUTO_SAVE_INTERVAL);
}

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
globalMessageContainer.style.zIndex = '1002';
globalMessageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
globalMessageContainer.style.padding = '10px';
globalMessageContainer.style.borderRadius = '5px';
globalMessageContainer.style.color = 'white';
document.body.appendChild(globalMessageContainer);
elements.global.globalMessageDisplay = globalMessageContainer;
});
