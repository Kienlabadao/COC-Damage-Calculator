class Equipment extends Offense {

    // Variant of offense
    // Store additional data for equipment including its rarity
    // Note: All damage related number is rounded up to 2 decimal places

    constructor(offenseID, currentLevelPos, isEnabled) {
        super(offenseID, "equipment", currentLevelPos, isEnabled);
        this._rarity = this.offenseJSON["rarity"];
    }

    // Calculate base damage for eq damage type equipment
    // EQ damage deal % damage based on target max hp
    calcBaseEQDamage(maxHP) {
        if (this.isDamageTypeEQ()) {
            return NumberUtil.round2Places(maxHP * this.getCurrentDamage() / 100);
        } else {
            throw new Error(`Spell isn't EQ type: ${this.offenseID}`);
        }
    }

    // Calculate how many damages does this equipment do to defense
    // For eq damage type equipment, also include reduced damage as eq type damage deal less damage the more its target got hit by eq type damage
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
            throw new Error(`Invalid defense: ${defense}`);
        }    
    }
 
    // Calculate and update defense remaining HP after getting hit by equipment
    // Also increase building eq count if equipment deal eq type damage
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
            throw new Error(`Invalid defense: ${defense}`);
        }
    }

    // Check if equipment rarity is epic
    isRarityEpic() {
        return this.rarity === "epic";
    }

    // Compare equipment on its ID
    compare(compareEquipment) {
        if (compareEquipment instanceof Equipment) {
            return this.offenseID === compareEquipment.offenseID;
        }
        return false;
    }
    
    // Get equipment's image path in the project folder
    getImagePath() {
        return `/images/offense/equipments/${this.offenseID}.webp`;
    }

    // Get a new equipment with same datas
    clone() {
        return new Equipment(this.offenseID, this.currentLevelPos, this.isEnabled);
    }

    // Getter
    get rarity() {
        return this._rarity;
    }
}