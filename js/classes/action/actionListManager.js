class ActionListManager {

    // Store list of actions
    // For more details about what does action do, check action class

    constructor() {
        this._actionList = [];
    }

    add(newAction) {
        if (newAction instanceof Action) {
            this.actionList.push(newAction);
        } else {
            throw new Error(`Invalid action: ${newAction}`);
        }
    }

    // Get action based on its index in the list
    get(index) {
        const damageLog = this.actionList[index];
        return damageLog !== undefined ? damageLog : null;
    }

    getLength() {
        return this.actionList.length;
    }

    isEmpty() {
        return this.getLength() == 0;
    }

    // Remove a action based on its index in the list
    removeItemAtIndex(index) {
        if (NumberUtil.isNumber(index) && !isNaN(index)) {         
            if (index < 0 || index >= this.getLength()) {
                throw new Error("Index out of range.");
            }
        
            const newActionList = [];
            let count = 0;
            let isRemoved = false;
            for (const action in this.actionList) {
                count++;
                if (count !== index) {
                    newActionList.push(action);
                    isRemoved = true;
                }
            }
            this._actionList = newActionList;
            return isRemoved;
        } else {
            throw new Error(`Invalid index: ${index}`);
        }
    }

    // Remove the last n amount of actions in the list
    removeCount(amount) {
        const maxAmount = Number.parseInt(amount);
        if (!Number.isNaN(maxAmount)) {           
            for (let count = 0; count < maxAmount; count++) {
                this.actionList.pop();
            }
        } else {
            throw new Error(`Invalid amount: ${amount}`);       
        }
    }

    // Empty action list
    clear() {
        this.actionList.length = 0;
    }

    // Getter
    get actionList() {
        return this._actionList;
    }
}