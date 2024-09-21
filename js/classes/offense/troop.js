class Troop extends Offense {

    // Variant of offense
    // Store additional data for troop including its troop type, other damage list (like death damage, if have), and its current damage mode
    // Note: All damage related number is rounded up to 2 decimal places

    static DAMAGE = 1;
    static DEATH_DAMAGE = 2;

    constructor(offenseID, currentLevelPos, isEnabled, damageMode = Troop.DAMAGE) {
        super(offenseID, "troop", currentLevelPos, isEnabled);
        this.setSortedDeathDamageList();
        this._troopType = this.offenseJSON["troop_type"];
        this.damageMode = damageMode;
    }

    // Get base death damage for troop if it can deal death damage
    getDeathDamage(levelPos) {
        if (this.canDealDeathDamage()) {
            return this.deathDamageList[levelPos][Troop.DAMAGE_POS];
        } else {
            console.warn(`Troop cannot deal death damage: ${offenseID}`);
            return 0;
        }       
    }

    // Get base damage for troop depend on its damage mode
    getCurrentDamage() {
        switch (this.damageMode) {
            case Troop.DAMAGE:
                return this.getDamage(this.currentLevelPos);
            case Troop.DEATH_DAMAGE:
                return this.getDeathDamage(this.currentLevelPos);
            default:
                throw new Error(`Invalid damageMode: ${this.damageMode}`);
        }
    }

    // Get damage after modify for troop
    calcModifiedDamage(modify = 0) {
        return this.getCurrentDamage() * modify / 100;
    }

    // Calculate how many damages does this troop do to defense depend on its damage mode
    calcDamage(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }

            switch (this.damageMode) {
                case Troop.DAMAGE:
                    return NumberUtil.round2Places(this.getCurrentDamage() + this.calcModifiedDamage(modify));
                case Troop.DEATH_DAMAGE:
                    return NumberUtil.round2Places(this.getDeathDamage(this.currentLevelPos));
                default:
                    throw new Error(`Invalid damageMode: ${this.damageMode}`);
            } 
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }  
    }

    // Calculate and update defense remaining HP after getting hit by troop
    calcRemainingHP(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return;
            }

            const hp = defense.remainingHP;
            defense.remainingHP = NumberUtil.round2Places(hp - this.calcDamage(defense, modify));
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }
    }

    // Check if troop can deal death damage
    canDealDeathDamage() {
        return this.deathDamageList !== null;
    }

    // Compare troop on its ID
    compare(compareTroop) {
        if (compareTroop instanceof Troop) {
            return this.offenseID === compareTroop.offenseID;
        }
        return false;
    }

    // Get troop's image path in the project folder
    getImagePath() {
        switch(this.troopType) {
            case "normal":
                return `/images/offense/troops/${this.offenseID}/${this.getCurrentLevel()}.webp`;
            case "super":
                return `/images/offense/troops/super_troops/${this.offenseID}/${this.offenseID}.webp`;
        }       
    }

    // Get a new troop with same datas
    clone() {
        return new Troop(this.offenseID, this.currentLevelPos, this.isEnabled, this.damageMode);
    }

    // Get sorted ascending order of death damage list as json object is sorted by keys not values
    setSortedDeathDamageList() {
        if (this.canDealDeathDamage()) {
            this._deathDamageList = Object.entries(this.offenseJSON["death_damage"]).sort(([, valueA], [, valueB]) => valueA - valueB);
            
            const damageLevelList = ArrayUtil.getKeyArrayInArray(this.damageList);
            const deathDamageLevelList = ArrayUtil.getKeyArrayInArray(this.deathDamageList);
            if (!ArrayUtil.compareArrays(damageLevelList, deathDamageLevelList)) {
                throw new Error(`DamageList and deathDamageList have different length. DamageList: ${damageLevelList}. DeathDamageList: ${deathDamageLevelList}`);
            }
        } else {
            this._deathDamageList = null;
        }
    }

    // Setter
    set damageMode(newDamageMode) {
        switch(newDamageMode) {
            case Troop.DAMAGE:
                this._damageMode = newDamageMode;
                break;
            case Troop.DEATH_DAMAGE:
                if (this.canDealDeathDamage()) {
                    this._damageMode = newDamageMode;
                } else {
                    throw new Error(`Troop cannot deal death damage: ${offenseID}`);
                }
                break;
            default:
                throw new Error(`Invalid damageMode: ${newDamageMode}`); 
        }
    }

    // Getter
    get deathDamageList() {
        return this._deathDamageList;
    }

    get troopType() {
        return this._troopType;
    }

    get damageMode() {
        return this._damageMode;
    }
 }