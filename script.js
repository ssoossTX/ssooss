document.addEventListener('DOMContentLoaded', async function() {
    let clickCount = 0;
    let clickValue = 1;
    let autoClickerInterval;
    let autoClickerValue = 0;
    let clickUpgradeCost = 10;
    let autoUpgradeCost = 50;
    let clickUpgradeLevel = 1;
    let clickUpgradeLevelCost = 100;
    let prestigeLevel = 0;
    let prestigeMultiplier = 1;
    let bonusActive = false;
    let bonusTimeout;
    let achievementCount = 0;
    let randomEventTimeout;
    let achievements = [];

    const clickCountDisplay = document.getElementById('click-count');
    const clickButton = document.getElementById('click-button');
    const upgradeClickButton = document.querySelector('#upgrade-click button');
    const upgradeAutoButton = document.querySelector('#upgrade-auto button');
    const upgradeClickLevelButton = document.querySelector('#upgrade-click-level button');
    const clickUpgradeCostDisplay = document.getElementById('click-upgrade-cost');
    const autoUpgradeCostDisplay = document.getElementById('auto-upgrade-cost');
    const clickUpgradeLevelDisplay = document.getElementById('click-upgrade-level-display');
    const clickUpgradeLevelCostDisplay = document.getElementById('click-upgrade-level-cost');
    const messageDisplay = document.getElementById('message');
    const prestigeButton = document.getElementById('prestige-button');
    const prestigeLevelDisplay = document.getElementById('prestige-level');
    const achievementsDisplay = document.getElementById('achievements');
    const resetButton = document.getElementById('reset-button');

    const tWebApp = window.Telegram && window.Telegram.WebApp;
    let isTWA = false;
    let tWebAppReady = false;

    if (tWebApp) {
        isTWA = true;
        tWebApp.onEvent('web_app_ready', async function() {
            if (tWebAppReady) {
                return;
            }
            tWebAppReady = true;
            try {
                 await initializeGame();
            } catch (error) {
                console.error('Ошибка при инициализации игры в TWA:', error);
            }
        });
    } else {
      try {
        await initializeGame();
        } catch (error) {
            console.error('Ошибка при инициализации игры в браузере:', error);
        }
    }

    async function initializeGame() {
      try{
           await loadGame();
            startRandomEvent();
           checkAchievements();
            gameLoaded = true;
         } catch(error) {
            console.error('Ошибка при инициализации игры:', error);
         }
    }

    function updateDisplay() {
        clickCountDisplay.textContent = Math.round(clickCount);
        clickUpgradeCostDisplay.textContent = clickUpgradeCost;
        autoUpgradeCostDisplay.textContent = autoUpgradeCost;
        clickUpgradeLevelDisplay.textContent = clickUpgradeLevel;
        clickUpgradeLevelCostDisplay.textContent = clickUpgradeLevelCost;
        prestigeLevelDisplay.textContent = prestigeLevel;
    }

    function displayMessage(msg, color = 'green') {
        messageDisplay.textContent = msg;
        messageDisplay.style.color = color;
        setTimeout(() => {
            messageDisplay.textContent = '';
        }, 3000);
    }

    function autoClick() {
        clickCount += (autoClickerValue * clickUpgradeLevel) * prestigeMultiplier;
        updateDisplay();
       if(gameLoaded) saveData();
    }

    function startRandomEvent() {
        const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';

        if (eventType === 'bonus') {
            bonusActive = true;
            clickValue *= 2;
            autoClickerValue *= 2;
            displayMessage('Случайный бонус: удвоенный урон!', 'blue');
            updateDisplay();
             if(gameLoaded) saveData();
            clearTimeout(bonusTimeout);
            bonusTimeout = setTimeout(() => {
                bonusActive = false;
                clickValue /= 2;
                autoClickerValue /= 2;
                displayMessage('Действие бонуса закончилось!');
                updateDisplay();
                  if(gameLoaded) saveData();
            }, 10000);
        } else {
            displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
            clickValue /= 2;
            updateDisplay();
             if(gameLoaded) saveData();
            setTimeout(() => {
                clickValue *= 2;
                displayMessage('Штраф закончился!');
                updateDisplay();
                if(gameLoaded) saveData();
            }, 10000);
        }
        randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);
    }

    function checkAchievements() {
        if (clickCount >= 100000 && !achievements.includes('100000 clicks')) {
            addAchievement('100000 clicks');
        }
        if (clickCount >= 1000000 && !achievements.includes('1000000 clicks')) {
            addAchievement('1000000 clicks');
        }
        if (prestigeLevel >= 1 && !achievements.includes('first prestige')) {
            addAchievement('first prestige');
        }
        if (autoClickerValue >= 5 && !achievements.includes('5 autoClicker')) {
            addAchievement('5 autoClicker');
        }
    }

    function addAchievement(achievement) {
        achievements.push(achievement);
        achievementCount++;
        achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
         if(gameLoaded) saveData();
    }

    async function resetGame() {
        try{
            clickCount = 0;
            clickValue = 1;
           autoClickerValue = 0;
           clickUpgradeCost = 10;
            autoUpgradeCost = 50;
           clickUpgradeLevel = 1;
            clickUpgradeLevelCost = 100;
           prestigeLevel = 0;
           prestigeMultiplier = 1;
            bonusActive = false;
            achievements = [];
           achievementCount = 0;
           clearInterval(autoClickerInterval);
           autoClickerInterval = null;
            clearTimeout(bonusTimeout);
            clearTimeout(randomEventTimeout);
           randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);
          updateDisplay();
           achievementsDisplay.textContent = `Достижения: ${achievementCount}`;

            if (isTWA && tWebApp) {
                tWebApp.CloudStorage.removeItem('clickerData');
            } else if(typeof localStorage !== 'undefined'){
              localStorage.removeItem('clickerData');
            }
           displayMessage('Прогресс сброшен!', 'orange');
          if(gameLoaded) await saveData();
        } catch(error){
            console.error("Ошибка при сбросе прогресса:", error);
        }
    }

    async function saveData() {
        if (!gameLoaded) {
             console.log("saveData: игра еще не загружена");
            return;
        }
        try {
            const data = {
                clickCount: clickCount,
                clickValue: clickValue,
                autoClickerValue: autoClickerValue,
                clickUpgradeCost: clickUpgradeCost,
                autoUpgradeCost: autoUpgradeCost,
                clickUpgradeLevel: clickUpgradeLevel,
                clickUpgradeLevelCost: clickUpgradeLevelCost,
                prestigeLevel: prestigeLevel,
                prestigeMultiplier: prestigeMultiplier,
                achievements: achievements,
                achievementCount: achievementCount,
                bonusActive: bonusActive
            };
             const saveFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.setItem : null) : (typeof localStorage !== 'undefined' ? localStorage.setItem : null);
             if(!saveFunction) {
                  console.error("Нет доступного хранилища для сохранения");
                 return;
            }
          console.log("saveData: сохраняем данные, данные:", JSON.stringify(data));
          await new Promise((resolve, reject) => {
              saveFunction('clickerData', JSON.stringify(data), (err) => {
                  if (err) {
                      console.error("Ошибка при сохранении данных игры:", err);
                        reject(err);
                        return;
                  }
                resolve();
            });
          });
        } catch (error) {
            console.error("Ошибка при сохранении данных игры:", error);
        }
    }

     async function loadGame() {
        console.log("loadGame: начата загрузка");
       return new Promise(async (resolve, reject) => {
           try{
                 const loadFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.getItem : null) : (typeof localStorage !== 'undefined' ? localStorage.getItem : null);
               if(!loadFunction){
                  console.error("Нет доступного хранилища для загрузки");
                    reject("Нет доступного хранилища");
                      return;
                }
                 loadFunction('clickerData', async (err, value) => {
                    if (err) {
                         console.error("Ошибка при загрузке данных:", err);
                        reject(err);
                       return;
                   }
                    console.log("loadGame: получены данные:", value);
                     if (value) {
                         try {
                               const savedData = JSON.parse(value);
                              clickCount = savedData.clickCount || 0;
                                 clickValue = savedData.clickValue || 1;
                                 autoClickerValue = savedData.autoClickerValue || 0;
                                 clickUpgradeCost = savedData.clickUpgradeCost || 10;
                                   autoUpgradeCost = savedData.autoUpgradeCost || 50;
                                   clickUpgradeLevel = savedData.clickUpgradeLevel || 1;
                                    clickUpgradeLevelCost = savedData.clickUpgradeLevelCost || 100;
                                   prestigeLevel = savedData.prestigeLevel || 0;
                                  prestigeMultiplier = savedData.prestigeMultiplier || 1;
                                  achievements = savedData.achievements || [];
                                    achievementCount = savedData.achievementCount || 0;
                                    bonusActive = savedData.bonusActive || false;
                                 if (achievementsDisplay) achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
                                    if (autoClickerValue > 0) {
                                        autoClickerInterval = setInterval(autoClick, 1000);
                                   }
                                     if (bonusActive) {
                                           bonusActive = true;
                                          clickValue *= 2;
                                           autoClickerValue *= 2;
                                           bonusTimeout = setTimeout(() => {
                                             bonusActive = false;
                                              clickValue /= 2;
                                              autoClickerValue /= 2;
                                         }, 10000);
                                    }
                                 updateDisplay();
                                 resolve();
                           } catch (error) {
                              console.error("loadGame: ошибка при парсинге JSON:", error);
                                resetGame();
                                reject(error)
                           }
                      }
                      resolve();
                  });
             } catch (error) {
                 console.error("Ошибка при загрузке игры:", error);
                 reject(error);
             }
          });
     }
    function handleSave() {
        if(gameLoaded) saveData();
    }
    window.addEventListener('click', handleSave);
    window.addEventListener('keydown', handleSave);

    clickButton.addEventListener('click', function() {
         clickCount += (clickValue * clickUpgradeLevel) * prestigeMultiplier;
         if (bonusActive) {
            clickCount *= 2;
        }
         updateDisplay();
        checkAchievements();
          if(gameLoaded) saveData();
    });

    upgradeClickLevelButton.addEventListener('click', function() {
        if (clickCount >= clickUpgradeLevelCost) {
            clickCount -= clickUpgradeLevelCost;
            clickUpgradeLevel++;
            clickUpgradeLevelCost = Math.round(clickUpgradeLevelCost * 2.5);
            updateDisplay();
            displayMessage('Уровень улучшения клика повышен!');
              if(gameLoaded) saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    upgradeClickButton.addEventListener('click', function() {
        if (clickCount >= clickUpgradeCost) {
            clickCount -= clickUpgradeCost;
            clickValue++;
            clickUpgradeCost = Math.round(clickUpgradeCost * 1.8);
            updateDisplay();
            displayMessage('Улучшение клика приобретено!');
              if(gameLoaded) saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    upgradeAutoButton.addEventListener('click', function() {
        if (clickCount >= autoUpgradeCost) {
            clickCount -= autoUpgradeCost;
            autoClickerValue++;
            if (!autoClickerInterval) {
                autoClickerInterval = setInterval(autoClick, 1000);
            }
            autoUpgradeCost = Math.round(autoUpgradeCost * 2.2);
            updateDisplay();
            displayMessage('Автокликер приобретен!');
            if(gameLoaded) saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    prestigeButton.addEventListener('click', async function() {
        if (clickCount >= 10000) {
            prestigeLevel++;
            prestigeMultiplier *= 2;
            clickCount = 0;
            clickValue = 1;
            autoClickerValue = 0;
            clickUpgradeCost = 10;
            autoUpgradeCost = 50;
            clickUpgradeLevel = 1;
            clickUpgradeLevelCost = 100;
            clearInterval(autoClickerInterval);
            autoClickerInterval = null;
            updateDisplay();
            displayMessage('Перерождение!');
           if(gameLoaded) await saveData();
        } else {
            displayMessage('Недостаточно кликов! (нужно 10000)', 'red');
        }
    });

    resetButton.addEventListener('click', async function() {
       try{
            await resetGame();
        } catch(error){
            console.error("Ошибка при сбросе прогресса", error);
        }
    });
     setInterval(() => {
       if(gameLoaded) saveData();
     }, 10000);
});
                                                   
