class ActionListManager {

    constructor() {
        this.actionList = [];
    }

    add(newAction) {
        if (newAction instanceof Action) {
            this.actionList.push(newAction);
        } else {
            throw new Error(`Invalid action: ${newAction}`);
        }
    }

    get(index) {
        const offenseDamage = this.actionList[index];
        return offenseDamage !== undefined ? offenseDamage : null;
    }

    getLength() {
        return this.actionList.length;
    }

    isEmpty() {
        return this.getLength() == 0;
    }

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

    clear() {
        this.actionList.length = 0;
    }
}