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
            'easy': 60000,
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
            expeditionButtons: document.querySelectorAll('.expedition-button') // Добавлено
        },
         dungeon: {
            dungeonContainer: document.getElementById('dungeon-container'),
            dungeonProgressDisplay: document.getElementById('dungeon-progress'),
             dungeonBattleArea: document.getElementById('dungeon-battle-area'),
            enemyNameDisplay: document.getElementById('enemy-name'),
             playerHealthDisplay: document.getElementById('player-health'),
            enemyHealthDisplay: document.getElementById('enemy-health'),
            attackButton: document.getElementById('player-attack'), // Добавлено
            dungeonButtons: document.querySelectorAll('.dungeon-button') // Добавлено
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
        },
        profile: { // Добавлено
          profileContainer: document.getElementById('profile-container'),
          profileInfo: document.getElementById('profile-info'),
          profileInventory: document.getElementById('profile-inventory'),
          profileAbilities: document.getElementById('profile-abilities'),
          profileTabButtons: document.querySelectorAll('.profile-tab-button'),
          abilitiesList: document.getElementById('abilities-list')
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
    const displayMessage = (message, color = 'black') => {
        elements.global.messageDisplay.textContent = message;
        elements.global.messageDisplay.style.color = color;
        setTimeout(() => {
            elements.global.messageDisplay.textContent = '';
        }, gameConfig.MESSAGE_DURATION);
    };

    const displayGlobalMessage = (message) => {
        elements.global.globalMessageDisplay.textContent = message;
    };

    // 6. Расчеты
    const calculateClickValue = () => {
       return (gameState.clickValue * gameState.clickUpgradeLevel * calculateClickBonus(gameState.skins)) * gameState.prestigeMultiplier * calculateAbilityBonus('click_bonus', gameState.abilities.click_bonus);
    };

    const calculateAutoClickValue = () => {
        return gameState.autoClickerValue * calculateAutoClickerBonus(gameState.skins);
    };

    const calculateClickBonus = (skins) => {
        let bonus = 1;
        for (const skin in skins) {
            if (gameConfig.SKIN_EFFECTS[skin] && gameConfig.SKIN_EFFECTS[skin].clickValueBonus) {
                bonus += (gameConfig.SKIN_EFFECTS[skin].clickValueBonus - 1) * skins[skin];
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

    // 7. Работа с кликами
    const handleManualClick = () => {
        const clickValue = calculateClickValue();
        gameState.clickCount += clickValue;
        updateClickCountDisplay();

        gameState.experience += 1;
        checkLevelUp();

        saveData();
    };

    const autoClick = () => {
        if (gameState.autoClickerValue > 0) {
            const autoClickValue = calculateAutoClickValue();
            gameState.clickCount += autoClickValue;
            updateClickCountDisplay();

             gameState.experience += 0.5;
            checkLevelUp();

            saveData();
        }
    };

    // 8. Улучшения
    const buyClickUpgrade = () => {
        if (gameState.clickCount >= gameState.clickUpgradeCost) {
            gameState.clickCount -= gameState.clickUpgradeCost;
            gameState.clickValue += 1;
            gameState.clickUpgradeCost = Math.ceil(gameState.clickUpgradeCost * 1.1);
            updateClickCountDisplay();
            updateUpgradeCostDisplay();
            saveData();
            displayMessage('Улучшение клика куплено!', 'green');
        } else {
            displayMessage('Недостаточно кликов!', 'red');


    // 9. Престиж
    const prestige = () => {
        if (gameState.clickCount >= gameState.prestigeCost) {
            gameState.clickCount = 0;
            gameState.clickValue = 1;
            gameState.autoClickerValue = 0;
            gameState.clickUpgradeCost = 10;
            gameState.autoUpgradeCost = 50;
            gameState.clickUpgradeLevel = 1;
            gameState.clickUpgradeLevelCost = 100;
            gameState.prestigeLevel += 1;
            gameState.prestigeMultiplier += 0.1;
            gameState.prestigeCost = Math.ceil(gameConfig.PRESTIGE_BASE_COST * Math.pow(1.5, gameState.prestigeLevel));

            updateClickCountDisplay();
            updateUpgradeCostDisplay();
            updatePrestigeDisplay();
            saveData();
            displayMessage('Престиж выполнен!', 'green');
        } else {
            displayMessage('Недостаточно кликов для престижа!', 'red');
        }
    };

    // 10. Достижения (реализовать логику достижений)
    const checkAchievements = () => {
        // Пример: достижение за 1000 кликов
        if (gameState.clickCount >= 1000 && !gameState.achievements.includes('1000_clicks')) {
            gameState.achievements.push('1000_clicks');
            gameState.achievementCount++;
            updateAchievementsDisplay();
            displayMessage('Достижение: 1000 кликов!', 'green');
            saveData();
        }
    };

    // 11. Магазин
    const buyKey = () => {
        if (gameState.diamonds >= 10) {
            gameState.diamonds -= 10;
            gameState.keys++;
            updateDiamondDisplay();
            updateKeyDisplay();
            saveData();
            displayMessage('Ключ куплен!', 'green');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyCommonChest = () => {
        if (gameState.diamonds >= 50) {
            gameState.diamonds -= 50;
            gameState.chests.common++;
            updateDiamondDisplay();
            updateChestDisplay();
            saveData();
            displayMessage('Обычный сундук куплен!', 'green');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyRareChest = () => {
        if (gameState.diamonds >= 100) {
            gameState.diamonds -= 100;
            gameState.chests.rare++;
            updateDiamondDisplay();
            updateChestDisplay();
            saveData();
            displayMessage('Редкий сундук куплен!', 'green');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    const buyEpicChest = () => {
        if (gameState.diamonds >= 200) {
            gameState.diamonds -= 200;
            gameState.chests.epic++;
            updateDiamondDisplay();
            updateChestDisplay();
            saveData();
            displayMessage('Эпический сундук куплен!', 'green');
        } else {
            displayMessage('Недостаточно алмазов!', 'red');
        }
    };

    // Функция для генерации случайного числа в диапазоне
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomItemByRarity = (rarityConfig) => {
        const rand = Math.random();
        let cumulativeProbability = 0;

        for (const rarity in rarityConfig) {
            cumulativeProbability += rarityConfig[rarity];
            if (rand < cumulativeProbability) {
                return rarity;
            }
        }
        return 'common'; // Default to common if something goes wrong
    };

    const getWeightedRandomItem = (items, weights) => {
        const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
        let randomNum = Math.random() * totalWeight;

        for (let i = 0; i < items.length; i++) {
            randomNum -= weights[i];
            if (randomNum < 0) {
                return items[i];
            }
        }
        return items[items.length - 1];
    };

     // Функция для открытия сундука
    const openChest = () => {
        let chestType = null;
        if (gameState.chests.epic > 0) {
            chestType = 'epic';
        } else if (gameState.chests.rare > 0) {
            chestType = 'rare';
        } else if (gameState.chests.common > 0) {
            chestType = 'common';
        }

        if (chestType) {
            gameState.chestContainer.style.display = 'block';
            gameState.chestItemsDisplay.innerHTML = '';
            gameState.chestType = chestType; // Сохраняем тип открываемого сундука

            gameState.chests[chestType]--;
            updateChestDisplay();

            let items = [];
            let message = '';

            switch (chestType) {
                case 'common':
                    items = openCommonChest();
                    break;
                case 'rare':
                    items = openRareChest();
                    break;
                case 'epic':
                    items = openEpicChest();
                    break;
            }

            items.forEach(item => {
                const itemElement = document.createElement('div');
                let imageName = item;
                if (item.startsWith('skin_') || item.startsWith('artifact_')) {
                    imageName = item + '.jpg';
                }
                itemElement.innerHTML = `<div>${getImageTag(item, imageName)}</div><div>${item}</div>`;
                gameState.chestItemsDisplay.appendChild(itemElement);
            });

            saveData();

            displayMessage(message, 'green');
        } else {
            displayMessage('Нет сундуков для открытия!', 'red');
        }
    };

    const getImageTag = (item, imageName, altText = '') => {
      return `<img src="img/${imageName}" alt="${altText}" onerror="this.onerror=null;this.src='img/default.jpg';" style="width: 50px; height: 50px;">`;
    };

    const openCommonChest = () => {
      const items = [];

        // Шанс получить скин или алмазы
      if (Math.random() < 0.5) {
          // Получаем скин
          const skinRarity = getRandomItemByRarity(gameConfig.SKIN_RARITY_CHANCE);
          let availableSkins = Object.keys(gameConfig.SKIN_RARITY).filter(skin => gameConfig.SKIN_RARITY[skin] === skinRarity);
          if (availableSkins.length > 0) {
              const skin = availableSkins[Math.floor(Math.random() * availableSkins.length)];
              gameState.skins[skin] = (gameState.skins[skin] || 0) + 1;
              items.push(skin);
          }
      } else {
          // Получаем алмазы
          const diamondReward = getRandomInt(1, 5);
          gameState.diamonds += diamondReward;
          items.push(`${diamondReward} алмазов`);
      }

      return items;
    };

    const openRareChest = () => {
        const items = [];

        // Шанс получить несколько предметов
        const numberOfItems = getRandomInt(1, 2);

        for (let i = 0; i < numberOfItems; i++) {
            // Шанс получить скин или артефакт
            if (Math.random() < 0.6) {
                const skinRarity = getRandomItemByRarity({ uncommon: 0.7, rare: 0.3 });
                let availableSkins = Object.keys(gameConfig.SKIN_RARITY).filter(skin => gameConfig.SKIN_RARITY[skin] === skinRarity);
                if (availableSkins.length > 0) {
                    const skin = availableSkins[Math.floor(Math.random() * availableSkins.length)];
                    gameState.skins[skin] = (gameState.skins[skin] || 0) + 1;
                    items.push(skin);
                }
            } else {
                const artifactRarity = getRandomItemByRarity({ common: 0.5, uncommon: 0.5 });
                let availableArtifacts = Object.keys(gameConfig.ARTIFACT_RARITY).filter(artifact => gameConfig.ARTIFACT_RARITY[artifact] === artifactRarity);
                if (availableArtifacts.length > 0) {
                    const artifact = availableArtifacts[Math.floor(Math.random() * availableArtifacts.length)];
                    gameState.artifacts[artifact] = (gameState.artifacts[artifact] || 0) + 1;
                    items.push(artifact);
                }
            }
        }

        // Дополнительный шанс получить алмазы
        if (Math.random() < 0.3) {
            const diamondReward = getRandomInt(10, 20);
            gameState.diamonds += diamondReward;
            items.push(`${diamondReward} алмазов`);
        }

        return items;
    };

    const openEpicChest = () => {
        const items = [];

        // Гарантированное количество предметов
        const numberOfItems = getRandomInt(2, 3);

        for (let i = 0; i < numberOfItems; i++) {
            // Более высокий шанс получить редкие и эпические предметы
            if (Math.random() < 0.7) {
                const artifactRarity = getRandomItemByRarity({ uncommon: 0.3, rare: 0.5, epic: 0.2 });
                 let availableArtifacts = Object.keys(gameConfig.ARTIFACT_RARITY).filter(artifact => gameConfig.ARTIFACT_RARITY[artifact] === artifactRarity);
                if (availableArtifacts.length > 0) {
                    const artifact = availableArtifacts[Math.floor(Math.random() * availableArtifacts.length)];
                    gameState.artifacts[artifact] = (gameState.artifacts[artifact] || 0) + 1;
                    items.push(artifact);
                }
            } else {
                const skinRarity = getRandomItemByRarity({ uncommon: 0.3, rare: 0.5, epic: 0.2 });
                 let availableSkins = Object.keys(gameConfig.SKIN_RARITY).filter(skin => gameConfig.SKIN_RARITY[skin] === skinRarity);
                if (availableSkins.length > 0) {
                    const skin = availableSkins[Math.floor(Math.random() * availableSkins.length)];
                    gameState.skins[skin] = (gameState.skins[skin] || 0) + 1;
                    items.push(skin);
                }
            }
        }

        // Очень высокий шанс получить алмазы
        if (Math.random() < 0.8) {
            const diamondReward = getRandomInt(20, 50);
            gameState.diamonds += diamondReward;
            items.push(`${diamondReward} алмазов`);
        }

        return items;
    };

    const closeChest = () => {
        gameState.chestContainer.style.display = 'none';
        //  updateInventoryDisplay();
        profileModule.updateInventoryDisplay();
       // updateDisplay();
        profileModule.updateDisplay();
        saveData();
    };

    // 12. Экспедиции
    const startExpedition = (type) => {
        if (gameState.activeExpedition) {
            displayMessage('У вас уже есть активная экспедиция!', 'red');
            return;
        }

        if (gameState.diamonds < gameConfig.EXPEDITION_COSTS[type]) {
            displayMessage('Недостаточно алмазов для этой экспедиции!', 'red');
            return;
        }

        gameState.diamonds -= gameConfig.EXPEDITION_COSTS[type];
        updateDiamondDisplay();

        gameState.activeExpedition = type;
        gameState.expeditionStartTime = Date.now();
        gameState.expeditionDuration = gameConfig.EXPEDITION_DURATIONS[type] * calculateAbilityBonus('expedition_speed', gameState.abilities.expedition_speed);
        gameState.expeditionReward = getRandomInt(gameConfig.EXPEDITION_REWARDS[type][0], gameConfig.EXPEDITION_REWARDS[type][1]);

        updateExpeditionProgressBar();
        saveData();
    };

    const finishExpedition = () => {
        gameState.activeExpedition = null;
        gameState.diamonds += gameState.expeditionReward * calculateAbilityBonus('diamond_bonus', gameState.abilities.diamond_bonus);
        updateDiamondDisplay();
        updateExpeditionProgressBar();
        displayMessage(`Экспедиция завершена! Получено ${gameState.expeditionReward} алмазов.`, 'green');
        saveData();
    };
    // 13. Подземелья
     const startDungeon = (type) => {
        if (gameState.activeDungeon) {
            displayMessage('У вас уже есть активное подземелье!', 'red');
            return;
        }
        if (gameState.keys < gameConfig.DUNGEON_CONFIG[type].cost) {
             displayMessage('Недостаточно ключей для этого подземелья!', 'red');
              return;
        }

        gameState.keys -= gameConfig.DUNGEON_CONFIG[type].cost;
        updateKeyDisplay();

        gameState.activeDungeon = type;
        gameState.dungeonStartTime = Date.now();
        gameState.dungeonDuration = gameConfig.DUNGEON_CONFIG[type].duration * calculateAbilityBonus('dungeon_speed', gameState.abilities.dungeon_speed);

        // Initialize dungeon state
        gameState.dungeonState.currentWave = 0;
        gameState.dungeonState.playerHealth = 100;
        gameState.dungeonState.waves = [...gameConfig.DUNGEON_CONFIG[type].waves]; // Copy the waves array
         gameState.dungeonRewards = { ...gameConfig.DUNGEON_CONFIG[type].rewards }; // Copy the rewards object

         // Initialize enemy for the first wave
        if (gameState.dungeonState.waves.length > 0) {
            const currentWave = gameState.dungeonState.waves[0];
            gameState.dungeonState.enemyName = currentWave.enemyName;
            gameState.dungeonState.enemyHealth = currentWave.enemyHealth;
        }
        updateDungeonProgressBar();
        saveData();
    };

      const finishDungeon = () => {
        const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
        if (!dungeonConfig) {
            console.error('Не найдена конфигурация подземелья для:', gameState.activeDungeon);
            return;
        }
        gameState.activeDungeon = null;
        let rewardsMessage = 'Подземелье завершено! Награды: ';
         let earnedDiamonds = 0;
         let earnedKeys = 0;
         let earnedExperience = 0;

         const rewards = dungeonConfig.rewards;

       if (rewards.diamonds) {
          const diamondReward = getRandomInt(rewards.diamonds[0], rewards.diamonds[1]);
           gameState.diamonds += diamondReward;
           earnedDiamonds = diamondReward;
        }

        if (rewards.keys) {
          const keyReward = getRandomInt(rewards.keys[0], rewards.keys[1]);
            gameState.keys += keyReward;
           earnedKeys = keyReward;
        }
       if (rewards.experience) {
            const experienceReward = getRandomInt(rewards.experience[0], rewards.experience[1]);
             gameState.experience += experienceReward;
             earnedExperience = experienceReward;
           checkLevelUp();
        }

    const possibleArtifacts = rewards.artifacts ? Object.keys(rewards.artifacts) : [];
    if (possibleArtifacts.length > 0) {
        const luckBonus = calculateAbilityBonus('dungeon_luck', gameState.abilities.dungeon_luck);
        for (const rarity of possibleArtifacts) {
            const [min, max] = rewards.artifacts[rarity];
            const numArtifacts = getRandomInt(min, max);
            for (let i = 0; i < numArtifacts; i++) {
                // Filter artifacts by rarity
                const availableArtifacts = Object.keys(gameConfig.ARTIFACT_RARITY).filter(artifact => gameConfig.ARTIFACT_RARITY[artifact] === rarity);
                if (availableArtifacts.length > 0) {
                    const artifact = availableArtifacts[Math.floor(Math.random() * availableArtifacts.length)];
                     gameState.artifacts[artifact] = (gameState.artifacts[artifact] || 0) + 1;
                     rewardsMessage += `Артефакт: ${artifact} `;
                }
            }
        }
    }
    const possibleSkins = rewards.skins ? Object.keys(rewards.skins) : [];
      if (possibleSkins.length > 0) {
        const luckBonus = calculateAbilityBonus('dungeon_luck', gameState.abilities.dungeon_luck);
        for (const rarity of possibleSkins) {
            const [min, max] = rewards.skins[rarity];
            const numSkins = getRandomInt(min, max);
            for (let i = 0; i < numSkins; i++) {
                // Filter artifacts by rarity
                const availableSkins = Object.keys(gameConfig.SKIN_RARITY).filter(skin => gameConfig.SKIN_RARITY[skin] === rarity);
                if (availableSkins.length > 0) {
                    const skin = availableSkins[Math.floor(Math.random() * availableSkins.length)];
                     gameState.skins[skin] = (gameState.skins[skin] || 0) + 1;
                     rewardsMessage += `Скин: ${skin} `;
                }
            }
        }
    }

        updateDiamondDisplay();
         updateKeyDisplay();
         updateDungeonProgressBar();
          profileModule.updateInventoryDisplay();

        displayMessage(rewardsMessage, 'green');
        saveData();
    };

    const playerAttack = () => {
        if (!gameState.activeDungeon) return;

        const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
        if (!dungeonConfig) return;

        const clickValue = calculateClickValue();

        // Уменьшаем здоровье врага
        gameState.dungeonState.enemyHealth -= clickValue;

        // Проверяем, побежден ли враг
        if (gameState.dungeonState.enemyHealth <= 0) {
            // Переходим к следующей волне
            gameState.dungeonState.currentWave++;

            // Проверяем, остались ли еще волны
            if (gameState.dungeonState.currentWave < dungeonConfig.waves.length) {
                // Initialize enemy for the next wave
                const currentWave = dungeonConfig.waves[gameState.dungeonState.currentWave];
                gameState.dungeonState.enemyName = currentWave.enemyName;
                gameState.dungeonState.enemyHealth = currentWave.enemyHealth;
            } else {
                // Если все волны пройдены, завершаем подземелье
                finishDungeon();
                return;
            }
        }

        // Враг атакует игрока
        enemyAttack();

        // Обновляем UI
        updateDungeonBattleUI();

        saveData();
    };
    const enemyAttack = () => {
        if (!gameState.activeDungeon) return;

        const dungeonConfig = gameConfig.DUNGEON_CONFIG[gameState.activeDungeon];
        if (!dungeonConfig) return;

        const currentWave = dungeonConfig.waves[gameState.dungeonState.currentWave];
        if (!currentWave) return;

        const enemyDamage = currentWave.attackDamage;
        gameState.dungeonState.playerHealth -= enemyDamage;

        if (gameState.dungeonState.playerHealth <= 0) {
            gameState.activeDungeon = null;
             displayMessage('Вы проиграли в подземелье!', 'red');
        }

        updateDungeonBattleUI();
        saveData();
    };

    const updateDungeonBattleUI = () => {
        if (!gameState.activeDungeon) return;
        elements.dungeon.enemyNameDisplay.textContent = `Враг: ${gameState.dungeonState.enemyName}`;
        elements.dungeon.playerHealthDisplay.textContent = `Здоровье игрока: ${gameState.dungeonState.playerHealth}`;
        elements.dungeon.enemyHealthDisplay.textContent = `Здоровье врага: ${gameState.dungeonState.enemyHealth}`;
    };

    // 14. Управление инвентарем
    const createItemPopup = (type, itemKey, itemName, quantity, rarity, bonuses) => {
        const popup = document.createElement('div');
        popup.classList.add('item-popup');
         popup.innerHTML = `
            <div class="popup-content">
               <span class="close-popup">&times;</span>
                <h3>${itemName}</h3>
                <p>Количество: ${quantity}</p>
                <p>Редкость: ${rarity}</p>
                 ${bonuses ? `<p>Бонусы:\n${bonuses}</p>` : ''}
            </div>
        `;
        document.body.appendChild(popup);
        // Close the popup when the close button is clicked
        popup.querySelector('.close-popup').addEventListener('click', () => {
            document.body.removeChild(popup);
        });
    };
   // 15. Профиль

    const checkLevelUp = () => {
        const requiredExperience = gameConfig.LEVEL_UP_BASE_EXP * Math.pow(1.5, gameState.level - 1);
         if (gameState.experience >= requiredExperience) {
             gameState.experience -= requiredExperience;
             gameState.level++;
              gameState.levelPoints += 1;
               displayMessage(`Поздравляем! Вы достигли ${gameState.level} уровня!`, 'green');
               profileModule.updateDisplay();
             checkLevelUp();
         }
    };

    // 16. Обработчики событий
    elements.clicker.clickButton.addEventListener('click', handleManualClick);
    elements.clicker.upgradeClickButton.addEventListener('click', buyClickUpgrade);
    elements.clicker.upgradeAutoButton.addEventListener('click', buyAutoClicker);
    elements.clicker.upgradeClickLevelButton.addEventListener('click', buyClickLevelUpgrade);
    elements.shop.prestigeButton.addEventListener('click', prestige);
    elements.shop.buyKeyButton.addEventListener('click', buyKey);
    elements.shop.buyCommonChestButton.addEventListener('click', buyCommonChest);
    elements.shop.buyRareChestButton.addEventListener('click', buyRareChest);
    elements.shop.buyEpicChestButton.addEventListener('click', buyEpicChest);
    elements.shop.openChestButton.addEventListener('click', openChest);
    elements.shop.closeChestButton.addEventListener('click', closeChest);
    elements.dungeon.attackButton.addEventListener('click', playerAttack);

    // Добавляем обработчики событий для кнопок экспедиций
    elements.map.expeditionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            startExpedition(type);
        });
    });
     // Добавляем обработчики событий для кнопок подземелий
    elements.dungeon.dungeonButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            startDungeon(type);
        });
    });
    // Menu functionality
    elements.menu.menuButton.addEventListener('click', () => {
        elements.menu.menu.classList.toggle('active');
    });

    elements.menu.menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target.dataset.target;
            if (target === 'clicker') {
                elements.profile.profileContainer.style.display = 'none';
                profileModule.hideProfile();
                elements.clickerContent.style.display = 'block';
                elements.gameContent.style.display = 'none';
                elements.inventory.inventoryContainer.style.display = 'none';
            } else if (target === 'game') {
                elements.profile.profileContainer.style.display = 'none';
                 profileModule.hideProfile();
                elements.clickerContent.style.display = 'none';
                elements.gameContent.style.display = 'block';
                elements.inventory.inventoryContainer.style.display = 'none';
            } else if (target === 'inventory') {
                elements.profile.profileContainer.style.display = 'none';
                profileModule.hideProfile();
                elements.clickerContent.style.display = 'none';
                elements.gameContent.style.display = 'none';
                elements.inventory.inventoryContainer.style.display = 'block';
                profileModule.updateInventoryDisplay();
            } else if (target === 'profile') {
                elements.clickerContent.style.display = 'none';
                elements.gameContent.style.display = 'none';
                elements.inventory.inventoryContainer.style.display = 'none';
                profileModule.showProfile();
                elements.profile.profileContainer.style.display = 'block';
                profileModule.updateDisplay();
            }
            elements.menu.menu.classList.remove('active');
        });
    });
    elements.menu.resetButton.addEventListener('click', () => {
        resetGame();
    });
    const updateExpeditionButtonInfo = () => {
        elements.map.expeditionButtons.forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.EXPEDITION_COSTS[type];
            button.textContent = `${gameConfig.EXPEDITION_TYPES[type]} ( ${cost} алмазов)`;
             if (gameState.diamonds < cost) {
                 button.disabled = true;
             } else {
                 button.disabled = false;
             }
        });
    };

      const updateDungeonButtonInfo = () => {
        elements.dungeon.dungeonButtons.forEach(button => {
            const type = button.dataset.type;
            const cost = gameConfig.DUNGEON_CONFIG[type].cost;
            button.textContent = `${gameConfig.DUNGEON_CONFIG[type].name} ( ${cost} ключей)`;
             if (gameState.keys < cost) {
                 button.disabled = true;
             } else {
                 button.disabled = false;
             }
        });
    };
    // 17. Сохранение и загрузка
    const saveData = () => {
        localStorage.setItem(gameConfig.SAVE_KEY, JSON.stringify(gameState));

         if (tWebApp) {
            tWebApp.CloudStorage.setItem(gameConfig.SAVE_KEY, JSON.stringify(gameState), (success, result) => {
               if (success) {
                     console.log("Data saved to Telegram Cloud Storage");
                } else {
                 console.error("Failed to save data to Telegram Cloud Storage:", result);
                }
            });
        }
    };
    const loadData = () => {
         const savedData = localStorage.getItem(gameConfig.SAVE_KEY);
         if (savedData) {
             gameState = JSON.parse(savedData);
         }
        if (tWebApp) {
            tWebApp.CloudStorage.getItem(gameConfig.SAVE_KEY, (success, result) => {
              if (success) {
                   if (result) {
                        gameState = JSON.parse(result);
                  }
                  updateDisplay();
                   profileModule.updateDisplay();
               } else {
                  console.error("Failed to load data from Telegram Cloud Storage:", result);
              }
           });
        }
    };

    const resetGame = () => {
        localStorage.removeItem(gameConfig.SAVE_KEY);

        if (tWebApp) {
           tWebApp.CloudStorage.removeItem(gameConfig.SAVE_KEY, (success, result) => {
                if (success) {
                    console.log("Data removed from Telegram Cloud Storage");
               } else {
                   console.error("Failed to remove data from Telegram Cloud Storage:", result);
               }
           });
       }

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
    };
    // 18. Инициализация
    loadData();

    // Запускаем авто-кликер
    gameState.autoClickerInterval = setInterval(autoClick, gameConfig.AUTO_CLICK_INTERVAL);

     // Инициализируем вкладки профиля при загрузке страницы
      profileModule.init();
     // Первоначальное скрытие профиля
    profileModule.hideProfile();

    // Первоначальное обновление информации об экспедициях
    updateExpeditionButtonInfo();
      updateDungeonButtonInfo();

    // Запускаем интервал для обновления прогресса экспедиции
    setInterval(updateExpeditionProgressBar, 1000); // Обновление каждую секунду
    setInterval(updateDungeonProgressBar, 1000); // Обновление каждую секунду

    //  updateInventoryDisplay();
    profileModule.updateInventoryDisplay();
    updateDisplay();
}); 