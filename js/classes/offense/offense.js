class Offense {

    // Base offense class
    // Store offense related datas including its level, damage list, and damage type
    // All variants of offense type must extend this class
    // Note: Variable that end with Pos (Ex. currentLevelPos) hold its current position in the json file
    // getCurrentLevel() will get its actual level

    static LEVEL_POS = 0;
    static DAMAGE_POS = 1;

    static SPELL = "spell";
    static EQUIPMENT = "equipment";
    static TROOP = "troop";
    static REPAIR = "repair";

    constructor(offenseID, type, currentLevelPos, isEnabled) {
        this._type = type;
        this._offenseID = offenseID;
        this.setOffenseJSON();
        this._name = this.offenseJSON["name"];
        this._damageType = this.offenseJSON["damage_type"];
        this.setSortedDamageList();     
        this._maxLevelPos = this.damageList.length - 1;
        this._minLevelPos = 0;
        this.currentLevelPos = currentLevelPos;
        this.isEnabled = isEnabled;
    }

    // Convert the level's position in the json file to its actual level 
    getLevel(levelPos) {
        return this.damageList[levelPos][Offense.LEVEL_POS];
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getDamage(levelPos) {
        return this.damageList[levelPos][Offense.DAMAGE_POS];
    }

    getCurrentDamage() {
        return this.getDamage(this.currentLevelPos);
    }

    getCurrentDamageFormat() {
        switch (this.damageType) {
            case "direct":
                return `${this.getDamage(this.currentLevelPos)}`;
            case "earthquake":
                return `${this.getDamage(this.currentLevelPos)}%`;             
        }
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
    }
    
    // Check if offense deal earthquake type damage
    isDamageTypeEQ() {
        return this.damageType === "earthquake";
    }

    // Get offense data in json
    setOffenseJSON() {
        switch (this.type) {
            case Offense.SPELL:
                this._offenseJSON = getSpell(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error(`Invalid offenseID: ${this.offenseID}`);
                }
                break;
            case Offense.EQUIPMENT:
                this._offenseJSON = getEquipment(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error(`Invalid offenseID: ${this.offenseID}`);
                }
                break;
            case Offense.TROOP:
                this._offenseJSON = getTroop(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error(`Invalid offenseID: ${this.offenseID}`);
                }
                break;
            case Offense.REPAIR:
                this._offenseJSON = getRepair(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error(`Invalid offenseID: ${this.offenseID}`);
                }
                break;
            default:
                throw new Error(`Invalid type: ${this.type}`);
        }  
    }

    // Get sorted ascending order of offense list as json object is sorted by keys not values
    setSortedDamageList() {
        this._damageList = Object.entries(this.offenseJSON["damage"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    // Setter
    set minLevelPos(newMinLevelPos) {
        if (NumberUtil.isNumber(newMinLevelPos) && newMinLevelPos >= 0 && newMinLevelPos <= this.maxLevelPos) {
            this._minLevelPos = newMinLevelPos;
        } else {
            throw new Error(`Invalid newMinLevelPos: ${newMinLevelPos}`);      
        }
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (!NumberUtil.isNumber(newCurrentLevelPos)) {
                throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }

            if (this.damageList[newCurrentLevelPos] !== undefined) {
                this._currentLevelPos = newCurrentLevelPos;
            } else {
                throw new Error(`Invalid currentLevelPos: ${newCurrentLevelPos}. OffenseID: ${this.offenseID}`);
            }
        } else {
            this._currentLevelPos = this.maxLevelPos;
        }
    }

    set isEnabled(newIsEnabled) {
        if (typeof newIsEnabled === "boolean") {
            this._isEnabled = newIsEnabled;
        } else {
            throw new Error(`Invalid newIsEnabled: ${newIsEnabled}`);      
        }
    }

    // Getter
    get type() {
        return this._type;
    }

    get offenseID() {
        return this._offenseID;
    }

    get offenseJSON() {
        return this._offenseJSON;
    }

    get damageType() {
        return this._damageType;
    }

    get damageList() {
        return this._damageList;
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

    get isEnabled() {
        return this._isEnabled;
    }

    // Static function
    // Check if offense div contains certain offense type
    static isOffenseDivType(offenseDiv, type) {
        return offenseDiv.classList.contains(type);
    }
}