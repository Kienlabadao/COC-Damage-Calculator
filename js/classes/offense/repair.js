class Repair extends Offense {

    static LEVEL_POS = 0;
    static REPAIR_POS = 1;

    constructor(offenseID, currentLevelPos) {
        super(offenseID, "repair");
        this.setSortedRepairList();
        this.maxLevelPos = this.repairList.length - 1;
        this.currentLevelPos = currentLevelPos;
    }

    getLevel(levelPos) {
        return this.repairList[levelPos][Repair.LEVEL_POS];
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getRepair(levelPos) {
        return this.repairList[levelPos][Repair.REPAIR_POS];
    }

    getCurrentRepair() {
        return this.getRepair(this.currentLevelPos);
    }

    calcModify(modify = 0) {
        return this.getCurrentRepair() * modify / 100;
    }

    calcRepair(modify = 0) {
        return this.getCurrentRepair() + this.calcModify(modify);  
    }

    calcRemainingHP(hp, modify = 0) {
        return hp + this.calcRepair(modify);
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
    }

    compare(compareRepair) {
        if (compareRepair instanceof Repair) {
            return this.offenseID === compareRepair.offenseID;
        }
        return false;
    }

    getImagePath() {
        return `/images/offense/repairs/${this.offenseID}/${this.getCurrentLevel()}.webp`;    
    }

    clone() {
        return new Repair(this.offenseID, this.currentLevelPos);
    }

    setSortedRepairList() {
        this.repairList = Object.entries(this.offenseJSON["repair"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (typeof newCurrentLevelPos !== "number") {
                throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }
            if (this.repairList[newCurrentLevelPos] !== undefined) {
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