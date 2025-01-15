class ClickerGame {
    constructor() {
        this.clickCount = 0;
        this.clickValue = 1;
        this.autoClickerInterval = null;
        this.autoClickerValue = 0;
        this.clickUpgradeCost = 10;
        this.autoUpgradeCost = 50;
        this.clickUpgradeLevel = 1;
        this.clickUpgradeLevelCost = 100;
        this.prestigeLevel = 0;
        this.prestigeMultiplier = 1;
        this.bonusActive = false;
        this.bonusTimeout = null;
        this.achievementCount = 0;
        this.randomEventTimeout = null;
        this.achievements = [];
        this.playerName = null;
        this.gameLoaded = false;

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
        this.playersRating = [];

        this.menuToggle = document.querySelector('.menu-toggle');
        this.menuItems = document.querySelector('.menu-items');

        this.tWebApp = window.Telegram && window.Telegram.WebApp;
        this.isTWA = !!this.tWebApp;
        this.tWebAppReady = false;
    }

    async init() {
        if (this.isTWA) {
            this.tWebApp.onEvent('web_app_ready', async () => {
                if (this.tWebAppReady) return;
                this.tWebAppReady = true;
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
        try{
            await this.loadGame();
            this.startRandomEvent();
            this.checkAchievements();
            await this.loadRating();
            await this.loadPlayerName();
           if(!this.playerName) await this.updatePlayerScore();
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
           if(this.gameLoaded) this.saveData();
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
               if(this.gameLoaded) this.saveData();
               clearTimeout(this.bonusTimeout);
                this.bonusTimeout = setTimeout(() => {
                    this.bonusActive = false;
                    this.clickValue /= 2;
                    this.autoClickerValue /= 2;
                    this.displayMessage('Действие бонуса закончилось!');
                    this.updateDisplay();
                   if(this.gameLoaded) this.saveData();
                }, 10000);
            } else {
                this.displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
                this.clickValue /= 2;
                this.updateDisplay();
               if(this.gameLoaded) this.saveData();
                setTimeout(() => {
                    this.clickValue *= 2;
                    this.displayMessage('Штраф закончился!');
                    this.updateDisplay();
                     if(this.gameLoaded) this.saveData();
                }, 10000);
            }
            this.randomEventTimeout = setTimeout(() => this.startRandomEvent(), Math.random() * (120000 - 60000) + 60000);
        } catch (error) {
            console.error("Ошибка при запуске случайного события", error);
        }
    }

    checkAchievements() {
        try {
            if (this.clickCount >= 100000 && !this.achievements.includes('100000 clicks')) {
                this.addAchievement('100000 clicks');
            }
            if (this.clickCount >= 1000000 && !this.achievements.includes('1000000 clicks')) {
                this.addAchievement('1000000 clicks');
            }
            if (this.prestigeLevel >= 1 && !this.achievements.includes('first prestige')) {
                this.addAchievement('first prestige');
            }
            if (this.autoClickerValue >= 5 && !this.achievements.includes('5 autoClicker')) {
                this.addAchievement('5 autoClicker');
            }
        } catch (error) {
            console.error("Ошибка при проверки достижений", error);
        }
    }
    addAchievement(achievement) {
        try {
            this.achievements.push(achievement);
            this.achievementCount++;
            if (this.achievementsDisplay) this.achievementsDisplay.textContent = `Достижения: ${this.achievementCount}`;
           if(this.gameLoaded) this.saveData();
        } catch (error) {
            console.error("Ошибка при добавлении достижения", error)
        }
    }
  async saveRating() {
        try {
            const saveFunction = this.isTWA ? this.tWebApp.CloudStorage.setItem : localStorage.setItem;
            await new Promise((resolve, reject) => {
                saveFunction('playersRating', JSON.stringify(this.playersRating), (err) => {
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
   async loadRating() {
       return new Promise((resolve, reject) => {
            try {
                const loadFunction = this.isTWA ? this.tWebApp.CloudStorage.getItem : localStorage.getItem;
                loadFunction('playersRating', (err, value) => {
                    if (err) {
                        console.error("Ошибка при загрузке рейтинга:", err);
                        reject(err);
                        return;
                    }
                    try {
                        this.playersRating = value ? JSON.parse(value) : [];
                    } catch (parseError) {
                        console.error("Ошибка при парсинге рейтинга:", parseError);
                        this.playersRating = [];
                    }
                    this.updateRatingDisplay();
                    resolve();
                });
            } catch (error) {
                console.error("Ошибка при загрузке рейтинга:", error);
                reject(error);
            }
        });
    }
  async savePlayerName() {
       try {
            const saveFunction = this.isTWA ? this.tWebApp.CloudStorage.setItem : localStorage.setItem;
           await new Promise((resolve, reject) => {
               saveFunction('playerName', JSON.stringify(this.playerName), (err) => {
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
    loadPlayerName() {
        return new Promise((resolve, reject) => {
            try {
                const loadFunction = this.isTWA ? this.tWebApp.CloudStorage.getItem : localStorage.getItem;
                loadFunction('playerName', (err, value) => {
                    if (err) {
                        console.error("Ошибка при загрузке имени игрока:", err);
                        reject(err);
                        return;
                    }
                    try {
                        this.playerName = value ? JSON.parse(value) : null;
                    } catch (parseError) {
                        console.error("Ошибка при парсинге имени игрока:", parseError);
                        this.playerName = null;
                    }
                    resolve();
                });
            } catch (error) {
                console.error("Ошибка при загрузке имени игрока:", error);
                reject(error);
            }
        });
    }

    updateRatingDisplay() {
        try {
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
        } catch (error) {
            console.error("Ошибка при обновлении рейтинга", error);
        }
    }
   async resetGame() {
        try {
            this.clickCount = 0;
            this.clickValue = 1;
            this.autoClickerValue = 0;
            this.clickUpgradeCost = 10;
            this.autoUpgradeCost = 50;
            this.clickUpgradeLevel = 1;
            this.clickUpgradeLevelCost = 100;
            this.prestigeLevel = 0;
            this.prestigeMultiplier = 1;
            this.bonusActive = false;
            this.achievements = [];
            this.achievementCount = 0;
            this.playerName = null;

            clearInterval(this.autoClickerInterval);
            this.autoClickerInterval = null;
            clearTimeout(this.bonusTimeout);
            clearTimeout(this.randomEventTimeout);
              this.randomEventTimeout = setTimeout(() => this.startRandomEvent(), Math.random() * (120000 - 60000) + 60000);
             this.updateDisplay();
            if (this.achievementsDisplay) this.achievementsDisplay.textContent = `Достижения: ${this.achievementCount}`;
              if (this.isTWA) {
                await this.tWebApp.CloudStorage.removeItem('clickerData');
                await this.tWebApp.CloudStorage.removeItem('playerName');
            } else {
                localStorage.removeItem('clickerData');
                localStorage.removeItem('playerName');
            }
            this.displayMessage('Прогресс сброшен!', 'orange');
           if(this.gameLoaded) await this.saveData();
            await this.saveRating();
           await this.savePlayerName();
        } catch (error) {
            console.error("Ошибка при сбросе прогресса", error);
        }
    }

 async saveData() {
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
                achievements: this.achievements,
                achievementCount: this.achievementCount,
                playerName: this.playerName,
                bonusActive: this.bonusActive
            };

           const saveFunction = this.isTWA ? this.tWebApp.CloudStorage.setItem : localStorage.setItem;

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
     loadGame() {
        return new Promise(async (resolve, reject) => {
            try {
                const loadFunction = this.isTWA ? this.tWebApp.CloudStorage.getItem : localStorage.getItem;
                loadFunction('clickerData', async (err, value) => {
                   if (err) {
                       console.error("Ошибка при загрузке данных:", err);
                        reject(err);
                       return;
                   }
                   if (value) {
                        try {
                           const savedData = JSON.parse(value);
                            this.clickCount = savedData.clickCount || 0;
                            this.clickValue = savedData.clickValue || 1;
                            this.autoClickerValue = savedData.autoClickerValue || 0;
                            this.clickUpgradeCost = savedData.clickUpgradeCost || 10;
                             this.autoUpgradeCost = savedData.autoUpgradeCost || 50;
                            this.clickUpgradeLevel = savedData.clickUpgradeLevel || 1;
                             this.clickUpgradeLevelCost = savedData.clickUpgradeLevelCost || 100;
                            this.prestigeLevel = savedData.prestigeLevel || 0;
                            this.prestigeMultiplier = savedData.prestigeMultiplier || 1;
                            this.achievements = savedData.achievements || [];
                            this.achievementCount = savedData.achievementCount || 0;
                            this.playerName = savedData.playerName;
                            this.bonusActive = savedData.bonusActive || false;
                           if (this.achievementsDisplay) this.achievementsDisplay.textContent = `Достижения: ${this.achievementCount}`;
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
                                   }, 10000);
                              }
                            this.updateDisplay();
                            resolve();
                         } catch (error) {
                            console.error("Ошибка при парсинге данных:", error);
                            this.resetGame();
                            reject(error);
                       }
                    }
                    resolve();
                });
            }
             catch (error) {
                console.error("Ошибка при загрузке игры", error);
                 reject(error);
            }
        });
    }
    setupEventListeners() {
       setInterval(() => {
            if (this.gameLoaded) this.saveData();
        }, 5000);

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
                   if(this.gameLoaded) this.saveData();
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
                        this.clickUpgradeLevelCost = Math.round(this.clickUpgradeLevelCost * 2.5);
                       this.updateDisplay();
                        this.displayMessage('Уровень улучшения клика повышен!');
                       if(this.gameLoaded) this.saveData();
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
                       this.clickUpgradeCost = Math.round(this.clickUpgradeCost * 1.8);
                       this.updateDisplay();
                        this.displayMessage('Улучшение клика приобретено!');
                       if(this.gameLoaded) this.saveData();
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
                        this.autoUpgradeCost = Math.round(this.autoUpgradeCost * 2.2);
                       this.updateDisplay();
                        this.displayMessage('Автокликер приобретен!');
                      if(this.gameLoaded) this.saveData();
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
                    if (this.clickCount >= 10000) {
                         this.prestigeLevel++;
                        this.prestigeMultiplier *= 2;
                         this.clickCount = 0;
                        this.clickValue = 1;
                        this.autoClickerValue = 0;
                       this.clickUpgradeCost = 10;
                         this.autoUpgradeCost = 50;
                         this.clickUpgradeLevel = 1;
                         this.clickUpgradeLevelCost = 100;
                        clearInterval(this.autoClickerInterval);
                        this.autoClickerInterval = null;
                       this.updateDisplay();
                         this.displayMessage('Перерождение!');
                        if(this.gameLoaded) await this.saveData();
                        this.updatePlayerScore();
                    } else {
                        this.displayMessage('Недостаточно кликов! (нужно 10000)', 'red');
                    }
                } catch (error) {
                    console.error("Ошибка при перерождении", error);
                }
            });
        }
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => {
                try {
                    this.resetGame();
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
                            this.updateRatingDisplay();
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
     async updatePlayerScore() {
        try {
            if (!this.playerName) {
                this.playerName = prompt('Введите ваше имя:', 'Игрок');
                if (this.playerName) await this.savePlayerName();
            }
            if (this.playerName) {
                const playerScore = this.clickCount + (this.prestigeLevel * 10000);
                const existingPlayerIndex = this.playersRating.findIndex(player => player.name === this.playerName);
                if (existingPlayerIndex > -1) {
                     if(this.playersRating[existingPlayerIndex].score !== playerScore){
                          this.playersRating[existingPlayerIndex].score = playerScore;
                           await this.saveRating();
                            this.updateRatingDisplay();
                     }
                } else {
                    this.playersRating.push({name: this.playerName, score: playerScore});
                  await this.saveRating();
                    this.updateRatingDisplay();
                }
            }
        } catch (error) {
            console.error("Ошибка при обновлении очков игрока", error);
        }
    }
}
document.addEventListener('DOMContentLoaded', async function () {
    const game = new ClickerGame();
    await game.init();
    game.setupEventListeners();
});
