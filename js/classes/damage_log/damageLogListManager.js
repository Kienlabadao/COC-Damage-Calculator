class DamageLogListManager {

    // Store list of damage logs
    // For more details about what does damage log do, check damage log class

    constructor() {
        this._damageLogList = [];
    }

    add(newDamageLog) {
        if (newDamageLog instanceof DamageLog) {
            this.damageLogList.push(newDamageLog);
        } else {
            throw new TypeError(`Invalid damageLog: ${newDamageLog}`);
        }
    }

    // Load damage log content based on the defense that it attacks, and offense order in action list
    // It loads until either action list run out, or the defense is destroyed
    loadWithActionList(defense, actionListManager) {
        if (defense instanceof Defense && actionListManager instanceof ActionListManager) {
            const clonedDefense = defense.clone();
            for (const action of actionListManager.actionList) {
                const offense = action.offense;
                const modifier = offense.activeModifier;

                if (!offense.isEnabled) {
                    continue;
                }

                const isImmune = clonedDefense.isImmune(offense);
                let damage = 0;
                let modifiedDamage = 0;
                let hardModeDamage = 0;
                let reducedEQDamage = 0;
                let remainingHP = clonedDefense.remainingHP;

                if (!isImmune) {
                    damage = offense.calcDamage(clonedDefense);
                    
                    if (offense.isDamageTypeEQ()) {
                        reducedEQDamage = NumberUtil.round2Places(offense.calcBaseEQDamage(clonedDefense.getCurrentMaxHP()) - damage);
                    } else {
                        if (modifier !== null) {
                            const clonedOffense = offense.clone();
                            clonedOffense.activeModifier = null;
                            modifiedDamage = NumberUtil.round2Places(damage - clonedOffense.calcDamage(clonedDefense));
                        }

                        if (offense instanceof Hero && offense.isHardModeEnabled) {
                            const clonedOffense = offense.clone();
                            clonedOffense.isHardModeEnabled = false;
                            
                            hardModeDamage = NumberUtil.round2Places(clonedOffense.calcDamage(clonedDefense) - damage);
                        }
                    }

                    offense.calcRemainingHP(clonedDefense);
                    remainingHP = clonedDefense.remainingHP;
                }

                this.add(new DamageLog(action, clonedDefense.clone(), isImmune, damage, modifiedDamage, hardModeDamage, reducedEQDamage, remainingHP));
                
                if (clonedDefense.isDestroyed()) {
                    return;
                }
            }
        } else {
            if (!(defense instanceof Defense)) {
                throw new TypeError(`Invalid defense: ${defense}`);
            } else {
                throw new TypeError(`Invalid actionListManager: ${actionListManager}`);
            }          
        }
    }

    // Get damage log based on its index in the list
    get(index) {
        const damageLog = this.damageLogList[index];
        return damageLog !== undefined ? damageLog : null;
    }

    // Get the last damage log in the list 
    // Mainly to check if defense is destroyed
    getLast() {
        return this.get(this.getLength() - 1);
    }
    
    getLength() {
        return this.damageLogList.length;
    }

    isEmpty() {
        return this.getLength() == 0;
    }

    // Empty damage log list
    clear() {
        this.damageLogList.length = 0;
    }

    // Getter
    get damageLogList() {
        return this._damageLogList;
    }
}