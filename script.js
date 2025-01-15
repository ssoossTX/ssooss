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
    let playerName;
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

    const ratingContent = document.getElementById('rating-content');
    const gameContent = document.getElementById('game-content');
    const ratingList = document.getElementById('rating-list');
    let playersRating = [];

    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');

    const tWebApp = window.Telegram && window.Telegram.WebApp;
    let isTWA = false;

    let tWebAppReady = false;

     if(tWebApp){
        isTWA = true;
          tWebApp.onEvent('web_app_ready', async function() {
                 if(tWebAppReady){
                     return;
                   }
                tWebAppReady = true;
                 try {
                  await initializeGame();
                  } catch (error) {
                     console.error('Ошибка инициализации TWA:', error);
                 }
         });
    } else {
           try{
               await initializeGame();
           } catch (error){
                console.error('Ошибка загрузки игры в браузере:', error);
           }
    }
    async function initializeGame() {
            try{
                await loadGame();
                startRandomEvent();
                checkAchievements();
                await loadRating();
                 await loadPlayerName();
                if(!playerName) updatePlayerScore();
                   gameLoaded = true;
            } catch (error) {
                console.error('Ошибка инициализации игры:', error);
            }
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
             console.error("Ошибка при обновлении дисплея", error);
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
             console.error("Ошибка при отображении сообщения", error);
        }
    }

     function autoClick() {
        try{
           clickCount += (autoClickerValue * clickUpgradeLevel) * prestigeMultiplier;
             updateDisplay();
               if(gameLoaded) saveData();
        } catch(error){
             console.error("Ошибка в автоклике", error);
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
                  if(gameLoaded)  saveData();
                 }, 10000);
            }
         randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);
       } catch(error){
            console.error("Ошибка при запуске случайного события", error);
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
           console.error("Ошибка при проверки достижений", error);
       }
    }

   function addAchievement(achievement) {
       try{
              achievements.push(achievement);
           achievementCount++;
            if(achievementsDisplay) achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
           if(gameLoaded) saveData();
       }catch(error){
           console.error("Ошибка при добавлении достижения", error)
       }
   }
   async function saveRating() {
        try {
               const saveFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.setItem : null) : (typeof localStorage !== 'undefined' ? localStorage.setItem : null);
            if(!saveFunction) {
                   console.error("Нет доступного хранилища для рейтинга");
                   return;
            }
           await new Promise((resolve, reject) => {
            saveFunction('playersRating', JSON.stringify(playersRating), (err) => {
                 if (err) {
                        console.error("Ошибка при сохранении рейтинга:", err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
           });
         } catch (error) {
                console.error("Ошибка при сохранении рейтинга:", error);
        }
    }
   async function loadRating() {
         return new Promise((resolve, reject) => {
            try {
                 const loadFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.getItem : null) : (typeof localStorage !== 'undefined' ? localStorage.getItem : null);
                if(!loadFunction) {
                    console.error("Нет доступного хранилища для рейтинга");
                    reject("Нет доступного хранилища");
                    return;
                }
                loadFunction('playersRating', (err, value) => {
                    if (err) {
                        console.error("Ошибка при загрузке рейтинга:", err);
                        reject(err);
                        return;
                    }
                     try {
                         playersRating = value ? JSON.parse(value) : [];
                      } catch (parseError){
                          console.error("Ошибка при парсинге рейтинга:", parseError);
                        playersRating = [];
                    }
                    updateRatingDisplay();
                    resolve();
                });
            } catch (error) {
                 console.error("Ошибка при загрузке рейтинга:", error);
                reject(error);
            }
        });
    }
    async function savePlayerName() {
        try {
              const saveFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.setItem : null) : (typeof localStorage !== 'undefined' ? localStorage.setItem : null);
            if(!saveFunction){
                 console.error("Нет доступного хранилища для имени игрока");
                  return;
             }
          await new Promise((resolve, reject) => {
              saveFunction('playerName', JSON.stringify(playerName), (err) => {
                  if (err) {
                         console.error("Ошибка при сохранении имени игрока:", err);
                        reject(err);
                    } else {
                        resolve();
                    }
              });
            });
        } catch (error) {
                 console.error("Ошибка при сохранении имени игрока:", error);
        }
    }
   function loadPlayerName() {
        return new Promise((resolve, reject) => {
            try {
                const loadFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.getItem : null) : (typeof localStorage !== 'undefined' ? localStorage.getItem : null);
                if(!loadFunction){
                     console.error("Нет доступного хранилища для имени игрока");
                     reject("Нет доступного хранилища");
                     return;
                 }
                loadFunction('playerName', (err, value) => {
                    if (err) {
                       console.error("Ошибка при загрузке имени игрока:", err);
                        reject(err);
                        return;
                    }
                   try {
                         playerName = value ? JSON.parse(value) : null;
                      } catch (parseError) {
                          console.error("Ошибка при парсинге имени игрока:", parseError);
                          playerName = null;
                      }
                    resolve();
                });
            } catch (error) {
                 console.error("Ошибка при загрузке имени игрока:", error);
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
              console.error("Ошибка при обновлении рейтинга", error);
        }
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
            playerName = null;

            clearInterval(autoClickerInterval);
            autoClickerInterval = null;
             clearTimeout(bonusTimeout);
           clearTimeout(randomEventTimeout);
           randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);
            updateDisplay();
              if(achievementsDisplay)achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
               if (isTWA && tWebApp) {
                  tWebApp.CloudStorage.removeItem('clickerData');
                 tWebApp.CloudStorage.removeItem('playerName');
            } else if(typeof localStorage !== 'undefined') {
                localStorage.removeItem('clickerData');
                localStorage.removeItem('playerName');
           }
           displayMessage('Прогресс сброшен!', 'orange');
           if(gameLoaded) await saveData();
           await saveRating();
           await savePlayerName();
         } catch(error){
               console.error("Ошибка при сбросе прогресса", error);
        }
    }
    async function saveData() {
        if (!gameLoaded) {
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
                 playerName: playerName,
                bonusActive: bonusActive
            };

            const saveFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.setItem : null) : (typeof localStorage !== 'undefined' ? localStorage.setItem : null);
            if(!saveFunction){
                   console.error("Нет доступного хранилища для сохранения данных");
                   return;
            }

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
    function loadGame() {
        return new Promise(async (resolve, reject) => {
            try {
                 const loadFunction = isTWA ? (tWebApp ? tWebApp.CloudStorage.getItem : null) : (typeof localStorage !== 'undefined' ? localStorage.getItem : null);
               if(!loadFunction){
                  console.error("Нет доступного хранилища для загрузки данных");
                  reject("Нет доступного хранилища");
                   return;
               }
                loadFunction('clickerData', async (err, value) => {
                  if (err) {
                       console.error("Ошибка при загрузке данных:", err);
                        reject(err);
                      return;
                   }
                   if (value) {
                         try{
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
                                 playerName = savedData.playerName;
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
                         } catch(error) {
                                console.error("Ошибка при парсинге данных:", error);
                                resetGame();
                                reject(error);
                            }
                    }
                      resolve();
              });
            }
            catch(error) {
                 console.error("Ошибка при загрузке игры", error);
                reject(error);
            }
        });
    }

    // Сохранение данных перед закрытием или перезагрузкой страницы
    window.addEventListener('beforeunload', async function() {
      if(isTWA){
           return;
        }
       // await saveData();
       // await saveRating();
    });

    // Чаще вызываем сохранение
    setInterval(() => {
         if(gameLoaded)  saveData();
    }, 5000);

  function handleSave() {
    if(gameLoaded) saveData();
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
               if(gameLoaded) saveData();
              updatePlayerScore();
          } catch(error){
               console.error("Ошибка при клике на кнопку", error);
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
                      if(gameLoaded) saveData();
                } else {
                    displayMessage('Недостаточно кликов!', 'red');
                }
            } catch(error){
                  console.error("Ошибка при улучшении уровня клика", error);
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
                     if(gameLoaded) saveData();
                    } else {
                      displayMessage('Недостаточно кликов!', 'red');
                    }
              } catch(error){
                    console.error("Ошибка при улучшении клика", error);
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
                       if(gameLoaded) saveData();
                   } else {
                      displayMessage('Недостаточно кликов!', 'red');
                  }
                } catch(error){
                     console.error("Ошибка при покупке автокликера", error);
                }
         });
   }

   if(prestigeButton){
        prestigeButton.addEventListener('click', async function() {
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
                      if(gameLoaded) await saveData();
                   updatePlayerScore();
                  } else {
                     displayMessage('Недостаточно кликов! (нужно 10000)', 'red');
                }
           } catch(error){
                 console.error("Ошибка при перерождении", error);
            }
         });
    }
    if(resetButton){
            resetButton.addEventListener('click', function() {
                try{
                 resetGame();
             } catch(error){
                   console.error("Ошибка при сбросе прогресса", error);
               }
         });
    }
     async function updatePlayerScore() {
         try{
               if (!playerName) {
                   playerName = prompt('Введите ваше имя:', 'Игрок');
                     if(playerName) await savePlayerName();
                 }
                 if (playerName) {
                    const playerScore = clickCount + (prestigeLevel * 10000);
                    const existingPlayerIndex = playersRating.findIndex(player => player.name === playerName);
                    if (existingPlayerIndex > -1) {
                        if(playersRating[existingPlayerIndex].score !== playerScore){
                           playersRating[existingPlayerIndex].score = playerScore;
                             await saveRating();
                           updateRatingDisplay();
                        }
                     } else {
                           playersRating.push({ name: playerName, score: playerScore });
                         await saveRating();
                        updateRatingDisplay();
                     }
               }
            } catch(error){
                console.error("Ошибка при обновлении очков игрока", error);
            }
       }

    // Menu logic
  if(menuToggle){
         menuToggle.addEventListener('click', () => {
            try {
                if(menuItems)menuItems.classList.toggle('active');
           } catch(error){
                console.error("Ошибка при открытии меню", error);
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
                       console.error("Ошибка при переключении вкладок", error);
                 }
           });
     }
});
