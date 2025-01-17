
// Объект с элементами DOM
const elements = {
    clickCount: document.getElementById('click-count'),
    clickButton: document.getElementById('click-button'),
    upgradeClick: document.getElementById('upgrade-click'),
    upgradeAuto: document.getElementById('upgrade-auto'),
    autoClickerCost: document.getElementById('auto-upgrade-cost'),
    clickUpgradeCost: document.getElementById('click-upgrade-cost'),
    gameContent: document.getElementById('game-content'),
    clickerContent: document.getElementById('clicker-content'),
    prestigeButton: document.getElementById('prestige-button'),
    prestigeLevelDisplay: document.getElementById('prestige-level'),
    achievementsDisplay: document.getElementById('achievements'),
    resetButton: document.getElementById('reset-button'),
     menuItems: document.getElementById('menu-items'),
    menuToggle: document.querySelector('.menu-toggle'),
     diamondsMenu: document.getElementById('diamonds-menu'),
    mapContainer: document.getElementById('map-container'),
    keyDisplay: document.getElementById('key-display'),
    commonChestCount: document.getElementById('common-chest-count'),
    rareChestCount: document.getElementById('rare-chest-count'),
    epicChestCount: document.getElementById('epic-chest-count'),
    buyKeyButton: document.getElementById('buy-key-button'),
     buyCommonChestButton: document.getElementById('buy-common-chest-button'),
     buyRareChestButton: document.getElementById('buy-rare-chest-button'),
    buyEpicChestButton: document.getElementById('buy-epic-chest-button'),
     chestContainer: document.getElementById('chest-container'),
    chestItemsDisplay: document.getElementById('chest-items'),
    openChestButton: document.getElementById('open-chest-button'),
     closeChestButton: document.getElementById('close-chest-button'),
     clickUpgradeLevelDisplay: document.getElementById('click-upgrade-level-display'),
     clickUpgradeLevelCost: document.getElementById('click-upgrade-level-cost'),
    inventoryContainer: document.getElementById('inventory-container'),
      diamondsMenuProfile: document.getElementById('diamonds-menu-profile'),
      skinsDisplay: document.getElementById('skins-display'),
       artifactsDisplay: document.getElementById('artifacts-display'),
    message: document.getElementById('message'),
};

const PRESTIGE_BASE_COST = 10000;
const SKIN_EFFECTS = {
  'ghost': { clickValueBonus: 1.2, autoClickerBonus: 1.05 }
};
 const ARTIFACT_EFFECTS = {
  'artifact1': { prestigeMultiplierBonus: 1.1 },
  'artifact2': { autoClickerBonus: 1.2}
};

let timeouts = [];

function clearAllTimeouts() {
  timeouts.forEach(clearTimeout);
  timeouts = [];
}
// Инициализация состояния игры
let gameState = {
    clickCount: 0,
    clickValue: 1,
    autoClickerValue: 0,
    clickUpgradeCost: 10,
    autoUpgradeCost: 50,
     prestigeCost: PRESTIGE_BASE_COST,
    prestigeLevel: 0,
    achievements: 0,
     diamonds: 0,
     keys: 0,
      commonChests: 0,
    rareChests: 0,
    epicChests: 0,
      clickUpgradeLevel: 1,
      clickUpgradeLevelCost: 100,
      prestigeMultiplier: 1,
      skins:[],
      artifacts:[],
    expeditions: {
        easy: {
            timerId: null,
            inProgress: false,
            duration: 60000,
        },
        medium: {
            timerId: null,
            inProgress: false,
            duration: 300000,
        },
        hard: {
            timerId: null,
            inProgress: false,
            duration: 600000,
        },
    },
};

// Функция обновления отображения
const updateDisplay = () => {
    elements.clickCount.textContent = Math.round(gameState.clickCount);
    elements.autoClickerCost.textContent = gameState.autoUpgradeCost;
    elements.clickUpgradeCost.textContent = gameState.clickUpgradeCost;
     elements.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
    elements.achievementsDisplay.textContent = gameState.achievements;
    elements.diamondsMenu.textContent = `Алмазы: ${gameState.diamonds}`;
     elements.keyDisplay.textContent = gameState.keys;
    elements.commonChestCount.textContent = gameState.commonChests;
    elements.rareChestCount.textContent = gameState.rareChests;
   elements.epicChestCount.textContent = gameState.epicChests;
   elements.clickUpgradeLevelDisplay.textContent = gameState.clickUpgradeLevel;
   elements.clickUpgradeLevelCost.textContent = gameState.clickUpgradeLevelCost;
     elements.diamondsMenuProfile.textContent = `Алмазы: ${gameState.diamonds}`;

    // Обновление профиля
    updateSkinsDisplay();
    updateArtifactsDisplay();
};
const updateSkinsDisplay = () => {
    elements.skinsDisplay.innerHTML = '';
    gameState.skins.forEach(skin => {
        const skinDiv = document.createElement('div');
        skinDiv.textContent = skin;
        elements.skinsDisplay.appendChild(skinDiv);
    });
};
const updateArtifactsDisplay = () => {
     elements.artifactsDisplay.innerHTML = '';
    gameState.artifacts.forEach(artifact => {
       const artifactDiv = document.createElement('div');
        artifactDiv.textContent = artifact;
        elements.artifactsDisplay.appendChild(artifactDiv);
    });
};


const displayMessage = (text, color, fontSize = '1em') => {
    elements.message.textContent = text;
    elements.message.style.color = color;
     elements.message.style.fontSize = fontSize;

    setTimeout(() => {
        elements.message.textContent = '';
    }, 3000);
};


// Функция сохранения состояния игры
const saveGame = () => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
};

// Функция загрузки состояния игры
const loadGame = () => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        gameState = JSON.parse(savedState);
        updateDisplay();
    }
};


// Функция применения клика
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

// Функция автоматического клика
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
const checkAchievements = () => {
        let newAchievements = 0;
         if (gameState.clickCount >= 100) newAchievements++;
         if (gameState.clickCount >= 1000) newAchievements++;
        if (gameState.clickCount >= 10000) newAchievements++;
        if (gameState.clickCount >= 100000) newAchievements++;
        if (gameState.clickCount >= 1000000) newAchievements++;
         if (gameState.prestigeLevel >= 1) newAchievements++;
         if (gameState.prestigeLevel >= 2) newAchievements++;
       if (gameState.prestigeLevel >= 3) newAchievements++;
         if (gameState.prestigeLevel >= 4) newAchievements++;
        if (gameState.prestigeLevel >= 5) newAchievements++;
        if (gameState.diamonds >= 10) newAchievements++;
       if (gameState.diamonds >= 50) newAchievements++;
        if (gameState.diamonds >= 100) newAchievements++;
        if (gameState.diamonds >= 500) newAchievements++;
       if (gameState.diamonds >= 1000) newAchievements++;

     if (newAchievements > gameState.achievements) {
            gameState.achievements = newAchievements;
            displayMessage(`Новое достижение! (${newAchievements})`, 'lime', '1.2em');
        }
      updateDisplay();
};

// Слушатель клика на кнопку
elements.clickButton.addEventListener('click', applyClick);

// Слушатель для улучшения клика
elements.upgradeClick.addEventListener('click', () => {
    if (gameState.clickCount >= gameState.clickUpgradeCost) {
        gameState.clickCount -= gameState.clickUpgradeCost;
        gameState.clickValue++;
        gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.5);
        updateDisplay();
    } else {
        displayMessage(`Недостаточно кликов! (нужно ${gameState.clickUpgradeCost})`, 'red');
    }
});

// Слушатель для покупки автокликера
elements.upgradeAuto.addEventListener('click', () => {
    if (gameState.clickCount >= gameState.autoUpgradeCost) {
        gameState.clickCount -= gameState.autoUpgradeCost;
        gameState.autoClickerValue++;
        gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.5);
      if (gameState.autoClickerValue === 1) {
             timeouts.push(setInterval(autoClick, 1000));
       }
        updateDisplay();
    } else {
        displayMessage(`Недостаточно кликов! (нужно ${gameState.autoUpgradeCost})`, 'red');
    }
});

elements.resetButton.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите сбросить прогресс?')) {
        localStorage.removeItem('gameState');
        window.location.reload();
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
                 displayMessage(`Перерождение! Множитель кликов: x${gameState.prestigeMultiplier}`, 'gold', '1.2em');
         } else {
             displayMessage(`Недостаточно кликов! (нужно ${gameState.prestigeCost})`, 'red');
         }
    });

  //переключение вкладок
elements.menuItems.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            elements.menuItems.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const tab = this.getAttribute('data-tab');
            elements.clickerContent.style.display = tab === 'clicker' ? 'block' : 'none';
            elements.gameContent.style.display = tab === 'shop' ? 'block' : 'none';
             elements.mapContainer.style.display = tab === 'map' ? 'block' : 'none';
             elements.inventoryContainer.style.display = tab === 'profile' ? 'block' : 'none';
            elements.menuToggle.classList.remove('active');
            elements.menuItems.classList.remove('active');
        });
    });
    elements.menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
         elements.menuItems.classList.toggle('active');
    });


// Покупка ключа
elements.buyKeyButton.addEventListener('click', () => {
   if (gameState.diamonds >= 10) {
        gameState.diamonds -= 10;
        gameState.keys++;
       updateDisplay();
    } else {
        displayMessage('Недостаточно алмазов!', 'red');
    }
});
    elements.buyCommonChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 5) {
          gameState.diamonds -= 5;
            gameState.commonChests++;
            updateDisplay();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    });
  elements.buyRareChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.rareChests++;
            updateDisplay();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    });
  elements.buyEpicChestButton.addEventListener('click', () => {
        if (gameState.diamonds >= 20) {
           gameState.diamonds -= 20;
            gameState.epicChests++;
            updateDisplay();
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    });

 elements.openChestButton.addEventListener('click', () => {
    openChest();
});
elements.closeChestButton.addEventListener('click', () => {
        elements.chestContainer.style.display = 'none';
 });
  // Функция открытия сундука
const openChest = () => {
      elements.chestContainer.style.display = 'block';
    elements.chestItemsDisplay.innerHTML = '';
    let items = [];
    if (gameState.keys > 0) {
           gameState.keys--;
       items = items.concat(openRandomChest());
    } else  if (gameState.commonChests > 0) {
       gameState.commonChests--;
      items = items.concat(openRandomChest("common"));
    } else if (gameState.rareChests > 0) {
       gameState.rareChests--;
          items = items.concat(openRandomChest("rare"));
    } else if (gameState.epicChests > 0) {
         gameState.epicChests--;
        items = items.concat(openRandomChest("epic"));
   } else {
        displayMessage('Нет сундуков для открытия!', 'red');
        elements.chestContainer.style.display = 'none';
    }
   items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        elements.chestItemsDisplay.appendChild(itemDiv);
    });
    updateDisplay();
};
  // Функция открытия случайного сундука
const openRandomChest = (type) => {
      let items = [];
        const randomNumber = Math.random();
      if(type === "common"){
        if (randomNumber < 0.2) {
            gameState.diamonds += 1;
             items.push(`Алмазы (+1)`);
        } else {
              items.push(`Клик (+${Math.round(Math.random() * 5)})`);
           gameState.clickValue += Math.round(Math.random() * 5);
         }
      } else if (type === "rare") {
         if (randomNumber < 0.3) {
                gameState.diamonds += 2;
                 items.push(`Алмазы (+2)`);
            } else if (randomNumber < 0.5) {
               items.push(`Автокликер (+1)`);
             gameState.autoClickerValue += 1;
            }
          else  {
                items.push(`Клик (+${Math.round(Math.random() * 10)})`);
             gameState.clickValue += Math.round(Math.random() * 10);
            }
      } else if (type === "epic") {
          if (randomNumber < 0.4) {
               gameState.diamonds += 5;
                items.push(`Алмазы (+5)`);
           } else if (randomNumber < 0.7) {
              items.push(`Автокликер (+${Math.round(Math.random() * 3)})`);
               gameState.autoClickerValue +=  Math.round(Math.random() * 3);
            } else if (randomNumber < 0.9) {
                  items.push(`Клик (+${Math.round(Math.random() * 15)})`);
                gameState.clickValue += Math.round(Math.random() * 15);
            }
             else {
                const skinName = 'ghost';
                if (!gameState.skins.includes(skinName)) {
                    gameState.skins.push(skinName);
                      items.push(`Новый скин: ${skinName}`);
                } else {
                    items.push(`Выпал уже имеющийся скин: ${skinName}`);
                   gameState.diamonds += 5;
                   items.push(`Алмазы (+5)`);
                }
             }
      } else {
          if (randomNumber < 0.4) {
            gameState.diamonds += 10;
             items.push(`Алмазы (+10)`);
           } else if (randomNumber < 0.7) {
             const artifactName = 'artifact1';
            if (!gameState.artifacts.includes(artifactName)) {
                 gameState.artifacts.push(artifactName);
                     items.push(`Новый артефакт: ${artifactName}`);
                } else {
                    items.push(`Выпал уже имеющийся артефакт: ${artifactName}`);
                     gameState.diamonds += 10;
                     items.push(`Алмазы (+10)`);
                }
          }  else {
                const skinName = 'ghost';
                if (!gameState.skins.includes(skinName)) {
                    gameState.skins.push(skinName);
                       items.push(`Новый скин: ${skinName}`);
                } else {
                    items.push(`Выпал уже имеющийся скин: ${skinName}`);
                   gameState.diamonds += 5;
                   items.push(`Алмазы (+5)`);
                }
           }
      }
    return items;
};
// Улучшение уровня клика
elements.clickUpgradeLevelCost.addEventListener('click', () => {
  if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
        gameState.clickCount -= gameState.clickUpgradeLevelCost;
        gameState.clickUpgradeLevel++;
         gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 2);
        updateDisplay();
    } else {
        displayMessage(`Недостаточно кликов! (нужно ${gameState.clickUpgradeLevelCost})`, 'red');
    }
});

    // Экспедиции
document.querySelectorAll('.expedition-button').forEach(button => {
    button.addEventListener('click', function () {
        const expeditionType = this.getAttribute('data-type');
       startExpedition(expeditionType);
    });
});
const startExpedition = (type) => {
    if (gameState.expeditions[type].inProgress) {
        displayMessage('Экспедиция уже в пути!', 'red');
        return;
    }
        gameState.expeditions[type].inProgress = true;
       const button = document.querySelector(`.expedition-button[data-type="${type}"]`);
        button.classList.add('disabled');
        button.disabled = true;

    let remainingTime = gameState.expeditions[type].duration;
    let progressDiv = document.createElement('div');
    progressDiv.textContent = 'Экспедиция началась';
    let progressElement = document.getElementById('expedition-progress');
     progressElement.appendChild(progressDiv);
    let progressTimer = setInterval(() => {
        remainingTime -= 1000;
        let minutes = Math.floor(remainingTime / 60000);
        let seconds = Math.floor((remainingTime % 60000) / 1000);
        progressDiv.textContent = `Экспедиция: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

         if (remainingTime <= 0) {
            clearInterval(progressTimer);
             progressDiv.textContent = 'Экспедиция завершена!';
             gameState.expeditions[type].inProgress = false;
                button.classList.remove('disabled');
            button.disabled = false;
             let diamondsReward = Math.floor(Math.random() * 5) + 1;
           gameState.diamonds += diamondsReward;
             displayMessage(`Экспедиция завершена! Вы получили ${diamondsReward} алмазов!`, 'lime');
               updateDisplay();
        }
      }, 1000);
     timeouts.push(progressTimer);
};

// Загрузка и сохранение игры
loadGame();
window.addEventListener('beforeunload', saveGame);
     
