class DamageLogListManager {

    // Store list of damage logs
    // For more details about what does damage log do, check damage log class

    constructor() {
        this._damageLogList = [];
    }

    add(newDamageLog) {
        if (!(newDamageLog instanceof DamageLog)) {
            throw new Error(`Invalid damageLog: ${newDamageLog}`);
        }
        this.damageLogList.push(newDamageLog);
    }

    // Load damage log content based on the defense that it attacks, and offense order in action list
    // It loads until either action list run out, or the defense is destroyed
    loadWithActionList(defense, actionListManager) {
        if (!(defense instanceof Defense)) {
            throw new Error(`Invalid defense: ${defense}`);
        }
        if (!(actionListManager instanceof ActionListManager)) {
            throw new Error(`Invalid actionListManager: ${actionListManager}`);
        }
        const clonedDefense = defense.clone();
        for (const action of actionListManager.actionList) {
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