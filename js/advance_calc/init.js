const devMode = true;
const type = "advance";

const deathDamageImage = "/images/other/death.webp";
const rageSpellTowerKey = "rage_spell_tower";

const defensesSection = document.getElementById("defenses");
const offensesSection = document.getElementById("offenses");
const spellDivs = offensesSection.querySelectorAll(".offense.spell");
const equipmentDivs = offensesSection.querySelectorAll(".offense.equipment");
const troopDivs = offensesSection.querySelectorAll(".offense.troop");
const repairDivs = offensesSection.querySelectorAll(".offense.repair");
const modifierDivs = offensesSection.querySelectorAll(".offense.modifier");
const actionListDiv = document.getElementById("actionList");
const useTroopDeathDamageCheckbox = document.getElementById("useTroopDeathDamage");

let useTroopDeathDamage = LocalStorageUtils.loadBoolean(LocalStorageUtils.getUseTroopDeathDamageKey(type), false);

const offenseListManager = new OffenseListManager();
const defenseListManager = new DefenseListManager();
const actionListManager = new ActionListManager();

document.addEventListener('init', () => {
  console.log(localStorage);

  offenseListManager.loadKey(type);
  defenseListManager.loadKey(type);

  if (!devMode) {
    for (const defense of defenseListManager.getDefenseList()) {
      loadDefense(defense);
    }
  }
  for (const spell of offenseListManager.getSpellList()) {
    loadSpell(spell);
  }
  for (const equipment of offenseListManager.getEquipmentList()) {
    loadEquipment(equipment);
  }
  for (const troop of offenseListManager.getTroopList()) {
    loadTroop(troop);
  }
  for (const modifier of offenseListManager.getModifierList()) {
    loadModifier(modifier);
  }
  for (const repair of offenseListManager.getRepairList()) {
    loadRepair(repair);
  }

  useTroopDeathDamageCheckbox.checked = useTroopDeathDamage;

  updateOverlay();
  hideActionList();
});

function loadSpell(spell) {
  if (spell instanceof Spell) {
    const offenseDivs = offensesSection.querySelectorAll(".offense");
    const spellID = spell.offenseID;
    const isDonated = spell.isDonated;
    const imagePath = spell.getImagePath();
    const currentLevelPos = spell.currentLevelPos;
    const maxLevelPos = spell.maxLevelPos;
    const minLevelPos = 1;
    
    offenseDivs.forEach((offenseDiv) => {
      if (getDataTitle(offenseDiv) === spellID && getDataDonated(offenseDiv) === isDonated) {
        const overlayDiv = offenseDiv.querySelector(".overlay");

        offenseDiv.querySelector(".level-number").textContent = spell.getCurrentLevel();
        offenseDiv.querySelector(".image").src = imagePath;
        offenseDiv.querySelector(".range").min = minLevelPos;
        offenseDiv.querySelector(".range").max = maxLevelPos;
        offenseDiv.querySelector(".range").value = currentLevelPos;

        if (spell.isMaxLevel()) {            
          addMaxedClass(overlayDiv);
        } else {
          addNotMaxedClass(overlayDiv);
        }
      }
    });  
  } else {
    throw new Error(`Invalid spell: ${spell}`);
  }
}

function loadEquipment(equipment) {
  if (equipment instanceof Equipment) {
    const offenseDivs = offensesSection.querySelectorAll(".offense");
    const equipmentID = equipment.offenseID;
    const imagePath = equipment.getImagePath();
    const currentLevelPos = equipment.currentLevelPos;
    const maxLevelPos = equipment.maxLevelPos;
    const minLevelPos = 1;

    offenseDivs.forEach((offenseDiv) => {
      if (getDataTitle(offenseDiv) === equipmentID) {
        const overlayDiv = offenseDiv.querySelector(".overlay");
  
        offenseDiv.querySelector(".level-number").textContent = equipment.getCurrentLevel();
        offenseDiv.querySelector(".image").src = imagePath;
        offenseDiv.querySelector(".range").min = minLevelPos;
        offenseDiv.querySelector(".range").max = maxLevelPos;
        offenseDiv.querySelector(".range").value = currentLevelPos;
        
        if (equipment.isMaxLevel()) {            
          addMaxedClass(overlayDiv);
        } else {
          addNotMaxedClass(overlayDiv);
        }
      }
    });
  } else {
    throw new Error(`Invalid equipment: ${equipment}`);
  }
}

function loadTroop(troop) {
  if (troop instanceof Troop) {
    const troopID = troop.offenseID;
    const imagePath = troop.getImagePath();
    const currentLevelPos = troop.currentLevelPos;
    const maxLevelPos = troop.maxLevelPos;
    const minLevelPos = 1;

    troopDivs.forEach((troopDiv) => {
      if (getDataTitle(troopDiv) === troopID) {
        const overlayDiv = troopDiv.querySelector(".overlay");
  
        troopDiv.querySelector(".level-number").textContent = troop.getCurrentLevel();
        troopDiv.querySelector(".image").src = imagePath;
        troopDiv.querySelector(".range").min = minLevelPos;
        troopDiv.querySelector(".range").max = maxLevelPos;
        troopDiv.querySelector(".range").value = currentLevelPos;
        
        if (troop.isMaxLevel()) {            
          addMaxedClass(overlayDiv);
        } else {
          addNotMaxedClass(overlayDiv);
        }
      }
    });
  } else {
    throw new Error(`Invalid troop: ${troop}`);
  }
}

function loadModifier(modifier) {
  if (modifier instanceof Modifier) {
    const modifierID = modifier.offenseID;
    const imagePath = modifier.getImagePath();
    const currentLevelPos = modifier.currentLevelPos;
    const maxLevelPos = modifier.maxLevelPos;
    const minLevelPos = 1;
    
    modifierDivs.forEach((modifierDiv) => {
      if (getDataTitle(modifierDiv) === modifierID) {
        const overlayDiv = modifierDiv.querySelector(".overlay");
         
        modifierDiv.querySelector(".image").src = imagePath;
        modifierDiv.querySelector(`#use_${modifierID}`).checked = modifier.isActive;
        if (modifierID !== rageSpellTowerKey) {
          modifierDiv.querySelector(".level-number").textContent = modifier.getCurrentLevel();
          modifierDiv.querySelector(".range").min = minLevelPos;
          modifierDiv.querySelector(".range").max = maxLevelPos;
          modifierDiv.querySelector(".range").value = currentLevelPos;

          if (modifier.isMaxLevel()) {
            addMaxedClass(overlayDiv);
          } else {
            addNotMaxedClass(overlayDiv);
          }
        }
      }
    });
  } else {
    throw new Error(`Invalid modifier: ${modifier}`);
  }
}

function loadRepair(repair) {
  if (repair instanceof Repair) {
    const repairID = repair.offenseID;
    const imagePath = repair.getImagePath();
    const currentLevelPos = repair.currentLevelPos;
    const maxLevelPos = repair.maxLevelPos;
    const minLevelPos = 1;
    
    repairDivs.forEach((repairDiv) => {
      if (getDataTitle(repairDiv) === repairID) {
        const overlayDiv = repairDiv.querySelector(".overlay");
  
        repairDiv.querySelector(".level-number").textContent = repair.getCurrentLevel();
        repairDiv.querySelector(".image").src = imagePath;
        repairDiv.querySelector(".range").min = minLevelPos;
        repairDiv.querySelector(".range").max = maxLevelPos;
        repairDiv.querySelector(".range").value = currentLevelPos;
        
        if (repair.isMaxLevel()) {            
          addMaxedClass(overlayDiv);
        } else {
          addNotMaxedClass(overlayDiv);
        }
      }
    });
  } else {
    throw new Error(`Invalid repair: ${repair}`);
  }
}

function loadDefense(defense) {
  if (defense instanceof Defense) {
    const defenseID = defense.defenseID;
    const name = defense.name;
    const imagePath = defense.getImagePath();
    const currentLevelPos = defense.currentLevelPos;
    const maxLevelPos = defense.maxLevelPos;
    const minLevelPos = 0;
    const hp = defense.getCurrentHP();

    // Update Value on defenseDiv
    const defenseDiv = createDefenseDiv();
    defenseDiv.setAttribute("data-title", defenseID);
    defenseDiv.querySelector(".image").setAttribute('src', imagePath);
    defenseDiv.querySelector(".name").textContent = `${name} `;
    defenseDiv.querySelector(".hp").textContent = hp;
    const levelSpan = defenseDiv.querySelector(".level");
    levelSpan.textContent = defense.getCurrentLevel();
    if (defense.isMaxLevel()) {
      levelSpan.className = 'level maxed-text';
    }
    const rangeInput = defenseDiv.querySelector(".range");
    rangeInput.setAttribute('min', minLevelPos);
    rangeInput.setAttribute('max', maxLevelPos);
    rangeInput.setAttribute('value', currentLevelPos);
    const button = defenseDiv.querySelector(".show-more-button");
    button.setAttribute('data-bs-target', `#showMore-${defenseID}`);
    button.setAttribute('aria-controls', `showMore-${defenseID}`);
    const showMoreDiv = defenseDiv.querySelector(".spell-display");
    showMoreDiv.id = `showMore-${defenseID}`;

    defensesSection.appendChild(defenseDiv);
  } else {
    throw new Error(`Invalid defense: ${defense}`);
  }
}