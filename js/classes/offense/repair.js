class Repair extends Offense {

    // Variant of offense
    // Store additional data for repair (currently there is none)
    // Note: All damage related number is rounded up to 2 decimal places

    // DISCLAIMER: Yes, I know letting repair extend offense is weird, but if it were in it own class, then it would make implementing other thing like action, damage log list much much harder (since offense and repait will be 2 different type)
    // And since the purpose of this website is to only calculate damage, let's say that for that only purpose, repair is an offense type that deal reversed damage 😉

    constructor(offenseID, currentLevelPos, isEnabled) {
        super(offenseID, "repair", currentLevelPos, isEnabled);
    }

    // Get damage after modify for repair
    calcModifiedDamage(modify = 0) {
        return this.getCurrentDamage() * modify / 100;
    }

    // Calculate how many damages (repairs) does this repair do to defense
    calcDamage(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return 0;
            }
            
            const maxHP = defense.getCurrentMaxHP();
            const hp = defense.remainingHP;
            const repair = NumberUtil.round2Places(this.getCurrentDamage() + this.calcModifiedDamage(modify));

            if (NumberUtil.round2Places(hp + repair) > maxHP) {
                return NumberUtil.round2Places(maxHP - hp);
            } else {
                return repair;
            }         
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        } 
    }

    // Calculate and update defense remaining HP after getting hit (repaired) by troop
    calcRemainingHP(defense, modify = 0) {
        if (defense instanceof Defense) {
            if (defense.isImmune(this)) {
                return;
            }

            const hp = defense.remainingHP;
            defense.remainingHP = NumberUtil.round2Places(hp + this.calcDamage(defense, modify));
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }
    }

    // Compare repair on its ID
    compare(compareRepair) {
        if (compareRepair instanceof Repair) {
            return this.offenseID === compareRepair.offenseID;
        }
        return false;
    }

    // Get repair's image path in the project folder
    getImagePath() {
        return `/images/offense/repairs/${this.offenseID}/${this.getCurrentLevel()}.webp`;    
    }

    // Get a new repair with same datas
    clone() {
        return new Repair(this.offenseID, this.currentLevelPos, this.isEnabled);
    }
}