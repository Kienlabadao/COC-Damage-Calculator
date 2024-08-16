class Modifier extends Offense {

    static LEVEL_POS = 0;
    static MODIFY_POS = 1;
    static TROOP = 0;
    static REPAIR = 1;

    constructor(offenseID, currentLevelPos, isActive = false) {
        super(offenseID, "modifier");
        this.setSortedModifyList();
        this.affectList = this.offenseJSON["affects"];
        this.maxLevelPos = this.modifyList.length - 1;
        this.currentLevelPos = currentLevelPos;
        this.isActive = isActive;
    }

    getLevel(levelPos) {
        return this.modifyList[levelPos][Modifier.LEVEL_POS];
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

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
    }

    isAffected(type) {
        switch (type) {
            case Modifier.TROOP:
                return this.affectList.includes("troop");
            case Modifier.REPAIR:
                return this.affectList.includes("repair");
            default:
                throw new Error(`Invalid type: ${type}`);
        }
    }

    compare(compareModfier) {
        if (compareModfier instanceof Modifier) {
            return this.offenseID === compareModfier.offenseID;
        }
        return false;
    }

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
            throw new Error(`Invalid compareModfier: ${compareModfier}`)
        }       
    }

    getImagePath() {
        return `/images/offense/modifiers/${this.offenseID}.webp`;
    }

    clone() {
        return new Modifier(this.offenseID, this.currentLevelPos, this.isActive);
    }

    setSortedModifyList() {
        this.modifyList = Object.entries(this.offenseJSON["modify"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (typeof newCurrentLevelPos !== "number") {
                throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }

            if (this.modifyList[newCurrentLevelPos] !== undefined) {
                this._currentLevelPos = newCurrentLevelPos;
            } else {
                throw new Error(`Invalid currentLevelPos: ${newCurrentLevelPos}. OffenseID: ${this.offenseID}`);
            }
        } else {
            this._currentLevelPos = this.maxLevelPos;
        }
    }

    set isActive(newIsActive) {
        if (typeof newIsActive === "boolean") {
            this._isActive = newIsActive;
        } else {
            throw new Error(`Invalid isActive: ${newIsActive}`)
        }
    }

    get currentLevelPos() {
        return this._currentLevelPos;
    }

    get isActive() {
        return this._isActive;
    }
 }