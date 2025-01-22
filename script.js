
document.addEventListener('DOMContentLoaded', () => {
    // 1. Конфигурация игры
    const gameConfig = {
        CLICK_VALUE_BASE: 1,
        AUTO_CLICKER_BASE: 0,
        CLICK_UPGRADE_COST_BASE: 10,
        AUTO_UPGRADE_COST_BASE: 50,
        CLICK_UPGRADE_LEVEL_COST_BASE: 100,
        PRESTIGE_BASE_COST: 1000,
        KEY_COST: 100,
        COMMON_CHEST_COST: 200,
        RARE_CHEST_COST: 500,
        EPIC_CHEST_COST: 1000,
        SKIN_RARITY: {
            common_skin_1: 'common',
             uncommon_skin_1: 'uncommon',
            rare_skin_1: 'rare',
            epic_skin_1: 'epic',
            common_skin_2: 'common',
            uncommon_skin_2: 'uncommon',
           rare_skin_2: 'rare',
            epic_skin_2: 'epic'
        },
        SKIN_NAMES: {
            common_skin_1: 'Обычный скин 1',
             uncommon_skin_1: 'Необычный скин 1',
            rare_skin_1: 'Редкий скин 1',
            epic_skin_1: 'Эпический скин 1',
            common_skin_2: 'Обычный скин 2',
            uncommon_skin_2: 'Необычный скин 2',
           rare_skin_2: 'Редкий скин 2',
           epic_skin_2: 'Эпический скин 2'
        },
         SKIN_EFFECTS: {
            common_skin_1: {clickBonus: 1},
             uncommon_skin_1: {clickBonus: 1.2},
            rare_skin_1: {clickBonus: 1.5},
            epic_skin_1: {clickBonus: 2},
            common_skin_2: {autoClickBonus: 1},
            uncommon_skin_2: {autoClickBonus: 1.2},
           rare_skin_2: {autoClickBonus: 1.5},
           epic_skin_2: {autoClickBonus: 2}
        },
        ARTIFACT_RARITY: {
            common_artifact_1: 'common',
           uncommon_artifact_1: 'uncommon',
            rare_artifact_1: 'rare',
            epic_artifact_1: 'epic',
              common_artifact_2: 'common',
           uncommon_artifact_2: 'uncommon',
            rare_artifact_2: 'rare',
            epic_artifact_2: 'epic'
        },
        ARTIFACT_NAMES: {
           common_artifact_1: 'Обычный артефакт 1',
           uncommon_artifact_1: 'Необычный артефакт 1',
            rare_artifact_1: 'Редкий артефакт 1',
            epic_artifact_1: 'Эпический артефакт 1',
               common_artifact_2: 'Обычный артефакт 2',
           uncommon_artifact_2: 'Необычный артефакт 2',
            rare_artifact_2: 'Редкий артефакт 2',
            epic_artifact_2: 'Эпический артефакт 2'
        },
        ARTIFACT_EFFECTS: {
            common_artifact_1: {prestigeBonus: 1.1},
             uncommon_artifact_1: {prestigeBonus: 1.15},
            rare_artifact_1: {prestigeBonus: 1.2},
            epic_artifact_1: {prestigeBonus: 1.3},
             common_artifact_2: {expeditionBonus: 1.1},
            uncommon_artifact_2: {expeditionBonus: 1.15},
            rare_artifact_2: {expeditionBonus: 1.2},
            epic_artifact_2: {expeditionBonus: 1.3}
        },
        SKIN_RARITY_CHANCE: {
            common: 0.7,
            uncommon: 0.9,
            rare: 0.98,
            epic: 1
        },
         ARTIFACT_RARITY_CHANCE: {
           common: 0.7,
            uncommon: 0.9,
            rare: 0.98,
            epic: 1
        },
         EXPEDITION_TYPES: ['forest', 'mountain', 'cave'],
         EXPEDITION_DURATION: {
              forest: 10,
              mountain: 20,
               cave: 30
         },
          EXPEDITION_REWARDS: {
              forest: {clickValue: 1, autoClickValue: 0.5, diamonds: 1},
               mountain: {clickValue: 1.2, autoClickValue: 0.8, diamonds: 2},
              cave: {clickValue: 1.5, autoClickValue: 1, diamonds: 3}
         },
        ACHIEVEMENTS: {
           first_upgrade: {criteria: 'clickUpgradeLevel', value: 2, text: 'Первое улучшение клика'},
           first_prestige: {criteria: 'prestigeLevel', value: 1, text: 'Первый престиж'},
             first_artifact: {criteria: 'artifacts', item: 'common_artifact_1', text: 'Первый артефакт'}
        }
    };
    // 2. Игровые элементы
    const elements = {
        clicker: {
            clickButton: document.getElementById('click-button'),
            counterDisplay: document.getElementById('counter'),
            upgradeClickButton: document.getElementById('upgrade-click-button'),
            upgradeAutoButton: document.getElementById('upgrade-auto-button'),
            upgradeClickLevelButton: document.getElementById('upgrade-click-level-button'),
            clickUpgradeCostDisplay: document.getElementById('click-upgrade-cost'),
            autoUpgradeCostDisplay: document.getElementById('auto-upgrade-cost'),
            clickUpgradeLevelCostDisplay: document.getElementById('click-upgrade-level-cost')
        },
        shop: {
            prestigeButton: document.getElementById('prestige-button'),
            prestigeCostDisplay: document.getElementById('prestige-cost'),
            prestigeLevelDisplay: document.getElementById('prestige-level'),
            keyDisplay: document.getElementById('key-count'),
            chestContainer: document.querySelector('.chest-container'),
             chestItemsDisplay: document.getElementById('chest-items-display'),
            buyKeyButton: document.getElementById('buy-key-button'),
             buyCommonChestButton: document.getElementById('buy-common-chest-button'),
              buyRareChestButton: document.getElementById('buy-rare-chest-button'),
             buyEpicChestButton: document.getElementById('buy-epic-chest-button'),
           commonChestDisplay: document.getElementById('common-chest-count'),
            rareChestDisplay: document.getElementById('rare-chest-count'),
            epicChestDisplay: document.getElementById('epic-chest-count'),
             openChestButton: document.getElementById('open-chest-button'),
            closeChestButton: document.getElementById('close-chest-button')
         },
        menu: {
            menuButton: document.querySelector('.menu-toggle'),
            menu: document.getElementById('menu-items'),
            menuItems: document.querySelectorAll('#menu-items li'),
            resetButton: document.getElementById('reset-button')
        },
        map: {
           mapContainer: document.querySelector('.map-container'),
           expeditionTimerDisplay: document.getElementById('expedition-timer'),
           expeditionProgress: document.getElementById('expedition-progress'),
            expeditionClickValueDisplay: document.getElementById('expedition-click-value'),
           expeditionAutoClickValueDisplay: document.getElementById('expedition-auto-click-value'),
           expeditionDiamondsDisplay: document.getElementById('expedition-diamonds'),
           expeditionButton: document.querySelector('.expedition-button')
        },
          inventory: {
              inventoryContainer: document.querySelector('.inventory-container'),
              skinsDisplay: document.querySelector('.skins-display'),
              artifactsDisplay: document.querySelector('.artifacts-display')
          },
        global: {
            globalMessageDisplay: null
        }
    };
    // 3. Состояние игры
    let gameState = {
        clickCount: 0,
        clickValue: gameConfig.CLICK_VALUE_BASE,
        autoClickerValue: gameConfig.AUTO_CLICKER_BASE,
        clickUpgradeCost: gameConfig.CLICK_UPGRADE_COST_BASE,
        autoUpgradeCost: gameConfig.AUTO_UPGRADE_COST_BASE,
        clickUpgradeLevel: 1,
        clickUpgradeLevelCost: gameConfig.CLICK_UPGRADE_LEVEL_COST_BASE,
        prestigeLevel: 0,
        prestigeCost: gameConfig.PRESTIGE_BASE_COST,
        prestigeMultiplier: 1,
        keys: 0,
        chests: {
            common: 0,
            rare: 0,
            epic: 0
        },
        skins: {},
        artifacts: {},
         diamonds: 0,
         achievements: {},
          activeExpedition: null,
          expeditionStartTime: null
    };

    // 4. Функции сохранения и загрузки
    const saveData = () => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    };
    const loadGame = () => {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            gameState = JSON.parse(savedState);
        }
        updateDisplay();
    };
   const resetGame = () => {
        gameState = {
              clickCount: 0,
             clickValue: gameConfig.CLICK_VALUE_BASE,
              autoClickerValue: gameConfig.AUTO_CLICKER_BASE,
              clickUpgradeCost: gameConfig.CLICK_UPGRADE_COST_BASE,
              autoUpgradeCost: gameConfig.AUTO_UPGRADE_COST_BASE,
             clickUpgradeLevel: 1,
            clickUpgradeLevelCost: gameConfig.CLICK_UPGRADE_LEVEL_COST_BASE,
            prestigeLevel: 0,
            prestigeCost: gameConfig.PRESTIGE_BASE_COST,
           prestigeMultiplier: 1,
            keys: 0,
            chests: {
              common: 0,
               rare: 0,
               epic: 0
            },
            skins: {},
            artifacts: {},
              diamonds: 0,
               achievements: {},
                activeExpedition: null,
                 expeditionStartTime: null
           };
         clearAllTimeouts();
         updateDisplay();
         saveData();
          displayMessage('Прогресс сброшен!', 'green');
      };

  const calculatePrestigeBonus = (artifacts) => {
      let prestigeBonus = 1;
      for(const artifact in artifacts){
        if (gameConfig.ARTIFACT_EFFECTS[artifact] && gameConfig.ARTIFACT_EFFECTS[artifact].prestigeBonus && artifacts[artifact] > 0)
          {
            prestigeBonus = prestigeBonus * Math.pow(gameConfig.ARTIFACT_EFFECTS[artifact].prestigeBonus, artifacts[artifact])
          }
        }
        return prestigeBonus;
     };

    const checkAchievements = () => {
       for (const achievementKey in gameConfig.ACHIEVEMENTS){
         const achievement = gameConfig.ACHIEVEMENTS[achievementKey];
          if (!gameState.achievements[achievementKey]){
            if(achievement.criteria === 'artifacts'){
                 if (gameState.artifacts[achievement.item] > 0) {
                   gameState.achievements[achievementKey] = true;
                   displayMessage(`Достижение получено: ${achievement.text}`, 'green');
                }
           } else if (gameState[achievement.criteria] >= achievement.value){
               gameState.achievements[achievementKey] = true;
              displayMessage(`Достижение получено: ${achievement.text}`, 'green');
            }
         }
      }
       saveData();
    }

    // 5. Функции обновления интерфейса
   const updateDisplay = () => {
         elements.clicker.counterDisplay.textContent = Math.round(gameState.clickCount);
        elements.clicker.clickUpgradeCostDisplay.textContent = gameState.clickUpgradeCost;
        elements.clicker.autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost;
        elements.clicker.clickUpgradeLevelCostDisplay.textContent = gameState.clickUpgradeLevelCost;
        elements.shop.prestigeCostDisplay.textContent = gameState.prestigeCost;
        elements.shop.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
       elements.shop.keyDisplay.textContent = gameState.keys;
        elements.shop.commonChestDisplay.textContent = gameState.chests.common;
        elements.shop.rareChestDisplay.textContent = gameState.chests.rare;
       elements.shop.epicChestDisplay.textContent = gameState.chests.epic;
        elements.map.expeditionClickValueDisplay.textContent =  gameState.clickValue * calculateExpeditionBonus(gameState.artifacts);
        elements.map.expeditionAutoClickValueDisplay.textContent = gameState.autoClickerValue * calculateExpeditionBonus(gameState.artifacts);
        elements.map.expeditionDiamondsDisplay.textContent = gameState.diamonds;
     updateInventoryDisplay();
    };

    // 6. Основные игровые механики
    const applyClick = () => {
        gameState.clickCount += gameState.clickValue * calculateClickBonus(gameState.skins);
        updateDisplay();
    };
   const calculateClickBonus = (skins) => {
      let clickBonus = 1;
      for(const skin in skins){
        if (gameConfig.SKIN_EFFECTS[skin] && gameConfig.SKIN_EFFECTS[skin].clickBonus && skins[skin] > 0)
          {
            clickBonus = clickBonus * Math.pow(gameConfig.SKIN_EFFECTS[skin].clickBonus, skins[skin])
          }
        }
        return clickBonus;
     };
      const calculateAutoClickBonus = (skins) => {
      let autoClickBonus = 1;
      for(const skin in skins){
        if (gameConfig.SKIN_EFFECTS[skin] && gameConfig.SKIN_EFFECTS[skin].autoClickBonus && skins[skin] > 0)
          {
            autoClickBonus = autoClickBonus * Math.pow(gameConfig.SKIN_EFFECTS[skin].autoClickBonus, skins[skin])
          }
        }
        return autoClickBonus;
     };
  const calculateExpeditionBonus = (artifacts) => {
      let expeditionBonus = 1;
      for(const artifact in artifacts){
           if (gameConfig.ARTIFACT_EFFECTS[artifact] && gameConfig.ARTIFACT_EFFECTS[artifact].expeditionBonus && artifacts[artifact] > 0)
          {
             expeditionBonus = expeditionBonus * Math.pow(gameConfig.ARTIFACT_EFFECTS[artifact].expeditionBonus, artifacts[artifact])
           }
        }
        return expeditionBonus;
     };
    const startAutoClicker = () => {
        if (gameState.autoClickerValue > 0) {
            if (autoClickInterval){
                clearInterval(autoClickInterval);
            }
            autoClickInterval = setInterval(() => {
                gameState.clickCount += gameState.autoClickerValue * calculateAutoClickBonus(gameState.skins);
                updateDisplay();
             }, 1000);
        }
    };
      let autoClickInterval = null;
    const clearAllTimeouts = () =>{
          if (autoClickInterval) {
                clearInterval(autoClickInterval);
               autoClickInterval = null;
           }
         if (expeditionTimerInterval){
            clearInterval(expeditionTimerInterval);
            expeditionTimerInterval = null;
         }
    };
    const buyKey = () => {
        if (gameState.clickCount >= gameConfig.KEY_COST) {
            gameState.clickCount -= gameConfig.KEY_COST;
            gameState.keys++;
            updateDisplay();
            saveData();
            displayMessage('Куплен ключ', 'green');
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    };
      const buyChest = (type) => {
           let cost = 0;
        switch(type){
            case 'common': cost = gameConfig.COMMON_CHEST_COST; break;
            case 'rare': cost = gameConfig.RARE_CHEST_COST; break;
             case 'epic': cost = gameConfig.EPIC_CHEST_COST; break;
        }
       if (gameState.clickCount >= cost) {
            gameState.clickCount -= cost;
            gameState.chests[type]++;
             updateDisplay();
            saveData();
           displayMessage(`Куплен ${type} сундук`, 'green');
       } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
   };

  const switchTab = (tab) => {
    const tabs = ['clicker', 'shop', 'map','inventory'];
    tabs.forEach(t => {
        document.getElementById(`${t}-content`).style.display = t === tab ? 'block' : 'none';
         if (t === 'inventory'){
              elements.inventory.inventoryContainer.classList.toggle('active', t === tab)
         }
     });
  };

  const displayMessage = (text, color = 'white', fontSize = '1em') => {
        if (!elements.global.globalMessageDisplay){
          return;
       }
      const messageElement = elements.global.globalMessageDisplay;
      messageElement.textContent = text;
      messageElement.style.color = color;
      messageElement.style.fontSize = fontSize;
       messageElement.style.display = 'block';
     setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    };

   const startExpedition = (type) => {
        if (gameState.activeExpedition) {
           displayMessage('Экспедиция уже в процессе!', 'red');
           return;
        }
       gameState.activeExpedition = type;
       gameState.expeditionStartTime = Date.now();
      updateExpeditionButtonInfo();
       startExpeditionTimer();
      saveData();
      displayMessage(`Экспедиция ${type} началась!`, 'green');
    };

    const updateExpeditionButtonInfo = () => {
        elements.map.mapContainer.querySelectorAll('.expedition-button').forEach(button => {
            const type = button.dataset.type;
            const isExpeditionActive = gameState.activeExpedition === type;
            button.classList.toggle('disabled', isExpeditionActive);
            button.disabled = isExpeditionActive;
        });
    };
       let expeditionTimerInterval = null;
       const startExpeditionTimer = () =>{
         if (expeditionTimerInterval){
              clearInterval(expeditionTimerInterval);
            }
        expeditionTimerInterval = setInterval(() => {
            if (gameState.activeExpedition){
                const elapsedTime = Math.floor((Date.now() - gameState.expeditionStartTime) / 1000);
                const duration = gameConfig.EXPEDITION_DURATION[gameState.activeExpedition];
                elements.map.expeditionTimerDisplay.textContent = `${elapsedTime}/${duration} сек.`;
                 elements.map.expeditionProgress.style.width = `${(elapsedTime / duration) * 100}%`;
                 if(elapsedTime >= duration){
                     finishExpedition();
                 }
            }
          }, 1000);
       };

  const finishExpedition = () =>{
        const type = gameState.activeExpedition;
         const rewards = gameConfig.EXPEDITION_REWARDS[type];
       gameState.clickCount += rewards.clickValue *  gameState.clickValue * calculateExpeditionBonus(gameState.artifacts) ;
       gameState.clickCount += rewards.autoClickValue *  gameState.autoClickerValue* calculateExpeditionBonus(gameState.artifacts) ;
       gameState.diamonds += rewards.diamonds;
      gameState.activeExpedition = null;
        gameState.expeditionStartTime = null;
      updateExpeditionButtonInfo();
      updateDisplay();
        saveData();
         displayMessage(`Экспедиция ${type} окончена, вы получили ${rewards.clickValue *  gameState.clickValue * calculateExpeditionBonus(gameState.artifacts)} кликов, ${rewards.autoClickValue* gameState.autoClickerValue * calculateExpeditionBonus(gameState.artifacts)} автокликов и ${rewards.diamonds} алмазов!`,'green', '1em');
        clearTimeout(expeditionTimerInterval);
             }
    
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

        if (gameState.keys > 0) {
            gameState.keys--;
            gameState.chests[chestType]--;
            const item = openChestLogic(chestType);
           if (item) {
                const itemElement = document.createElement('div');
                itemElement.textContent = `Выпал предмет: ${item}`;
                elements.shop.chestItemsDisplay.appendChild(itemElement);
                displayMessage(`Выпал предмет: ${item}`, 'green', '1.2em');
            }
            elements.shop.chestContainer.style.display = 'block';
            updateDisplay();
            saveData();
        } else {
            displayMessage('Нет ключей для открытия', 'red');
        }
    };


    const closeChest = () => {
        elements.shop.chestContainer.style.display = 'none';
    };


    const openChestLogic = (chestType) => {
        const allSkins = Object.keys(gameConfig.SKIN_NAMES);
        const allArtifacts = Object.keys(gameConfig.ARTIFACT_NAMES);

        const itemTypeRoll = Math.random();
        const skinChance = 0.5;
        let item = null;
          if (itemTypeRoll <= skinChance) {
              item = applyRarity(null,gameConfig.SKIN_NAMES, 'skins');
        } else {
             item = applyRarity(null, gameConfig.ARTIFACT_NAMES, 'artifacts');
         }
          return item;
    };
     
   const applyRarity = (rarityChances, names, type) => {
        const allItems = Object.keys(names);
            if (allItems.length === 0) {
                    return null;
            }
         const item = getRandomItem(allItems, names, type);
            return item;
 };
    
     function getRandomItem(itemsArray, names, type) {
           const item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
        if (type === 'skins') {
            gameState.skins[item] = (gameState.skins[item] || 0) + 1;
        } else if (type === 'artifacts') {
            gameState.artifacts[item] = (gameState.artifacts[item] || 0) + 1;
        }
        return names[item];
     }

   const createItemPopup = (itemType, itemName, count, rarity, bonuses) => {
    const popup = document.createElement('div');
    popup.classList.add('item-popup');
     const imagePath = `${itemName.replace(/ /g, '_')}.jpg`;
    popup.innerHTML = `
        <div class="popup-content">
             <span class="item-popup-close-button">&times;</span>
             ${getImageTag(itemType, itemName, imagePath)}
            <h3>${itemName}</h3>
            <p>Количество: ${count}</p>
            <p>Редкость: ${rarity}</p>
             ${bonuses ? `<p>Бонусы: ${bonuses}</p>` : ''}
        </div>
    `;
     document.body.appendChild(popup);
        // Обработчик для закрытия окна по крестику
      const closeButton = popup.querySelector('.item-popup-close-button');
    closeButton.addEventListener('click', () => {
    popup.remove();
});
      // Обработчик для закрытия окна по клику вне его
    document.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.remove();
     }
     });
  };

  const getImageTag = (itemType, itemName, imagePath) => {
    // Проверяем, существует ли картинка
    const img = new Image();
    img.src = imagePath;
      // Если картинка загрузилась, возвращаем тег img
    if (img.complete || img.naturalWidth !== 0) {
     return `<img src="${imagePath}" alt="${itemName}">`;
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
            const imagePath = `${(gameConfig.SKIN_NAMES[skin] || skin).replace(/ /g, '_')}.jpg`;
            skinElement.innerHTML = `${getImageTag('skins', gameConfig.SKIN_NAMES[skin] || skin, imagePath)} <span>${gameConfig.SKIN_NAMES[skin] || skin} x${skins[skin]}</span>`;
             skinElement.addEventListener('click', () => {
                 const rarity = gameConfig.SKIN_RARITY[skin];
                 let bonuses = '';
                 if(gameConfig.SKIN_EFFECTS[skin]){
                     for (const effect in gameConfig.SKIN_EFFECTS[skin]) {
                         bonuses += `${effect}: ${gameConfig.SKIN_EFFECTS[skin][effect]} \n`;
                     }
                 }
                createItemPopup('skins', gameConfig.SKIN_NAMES[skin] || skin, skins[skin], rarity || 'Неизвестно', bonuses);
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
            const imagePath = `${(gameConfig.ARTIFACT_NAMES[artifact] || artifact).replace(/ /g, '_')}.jpg`;
            artifactElement.innerHTML = `${getImageTag('artifacts', gameConfig.ARTIFACT_NAMES[artifact] || artifact, imagePath)} <span>${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${artifacts[artifact]}</span>`;
             artifactElement.addEventListener('click', () => {
                 const rarity = gameConfig.ARTIFACT_RARITY[artifact];
                 let bonuses = '';
                 if (gameConfig.ARTIFACT_EFFECTS[artifact]) {
                    for (const effect in gameConfig.ARTIFACT_EFFECTS[artifact]) {
                         bonuses += `${effect}: ${gameConfig.ARTIFACT_EFFECTS[artifact][effect]} \n`;
                    }
                 }
                 createItemPopup('artifacts', gameConfig.ARTIFACT_NAMES[artifact] || artifact, artifacts[artifact], rarity || 'Неизвестно', bonuses);
            });
            elements.inventory.artifactsDisplay.appendChild(artifactElement);
        }
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

    window.addEventListener('beforeunload', () => {
        clearAutoSave();
        saveData();
    });

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
