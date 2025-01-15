
/**
 * @typedef {Object} GameConfig
 * @property {number} saveInterval - Интервал сохранения в миллисекундах.
 * @property {number} bonusDuration - Продолжительность бонуса в миллисекундах.
 * @property {number} eventIntervalMin - Минимальный интервал случайного события в миллисекундах.
 * @property {number} eventIntervalMax - Максимальный интервал случайного события в миллисекундах.
 * @property {number} prestigeClicksNeeded - Необходимое количество кликов для престижа.
 * @property {number} clickUpgradeCostMultiplier - Множитель стоимости улучшения клика.
 * @property {number} autoUpgradeCostMultiplier - Множитель стоимости улучшения автокликера.
 * @property {number} clickLevelUpgradeCostMultiplier - Множитель стоимости улучшения уровня клика.
 * @property {number} initialClickUpgradeCost - Начальная стоимость улучшения клика.
 * @property {number} initialAutoUpgradeCost - Начальная стоимость улучшения автокликера.
 * @property {number} initialClickLevelUpgradeCost - Начальная стоимость улучшения уровня клика.
 * @property {number} saveVersion - Версия сохранения.
 * @property {string} backupKey - Ключ для резервных копий.
 */

/** @type {GameConfig} */
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
    initialClickLevelUpgradeCost: 100,
    saveVersion: 2,
    backupKey: 'clickerBackup'
};

/**
 * Класс для управления сохранениями
 */
class SaveManager {
    /**
      * @param {boolean} isTWA
      * @param {GameConfig} gameConfig
      */
    constructor(isTWA, gameConfig) {
        this.isTWA = isTWA;
        this.gameConfig = gameConfig;
    }
    /**
     * @param {string} key
     * @param {any} data
     * @returns {Promise<void>}
     */
    async save(key, data) {
        try {
            const saveData = {
                ...data,
                version: this.gameConfig.saveVersion
            };
            const saveFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.setItem : localStorage.setItem;
            await new Promise((resolve, reject) => {
                saveFunction(key, JSON.stringify(saveData), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }
    /**
     * @param {string} key
     * @returns {Promise<any | null>}
     */
    async load(key) {
        return new Promise((resolve, reject) => {
            try {
                 const loadFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.getItem : localStorage.getItem;
                  loadFunction(key, async (err, value) => {
                     if (err) {
                        reject(err);
                        return;
                    }
                   try {
                        if (value) {
                             const parsedData = JSON.parse(value);
                             if (!parsedData || typeof parsedData !== 'object') {
                                 resolve(null);
                                 return;
                           }
                               resolve(await this.migrateData(parsedData))
                         } else {
                               resolve(null);
                            }
                     } catch (parseError) {
                          resolve(null);
                     }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
      /**
     * @param {any} data
     * @returns {Promise<any>}
     */
    async migrateData(data) {
        if (!data.version) {
                return data;
        }
           if(data.version === this.gameConfig.saveVersion) {
               return data;
           }
             let migratedData = data;
            if(data.version < 1) {
               migratedData =  { ...migratedData, version: 1 }
           }
            if(data.version < 2) {
                  migratedData =  { ...migratedData, version: 2 }
            }
          if (migratedData.version === this.gameConfig.saveVersion) {
                return migratedData;
            }
        return data;
    }
   /**
    * @param {string} key
    * @returns {Promise<void>}
     */
    async remove(key) {
         try {
               const removeFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.removeItem : localStorage.removeItem;
                await new Promise((resolve, reject) => {
                    removeFunction(key, (err) => {
                        if (err) {
                            reject(err);
                         } else {
                            resolve();
                         }
                    });
                });
            } catch (error) {
               throw error;
            }
       }
       /**
     * @param {string} key
     * @param {any} data
      * @returns {Promise<void>}
     */
    async backup(key, data) {
        try {
            await this.save(key, data)
        } catch (e) {
        }
    }
   async clearBackup(key) {
        try {
            await this.remove(key);
         } catch (e) {
       }
   }
}

/**
 * Класс для управления достижениями
 */
class AchievementManager {
    /**
      * @param {HTMLElement | null} display
      */
    constructor(display) {
        /** @type {string[]} */
        this.achievements = [];
        /** @type {number} */
        this.achievementCount = 0;
        /** @type {HTMLElement | null} */
        this.display = display;
    }
     /**
     * @param {string} achievement
     * @returns {boolean}
     */
    addAchievement(achievement) {
        if (!this.achievements.includes(achievement)) {
            this.achievements.push(achievement);
            this.achievementCount++;
            if (this.display) this.display.textContent = `Достижения: ${this.achievementCount}`;
            return true;
        }
        return false;
    }
    /**
     * @param {number} clickCount
     * @param {number} prestigeLevel
     * @param {number} autoClickerValue
     * @returns {boolean}
     */
    checkAchievements(clickCount, prestigeLevel, autoClickerValue) {
          let newAchievementAdded = false;
        if (clickCount >= 100000 && !this.achievements.includes('100000 clicks')) {
            newAchievementAdded = this.addAchievement('100000 clicks') || newAchievementAdded;
        }
        if (clickCount >= 1000000 && !this.achievements.includes('1000000 clicks')) {
             newAchievementAdded = this.addAchievement('1000000 clicks') || newAchievementAdded;
         }
        if (prestigeLevel >= 1 && !this.achievements.includes('first prestige')) {
             newAchievementAdded = this.addAchievement('first prestige')|| newAchievementAdded;
        }
         if (autoClickerValue >= 5 && !this.achievements.includes('5 autoClicker')) {
           newAchievementAdded = this.addAchievement('5 autoClicker')|| newAchievementAdded;
         }
        return newAchievementAdded;
    }
     /**
     * @param {string[]} achievements
     * @param {number} count
     * @returns {void}
     */
    loadAchievements(achievements, count) {
        this.achievements = achievements;
        this.achievementCount = count;
         if (this.display) this.display.textContent = `Достижения: ${this.achievementCount}`;
    }
}

/**
 * Класс для управления рейтингом
 */
class RatingManager {
     /**
      * @param {SaveManager} saveManager
      * @param {HTMLElement | null} ratingList
      */
    constructor(saveManager, ratingList) {
        /** @type {Array<{name: string, score: number}>} */
        this.playersRating = [];
         /** @type {SaveManager} */
        this.saveManager = saveManager;
        /** @type {HTMLElement | null} */
        this.ratingList = ratingList;
    }
    /**
    * @returns {Promise<void>}
     */
    async saveRating() {
        await this.saveManager.save('playersRating', this.playersRating);
    }
    /**
    * @returns {Promise<void>}
     */
    async loadRating() {
        this.playersRating = await this.saveManager.load('playersRating') || [];
        this.updateDisplay();
    }
    /**
     * @param {string} playerName
     * @returns {Promise<void>}
     */
    async savePlayerName(playerName) {
        await this.saveManager.save('playerName', playerName);
    }
     /**
     * @returns {Promise<string | null>}
     */
    async loadPlayerName() {
        return await this.saveManager.load('playerName');
    }
     /**
     * @returns {void}
     */
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
     /**
     * @param {string} playerName
     * @param {number} clickCount
     * @param {number} prestigeLevel
     * @returns {void}
     */
    updatePlayerScore(playerName, clickCount, prestigeLevel) {
        if (!playerName) return;
        const playerScore = clickCount + (prestigeLevel * 10000);
         const existingPlayerIndex = this.playersRating.findIndex(player => player.name === playerName);
        if (existingPlayerIndex > -1) {
             if (this.playersRating[existingPlayerIndex].score !== playerScore) {
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

/**
 * Класс для управления отображением сообщений
 */
class MessageManager {
       /**
         * @param {HTMLElement | null} display
         */
    constructor(display) {
        /** @type {HTMLElement | null} */
        this.display = display;
    }
     /**
      * @param {string} msg
      * @param {string} [color='green']
      */
    displayMessage(msg, color = 'green') {
        try {
            if (this.display) {
                this.display.textContent = msg;
                this.display.style.color = color;
                setTimeout(() => {
                    if (this.display) this.display.textContent = '';
                }, 3000);
            }
        } catch (error) {
        }
    }
}
/**
 * Класс для управления UI
 */
class UIManager {
      /**
       * @param {HTMLElement | null} clickCountDisplay
       * @param {HTMLElement | null} clickUpgradeCostDisplay
       * @param {HTMLElement | null} autoUpgradeCostDisplay
       * @param {HTMLElement | null} clickUpgradeLevelDisplay
       * @param {HTMLElement | null} clickUpgradeLevelCostDisplay
       * @param {HTMLElement | null} prestigeLevelDisplay
       */
    constructor(clickCountDisplay, clickUpgradeCostDisplay, autoUpgradeCostDisplay,
                clickUpgradeLevelDisplay, clickUpgradeLevelCostDisplay, prestigeLevelDisplay) {
        /** @type {HTMLElement | null} */
         this.clickCountDisplay = clickCountDisplay;
        /** @type {HTMLElement | null} */
        this.clickUpgradeCostDisplay = clickUpgradeCostDisplay;
         /** @type {HTMLElement | null} */
        this.autoUpgradeCostDisplay = autoUpgradeCostDisplay;
        /** @type {HTMLElement | null} */
         this.clickUpgradeLevelDisplay = clickUpgradeLevelDisplay;
       /** @type {HTMLElement | null} */
         this.clickUpgradeLevelCostDisplay = clickUpgradeLevelCostDisplay;
       /** @type {HTMLElement | null} */
        this.prestigeLevelDisplay = prestigeLevelDisplay;
    }
     /**
     * @param {number} clickCount
     * @param {number} clickUpgradeCost
     * @param {number} autoUpgradeCost
     * @param {number} clickUpgradeLevel
     * @param {number} clickUpgradeLevelCost
     * @param {number} prestigeLevel
     */
    updateDisplay(clickCount, clickUpgradeCost, autoUpgradeCost, clickUpgradeLevel, clickUpgradeLevelCost, prestigeLevel) {
         try {
            if (this.clickCountDisplay) this.clickCountDisplay.textContent = Math.round(clickCount);
           if (this.clickUpgradeCostDisplay) this.clickUpgradeCostDisplay.textContent = clickUpgradeCost;
           if (this.autoUpgradeCostDisplay) this.autoUpgradeCostDisplay.textContent = autoUpgradeCost;
           if (this.clickUpgradeLevelDisplay) this.clickUpgradeLevelDisplay.textContent = clickUpgradeLevel;
           if (this.clickUpgradeLevelCostDisplay) this.clickUpgradeLevelCostDisplay.textContent = clickUpgradeLevelCost;
            if (this.prestigeLevelDisplay) this.prestigeLevelDisplay.textContent = prestigeLevel;
         } catch (error) {
         }
    }
}
/**
 * Основной класс игры
 */
class ClickerGame {
    /**
      * @param {GameConfig} gameConfig
      */
    constructor(gameConfig) {
        /** @type {GameConfig} */
        this.gameConfig = gameConfig;
        /** @type {number} */
        this.clickCount = 0;
        /** @type {number} */
        this.clickValue = 1;
        /** @type {number | null} */
        this.autoClickerInterval = null;
        /** @type {number} */
        this.autoClickerValue = 0;
        /** @type {number} */
        this.clickUpgradeCost = this.gameConfig.initialClickUpgradeCost;
         /** @type {number} */
        this.autoUpgradeCost = this.gameConfig.initialAutoUpgradeCost;
        /** @type {number} */
        this.clickUpgradeLevel = 1;
        /** @type {number} */
        this.clickUpgradeLevelCost = this.gameConfig.initialClickLevelUpgradeCost;
         /** @type {number} */
        this.prestigeLevel = 0;
        /** @type {number} */
        this.prestigeMultiplier = 1;
         /** @type {boolean} */
        this.bonusActive = false;
         /** @type {number | null} */
        this.bonusTimeout = null;
        /** @type {string | null} */
        this.playerName = null;
         /** @type {boolean} */
        this.gameLoaded = false;
        /** @type {SaveManager} */
        this.saveManager = new SaveManager(!!window.Telegram?.WebApp, this.gameConfig);
         /** @type {AchievementManager} */
        this.achievementManager = null;
         /** @type {RatingManager} */
        this.ratingManager = null;
         /** @type {MessageManager} */
         this.messageManager = null;
          /** @type {UIManager} */
          this.uiManager = null;

         /** @type {HTMLElement | null} */
        this.clickButton = document.getElementById('click-button');
         /** @type {HTMLElement | null} */
        this.upgradeClickButton = document.querySelector('#upgrade-click button');
         /** @type {HTMLElement | null} */
        this.upgradeAutoButton = document.querySelector('#upgrade-auto button');
         /** @type {HTMLElement | null} */
        this.upgradeClickLevelButton = document.querySelector('#upgrade-click-level button');
        /** @type {HTMLElement | null} */
        this.resetButton = document.getElementById('reset-button');
         /** @type {HTMLElement | null} */
        this.prestigeButton = document.getElementById('prestige-button');
         /** @type {HTMLElement | null} */
         this.ratingContent = document.getElementById('rating-content');
         /** @type {HTMLElement | null} */
        this.gameContent = document.getElementById('game-content');
        /** @type {HTMLElement | null} */
        this.ratingList = document.getElementById('rating-list');
        /** @type {HTMLElement | null} */
        this.menuToggle = document.querySelector('.menu-toggle');
         /** @type {HTMLElement | null} */
        this.menuItems = document.querySelector('.menu-items');

    }
      /**
      * @returns {Promise<void>}
      */
    async init() {
         if (this.saveManager.isTWA) {
            window.Telegram.WebApp.onEvent('web_app_ready', async () => {
                if (window.Telegram.WebApp.ready) return;
                window.Telegram.WebApp.ready = true;
                 try {
                    await this.initializeGame();
                } catch (error) {
                }
            });
        } else {
             try {
                await this.initializeGame();
            } catch (error) {
            }
        }
    }
   /**
     * @returns {Promise<void>}
     */
    async initializeGame() {
         try {
             this.uiManager = new UIManager(
                 document.getElementById('click-count'),
                document.getElementById('click-upgrade-cost'),
                document.getElementById('auto-upgrade-cost'),
                 document.getElementById('click-upgrade-level-display'),
                document.getElementById('click-upgrade-level-cost'),
                 document.getElementById('prestige-level')
            );
              this.messageManager = new MessageManager(document.getElementById('message'));
              this.achievementManager = new AchievementManager(document.getElementById('achievements'));
             this.ratingManager = new RatingManager(this.saveManager, this.ratingList);
            await this.loadGame();
            await this.ratingManager.loadRating();
           this.playerName = await this.ratingManager.loadPlayerName();
          if (!this.playerName) this.updatePlayerScore();
              this.startRandomEvent();
             this.gameLoaded = true;
        } catch (error) {
        }
    }
  /**
   * @returns {void}
   */
    updateDisplay() {
         this.uiManager.updateDisplay(
            this.clickCount,
             this.clickUpgradeCost,
             this.autoUpgradeCost,
             this.clickUpgradeLevel,
            this.clickUpgradeLevelCost,
            this.prestigeLevel
        );
    }
  /**
    * @param {string} msg
    * @param {string} [color='green']
    * @returns {void}
   */
   displayMessage(msg, color = 'green') {
          this.messageManager.displayMessage(msg, color);
   }
  /**
    * @returns {void}
   */
    autoClick() {
         try {
           this.clickCount += (this.autoClickerValue * this.clickUpgradeLevel) * this.prestigeMultiplier;
             this.updateDisplay();
              if (this.gameLoaded) this.saveGame();
        } catch (error) {
       }
    }
  /**
    * @returns {void}
    */
   startRandomEvent() {
       try {
             const eventType = Math.random() < 0.5 ? 'bonus' : 'penalty';
             if (eventType === 'bonus') {
                 this.bonusActive = true;
                this.clickValue *= 2;
                 this.autoClickerValue *= 2;
                this.displayMessage('Случайный бонус: удвоенный урон!', 'blue');
                 this.updateDisplay();
               if (this.gameLoaded) this.saveGame();
               clearTimeout(this.bonusTimeout);
                 this.bonusTimeout = setTimeout(() => {
                    this.bonusActive = false;
                     this.clickValue /= 2;
                   this.autoClickerValue /= 2;
                    this.displayMessage('Действие бонуса закончилось!');
                     this.updateDisplay();
                   if (this.gameLoaded) this.saveGame();
               }, this.gameConfig.bonusDuration);
            } else {
                this.displayMessage('Случайный штраф: клики уменьшены в 2 раза!', 'red');
               this.clickValue /= 2;
                this.updateDisplay();
              if (this.gameLoaded) this.saveGame();
                 setTimeout(() => {
                    this.clickValue *= 2;
                    this.displayMessage('Штраф закончился!');
                    this.updateDisplay();
                      if (this.gameLoaded) this.saveGame();
                }, this.gameConfig.bonusDuration);
            }
            this.randomEventTimeout = setTimeout(() => this.startRandomEvent(), Math.random() * (this.gameConfig.eventIntervalMax - this.gameConfig.eventIntervalMin) + this.gameConfig.eventIntervalMin);
       } catch (error) {
       }
   }
  /**
   * @returns {void}
   */
   checkAchievements() {
       try {
           if (this.achievementManager.checkAchievements(this.clickCount, this.prestigeLevel, this.autoClickerValue)) {
                if (this.gameLoaded) this.saveGame();
           }
       } catch (error) {
       }
    }
    /**
     * @returns {Promise<void>}
     */
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
               if (document.getElementById('achievements')) document.getElementById('achievements').textContent = `Достижения: ${this.achievementManager.achievementCount}`;
               await this.saveManager.remove('clickerData');
                await this.saveManager.remove('playerName');
                this.displayMessage('Прогресс сброшен!', 'orange');
             if (this.gameLoaded) await this.saveGame();
                 await this.ratingManager.saveRating();
              await this.ratingManager.savePlayerName(this.playerName);
        } catch (error) {
        }
    }
     /**
     * @returns {Promise<void>}
     */
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
             await this.saveManager.backup(this.gameConfig.backupKey, data);
           await this.saveManager.save('clickerData', data);
        } catch (error) {
        }
   }
  /**
   * @returns {Promise<void>}
   */
    async loadGame() {
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
              await this.resetGame();
        }
    }
  /**
   * @returns {void}
   */
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
                    if (this.gameLoaded) this.saveGame();
                   this.updatePlayerScore();
               } catch (error) {
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
                        if (this.gameLoaded) this.saveGame();
                  } else {
                         this.displayMessage('Недостаточно кликов!', 'red');
                   }
               } catch (error) {
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
                }
            });
        }
         if (this.resetButton) {
            this.resetButton.addEventListener('click', async () => {
                 try {
                     await this.resetGame();
                } catch (error) {
               }
           });
       }
         if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                try {
                   if (this.menuItems) this.menuItems.classList.toggle('active');
                 } catch (error) {
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
        }
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const game = new ClickerGame(gameConfig);
    await game.init();
    game.setupEventListeners();
});
