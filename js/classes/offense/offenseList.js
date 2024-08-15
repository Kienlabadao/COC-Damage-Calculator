class OffenseList {
    constructor() {
        this.offenseList = [];
    }

    load() {
        this.loadSpell(); 
        this.loadEquipment();
        this.loadTroop();
        this.loadModifier();
        this.loadRepair();
    }
    
    loadKey(type) {
        switch (type) {
            case "simple":
                this.loadSpellWithKey(type);
                this.loadEquipmentWithKey(type);
                break;
            default:
                this.loadSpellWithKey(type); 
                this.loadEquipmentWithKey(type);
                this.loadTroopWithKey(type);
                this.loadModifierWithKey(type);
                this.loadRepairWithKey(type);
        }
    }

    loadSpellWithKey(type) {
        for (const spellID of Object.keys(getAllSpells())) {
            const spell = new Spell(spellID, false, null);
            const key = LocalStorageUtils.getObjectKey(type, spellID);

            spell.currentLevelPos = LocalStorageUtils.loadNumber(key, spell.currentLevelPos);
            this.addOffense(spell);
        }
    }

    loadEquipmentWithKey(type) {
        console.log(Object.keys(getAllEquipments()));
        for (const equipmentID of Object.keys(getAllEquipments())) {
            const equipment = new Equipment(equipmentID, null);
            const key = LocalStorageUtils.getObjectKey(type, equipmentID);

            if (type === "simple") {
                equipment.currentLevelPos = LocalStorageUtils.loadNumber(key, 0);
            } else {
                equipment.currentLevelPos = LocalStorageUtils.loadNumber(key, equipment.currentLevelPos);
            }           
            this.addOffense(equipment);
        }
    }

    loadTroopWithKey(type) {
        for (const troopID of Object.keys(getAllTroops())) {
            const troop = new Troop(troopID, null);
            const key = LocalStorageUtils.getObjectKey(type, troopID);

            troop.currentLevelPos = LocalStorageUtils.loadNumber(key, troop.currentLevelPos);          
            this.addOffense(troop);
        }
    }

    loadRepairWithKey(type) {
        for (const repairID of Object.keys(getAllRepairs())) {
            const repair = new Repair(repairID, null, false);
            const key = LocalStorageUtils.getObjectKey(type, repairID);

            repair.currentLevelPos = LocalStorageUtils.loadNumber(key, repair.currentLevelPos);          
            this.addOffense(modifier);
        }
    }

    loadModifierWithKey(type) {
        for (const modifierID of Object.keys(getAllModifiers())) {
            const modifier = new Modifier(modifierID, null);
            const key = LocalStorageUtils.getObjectKey(type, modifierID);

            modifier.currentLevelPos = LocalStorageUtils.loadNumber(key, modifier.currentLevelPos);          
            this.addOffense(modifier);
        }
    }

    loadSpell() {
        for (const spellID of Object.keys(getAllSpells())) {
            this.addOffense(new Spell(spellID, false, null));
        }
    }

    loadEquipment() {
        for (const equipmentID of Object.keys(getAllEquipments())) {         
            this.addOffense(new Equipment(equipmentID, null));
        }
    }

    loadTroop() {
        for (const troopID of Object.keys(getAllTroops())) {       
            this.addOffense(new Troop(troopID, null));
        }
    }

    loadRepair() {
        for (const repairID of Object.keys(getAllRepairs())) {       
            this.addOffense(new Repair(repairID, null, false));
        }
    }

    loadModifier() {
        for (const modifierID of Object.keys(getAllModifiers())) {       
            this.addOffense(new Modifier(modifierID, null));
        }
    }

    getOffense(offenseID) {
        for (const offense of this.offenseList) {
            if (offense.offenseID === offenseID) {
                return offense;
            }
        }
        return null;
    }

    getEquipment(equipmentID) {
        for (const equipment of this.getEquipmentList()) {
            if (equipment.offenseID === equipmentID) {
                return equipment;
            }
        }
        return null;
    }

    getSpell(spellID, isDonated) {
        for (const spell of this.getSpellList()) {
            if (spell.offenseID === spellID) {
                if (spell.isDonated === isDonated) {
                    return spell;
                }               
            }
        }
        return null;
    }

    getTroop(troopID) {
        for (const troop of this.getTroopList()) {
            if (troop.offenseID === troopID) {
                return troop;
            }
        }
        return null;
    }

    getModifier(modifierID) {
        for (const modifier of this.getModifierList()) {
            if (modifier.offenseID === modifierID) {
                return modifier;
            }
        }
        return null;
    }

    getRepair(repairID) {
        for (const repair of this.getRepairList()) {
            if (repair.offenseID === repairID) {
                return repair;
            }
        }
        return null;
    }

    getEquipmentList() {
        const equipmentList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Equipment) {
                equipmentList.push(offense);
            }
        }
        return equipmentList;
    }

    getSpellList() {
        const spellList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Spell) {
                spellList.push(offense);
            }
        }
        return spellList;
    }

    getTroopList() {
        const troopList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Troop) {
                troopList.push(offense);
            }
        }
        return troopList;
    }

    getModifierList() {
        const modifierList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Modifier) {
                modifierList.push(offense);
            }
        }
        return modifierList;
    }

    getRepairList() {
        const repairList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Repair) {
                repairList.push(offense);
            }
        }
        return repairList;
    }

    addDonatedSpell(spellID, type) {
        for (const offenseID of Object.keys(getAllSpells())) {
            if (offenseID === spellID) {
                const spell = new Spell(spellID, true, null);
                spell.currentLevelPos = LocalStorageUtils.loadNumber(LocalStorageUtils.getObjectKeyDonated(type, spellID), spell.currentLevelPos);

                this.addOffense(spell);
                return;
            }            
        }
        throw new Error(`Invalid spellID: ${spellID}`);
    }

    contain(checkOffense) {
        for (const offense of this.offenseList) {
            if (offense.offenseID === checkOffense.offenseID) {
                if (checkOffense instanceof Spell) {
                    if (offense.isDonated !== checkOffense.isDonated) {
                        continue;
                    }
                }
                return true;
            }
        }
        return false;
    }

    addOffense(newOffense) {
        if (!this.contain(newOffense)) {
            this.offenseList.push(newOffense);
        } else {
            throw new Error(`Offense already exist: ${newOffense}`);
        }       
    }
}