class Defense {
    constructor(defenseID, currentLevelPos, remainingHP, eqCount) {
        this.defenseID = defenseID;
        this.defenseJSON = getDefense(defenseID);
        this.name = this.defenseJSON["name"];
        this.hpList = this.defenseJSON["hp"];
        this.setImmuneList();
        this.maxLevelPos = this.hpList.length - 1;
        this.currentLevelPos = currentLevelPos;

        if (remainingHP !== undefined) {
            this.remainingHP = remainingHP;       
        }

        if (eqCount !== undefined) {
            this.eqCount = eqCount;
        } else {
            this.eqCount = 0;
        }
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

    getMaxHP(levelPos) {
        return this.hpList[levelPos];
    }

    getCurrentMaxHP() {
        return this.getMaxHP(this.currentLevelPos);
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

    isDestroyed() {
        return this.remainingHP <= 0;
    }

    getImagePath() {
        const heroList = ["grand_warden_altar", "archer_queen", "royal_champion"];

        if (heroList.includes(this.defenseID)) {
            return `/images/defense/${this.defenseID}/${this.defenseID}.webp`;
        } else {
            return `/images/defense/${this.defenseID}/${this.getCurrentLevel()}.webp`;
        }
    }

    getDestroyedImagePath() {
        switch (this.defenseID) {
            case "archer_queen":
                return "/images/other/archer_queen_ko.webp"; 
            case "royal_champion":
                return "/images/other/royal_champion_ko.webp";      
            default:
                return "/images/other/destroyed.webp";
        }
    }

    setImmuneList() {
        this.immuneList = [];
        const offenseListManager = new OffenseListManager();
        offenseListManager.load();

        for (const offenseID of this.defenseJSON["immune"]) {
            this.immuneList.push(offenseListManager.getOffense(offenseID));
        }
    }

    resetRemainingHP() {
        this.remainingHP = this.getCurrentMaxHP();
    }

    clone() {
        return new Defense(this.defenseID, this.currentLevelPos, this.remainingHP, this.eqCount);
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
                this.resetRemainingHP();
            } else {
                throw new Error(`Invalid currentLevelPos: ${newCurrentLevelPos}. DefenseID: ${this.defenseID}`);
            }
        } else {
            this._currentLevelPos = this.maxLevelPos;
            this.resetRemainingHP();
        }
    }

    set remainingHP(newRemainingHP) {
        if (typeof newRemainingHP === "number" && newRemainingHP <= this.getCurrentMaxHP()) {
            this._remainingHP = newRemainingHP;
        } else {
            throw new Error(`Invalid remainingHP: ${newRemainingHP}. DefenseID: ${this.defenseID}. Defense maxHP: ${this.getCurrentMaxHP()}`);
        }
    }

    set eqCount(newEQCount) {
        if (typeof newEQCount === "number" && newEQCount >= 0) {
            this._eqCount = newEQCount;
        } else {
            throw new Error(`Invalid eqCount: ${newEQCount}`);
        }
    }

    get defenseID() {
        return this._defenseID;
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