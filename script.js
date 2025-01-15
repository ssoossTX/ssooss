document.addEventListener('DOMContentLoaded', function() {
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
        if(tWebApp) {
            tWebApp.ready();
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
    }

    function startRandomEvent() {
        const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';

         if (eventType === 'bonus') {
            bonusActive = true;
            clickValue *= 2;
            autoClickerValue *= 2;
            displayMessage('Случайный бонус: удвоенный урон!', 'blue');
            updateDisplay();


            clearTimeout(bonusTimeout);
            bonusTimeout = setTimeout(() => {
                bonusActive = false;
                clickValue /= 2;
                autoClickerValue /= 2;
                displayMessage('Действие бонуса закончилось!');
                 updateDisplay();
            }, 10000);

        } else {
            displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
           clickValue /= 2;
            updateDisplay();
            setTimeout(() => {
                clickValue *=2;
                displayMessage('Штраф закончился!');
                updateDisplay();
            }, 10000)
        }

        randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);
    }

    function checkAchievements() {
      if(clickCount >= 100000 && !achievements.includes('100000 clicks')) {
        addAchievement('100000 clicks');
        achievementCount++;
      }

      if(clickCount >= 1000000 && !achievements.includes('1000000 clicks')) {
        addAchievement('1000000 clicks');
        achievementCount++;
      }

        if(prestigeLevel >= 1 && !achievements.includes('first prestige')) {
            addAchievement('first prestige');
             achievementCount++;
        }
      
        if(autoClickerValue >= 5 && !achievements.includes('5 autoClicker')) {
          addAchievement('5 autoClicker');
          achievementCount++;
        }
    }

    function addAchievement(achievement) {
        achievements.push(achievement);
        achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
         saveData();
    }

      function resetGame() {
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
        if(tWebApp) {
            tWebApp.CloudStorage.removeItem('clickerData');
        }
        displayMessage('Прогресс сброшен!', 'orange');
     }
    
    function saveData() {
      let data = {
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
      if (tWebApp) {
          tWebApp.CloudStorage.setItem('clickerData', JSON.stringify(data));
      } else {
           localStorage.setItem('clickerData', JSON.stringify(data));
      }
    }


     function loadGame() {
       if (tWebApp) {
            tWebApp.CloudStorage.getItem('clickerData', function(err, value) {
                if (err) {
                    console.error("Ошибка загрузки данных:", err);
                    return;
                }
                if (value) {
                    let savedData = JSON.parse(value);
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
                     achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
                    if (autoClickerValue > 0) {
                        autoClickerInterval = setInterval(autoClick, 1000);
                    }
                     if (savedData.bonusActive) {
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
                }
            });
        } else if (localStorage.getItem('clickerData')) {
                let savedData = JSON.parse(localStorage.getItem('clickerData'));
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
                  achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
                  if (autoClickerValue > 0) {
                  autoClickerInterval = setInterval(autoClick, 1000);
               }
                if (savedData.bonusActive) {
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
         }
      }
    window.addEventListener('beforeunload', saveData);

    clickButton.addEventListener('click', function() {
        clickCount += (clickValue * clickUpgradeLevel) * prestigeMultiplier;
        updateDisplay();
        checkAchievements();
    });

    upgradeClickLevelButton.addEventListener('click', function() {
        if (clickCount >= clickUpgradeLevelCost) {
            clickCount -= clickUpgradeLevelCost;
            clickUpgradeLevel++;
            clickUpgradeCost = 10;
            clickCount = 0;
            clickValue = 1;
            clickUpgradeLevelCost = Math.round(clickUpgradeLevelCost * 2.5);
            updateDisplay();
            displayMessage('Уровень улучшения клика повышен!');
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
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    prestigeButton.addEventListener('click', function(){
      if(clickCount >= 10000) {
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
        } else {
         displayMessage('Недостаточно кликов! (нужно 10000)','red');
      }
    });

    resetButton.addEventListener('click', function() {
         resetGame();
    })


    loadGame();
    startRandomEvent();
    checkAchievements();
});
