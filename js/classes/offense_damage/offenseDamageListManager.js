class OffenseDamageListManager {

    static DECIMAL_PLACE = 2;

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

    loadWithOffenseOrderList(defense, offenseOrderList) {
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
                        if (offense.isDamageTypeEQ()) {
                            offense.eqCount = eqCount++;
                        }
                        damage = round(offense.calcDamage(maxHP), OffenseDamageListManager.DECIMAL_PLACE);                           
                        hp = round(offense.calcRemainingHP(hp, maxHP), OffenseDamageListManager.DECIMAL_PLACE);
                       
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

    loadWithActionList(defense, actionListManager) {
        if (defense instanceof Defense && actionListManager instanceof ActionListManager) {
            this.clear();
            const maxHP = defense.getCurrentHP();
            let hp = maxHP;
            let eqCount = 0;

            for (const action of actionListManager.getActionList()) {
                const offense = action.offense;
                const modifier = action.modifier;

                if (offense.isMinLevel()) {
                    continue;
                }

                let damage = 0;
                if (!defense.isImmune(offense)) {
                    if (offense instanceof Repair) {
                        let modify = 0;
                        if (modifier instanceof Modifier && modifier.isAffected(Modifier.REPAIR)) {
                            modify = modifier.getCurrentModify();
                        }

                        let repair = round(offense.calcRepair(modify), OffenseDamageListManager.DECIMAL_PLACE);
                        hp = round(offense.calcRemainingHP(hp, modify), OffenseDamageListManager.DECIMAL_PLACE);
                        if (hp > maxHP) {
                            repair = 0;
                            hp = maxHP;
                            this.add(new OffenseDamage(offense, null, false, repair, hp));
                        } else {
                            this.add(new OffenseDamage(offense, modifier, false, repair, hp));
                        }                     
                    } else {
                        if (offense instanceof Troop) {
                            let modify = 0;
                            if (modifier instanceof Modifier && modifier.isAffected(Modifier.TROOP)) {
                                modify = modifier.getCurrentModify();
                            }
                            
                            damage = round(offense.calcDamage(modify), OffenseDamageListManager.DECIMAL_PLACE);
                            hp = round(offense.calcRemainingHP(hp, modify), OffenseDamageListManager.DECIMAL_PLACE);
                        } else if (offense instanceof Spell || offense instanceof Equipment) {
                            if (offense.isDamageTypeEQ()) {                           
                                offense.eqCount = eqCount++;
                            }
                            damage = round(offense.calcDamage(maxHP), OffenseDamageListManager.DECIMAL_PLACE);                           
                            hp = round(offense.calcRemainingHP(hp, maxHP), OffenseDamageListManager.DECIMAL_PLACE);
                        }

                        this.add(new OffenseDamage(offense, modifier, false, damage, hp));
                    }
                } else {
                    this.add(new OffenseDamage(offense, modifier, true, damage, hp));
                }
                
                if (hp <= 0) {
                    console.log(this.offenseDamageList);
                    return;
                }
            }
            console.log(this.offenseDamageList);
        } else {
            if (!(defense instanceof Defense)) {
                throw new Error(`Invalid defense: ${defense}`);
            } else {
                throw new Error(`Invalid actionListManager: ${actionListManager}`);
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

    getOffenseDamageList() {
        return this.offenseDamageList;
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