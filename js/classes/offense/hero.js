class Hero extends Offense {

    // Variant of offense
    // Store additional data for hero including its hero type, other damage list (like death damage, if have), and its current damage mode
    // Note: All damage related number is rounded up to 2 decimal places

    static DAMAGE = 1;
    static DEATH_DAMAGE = 2;

    constructor(offenseID, currentLevelPos, isEnabled, equipmentListManager) {
        super(offenseID, "hero", currentLevelPos, isEnabled);
        this._attackSpeed = this.offenseJSON["attack_speed"];
        this.equipmentListManager = equipmentListManager;
        this._activeEquipment = null;
    }

    getCurrentDamageFormat() {
        let totalDPS = this.getCurrentDamage();

        for (const equipment of this.equipmentListManager.equipmentList) {
            if (equipment.isEnabled) {
                totalDPS += equipment.getCurrentDPSBoost();      
            }
        }

        if (this.activeEquipment !== null) {
            if (this.activeEquipment.isEquipmentTypeDamage()) {
                return this.activeEquipment.getCurrentDamageFormat();
            } else if (this.activeEquipment.isEquipmentTypeAttack()) {
                totalDPS = this.calculateDamageWithDPS(totalDPS);
                totalDPS += this.activeEquipment.getCurrentDamage()
                //totalDPS += this.calcModifiedDamage(totalDPS, modify);
                return `${totalDPS}`;
            } else {
                console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
            }
        } else {
            return `${this.calculateDamageWithDPS(totalDPS)}`;
        }
    }

    // Get damage after modify for hero
    calcModifiedDamage(totalDPS, modify = 0) {
        return totalDPS * modify / 100;
    }

    calculateDamageWithDPS(dps) {
        if (NumberUtil.isNumber(dps)) {
            return NumberUtil.round2Places(dps * this.attackSpeed);
        } else {
            throw new Error(`Invalid dps: ${dps}`);
        }
    }

    // Calculate how many damages does this hero do to defense depend on its damage mode
    calcDamage(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }

            let totalDPS = this.getCurrentDamage();

            for (const equipment of this.equipmentListManager.equipmentList) {
                if (equipment.isEnabled) {
                    totalDPS += equipment.getCurrentDPSBoost();      
                }
            }

            if (this.activeEquipment !== null) {
                if (this.activeEquipment.isEquipmentTypeDamage()) {
                    return NumberUtil.round2Places(this.activeEquipment.calcDamage(defense));
                } else if (this.activeEquipment.isEquipmentTypeAttack()) {
                    totalDPS = this.calculateDamageWithDPS(totalDPS);
                    totalDPS += this.activeEquipment.calcDamage(defense);
                    //totalDPS += this.calcModifiedDamage(totalDPS, modify)
                    return totalDPS;
                } else {
                    console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                }
            } else {
                return this.calculateDamageWithDPS(totalDPS);
            }
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }  
    }

    // Calculate and update defense remaining HP after getting hit by hero
    calcRemainingHP(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return;
            }

            const hp = defense.remainingHP;
            if (this.activeEquipment !== null) {
                if (this.activeEquipment.isEquipmentTypeDamage() || this.activeEquipment.isEquipmentTypeAttack()) {
                    defense.remainingHP = NumberUtil.round2Places(hp - this.calcDamage(defense, modify));

                    if (this.activeEquipment.isDamageTypeEQ()) {
                        defense.eqCount++;
                    }
                } else {
                    console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                }
            } else {
                defense.remainingHP = NumberUtil.round2Places(hp - this.calcDamage(defense, modify));
            }
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }
    }

    // Compare hero on its ID
    compare(compareHero) {
        if (compareHero instanceof Hero) {
            return this.offenseID === compareHero.offenseID;
        }
        return false;
    }

    getEquipment(equipmentID) {
        return this.equipmentListManager.getEquipment(equipmentID);
    }

    // Get hero's image path in the project folder
    getImagePath() {
        return `/images/offense/heroes/${this.offenseID}.webp`;      
    }

    // Get a new hero with same datas
    clone() {
        return new Hero(this.offenseID, this.currentLevelPos, this.isEnabled, this.equipmentListManager.clone());
    }

    setActiveEquipment(equipmentID) {
        if (equipmentID === null) {
            this._activeEquipment = equipmentID;
        } else {
            const equipment = this.getEquipment(equipmentID);

            if (equipment !== null) {
                if (equipment.isEquipmentTypeDamage() || equipment.isEquipmentTypeAttack()) {
                    equipment.isEnabled = true;
                    this._activeEquipment = equipment;
                } else {
                    throw new Error(`Eqipment type can't be set as active equipment: ${equipment}`);    
                }
            } else {
                throw new Error(`Invalid equipmentID: ${equipmentID}`);    
            }          
        }
    }

    // Setter
    set equipmentListManager(newEquipmentListManager) {
        if (newEquipmentListManager instanceof EquipmentListManager) {
            this._equipmentListManager = newEquipmentListManager;
        } else {
            throw new Error(`Invalid newEquipmentListManager: ${newEquipmentListManager}`);      
        }
    }

    // Getter
    get attackSpeed() {
        return this._attackSpeed;
    }

    get equipmentListManager() {
        return this._equipmentListManager;
    }

    get activeEquipment() {
        return this._activeEquipment;
    }
}