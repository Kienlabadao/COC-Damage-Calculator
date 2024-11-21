class Modifier {

    // Store modifier related datas including its level, modfify, type of offense that it affects, and if it's being activated (enabled by user)
    // Note: Variable that end with Pos (Ex. currentLevelPos) hold its current position in the json file
    // getCurrentLevel() will get its actual level

    static LEVEL_POS = 0;
    static MODIFY_POS = 1;

    static TROOP = 0;
    static HERO = 1;
    static REPAIR = 2;

    constructor(modifierID, currentLevelPos, isActive = false) {
        this._modifierID = modifierID;

        this.setModifierJSON();
        this.setSortedModifyList();
        this.setLevelList();
        this._affectTypeList = this.modifierJSON["affect_offense_type"];
        this._affectOnlyList = this.modifierJSON["affect_only"];
        this._doesntAffectList = this.modifierJSON["doesnt_affect"];

        this._maxLevelPos = this.levelList.length - 1;
        this._minLevelPos = 0;
        this.currentLevelPos = currentLevelPos;
        this.isActive = isActive;
    }

    // Convert the level's position in the json file to its actual level 
    getLevel(levelPos) {
        return this.levelList[levelPos];
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getModify(levelPos) {
        return this.modifyList[levelPos][Modifier.MODIFY_POS];
    }

    getCurrentModify() {
        return this.getModify(this.currentLevelPos);
    }
    
    getCurrentCalculationModify(modifier = 1) {
        if (NumberUtil.isNumber(modifier)) {
            return NumberUtil.round2Places((100 + this.getCurrentModify() * modifier) / 100);
        } else {
            throw new TypeError(`Invalid modifier: ${modifier}`);
        }
    }

    getCurrentModifyFormat() {
        return `+${this.getCurrentModify()}%`;
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
    }

    // Check if modifier can affect this type of offense
    isTypeAffected(type) {
        if (typeof type === "string") {
            return this.affectTypeList.includes(type);
        } else {
            throw new TypeError(`Invalid type: ${type}`);
        }
    }

    isAffected(offense) {
        if (offense instanceof Offense) {
            if (this.isTypeAffected(offense.type)) {
                if (this.affectOnlyList.length > 0) {
                    if (this.affectOnlyList.includes(offense.offenseID)) {
                        return true;
                    }                   
                } else if (this.doesntAffectList.length > 0) {
                    if (!this.doesntAffectList.includes(offense.offenseID)) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
            return false;
        } else {
            throw new TypeError(`Invalid offense: ${offense}`);
        }
    }

    // Compare modifier on its ID
    compare(compareModfier) {
        if (compareModfier instanceof Modifier) {
            return this.modifierID === compareModfier.modifierID;
        }
        return false;
    }

    // Compare modifier on its current modify (needed as modifier with higher modify will override the other one)
    compareModify(compareModfier) {
        if (compareModfier instanceof Modifier) {
            const modify = this.getCurrentModify();
            const compareModify = compareModfier.getCurrentModify();

            if (modify > compareModify) {
                return 1;
            } else if (modify < compareModify) {
                return -1;
            } else {
                return 0;
            }
        } else {
            throw new TypeError(`Invalid compareModfier: ${compareModfier}`)
        }       
    }

    // Get modifier's image path in the project folder
    getImagePath() {
        return `/images/modifiers/${this.modifierID}.webp`;
    }

    // Get a new modifier with same datas
    clone() {
        return new Modifier(this.modifierID, this.currentLevelPos, this.isActive);
    }

    // Get modifier data in json
    setModifierJSON() {
        this._modifierJSON = getModifier(this.modifierID);
        if (this.modifierJSON === undefined) {
            throw new ReferenceError(`modifierID doesn't exist in JSON: ${this.modifierID}`);
        }
    }

    // Get sorted ascending order of modifier list as json object is sorted by keys not values
    setSortedModifyList() {
        this._modifyList = Object.entries(this.modifierJSON["modify"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    setLevelList() {
        this._levelList = ArrayUtil.getKeyArrayInArray(this.modifyList);
    }

    // Setter
    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (!NumberUtil.isNumber(newCurrentLevelPos)) {
                throw new TypeError(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }

            if (this.levelList[newCurrentLevelPos] !== undefined) {
                this._currentLevelPos = newCurrentLevelPos;
            } else {
                throw new TypeError(`Invalid currentLevelPos: ${newCurrentLevelPos}. OffenseID: ${this.modifierID}`);
            }
        } else {
            this._currentLevelPos = this.maxLevelPos;
        }
    }

    set isActive(newIsActive) {
        if (typeof newIsActive === "boolean") {
            this._isActive = newIsActive;
        } else {
            throw new TypeError(`Invalid isActive: ${newIsActive}`)
        }
    }

    // Getter
    get modifierID() {
        return this._modifierID;
    }

    get modifierJSON() {
        return this._modifierJSON;
    }

    get modifyList() {
        return this._modifyList;
    }

    get levelList() {
        return this._levelList;
    }
    get affectTypeList() {
        return this._affectTypeList;
    }

    get affectOnlyList() {
        return this._affectOnlyList;
    }

    get doesntAffectList() {
        return this._doesntAffectList;
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

    get isActive() {
        return this._isActive;
    }
 }