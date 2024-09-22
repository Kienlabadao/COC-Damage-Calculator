// Enable this to stop defense div from generating for testing
const stopGenerateDefenseDiv = false;
const type = "simple";

const donateImage = "/images/other/donate.webp";

const eqSpellKey = "earthquake_spell";
const eqBootsKey = "earthquake_boots";
const barbKingKey = "barbarian_king";
const zapSpellKey = "lightning_spell";
const donatedZapSpellCountKey = "donatedZapSpellCount";
const eqOrderKey = LocalStorageUtils.getEQOrderKey(type);

const defensesSection = document.getElementById("defenses");
let defenseDivs = [];
const offensesSection = document.getElementById("offenses");
const spellDivs = offensesSection.querySelectorAll(".offense.spell");
const equipmentDivs = offensesSection.querySelectorAll(".equipment");
const eqOrderDropdown = document.getElementById("earthquakeOrder");
const useDonatedZapSpellCheckbox = document.getElementById("useDonatedLightning");
const donateCountInputBox = document.getElementById("donateCount");
const warningDiv = document.getElementById("inputWarning");
const searchDefenseBox = document.getElementById("searchDefense");
const defenseCountBox = document.getElementById("defenseCount");

let maxSpellCount = 0;
let donatedZapSpellCount = LocalStorageUtils.loadNumber(donatedZapSpellCountKey, 0);
let eqOrder = LocalStorageUtils.loadStringInRange(eqOrderKey, [eqSpellKey, eqBootsKey], eqSpellKey);

const offenseListManager = new OffenseListManager();
const defenseListManager = new DefenseListManager();

// Load the page when JSON is loaded successfully
document.addEventListener('init', () => {
  maxSpellCount = getMaxSpellCount();
  offenseListManager.loadKey(type);
  offenseListManager.addDonatedSpell(zapSpellKey, type);
  defenseListManager.loadKey(type);
  console.log(offenseListManager);
  console.log(localStorage);
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
    loadEquipment(hero);
  }
  updateEquipmentUsed();

  for (let option of eqOrderDropdown.options) {
    if (option.value === eqOrder) {
       option.selected = true;
       break;
    } 
  }
  donateCountInputBox.value = donatedZapSpellCount;

  const donatedZapSpell = offenseListManager.getSpell(zapSpellKey, true);
  useDonatedZapSpellCheckbox.checked = donatedZapSpell.isEnabled;
  toggleDonatedZapSpellDiv(donatedZapSpell.isEnabled);

  calc();
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
        const damageDiv = spellDiv.querySelector(".damage");

        levelOverlayDiv.textContent = spell.getCurrentLevel();
        imgContainer.src = imagePath;
        levelSlider.min = minLevelPos;
        levelSlider.max = maxLevelPos;
        levelSlider.value = currentLevelPos;
        damageDiv.textContent = spell.getCurrentDamageFormat();

        if (!spell.isDonated) {
          const useCheckbox = spellDiv.querySelector(".useCheckbox");
          useCheckbox.checked = spell.isEnabled;
        }        

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

// Load equipment div with saved data
function loadEquipment(hero) {
  if (hero instanceof Hero) {
    for (const equipment of hero.equipmentListManager.equipmentList) {
      const equipmentID = equipment.equipmentID;
      const imagePath = equipment.getImagePath();
      const currentLevelPos = equipment.currentLevelPos;
      const maxLevelPos = equipment.maxLevelPos;
      const minLevelPos = 0;
      
      equipmentDivs.forEach((equipmentDiv) => {
        if (HTMLUtil.getDataID(equipmentDiv) === equipmentID) {
          const levelOverlayDiv = equipmentDiv.querySelector(".level");
          const imgContainer = equipmentDiv.querySelector(".image");
          const levelSlider = equipmentDiv.querySelector(".slider");
          const useCheckbox = equipmentDiv.querySelector(".useCheckbox");
          const damageDiv = equipmentDiv.querySelector(".damage");

          levelOverlayDiv.textContent = equipment.getCurrentLevel();
          imgContainer.src = imagePath;
          levelSlider.min = minLevelPos;
          levelSlider.max = maxLevelPos;
          levelSlider.value = currentLevelPos;
          useCheckbox.checked = equipment.isEnabled;
          damageDiv.textContent = equipment.getCurrentDamageFormat();
          
          if (equipment.isMaxLevel()) {            
            HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
          } else {
            HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
          }
          return;
        }
      });
    }
  } else {
    throw new TypeError(`Invalid hero: ${hero}`);
  }
}

// Load defense div with saved data
function loadDefense(defense) {
  if (defense instanceof Defense) {
    defensesSection.appendChild(ZapquakeHTMLUtil.createDefenseDiv(defense));
  } else {
    throw new TypeError(`Invalid defense: ${defense}`);
  }
}