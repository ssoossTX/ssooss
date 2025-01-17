
document.addEventListener('DOMContentLoaded', () => {
    const SAVE_KEY = 'clickerData';
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
            diamondDisplayProfile: document.getElementById('diamonds-menu-profile'),
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
    const tWebApp = window.Telegram && window.Telegram.WebApp;
    if (tWebApp) {
        tWebApp.ready();
    }
    const updateDisplay = () => {
        elements.clickCountDisplay.textContent = Math.round(gameState.clickCount);
        elements.clickUpgradeCostDisplay.textContent = gameState.clickUpgradeCost;
        elements.autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost;
        elements.clickUpgradeLevelDisplay.textContent = gameState.clickUpgradeLevel;
        elements.clickUpgradeLevelCostDisplay.textContent = gameState.clickUpgradeLevelCost;
        elements.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
        elements.achievementsDisplay.textContent = `Достижения: ${gameState.achievementCount}`;
           elements.diamondDisplayProfile.textContent = `Алмазы: ${gameState.diamonds}`;
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
        setTimeout(() => {
            elements.globalMessageDisplay.textContent = '';
             elements.globalMessageDisplay.style.fontSize = '1em';
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
                 if(gameState.skins == null) gameState.skins = [];
                    if(gameState.artifacts == null) gameState.artifacts = [];
                 updateDisplay();
                 startAutoClicker();
                 startRandomEvent();
            } catch (e) {
                console.error('Failed to load game', e);
                gameState.clickValue = 1;
                gameState.clickUpgradeLevel = 1;
                  updateDisplay();
                   startAutoClicker();
                 startRandomEvent();
                displayMessage('Ошибка загрузки сохранения!', 'red');
            }
        };
        if (tWebApp) {
            tWebApp.CloudStorage.getItem(SAVE_KEY).then((savedDataString) => {
                if (savedDataString) {
                      loadFromStorage({getItem: () => savedDataString});
                   }
                    else {
                     gameState.clickValue = 1;
                       gameState.clickUpgradeLevel = 1;
                          updateDisplay();
                     startAutoClicker();
                        startRandomEvent();
                }
           });
        }
         else {
                loadFromStorage(localStorage);
        }
     };
    const updateAutoSave = () => {
         saveData();
    };
    let autoSaveInterval;
    const startAutoSave = () => {
        autoSaveInterval = setInterval(updateAutoSave, 15000)
    };
    const clearAutoSave = () => {
         clearInterval(autoSaveInterval);
    };
    const buyUpgrade = (upgradeType) => {
           if (upgradeType === 'click') {
           if (gameState.clickCount >= gameState.clickUpgradeCost) {
                gameState.clickCount -= gameState.clickUpgradeCost;
                gameState.clickValue++;
                gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.5);
                displayMessage('Улучшение клика куплено!', 'green');
            } else {
                 displayMessage('Недостаточно кликов!', 'red');
            }
        } else if (upgradeType === 'auto') {
             if (gameState.clickCount >= gameState.autoUpgradeCost) {
                    gameState.clickCount -= gameState.autoUpgradeCost;
                     gameState.autoClickerValue++;
                    gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.5);
                    displayMessage('Автокликер куплен!', 'green');
                     startAutoClicker();
             } else {
                 displayMessage('Недостаточно кликов!', 'red');
            }
        } else if (upgradeType === 'clickLevel'){
             if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
                gameState.clickCount -= gameState.clickUpgradeLevelCost;
                 gameState.clickUpgradeLevel++;
                 gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 2);
                    displayMessage('Уровень улучшения клика куплен!', 'green');
            } else {
                 displayMessage('Недостаточно кликов!', 'red');
            }
        }
        updateDisplay();
    };
    const buyPrestige = () => {
       if (gameState.clickCount >= gameState.prestigeCost){
            gameState.clickCount = 0;
             gameState.prestigeLevel++;
            gameState.prestigeMultiplier *= 1.5;
             gameState.clickUpgradeLevel = 1;
           gameState.clickValue = 1;
            gameState.clickUpgradeLevelCost = 100;
              gameState.autoClickerValue = 0;
            gameState.autoUpgradeCost = 50;
            gameState.clickUpgradeCost = 10;
            gameState.chests = {
            'common': 0,
            'rare': 0,
            'epic': 0
            };
             gameState.keys = 0;
               gameState.prestigeCost = Math.round(gameState.prestigeCost * 2);
           clearAllTimeouts();
             startRandomEvent();
            updateDisplay();
             displayMessage('Перерождение совершено!', 'lime');
        }
        else {
             displayMessage('Недостаточно кликов!', 'red');
        }
    };
     const buyChest = (chestType) => {
           if (gameState.diamonds >= 5) {
                gameState.diamonds -= 5;
               gameState.chests[chestType]++;
                 displayMessage(`Сундук ${chestType} куплен!`, 'green');
            }
            else {
                 displayMessage('Недостаточно алмазов!', 'red');
            }
         updateDisplay();
    };
       const openChest = () => {
             if (gameState.chests.common > 0 || gameState.chests.rare > 0 || gameState.chests.epic > 0) {
                   elements.chestItemsDisplay.innerHTML = '';
                   elements.chestContainer.style.display = 'block';
                let totalChances = 0;
                 for (const key in CHEST_RARITY_CHANCE) {
                    totalChances += CHEST_RARITY_CHANCE[key];
                }
                 for (const chestType in gameState.chests) {
                    while(gameState.chests[chestType] > 0) {
                       gameState.chests[chestType]--;
                      const randomValue = Math.random();
                          let itemRarity = null;
                        for(const rarity in SKIN_RARITY_CHANCE) {
                                   if(randomValue <  SKIN_RARITY_CHANCE[rarity]) {
                                       itemRarity = rarity;
                                   break;
                              }
                         }
                         if(itemRarity) {
                            const foundSkin = Object.keys(SKIN_NAMES).find(skin => skin.includes(itemRarity) );
                             if(foundSkin) {
                                  if (!gameState.skins.includes(foundSkin)) {
                                       gameState.skins.push(foundSkin);
                                       elements.chestItemsDisplay.innerHTML += `<p>Выпал ${SKIN_NAMES[foundSkin]}</p>`;
                                  } else {
                                     elements.chestItemsDisplay.innerHTML += `<p>Уже есть ${SKIN_NAMES[foundSkin]}</p>`;
                                  }
                             }
                        }
                           let artifactRarity = null;
                         const randomArtifactValue = Math.random();
                             for(const rarity in ARTIFACT_RARITY_CHANCE) {
                                  if(randomArtifactValue <  ARTIFACT_RARITY_CHANCE[rarity]) {
                                        artifactRarity = rarity;
                                    break;
                            }
                         }
                             if(artifactRarity) {
                                   const foundArtifact = Object.keys(ARTIFACT_NAMES).find(artifact => artifact.includes(artifactRarity));
                                   if(foundArtifact) {
                                        if (!gameState.artifacts.includes(foundArtifact)) {
                                             gameState.artifacts.push(foundArtifact);
                                            elements.chestItemsDisplay.innerHTML += `<p>Выпал ${ARTIFACT_NAMES[foundArtifact]}</p>`;
                                        } else {
                                             elements.chestItemsDisplay.innerHTML += `<p>Уже есть ${ARTIFACT_NAMES[foundArtifact]}</p>`;
                                        }
                                   }
                            }
                       }
                }
               }
           else {
              displayMessage('Нет сундуков для открытия!', 'red');
            }
             updateDisplay();
    };
    const closeChest = () => {
          elements.chestContainer.style.display = 'none';
    };
    const startExpedition = (expeditionType) => {
         if (gameState.activeExpedition){
               displayMessage('Экспедиция уже в пути!', 'red');
                return;
         }
          if (gameState.diamonds >= gameState.expeditionCosts[expeditionType]){
               gameState.diamonds -= gameState.expeditionCosts[expeditionType];
                gameState.activeExpedition = expeditionType;
                 gameState.expeditionStartTime = Date.now();
                gameState.expeditionDuration = EXPEDITION_DURATIONS[expeditionType];
             const [minReward, maxReward] = gameState.expeditionRewards[expeditionType];
               gameState.expeditionReward = Math.round(Math.random() * (maxReward - minReward) + minReward);
                 updateDisplay();
                 displayMessage(`Экспедиция ${EXPEDITION_TYPES[expeditionType]} началась!`, 'lime');
                 gameState.expeditionInterval = setInterval(updateExpeditionProgress, 1000);
         }
         else{
              displayMessage('Недостаточно алмазов!', 'red');
         }
    };
    const finishExpedition = () => {
        clearInterval(gameState.expeditionInterval);
        gameState.expeditionInterval = null;
        gameState.activeExpedition = null;
           gameState.diamonds += gameState.expeditionReward;
          displayMessage(`Экспедиция завершена! Получено ${gameState.expeditionReward} алмазов!`, 'lime');
        updateDisplay();
    };
       const updateExpeditionButtonInfo = () => {
           document.querySelectorAll('.expedition-button').forEach(button => {
               const type = button.getAttribute('data-type');
            const cost = gameState.expeditionCosts[type];
            button.textContent = `${EXPEDITION_TYPES[type]} (${cost} алмаз)`;
        });
    };
    const buyKey = () => {
            if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
                 gameState.keys++;
                  displayMessage('Куплен 1 ключ!', 'green');
           } else {
                 displayMessage('Недостаточно алмазов!', 'red');
           }
        updateDisplay();
    };
    const updateInventoryDisplay = () => {
           elements.skinsDisplay.innerHTML = '';
        gameState.skins.forEach(skin => {
            elements.skinsDisplay.innerHTML += `<p>${SKIN_NAMES[skin]}</p>`;
        });
         elements.artifactsDisplay.innerHTML = '';
         gameState.artifacts.forEach(artifact => {
               elements.artifactsDisplay.innerHTML += `<p>${ARTIFACT_NAMES[artifact]}</p>`;
         });
    };
      elements.clickButton.addEventListener('click', applyClick);
    elements.upgradeClickButton.addEventListener('click', () => buyUpgrade('click'));
    elements.upgradeAutoButton.addEventListener('click', () => buyUpgrade('auto'));
    elements.upgradeClickLevelButton.addEventListener('click', () => buyUpgrade('clickLevel'));
     elements.prestigeButton.addEventListener('click', buyPrestige);
    elements.resetButton.addEventListener('click', resetGame);
    elements.menuButton.addEventListener('click', function(event) {
        this.classList.toggle('active');
        elements.menu.classList.toggle('active');
          event.stopPropagation();
    });
      elements.menuItems.forEach(item => {
           item.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
                elements.clickerContent.style.display = 'none';
               elements.gameContent.style.display = 'none';
                elements.mapContainer.style.display = 'none';
               elements.inventoryContainer.style.display = 'none';
                if (target === 'clicker') {
                    elements.clickerContent.style.display = 'block';
                } else if (target === 'shop') {
                    elements.gameContent.style.display = 'block';
                } else if (target === 'map') {
                    elements.mapContainer.style.display = 'block';
                 } else if(target === 'profile') {
                     elements.inventoryContainer.classList.add('active');
                     elements.menu.classList.remove('active');
                     elements.menuButton.classList.remove('active');
                }
                 elements.menu.classList.remove('active');
                elements.menuButton.classList.remove('active');
        });
    });
    elements.buyKeyButton.addEventListener('click', buyKey);
    elements.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
    elements.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
    elements.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.openChestButton.addEventListener('click', openChest);
     elements.closeChestButton.addEventListener('click', closeChest);
     document.querySelectorAll('.expedition-button').forEach(button => {
       button.addEventListener('click', function() {
           const type = this.getAttribute('data-type');
            startExpedition(type);
       });
    });
     document.addEventListener('click', function (event) {
        if(!elements.menu.contains(event.target) && !elements.menuButton.contains(event.target)){
            elements.menu.classList.remove('active');
           elements.menuButton.classList.remove('active');
        }
        if(!elements.inventoryContainer.contains(event.target) && elements.inventoryContainer.classList.contains('active') && event.target !== elements.inventoryButton) {
            elements.inventoryContainer.classList.remove('active');
        }
     });
    loadGame();
     startAutoSave();
     startRandomEvent();
});
