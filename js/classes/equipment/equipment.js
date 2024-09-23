class Equipment {

    // Store additional data for equipment including its rarity
    // Note: All damage related number is rounded up to 2 decimal places

    static LEVEL_POS = 0;
    static DAMAGE_POS = 1;

    static SUPPORT_TYPE = 0;
    static DAMAGE_TYPE = 1;
    static ATTACK_TYPE = 2;

    constructor(equipmentID, currentLevelPos, isEnabled = false) {
        this._equipmentID = equipmentID;
        this.setEquipmentJSON();
        this._name = this.equipmentJSON["name"];
        this._user = this.equipmentJSON["user"];
        this._equipmentType = this.equipmentJSON["equipment_type"];
        this._damageType = this.equipmentJSON["damage_type"];
        this._rarity = this.equipmentJSON["rarity"];

        this.setSortedDamageList();
        this.setDPSBoostList();
        this.setLevelList();
        this._maxLevelPos = this.levelList.length - 1;
        this._minLevelPos = 0;
        this.currentLevelPos = currentLevelPos;
        this.isEnabled = isEnabled;
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

    getDamage(levelPos) {
        return this.damageList !== null ? this.damageList[levelPos][Equipment.DAMAGE_POS] : 0;
    }

    getCurrentDamage() {
        return this.getDamage(this.currentLevelPos);
    }

    getCurrentDamageFormat() {
        switch (this.damageType) {
            case "direct":
                return `${this.getCurrentDamage()}`;
            case "earthquake":
                return `❤${this.getCurrentDamage()}%`;             
        }
    }

    getDPSBoost(levelPos) {
        return this.dpsBoostList !== null ? this.dpsBoostList[levelPos][Equipment.DAMAGE_POS] : 0;
    }

    getCurrentDPSBoost() {
        return this.getDPSBoost(this.currentLevelPos);
    }

    getCurrentDPHBoost(attackSpeed) {
        if (NumberUtil.isNumber(attackSpeed)) {
            return NumberUtil.round2Places(this.getCurrentDPSBoost() * attackSpeed);
        } else {
            throw new TypeError(`Invalid attackSpeed: ${attackSpeed}`);     
        } 
    }

    getCurrentDPSBoostFormat() {
        return `${this.getCurrentDPSBoost()}`;         
    }

    getCurrentDPHBoostFormat(attackSpeed) {
        return `${this.getCurrentDPHBoost(attackSpeed)}`;
    }

    // Calculate base damage for eq damage type spell
    // EQ damage deal % damage based on target max hp
    calcBaseEQDamage(maxHP) {
        if (this.isEquipmentTypeDamage() || this.isEquipmentTypeAttack()) {
            if (this.isDamageTypeEQ()) {
                return maxHP * this.getCurrentDamage() / 100;
            } else {
                throw new TypeError(`Equipment damage isn't EQ type: ${this.equipmentID}`);
            }
        } else {
            throw new Error(`Equipment can't deal damage: ${this.equipmentID}`);
        }
    }

    // Calculate how many damages does this spell do to defense
    // For eq damage type spell, also include reduced damage as eq type damage deal less damage the more its target got hit by eq type damage
    calcDamage(defense) {
        if (this.isEquipmentTypeDamage() || this.isEquipmentTypeAttack()) {
            if (defense instanceof Defense) {
                const maxHP = defense.getCurrentMaxHP();
                const eqCount = defense.eqCount;
    
                switch (this.damageType) {
                    case "direct":
                        return NumberUtil.round2Places(this.getCurrentDamage());
                    case "earthquake":
                        return NumberUtil.round2Places(this.calcBaseEQDamage(maxHP) * (1 / (2 * eqCount + 1)));            
                }  
            } else {
                throw new TypeError(`Invalid defense: ${defense}`);
            }
        } else {
            throw new Error(`Equipment can't deal damage: ${this.equipmentID}`);
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

    // Check if equipment type damage
    isEquipmentTypeDamage() {
        return this.equipmentType.includes("damage");
    }

    // Check if equipment type attack
    isEquipmentTypeAttack() {
        return this.equipmentType.includes("attack");
    }

    // Check if equipment type support
    isEquipmentTypeSupport() {
        return this.equipmentType.includes("support");
    }

    // Check if equipment rarity is epic
    isRarityEpic() {
        return this.rarity === "epic";
    }

    // Compare equipment on its ID
    compare(compareEquipment) {
        if (compareEquipment instanceof Equipment) {
            return this.equipmentID === compareEquipment.equipmentID;
        }
        return false;
    }
    
    // Get equipment's image path in the project folder
    getImagePath() {
        return `/images/equipments/${this.equipmentID}.webp`;
    }

    // Get a new equipment with same datas
    clone() {
        return new Equipment(this.equipmentID, this.currentLevelPos, this.isEnabled);
    }

    // Get equipment data in json
    setEquipmentJSON() {
        this._equipmentJSON = getEquipment(this.equipmentID);
        if (this.equipmentJSON === undefined) {
            throw new ReferenceError(`equipmentID doesn't exist in JSON: ${this.equipmentID}`);
        }
    }

    // Get sorted ascending order of offense list as json object is sorted by keys not values
    setSortedDamageList() {
        if (this.equipmentJSON["damage"] !== null) {
            this._damageList = Object.entries(this.equipmentJSON["damage"]).sort(([, valueA], [, valueB]) => valueA - valueB);
        } else {
            this._damageList = null;
        }
    }

    // Get sorted ascending order of offense list as json object is sorted by keys not values
    setDPSBoostList() {
        if (this.equipmentJSON["dps_boost"] !== null) {
            this._dpsBoostList = Object.entries(this.equipmentJSON["dps_boost"]).sort(([, valueA], [, valueB]) => valueA - valueB);
        } else {
            this._dpsBoostList = null;
        }
    }

    setLevelList() {
        const damageLevelList = this.damageList !== null ? ArrayUtil.getKeyArrayInArray(this.damageList) : null;
        const dpsBoostLevelList = this.dpsBoostList !== null ? ArrayUtil.getKeyArrayInArray(this.dpsBoostList) : null;

        if (damageLevelList !== null && dpsBoostLevelList !== null) {
            if (ArrayUtil.compareArrays(damageLevelList, dpsBoostLevelList)) {
                this._levelList = damageLevelList;
            } else {
                throw new Error(`DamageList and dpsBoostList have different length. DamageList: ${damageLevelList}. DpsBoostList: ${dpsBoostLevelList}`);
            }
        } else {
            if (damageLevelList !== null) {
                this._levelList = damageLevelList;
            } else if (dpsBoostLevelList !== null) {
                this._levelList = dpsBoostLevelList;
            } else {
                throw new Error(`Equipment doesn't have either damageList or dpsBoostList: ${this}`);
            }
        }
    }

    // Setter
    set minLevelPos(newMinLevelPos) {
        if (NumberUtil.isNumber(newMinLevelPos) && newMinLevelPos >= 0 && newMinLevelPos <= this.maxLevelPos) {
            this._minLevelPos = newMinLevelPos;
        } else {
            throw new TypeError(`Invalid newMinLevelPos: ${newMinLevelPos}`);      
        }
    }

    set currentLevelPos(newCurrentLevelPos) {
        if (newCurrentLevelPos !== null) {
            if (!NumberUtil.isNumber(newCurrentLevelPos)) {
                throw new TypeError(`Invalid type of currentLevelPos: ${newCurrentLevelPos}. Type: ${typeof newCurrentLevelPos}`);
            }

            if (this.levelList[newCurrentLevelPos] !== undefined) {
                this._currentLevelPos = newCurrentLevelPos;
            } else {
                throw new TypeError(`Invalid currentLevelPos: ${newCurrentLevelPos}. EquipmentID: ${this.equipmentID}`);
            }
        } else {
            this._currentLevelPos = this.maxLevelPos;
        }
    }

    set isEnabled(newIsEnabled) {
        if (typeof newIsEnabled === "boolean") {
            this._isEnabled = newIsEnabled;
        } else {
            throw new TypeError(`Invalid newIsEnabled: ${newIsEnabled}`);      
        }
    }

    // Getter
    get equipmentID() {
        return this._equipmentID;
    }

    get equipmentJSON() {
        return this._equipmentJSON;
    }

    get name() {
        return this._name;
    }

    get user() {
        return this._user;
    }

    get equipmentType() {
        return this._equipmentType;
    }

    get damageType() {
        return this._damageType;
    }

    get rarity() {
        return this._rarity;
    }

    get damageList() {
        return this._damageList;
    }

    get dpsBoostList() {
        return this._dpsBoostList;
    }

    get levelList() {
        return this._levelList;
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
}