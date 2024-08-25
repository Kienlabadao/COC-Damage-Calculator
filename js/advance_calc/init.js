// Enable this to stop defense div from generating for testing
const devMode = false;
const type = "advance";
const actionListMaxSize = 30;

const deathDamageImage = "/images/other/death.webp";
const attackImage = "/images/other/attack.webp";
const repairImage = "/images/other/repair.webp";
const eqIcon = "/images/other/earthquake_icon.webp";

const rageSpellTowerKey = "rage_spell_tower";
const hideDestroyedDefensesKey = "hideDestroyedDefenses";
const hideSurvivedDefensesKey = "hideSurvivedDefenses";
const showActionDetailKey = "showActionDetail";

const defensesSection = document.getElementById("defenses");
let defenseDivs = [];
const offensesSection = document.getElementById("offenses");
const spellDivs = offensesSection.querySelectorAll(".offense.spell");
const equipmentDivs = offensesSection.querySelectorAll(".offense.equipment");
const troopDivs = offensesSection.querySelectorAll(".offense.troop");
const repairDivs = offensesSection.querySelectorAll(".offense.repair");
const modifierDivs = offensesSection.querySelectorAll(".modifier.modifier-obj");
const actionListDiv = document.getElementById("actionList");
const actionListDetailDiv = document.getElementById("actionListDetail");
const useTroopDeathDamageCheckbox = document.getElementById("useTroopDeathDamage");
const hideDestroyedDefensesCheckbox = document.getElementById(hideDestroyedDefensesKey);
const hideSurvivedDefensesCheckbox = document.getElementById(hideSurvivedDefensesKey);
const showActionDetailCheckbox = document.getElementById("showDetailActionList");
const searchDefenseBox = document.getElementById("searchDefense");
const defenseCountBox = document.getElementById("defenseCount");
const actionCountBox = document.getElementById("actionCount");
const statusLimitExceededDiv = document.getElementById("statusLimitExceeded");

let useTroopDeathDamage = LocalStorageUtils.loadBoolean(LocalStorageUtils.getUseTroopDeathDamageKey(type), false);
let isHideDestroyedDefenses = LocalStorageUtils.loadBoolean(hideDestroyedDefensesKey, false);
let isHideSurvivedDefenses = LocalStorageUtils.loadBoolean(hideSurvivedDefensesKey, false);
let showActionDetail = LocalStorageUtils.loadBoolean(showActionDetailKey, false);

const offenseListManager = new OffenseListManager();
const modifierListManager = new ModifierListManager();
const defenseListManager = new DefenseListManager();
const actionListManager = new ActionListManager();

// Load the page when JSON is loaded successfully
document.addEventListener('init', () => {
  offenseListManager.loadKey(type);
  modifierListManager.loadKey(type);
  defenseListManager.loadKey(type);

  if (!devMode) {
    for (const defense of defenseListManager.defenseList) {
      loadDefense(defense);
    }
  }
  defenseDivs = defensesSection.querySelectorAll(".defense");
  for (const spell of offenseListManager.getSpellList()) {
    loadSpell(spell);
  }
  for (const equipment of offenseListManager.getEquipmentList()) {
    loadEquipment(equipment);
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
  showActionDetailCheckbox.checked = showActionDetail;

  updateOverlay();
  hideActionList();
  updateActionCount(actionListManager.getLength());
  filterDefenses();
  toggleShowActionListType();
});

function loadSpell(spell) {
  if (spell instanceof Spell) {
    const spellID = spell.offenseID;
    const isDonated = spell.isDonated;
    const imagePath = spell.getImagePath();
    const currentLevelPos = spell.currentLevelPos;
    const maxLevelPos = spell.maxLevelPos;
    const minLevelPos = 1;
    
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
      }
    });  
  } else {
    throw new Error(`Invalid spell: ${spell}`);
  }
}

// Load equipment div with saved data
function loadEquipment(equipment) {
  if (equipment instanceof Equipment) {
    const equipmentID = equipment.offenseID;
    const imagePath = equipment.getImagePath();
    const currentLevelPos = equipment.currentLevelPos;
    const maxLevelPos = equipment.maxLevelPos;
    const minLevelPos = 1;

    equipmentDivs.forEach((equipmentDiv) => {
      if (HTMLUtil.getDataID(equipmentDiv) === equipmentID) {
        const levelOverlayDiv = equipmentDiv.querySelector(".level");
        const imgContainer = equipmentDiv.querySelector(".image");
        const levelSlider = equipmentDiv.querySelector(".slider");
  
        levelOverlayDiv.textContent = equipment.getCurrentLevel();
        imgContainer.src = imagePath;
        levelSlider.min = minLevelPos;
        levelSlider.max = maxLevelPos;
        levelSlider.value = currentLevelPos;
        
        if (equipment.isMaxLevel()) {            
          HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
        } else {
          HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
        }
      }
    });
  } else {
    throw new Error(`Invalid equipment: ${equipment}`);
  }
}

// Load troop div with saved data
function loadTroop(troop) {
  if (troop instanceof Troop) {
    const troopID = troop.offenseID;
    const imagePath = troop.getImagePath();
    const currentLevelPos = troop.currentLevelPos;
    const maxLevelPos = troop.maxLevelPos;
    const minLevelPos = 1;

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
      }
    });
  } else {
    throw new Error(`Invalid troop: ${troop}`);
  }
}

// Load modifier div with saved data
function loadModifier(modifier) {
  if (modifier instanceof Modifier) {
    const modifierID = modifier.modifierID;
    const imagePath = modifier.getImagePath();
    const currentLevelPos = modifier.currentLevelPos;
    const maxLevelPos = modifier.maxLevelPos;
    const minLevelPos = 1;
    
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
      }
    });
  } else {
    throw new Error(`Invalid modifier: ${modifier}`);
  }
}

// Load repair div with saved data
function loadRepair(repair) {
  if (repair instanceof Repair) {
    const repairID = repair.offenseID;
    const imagePath = repair.getImagePath();
    const currentLevelPos = repair.currentLevelPos;
    const maxLevelPos = repair.maxLevelPos;
    const minLevelPos = 1;
    
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
      }
    });
  } else {
    throw new Error(`Invalid repair: ${repair}`);
  }
}

// Load defense div with saved data
function loadDefense(defense) {
  if (defense instanceof Defense) {
    defensesSection.appendChild(AdvanceHTMLUtil.createDefenseDiv(defense));
  } else {
    throw new Error(`Invalid defense: ${defense}`);
  }
}