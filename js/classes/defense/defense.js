const HERO_LIST = [
  // TODO add the BK ???
  // "barbarian_king",
  "grand_warden",
  "archer_queen",
  "royal_champion",
  "minion_prince",
];
const IMMUNITIES_CONVERTER = {
  "hero" : ["earthquake_spell", "earthquake_boots"],
  "ressource_storage" : ["lightning_spell"],
  "building" : []
};

const DEFENSE_IMAGE_PATH = "images/defense"
class Defense {
  // Store defense related datas including its level, hp, its immunes, and how many times it got hit by eq type offense (used for damage calculation)
  // Note: Variable that end with Pos (Ex. currentLevelPos) hold its current position in the json file
  // getCurrentLevel() will get its actual level

  constructor(defenseID, currentLevelPos, remainingHP, eqCount) {
    this._defenseID = defenseID;
    this.setDefenseJSON();
    this._name = this.defenseJSON["name"];
    this._hpList = this.defenseJSON["hp"];
    this.setImmuneList();
    this._maxLevelPos = this.hpList.length - 1;
    this._minLevelPos = 0;
    this.currentLevelPos = currentLevelPos;

    // If remainingHP is not defined, it will be set to max HP in its current level
    if (remainingHP !== undefined) {
      this.remainingHP = remainingHP;
    } else {
      this.resetRemainingHP();
    }

    // If remainingHP is not defined, it will be set to default 0
    this.eqCount = 0;
    if (eqCount !== undefined) {
      this.eqCount = eqCount;
    }
  }

  // Convert the level's position in the json file to its actual level
  getLevel(levelPos) {
    return levelPos + 1;
  }

  getMaxLevel() {
    return this.getLevel(this.maxLevelPos);
  }

  getCurrentLevel() {
    return this.getLevel(this.currentLevelPos);
  }

  getMaxHP(levelPos) {
    return this.hpList[levelPos];
  }

  getCurrentMaxHP() {
    return this.getMaxHP(this.currentLevelPos);
  }

  isMaxLevel() {
    return this.getMaxLevel() === this.getCurrentLevel();
  }

  // Check if defense immune to this offense (store in json file)
  isImmune(checkOffense) {
    if (!(checkOffense instanceof Offense)) {
      throw new Error(`Invalid offense: ${checkOffense}`)
    }
    return this.immuneList.some(
      offense => offense.offenseID === checkOffense.offenseID
    );
  }

  isDestroyed() {
    return this.remainingHP <= 0;
  }

  // Get defense's image path in the project folder
  getImagePath() {
    if (HERO_LIST.includes(this.defenseID)) {
      return `/${DEFENSE_IMAGE_PATH}/${this.defenseID}/${this.defenseID}.webp`;
    }
    return `/${DEFENSE_IMAGE_PATH}/${this.defenseID}/${this.getCurrentLevel()}.webp`;
  }

  // Get defense destroyed state's image path in the project folder
  getDestroyedImagePath() {
    if (HERO_LIST.includes(this.defenseID)) {
        return `/${DEFENSE_IMAGE_PATH}/${this.defenseID}/${this.defenseID}_ko.webp`;
    }
    return `/${DEFENSE_IMAGE_PATH}/destroyed.webp`;
  }

  // Reset defense's remaining HP back to its max HP in its current level
  resetRemainingHP() {
    this.remainingHP = this.getCurrentMaxHP();
  }

  // Compare modifier on its ID
  compare(compareDefense) {
    if (compareDefense instanceof Defense) {
      return this.defenseID === compareDefense.defenseID;
    }
    return false;
  }

  // Get a new defense with same datas
  clone() {
    return new Defense(
      this.defenseID,
      this.currentLevelPos,
      this.remainingHP,
      this.eqCount
    );
  }

  // Get defense data in json
  setDefenseJSON() {
    this._defenseJSON = getDefense(this.defenseID);
    if (this.defenseJSON === undefined) {
      throw new Error(`defenseID doesn't exist in JSON: ${this.defenseID}`);
    }
  }

  // Load defense immune list
  setImmuneList() {
    const immunities = IMMUNITIES_CONVERTER[this.defenseJSON["type"]];
    if (!immunities) {
      throw new Error(`Invalid defense type : "${this.defenseJSON["type"]}" is not a valid type for the defense "${this._defenseID}"`)
    }
    this._immuneList = [];
    const offenseListManager = new OffenseListManager();
    offenseListManager.load();
    for (const offenseID of immunities) {
      this.immuneList.push(offenseListManager.getOffense(offenseID));
    }
  }

  // Setter
  set currentLevelPos(newCurrentLevelPos) {
    if (newCurrentLevelPos === null) {
      this._currentLevelPos = this.maxLevelPos;
      this.resetRemainingHP();
      return;
    } 
    if (!NumberUtil.isNumber(newCurrentLevelPos)) {
      throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
    }
    if (this.hpList[newCurrentLevelPos] === undefined) {
      throw new Error(`Invalid currentLevelPos: ${newCurrentLevelPos}. DefenseID: ${this.defenseID}`);
    }
    this._currentLevelPos = newCurrentLevelPos;
    this.resetRemainingHP();
  }

  set remainingHP(newRemainingHP) {
    // Defense remaining HP cannot be more than its max HP in its current level
    if (!(
      NumberUtil.isNumber(newRemainingHP) &&
      newRemainingHP <= this.getCurrentMaxHP()
    )) {
      throw new Error(
        `Invalid remainingHP: ${newRemainingHP}. \
        DefenseID: ${this.defenseID}. \
        Defense maxHP: ${this.getCurrentMaxHP()}`
      );
    } 
    this._remainingHP = newRemainingHP;
  }

  set eqCount(newEQCount) {
    if (!(NumberUtil.isNumber(newEQCount) && newEQCount >= 0)) {
      throw new Error(`Invalid eqCount: ${newEQCount}`);
    }
    this._eqCount = newEQCount;
  }

  // Getter
  get defenseID() {
    return this._defenseID;
  }

  get defenseJSON() {
    return this._defenseJSON;
  }

  get name() {
    return this._name;
  }

  get hpList() {
    return this._hpList;
  }

  get immuneList() {
    return this._immuneList;
  }

  get maxLevelPos() {
    return this._maxLevelPos;
  }

  get minLevelPos() {
    return this._minLevelPos;
  }

  get currentLevelPos() {
    return this._currentLevelPos;
  }

  get remainingHP() {
    return this._remainingHP;
  }

  get eqCount() {
    return this._eqCount;
  }
}
