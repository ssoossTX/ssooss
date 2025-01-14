document.addEventListener('DOMContentLoaded', function() {
    let clickCount = 0;
    let clickValue = 1;
    let autoClickerInterval;
    let autoClickerValue = 0;
    let clickUpgradeCost = 10;
    let autoUpgradeCost = 50;
    let clickUpgradeLevel = 1;
    let clickUpgradeLevelCost = 100;
    
    const clickCountDisplay = document.getElementById('click-count');
    const clickButton = document.getElementById('click-button');
    const upgradeClickButton = document.querySelector('#upgrade-click button');
    const upgradeAutoButton = document.querySelector('#upgrade-auto button');
     const upgradeClickLevelButton = document.querySelector('#upgrade-click-level button');
    const clickUpgradeCostDisplay = document.getElementById('click-upgrade-cost');
    const autoUpgradeCostDisplay = document.getElementById('auto-upgrade-cost');
    const clickUpgradeLevelDisplay = document.getElementById('click-upgrade-level-display')
     const clickUpgradeLevelCostDisplay = document.getElementById('click-upgrade-level-cost');
    const messageDisplay = document.getElementById('message');

    function updateDisplay(){
         clickCountDisplay.textContent = clickCount;
        clickUpgradeCostDisplay.textContent = clickUpgradeCost;
        autoUpgradeCostDisplay.textContent = autoUpgradeCost;
        clickUpgradeLevelDisplay.textContent = clickUpgradeLevel;
        clickUpgradeLevelCostDisplay.textContent = clickUpgradeLevelCost;
    }

     function displayMessage(msg,color='green'){
         messageDisplay.textContent = msg;
         messageDisplay.style.color = color;
         setTimeout(() => {messageDisplay.textContent = '';}, 3000)
     }
    
    function autoClick(){
        clickCount += Math.round(autoClickerValue * clickUpgradeLevel);
        updateDisplay();
    }

    // Загрузка данных из localStorage
    if(localStorage.getItem('clickerData')){
        let savedData = JSON.parse(localStorage.getItem('clickerData'));
        clickCount = savedData.clickCount;
        clickValue = savedData.clickValue;
        autoClickerValue = savedData.autoClickerValue;
        clickUpgradeCost = savedData.clickUpgradeCost;
        autoUpgradeCost = savedData.autoUpgradeCost;
        clickUpgradeLevel = savedData.clickUpgradeLevel;
        clickUpgradeLevelCost = savedData.clickUpgradeLevelCost;

        if(autoClickerValue > 0){
          autoClickerInterval = setInterval(autoClick, 1000);
        }
        updateDisplay();
    }
    
     function saveData(){         let data = {
             clickCount: clickCount,
             clickValue: clickValue,
             autoClickerValue: autoClickerValue,
             clickUpgradeCost: clickUpgradeCost,
             autoUpgradeCost: autoUpgradeCost,
             clickUpgradeLevel: clickUpgradeLevel,
             clickUpgradeLevelCost: clickUpgradeLevelCost
         };
         localStorage.setItem('clickerData', JSON.stringify(data));
     }

     window.addEventListener('beforeunload',saveData);
        

    clickButton.addEventListener('click', function() {
        clickCount += Math.round(clickValue * clickUpgradeLevel);
        updateDisplay();
    });
    
      upgradeClickLevelButton.addEventListener('click',function(){
       if(clickCount >= clickUpgradeLevelCost){
            clickCount -= clickUpgradeLevelCost;
            clickUpgradeLevel++;
            clickUpgradeCost = 10;
            clickCount = 0;
            clickUpgradeLevelCost = Math.round(clickUpgradeLevelCost * 2.5);
            updateDisplay();
           displayMessage('Уровень улучшения клика повышен!')
        } else {
            displayMessage('Недостаточно кликов!','red');
        }
    })
    

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
            if(!autoClickerInterval){
             autoClickerInterval = setInterval(autoClick, 1000);
            }
            autoUpgradeCost = Math.round(autoUpgradeCost * 2.2);
            updateDisplay();
            displayMessage('Автокликер приобретен!');

        } else {
             displayMessage('Недостаточно кликов!', 'red');
        }
    });
});
