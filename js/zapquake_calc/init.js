const devMode = false;
const type = "simple";

const donateImage = "/images/other/donate.webp";

const eqSpellKey = "earthquake_spell";
const eqBootsKey = "earthquake_boots";
const zapSpellKey = "lightning_spell";
const donatedZapSpellCountKey = "donatedZapSpellCount";
const useDonatedZapSpellKey = "useDonatedZapSpell";
const eqOrderKey = LocalStorageUtils.getEQOrderKey(type);

const defensesSection = document.getElementById("defenses");
const offensesSection = document.getElementById("offenses");
const spellDivs = offensesSection.querySelectorAll(".offense.spell");
const equipmentDivs = offensesSection.querySelectorAll(".offense.equipment");
const eqOrderDiv = document.getElementById("earthquakeOrder");
const useDonatedZapSpellCheckbox = document.getElementById("useDonatedLightning");

let maxSpellCount = 0;
let donatedZapSpellCount = LocalStorageUtils.loadNumber(donatedZapSpellCountKey, 0);
let eqOrder = LocalStorageUtils.loadStringInRange(eqOrderKey, [eqSpellKey, eqBootsKey], eqSpellKey);
let useDonatedZap = LocalStorageUtils.loadBoolean(useDonatedZapSpellKey, false);

const offenseListManager = new OffenseListManager();
const defenseListManager = new DefenseListManager();

document.addEventListener('init', () => {
  console.log(localStorage);
  maxSpellCount = getMaxSpellCount();

  offenseListManager.loadKey(type);
  offenseListManager.addDonatedSpell(zapSpellKey, type);
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
          HTMLUtil.addMaxedClass(levelOverlayDiv);
        } else {
          HTMLUtil.addNotMaxedClass(levelOverlayDiv);
        }
      }
    });  
  } else {
    throw new Error(`Invalid spell: ${spell}`);
  }
}

function loadEquipment(equipment) {
  if (equipment instanceof Equipment) {
    const equipmentID = equipment.offenseID;
    const imagePath = equipment.getImagePath();
    const currentLevelPos = equipment.currentLevelPos;
    const maxLevelPos = equipment.maxLevelPos;
    const minLevelPos = 0;

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
          HTMLUtil.addMaxedClass(levelOverlayDiv);
        } else {
          HTMLUtil.addNotMaxedClass(levelOverlayDiv);
        }
      }
    });
  } else {
    throw new Error(`Invalid equipment: ${equipment}`);
  }
}

function loadDefense(defense) {
  if (defense instanceof Defense) {
    defensesSection.appendChild(ZapquakeHTMLUtil.createDefenseDiv(defense));
  } else {
    throw new Error(`Invalid defense: ${defense}`);
  }
}