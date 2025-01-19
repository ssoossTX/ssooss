
document.addEventListener('DOMContentLoaded', () => {
    const SAVE_KEY = 'clickerData';
    const MESSAGE_DURATION = 3000;
    const AUTO_CLICK_INTERVAL = 1000;
    const PRESTIGE_BASE_COST = 10000;
      const EXPEDITION_TYPES = {
        'easy': 'Легкая',
        'medium': 'Средняя',
        'hard': 'Тяжелая',
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
         'artifact_common_3': { clickValueBonus: 1.05 },
        'artifact_uncommon_3': { clickValueBonus: 1.1 },
        'artifact_rare_3': { clickValueBonus: 1.2 },
        'artifact_epic_3': { clickValueBonus: 1.5 },
           'artifact_common_4': { autoClickerBonus: 1.05 },
        'artifact_uncommon_4': { autoClickerBonus: 1.1 },
        'artifact_rare_4': { autoClickerBonus: 1.2 },
        'artifact_epic_4': { autoClickerBonus: 1.5 },
    };
    const SKIN_NAMES = {
        'skin_common_1': 'Простой Наборчик',
        'skin_uncommon_1': 'Потрепанный Костюм',
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
    };
    const ARTIFACT_NAMES = {
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
         expeditionDurations : {
        'easy': 60000,
        'medium': 300000,
        'hard': 600000,
    },
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
        diamondDisplay: document.getElementById('diamonds-menu'),
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
            elements.globalMessageDisplay.style.display = 'block';
        setTimeout(() => {
            elements.globalMessageDisplay.style.display = 'none';
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
             skins: [],
            artifacts: [],
            expeditionCosts: {
                 'easy': 0,
                'medium': 10,
                'hard': 100,
            },
           expeditionRewards: {
                'easy': [1, 500],
                'medium': [10, 50],
                 'hard': [100, 500],
            },
             prestigeCost: PRESTIGE_BASE_COST,
            expeditionDurations : {
                'easy': 6000,
                'medium': 300000,
                'hard': 600000,
            },
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
             tWebApp.CloudStorage.removeItem(SAVE_KEY);
        } else {
            localStorage.removeItem(SAVE_KEY);
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
        elements.clickerContent.style.display = tabId === 'clicker' ? 'block' : 'none';
        elements.gameContent.style.display = tabId === 'shop' ? 'block' : 'none';
          elements.mapContainer.style.display = tabId === 'map' ? 'block' : 'none';
          elements.inventoryContainer.style.display = tabId === 'profile' ? 'block' : 'none';
        elements.menuItems.forEach(item => {
            item.classList.remove('active');
             if (item.dataset.tab === tabId) {
                 item.classList.add('active');
            }
        });
    };
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
        gameState.expeditionDuration = gameState.expeditionDurations[type];
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
         let diamondBonus = 1;
         gameState.artifacts.forEach(artifact => {
            if (ARTIFACT_EFFECTS[artifact] && ARTIFACT_EFFECTS[artifact].diamondBonus) {
               diamondBonus *= ARTIFACT_EFFECTS[artifact].diamondBonus;
           }
         });
        gameState.diamonds += Math.round(reward * diamondBonus);
        const expeditionType = gameState.activeExpedition;
       gameState.activeExpedition = null;
       gameState.expeditionStartTime = null;
       gameState.expeditionDuration = 0;
        gameState.expeditionReward = 0;
      displayMessage(`Экспедиция "${EXPEDITION_TYPES[expeditionType]}" завершена! Получено ${Math.round(reward * diamondBonus)} алмазов`, 'gold', '1.2em');
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
         elements.chestItemsDisplay.innerHTML = '';
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
                const items = openChestLogic(chestType);
                 items.forEach(item => {
                  const itemElement = document.createElement('div');
                    itemElement.textContent = item;
                   elements.chestItemsDisplay.appendChild(itemElement);
                });
                 elements.chestContainer.style.display = 'block';
                 updateDisplay();
                saveData();
            } else {
               displayMessage('Нет ключей для открытия', 'red');
            }
   };
      const closeChest = () => {
          elements.chestContainer.style.display = 'none';
    };
     const openChestLogic = (chestType) => {
        const items = [];
         const roll = Math.random();
           const applyRarity = (rarityChances, names, type) => {
           let totalChance = 0;
               for (const rarity in rarityChances) {
                  totalChance += rarityChances[rarity];
                if (roll <= totalChance) {
                        const filteredItems = Object.keys(names).filter(key => key.includes(rarity));
                    items.push(getRandomItem(filteredItems, names, type));
                        return;
                   }
              }
        };
         if (chestType === 'epic') {
            applyRarity(SKIN_RARITY_CHANCE, SKIN_NAMES, 'skins');
            applyRarity(ARTIFACT_RARITY_CHANCE, ARTIFACT_NAMES, 'artifacts');
       } else if (chestType === 'rare') {
            applyRarity({ rare: SKIN_RARITY_CHANCE.rare, uncommon: SKIN_RARITY_CHANCE.uncommon, common: 1 }, SKIN_NAMES, 'skins');
           applyRarity({ rare: ARTIFACT_RARITY_CHANCE.rare, uncommon: ARTIFACT_RARITY_CHANCE.uncommon, common: 1 }, ARTIFACT_NAMES, 'artifacts');
         }  else if (chestType === 'common') {
              applyRarity({ uncommon: SKIN_RARITY_CHANCE.uncommon, common: 1 }, SKIN_NAMES, 'skins');
             applyRarity({ uncommon: ARTIFACT_RARITY_CHANCE.uncommon, common: 1 }, ARTIFACT_NAMES, 'artifacts');
        }
       return items;
    };
    function getRandomItem(itemsArray, names, type) {
         const item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
         if (type === 'skins') {
              gameState.skins.push(item);
        } else if (type === 'artifacts') {
             gameState.artifacts.push(item);
        }
         return names[item];
   }
    const updateInventoryDisplay = () => {
           elements.skinsDisplay.innerHTML = '';
        elements.artifactsDisplay.innerHTML = '';

       const groupedSkins = {};
       gameState.skins.forEach(skin => {
            if (groupedSkins[skin]) {
                groupedSkins[skin]++;
            } else {
               groupedSkins[skin] = 1;
            }
        });
         const groupedArtifacts = {};
        gameState.artifacts.forEach(artifact => {
           if (groupedArtifacts[artifact]) {
                groupedArtifacts[artifact]++;
           } else {
             groupedArtifacts[artifact] = 1;
            }
        });

        for (const skin in groupedSkins) {
               const skinElement = document.createElement('div');
            skinElement.textContent = `${SKIN_NAMES[skin] || skin} (${groupedSkins[skin]})`;
                 skinElement.style.whiteSpace = 'nowrap';
                 skinElement.style.overflow = 'hidden';
                    skinElement.style.textOverflow = 'ellipsis';
                skinElement.style.padding = '5px';
                skinElement.style.margin = '2px';
                skinElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
             elements.skinsDisplay.appendChild(skinElement);
        }
        for (const artifact in groupedArtifacts) {
             const artifactElement = document.createElement('div');
             artifactElement.textContent = `${ARTIFACT_NAMES[artifact] || artifact} (${groupedArtifacts[artifact]})`;
                  artifactElement.style.whiteSpace = 'nowrap';
                 artifactElement.style.overflow = 'hidden';
                  artifactElement.style.textOverflow = 'ellipsis';
                  artifactElement.style.padding = '5px';
                    artifactElement.style.margin = '2px';
                artifactElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
           elements.artifactsDisplay.appendChild(artifactElement);
       }
};
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
               let prestigeBonus = 1;
                gameState.artifacts.forEach(artifact => {
                    if (ARTIFACT_EFFECTS[artifact] && ARTIFACT_EFFECTS[artifact].prestigeMultiplierBonus) {
                       prestigeBonus *= ARTIFACT_EFFECTS[artifact].prestigeMultiplierBonus;
                  }
                });
                gameState.prestigeMultiplier = Math.round(gameState.prestigeMultiplier * prestigeBonus) ;
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
   elements.buyKeyButton.addEventListener('click', buyKey);
    elements.buyCommonChestButton.addEventListener('click', () => buyChest('common'));
   elements.buyRareChestButton.addEventListener('click', () => buyChest('rare'));
   elements.buyEpicChestButton.addEventListener('click', () => buyChest('epic'));
    elements.openChestButton.addEventListener('click', openChest);
    elements.closeChestButton.addEventListener('click', closeChest);
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
      window.addEventListener('visibilitychange', () => {
         if (document.visibilityState === 'hidden') {
             saveData();
        }
    });
   window.addEventListener('beforeunload', () => {
        clearAutoSave()
        saveData();
    });
     if (tWebApp) {
       /*    tWebApp.onEvent('mainButtonClicked', () => {
                saveData();
            });
        */
     }
   loadGame();
});
