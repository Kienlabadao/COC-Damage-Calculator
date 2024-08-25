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
        if (NumberUtil.isNumber(index)) {         
            if (!this.isValidIndex(index)) {
                throw new Error("Index out of range.");
            }
        
            const newActionList = [];
            let count = 0;
            let isRemoved = false;
            for (const action of this.actionList) {                
                if (count !== index) {
                    newActionList.push(action);
                    isRemoved = true;
                }
                count++;
            }
            this._actionList = newActionList;
            return isRemoved;
        } else {
            throw new Error(`Invalid index: ${index}`);
        }
    }

    // Remove the last n amount of actions in the list
    removeCount(amount) {
        if (Number.isNumber(maxAmount)) {           
            for (let count = 0; count < maxAmount; count++) {
                this.actionList.pop();
            }
        } else {
            throw new Error(`Invalid amount: ${amount}`);       
        }
    }

    swap(index1, index2) {
        if (this.getLength() < 2) {
            throw new Error(`Array length is insufficient to perform swap: ${this.getLength()}`); 
        }
    
        if (!NumberUtil.isNumber(index1) || !this.isValidIndex(index1)) {
            throw new Error(`Invalid index1: ${index1}`); 
        }

        if (!NumberUtil.isNumber(index2) || !this.isValidIndex(index2)) {
            throw new Error(`Invalid index2: ${index2}`); 
        }

        [this.actionList[index1], this.actionList[index2]] = [this.actionList[index2], this.actionList[index1]];
    }

    isValidIndex(index) {
        return index >= 0 && index < this.getLength();
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