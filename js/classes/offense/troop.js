class Troop extends Offense {

    static LEVEL_POS = 0;
    static DAMAGE_POS = 1;
    static DAMAGE = 1;
    static DEATH_DAMAGE = 2;

    constructor(offenseID, currentLevelPos) {
        super(offenseID, "troop");
        this.setSortedDamageList();
        this.setSortedDeathDamageList();
        this.troopType = this.offenseJSON["troop_type"];
        this.maxLevelPos = this.damageList.length - 1;
        this.currentLevelPos = currentLevelPos;
        this.damageMode = Troop.DAMAGE;
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

    calcDamage(modify = 0) {
        return this.getCurrentDamage() + (this.getCurrentDamage() * modify / 100);  
    }

    getDeathDamage(levelPos) {
        if (this.canDealDeathDamage()) {
            return this.deathDamageList[levelPos][Troop.DAMAGE_POS];
        } else {
            console.warn(`Troop cannot deal death damage: ${offenseID}`);
            return 0;
        }       
    }

    getCurrentDeathDamage() {
        return this.getDeathDamage(this.currentLevelPos);
    }

    calcDeathDamage() {
        return this.getCurrentDamage();;  
    }

    calcRemainingHP(hp, damageType = Troop.DAMAGE, modify = 0) {
        switch (damageType) {
            case Troop.DAMAGE:
                return hp - this.calcDamage(modify);
            case Troop.DEATH_DAMAGE:
                return hp - this.calcDeathDamage();
            default:
                throw new Error();
        }
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isMinLevel() {
        return this.getLevel(0) === this.getCurrentLevel();
    }

    canDealDeathDamage() {
        return this.offenseJSON["death_damage"] !== undefined;
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

    clone() {
        const clonedRepair = new Troop(this.offenseID, this.currentLevelPos);
        clonedRepair.damageMode = this.damageMode;
        return clonedRepair;
    }

    setSortedDamageList() {
        this.damageList = Object.entries(this.offenseJSON["damage"]).sort(([, valueA], [, valueB]) => valueA - valueB);
    }

    setSortedDeathDamageList() {
        if (this.canDealDeathDamage()) {
            this.deathDamageList = Object.entries(this.offenseJSON["death_damage"]).sort(([, valueA], [, valueB]) => valueA - valueB);
        } else {
            this.deathDamageList = null;
        }
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

    set damageMode(newDamageMode) {
        switch(newDamageMode) {
            case Troop.DAMAGE:
                this._damageMode = newDamageMode;
            case Troop.DEATH_DAMAGE:
                if (this.canDealDeathDamage()) {
                    this._damageMode = newDamageMode;
                } else {
                    throw new Error(`Invalid damageMode: ${newDamageMode}`);
                }
            default:   
        }
    }

    get currentLevelPos() {
        return this._currentLevelPos;
    }

    get damageMode() {
        return this._damageMode;
    }
 }