class Hero extends Offense {

    // Variant of offense
    // Store additional data for hero including its hero type, other damage list (like death damage, if have), and its current damage mode
    // Note: All damage related number is rounded up to 2 decimal places

    static DAMAGE = 1;
    static DEATH_DAMAGE = 2;

    constructor(offenseID, currentLevelPos, activeModifier, isEnabled, equipmentListManager) {
        super(offenseID, "hero", currentLevelPos, activeModifier, isEnabled);
        this._attackSpeed = this.offenseJSON["attack_speed"];
        this.equipmentListManager = equipmentListManager;
        this._activeEquipment = null;
    }

    getCurrentDamage() {
        return this.getCurrentNormalDamage();
    }

    getCurrentDamageFormat() {
        let totalDPS = this.getCurrentNormalDamage();

        for (const equipment of this.equipmentListManager.equipmentList) {
            if (equipment.isEnabled) {
                totalDPS += equipment.getCurrentDPSBoost();      
            }
        }

        if (this.activeEquipment !== null) {
            if (this.activeEquipment.isEquipmentTypeDamage()) {
                return this.activeEquipment.getCurrentDamageFormat();
            } else if (this.activeEquipment.isEquipmentTypeAttack()) {
                totalDPS = this.calcModifiedDamage(totalDPS);
                totalDPS = this.convertDPSToDPH(totalDPS);
                totalDPS += this.activeEquipment.getCurrentDamage()             
                return `${NumberUtil.round2Places(totalDPS)}`;
            } else {
                console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                return 0;
            }
        } else {
            totalDPS = this.calcModifiedDamage(totalDPS);
            totalDPS = this.convertDPSToDPH(totalDPS);
            return `${NumberUtil.round2Places(totalDPS)}`;
        }
    }

    // Get damage after modify for hero
    calcModifiedDamage(totalDPS) {
        if (this.activeModifier !== null) {
            const multiplier = 100 + this.activeModifier.getCurrentModify() / 2;

            return totalDPS * multiplier / 100;
        } else {
            return this.getCurrentNormalDamage();
        }
    }

    convertDPSToDPH(dps) {
        if (NumberUtil.isNumber(dps)) {
            return dps * this.attackSpeed;
        } else {
            throw new TypeError(`Invalid dps: ${dps}`);
        }
    }

    // Calculate how many damages does this hero do to defense depend on its damage mode
    calcDamage(defense) {
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
                    totalDPS = this.calcModifiedDamage(totalDPS);
                    totalDPS = this.convertDPSToDPH(totalDPS);
                    totalDPS += this.activeEquipment.calcDamage(defense);
                    return totalDPS;
                } else {
                    console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                    return 0;
                }
            } else {
                totalDPS = this.calcModifiedDamage(totalDPS);
                return this.convertDPSToDPH(totalDPS);
            }
        } else {
            throw new TypeError(`Invalid defense: ${defense}`);
        }  
    }

    // Calculate and update defense remaining HP after getting hit by hero
    calcRemainingHP(defense) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return;
            }

            const hp = defense.remainingHP;
            if (this.activeEquipment !== null) {
                if (this.activeEquipment.isEquipmentTypeDamage() || this.activeEquipment.isEquipmentTypeAttack()) {
                    defense.remainingHP = NumberUtil.round2Places(hp - this.calcDamage(defense));

                    if (this.activeEquipment.isDamageTypeEQ()) {
                        defense.eqCount++;
                    }
                } else {
                    console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                }
            } else {
                defense.remainingHP = NumberUtil.round2Places(hp - this.calcDamage(defense));
            }
        } else {
            throw new TypeError(`Invalid defense: ${defense}`);
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
        const clonedActiveModifier = this.activeModifier !== null ? this.activeModifier.clone() : null;
        const clonedHero = new Hero(this.offenseID, this.currentLevelPos, clonedActiveModifier, this.isEnabled, this.equipmentListManager.clone());

        if (this.activeEquipment !== null) {
            clonedHero.setActiveEquipment(this.activeEquipment.equipmentID);
        }        
        return clonedHero;
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
                    throw new TypeError(`Eqipment type can't be set as active equipment: ${equipment}`);    
                }
            } else {
                throw new TypeError(`Invalid equipmentID: ${equipmentID}`);    
            }          
        }
    }

    // Setter
    set equipmentListManager(newEquipmentListManager) {
        if (newEquipmentListManager instanceof EquipmentListManager) {
            this._equipmentListManager = newEquipmentListManager;
        } else {
            throw new TypeError(`Invalid newEquipmentListManager: ${newEquipmentListManager}`);      
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