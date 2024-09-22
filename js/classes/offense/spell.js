class Spell extends Offense {

    // Variant of offense
    // Store additional data for spell including if it came from donation
    // Note: All damage related number is rounded up to 2 decimal places

    constructor(offenseID, currentLevelPos, activeModifier, isEnabled, isDonated = false) {
        super(offenseID, "spell", currentLevelPos, activeModifier, isEnabled);
        this.isDonated = isDonated;
    }

    // Calculate base damage for eq damage type spell
    // EQ damage deal % damage based on target max hp
    calcBaseEQDamage(maxHP) {
        if (this.isDamageTypeEQ()) {
            return maxHP * this.getCurrentDamage() / 100;
        } else {
            throw new TypeError(`Spell isn't EQ type: ${this.offenseID}`);
        }
    }

    // Calculate how many damages does this spell do to defense
    // For eq damage type spell, also include reduced damage as eq type damage deal less damage the more its target got hit by eq type damage
    calcDamage(defense) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }

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
    }

    // Calculate and update defense remaining HP after getting hit by spell
    // Also increase building eq count if offense deal eq type damage
    calcRemainingHP(defense) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return;
            }

            const hp = defense.remainingHP;
            switch (this.damageType) {
                case "direct":
                    defense.remainingHP = NumberUtil.round2Places(hp - this.calcDamage(defense));
                    return;
                case "earthquake":
                    defense.remainingHP = NumberUtil.round2Places(hp - this.calcDamage(defense));
                    defense.eqCount++;
                    return;               
            }  
        } else {
            throw new TypeError(`Invalid defense: ${defense}`);
        }     
    }

    // Compare spell on its ID
    compare(compareSpell) {
        if (compareSpell instanceof Spell) {
            return this.offenseID === compareSpell.offenseID && this.isDonated === compareSpell.isDonated;
        }
        return false;
    }
    
    // Get equipment's image path in the project folder
    getImagePath() {
        return `/images/offense/spells/${this.offenseID}.webp`;
    }

    // Get a new equipment with same datas
    clone() {
        const clonedActiveModifier = this.activeModifier !== null ? this.activeModifier.clone() : null;

        return new Spell(this.offenseID, this.currentLevelPos, clonedActiveModifier, this.isEnabled, this.isDonated);
    }

    // Setter
    set isDonated(isDonated) {
        return this._isDonated = isDonated === true;
    }

    // Getter
    get isDonated() {
        return this._isDonated;
    }
}