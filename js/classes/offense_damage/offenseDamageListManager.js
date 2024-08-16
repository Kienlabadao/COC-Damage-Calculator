class OffenseDamageListManager {

    constructor() {
        this.offenseDamageList = [];
    }

    add(newOffenseDamage) {
        if (newOffenseDamage instanceof OffenseDamage) {
            this.offenseDamageList.push(newOffenseDamage);
        } else {
            throw new Error(`Invalid offenseDamage: ${newOffenseDamage}`);
        }
    }

    load(defense, offenseOrderList) {
        if (defense instanceof Defense && Array.isArray(offenseOrderList)) {
            this.clear();
            const maxHP = defense.getCurrentHP();
            let hp = maxHP;
            let eqCount = 0;
            
            for (const offense of offenseOrderList) {
                if (offense instanceof Offense) {
                    if (offense.isMinLevel()) {
                        continue;
                    }

                    let damage = 0;
                    if (!defense.isImmune(offense)) {
                        damage = offense.calcDamage(maxHP);
                        hp = offense.calcRemainingHP(hp, maxHP, eqCount);

                        if (offense.isDamageTypeEQ()) {                           
                            eqCount++;
                        }
                        this.add(new OffenseDamage(offense, null, false, damage, hp));
                    } else {
                        this.add(new OffenseDamage(offense, null, true, damage, hp));
                    }
                    
                    if (hp <= 0) {
                        return;
                    }
                } else {
                    throw new Error(`Invalid offense in offenseOrderList: ${offense}`);
                }
            }
        } else {
            if (!(defense instanceof Defense)) {
                throw new Error(`Invalid defense: ${defense}`);
            } else {
                throw new Error(`Invalid offenseOrderList: ${offenseOrderList}`);
            }          
        }
    }

    get(index) {
        const offenseDamage = this.offenseDamageList[index];
        return offenseDamage !== undefined ? offenseDamage : null;
    }

    getLast() {
        return this.get(this.getLength() - 1);
    }

    getLength() {
        return this.offenseDamageList.length;
    }

    isEmpty() {
        return this.getLength() == 0;
    }

    clear() {
        this.offenseDamageList.length = 0;
    }
}