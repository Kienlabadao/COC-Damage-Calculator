class Offense {

    constructor(offenseID, type) {
        this.type = type;
        this.offenseID = offenseID;
        this.setOffenseJSON();
        this.damageType = this.offenseJSON["damage_type"];  
    }

    setOffenseJSON() {
        switch (this.type) {
            case "spell":
                this.offenseJSON = getSpell(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error("Invalid offenseID: " + newOffenseID);
                }
                break;
            case "equipment":
                this.offenseJSON = getEquipment(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error("Invalid offenseID: " + newOffenseID);
                }
                break;
            case "troop":
                this.offenseJSON = getTroop(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error("Invalid offenseID: " + newOffenseID);
                }
                break;
            case "modifier":
                this.offenseJSON = getModifier(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error("Invalid offenseID: " + newOffenseID);
                }
                break;
            case "repair":
                this.offenseJSON = getRepair(this.offenseID);
                if (this.offenseJSON === undefined) {
                    throw new Error("Invalid offenseID: " + newOffenseID);
                }
                break;
            default:
                throw new Error("Invalid type: " + this.type);
        }  
    }

    isDamageTypeEQ() {
        return this.damageType === "earthquake";
    }
}