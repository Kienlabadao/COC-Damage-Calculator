class Modifier extends Offense {

    static LEVEL_POS = 0;
    static MODIFY_POS = 1;

    constructor(offenseID, currentLevelPos) {
        super(offenseID, "modifier");
        this.setSortedModifyList();
        this.maxLevelPos = this.modifyList.length - 1;
        this.currentLevelPos = currentLevelPos;
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

    getModiy(levelPos) {
        return this.modifyList[levelPos][Modifier.MODIFY_POS];
    }

    getCurrentModify() {
        return this.getModify(this.currentLevelPos);
    }

    calcModify(baseDamage) {
        return baseDamage * this.getCurrentModify() / 100;      
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
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

    get currentLevelPos() {
        return this._currentLevelPos;
    }
 }