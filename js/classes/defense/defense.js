class Defense {

    // Store defense related datas including its level, hp, its immunes, and how many times it got hit by eq type offense (used for damage calculation)
    // Note: Variable that end with Pos (Ex. currentLevelPos) hold its current position in the json file
    // getCurrentLevel() will get its actual level

    constructor(defenseID, currentLevelPos, remainingHP, eqCount) {
        this._defenseID = defenseID;
        this.setDefenseJSON();
        this._name = this.defenseJSON["name"];
        this._hpList = this.defenseJSON["hp"];
        this.setOffenseImmuneList();
        this.setEquipmentImmuneList();
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
        if (eqCount !== undefined) {
            this.eqCount = eqCount;
        } else {
            this.eqCount = 0;
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
        if (checkOffense instanceof Offense) {
            if (checkOffense instanceof Hero) {
                const checkEquipment = checkOffense.activeEquipment;
                if (checkEquipment === null) {
                    return false;
                }

                for (const equipment of this.equipmentImmuneList)  {
                    if (equipment.equipmentID === checkEquipment.equipmentID) {
                        return true;
                    }
                }
            } else {
                for (const offense of this.offenseImmuneList)  {
                    if (offense.offenseID === checkOffense.offenseID) {
                        return true;
                    }
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

    // Get defense's image path in the project folder
    getImagePath() {
        const heroList = ["grand_warden_altar", "archer_queen", "royal_champion"];

        if (heroList.includes(this.defenseID)) {
            return `/images/defense/${this.defenseID}/${this.defenseID}.webp`;
        } else {
            return `/images/defense/${this.defenseID}/${this.getCurrentLevel()}.webp`;
        }
    }

    // Get defense destroyed state's image path in the project folder
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
        return new Defense(this.defenseID, this.currentLevelPos, this.remainingHP, this.eqCount);
    }

    // Get defense data in json
    setDefenseJSON() {
        this._defenseJSON = getDefense(this.defenseID);
        if (this.defenseJSON  === undefined) {
            throw new Error(`defenseID doesn't exist in JSON: ${this.defenseID}`);
        }
    }

    // Load defense immune list
    setOffenseImmuneList() {
        this._offenseImmuneList = [];
        const offenseListManager = new OffenseListManager();

        for (const offenseID of this.defenseJSON["offense_immune"]) {
            this.offenseImmuneList.push(offenseListManager.getOffense(offenseID));
        }
    }

    setEquipmentImmuneList() {
        this._equipmentImmuneList = [];
        const equipmentListManager = new EquipmentListManager();
        equipmentListManager.loadAll();

        for (const equipmentID of this.defenseJSON["equipment_immune"]) {
            this._equipmentImmuneList.push(equipmentListManager.getEquipment(equipmentID));
        }
    }

    // Setter
    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (!NumberUtil.isNumber(newCurrentLevelPos)) {
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
        // Defense remaining HP cannot be more than its max HP in its current level
        if (NumberUtil.isNumber(newRemainingHP) && newRemainingHP <= this.getCurrentMaxHP()) {
            this._remainingHP = newRemainingHP;
        } else {
            throw new Error(`Invalid remainingHP: ${newRemainingHP}. DefenseID: ${this.defenseID}. Defense maxHP: ${this.getCurrentMaxHP()}`);
        }
    }

    set eqCount(newEQCount) {
        if (NumberUtil.isNumber(newEQCount) && newEQCount >= 0) {
            this._eqCount = newEQCount;
        } else {
            throw new Error(`Invalid eqCount: ${newEQCount}`);
        }
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

    get offenseImmuneList() {
        return this._offenseImmuneList;
    }

    get equipmentImmuneList() {
        return this._equipmentImmuneList;
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