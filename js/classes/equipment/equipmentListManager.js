class EquipmentListManager {

    // Store list of equipments
    // For more details about what does equipment do, check equipment class

    constructor() {
        this._equipmentList = [];
    }

    loadAll() {
        for (const equipmentID of Object.keys(getAllEquipments())) {              
            this.add(new Equipment(equipmentID, null, true));
        }
    }

    // Load all equipments based on json file
    // Current level and activation is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (max level and false. respectively)
    loadKey(type, heroID) {
        for (const equipmentID of Object.keys(getAllEquipments())) {
            if (getEquipment(equipmentID)["user"] === heroID) {
                if (type !== "simple" || getEquipment(equipmentID)["equipment_type"].includes("damage")) {
                    const key = LocalStorageUtils.getObjectKey(type, "equipment", equipmentID);
                    const useEquipmentKey = LocalStorageUtils.getUseObjectKey(type, "equipment", equipmentID);
                    const equipment = new Equipment(equipmentID, null, LocalStorageUtils.loadBoolean(useEquipmentKey, false));
                    
                    try {
                        equipment.currentLevelPos = LocalStorageUtils.loadNumber(key, equipment.currentLevelPos); 
                    } catch(error) {
                        console.warn(error);
                        console.warn("Invalid level found! Revert to default level.");
                        LocalStorageUtils.saveNumber(key, equipment.currentLevelPos);
                    }                   
                    this.add(equipment);
                }                
            }
        }
    }

    // Get equipment based on its ID
    getEquipment(equipmentID) {
        for (const equipment of this.equipmentList) {
            if (equipment.equipmentID === equipmentID) {
                return equipment;
            }
        }
        return null;
    }

    // Check if equipment already exist in the list
    contain(checkEquipment) {
        for (const equipment of this.equipmentList) {
            if (equipment.compare(checkEquipment)) {
                return true;
            }
        }
        return false;
    }

    // Add new equipment and check for unique
    add(newEquipment) {
        if (newEquipment instanceof Equipment) {
            if (!this.contain(newEquipment)) {
                this.equipmentList.push(newEquipment);
            } else {
                throw new Error(`Equipment already exist: ${newEquipment}`);
            }
        } else {
            throw new TypeError(`Invalid newEquipment: ${newEquipment}`);
        }              
    }

    getLength() {
        return this.equipmentList.length;
    }

    isEmpty() {
        return this.getLength() === 0;
    }

    clone() {
        const clonedEquipmentListManager = new EquipmentListManager();

        for (const equipment of this.equipmentList) {
            clonedEquipmentListManager.add(equipment.clone());
        }
        return clonedEquipmentListManager;
    }

    // Getter
    get equipmentList() {
        return this._equipmentList;
    }
}