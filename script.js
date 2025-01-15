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
    let playerName = null; // Имя игрока

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
     let userId = null; // ID пользователя

    if (tWebApp) {
            tWebApp.onEvent('web_app_ready', function() {
                 userId = tWebApp.initDataUnsafe?.user?.id;
                    if (userId){
                        loadGameFromBot(userId);
                    }
                    else {
                    loadGame();
                    }
                startRandomEvent();
                checkAchievements();
                loadRatingFromBot(); //Рейтинг в боте тоже будет
                loadPlayerNameFromBot();
                setupEventListeners();
            });
        } else {
        loadGame();
        startRandomEvent();
        checkAchievements();
        loadRating();
        loadPlayerName();
        setupEventListeners();
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
        saveDataToBot();
    }

    function startRandomEvent() {
        const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';

        if (eventType === 'bonus') {
            bonusActive = true;
            clickValue *= 2;
            autoClickerValue *= 2;
            displayMessage('Случайный бонус: удвоенный урон!', 'blue');
            updateDisplay();
           saveDataToBot();

            clearTimeout(bonusTimeout);
            bonusTimeout = setTimeout(() => {
                bonusActive = false;
                clickValue /= 2;
                autoClickerValue /= 2;
                displayMessage('Действие бонуса закончилось!');
                updateDisplay();
                saveDataToBot();
            }, 10000);
        } else {
            displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
            clickValue /= 2;
            updateDisplay();
           saveDataToBot();
            setTimeout(() => {
                clickValue *= 2;
                displayMessage('Штраф закончился!');
                updateDisplay();
                saveDataToBot();
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
        saveDataToBot();
    }
      function saveRatingToBot() {
            if(!userId) return; // Не сохраняем если нет id пользователя
            fetch(`https://api.telegram.org/bot${tWebApp.initDataUnsafe?.bot?.token}/setMyCommands`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        commands: [{
                             command: "saveRating",
                              description: JSON.stringify({
                                userId: userId,
                                  playersRating: playersRating
                                })
                            }]
                    })
             });

        }
         function loadRatingFromBot() {
            if(!userId) return; // Не загружаем если нет id пользователя
            fetch(`https://api.telegram.org/bot${tWebApp.initDataUnsafe?.bot?.token}/getChat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({chat_id: userId})
             })
             .then(response => response.json())
             .then(data => {
                if (data?.result?.pinned_message?.text) {
                     try{
                          const command = data.result.pinned_message.text
                         const rating =  JSON.parse(command.replace('/saveRating ', ''))
                       playersRating = rating.playersRating;
                      updateRatingDisplay();
                    }
                    catch (error){
                          console.error("Ошибка разбора рейтинга из сообщения:", error);
                    }
                  }
             })
                .catch(error => console.error("Ошибка загрузки рейтинга:", error))
        }

    function updateRatingDisplay() {
        ratingList.innerHTML = '';
        playersRating.sort((a, b) => b.score - a.score);
        playersRating.forEach((player, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. Игрок: ${player.name}, Очки: ${player.score}`;
            ratingList.appendChild(listItem);
        });
    }

        function savePlayerNameToBot() {
           if(!userId) return; // Не сохраняем если нет id пользователя
              fetch(`https://api.telegram.org/bot${tWebApp.initDataUnsafe?.bot?.token}/setMyCommands`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commands: [{
                     command: "savePlayerName",
                      description: JSON.stringify({
                        userId: userId,
                          playerName: playerName
                        })
                    }]
                  })
            });

        }
    function loadPlayerNameFromBot() {
          if(!userId) return; // Не загружаем если нет id пользователя
          fetch(`https://api.telegram.org/bot${tWebApp.initDataUnsafe?.bot?.token}/getChat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({chat_id: userId})
             })
            .then(response => response.json())
            .then(data =>{
                if(data?.result?.pinned_message?.text){
                    try {
                         const command = data.result.pinned_message.text
                        const name = JSON.parse(command.replace('/savePlayerName ', ''));
                        playerName = name.playerName;

                    }
                    catch (error){
                         console.error("Ошибка разбора имени игрока из сообщения:", error)
                    }
                }
              })
                .catch(error => console.error("Ошибка загрузки имени игрока:", error))
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
        playerName = null;


        clearInterval(autoClickerInterval);
        autoClickerInterval = null;
        clearTimeout(bonusTimeout);
        clearTimeout(randomEventTimeout);
        randomEventTimeout = setTimeout(startRandomEvent, Math.random() * (120000 - 60000) + 60000);

        updateDisplay();
        achievementsDisplay.textContent = `Достижения: ${achievementCount}`;

        displayMessage('Прогресс сброшен!', 'orange');
        saveDataToBot();
        saveRatingToBot();
        savePlayerNameToBot();

    }

      function saveDataToBot() {
            if(!userId) return; // Не сохраняем если нет id пользователя
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

            fetch(`https://api.telegram.org/bot${tWebApp.initDataUnsafe?.bot?.token}/setMyCommands`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                     body: JSON.stringify({
                        commands: [{
                             command: "saveGameData",
                              description: JSON.stringify({
                                userId: userId,
                                  data: data
                                })
                            }]
                    })
            });
    }
    function loadGameFromBot() {
            if(!userId) return; // Не загружаем если нет id пользователя
             fetch(`https://api.telegram.org/bot${tWebApp.initDataUnsafe?.bot?.token}/getChat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({chat_id: userId})
             })
             .then(response => response.json())
             .then(data => {
               if (data?.result?.pinned_message?.text) {
                  try{
                      const command = data.result.pinned_message.text
                     const savedData = JSON.parse(command.replace('/saveGameData ', ''));
                        clickCount = savedData.data.clickCount || 0;
                        clickValue = savedData.data.clickValue || 1;
                        autoClickerValue = savedData.data.autoClickerValue || 0;
                        clickUpgradeCost = savedData.data.clickUpgradeCost || 10;
                        autoUpgradeCost = savedData.data.autoUpgradeCost || 50;
                        clickUpgradeLevel = savedData.data.clickUpgradeLevel || 1;
                        clickUpgradeLevelCost = savedData.data.clickUpgradeLevelCost || 100;
                        prestigeLevel = savedData.data.prestigeLevel || 0;
                        prestigeMultiplier = savedData.data.prestigeMultiplier || 1;
                        achievements = savedData.data.achievements || [];
                        achievementCount = savedData.data.achievementCount || 0;
                        achievementsDisplay.textContent = `Достижения: ${achievementCount}`;
                            if (autoClickerValue > 0) {
                                autoClickerInterval = setInterval(autoClick, 1000);
                            }
                             if (savedData.data.bonusActive) {
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
                   catch(error){
                       console.error("Ошибка разбора данных из сообщения:", error);
                   }
                }
           })
                .catch(error => console.error("Ошибка загрузки данных:", error))
    }
    function loadGame() {
        // Логика для загрузки игры из localStorage (или если нет Telegram Web App)
          let savedData = localStorage.getItem('clickerData')
              if(savedData){
                 savedData = JSON.parse(savedData);
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


     function handleSave() {
        if (tWebApp){
            saveDataToBot();
           } else {
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
             localStorage.setItem('clickerData', JSON.stringify(data));
        }
    }
        function setupEventListeners() {
          window.addEventListener('click', handleSave);
        window.addEventListener('keydown', handleSave);
        clickButton.addEventListener('click', handleClick);
        clickButton.addEventListener('mouseup', handleClick);
        clickButton.addEventListener('touchstart', handleClick);

         upgradeClickLevelButton.addEventListener('click', handleUpgradeClickLevel);
        upgradeClickLevelButton.addEventListener('mouseup', handleUpgradeClickLevel);
        upgradeClickLevelButton.addEventListener('touchstart', handleUpgradeClickLevel);

        upgradeClickButton.addEventListener('click', handleUpgradeClick);
        upgradeClickButton.addEventListener('mouseup', handleUpgradeClick);
         upgradeClickButton.addEventListener('touchstart', handleUpgradeClick);

        upgradeAutoButton.addEventListener('click', handleUpgradeAuto);
        upgradeAutoButton.addEventListener('mouseup', handleUpgradeAuto);
        upgradeAutoButton.addEventListener('touchstart', handleUpgradeAuto);

         prestigeButton.addEventListener('click', handlePrestige);
        prestigeButton.addEventListener('mouseup', handlePrestige);
         prestigeButton.addEventListener('touchstart', handlePrestige);

        resetButton.addEventListener('click', handleReset);
        resetButton.addEventListener('mouseup', handleReset);
        resetButton.addEventListener('touchstart', handleReset);
        // Menu logic
         menuToggle.addEventListener('click', () => {
             menuItems.classList.toggle('active');
         });

         // Логика для перехода между вкладками
         menuItems.addEventListener('click', (e) => {
             if (e.target.tagName === 'BUTTON') {
                 const tab = e.target.dataset.tab;
                 if (tab === 'rating') {
                     gameContent.style.display = 'none';
                     ratingContent.style.display = 'block';
                     updateRatingDisplay();
                 } else {
                     gameContent.style.display = 'block';
                     ratingContent.style.display = 'none';
                 }
                 menuItems.classList.remove('active');
             }
         });
    }

      function handleClick(e) {
        clickCount += (clickValue * clickUpgradeLevel) * prestigeMultiplier;
        updateDisplay();
        checkAchievements();
       saveDataToBot();
        updatePlayerScore();
    }
    function handleUpgradeClickLevel(e) {
       if (clickCount >= clickUpgradeLevelCost) {
            clickCount -= clickUpgradeLevelCost;
            clickUpgradeLevel++;
            clickUpgradeLevelCost = Math.round(clickUpgradeLevelCost * 2.5);
            updateDisplay();
            displayMessage('Уровень улучшения клика повышен!');
            saveDataToBot();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    }
     function handleUpgradeClick(e) {
        if (clickCount >= clickUpgradeCost) {
            clickCount -= clickUpgradeCost;
            clickValue++;
            clickUpgradeCost = Math.round(clickUpgradeCost * 1.8);
            updateDisplay();
            displayMessage('Улучшение клика приобретено!');
            saveDataToBot();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    }

     function handleUpgradeAuto(e) {
           if (clickCount >= autoUpgradeCost) {
                clickCount -= autoUpgradeCost;
                autoClickerValue++;
                if (!autoClickerInterval) {
                    autoClickerInterval = setInterval(autoClick, 1000);
                }
                autoUpgradeCost = Math.round(autoUpgradeCost * 2.2);
                updateDisplay();
                displayMessage('Автокликер приобретен!');
               saveDataToBot();
            } else {
                displayMessage('Недостаточно кликов!', 'red');
            }
        }

     function handlePrestige(e) {
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
           saveDataToBot();
            updatePlayerScore();
        } else {
            displayMessage('Недостаточно кликов! (нужно 10000)', 'red');
        }
        }
    function handleReset(e) {
         resetGame();
    }
    function updatePlayerScore() {
        if (!playerName) {
            playerName = prompt('Введите ваше имя:', 'Игрок');
             savePlayerNameToBot()
        }
        if (playerName) {
            const playerScore = clickCount + (prestigeLevel * 10000);
            // Проверяем есть ли игрок
            const existingPlayerIndex = playersRating.findIndex(player => player.name === playerName);
            if (existingPlayerIndex > -1) {
                playersRating[existingPlayerIndex].score = playerScore;
            } else {
                playersRating.push({ name: playerName, score: playerScore });
            }
           saveRatingToBot();
            updateRatingDisplay();
        }
    }
});
