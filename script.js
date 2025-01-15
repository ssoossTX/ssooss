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

class SaveManager {
    constructor(isTWA, gameConfig) {
        this.isTWA = isTWA;
        this.gameConfig = gameConfig;
    }

    async save(key, data) {
        const saveData = { ...data, version: this.gameConfig.saveVersion };
        const saveFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.setItem : localStorage.setItem;
        return new Promise((resolve, reject) => {
            saveFunction(key, JSON.stringify(saveData), (err) => err ? reject(err) : resolve());
        });
    }

    async load(key) {
        const loadFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.getItem : localStorage.getItem;
        return new Promise((resolve, reject) => {
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
                        resolve(await this.migrateData(parsedData));
                    } else {
                        resolve(null);
                    }
                } catch (parseError) {
                   resolve(null);
                }
            });
        });
    }

   async migrateData(data) {
        if (!data || !data.version) {
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
       return migratedData.version === this.gameConfig.saveVersion ? migratedData : data;
    }

    async remove(key) {
        const removeFunction = this.isTWA ? window.Telegram.WebApp.CloudStorage.removeItem : localStorage.removeItem;
        return new Promise((resolve, reject) => {
            removeFunction(key, (err) => err ? reject(err) : resolve());
        });
    }

    async backup(key, data) {
       await this.save(key, data).catch(() => {});
    }

    async clearBackup(key) {
       await this.remove(key).catch(() => {});
    }
}

class AchievementManager {
    constructor(display) {
        this.achievements = [];
        this.achievementCount = 0;
        this.display = display;
    }

    addAchievement(achievement) {
        if (this.achievements.includes(achievement)) return false;
        this.achievements.push(achievement);
        this.achievementCount++;
        if (this.display) this.display.textContent = `Достижения: ${this.achievementCount}`;
        return true;
    }

    checkAchievements(clickCount, prestigeLevel, autoClickerValue) {
        let newAchievementAdded = false;
        if (clickCount >= 100000) newAchievementAdded = this.addAchievement('100000 clicks') || newAchievementAdded;
        if (clickCount >= 1000000) newAchievementAdded = this.addAchievement('1000000 clicks') || newAchievementAdded;
        if (prestigeLevel >= 1) newAchievementAdded = this.addAchievement('first prestige') || newAchievementAdded;
        if (autoClickerValue >= 5) newAchievementAdded = this.addAchievement('5 autoClicker') || newAchievementAdded;
        return newAchievementAdded;
    }

    loadAchievements(achievements, count) {
        this.achievements = achievements;
        this.achievementCount = count;
        if (this.display) this.display.textContent = `Достижения: ${this.achievementCount}`;
    }
}

class MessageManager {
    constructor(display) {
        this.display = display;
    }

    displayMessage(msg, color = 'green') {
        if (!this.display) return;
        this.display.textContent = msg;
        this.display.style.color = color;
        setTimeout(() => {
            if (this.display) this.display.textContent = '';
        }, 3000);
    }
}

class UIManager {
    constructor(clickCountDisplay, clickUpgradeCostDisplay, autoUpgradeCostDisplay,
                clickUpgradeLevelDisplay, clickUpgradeLevelCostDisplay, prestigeLevelDisplay) {
        this.clickCountDisplay = clickCountDisplay;
        this.clickUpgradeCostDisplay = clickUpgradeCostDisplay;
        this.autoUpgradeCostDisplay = autoUpgradeCostDisplay;
        this.clickUpgradeLevelDisplay = clickUpgradeLevelDisplay;
        this.clickUpgradeLevelCostDisplay = clickUpgradeLevelCostDisplay;
        this.prestigeLevelDisplay = prestigeLevelDisplay;
    }

    updateDisplay(clickCount, clickUpgradeCost, autoUpgradeCost, clickUpgradeLevel, clickUpgradeLevelCost, prestigeLevel) {
        if (this.clickCountDisplay) this.clickCountDisplay.textContent = Math.round(clickCount);
        if (this.clickUpgradeCostDisplay) this.clickUpgradeCostDisplay.textContent = clickUpgradeCost;
        if (this.autoUpgradeCostDisplay) this.autoUpgradeCostDisplay.textContent = autoUpgradeCost;
        if (this.clickUpgradeLevelDisplay) this.clickUpgradeLevelDisplay.textContent = clickUpgradeLevel;
        if (this.clickUpgradeLevelCostDisplay) this.clickUpgradeLevelCostDisplay.textContent = clickUpgradeLevelCost;
        if (this.prestigeLevelDisplay) this.prestigeLevelDisplay.textContent = prestigeLevel;
    }
}

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
        this.gameLoaded = false;
        this.saveManager = new SaveManager(!!window.Telegram?.WebApp, this.gameConfig);
        this.achievementManager = null;
        this.messageManager = null;
        this.uiManager = null;

        this.clickButton = document.getElementById('click-button');
        this.upgradeClickButton = document.querySelector('#upgrade-click button');
        this.upgradeAutoButton = document.querySelector('#upgrade-auto button');
        this.upgradeClickLevelButton = document.querySelector('#upgrade-click-level button');
        this.resetButton = document.getElementById('reset-button');
        this.prestigeButton = document.getElementById('prestige-button');
        this.gameContent = document.getElementById('game-content');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.menuItems = document.querySelector('.menu-items');
    }

    async init() {
        if (this.saveManager.isTWA) {
            window.Telegram.WebApp.onEvent('web_app_ready', async () => {
                if (window.Telegram.WebApp.ready) return;
                window.Telegram.WebApp.ready = true;
                await this.initializeGame();
            });
        } else {
            await this.initializeGame();
        }
    }

    async initializeGame() {
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
        await this.loadGame();
        this.startRandomEvent();
        this.gameLoaded = true;
    }

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

    displayMessage(msg, color = 'green') {
        this.messageManager.displayMessage(msg, color);
    }

    autoClick() {
        this.clickCount += (this.autoClickerValue * this.clickUpgradeLevel) * this.prestigeMultiplier;
        this.updateDisplay();
        if (this.gameLoaded) this.saveGame();
    }

    startRandomEvent() {
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
       clearTimeout(this.randomEventTimeout);
        this.randomEventTimeout = setTimeout(() => this.startRandomEvent(), Math.random() * (this.gameConfig.eventIntervalMax - this.gameConfig.eventIntervalMin) + this.gameConfig.eventIntervalMin);
    }

    checkAchievements() {
        if (this.achievementManager.checkAchievements(this.clickCount, this.prestigeLevel, this.autoClickerValue)) {
            if (this.gameLoaded) this.saveGame();
        }
    }

    async resetGame() {
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
        this.updateDisplay();
        if (document.getElementById('achievements')) document.getElementById('achievements').textContent = `Достижения: ${this.achievementManager.achievementCount}`;
        await this.saveManager.remove('clickerData');
        this.displayMessage('Прогресс сброшен!', 'orange');
        if (this.gameLoaded) await this.saveGame();
    }

    async saveGame() {
        if (!this.gameLoaded) return;
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
            bonusActive: this.bonusActive
        };
        await this.saveManager.backup(this.gameConfig.backupKey, data);
        await this.saveManager.save('clickerData', data);
    }

    async loadGame() {
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
        } else {
            await this.resetGame();
        }
    }

    setupEventListeners() {
        setInterval(() => {
            if (this.gameLoaded) this.saveGame();
        }, this.gameConfig.saveInterval);

        this.clickButton?.addEventListener('click', () => {
            let clicksToAdd = (this.clickValue * this.clickUpgradeLevel) * this.prestigeMultiplier;
            if (this.bonusActive) clicksToAdd *= 2;
            this.clickCount += clicksToAdd;
            this.updateDisplay();
            this.checkAchievements();
            if (this.gameLoaded) this.saveGame();
        });

        this.upgradeClickLevelButton?.addEventListener('click', () => {
            if (this.clickCount >= this.clickUpgradeLevelCost) {
                this.clickCount -= this.clickUpgradeLevelCost;
                this.clickUpgradeLevel++;
                this.clickUpgradeLevelCost = Math.round(this.clickUpgradeLevelCost * this.gameConfig.clickLevelUpgradeCostMultiplier);
                this.updateDisplay();
                this.displayMessage('Уровень улучшения клика повышен!');
                if (this.gameLoaded) this.saveGame();
            } else {
                this.displayMessage('Недостаточно кликов!', 'red');
            }
        });

        this.upgradeClickButton?.addEventListener('click', () => {
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
        });

        this.upgradeAutoButton?.addEventListener('click', () => {
            if (this.clickCount >= this.autoUpgradeCost) {
                this.clickCount -= this.autoUpgradeCost;
                this.autoClickerValue++;
                if (!this.autoClickerInterval) {
                    this.autoClickerInterval = setInterval(() => this.autoClick(), 1000);
                }
                this.autoUpgradeCost = Math.round(this.autoUpgradeCost * this.gameConfig.autoUpgradeCostMultiplier);
                this.updateDisplay();
                this.displayMessage('Автокликер приобретен!');
                if (this.gameLoaded) this.saveGame();
            } else {
                this.displayMessage('Недостаточно кликов!', 'red');
            }
        });

        this.prestigeButton?.addEventListener('click', async () => {
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
                if (this.gameLoaded) await this.saveGame();
            } else {
                this.displayMessage(`Недостаточно кликов! (нужно ${this.gameConfig.prestigeClicksNeeded})`, 'red');
            }
        });

        this.resetButton?.addEventListener('click', async () => {
           await this.resetGame();
        });

        this.menuToggle?.addEventListener('click', () => {
            this.menuItems?.classList.toggle('active');
        });

        this.menuItems?.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const tab = e.target.dataset.tab;
                 if(this.gameContent) this.gameContent.style.display = tab === 'game' ? 'block' : 'none';
                 if(this.menuItems) this.menuItems.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const game = new ClickerGame(gameConfig);
    await game.init();
    game.setupEventListeners();
});
