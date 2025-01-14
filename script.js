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

    function updateDisplay() {
        clickCountDisplay.textContent = Math.round(clickCount);
        clickUpgradeCostDisplay.textContent = clickUpgradeCost;
        autoUpgradeCostDisplay.textContent = autoUpgradeCost;
        clickUpgradeLevelDisplay.textContent = clickUpgradeLevel;
        clickUpgradeLevelCostDisplay.textContent = clickUpgradeLevelCost;
        prestigeLevelDisplay.textContent = prestigeLevel;
    }

    // ... (остальные функции — autoClick, displayMessage, startRandomEvent, checkAchievements, addAchievement, resetGame — без изменений) ...

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
        }
    }


    window.addEventListener('beforeunload', saveData);

    // ... (остальные обработчики событий — clickButton, upgradeClickLevelButton, upgradeClickButton, upgradeAutoButton, prestigeButton, resetButton — без изменений) ...

    loadGame();

    startRandomEvent();
    checkAchievements();
});
