class DamageLogListManager {

    static DECIMAL_PLACE = 2;

    constructor() {
        this.damageLogList = [];
    }

    add(newDamageLog) {
        if (newDamageLog instanceof DamageLog) {
            this.damageLogList.push(newDamageLog);
        } else {
            throw new Error(`Invalid damageLog: ${newDamageLog}`);
        }
    }

    loadWithOffenseOrderList(defense, offenseOrderList) {
        if (defense instanceof Defense && Array.isArray(offenseOrderList)) {
            const clonedDefense = defense.clone();
            
            for (const offense of offenseOrderList) {
                if (offense instanceof Offense) {
                    if (offense.isMinLevel()) {
                        continue;
                    }
                    
                    const isImmune = clonedDefense.isImmune(offense);
                    const damage = offense.calcDamage(clonedDefense);
                    offense.calcRemainingHP(clonedDefense);              
                    const remainingHP = clonedDefense.remainingHP;

                    this.add(new DamageLog(offense, null, clonedDefense.clone(), damage, isImmune, remainingHP));

                    if (clonedDefense.isDestroyed()) {
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
            const clonedDefense = defense.clone();

            for (const action of actionListManager.getActionList()) {
                const offense = action.offense;
                const modifier = action.modifier;

                if (offense.isMinLevel()) {
                    continue;
                }

                const modify = modifier instanceof Modifier ? modifier.getCurrentModify() : 0;
                const isImmune = clonedDefense.isImmune(offense);
                const damage = offense.calcDamage(clonedDefense, modify);
                offense.calcRemainingHP(clonedDefense, modify);                
                const remainingHP = clonedDefense.remainingHP;

                this.add(new DamageLog(offense, modifier, clonedDefense.clone(), damage, isImmune, remainingHP));
                
                if (clonedDefense.isDestroyed()) {
                    return;
                }
            }
        } else {
            if (!(defense instanceof Defense)) {
                throw new Error(`Invalid defense: ${defense}`);
            } else {
                throw new Error(`Invalid actionListManager: ${actionListManager}`);
            }          
        }
    }

    get(index) {
        const damageLog = this.damageLogList[index];
        return damageLog !== undefined ? damageLog : null;
    }

    getLast() {
        return this.get(this.getLength() - 1);
    }

    getDamageLogList() {
        return this.damageLogList;
    }
    
    getLength() {
        return this.damageLogList.length;
    }

    isEmpty() {
        return this.getLength() == 0;
    }

    clear() {
        this.damageLogList.length = 0;
    }
}