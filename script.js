document.addEventListener('DOMContentLoaded', () => {
    // 1. gameConfig (все константы и настройки)
    const gameConfig = {
        SAVE_KEY: 'clickerData',
        MESSAGE_DURATION: 3000,
        AUTO_CLICK_INTERVAL: 1000,
        PRESTIGE_BASE_COST: 10000,
        EXPEDITION_TYPES: {
            'easy': 'Легкая',
            'medium': 'Средняя',
            'hard': 'Тяжелая',
        },
        CHEST_RARITY_CHANCE: {
            'common': 0.7,
            'rare': 0.25,
            'epic': 0.05,
        },
        SKIN_RARITY_CHANCE: {
            'common': 0.6,
            'uncommon': 0.3,
            'rare': 0.08,
            'epic': 0.02,
        },
        ARTIFACT_RARITY_CHANCE: {
            'common': 0.7,
            'uncommon': 0.2,
            'rare': 0.08,
            'epic': 0.02,
        },
        SKIN_EFFECTS: {
            'skin_common_1': { clickValueBonus: 1.05 },
            'skin_common_2': { autoClickerBonus: 1.05 },
            'skin_uncommon_1': { clickValueBonus: 1.1 },
            'skin_uncommon_2': { autoClickerBonus: 1.1 },
            'skin_rare_1': { clickValueBonus: 1.2 },
            'skin_rare_2': { autoClickerBonus: 1.2 },
            'skin_epic_1': { clickValueBonus: 1.5 },
            'skin_epic_2': { autoClickerBonus: 1.5 },
            'skin_common_3': { clickValueBonus: 1.03 },
            'skin_uncommon_3': { clickValueBonus: 1.08 },
            'skin_rare_3': { clickValueBonus: 1.15 },
            'skin_epic_3': { clickValueBonus: 1.35 },
        },
        ARTIFACT_EFFECTS: {
            'artifact_common_1': { prestigeMultiplierBonus: 1.1 },
            'artifact_uncommon_1': { prestigeMultiplierBonus: 1.2 },
            'artifact_rare_1': { prestigeMultiplierBonus: 1.3 },
            'artifact_epic_1': { prestigeMultiplierBonus: 1.5 },
            'artifact_common_2': { diamondBonus: 1.05 },
            'artifact_uncommon_2': { diamondBonus: 1.1 },
            'artifact_rare_2': { diamondBonus: 1.2 },
            'artifact_epic_2': { diamondBonus: 1.5 },
            'artifact_common_3': { clickValueBonus: 1.05 },
            'artifact_uncommon_3': { clickValueBonus: 1.1 },
            'artifact_rare_3': { clickValueBonus: 1.2 },
            'artifact_epic_3': { clickValueBonus: 1.5 },
            'artifact_common_4': { autoClickerBonus: 1.05 },
            'artifact_uncommon_4': { autoClickerBonus: 1.1 },
            'artifact_rare_4': { autoClickerBonus: 1.2 },
            'artifact_epic_4': { autoClickerBonus: 1.5 },
        },
        SKIN_NAMES: {
            'skin_common_1': 'Кепка',
            'skin_uncommon_1': 'Плащь',
            'skin_rare_1': 'Элитный Наряд',
            'skin_epic_1': 'Легендарное Облачение',
            'skin_common_2': 'Усиленные Перчатки',
            'skin_uncommon_2': 'Автоматизированные Руки',
            'skin_rare_2': 'Механические Конечности',
            'skin_epic_2': 'Драконьи Лапы',
            'skin_common_3': 'Древняя Маска',
            'skin_uncommon_3': 'Оркская Маска',
            'skin_rare_3': 'Скифский Шлем',
            'skin_epic_3': 'Гномский Шлем',
        },
        ARTIFACT_NAMES: {
            'artifact_common_1': 'Бронзовый Амулет',
            'artifact_uncommon_1': 'Серебряный Талисман',
            'artifact_rare_1': 'Золотой Кулон',
            'artifact_epic_1': 'Платиновый Оберег',
            'artifact_common_2': 'Алмазная Монета',
            'artifact_uncommon_2': 'Рубиновое Кольцо',
            'artifact_rare_2': 'Сапфировая Тиара',
            'artifact_epic_2': 'Изумрудный Скипетр',
            'artifact_common_3': 'Древний Камень',
            'artifact_uncommon_3': 'Волшебная Пыль',
            'artifact_rare_3': 'Кристальный Шар',
            'artifact_epic_3': 'Посох Мага',
            'artifact_common_4': 'Простой Моторчик',
            'artifact_uncommon_4': 'Шестерёнчатый Механизм',
            'artifact_rare_4': 'Паровой Двигатель',
            'artifact_epic_4': 'Реактивный Движок',
        },
         SKIN_RARITY: {
            'skin_common_1': 'common',
            'skin_common_2': 'common',
            'skin_uncommon_1': 'uncommon',
            'skin_uncommon_2': 'uncommon',
            'skin_rare_1': 'rare',
            'skin_rare_2': 'rare',
            'skin_epic_1': 'epic',
            'skin_epic_2': 'epic',
            'skin_common_3': 'common',
            'skin_uncommon_3': 'uncommon',
            'skin_rare_3': 'rare',
            'skin_epic_3': 'epic',
        },
        ARTIFACT_RARITY: {
            'artifact_common_1': 'common',
            'artifact_uncommon_1': 'uncommon',
            'artifact_rare_1': 'rare',
            'artifact_epic_1': 'epic',
            'artifact_common_2': 'common',
            'artifact_uncommon_2': 'uncommon',
            'artifact_rare_2': 'rare',
            'artifact_epic_2': 'epic',
            'artifact_common_3': 'common',
            'artifact_uncommon_3': 'uncommon',
            'artifact_rare_3': 'rare',
            'artifact_epic_3': 'epic',
            'artifact_common_4': 'common',
            'artifact_uncommon_4': 'uncommon',
            'artifact_rare_4': 'rare',
            'artifact_epic_4': 'epic',
        },
        EXPEDITION_COSTS: {
            'easy': 0,
            'medium': 10,
            'hard': 100,
        },
        EXPEDITION_REWARDS: {
            'easy': [1, 500],
            'medium': [10, 50],
            'hard': [100, 500],
        },
        EXPEDITION_DURATIONS: {
            'easy': 6000,
            'medium': 300000,
            'hard': 600000,
        },
         LEVEL_UP_BASE_EXP: 100,
         DUNGEON_CONFIG: {
            'tutorial': {
                name: 'Обучение',
                cost: 0,
                duration: 60000,
                waves: [
                    {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 30,
                        attackDamage: 3,
                    },
                     {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 30,
                         attackDamage: 3,
                     },
                     {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 30,
                         attackDamage: 3,
                     },
                    {
                     enemyName: 'Слабый гоблин',
                        enemyHealth: 50,
                         attackDamage: 3,
                      },
                ],
                rewards: {
                    diamonds: [10, 20],
                    keys: [1, 2],
                    experience: [100, 200],
                    skins: {
                        'common': [0, 1],
                    },
                },
            },
           'easy': {
                name: 'Легкое Подземелье',
                cost: 50,
                duration: 120000,
                waves: [
                    {
                        enemyName: 'Слабый гоблин',
                        enemyHealth: 50,
                        attackDamage: 5,
                    },
                    {
                        enemyName: 'Гоблин-лучник',
                        enemyHealth: 70,
                        attackDamage: 7,
                    },
                    {
                        enemyName: 'Злой гоблин',
                        enemyHealth: 100,
                        attackDamage: 10,
                    },
                ],
                rewards: {
                    diamonds: [50, 100],
                    keys: [1, 3],
                    experience: [250, 500],
                     artifacts: {
                        'common': [0, 1],
                    },
                },
            },
             'medium': {
                name: 'Среднее Подземелье',
                cost: 200,
                duration: 300000,
                 waves: [
                    {
                        enemyName: 'Гоблин-воин',
                        enemyHealth: 100,
                        attackDamage: 10,
                    },
                    {
                        enemyName: 'Гоблин-маг',
                        enemyHealth: 80,
                        attackDamage: 15,
                    },
                    {
                        enemyName: 'Элитный гоблин',
                        enemyHealth: 150,
                        attackDamage: 20,
                    },
                      {
                        enemyName: 'Гоблин-шаман',
                        enemyHealth: 120,
                        attackDamage: 15,
                    },
                ],
                rewards: {
                   diamonds: [150, 300],
                    keys: [2, 4],
                    experience: [750, 1250],
                    artifacts: {
                       'uncommon': [0, 1],
                        'common': [0, 1],
                     },
                },
            },
           'hard': {
                name: 'Сложное Подземелье',
                cost: 500,
                duration: 600000,
                   waves: [
                    {
                        enemyName: 'Гоблин-берсерк',
                        enemyHealth: 150,
                        attackDamage: 15,
                    },
                    {
                        enemyName: 'Гоблин-рыцарь',
                        enemyHealth: 200,
                        attackDamage: 25,
                    },
                    {
                        enemyName: 'Гоблин-палач',
                        enemyHealth: 180,
                        attackDamage: 20,
                    },
                       {
                        enemyName: 'Гоблин-босс',
                        enemyHealth: 300,
                           attackDamage: 30,
                    },
                ],
                rewards: {
                    diamonds: [400, 700],
                     keys: [3, 5],
                     experience: [1500, 2500],
                      artifacts: {
                        'rare': [0, 1],
                        'uncommon': [0, 1],
                        'common': [0, 1],
                     },
                },
            },
            'legendary': {
                 name: 'Легендарное Подземелье',
                cost: 1000,
                duration: 1200000,
                  waves: [
                    {
                        enemyName: 'Минотавр',
                        enemyHealth: 250,
                        attackDamage: 30,
                    },
                    {
                        enemyName: 'Гарпия',
                         enemyHealth: 200,
                        attackDamage: 35,
                    },
                    {
                       enemyName: 'Дракон',
                        enemyHealth: 350,
                        attackDamage: 50,
                    },
                      {
                       enemyName: 'Король Лич',
                        enemyHealth: 500,
                        attackDamage: 70,
                    },
                ],
                rewards: {
                    diamonds: [800, 1200],
                    keys: [4, 6],
                    experience: [3000, 5000],
                    artifacts: {
                        'epic': [0, 1],
                        'rare': [0, 1],
                        'uncommon': [0, 1],
                        'common': [0, 1],
                     },
                },
           },
         },
           ABILITY_CONFIG: {
            'diamond_bonus': {
                name: 'Бонус к алмазам',
                description: 'Увеличивает количество алмазов за экспедиции',
                 costPerLevel: 1,
                baseValue: 1.0, // Начальное значение
                increment: 0.5, // Увеличение за уровень
                maxLevel: 50,
            },
            'exp_bonus': {
                name: 'Бонус к опыту',
                description: 'Увеличивает количество опыта за экспедиции',
                 costPerLevel: 1,
                baseValue: 1.0,
                 increment: 0.5,
                 maxLevel: 50,
            },
            'click_bonus': {
                name: 'Бонус к кликам',
                 description: 'Увеличивает силу кликов',
                  costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.5,
                maxLevel: 100,
            },
             'expedition_speed': {
                name: 'Скорость Экспедиций',
                description: 'Уменьшает время экспедиций',
                costPerLevel: 1,
                baseValue: 1.0,
                 increment: 0.5,
                maxLevel: 10,
            },
              'luck_bonus': {
                name: 'Удача',
                description: 'Увеличивает шанс выпадения редких предметов',
                costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.1,
                maxLevel: 5,
            },
               'dungeon_speed': {
                name: 'Скорость Подземелий',
                description: 'Уменьшает время прохождения подземелий',
                costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.5,
                maxLevel: 10,
            },
            'dungeon_luck': {
                name: 'Удача в Подземелье',
                description: 'Увеличивает шанс выпадения редких предметов в подземелье',
                costPerLevel: 1,
                baseValue: 1.0,
                increment: 0.1,
                maxLevel: 5,
            },
        },
    };

    // 2. Состояние игры
    let gameState = {
        clickCount: 0,
        clickValue: 1,
        autoClickerValue: 0,
        clickUpgradeCost: 10,
        autoUpgradeCost: 50,
        clickUpgradeLevel: 1,
        clickUpgradeLevelCost: 100,
        prestigeLevel: 0,
        prestigeMultiplier: 1,
        achievements: [],
        achievementCount: 0,
        autoClickerInterval: null,
        diamonds: 0,
        activeExpedition: null,
        expeditionStartTime: null,
        expeditionDuration: 0,
        expeditionReward: 0,
        keys: 0,
        chests: {
            'common': 0,
            'rare': 0,
            'epic': 0
        },
        skins: {},
        artifacts: {},
        prestigeCost: gameConfig.PRESTIGE_BASE_COST,
        level: 1,
        experience: 0,
        levelPoints: 0,
           abilities: {
             'diamond_bonus': 0,
             'exp_bonus': 0,
             'click_bonus': 0,
             'expedition_speed': 0,
              'luck_bonus': 0,
               'dungeon_speed': 0,
               'dungeon_luck': 0,
           },
           activeDungeon: null,
            dungeonStartTime: null,
             dungeonDuration: 0,
             dungeonRewards: null,
              dungeonState: {
                currentWave: 0,
                playerHealth: 100,
                enemyHealth: 100,
                 enemyName: null,
                waves: [],
                }
    };

    // 3. Объекты DOM элементов
    const elements = {
        clicker: {
            clickCountDisplay: document.getElementById('click-count'),
            clickButton: document.getElementById('click-button'),
            upgradeClickButton: document.querySelector('#upgrade-click .buy-upgrade'),
            upgradeAutoButton: document.querySelector('#upgrade-auto .buy-upgrade'),
            upgradeClickLevelButton: document.querySelector('#upgrade-click-level .buy-upgrade'),
            clickUpgradeCostDisplay: document.getElementById('click-upgrade-cost'),
            autoUpgradeCostDisplay: document.getElementById('auto-upgrade-cost'),
            clickUpgradeLevelDisplay: document.getElementById('click-upgrade-level-display'),
            clickUpgradeLevelCostDisplay: document.getElementById('click-upgrade-level-cost'),
        },
        shop: {
            diamondDisplay: document.getElementById('diamonds-menu'),
            prestigeCostDisplay: document.getElementById('prestige-cost'),
            prestigeButton: document.getElementById('prestige-button'),
            prestigeLevelDisplay: document.getElementById('prestige-level'),
            keyDisplay: document.getElementById('key-display'),
            chestDisplay: {
                common: document.getElementById('common-chest-count'),
                rare: document.getElementById('rare-chest-count'),
                epic: document.getElementById('epic-chest-count'),
            },
            buyKeyButton: document.getElementById('buy-key-button'),
            buyCommonChestButton: document.getElementById('buy-common-chest-button'),
            buyRareChestButton: document.getElementById('buy-rare-chest-button'),
            buyEpicChestButton: document.getElementById('buy-epic-chest-button'),
            openChestButton: document.getElementById('open-chest-button'),
            chestItemsDisplay: document.getElementById('chest-items'),
            closeChestButton: document.getElementById('close-chest-button'),
            chestContainer: document.getElementById('chest-container'),
        },
        map: {
            mapContainer: document.getElementById('map-container'),
            expeditionProgressDisplay: document.getElementById('expedition-progress'),
        },
         dungeon: {
            dungeonContainer: document.getElementById('dungeon-container'),
            dungeonProgressDisplay: document.getElementById('dungeon-progress'),
             dungeonBattleArea: document.getElementById('dungeon-battle-area'),
            enemyNameDisplay: document.getElementById('enemy-name'),
             playerHealthDisplay: document.getElementById('player-health'),
            enemyHealthDisplay: document.getElementById('enemy-health'),
        },
        inventory: {
            inventoryContainer: document.getElementById('inventory-container'),
            skinsDisplay: document.getElementById('skins-display'),
            artifactsDisplay: document.getElementById('artifacts-display'),
        },
        global: {
            messageDisplay: document.getElementById('message'),
            globalMessageDisplay: document.getElementById('global-message'),
        },
        menu: {
            menuButton: document.querySelector('.menu-toggle'),
            menu: document.getElementById('menu-items'),
            menuItems: document.querySelectorAll('.menu-items li button'),
            clickerContent: document.getElementById('clicker-content'),
            gameContent: document.getElementById('game-content'),
            resetButton: document.getElementById('reset-button'),
        }
    };
   const profileModule = {
    elements: {
       profileInfo: document.getElementById('profile-info'),
       profileInventory: document.getElementById('profile-inventory'),
       profileAbilities: document.getElementById('profile-abilities'),
       profileContainer: document.getElementById('profile-container'),
    },
   init: () => {
       // Инициализация вкладок профиля
      profileModule.setupProfileTabs();
      },
   setupProfileTabs: () => {
        const profileTabButtons = document.querySelectorAll('.profile-tab-button');
        profileTabButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const tab = event.target.dataset.tab;
                profileModule.elements.profileInfo.style.display = (tab === 'profile-info') ? 'block' : 'none';
               profileModule.elements.profileInventory.style.display = (tab === 'profile-inventory') ? 'block' : 'none';
               profileModule.elements.profileAbilities.style.display = (tab === 'profile-abilities') ? 'block' : 'none';
                profileTabButtons.forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
            });
        });
       },

    showProfile: () => {
        profileModule.elements.profileContainer.style.display = 'block';
         profileModule.elements.profileInfo.style.display = 'block';
        profileModule.elements.profileInventory.style.display = 'none';
        profileModule.elements.profileAbilities.style.display = 'none';
    },
    hideProfile: () => {
          if (profileModule.elements.profileContainer) {
            profileModule.elements.profileContainer.style.display = 'none';
         }
    },
    updateDisplay: () => {
         profileModule.updateAbilitiesDisplay();
         profileModule.updateProfile();
         profileModule.updateInventoryDisplay();
    },
   updateProfile: () => {
        const profileInfo = profileModule.elements.profileInfo;
        profileInfo.innerHTML = '';

        const clickValue = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
        const clickPowerInfo = document.createElement('p');
        clickPowerInfo.textContent = `Сила клика: ${clickValue.toFixed(2)} (база ${gameState.clickValue}, уровень ${gameState.clickUpgradeLevel}, усиление скинами: ${calculateClickBonus(gameState.skins).toFixed(2)}, усиление способностью: ${calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus).toFixed(2)}, престиж ${gameState.prestigeMultiplier.toFixed(2)})`;
        profileInfo.appendChild(clickPowerInfo);

        const clickCountInfo = document.createElement('p');
        clickCountInfo.textContent = `Количество кликов: ${Math.round(gameState.clickCount)}`;
        profileInfo.appendChild(clickCountInfo);

         const levelInfo = document.createElement('p');
        levelInfo.textContent = `Уровень: ${gameState.level} (${gameState.experience}/${gameConfig.LEVEL_UP_BASE_EXP * Math.pow(1.5, gameState.level - 1)})`;
        profileInfo.appendChild(levelInfo);

        const levelPointsInfo = document.createElement('p');
        levelPointsInfo.textContent = `Очки способностей: ${gameState.levelPoints}`;
         profileInfo.appendChild(levelPointsInfo);

        const prestigeLevelInfo = document.createElement('p');
        prestigeLevelInfo.textContent = `Уровень престижа: ${gameState.prestigeLevel}`;
        profileInfo.appendChild(prestigeLevelInfo);

          const prestigeBonusInfo = document.createElement('p');
        prestigeBonusInfo.textContent = `Множитель престижа: ${gameState.prestigeMultiplier.toFixed(2)}`;
          profileInfo.appendChild(prestigeBonusInfo);
    },
    updateAbilitiesDisplay: () => {
        const abilityContainer = document.getElementById('abilities-list');
         abilityContainer.innerHTML = '';
          for (const abilityKey in gameConfig.ABILITY_CONFIG) {
                const config = gameConfig.ABILITY_CONFIG[abilityKey];
                const currentLevel = gameState.abilities[abilityKey] || 0;
                const nextLevel = currentLevel + 1;
                const cost = config.costPerLevel * nextLevel;
                const abilityDiv = document.createElement('div');
                 abilityDiv.classList.add('ability-item');
                 abilityDiv.innerHTML = `
                    <div class="ability-info">
                        <h3>${config.name}</h3>
                        <p>${config.description}</p>
                        <p>Текущий уровень: ${currentLevel} / ${config.maxLevel}</p>
                          <p>Бонус: ${(calculateAbilityBonus(abilityKey, currentLevel)-1).toFixed(2)}</p>
                         </div>
                      <div class="ability-upgrade">
                        <button data-ability="${abilityKey}" data-cost="${cost}" class="upgrade-ability-button" ${gameState.levelPoints < cost || currentLevel === config.maxLevel ? 'disabled' : ''}>
                            Улучшить (${cost} очков)
                        </button>
                        </div>
                 `;
               abilityContainer.appendChild(abilityDiv);
           }
           const abilityButtons = document.querySelectorAll('.upgrade-ability-button');
        abilityButtons.forEach(button => {
            button.addEventListener('click', () => {
                const ability = button.dataset.ability;
               const cost = parseInt(button.dataset.cost);
                if (gameState.levelPoints >= cost) {
                    gameState.levelPoints -= cost;
                      gameState.abilities[ability] = (gameState.abilities[ability] || 0) + 1;
                    profileModule.updateDisplay();
                  // updateDisplay();
                    displayMessage(`${gameConfig.ABILITY_CONFIG[ability].name} улучшен!`, 'green');
                   //updateAbilitiesDisplay();
                   //updateProfile();
                 saveData();
               } else {
                     displayMessage('Недостаточно очков способностей!', 'red');
                }
            });
         });
    },
  updateInventoryDisplay: () => {
      const skinsDisplay = document.getElementById('skins-display');
       const artifactsDisplay = document.getElementById('artifacts-display');
    skinsDisplay.innerHTML = '';
      const skins = {};
      for (const skin in gameState.skins) {
        if (gameState.skins.hasOwnProperty(skin) && gameState.skins[skin] > 0) {
          skins[skin] = gameState.skins[skin];
        }
      }
      for (const skin in skins) {
        const skinElement = document.createElement('div');
        const imagePath = `${skin}.jpg`;
          skinElement.innerHTML = `${getImageTag(skin, imagePath, gameConfig.SKIN_NAMES[skin] || skin)} <span>${gameConfig.SKIN_NAMES[skin] || skin} x${skins[skin]}</span>`;
        skinElement.addEventListener('click', () => {
          const rarity = gameConfig.SKIN_RARITY[skin];
            let bonuses = '';
            if (gameConfig.SKIN_EFFECTS[skin]) {
                for (const effect in gameConfig.SKIN_EFFECTS[skin]) {
                    bonuses += `${effect}: ${gameConfig.SKIN_EFFECTS[skin][effect]} \n`;
               }
           }
           createItemPopup('skins', skin, gameConfig.SKIN_NAMES[skin] || skin, skins[skin], rarity || 'Неизвестно', bonuses);
         });
        skinsDisplay.appendChild(skinElement);
      }
     artifactsDisplay.innerHTML = '';
     const artifacts = {};
    for (const artifact in gameState.artifacts) {
       if (gameState.artifacts.hasOwnProperty(artifact) && gameState.artifacts[artifact] > 0) {
            artifacts[artifact] = gameState.artifacts[artifact];
        }
    }
    for (const artifact in artifacts) {
        const artifactElement = document.createElement('div');
        const imagePath = `${artifact}.jpg`;
        artifactElement.innerHTML = `${getImageTag(artifact, imagePath, gameConfig.ARTIFACT_NAMES[artifact] || artifact)} <span>${gameConfig.ARTIFACT_NAMES[artifact] || artifact} x${artifacts[artifact]}</span>`;
         artifactElement.addEventListener('click', () => {
            const rarity = gameConfig.ARTIFACT_RARITY[artifact];
            let bonuses = '';
             if (gameConfig.ARTIFACT_EFFECTS[artifact]) {
               for (const effect in gameConfig.ARTIFACT_EFFECTS[artifact]) {
                   bonuses += `${effect}: ${gameConfig.ARTIFACT_EFFECTS[artifact][effect]} \n`;
               }
           }
         createItemPopup('artifacts', artifact, gameConfig.ARTIFACT_NAMES[artifact] || artifact, artifacts[artifact], rarity || 'Неизвестно', bonuses);
        });
        artifactsDisplay.appendChild(artifactElement);
      }
    },
};
    const tWebApp = window.Telegram && window.Telegram.WebApp;

    if (tWebApp) {
        tWebApp.ready();
    }

    // 4. Обновление дисплея
    const updateClickCountDisplay = () => {
        elements.clicker.clickCountDisplay.textContent = Math.round(gameState.clickCount);
    };

    const updateUpgradeCostDisplay = () => {
        elements.clicker.clickUpgradeCostDisplay.textContent = gameState.clickUpgradeCost;
        elements.clicker.autoUpgradeCostDisplay.textContent = gameState.autoUpgradeCost;
        elements.clicker.clickUpgradeLevelDisplay.textContent = gameState.clickUpgradeLevel;
        elements.clicker.clickUpgradeLevelCostDisplay.textContent = gameState.clickUpgradeLevelCost;
    };

    const updatePrestigeDisplay = () => {
        elements.shop.prestigeLevelDisplay.textContent = gameState.prestigeLevel;
        elements.shop.prestigeCostDisplay.textContent = `Стоимость: ${gameState.prestigeCost}`;
    };

    const updateAchievementsDisplay = () => {
        elements.global.messageDisplay.textContent = `Достижения: ${gameState.achievementCount}`;
    };

    const updateDiamondDisplay = () => {
        elements.shop.diamondDisplay.textContent = `Алмазы: ${gameState.diamonds}`;
    };

    const updateKeyDisplay = () => {
        elements.shop.keyDisplay.textContent = `Ключи: ${gameState.keys}`;
    };

    const updateChestDisplay = () => {
        elements.shop.chestDisplay.common.textContent = `Обычные: ${gameState.chests.common}`;
        elements.shop.chestDisplay.rare.textContent = `Редкие: ${gameState.chests.rare}`;
        elements.shop.chestDisplay.epic.textContent = `Эпические: ${gameState.chests.epic}`;
    };

    const updateExpeditionProgressBar = () => {
        if (!gameState.activeExpedition) {
            elements.map.expeditionProgressDisplay.textContent = '';
            return;
        }
        const elapsed = Date.now() - gameState.expeditionStartTime;
        const remaining = Math.max(0, gameState.expeditionDuration - elapsed);
        const progress = Math.min(100, Math.round((elapsed / gameState.expeditionDuration) * 100));
        const remainingSeconds = Math.ceil(remaining / 1000);
        elements.map.expeditionProgressDisplay.textContent = `Экспедиция ${gameConfig.EXPEDITION_TYPES[gameState.activeExpedition]}: ${progress}%  (${remainingSeconds} сек. осталось)`;
        if (remaining <= 0) {
            finishExpedition();
        }
    };

    const updateDungeonProgressBar = () => {
        if (!gameState.activeDungeon) {
            elements.dungeon.dungeonProgressDisplay.textContent = '';
            elements.dungeon.dungeonBattleArea.style.display = 'none';
            return;
        }
       elements.dungeon.dungeonBattleArea.style.display = 'block';
          const elapsed = Date.now() - gameState.dungeonStartTime;
          const remaining = Math.max(0, gameState.dungeonDuration - elapsed);
         const progress = Math.min(100, Math.round((elapsed / gameState.dungeonDuration) * 100));
        const remainingSeconds = Math.ceil(remaining / 1000);
         elements.dungeon.dungeonProgressDisplay.textContent = `Подземелье ${gameConfig.DUNGEON_CONFIG[gameState.activeDungeon].name}: ${progress}%  (${remainingSeconds} сек. осталось)`;
           updateDungeonBattleUI();
        if (remaining <= 0) {
            finishDungeon();
        }
    };


    const updateDisplay = () => {
        updateClickCountDisplay();
        updateUpgradeCostDisplay();
        updatePrestigeDisplay();
        updateAchievementsDisplay();
        updateDiamondDisplay();
        updateKeyDisplay();
        updateChestDisplay();
        updateExpeditionProgressBar();
        updateExpeditionButtonInfo();
          updateDungeonProgressBar();
        updateDungeonButtonInfo();
    };

    // 5. Сообщения
    const displayMessage = (msg, color = 'white', fontSize = '1em') => {
        elements.global.globalMessageDisplay.textContent = msg;
        elements.global.globalMessageDisplay.style.color = color;
        elements.global.globalMessageDisplay.style.fontSize = fontSize;
        elements.global.globalMessageDisplay.style.display = 'block';
        setTimeout(() => {
            elements.global.globalMessageDisplay.style.display = 'none';
                    }, gameConfig.MESSAGE_DURATION);
    };

    // 6. Обработчики событий
    elements.clicker.clickButton.addEventListener('click', () => {
        const clickValue = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
        gameState.clickCount += clickValue;
         gainExperience(clickValue);
        updateClickCountDisplay();
        saveData();
    });

    elements.clicker.upgradeClickButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue += 1;
            gameState.clickUpgradeCost = Math.round(gameState.clickUpgradeCost * 1.15);
            updateDisplay();
             displayMessage('Улучшение клика!', 'green');
            saveData();
        } else {
            displayMessage('Недостаточно кликов!', 'red');
        }
    });

    elements.clicker.upgradeAutoButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.autoUpgradeCost) {
            gameState.clickCount -= gameState.autoUpgradeCost;
            gameState.autoClickerValue += 1;
            gameState.autoUpgradeCost = Math.round(gameState.autoUpgradeCost * 1.15);
            updateDisplay();
             displayMessage('Улучшение автоклика!', 'green');
            if (!gameState.autoClickerInterval) {
                gameState.autoClickerInterval = setInterval(autoClick, gameConfig.AUTO_CLICK_INTERVAL);
            }
            saveData();
        } else {
           displayMessage('Недостаточно кликов!', 'red');
        }
    });

      elements.clicker.upgradeClickLevelButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.clickUpgradeLevelCost) {
            gameState.clickCount -= gameState.clickUpgradeLevelCost;
            gameState.clickUpgradeLevel += 1;
            gameState.clickUpgradeLevelCost = Math.round(gameState.clickUpgradeLevelCost * 1.2);
            updateDisplay();
            displayMessage('Уровень клика повышен!', 'green');
            saveData();
        } else {
           displayMessage('Недостаточно кликов!', 'red');
        }
    });

    elements.shop.prestigeButton.addEventListener('click', () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
             prestigeGame();
         } else {
             displayMessage('Недостаточно кликов для престижа!', 'red');
        }
    });


    elements.shop.buyKeyButton.addEventListener('click', () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys += 1;
            updateDisplay();
            saveData();
              displayMessage('Куплен ключ!', 'green');
        } else {
           displayMessage('Недостаточно алмазов!', 'red');
        }
    });

    elements.shop.buyCommonChestButton.addEventListener('click', () => {
        if (gameState.keys >= 1) {
            gameState.keys -= 1;
            gameState.chests.common += 1;
            updateDisplay();
            saveData();
             displayMessage('Куплен обычный сундук!', 'green');
        } else {
             displayMessage('Недостаточно ключей!', 'red');
        }
    });
     elements.shop.buyRareChestButton.addEventListener('click', () => {
        if (gameState.keys >= 3) {
            gameState.keys -= 3;
            gameState.chests.rare += 1;
            updateDisplay();
            saveData();
             displayMessage('Куплен редкий сундук!', 'green');
        } else {
           displayMessage('Недостаточно ключей!', 'red');
        }
    });
     elements.shop.buyEpicChestButton.addEventListener('click', () => {
        if (gameState.keys >= 5) {
            gameState.keys -= 5;
            gameState.chests.epic += 1;
            updateDisplay();
            saveData();
              displayMessage('Куплен эпический сундук!', 'green');
        } else {
           displayMessage('Недостаточно ключей!', 'red');
        }
    });

    elements.shop.openChestButton.addEventListener('click', () => {
        elements.shop.chestContainer.style.display = 'block';
         elements.shop.chestItemsDisplay.innerHTML = '';
        openChest();
    });

    elements.shop.closeChestButton.addEventListener('click', () => {
      elements.shop.chestContainer.style.display = 'none';
      });

    elements.menu.menuButton.addEventListener('click', () => {
        elements.menu.menu.style.display = elements.menu.menu.style.display === 'block' ? 'none' : 'block';
    });
     elements.menu.menuItems.forEach(button => {
        button.addEventListener('click', (event) => {
             const tab = event.target.dataset.tab;
            switchTab(tab);
            elements.menu.menu.style.display = 'none';
       });
     });

     elements.menu.resetButton.addEventListener('click', () => {
        resetGame();
    });
    
    // 7. Игровой цикл
    const autoClick = () => {
        const autoClickValue = gameState.autoClickerValue * calculateAutoClickerBonus(gameState.skins) * calculateAbilityBonus('auto_clicker_bonus', gameState.abilities.auto_clicker_bonus);
         gameState.clickCount += autoClickValue;
        gainExperience(autoClickValue);
         updateClickCountDisplay();
        saveData();
    };
  
    const gameLoop = () => {
        updateDisplay();
       profileModule.updateDisplay();
        requestAnimationFrame(gameLoop);
    };

    // 8. Функции игрового процесса

    const switchTab = (tab) => {
       elements.menu.menuItems.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.menu-items li button[data-tab="${tab}"]`).classList.add('active');
         elements.clicker.clickerContent.style.display = tab === 'clicker' ? 'block' : 'none';
        elements.gameContent.style.display = tab === 'game' ? 'block' : 'none';
         elements.inventory.inventoryContainer.style.display = tab === 'inventory' ? 'block' : 'none';
        elements.map.mapContainer.style.display = tab === 'map' ? 'block' : 'none';
         elements.dungeon.dungeonContainer.style.display = tab === 'dungeon' ? 'block' : 'none';
        if (tab === 'profile') {
             profileModule.showProfile();
         } else {
             profileModule.hideProfile();
         }

    };

    const prestigeGame = () => {
        gameState.prestigeLevel += 1;
        gameState.prestigeMultiplier += 0.5;
        gameState.prestigeCost *= 2;
         gameState.clickCount = 0;
        gameState.clickValue = 1;
       gameState.autoClickerValue = 0;
         gameState.clickUpgradeCost = 10;
        gameState.autoUpgradeCost = 50;
         gameState.clickUpgradeLevel = 1;
        gameState.clickUpgradeLevelCost = 100;
        gameState.experience = 0;
        gameState.level = 1;
        gameState.levelPoints = 0;
          gameState.abilities = {
             'diamond_bonus': 0,
             'exp_bonus': 0,
             'click_bonus': 0,
             'expedition_speed': 0,
              'luck_bonus': 0,
              'dungeon_speed': 0,
               'dungeon_luck': 0,
           };
          clearInterval(gameState.autoClickerInterval);
         gameState.autoClickerInterval = null;
         displayMessage('Престиж выполнен! Начинаем с начала.', 'green');
        updateDisplay();
        saveData();
    };

     const gainExperience = (amount) => {
        gameState.experience += amount;
        let levelUp = false;
        while (gameState.experience >= gameConfig.LEVEL_UP_BASE_EXP * Math.pow(1.5, gameState.level - 1)) {
            gameState.experience -= gameConfig.LEVEL_UP_BASE_EXP * Math.pow(1.5, gameState.level - 1);
            gameState.level += 1;
            gameState.levelPoints += 1;
             levelUp = true;
        }
       if(levelUp) {
            displayMessage(`Уровень повышен до ${gameState.level} !`, 'green');
        }

        saveData();
    };

     const getRandomItem = (rarityType) => {
         const rarityChance = gameConfig[`${rarityType.toUpperCase()}_RARITY_CHANCE`];
        const rand = Math.random();
        let cumulativeChance = 0;
        for (const rarity in rarityChance) {
            cumulativeChance += rarityChance[rarity];
            if (rand < cumulativeChance) {
                 return rarity;
           }
        }
        return 'common'; // Возвращает common, если ничего не выпало (может быть из-за ошибок конфигурации)
    };


    const openChest = () => {
         let chestType = null;
        if (gameState.chests.epic > 0) {
            chestType = 'epic';
          } else if(gameState.chests.rare > 0) {
             chestType = 'rare';
        } else if (gameState.chests.common > 0) {
             chestType = 'common';
        } else {
             displayMessage('Нет сундуков для открытия', 'red');
            return;
        }
        if (chestType) {
             gameState.chests[chestType] -= 1;
            displayMessage(`Открыт ${chestType} сундук`, 'green');
             const rarity = getRandomItem('skin');
             const skin = `skin_${rarity}_${Math.floor(Math.random() * 3 + 1)}`;
             const artifactRarity = getRandomItem('artifact');
            const artifact = `artifact_${artifactRarity}_${Math.floor(Math.random() * 4 + 1)}`;
            if (gameState.skins[skin]) {
               gameState.skins[skin] += 1;
            } else {
                gameState.skins[skin] = 1;
             }
           if (gameState.artifacts[artifact]) {
                 gameState.artifacts[artifact] += 1;
            } else {
                gameState.artifacts[artifact] = 1;
            }
              displayMessage(`${gameConfig.SKIN_NAMES[skin] || skin} ${gameConfig.ARTIFACT_NAMES[artifact] || artifact}`, 'blue', '0.9em');

            const skinElement = document.createElement('div');
            const artifactElement = document.createElement('div');
            const imagePathSkin = `${skin}.jpg`;
             const imagePathArtifact = `${artifact}.jpg`;
          skinElement.innerHTML = `${getImageTag(skin, imagePathSkin, gameConfig.SKIN_NAMES[skin] || skin)}<span>${gameConfig.SKIN_NAMES[skin] || skin}</span>`;
          artifactElement.innerHTML = `${getImageTag(artifact, imagePathArtifact, gameConfig.ARTIFACT_NAMES[artifact] || artifact)}<span>${gameConfig.ARTIFACT_NAMES[artifact] || artifact}</span>`;
            elements.shop.chestItemsDisplay.appendChild(skinElement);
             elements.shop.chestItemsDisplay.appendChild(artifactElement);
             updateDisplay();
           saveData();
       }
    };

     const startExpedition = (type) => {
         if (gameState.activeExpedition) {
             displayMessage('Экспедиция уже в пути!', 'red');
            return;
        }
          const cost = gameConfig.EXPEDITION_COSTS[type];
        if (gameState.diamonds < cost) {
             displayMessage('Недостаточно алмазов для экспедиции!', 'red');
             return;
         }
        gameState.diamonds -= cost;
        gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] * calculateAbilityBonus('expedition_speed', gameState.abilities.expedition_speed);
        gameState.expeditionReward = gameConfig.EXPEDITION_REWARDS[type];
        updateDisplay();
       saveData();
    };
       const finishExpedition = () => {
        if (!gameState.activeExpedition) return;
            gameState.activeExpedition = null;
         const baseReward = gameState.expeditionReward;
           const diamondReward = Math.floor(baseReward[0] + (Math.random() * (baseReward[1] - baseReward[0])) * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus));
          gameState.diamonds += diamondReward;
           const expReward =  Math.floor(baseReward[0] + (Math.random() * (baseReward[1] - baseReward[0])) * calculateAbilityBonus('exp_bonus', gameState.abilities.exp_bonus));
           gainExperience(expReward);
         updateDisplay();
         displayMessage(`Экспедиция завершена! Получено ${diamondReward} алмазов и ${expReward} опыта.`, 'green');
        saveData();
    };
     const createItemPopup = (type, itemId, name, count, rarity, bonuses) => {
         const popup = document.createElement('div');
        popup.className = 'item-popup';
        popup.innerHTML = `
             <div class="item-popup-content">
               <h3>${name}</h3>
              <img src="${itemId}.jpg" alt="${name}" class="item-popup-image">
                <p>Количество: ${count}</p>
                 <p>Редкость: ${rarity}</p>
                 <p>Бонусы: \n ${bonuses}</p>
                  <button class="popup-close-button">Закрыть</button>
            </div>
         `;
        document.body.appendChild(popup);
        popup.querySelector('.popup-close-button').addEventListener('click', () => {
            popup.remove();
        });
    };

    const getImageTag = (itemId, imagePath, name) => {
    return  `<img src="${imagePath}" alt="${name}" class="item-image">`
     };

     const calculateClickBonus = (skins) => {
          let bonus = 1;
         for (const skin in skins) {
                if (gameConfig.SKIN_EFFECTS[skin] && gameConfig.SKIN_EFFECTS[skin].clickValueBonus) {
                     bonus += (gameConfig.SKIN_EFFECTS[skin].clickValueBonus - 1) * skins[skin]
            }
         }
          return bonus;
    };

      const calculateAutoClickerBonus = (skins) => {
        let bonus = 1;
       for (const skin in skins) {
            if (gameConfig.SKIN_EFFECTS[skin] && gameConfig.SKIN_EFFECTS[skin].autoClickerBonus) {
              bonus += (gameConfig.SKIN_EFFECTS[skin].autoClickerBonus - 1) * skins[skin];
          }
        }
         return bonus;
    };

      const calculateAbilityBonus = (ability, level) => {
       const config = gameConfig.ABILITY_CONFIG[ability];
        if (!config) return 1;
      return config.baseValue + (config.increment * level);
       };

      const updateExpeditionButtonInfo = () => {
         const expeditionButtons = document.querySelectorAll('.expedition-button');
        expeditionButtons.forEach(button => {
            const type = button.dataset.expedition;
             const cost = gameConfig.EXPEDITION_COSTS[type];
          button.textContent = `${gameConfig.EXPEDITION_TYPES[type]} (${cost} алмазов)`;
             button.disabled = gameState.diamonds < cost;
           if (gameState.activeExpedition === type) {
               button.classList.add('active');
            } else {
               button.classList.remove('active');
           }
           button.addEventListener('click', () => {
                startExpedition(type);
            });
        });
    };
    
      const updateDungeonButtonInfo = () => {
         const dungeonButtons = document.querySelectorAll('.dungeon-button');
        dungeonButtons.forEach(button => {
             const type = button.dataset.dungeon;
             const cost = gameConfig.DUNGEON_CONFIG[type].cost;
            button.textContent = `${gameConfig.DUNGEON_CONFIG[type].name} (${cost} алмазов)`;
            button.disabled = gameState.diamonds < cost;
            if (gameState.activeDungeon === type) {
                button.classList.add('active');
            } else {
               button.classList.remove('active');
           }
           button.addEventListener('click', () => {
                 startDungeon(type);
             });
        });
    };

    const startDungeon = (type) => {
        if (gameState.activeDungeon) {
            displayMessage('Подземелье уже в процессе!', 'red');
           return;
        }
          const cost = gameConfig.DUNGEON_CONFIG[type].cost;
         if (gameState.diamonds < cost) {
           displayMessage('Недостаточно алмазов для подземелья!', 'red');
            return;
       }
        gameState.diamonds -= cost;
         gameState.activeDungeon = type;
         gameState.dungeonStartTime = Date.now();
        gameState.dungeonDuration = gameConfig.DUNGEON_CONFIG[type].duration * calculateAbilityBonus('dungeon_speed', gameState.abilities.dungeon_speed);
         gameState.dungeonRewards = gameConfig.DUNGEON_CONFIG[type].rewards;
           gameState.dungeonState.currentWave = 0;
        gameState.dungeonState.waves = gameConfig.DUNGEON_CONFIG[type].waves;
        gameState.dungeonState.playerHealth = 100;
         startNextWave();
          updateDisplay();
        saveData();
    };
     const startNextWave = () => {
            if (gameState.dungeonState.currentWave < gameState.dungeonState.waves.length) {
                const wave = gameState.dungeonState.waves[gameState.dungeonState.currentWave];
                  gameState.dungeonState.enemyName = wave.enemyName;
                   gameState.dungeonState.enemyHealth = wave.enemyHealth;
            }
     };
       const updateDungeonBattleUI = () => {
           if (!gameState.activeDungeon) return;
            elements.dungeon.enemyNameDisplay.textContent = `Враг: ${gameState.dungeonState.enemyName}`;
           elements.dungeon.playerHealthDisplay.textContent = `Игрок: ${gameState.dungeonState.playerHealth} HP`;
           elements.dungeon.enemyHealthDisplay.textContent = `Враг: ${gameState.dungeonState.enemyHealth} HP`;
    };

        const handleDungeonBattle = () => {
          if (!gameState.activeDungeon) return;
            const playerDamage = (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
           gameState.dungeonState.enemyHealth -= playerDamage;
             if (gameState.dungeonState.enemyHealth <= 0) {
                  gameState.dungeonState.currentWave++;
                   if (gameState.dungeonState.currentWave < gameState.dungeonState.waves.length) {
                       displayMessage(`Волна ${gameState.dungeonState.currentWave} уничтожена`, 'green');
                      startNextWave();
                   } else {
                        finishDungeon();
                    }
             } else {
                const enemyDamage = gameState.dungeonState.waves[gameState.dungeonState.currentWave].attackDamage;
               gameState.dungeonState.playerHealth -= enemyDamage;
                displayMessage(`- ${enemyDamage} урона по игроку!`, 'red', '0.8em');
                 if (gameState.dungeonState.playerHealth <= 0) {
                   finishDungeon();
                   displayMessage(`Игрок погиб в подземелье!`, 'red');
               }
            }
            updateDungeonBattleUI();
            saveData();
      };

      elements.dungeon.dungeonBattleArea.addEventListener('click', () => {
         handleDungeonBattle();
      });
      const finishDungeon = () => {
        if (!gameState.activeDungeon) return;
         gameState.activeDungeon = null;
          if (gameState.dungeonState.playerHealth <= 0) {
            displayMessage(`Поражение в подземелье!`, 'red');
              gameState.dungeonState.playerHealth = 100;
             gameState.dungeonState.currentWave = 0;
              updateDisplay();
             return;
          }
        gameState.dungeonState.playerHealth = 100;
        const rewards = gameState.dungeonRewards;
          const diamondsReward = Math.floor(rewards.diamonds[0] + (Math.random() * (rewards.diamonds[1] - rewards.diamonds[0])) * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus));
           gameState.diamonds += diamondsReward;
        const expReward = Math.floor(rewards.experience[0] + (Math.random() * (rewards.experience[1] - rewards.experience[0])) * calculateAbilityBonus('exp_bonus', gameState.abilities.exp_bonus));
          gainExperience(expReward);
         if(rewards.skins) {
                const rarity = getRandomItem('skin');
               const skin = `skin_${rarity}_${Math.floor(Math.random() * 3 + 1)}`;
                  if (gameState.skins[skin]) {
                       gameState.skins[skin] += 1;
                  } else {
                   gameState.skins[skin] = 1;
                 }
                    displayMessage(`${gameConfig.SKIN_NAMES[skin] || skin} получен из подземелья!`, 'blue', '0.8em');
             }
        if(rewards.artifacts) {
                 const artifactRarity = getRandomItem('artifact');
            const artifact = `artifact_${artifactRarity}_${Math.floor(Math.random() * 4 + 1)}`;
                 if (gameState.artifacts[artifact]) {
                    gameState.artifacts[artifact] += 1;
                   } else {
                      gameState.artifacts[artifact] = 1;
                  }
                 displayMessage(`${gameConfig.ARTIFACT_NAMES[artifact] || artifact} получен из подземелья!`, 'blue', '0.8em');
             }
           gameState.dungeonState.currentWave = 0;
           updateDisplay();
         displayMessage(`Подземелье завершено! Получено ${diamondsReward} алмазов и ${expReward} опыта.`, 'green');
        saveData();
   };
    // 9. Сохранение и загрузка
    const saveData = () => {
        localStorage.setItem(gameConfig.SAVE_KEY, JSON.stringify(gameState));
    };

    const loadData = () => {
        const savedData = localStorage.getItem(gameConfig.SAVE_KEY);
        if (savedData) {
            gameState = JSON.parse(savedData);
            //Устраняем проблему, когда у нас нет autoClickerInterval
            if (gameState.autoClickerValue > 0 && !gameState.autoClickerInterval) {
                gameState.autoClickerInterval = setInterval(autoClick, gameConfig.AUTO_CLICK_INTERVAL);
            }
            updateDisplay();
            profileModule.updateDisplay();
        }
    };

    const resetGame = () => {
         if (confirm('Вы уверены, что хотите сбросить игру?')) {
            localStorage.removeItem(gameConfig.SAVE_KEY);
            gameState = {
                clickCount: 0,
                clickValue: 1,
                 autoClickerValue: 0,
                clickUpgradeCost: 10,
                autoUpgradeCost: 50,
               clickUpgradeLevel: 1,
               clickUpgradeLevelCost: 100,
                 prestigeLevel: 0,
                 prestigeMultiplier: 1,
                achievements: [],
                achievementCount: 0,
                autoClickerInterval: null,
                 diamonds: 0,
                  activeExpedition: null,
                expeditionStartTime: null,
                expeditionDuration: 0,
                expeditionReward: 0,
                 keys: 0,
                chests: {
                    'common': 0,
                    'rare': 0,
                    'epic': 0
                 },
                 skins: {},
                 artifacts: {},
                  prestigeCost: gameConfig.PRESTIGE_BASE_COST,
                  level: 1,
                   experience: 0,
                levelPoints: 0,
                 abilities: {
                   'diamond_bonus': 0,
                    'exp_bonus': 0,
                    'click_bonus': 0,
                     'expedition_speed': 0,
                    'luck_bonus': 0,
                     'dungeon_speed': 0,
                      'dungeon_luck': 0,
                    },
                   activeDungeon: null,
                    dungeonStartTime: null,
                   dungeonDuration: 0,
                    dungeonRewards: null,
                    dungeonState: {
                        currentWave: 0,
                         playerHealth: 100,
                         enemyHealth: 100,
                         enemyName: null,
                       waves: [],
                     }
             };
              updateDisplay();
            profileModule.updateDisplay();
           displayMessage('Игра сброшена!', 'green');
        }
     };


    // 10. Инициализация
    loadData();
    gameLoop();
    profileModule.init();
    updateDisplay();
    updateExpeditionButtonInfo();
    updateDungeonButtonInfo();
      switchTab('clicker'); // начальная вкладка
});