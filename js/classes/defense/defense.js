class Defense {
    constructor(defenseID, currentLevelPos) {
        this.defenseID = defenseID;
        this.defenseJSON = getDefense(defenseID);
        this.name = this.defenseJSON["name"];
        this.hpList = this.defenseJSON["hp"];
        this.setImmuneList();
        this.maxLevelPos = this.hpList.length - 1;
        this.currentLevelPos = currentLevelPos;
    }

    getLevel(levelPos) {
        return levelPos + 1;
    }

    getMaxLevel() {
        return this.getLevel(this.maxLevelPos);
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevelPos);
    }

    getHP(levelPos) {
        return this.hpList[levelPos];
    }

    getMaxHP() {
        return this.getHP(this.maxLevelPos);
    }

    getCurrentHP() {
        return this.getHP(this.currentLevelPos);
    }

    isMaxLevel() {
        return this.getMaxLevel() === this.getCurrentLevel();
    }

    isImmune(checkOffense) {
        if (checkOffense instanceof Offense) {
            for (const offense of this.immuneList)  {
                if (offense.offenseID === checkOffense.offenseID) {                    
                    return true;
                }
            }
            return false;
        } else {
            throw new Error(`Invalid offense: ${checkOffense}`);
        }
    }

    getImagePath() {
        const heroList = ["grand_warden_altar", "archer_queen", "royal_champion"];

        if (heroList.includes(this.defenseID)) {
            return `/images/defense/${this.defenseID}/${this.defenseID}.webp`;
        } else {
            return `/images/defense/${this.defenseID}/${this.getCurrentLevel()}.webp`;
        }
    }

    setImmuneList() {
        this.immuneList = [];
        const offenseList = new OffenseList();
        offenseList.load();

        for (const offenseID of this.defenseJSON["immune"]) {
            this.immuneList.push(offenseList.getOffense(offenseID));
        }
    }

    set defenseID(newDefenseID) {
        if (getDefense(newDefenseID) !== undefined) {
            this._defenseID = newDefenseID;
        } else {
            throw new Error("Invalid defenseID: " + newDefenseID);
        }
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (typeof newCurrentLevelPos !== "number") {
                throw new Error(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }
            
            if (this.hpList[newCurrentLevelPos] !== undefined) {
                this._currentLevelPos = newCurrentLevelPos;
            } else {
                throw new Error(`Invalid currentLevelPos: ${newCurrentLevelPos}. DefenseID: ${this.defenseID}`);
            }
        } else {
            this._currentLevelPos = this.maxLevelPos;
        }
    }

    get defenseID() {
        return this._defenseID;
    }

    get currentLevelPos() {
        return this._currentLevelPos;
    }
}