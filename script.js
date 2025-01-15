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
    let playerName = null;
    let gameLoaded = false;

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

    // Рейтинг
    const ratingContent = document.getElementById('rating-content');
    const gameContent = document.getElementById('game-content');
    const ratingList = document.getElementById('rating-list');
    let playersRating = [];

    //menu
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');

    const tWebApp = window.Telegram && window.Telegram.WebApp;
    let isTWA = false;

    let tWebAppReady = false;

     if(tWebApp){
        isTWA = true;
          tWebApp.onEvent('web_app_ready', function() {
                 if(tWebAppReady){
                     return;
                   }
                tWebAppReady = true;
                 loadGame()
                     .then(startRandomEvent)
                     .then(checkAchievements)
                     .then(loadRating)
                     .then(loadPlayerName)
                    .then(() => {
                            if(!playerName) updatePlayerScore();
                              gameLoaded = true;
                       })
                  .catch(error => console.error('Ошибка инициализации TWA:', error));
         });
    } else {
          loadGame()
              .then(startRandomEvent)
             .then(checkAchievements)
             .then(loadRating)
            .then(loadPlayerName)
              .then(()=>{
                  if(!playerName) updatePlayerScore();
                  gameLoaded = true;
              })
              .catch(error => console.error('Ошибка загрузки игры в браузере:', error));
    }
      function updateDisplay() {
        try {
            if (clickCountDisplay) clickCountDisplay.textContent = Math.round(clickCount);
            if (clickUpgradeCostDisplay) clickUpgradeCostDisplay.textContent = clickUpgradeCost;
            if (autoUpgradeCostDisplay) autoUpgradeCostDisplay.textContent = autoUpgradeCost;
             if (clickUpgradeLevelDisplay) clickUpgradeLevelDisplay.textContent = clickUpgradeLevel;
           if (clickUpgradeLevelCostDisplay) clickUpgradeLevelCostDisplay.textContent = clickUpgradeLevelCost;
            if(prestigeLevelDisplay) prestigeLevelDisplay.textContent = prestigeLevel;
        } catch(error) {
        }
    }

    function displayMessage(msg, color = 'green') {
        try{
             if(messageDisplay){
                  messageDisplay.textContent = msg;
                   messageDisplay.style.color = color;
                   setTimeout(() => {
                     messageDisplay.textContent = '';
                     }, 3000);
             }
        } catch(error){
        }
    }

     function autoClick() {
        try{
           clickCount += (autoClickerValue * clickUpgradeLevel) * prestigeMultiplier;
             updateDisplay();
              saveData();
        } catch(error){
       }
    }

     function startRandomEvent() {
       try{
               const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';

            if (eventType === 'bonus') {
                  bonusActive = true;
                  clickValue *= 2;
                  autoClickerValue *= 2;
                 displayMessage('Случайный бонус: удвоенный урон!', 'blue');
                 updateDisplay();
                  saveData();
                 clearTimeout(bonusTimeout);
                bonusTimeout = setTimeout(() => {
                    bonusActive = false;
                     clickValue /= 2;
                      autoClickerValue /= 2;
                    displayMessage('Действие бонуса закончилось!');
                     updateDisplay();
                    saveData();
                 }, 10000);
            } else {
                displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
                  clickValue /= 2;
                  updateDisplay();
                   saveData();
                 setTimeout(() => {
                    clickValue *= 2;
                     displayMessage('Штраф закончился!');
                    updateDisplay();
                    saveData();
                 }, 10000);
            }
         randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);
       } catch(error){
       }
    }
  function checkAchievements() {
        try{
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
       }catch(error){
       }
    }

   function addAchievement(achievement) {
       try{
              achievements.push(achievement);
           achievementCount++;
            if(achievementsDisplay) achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
             saveData();
       }catch(error){
       }
   }
    function saveRating() {
        return new Promise((resolve, reject) => {
            try {
                const saveFunction = isTWA ? tWebApp.CloudStorage.setItem : localStorage.setItem;
                saveFunction('playersRating', JSON.stringify(playersRating), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    function loadRating() {
         return new Promise((resolve, reject) => {
            try {
                const loadFunction = isTWA ? tWebApp.CloudStorage.getItem : localStorage.getItem;
                loadFunction('playersRating', (err, value) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    playersRating = value ? JSON.parse(value) : [];
                    updateRatingDisplay();
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    function savePlayerName() {
         return new Promise((resolve, reject) => {
            try {
                const saveFunction = isTWA ? tWebApp.CloudStorage.setItem : localStorage.setItem;
                saveFunction('playerName', JSON.stringify(playerName), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    function loadPlayerName() {
        return new Promise((resolve, reject) => {
            try {
                const loadFunction = isTWA ? tWebApp.CloudStorage.getItem : localStorage.getItem;
                loadFunction('playerName', (err, value) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    playerName = value ? JSON.parse(value) : null;
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }
   function updateRatingDisplay() {
    try{
            if(ratingList){
               ratingList.innerHTML = '';
            playersRating.sort((a, b) => b.score - a.score);
              playersRating.forEach((player, index) => {
                 const listItem = document.createElement('li');
                  if(player.name){
                     listItem.textContent = `${index + 1}. Игрок: ${player.name}, Очки: ${player.score}`;
                    ratingList.appendChild(listItem);
                   }
               });
            }
         } catch(error){
        }
    }
    function resetGame() {
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
            playerName = null;

            clearInterval(autoClickerInterval);
            autoClickerInterval = null;
             clearTimeout(bonusTimeout);
           clearTimeout(randomEventTimeout);
           randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);
            updateDisplay();
              if(achievementsDisplay)achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
               if (isTWA) {
                  tWebApp.CloudStorage.removeItem('clickerData');
                 tWebApp.CloudStorage.removeItem('playerName');
            } else {
                localStorage.removeItem('clickerData');
                localStorage.removeItem('playerName');
           }
           displayMessage('Прогресс сброшен!', 'orange');
           saveData();
           saveRating();
           savePlayerName();
         } catch(error){
        }
    }
   function saveData() {
       return new Promise((resolve, reject) => {
           if (!gameLoaded) {
               return reject();
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

               const saveFunction = isTWA ? tWebApp.CloudStorage.setItem : localStorage.setItem;
               saveFunction('clickerData', JSON.stringify(data), (err) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve();
                  }
               });

           } catch (error) {
               reject(error);
           }
       });
    }

  function loadGame() {
     return new Promise((resolve, reject) => {
         try {
             const loadFunction = isTWA ? tWebApp.CloudStorage.getItem : localStorage.getItem;
            loadFunction('clickerData', (err, value) => {
               if (err) {
                     reject(err);
                    return;
               }
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

                    } catch (parseError) {
                         resetGame();
                        reject(parseError);
                     }
                 } else {
                     resolve();
               }
            });
         } catch (error) {
             reject(error);
         }
     });
  }

    // Сохранение данных при изменении прогресса
    function handleSave() {
       saveData();
   }

    window.addEventListener('click', handleSave);
    window.addEventListener('keydown', handleSave);
  if(clickButton){
         clickButton.addEventListener('click', function() {
          try{
             let clicksToAdd = (clickValue * clickUpgradeLevel) * prestigeMultiplier;
                if (bonusActive) {
                    clicksToAdd *= 2
                }
              clickCount += clicksToAdd;
              updateDisplay();
              checkAchievements();
               saveData();
              updatePlayerScore();
          } catch(error){
          }
      });
  }
  if(upgradeClickLevelButton){
         upgradeClickLevelButton.addEventListener('click', function() {
            try{
                if (clickCount >= clickUpgradeLevelCost) {
                    clickCount -= clickUpgradeLevelCost;
                    clickUpgradeLevel++;
                    clickUpgradeLevelCost = Math.round(clickUpgradeLevelCost * 2.5);
                    updateDisplay();
                      displayMessage('Уровень улучшения клика повышен!');
                    saveData();
                } else {
                    displayMessage('Недостаточно кликов!', 'red');
                }
            } catch(error){
           }
        });
  }
   if(upgradeClickButton){
           upgradeClickButton.addEventListener('click', function() {
              try{
                  if (clickCount >= clickUpgradeCost) {
                      clickCount -= clickUpgradeCost;
                    clickValue++;
                      clickUpgradeCost = Math.round(clickUpgradeCost * 1.8);
                     updateDisplay();
                     displayMessage('Улучшение клика приобретено!');
                       saveData();
                    } else {
                      displayMessage('Недостаточно кликов!', 'red');
                    }
              } catch(error){
               }
          });
   }
   if(upgradeAutoButton){
         upgradeAutoButton.addEventListener('click', function() {
              try{
                  if (clickCount >= autoUpgradeCost) {
                    clickCount -= autoUpgradeCost;
                      autoClickerValue++;
                        if (!autoClickerInterval) {
                            autoClickerInterval = setInterval(autoClick, 1000);
                        }
                      autoUpgradeCost = Math.round(autoUpgradeCost * 2.2);
                     updateDisplay();
                    displayMessage('Автокликер приобретен!');
                      saveData();
                   } else {
                      displayMessage('Недостаточно кликов!', 'red');
                  }
                } catch(error){
                }
         });
   }

   if(prestigeButton){
        prestigeButton.addEventListener('click', function() {
           try{
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
                     saveData();
                   updatePlayerScore();
                  } else {
                     displayMessage('Недостаточно кликов! (нужно 10000)', 'red');
                }
           } catch(error){
            }
         });
    }
    if(resetButton){
            resetButton.addEventListener('click', function() {
                try{
                 resetGame();
             } catch(error){
               }
         });
    }
     function updatePlayerScore() {
         try{
               if (!playerName) {
                   playerName = prompt('Введите ваше имя:', 'Игрок');
                    savePlayerName();
                 }
                 if (playerName) {
                    const playerScore = clickCount + (prestigeLevel * 10000);
                    const existingPlayerIndex = playersRating.findIndex(player => player.name === playerName);
                    if (existingPlayerIndex > -1) {
                       playersRating[existingPlayerIndex].score = playerScore;
                      } else {
                         playersRating.push({ name: playerName, score: playerScore });
                     }
                     saveRating();
                     updateRatingDisplay();
               }
            } catch(error){
            }
       }

    // Menu logic
  if(menuToggle){
         menuToggle.addEventListener('click', () => {
            try {
                if(menuItems)menuItems.classList.toggle('active');
        } catch(error){
              }
         });
  }

    // Логика для перехода между вкладками
    if(menuItems){
           menuItems.addEventListener('click', (e) => {
                try{
                     if (e.target.tagName === 'BUTTON') {
                           const tab = e.target.dataset.tab;
                           if (tab === 'rating') {
                             if(gameContent)gameContent.style.display = 'none';
                              if(ratingContent) ratingContent.style.display = 'block';
                                updateRatingDisplay();
                              } else {
                               if(gameContent) gameContent.style.display = 'block';
                                if(ratingContent)ratingContent.style.display = 'none';
                         }
                         if(menuItems)menuItems.classList.remove('active');
                       }
                  } catch(error){
                 }
           });
     }
});
