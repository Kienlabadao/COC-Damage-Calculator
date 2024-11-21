// Enable this to stop defense div from generating for testing
const stopGenerateDefenseDiv = false;
const type = "advance";
const actionListMaxSize = 30;

const deathDamageImage = "/images/other/death.webp";
const attackImage = "/images/other/attack.webp";
const repairImage = "/images/other/repair.webp";
const hardModeTextImage = "/images/other/hardmode.webp";
const hardModeIconImage = "/images/other/hardmodeicon.webp";
const eqIcon = "/images/other/earthquake_icon.webp";

const eqSpellKey = "earthquake_spell";
const rageSpellTowerKey = "rage_spell_tower";
const hideDestroyedDefensesKey = "hideDestroyedDefenses";
const hideSurvivedDefensesKey = "hideSurvivedDefenses";

const defensesSection = document.getElementById("defenses");
let defenseDivs = [];
const offensesSection = document.getElementById("offenses");
const spellDivs = offensesSection.querySelectorAll(".offense.spell");
const heroSections = offensesSection.querySelectorAll(".hero-section");
const troopDivs = offensesSection.querySelectorAll(".offense.troop");
const repairDivs = offensesSection.querySelectorAll(".offense.repair");
const modifierDivs = offensesSection.querySelectorAll(".modifier.modifier-obj");
const actionListDetailDiv = document.getElementById("actionListDetail");
const useTroopDeathDamageCheckbox = document.getElementById("useTroopDeathDamage");
const hideDestroyedDefensesCheckbox = document.getElementById(hideDestroyedDefensesKey);
const hideSurvivedDefensesCheckbox = document.getElementById(hideSurvivedDefensesKey);
const useHardModeCheckbox = document.getElementById("toggleUseHardMode");
const searchDefenseBox = document.getElementById("searchDefense");
const defenseCountBox = document.getElementById("defenseCount");
const actionCountBox = document.getElementById("actionCount");
const statusLimitExceededDiv = document.getElementById("statusLimitExceeded");

let useTroopDeathDamage = LocalStorageUtils.loadBoolean(LocalStorageUtils.getUseTroopDeathDamageKey(type), false);
let isHideDestroyedDefenses = LocalStorageUtils.loadBoolean(hideDestroyedDefensesKey, false);
let isHideSurvivedDefenses = LocalStorageUtils.loadBoolean(hideSurvivedDefensesKey, false);
let useHardMode = LocalStorageUtils.loadBoolean(LocalStorageUtils.getUseHardModeKey(), false);

const offenseListManager = new OffenseListManager();
const modifierListManager = new ModifierListManager();
const defenseListManager = new DefenseListManager();
const actionListManager = new ActionListManager();

// Load the page when JSON is loaded successfully
document.addEventListener('init', () => {
  Hero.HARD_MODE_HEROES_MODIFIER = getHardModeHeroesModifier();

  offenseListManager.loadKey(type);
  modifierListManager.loadKey(type);
  defenseListManager.loadKey(type);
  updateActiveModifier();
  console.log(localStorage);
  console.log(offenseListManager);
  if (!stopGenerateDefenseDiv) {
    for (const defense of defenseListManager.defenseList) {
      loadDefense(defense);
    }
  }
  defenseDivs = defensesSection.querySelectorAll(".defense");
  for (const spell of offenseListManager.getSpellList()) {
    loadSpell(spell);
  }
  for (const hero of offenseListManager.getHeroList()) {
    loadHero(hero);
  }
  for (const troop of offenseListManager.getTroopList()) {
    loadTroop(troop);
  }
  for (const repair of offenseListManager.getRepairList()) {
    loadRepair(repair);
  }
  for (const modifier of modifierListManager.modifierList) {
    loadModifier(modifier);
  }

  useTroopDeathDamageCheckbox.checked = useTroopDeathDamage;
  hideDestroyedDefensesCheckbox.checked = isHideDestroyedDefenses;
  hideSurvivedDefensesCheckbox.checked = isHideSurvivedDefenses;
  useHardModeCheckbox.checked = useHardMode;

  updateAllOffensesModifier();
  hideActionList();
  updateActionCount(actionListManager.getLength());
  filterDefenses();
});

// Load spell div with saved data
function loadSpell(spell) {
  if (spell instanceof Spell) {
    const spellID = spell.offenseID;
    const isDonated = spell.isDonated;
    const imagePath = spell.getImagePath();
    const currentLevelPos = spell.currentLevelPos;
    const maxLevelPos = spell.maxLevelPos;
    const minLevelPos = 0;
    
    spellDivs.forEach((spellDiv) => {
      if (HTMLUtil.getDataID(spellDiv) === spellID && HTMLUtil.getDataDonated(spellDiv) === isDonated) {
        const levelOverlayDiv = spellDiv.querySelector(".level");
        const imgContainer = spellDiv.querySelector(".image");
        const levelSlider = spellDiv.querySelector(".slider");

        levelOverlayDiv.textContent = spell.getCurrentLevel();
        imgContainer.src = imagePath;
        levelSlider.min = minLevelPos;
        levelSlider.max = maxLevelPos;
        levelSlider.value = currentLevelPos;

        if (spell.isMaxLevel()) {            
          HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
        } else {
          HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
        }

        return;
      }
    });  
  } else {
    throw new TypeError(`Invalid spell: ${spell}`);
  }
}

// Load hero div with saved data
function loadHero(hero) {
  if (hero instanceof Hero) {
    const heroID = hero.offenseID;
    const imagePath = hero.getImagePath();
    const currentLevelPos = hero.currentLevelPos;
    const maxLevelPos = hero.maxLevelPos;
    const minLevelPos = 0;
    
    heroSections.forEach((heroSection) => {
      if (HTMLUtil.getDataID(heroSection) === heroID) {
        const heroLevelDiv = heroSection.querySelector(".hero-level");
        const heroLevelImgContainer = heroLevelDiv.querySelector(".image");
        const heroLevelLevelOverlayDiv = heroLevelDiv.querySelector(".level");
        const levelSlider = heroLevelDiv.querySelector(".slider");
        const attackSpeedDiv = heroLevelDiv.querySelector(".attack-speed");

        const heroAttackDiv = heroSection.querySelector(".hero-attack");
        const heroAttackImgContainer = heroAttackDiv.querySelector(".image");
        const heroAttackLevelOverlayDiv = heroAttackDiv.querySelector(".level");
                
        heroLevelLevelOverlayDiv.textContent = hero.getCurrentLevel();
        heroAttackLevelOverlayDiv.textContent = hero.getCurrentLevel();

        heroLevelImgContainer.src = imagePath;
        heroAttackImgContainer.src = imagePath;

        levelSlider.min = minLevelPos;
        levelSlider.max = maxLevelPos;
        levelSlider.value = currentLevelPos;

        attackSpeedDiv.textContent = `${hero.attackSpeed}s`;

        if (hero.isMaxLevel()) {            
          HTMLUtil.addLevelOverlayMaxedClass(heroLevelLevelOverlayDiv);
          HTMLUtil.addLevelOverlayMaxedClass(heroAttackLevelOverlayDiv);
        } else {
          HTMLUtil.removeLevelOverlayMaxedClass(heroLevelLevelOverlayDiv);
          HTMLUtil.removeLevelOverlayMaxedClass(heroAttackLevelOverlayDiv);
        }

        loadEquipment(hero, heroSection);
        return;
      }
    });
  } else {
    throw new TypeError(`Invalid hero: ${hero}`);
  }
}

// Load equipment div with saved data
function loadEquipment(hero, heroSection) {
  if (hero instanceof Hero) {
    const equipmentListManager = hero.equipmentListManager;
    const equipmentListDivs = heroSection.querySelector(".equipment-list");

    for (const equipment of equipmentListManager.equipmentList) {
      const imagePath = equipment.getImagePath();
      const currentLevelPos = equipment.currentLevelPos;
      const maxLevelPos = equipment.maxLevelPos;
      const minLevelPos = 0;

      const equipmentDiv = AdvanceHTMLUtil.createEquipmentDiv(equipment);
      const levelOverlayDiv = equipmentDiv.querySelector(".level");
      const imgContainer = equipmentDiv.querySelector(".image");
      const levelSlider = equipmentDiv.querySelector(".slider");
      const useCheckbox = equipmentDiv.querySelector(".useCheckbox");
      
      levelOverlayDiv.textContent = equipment.getCurrentLevel();
      imgContainer.src = imagePath;
      levelSlider.min = minLevelPos;
      levelSlider.max = maxLevelPos;
      levelSlider.value = currentLevelPos;
      useCheckbox.checked = equipment.isEnabled;

      if (equipment.isEquipmentTypeAttack() || equipment.isEquipmentTypeDamage()) {
        const collapseDiv = equipmentDiv.querySelector(".collapse");
        if (equipment.isEnabled) {
          HTMLUtil.toggleBSCollapse(collapseDiv, true);
        } else {
          HTMLUtil.toggleBSCollapse(collapseDiv, false);
        }
      }
      
      if (equipment.isMaxLevel()) {            
        HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
      } else {
        HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
      }

      equipmentListDivs.appendChild(equipmentDiv);
    }
  } else {
    throw new TypeError(`Invalid hero: ${hero}`);
  }
}

// Load troop div with saved data
function loadTroop(troop) {
  if (troop instanceof Troop) {
    const troopID = troop.offenseID;
    const imagePath = troop.getImagePath();
    const currentLevelPos = troop.currentLevelPos;
    const maxLevelPos = troop.maxLevelPos;
    const minLevelPos = 0;

    troopDivs.forEach((troopDiv) => {
      if (HTMLUtil.getDataID(troopDiv) === troopID) {
        const levelOverlayDiv = troopDiv.querySelector(".level");
        const imgContainer = troopDiv.querySelector(".image");
        const levelSlider = troopDiv.querySelector(".slider");
  
        levelOverlayDiv.textContent = troop.getCurrentLevel();
        imgContainer.src = imagePath;
        levelSlider.min = minLevelPos;
        levelSlider.max = maxLevelPos;
        levelSlider.value = currentLevelPos;
        
        if (troop.isMaxLevel()) {            
          HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
        } else {
          HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
        }

        return;
      }
    });
  } else {
    throw new TypeError(`Invalid troop: ${troop}`);
  }
}

// Load repair div with saved data
function loadRepair(repair) {
  if (repair instanceof Repair) {
    const repairID = repair.offenseID;
    const imagePath = repair.getImagePath();
    const currentLevelPos = repair.currentLevelPos;
    const maxLevelPos = repair.maxLevelPos;
    const minLevelPos = 0;
    
    repairDivs.forEach((repairDiv) => {
      if (HTMLUtil.getDataID(repairDiv) === repairID) {
        const levelOverlayDiv = repairDiv.querySelector(".level");
        const imgContainer = repairDiv.querySelector(".image");
        const levelSlider = repairDiv.querySelector(".slider");
  
        levelOverlayDiv.textContent = repair.getCurrentLevel();
        imgContainer.src = imagePath;
        levelSlider.min = minLevelPos;
        levelSlider.max = maxLevelPos;
        levelSlider.value = currentLevelPos;
        
        if (repair.isMaxLevel()) {            
          HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
        } else {
          HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
        }

        return;
      }
    });
  } else {
    throw new TypeError(`Invalid repair: ${repair}`);
  }
}

// Load modifier div with saved data
function loadModifier(modifier) {
  if (modifier instanceof Modifier) {
    const modifierID = modifier.modifierID;
    const imagePath = modifier.getImagePath();
    const currentLevelPos = modifier.currentLevelPos;
    const maxLevelPos = modifier.maxLevelPos;
    const minLevelPos = 0;
    
    modifierDivs.forEach((modifierDiv) => {
      if (HTMLUtil.getDataID(modifierDiv) === modifierID) {
        const imgContainer = modifierDiv.querySelector(".image");     
        const useModifierCheckbox = modifierDiv.querySelector(`.checkbox`);
         
        imgContainer.src = imagePath;
        useModifierCheckbox.checked = modifier.isActive;
        if (modifierID !== rageSpellTowerKey) {
          const levelOverlayDiv = modifierDiv.querySelector(".level");
          const levelSlider = modifierDiv.querySelector(".slider");

          levelOverlayDiv.textContent = modifier.getCurrentLevel();
          levelSlider.min = minLevelPos;
          levelSlider.max = maxLevelPos;
          levelSlider.value = currentLevelPos;

          if (modifier.isMaxLevel()) {
            HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
          } else {
            HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
          }
        }

        updateModifierModify(modifierDiv);
        return;
      }
    });
  } else {
    throw new TypeError(`Invalid modifier: ${modifier}`);
  }
}

// Load defense div with saved data
function loadDefense(defense) {
  if (defense instanceof Defense) {
    defensesSection.appendChild(AdvanceHTMLUtil.createDefenseDiv(defense));
  } else {
    throw new TypeError(`Invalid defense: ${defense}`);
  }
}