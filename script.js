// Настройки игры
const gameConfig = {
    saveInterval: 5000,
    bonusDuration: 10000,
    eventIntervalMin: 60000,
    eventIntervalMax: 120000,
    prestigeClicksNeeded: 10000,
    clickUpgradeCostMultiplier: 1.8,
    autoUpgradeCostMultiplier: 2.2,
    clickLevelUpgradeCostMultiplier: 2.5,
    initialClickUpgradeCost: 10,
    initialAutoUpgradeCost: 50,
    initialClickLevelUpgradeCost: 100
};

// Класс для управления сохранениями
class SaveManager {
    constructor(isTWA) {
        this.isTWA = isTWA;
    }

    async save(key, data) {
        try {
            const saveFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.setItem : localStorage.setItem;
            await new Promise((resolve, reject) => {
                saveFunction(key, JSON.stringify(data), (err) => {
                    if (err) {
                        console.error(`Ошибка при сохранении ${key}:`, err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        } catch (error) {
            console.error(`Ошибка при сохранении ${key}:`, error);
            throw error;
        }
    }

    async load(key) {
        return new Promise((resolve, reject) => {
            try {
                const loadFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.getItem : localStorage.getItem;
                loadFunction(key, (err, value) => {
                    if (err) {
                        console.error(`Ошибка при загрузке ${key}:`, err);
                        reject(err);
                        return;
                    }
                    try {
                        const data = value ? JSON.parse(value) : null;
                        resolve(data);
                    } catch (parseError) {
                        console.error(`Ошибка при парсинге ${key}:`, parseError);
                        resolve(null)
                    }
                });
            } catch (error) {
                console.error(`Ошибка при загрузке ${key}:`, error);
                reject(error);
            }
        });
    }
    async remove(key) {
           try {
                const removeFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.removeItem : localStorage.removeItem;
                await new Promise((resolve, reject) => {
                     removeFunction(key, (err) => {
                         if (err) {
                             console.error(`Ошибка при удалении ${key}:`, err);
                             reject(err);
                            } else {
                             resolve();
                         }
                     });
                });
            } catch (error) {
                console.error(`Ошибка при удалении ${key}:`, error);
               throw error;
            }
       }
}

// Класс для управления достижениями
class AchievementManager {
    constructor(display) {
        this.achievements = [];
        this.achievementCount = 0;
        this.display = display;
    }

    addAchievement(achievement) {
        if (!this.achievements.includes(achievement)) {
            this.achievements.push(achievement);
            this.achievementCount++;
             if (this.display) this.display.textContent = `Достижения: ${this.achievementCount}`;
            return true;
        }
       return false;
    }

    checkAchievements(clickCount, prestigeLevel, autoClickerValue) {
        let newAchievementAdded = false;
        if (clickCount >= 100000 && !this.achievements.includes('100000 clicks')) {
             newAchievementAdded = this.addAchievement('100000 clicks') || newAchievementAdded;
        }
         if (clickCount >= 1000000 && !this.achievements.includes('1000000 clicks')) {
              newAchievementAdded =  this.addAchievement('1000000 clicks')|| newAchievementAdded;
        }
        if (prestigeLevel >= 1 && !this.achievements.includes('first prestige')) {
            newAchievementAdded = this.addAchievement('first prestige')|| newAchievementAdded;
        }
        if (autoClickerValue >= 5 && !this.achievements.includes('5 autoClicker')) {
           newAchievementAdded =  this.addAchievement('5 autoClicker')|| newAchievementAdded;
        }
        return newAchievementAdded;
    }
     loadAchievements(achievements, count) {
         this.achievements = achievements;
         this.achievementCount = count;
          if (this.display) this.display.textContent = `Достижения: ${this.achievementCount}`;
    }
}


// Класс для управления рейтингом
class RatingManager {
      constructor(saveManager, ratingList) {
        this.playersRating = [];
        this.saveManager = saveManager;
        this.ratingList = ratingList;
    }
   async saveRating() {
        await this.saveManager.save('playersRating', this.playersRating);
    }
   async loadRating() {
        this.playersRating = await this.saveManager.load('playersRating') || [];
        this.updateDisplay();
    }
   async savePlayerName(playerName) {
        await this.saveManager.save('playerName', playerName);
    }
    async loadPlayerName() {
         return  await this.saveManager.load('playerName');
    }

    updateDisplay() {
        if (this.ratingList) {
            this.ratingList.innerHTML = '';
            this.playersRating.sort((a, b) => b.score - a.score);
            this.playersRating.forEach((player, index) => {
                const listItem = document.createElement('li');
                if (player.name) {
                    listItem.textContent = `${index + 1}. Игрок: ${player.name}, Очки: ${player.score}`;
                   this.ratingList.appendChild(listItem);
                }
            });
        }
    }

   updatePlayerScore(playerName, clickCount, prestigeLevel) {
        if (!playerName) return;
        const playerScore = clickCount + (prestigeLevel * 10000);
         const existingPlayerIndex = this.playersRating.findIndex(player => player.name === playerName);
            if (existingPlayerIndex > -1) {
                if(this.playersRating[existingPlayerIndex].score !== playerScore){
                      this.playersRating[existingPlayerIndex].score = playerScore;
                       this.saveRating();
                        this.updateDisplay();
                }
           } else {
               this.playersRating.push({name: playerName, score: playerScore});
                 this.saveRating();
                this.updateDisplay();
            }
    }
}
// Основной класс игры
class ClickerGame {
     constructor(gameConfig) {
          this.gameConfig = gameConfig;
        this.clickCount = 0;
        this.clickValue = 1;
        this.autoClickerInterval = null;
        this.autoClickerValue = 0;
        this.clickUpgradeCost = this.gameConfig.initialClickUpgradeCost;
        this.autoUpgradeCost = this.gameConfig.initialAutoUpgradeCost;
        this.clickUpgradeLevel = 1;
        this.clickUpgradeLevelCost = this.gameConfig.initialClickLevelUpgradeCost;
        this.prestigeLevel = 0;
        this.prestigeMultiplier = 1;
        this.bonusActive = false;
        this.bonusTimeout = null;
        this.playerName = null;
        this.gameLoaded = false;
        this.saveManager = new SaveManager(!!window.Telegram?.WebApp);
        this.achievementManager = null;
         this.ratingManager = null;
        this.clickCountDisplay = document.getElementById('click-count');
        this.clickButton = document.getElementById('click-button');
        this.upgradeClickButton = document.querySelector('#upgrade-click button');
        this.upgradeAutoButton = document.querySelector('#upgrade-auto button');
        this.upgradeClickLevelButton = document.querySelector('#upgrade-click-level button');
        this.clickUpgradeCostDisplay = document.getElementById('click-upgrade-cost');
        this.autoUpgradeCostDisplay = document.getElementById('auto-upgrade-cost');
        this.clickUpgradeLevelDisplay = document.getElementById('click-upgrade-level-display');
        this.clickUpgradeLevelCostDisplay = document.getElementById('click-upgrade-level-cost');
        this.messageDisplay = document.getElementById('message');
        this.prestigeButton = document.getElementById('prestige-button');
        this.prestigeLevelDisplay = document.getElementById('prestige-level');
        this.achievementsDisplay = document.getElementById('achievements');
         this.resetButton = document.getElementById('reset-button');
          this.ratingContent = document.getElementById('rating-content');
        this.gameContent = document.getElementById('game-content');
        this.ratingList = document.getElementById('rating-list');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.menuItems = document.querySelector('.menu-items');
    }
      async init() {
        if (this.saveManager.isTWA) {
            window.Telegram.WebApp.onEvent('web_app_ready', async () => {
                if (window.Telegram.WebApp.ready) return;
                window.Telegram.WebApp.ready = true;
                 try {
                    await this.initializeGame();
                } catch (error) {
                    console.error('Ошибка инициализации TWA:', error);
                }
            });
        } else {
            try {
                await this.initializeGame();
            } catch (error) {
                console.error('Ошибка загрузки игры в браузере:', error);
            }
        }
    }

   async initializeGame() {
        try {
            this.achievementManager = new AchievementManager(this.achievementsDisplay);
             this.ratingManager = new RatingManager(this.saveManager, this.ratingList);
             await this.loadGame();
              await this.ratingManager.loadRating();
             this.playerName = await this.ratingManager.loadPlayerName();
            if(!this.playerName) this.updatePlayerScore();
             this.startRandomEvent();
             this.gameLoaded = true;
        } catch (error) {
             console.error('Ошибка инициализации игры:', error);
        }
    }
    updateDisplay() {
        try {
            if (this.clickCountDisplay) this.clickCountDisplay.textContent = Math.round(this.clickCount);
            if (this.clickUpgradeCostDisplay) this.clickUpgradeCostDisplay.textContent = this.clickUpgradeCost;
            if (this.autoUpgradeCostDisplay) this.autoUpgradeCostDisplay.textContent = this.autoUpgradeCost;
            if (this.clickUpgradeLevelDisplay) this.clickUpgradeLevelDisplay.textContent = this.clickUpgradeLevel;
            if (this.clickUpgradeLevelCostDisplay) this.clickUpgradeLevelCostDisplay.textContent = this.clickUpgradeLevelCost;
            if (this.prestigeLevelDisplay) this.prestigeLevelDisplay.textContent = this.prestigeLevel;
        } catch (error) {
            console.error("Ошибка при обновлении дисплея", error);
        }
    }
    displayMessage(msg, color = 'green') {
         try {
            if (this.messageDisplay) {
                this.messageDisplay.textContent = msg;
                this.messageDisplay.style.color = color;
                setTimeout(() => {
                    this.messageDisplay.textContent = '';
                }, 3000);
            }
        } catch (error) {
            console.error("Ошибка при отображении сообщения", error);
        }
    }

   autoClick() {
        try {
            this.clickCount += (this.autoClickerValue * this.clickUpgradeLevel) * this.prestigeMultiplier;
            this.updateDisplay();
          if(this.gameLoaded)  this.saveGame();
        } catch (error) {
            console.error("Ошибка в автоклике", error);
        }
    }

  startRandomEvent() {
       try {
            const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';
            if (eventType === 'bonus') {
                this.bonusActive = true;
                this.clickValue *= 2;
                this.autoClickerValue *= 2;
                this.displayMessage('Случайный бонус: удвоенный урон!', 'blue');
                this.updateDisplay();
                if(this.gameLoaded) this.saveGame();
                clearTimeout(this.bonusTimeout);
                 this.bonusTimeout = setTimeout(() => {
                    this.bonusActive = false;
                    this.clickValue /= 2;
                     this.autoClickerValue /= 2;
                    this.displayMessage('Действие бонуса закончилось!');
                    this.updateDisplay();
                    if(this.gameLoaded) this.saveGame();
                }, this.gameConfig.bonusDuration);
            } else {
                this.displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
                this.clickValue /= 2;
                this.updateDisplay();
                 if(this.gameLoaded) this.saveGame();
                 setTimeout(() => {
                    this.clickValue *= 2;
                    this.displayMessage('Штраф закончился!');
                    this.updateDisplay();
                      if(this.gameLoaded) this.saveGame();
                }, this.gameConfig.bonusDuration);
            }
            this.randomEventTimeout = setTimeout(() => this.startRandomEvent(), Math.random() * (this.gameConfig.eventIntervalMax - this.gameConfig.eventIntervalMin) + this.gameConfig.eventIntervalMin);
        } catch (error) {
             console.error("Ошибка при запуске случайного события", error);
        }
    }

   checkAchievements() {
       try {
        if(this.achievementManager.checkAchievements(this.clickCount, this.prestigeLevel, this.autoClickerValue)) {
            if(this.gameLoaded) this.saveGame();
        }
       } catch (error) {
             console.error("Ошибка при проверки достижений", error);
        }
    }
     async resetGame() {
           try {
               this.clickCount = 0;
               this.clickValue = 1;
              this.autoClickerValue = 0;
               this.clickUpgradeCost = this.gameConfig.initialClickUpgradeCost;
               this.autoUpgradeCost = this.gameConfig.initialAutoUpgradeCost;
               this.clickUpgradeLevel = 1;
               this.clickUpgradeLevelCost = this.gameConfig.initialClickLevelUpgradeCost;
               this.prestigeLevel = 0;
               this.prestigeMultiplier = 1;
               this.bonusActive = false;
                clearInterval(this.autoClickerInterval);
               this.autoClickerInterval = null;
               clearTimeout(this.bonusTimeout);
                clearTimeout(this.randomEventTimeout);
                 this.randomEventTimeout = setTimeout(() => this.startRandomEvent(), Math.random() * (this.gameConfig.eventIntervalMax - this.gameConfig.eventIntervalMin) + this.gameConfig.eventIntervalMin);
               this.achievementManager.achievements = [];
                this.achievementManager.achievementCount = 0;
                 this.playerName = null;
              this.updateDisplay();
            if (this.achievementsDisplay) this.achievementsDisplay.textContent = `Достижения: ${this.achievementManager.achievementCount}`;
               await this.saveManager.remove('clickerData');
                await this.saveManager.remove('playerName');
                 this.displayMessage('Прогресс сброшен!', 'orange');
           if(this.gameLoaded) await this.saveGame();
                await this.ratingManager.saveRating();
               await this.ratingManager.savePlayerName(this.playerName);
           } catch (error) {
                 console.error("Ошибка при сбросе прогресса", error);
            }
    }
    async saveGame() {
         if (!this.gameLoaded) {
            return;
        }
        try {
             const data = {
                clickCount: this.clickCount,
                clickValue: this.clickValue,
                autoClickerValue: this.autoClickerValue,
                clickUpgradeCost: this.clickUpgradeCost,
                autoUpgradeCost: this.autoUpgradeCost,
                clickUpgradeLevel: this.clickUpgradeLevel,
                 clickUpgradeLevelCost: this.clickUpgradeLevelCost,
                prestigeLevel: this.prestigeLevel,
               prestigeMultiplier: this.prestigeMultiplier,
                achievements: this.achievementManager.achievements,
                 achievementCount: this.achievementManager.achievementCount,
                playerName: this.playerName,
                bonusActive: this.bonusActive
            };
          await this.saveManager.save('clickerData', data);
          } catch (error) {
                console.error("Ошибка при сохранении данных игры:", error);
            }
    }
  async  loadGame() {
          try {
              const savedData = await this.saveManager.load('clickerData');
              if (savedData) {
                    this.clickCount = savedData.clickCount || 0;
                   this.clickValue = savedData.clickValue || 1;
                     this.autoClickerValue = savedData.autoClickerValue || 0;
                   this.clickUpgradeCost = savedData.clickUpgradeCost || this.gameConfig.initialClickUpgradeCost;
                  this.autoUpgradeCost = savedData.autoUpgradeCost || this.gameConfig.initialAutoUpgradeCost;
                    this.clickUpgradeLevel = savedData.clickUpgradeLevel || 1;
                    this.clickUpgradeLevelCost = savedData.clickUpgradeLevelCost || this.gameConfig.initialClickLevelUpgradeCost;
                    this.prestigeLevel = savedData.prestigeLevel || 0;
                    this.prestigeMultiplier = savedData.prestigeMultiplier || 1;
                     this.playerName = savedData.playerName;
                      this.bonusActive = savedData.bonusActive || false;
                     this.achievementManager.loadAchievements(savedData.achievements || [], savedData.achievementCount || 0);
                     if (this.autoClickerValue > 0) {
                        this.autoClickerInterval = setInterval(() => this.autoClick(), 1000);
                    }
                      if (this.bonusActive) {
                        this.bonusActive = true;
                        this.clickValue *= 2;
                        this.autoClickerValue *= 2;
                        this.bonusTimeout = setTimeout(() => {
                            this.bonusActive = false;
                            this.clickValue /= 2;
                            this.autoClickerValue /= 2;
                        }, this.gameConfig.bonusDuration);
                    }
                   this.updateDisplay();
                }
            } catch (error) {
                  console.error("Ошибка при загрузке игры", error);
                 await this.resetGame();
            }
    }
     setupEventListeners() {
          setInterval(() => {
               if (this.gameLoaded) this.saveGame();
           }, this.gameConfig.saveInterval);
        if (this.clickButton) {
            this.clickButton.addEventListener('click', () => {
                try {
                    let clicksToAdd = (this.clickValue * this.clickUpgradeLevel) * this.prestigeMultiplier;
                    if (this.bonusActive) {
                        clicksToAdd *= 2
                    }
                    this.clickCount += clicksToAdd;
                    this.updateDisplay();
                    this.checkAchievements();
                   if(this.gameLoaded) this.saveGame();
                   this.updatePlayerScore();
                } catch (error) {
                   console.error("Ошибка при клике на кнопку", error);
                }
            });
        }
        if (this.upgradeClickLevelButton) {
            this.upgradeClickLevelButton.addEventListener('click', () => {
                try {
                    if (this.clickCount >= this.clickUpgradeLevelCost) {
                        this.clickCount -= this.clickUpgradeLevelCost;
                        this.clickUpgradeLevel++;
                        this.clickUpgradeLevelCost = Math.round(this.clickUpgradeLevelCost * this.gameConfig.clickLevelUpgradeCostMultiplier);
                        this.updateDisplay();
                        this.displayMessage('Уровень улучшения клика повышен!');
                        if(this.gameLoaded) this.saveGame();
                   } else {
                        this.displayMessage('Недостаточно кликов!', 'red');
                   }
                } catch (error) {
                    console.error("Ошибка при улучшении уровня клика", error);
                }
            });
        }
        if (this.upgradeClickButton) {
            this.upgradeClickButton.addEventListener('click', () => {
                 try {
                    if (this.clickCount >= this.clickUpgradeCost) {
                         this.clickCount -= this.clickUpgradeCost;
                         this.clickValue++;
                         this.clickUpgradeCost = Math.round(this.clickUpgradeCost * this.gameConfig.clickUpgradeCostMultiplier);
                         this.updateDisplay();
                         this.displayMessage('Улучшение клика приобретено!');
                       if(this.gameLoaded) this.saveGame();
                    } else {
                         this.displayMessage('Недостаточно кликов!', 'red');
                    }
                 } catch (error) {
                    console.error("Ошибка при улучшении клика", error);
                }
            });
        }
       if (this.upgradeAutoButton) {
           this.upgradeAutoButton.addEventListener('click', () => {
               try {
                    if (this.clickCount >= this.autoUpgradeCost) {
                       this.clickCount -= this.autoUpgradeCost;
                         this.autoClickerValue++;
                        if (!this.autoClickerInterval) {
                           this.autoClickerInterval = setInterval(() => this.autoClick(), 1000);
                        }
                        this.autoUpgradeCost = Math.round(this.autoUpgradeCost * this.gameConfig.autoUpgradeCostMultiplier);
                        this.updateDisplay();
                        this.displayMessage('Автокликер приобретен!');
                        if(this.gameLoaded) this.saveGame();
                    } else {
                       this.displayMessage('Недостаточно кликов!', 'red');
                   }
                } catch (error) {
                     console.error("Ошибка при покупке автокликера", error);
                }
            });
        }
        if (this.prestigeButton) {
           this.prestigeButton.addEventListener('click', async () => {
              try {
                   if (this.clickCount >= this.gameConfig.prestigeClicksNeeded) {                    
                       this.prestigeLevel++;
                       this.prestigeMultiplier *= 2;
                       this.clickCount = 0;
                       this.clickValue = 1;
                       this.autoClickerValue = 0;
                       this.clickUpgradeCost = this.gameConfig.initialClickUpgradeCost;
                       this.autoUpgradeCost = this.gameConfig.initialAutoUpgradeCost;
                       this.clickUpgradeLevel = 1;
                       this.clickUpgradeLevelCost = this.gameConfig.initialClickLevelUpgradeCost;
                       clearInterval(this.autoClickerInterval);
                       this.autoClickerInterval = null;
                       this.updateDisplay();
                       this.displayMessage('Перерождение!');
                       if(this.gameLoaded) await this.saveGame();
                       this.updatePlayerScore();
                   } else {
                        this.displayMessage(`Недостаточно кликов! (нужно ${this.gameConfig.prestigeClicksNeeded})`, 'red');
                    }
               } catch (error) {
                    console.error("Ошибка при перерождении", error);
                }
            });
        }
         if (this.resetButton) {
            this.resetButton.addEventListener('click', async () => {
                 try {
                     await this.resetGame();
                } catch (error) {
                    console.error("Ошибка при сбросе прогресса", error);
               }
           });
       }
         if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                try {
                   if (this.menuItems) this.menuItems.classList.toggle('active');
                 } catch (error) {
                    console.error("Ошибка при открытии меню", error);
                }
            });
         }
        if (this.menuItems) {
            this.menuItems.addEventListener('click', (e) => {
                try {
                    if (e.target.tagName === 'BUTTON') {
                        const tab = e.target.dataset.tab;
                       if (tab === 'rating') {
                            if (this.gameContent) this.gameContent.style.display = 'none';
                           if (this.ratingContent) this.ratingContent.style.display = 'block';
                            this.ratingManager.updateDisplay();
                        } else {
                             if (this.gameContent) this.gameContent.style.display = 'block';
                            if (this.ratingContent) this.ratingContent.style.display = 'none';
                        }
                        if (this.menuItems) this.menuItems.classList.remove('active');
                    }
               } catch (error) {
                   console.error("Ошибка при переключении вкладок", error);
                }
            });
        }
    }
  updatePlayerScore() {
       try {
            if (!this.playerName) {
                this.playerName = prompt('Введите ваше имя:', 'Игрок');
                 if(this.playerName) this.ratingManager.savePlayerName(this.playerName);
            }
            this.ratingManager.updatePlayerScore(this.playerName, this.clickCount, this.prestigeLevel);
        } catch (error) {
            console.error("Ошибка при обновлении очков игрока", error);
        }
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const game = new ClickerGame(gameConfig);
    await game.init();
    game.setupEventListeners();
});
