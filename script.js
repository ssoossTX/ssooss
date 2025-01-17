
 document.addEventListener('DOMContentLoaded', () => {
    const SAVE_KEY = 'clickerData';
    const ACTIVE_TAB_KEY = 'activeTab';
    const MESSAGE_DURATION = 3000;
    const AUTO_CLICK_INTERVAL = 1000;
    const PRESTIGE_BASE_COST = 10000;
    const AUTO_SAVE_INTERVAL = 15000;
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
    const CHEST_RARITY_CHANCE = {
        'common': 0.7,
        'rare': 0.25,
        'epic': 0.05,
    };
    const SKIN_RARITY_CHANCE = {
        'common': 0.6,
        'uncommon': 0.3,
        'rare': 0.08,
        'epic': 0.02,
    };
    const ARTIFACT_RARITY_CHANCE = {
         'common': 0.7,
        'uncommon': 0.2,
        'rare': 0.08,
        'epic': 0.02,
    };
    const SKIN_EFFECTS = {
        'skin_common_1': { clickValueBonus: 1.05 },
        'skin_uncommon_1': { clickValueBonus: 1.1 },
        'skin_rare_1': { clickValueBonus: 1.2 },
        'skin_epic_1': { clickValueBonus: 1.5 },
            'skin_common_2': { autoClickerBonus: 1.05 },
        'skin_uncommon_2': { autoClickerBonus: 1.1 },
        'skin_rare_2': { autoClickerBonus: 1.2 },
        'skin_epic_2': { autoClickerBonus: 1.5 },
    };
    const ARTIFACT_EFFECTS = {
          'artifact_common_1': { prestigeMultiplierBonus: 1.1 },
        'artifact_uncommon_1': { prestigeMultiplierBonus: 1.2 },
        'artifact_rare_1': { prestigeMultiplierBonus: 1.3 },
        'artifact_epic_1': { prestigeMultiplierBonus: 1.5 },
              'artifact_common_2': { diamondBonus: 1.05 },
        'artifact_uncommon_2': { diamondBonus: 1.1 },
        'artifact_rare_2': { diamondBonus: 1.2 },
        'artifact_epic_2': { diamondBonus: 1.5 },
    };
    const SKIN_NAMES = {
        'skin_common_1': 'Обычный скин (1)',
        'skin_uncommon_1': 'Необычный скин (1)',
        'skin_rare_1': 'Редкий скин (1)',
        'skin_epic_1': 'Эпический скин (1)',
         'skin_common_2': 'Обычный скин (2)',
        'skin_uncommon_2': 'Необычный скин (2)',
        'skin_rare_2': 'Редкий скин (2)',
        'skin_epic_2': 'Эпический скин (2)',
    };
    const ARTIFACT_NAMES = {
          'artifact_common_1': 'Обычный артефакт (1)',
        'artifact_uncommon_1': 'Необычный артефакт (1)',
        'artifact_rare_1': 'Редкий артефакт (1)',
        'artifact_epic_1': 'Эпический артефакт (1)',
            'artifact_common_2': 'Обычный артефакт (2)',
        'artifact_uncommon_2': 'Необычный артефакт (2)',
        'artifact_rare_2': 'Редкий артефакт (2)',
        'artifact_epic_2': 'Эпический артефакт (2)',
    };
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
         keys: 0,
        chests: {
            'common': 0,
            'rare': 0,
            'epic': 0
        },
         skins: [],
         artifacts: [],
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
         clickerContent: document.getElementById('clicker-content'),
        gameContent: document.getElementById('game-content'),
        menuItems: document.querySelectorAll('.menu-items li button'),
        mapContainer: document.getElementById('map-container'),
        expeditionProgressDisplay: document.getElementById('expedition-progress'),
        diamondDisplay: document.getElementById('diamonds-menu-profile'),
        prestigeCostDisplay: document.getElementById('prestige-cost'),
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
        inventoryButton: document.getElementById('inventory-button'),
        inventoryContainer: document.getElementById('inventory-container'),
         openChestButton: document.getElementById('open-chest-button'),
         chestItemsDisplay: document.getElementById('chest-items'),
         closeChestButton: document.getElementById('close-chest-button'),
         chestContainer: document.getElementById('chest-container'),
        skinsDisplay: document.getElementById('skins-display'),
        artifactsDisplay: document.getElementById('artifacts-display'),
    };
       elements.globalMessageDisplay.style.display = 'none';
    const tWebApp = window.Telegram && window.Telegram.WebApp;
    if (tWebApp) {
        tWebApp.ready();
    }
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
                     gameState.clickUpgradeLevel = 1
                }
                   updateDisplay();
            } catch (e) {
                 console.error('Failed to load game', e);
            }
        };
        if (tWebApp) {
          tWebApp.CloudStorage.getItem(SAVE_KEY).then((savedDataString) => {
             if (savedDataString) {
                  loadFromStorage(tWebApp.CloudStorage)
              } else {
                  gameState.clickValue = 1;
                 gameState.clickUpgradeLevel = 1;
                  updateDisplay();
             }
              });
           } else {
                 loadFromStorage(localStorage);
            }
        };
     const activateTab = (tabId) => {
           elements.menuItems.forEach(item => item.classList.remove('active'));
        const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
         if (selectedTab) {
               selectedTab.classList.add('active');
             }
        elements.clickerContent.style.display = tabId === 'clicker' ? 'block' : 'none';
        elements.gameContent.style.display = tabId === 'shop' ? 'block' : 'none';
        elements.mapContainer.style.display = tabId === 'map' ? 'block' : 'none';
        elements.inventoryContainer.style.display = tabId === 'profile' ? 'block' : 'none';
     };
    const loadActiveTab = () => {
        let activeTab = 'clicker';
          const loadActiveTabFromStorage = (storage) => {
              const savedTab = storage.getItem(ACTIVE_TAB_KEY);
               if (savedTab) {
                    activeTab = savedTab;
                    activateTab(activeTab)
                } else {
                 activateTab(activeTab)
                }
            };
           if (tWebApp) {
               tWebApp.CloudStorage.getItem(ACTIVE_TAB_KEY).then((savedTab) => {
                  if(savedTab) {
                       loadActiveTabFromStorage(tWebApp.CloudStorage);
                     } else {
                        loadActiveTabFromStorage(tWebApp.CloudStorage)
                      }
               })
             } else {
                 loadActiveTabFromStorage(localStorage);
             }
    };
     const saveActiveTab = (tabId) => {
         if (tWebApp) {
              tWebApp.CloudStorage.setItem(ACTIVE_TAB_KEY, tabId);
            } else {
              localStorage.setItem(ACTIVE_TAB_KEY, tabId);
            }
        };
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
         elements.keyDisplay.textContent = `Ключи: ${gameState.keys}`;
        elements.chestDisplay.common.textContent = `Обычные: ${gameState.chests.common}`;
        elements.chestDisplay.rare.textContent = `Редкие: ${gameState.chests.rare}`;
        elements.chestDisplay.epic.textContent = `Эпические: ${gameState.chests.epic}`;
        updateExpeditionProgress();
        updateExpeditionButtonInfo();
           updateInventoryDisplay();
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
        elements.globalMessageDisplay.classList.add('show');
        setTimeout(() => {
            elements.globalMessageDisplay.textContent = '';
             elements.globalMessageDisplay.classList.remove('show');
        }, MESSAGE_DURATION);
    };
    const applyClick = () => {
        let clickBonus = 1;
       gameState.skins.forEach(skin => {
            if (SKIN_EFFECTS[skin] && SKIN_EFFECTS[skin].clickValueBonus) {
                clickBonus *= SKIN_EFFECTS[skin].clickValueBonus;
            }
        });
         gameState.clickCount += (gameState.clickValue * gameState.clickUpgradeLevel * clickBonus) * gameState.prestigeMultiplier;
        updateDisplay();
        checkAchievements();
    };
    const autoClick = () => {
          let autoClickBonus = 1;
       gameState.skins.forEach(skin => {
            if (SKIN_EFFECTS[skin] && SKIN_EFFECTS[skin].autoClickerBonus) {
                autoClickBonus *= SKIN_EFFECTS[skin].autoClickerBonus;
            }
        });
         gameState.clickCount += (gameState.autoClickerValue * gameState.clickUpgradeLevel * autoClickBonus) * gameState.prestigeMultiplier;
        updateDisplay();
    };
    const startAutoClicker = () => {
        if (gameState.autoClickerValue > 0 && !gameState.autoClickerInterval) {
            gameState.autoClickerInterval = setInterval(autoClick, AUTO_CLICK_INTERVAL);
        }
    };
    const startRandomEvent = () => {
    };
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
     const clearAutoSave = () => {
            clearInterval(gameState.autoSaveInterval);
            gameState.autoSaveInterval = null;
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
           keys: 0,
        chests: {
            'common': 0,
            'rare': 0,
            'epic': 0
        },
         skins: [],
         artifacts: [],
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
        if (gameState.expeditionInterval) {
            clearInterval(gameState.expeditionInterval);
            gameState.expeditionInterval = null;
        }
           clearAutoSave();
    };
    const clearSaveData = () => {
        if (tWebApp) {
            tWebApp.CloudStorage.removeItem(SAVE_KEY);
              tWebApp.CloudStorage.removeItem(ACTIVE_TAB_KEY);
        } else {
            localStorage.removeItem(SAVE_KEY);
             localStorage.removeItem(ACTIVE_TAB_KEY);
        }
    };
    const saveData = () => {
         try {
            const {
                autoClickerInterval,
                bonusTimeout,
                randomEventTimeout,
                expeditionInterval,
                autoSaveInterval,
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
    const autoSave = () => {
         saveData();
    };
    const startAutoSave = () => {
           if (!gameState.autoSaveInterval) {
                gameState.autoSaveInterval = setInterval(autoSave, AUTO_SAVE_INTERVAL);
            }
      };
    const handleMenuToggle = () => {
        elements.menu.classList.toggle('active');
        elements.menuButton.classList.toggle('active');
    };
    const handleMenuButtonClick = (event) => {
        const tabId = event.target.getAttribute('data-tab');
        if (tabId) {
            activateTab(tabId);
             saveActiveTab(tabId);
        }
        handleMenuToggle();
    };
    const startExpedition = (type) => {
        if (gameState.activeExpedition) {
            displayMessage(`Экспедиция уже запущена!`, 'red');
           return;
        }
         if (gameState.diamonds < gameState.expeditionCosts[type]) {
            displayMessage(`Недостаточно алмазов для ${EXPEDITION_TYPES[type]} экспедиции!`, 'red');
            return;
        }
        gameState.diamonds -= gameState.expeditionCosts[type];
        gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = EXPEDITION_DURATIONS[type];
          const rewardRange = gameState.expeditionRewards[type];
           gameState.expeditionReward = Math.floor(Math.random() * (rewardRange[1] - rewardRange[0] + 1)) + rewardRange[0];
        updateDisplay();
        displayMessage(`Экспедиция ${EXPEDITION_TYPES[type]} началась!`, 'green');
    };
    const finishExpedition = () => {
        gameState.diamonds += gameState.expeditionReward;
         displayMessage(`Экспедиция ${EXPEDITION_TYPES[gameState.activeExpedition]} завершена! Награда: ${gameState.expeditionReward} 💎`, 'green');
        gameState.activeExpedition = null;
         gameState.expeditionStartTime = null;
         gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
        updateDisplay();
    };
      const updateExpeditionButtonInfo = () => {
       const buttons = document.querySelectorAll('.expedition-button');
        buttons.forEach(button => {
            const type = button.getAttribute('data-type');
            if (type) {
              const cost = gameState.expeditionCosts[type];
                 button.textContent = `${EXPEDITION_TYPES[type]} (${cost} 💎)`;
            }
        });
    };
    const openChest = () => {
        if (gameState.keys <= 0) {
           displayMessage('Нет ключей для открытия сундука!', 'red');
            return;
         }
        gameState.keys -= 1;
          const chestRarity = getRandomRarity(CHEST_RARITY_CHANCE);
        gameState.chests[chestRarity] += 1;
          displayChestItems();
           elements.chestContainer.style.display = 'block';
             updateDisplay();
          saveData()
        };
       const displayChestItems = () => {
            elements.chestItemsDisplay.innerHTML = '';
             let skinChance = Math.random()
           if (skinChance <= 0.3) {
               const skinRarity = getRandomRarity(SKIN_RARITY_CHANCE);
               const skin = `skin_${skinRarity}_${Math.floor(Math.random() * 2) + 1}`;
             if (!gameState.skins.includes(skin)) {
                 gameState.skins.push(skin);
                const skinDiv = document.createElement('div');
               skinDiv.textContent = `Получен скин: ${SKIN_NAMES[skin] || 'Неизвестный скин'}`;
                elements.chestItemsDisplay.appendChild(skinDiv);
                 } else {
                    const skinDiv = document.createElement('div');
                   skinDiv.textContent = `Получен повторный скин: ${SKIN_NAMES[skin] || 'Неизвестный скин'}`;
                    elements.chestItemsDisplay.appendChild(skinDiv);
                 }
           }
           let artifactChance = Math.random();
            if (artifactChance <= 0.3) {
                 const artifactRarity = getRandomRarity(ARTIFACT_RARITY_CHANCE);
                 const artifact = `artifact_${artifactRarity}_${Math.floor(Math.random() * 2) + 1}`;
              if (!gameState.artifacts.includes(artifact)) {
                    gameState.artifacts.push(artifact);
                    const artifactDiv = document.createElement('div');
                      artifactDiv.textContent = `Получен артефакт: ${ARTIFACT_NAMES[artifact] || 'Неизвестный артефакт'}`;
                    elements.chestItemsDisplay.appendChild(artifactDiv);
              } else {
                   const artifactDiv = document.createElement('div');
                    artifactDiv.textContent = `Получен повторный артефакт: ${ARTIFACT_NAMES[artifact] || 'Неизвестный артефакт'}`;
                  elements.chestItemsDisplay.appendChild(artifactDiv);
              }
          }
        let diamondReward = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
       gameState.diamonds += diamondReward;
      const diamondDiv = document.createElement('div');
            diamondDiv.textContent = `Получено ${diamondReward} 💎!`;
       elements.chestItemsDisplay.appendChild(diamondDiv);
        updateDisplay();
     };
    const getRandomRarity = (rarityChance) => {
            const rand = Math.random();
            let cumulativeProbability = 0;
            for (const [rarity, chance] of Object.entries(rarityChance)) {
                cumulativeProbability += chance;
                if (rand <= cumulativeProbability) {
                    return rarity;
                }
            }
            return 'common';
        };
    const updateInventoryDisplay = () => {
        elements.skinsDisplay.innerHTML = '';
        elements.artifactsDisplay.innerHTML = '';
           gameState.skins.forEach(skin => {
            const skinDiv = document.createElement('div');
            skinDiv.textContent = SKIN_NAMES[skin] || skin;
            elements.skinsDisplay.appendChild(skinDiv);
        });
            gameState.artifacts.forEach(artifact => {
           const artifactDiv = document.createElement('div');
             artifactDiv.textContent = ARTIFACT_NAMES[artifact] || artifact;
            elements.artifactsDisplay.appendChild(artifactDiv);
        });
    };
    loadGame();
    loadActiveTab();
    startAutoClicker();
    startRandomEvent();
    startAutoSave();
    elements.clickButton.addEventListener('click', applyClick);
    elements.upgradeClickButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickUpgradeCost = Math.ceil(gameState.clickUpgradeCost * 1.5);
            gameState.clickValue++;
            updateDisplay();
             saveData();
               displayMessage('Улучшение клика куплено!', 'green')
        } else {
                displayMessage('Недостаточно кликов для улучшения!', 'red');
            }
    });
    elements.upgradeAutoButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoUpgradeCost = Math.ceil(gameState.autoUpgradeCost * 1.5);
            gameState.autoClickerValue++;
            startAutoClicker();
            updateDisplay();
            saveData();
              displayMessage('Автокликер куплен!', 'green')
        } else {
              displayMessage('Недостаточно кликов для автокликера!', 'red');
        }
    });
     elements.upgradeClickLevelButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevelCost = Math.ceil(gameState.clickUpgradeLevelCost * 1.7);
            gameState.clickUpgradeLevel++;
            updateDisplay();
             saveData();
             displayMessage('Уровень клика увеличен!', 'green');
        } else {
              displayMessage('Недостаточно кликов для улучшения уровня!', 'red');
        }
    });
    elements.prestigeButton.addEventListener('click', () => {
         if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
              gameState.prestigeLevel++;
              gameState.prestigeMultiplier *= 2;
               gameState.prestigeCost = Math.ceil(gameState.prestigeCost * 2);
            updateDisplay();
            saveData();
              displayMessage('Перерождение!', 'green');
        } else {
             displayMessage('Недостаточно кликов для перерождения!', 'red');
        }
    });
    elements.resetButton.addEventListener('click', resetGame);
    elements.menuButton.addEventListener('click', handleMenuToggle);
    elements.menuItems.forEach(item => item.addEventListener('click', handleMenuButtonClick));
    elements.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const type = event.target.getAttribute('data-type');
            if (type) {
                startExpedition(type);
            }
        });
    });
      elements.buyKeyButton.addEventListener('click', () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
             displayMessage('Ключ куплен!', 'green');
             updateDisplay();
             saveData();
        } else {
              displayMessage('Недостаточно алмазов!', 'red');
        }
    });
      elements.buyCommonChestButton.addEventListener('click', () => {
          if (gameState.diamonds >= 5) {
              gameState.diamonds -= 5;
                gameState.chests.common++;
            displayMessage('Обычный сундук куплен!', 'green');
             updateDisplay();
              saveData();
          }  else {
              displayMessage('Недостаточно алмазов!', 'red');
          }
       });
    elements.buyRareChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 10) {
              gameState.diamonds -= 10;
             gameState.chests.rare++;
           displayMessage('Редкий сундук куплен!', 'green');
             updateDisplay();
             saveData();
        } else {
               displayMessage('Недостаточно алмазов!', 'red');
        }
    });
    elements.buyEpicChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 20) {
            gameState.diamonds -= 20;
            gameState.chests.epic++;
            displayMessage('Эпический сундук куплен!', 'green');
             updateDisplay();
             saveData();
        } else {
              displayMessage('Недостаточно алмазов!', 'red');
         }
    });
     elements.openChestButton.addEventListener('click', openChest);
      elements.closeChestButton.addEventListener('click', () => {
         elements.chestContainer.style.display = 'none';
        elements.chestItemsDisplay.innerHTML = '';
      });
     });
