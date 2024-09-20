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
        this.activeEquipment = null;
    }

    // Get base damage for hero depend on its damage mode
    getCurrentDamage() {
        return this.getDamage(this.currentLevelPos);
    }

    // Get damage after modify for hero
    calcModifiedDamage(totalDPS, modify = 0) {
        return totalDPS * modify / 100;
    }

    // Calculate how many damages does this hero do to defense depend on its damage mode
    calcDamage(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }

            let totalDPS = this.getCurrentDamage();
            if (this.activeEquipment !== null) {
                if (this.activeEquipment.isEquipmentTypeDamage()) {
                    return NumberUtil.round2Places(this.activeEquipment.calcDamage(defense));
                } else if (this.activeEquipment.isEquipmentTypeActive()) {
                    for (const equipment of this.equipmentListManager.equipmentList) {
                        totalDPS += equipment.getCurrentDPSBoost();
                    }

                    totalDPS += this.activeEquipment.calcDamage(defense);
                    totalDPS += this.calcModifiedDamage(totalDPS, modify);
                    return NumberUtil.round2Places(Hero.calculateDamageWithDPS(totalDPS));
                } else {
                    console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                }
            } else {
                return NumberUtil.round2Places(Hero.calculateDamageWithDPS(totalDPS));
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
                if (this.activeEquipment.isEquipmentTypeDamage() || this.activeEquipment.isEquipmentTypeActive()) {
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
        return new Hero(this.offenseID, this.currentLevelPos, this.isEnabled, this.equipmentListManager);
    }

    setActiveEquipment(equipmentID) {
        this.activeEquipment = this.getEquipment(equipmentID);
    }

    // Setter
    set equipmentListManager(newEquipmentListManager) {
        if (newEquipmentListManager instanceof EquipmentListManager) {
            this._equipmentListManager = newEquipmentListManager;
        } else {
            throw new Error(`Invalid newEquipmentListManager: ${newEquipmentListManager}`);      
        }
    }

    set activeEquipment(newActiveEquipment) {
        if (newActiveEquipment === null) {
            this._activeEquipment = newActiveEquipment;
        } else if (newActiveEquipment instanceof Equipment) {
            if (newActiveEquipment.isEquipmentTypeDamage() || newActiveEquipment.isEquipmentTypeActive()) {
                newActiveEquipment.isEnabled = true;
                this._activeEquipment = newActiveEquipment;
            } else {
                throw new Error(`newActiveEquipment eqipment type can't be set as active equipment: ${newActiveEquipment}`);    
            }
        } else {
            throw new Error(`Invalid newActiveEquipment: ${newActiveEquipment}`);      
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

    static calculateDamageWithDPS(dps) {
        if (NumberUtil.isNumber(dps)) {
            return dps * this.attackSpeed;
        } else {
            throw new Error(`Invalid dps: ${dps}`);
        }
    }
 }