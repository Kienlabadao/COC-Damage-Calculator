class Hero extends Offense {

    // Variant of offense
    // Store additional data for hero including its hero type, other damage list (like death damage, if have), and its current damage mode
    // Note: All damage related number is rounded up to 2 decimal places

    static DAMAGE = 1;
    static DEATH_DAMAGE = 2;

    static DPS = 1;
    static DPH = 2;

    // Modifier (rage spell, rage gem) is only 50% effective on heroes
    static HERO_MODIFIER_EFFECTIVENESS = 0.5;

    // Hard Mode
    static HARD_MODE_HEROES_MODIFIER = 1;

    constructor(offenseID, currentLevelPos, activeModifier, isEnabled, equipmentListManager, isHardModeEnabled) {
        super(offenseID, "hero", currentLevelPos, activeModifier, isEnabled);
        this._attackSpeed = this.offenseJSON["attack_speed"];
        this.equipmentListManager = equipmentListManager;
        this._activeEquipment = null;
        this._isHardModeEnabled = isHardModeEnabled;
    }

    getCurrentDamage() {
        return this.getCurrentNormalDamage();
    }

    calcBaseEQDamage(maxHP) {
        if (this.activeEquipment !== null) {
            return this.activeEquipment.calcBaseEQDamage(maxHP);
        } else {
            if (this.isDamageTypeEQ()) {
                return maxHP * this.getCurrentDamage() / 100;
            } else {
                throw new TypeError(`Hero doesn't deal EQ damage: ${this.offenseID}`);
            }
        }
    }

    // Get damage after modify for hero
    calcModifiedDamage(totalDamage) {
        if (this.activeModifier !== null) {
            const multiplier = this.activeModifier.getCurrentCalculationModify(Hero.HERO_MODIFIER_EFFECTIVENESS);

            return NumberUtil.round2Places(totalDamage * multiplier);
        } else {
            return NumberUtil.round2Places(totalDamage);
        }
    }

    convertDPSToDPH(dps) {
        if (NumberUtil.isNumber(dps)) {
            return NumberUtil.round2Places(dps * this.attackSpeed);
        } else {
            throw new TypeError(`Invalid dps: ${dps}`);
        }
    }

    getCurrentDamageFormat(damageFormat = Hero.DPH) {
        if (!Hero.isValidDamageFormat(damageFormat)) {
            throw new TypeError(`Invalid damageFormat: ${damageFormat}`);
        }

        let totalDamage = this.getCurrentNormalDamage();

        for (const equipment of this.equipmentListManager.equipmentList) {
            if (equipment.isEnabled) {
                totalDamage += equipment.getCurrentDPSBoost(false);      
            }
        }

        if (this.activeEquipment !== null) {
            if (this.activeEquipment.isEquipmentTypeDamage()) {
                return this.activeEquipment.getCurrentDamageFormat(false);
            } else if (this.activeEquipment.isEquipmentTypeAttack()) {
                totalDamage = this.calcModifiedDamage(totalDamage);
                if (damageFormat === Hero.DPH) {
                    totalDamage = this.convertDPSToDPH(totalDamage);
                }
                totalDamage += this.activeEquipment.getCurrentDamage();
                if (this.isHardModeEnabled) {
                    totalDamage = Hero.calcHardModeDamage(totalDamage);
                }

                return `${NumberUtil.round2Places(totalDamage)}`;
            } else {
                console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                return 0;
            }
        } else {
            totalDamage = this.calcModifiedDamage(totalDamage);
            if (damageFormat === Hero.DPH) {
                totalDamage = this.convertDPSToDPH(totalDamage);
            }
            if (this.isHardModeEnabled) {
                totalDamage = Hero.calcHardModeDamage(totalDamage);
            }

            return `${NumberUtil.round2Places(totalDamage)}`;
        }
    }

    // Calculate how many damages does this hero do to defense depend on its damage mode
    calcDamage(defense) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }

            let totalDamage = this.getCurrentDamage();

            for (const equipment of this.equipmentListManager.equipmentList) {
                if (equipment.isEnabled) {
                    totalDamage += equipment.getCurrentDPSBoost(false);      
                }
            }

            if (this.activeEquipment !== null) {
                if (this.activeEquipment.isEquipmentTypeDamage()) {
                    return NumberUtil.round2Places(this.activeEquipment.calcDamage(defense));
                } else if (this.activeEquipment.isEquipmentTypeAttack()) {
                    totalDamage = this.calcModifiedDamage(totalDamage);
                    totalDamage = this.convertDPSToDPH(totalDamage);
                    totalDamage += this.activeEquipment.calcDamage(defense);
                    if (this.isHardModeEnabled) {
                        totalDamage = Hero.calcHardModeDamage(totalDamage);
                    }
                    
                    return NumberUtil.round2Places(totalDamage);
                } else {
                    console.warn(`ActiveEquipment can't deal damage: ${this.activeEquipment}`);
                    return 0;
                }
            } else {
                totalDamage = this.calcModifiedDamage(totalDamage);
                totalDamage = this.convertDPSToDPH(totalDamage);
                if (this.isHardModeEnabled) {
                    totalDamage = Hero.calcHardModeDamage(totalDamage);
                }

                return NumberUtil.round2Places(totalDamage);
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

    // Check if offense deal earthquake type damage
    isDamageTypeEQ() {
        if (this.activeEquipment !== null) {
            return this.activeEquipment.isDamageTypeEQ();
        } else {
            return this.damageType === "earthquake";
        }      
    }

    // Get a new hero with same datas
    clone() {
        const clonedActiveModifier = this.activeModifier !== null ? this.activeModifier.clone() : null;
        const clonedHero = new Hero(this.offenseID, this.currentLevelPos, clonedActiveModifier, this.isEnabled, this.equipmentListManager.clone(), this.isHardModeEnabled);

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

    set isHardModeEnabled(newIsHardModeEnabled) {
        if (typeof newIsHardModeEnabled === "boolean") {
            this._isHardModeEnabled = newIsHardModeEnabled;
        } else {
            throw new TypeError(`Invalid newIsHardModeEnabled: ${newIsHardModeEnabled}`);      
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

    get isHardModeEnabled() {
        return this._isHardModeEnabled;
    }

    static isValidDamageFormat(damageFormat) {
        const damageFormatList = [Hero.DPS, Hero.DPH];

        return damageFormatList.includes(damageFormat);
    }

    static calcHardModeDamage(totalDamage) {
        return NumberUtil.round2Places(totalDamage * Hero.HARD_MODE_HEROES_MODIFIER);
    }
}