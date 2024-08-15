const devMode = false;
const type = "simple";

const eqSpellKey = "earthquake_spell";
const eqBootsKey = "earthquake_boots";
const zapSpellKey = "lightning_spell";
const donatedZapSpellCountKey = "donatedZapSpellCount";
const useDonatedZapSpellKey = "useDonatedZapSpell";
const eqOrderKey = LocalStorageUtils.getEQOrderKey(type);

const defensesSection = document.getElementById("defenses");
const offensesSection = document.getElementById("offenses");
const eqOrderDiv = document.getElementById("earthquakeOrder");
const useDonatedZapSpellCheckbox = document.getElementById("useDonatedLightning");

let maxSpellCount = 0;
let donatedZapSpellCount = LocalStorageUtils.loadNumber(donatedZapSpellCountKey, 0);
let eqOrder = LocalStorageUtils.loadString(eqOrderKey, [eqSpellKey, eqBootsKey], eqSpellKey);
let useDonatedZap = LocalStorageUtils.loadBoolean(useDonatedZapSpellKey, false);

const offenseList = new OffenseList();
const defenseList = new DefenseList();

document.addEventListener('init', () => {
  console.log(localStorage);
  maxSpellCount = getMaxSpellCount();

  offenseList.loadKey(type);
  offenseList.addDonatedSpell(zapSpellKey, type);
  defenseList.load(type);
  console.log(offenseList);

  if (!devMode) {
    for (const defense of defenseList.defenseList) {
      loadDefense(defense);
    }
  }
  for (const spell of offenseList.getSpellList()) {
    loadSpell(spell);
  }
  for (const equipment of offenseList.getEquipmentList()) {
    loadEquipment(equipment);
  }
  updateEquipmentUsed();

  for (let option of eqOrderDiv.options) {
    if (option.value === eqOrder) {
       option.selected = true;
       break;
    } 
  }
  const donateCount = document.getElementById("donateCount");
  donateCount.value = donatedZapSpellCount;
  useDonatedZapSpellCheckbox.checked = useDonatedZap;
  toggleUseDonatedZapSpell();

  calc();
});

function loadSpell(spell) {
  if (spell instanceof Spell) {
    const offenseDivs = offensesSection.querySelectorAll(".offense");
    const spellID = spell.offenseID;
    const isDonated = spell.isDonated;
    const imagePath = spell.getImagePath();
    const currentLevelPos = spell.currentLevelPos;
    const maxLevelPos = spell.maxLevelPos;
    const minLevelPos = 0;
    
    offenseDivs.forEach((offenseDiv) => {
      if (getDataTitle(offenseDiv) === spellID && getDataDonated(offenseDiv) === isDonated) {
        const overlayDiv = offenseDiv.querySelector(".overlay");       
        const key = isDonated ? LocalStorageUtils.getObjectKeyDonated(type, spellID) : LocalStorageUtils.getObjectKey(type, spellID);

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
    const minLevelPos = 0;

    offenseDivs.forEach((offenseDiv) => {
      if (getDataTitle(offenseDiv) === equipmentID) {
        const overlayDiv = offenseDiv.querySelector(".overlay");
        const key = LocalStorageUtils.getObjectKey(type, equipmentID);
  
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