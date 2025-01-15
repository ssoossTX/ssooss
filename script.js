document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM полностью загружен");

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

     if(tWebApp){
        isTWA = true;
          tWebApp.onEvent('web_app_ready', function() {
                console.log('Telegram Web App готов.');
                 loadGame()
                     .then(startRandomEvent)
                     .then(checkAchievements)
                     .then(loadRating)
                     .then(loadPlayerName)
                    .then(() => {
                            if(!playerName) updatePlayerScore();
                      })
                  .catch(error => console.error('Ошибка инициализации TWA:', error));
         });
    } else {
        console.log('Запуск в браузере');
          loadGame()
              .then(startRandomEvent)
             .then(checkAchievements)
             .then(loadRating)
            .then(loadPlayerName)
              .then(()=>{
                  if(!playerName) updatePlayerScore();
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
              saveData();
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
             saveData();
       }catch(error){
           console.error("Ошибка при добавлении достижения", error)
       }
   }
    function saveRating() {
          return new Promise((resolve, reject) => {
           try{
                 const saveFunction = isTWA ? tWebApp.CloudStorage.setItem : localStorage.setItem;
                saveFunction('playersRating', JSON.stringify(playersRating), (err) =>{
                   if(err){
                     console.log("Ошибка сохранения рейтинга", err);
                    reject(err)
                    } else {
                         resolve();
                    }
              });
           } catch(error){
               console.error("Ошибка при сохранении рейтинга", error);
              reject(error);
           }
         })
    }
     function loadRating() {
       return new Promise((resolve, reject) =>{
          try{
              const loadFunction = isTWA ? tWebApp.CloudStorage.getItem : localStorage.getItem;
               loadFunction('playersRating',(err, value) =>{
                  if(err){
                     console.error("Ошибка при загрузке рейтинга:", err);
                    reject(err)
                   return;
                   }
                  playersRating = value ? JSON.parse(value) : [];
                     updateRatingDisplay();
                     resolve();
            });
         } catch(error){
             console.error("Ошибка при загрузке рейтинга", error);
            reject(error);
        }
    })
}
    function savePlayerName() {
       return new Promise((resolve, reject) =>{
             try{
                const saveFunction = isTWA ? tWebApp.CloudStorage.setItem : localStorage.setItem;
                 saveFunction('playerName',JSON.stringify(playerName), (err) =>{
                    if(err){
                      console.log("Ошибка при сохранении имени игрока", err)
                       reject(err)
                   }
                    else{
                       resolve();
                    }
                });
            } catch(error){
                console.error("Ошибка при сохранении имени игрока", error);
             reject(error);
            }
        })
    }
  function loadPlayerName() {
       return new Promise((resolve, reject) => {
        try{
           const loadFunction = isTWA ? tWebApp.CloudStorage.getItem : localStorage.getItem;
          loadFunction('playerName', (err, value) =>{
              if(err){
                  console.error("Ошибка при загрузке имени игрока:", err)
                  reject(err);
                    return;
               }
              playerName = value ? JSON.parse(value) : null;
                resolve();
           });
      } catch(error){
         console.error("Ошибка при загрузке имени игрока", error);
        reject(error)
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
               console.error("Ошибка при сбросе прогресса", error);
        }
    }
    function saveData() {
        return new Promise((resolve, reject) =>{
            try{
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
                    const saveFunction = isTWA ? tWebApp.CloudStorage.setItem : localStorage.setItem;
                   saveFunction('clickerData', JSON.stringify(data), (err) =>{
                       if(err){
                          console.error("Ошибка при сохранении игры", err);
                            reject(err);
                       } else {
                           resolve();
                        }
                    });
            } catch(error){
                 console.error("Ошибка при сохранении данных игры", error);
                  reject(error);
            }
        })
   }

  function loadGame() {
        return new Promise((resolve, reject) => {
           try{
                const loadFunction = isTWA ? tWebApp.CloudStorage.getItem : localStorage.getItem;
                 loadFunction('clickerData', (err, value) =>{
                       if (err) {
                         console.error("Ошибка при загрузке данных:", err);
                        reject(err);
                     return;
                 }
                   if (value) {
                        try{
                              let savedData = JSON.parse(value);
                              console.log('Загруженные данные:', savedData);
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
                            if(achievementsDisplay)achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
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
                             resolve();
                       } catch(parseError){
                             console.error("Ошибка при парсинге данных:", parseError);
                            resetGame();
                              reject(parseError);
                          }
                     } else {
                          console.log("Нет данных игры. Начинаем новую игру");
                         resolve();
                       }
                   });
             } catch(error){
               console.error("Ошибка при загрузке игры", error);
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
                console.log("Прибавляем кликов:", clicksToAdd);
              clickCount += clicksToAdd;
              updateDisplay();
              checkAchievements();
               saveData();
              updatePlayerScore(); // Сохраняем данные игрока
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
                    saveData();
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
                       saveData();
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
                      saveData();
                   } else {
                      displayMessage('Недостаточно кликов!', 'red');
                  }
                } catch(error){
                  console.error("Ошибка при покупке автокликера", error);
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
                   updatePlayerScore(); // Сохраняем данные игрока
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
                console.error("Ошибка при обновлении очков игрока", error)
            }
       }

    // Menu logic
  if(menuToggle){
         menuToggle.addEventListener('click', () => {
            try {
                if(menuItems)menuItems.classList.toggle('active');
           } catch(error){
                  console.error("Ошибка при открытии меню", error)
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
