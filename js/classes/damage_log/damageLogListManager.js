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
                const damage = offense.calcDamage(clonedDefense);
                offense.calcRemainingHP(clonedDefense);                
                const remainingHP = clonedDefense.remainingHP;

                this.add(new DamageLog(offense, modifier, clonedDefense.clone(), damage, isImmune, remainingHP));
                
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