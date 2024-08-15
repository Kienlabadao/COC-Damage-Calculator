class Troop extends Offense {

    static LEVEL_POS = 0;
    static DAMAGE_POS = 1;

    constructor(offenseID, currentLevelPos) {
        super(offenseID, "troop");
        this.setSortedDamageList();
        this.troopType = this.offenseJSON["troop_type"];
        this.maxLevelPos = this.damageList.length - 1;
        this.currentLevelPos = currentLevelPos;
    }

    getLevel(levelPos) {
        return this.damageList[levelPos][Troop.LEVEL_POS];
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getDamage(levelPos) {
        return this.damageList[levelPos][Troop.DAMAGE_POS];
    }

    getCurrentDamage() {
        return this.getDamage(this.currentLevelPos);
    }

    calcDamage() {
        return this.getCurrentDamage();  
    }

    calcRemainingHP(hp) {
        return hp - this.calcDamage();
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
    }

    compare(compareTroop) {
        if (compareTroop instanceof Troop) {
            return this.offenseID === compareTroop.offenseID;
        }
        return false;
    }

    getImagePath() {
        switch(this.troopType) {
            case "normal":
                return `/images/offense/troops/${this.offenseID}/${this.getCurrentLevel()}.webp`;
            case "super":
                return `/images/offense/troops/super_troops/${this.offenseID}/${this.offenseID}.webp`;
        }       
    }

    setSortedDamageList() {
        this.damageList = Object.entries(this.offenseJSON["damage"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (typeof newCurrentLevelPos !== "number") {
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

    get currentLevelPos() {
        return this._currentLevelPos;
    }
 }