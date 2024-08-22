class HTMLUtil {

    static OVERLAY_NORMAL = 0;
    static OVERLAY_SMALL = 1;
    static OVERLAY_RESPONSIVE = 2;

    static MODIFIER_RAGED = 0;
    static MODIFIER_DEATH = 1;

    static addMaxedClass(overlayDiv) {
        overlayDiv.classList.add("overlay__number--level-maxed");
    }
    
    static addNotMaxedClass(overlayDiv) {
        overlayDiv.classList.remove("overlay__number--level-maxed");
    }
    
    static showDiv(div) {
        div.classList.remove("d-none");
    }
    
    static hideDiv(div) {
        div.classList.add("d-none");
    }
    
    static getDataID(dataDiv) {
        return HTMLUtil.getDataString(dataDiv, "data-id");
    }
    
    static getDataDonated(dataDiv) {
        return HTMLUtil.getDataBoolean(dataDiv, "data-donated");
    }
    
    static getDataDefenseStatus(dataDiv) {
        return HTMLUtil.getDataBoolean(dataDiv, "data-defense-status");
    }
    
    static getDataString(dataDiv, attribute) {
        return dataDiv.getAttribute(attribute);
    }
    
    static setDataID(dataDiv, value) {
        return HTMLUtil.setDataString(dataDiv, "data-id", value);
    }
    
    static setDataDonated(dataDiv, value) {
        return HTMLUtil.setDataString(dataDiv, "data-donated", value);
    }
    
    static setDataDefenseStatus(dataDiv, value) {
        return HTMLUtil.setDataString(dataDiv, "data-defense-status", value);
    }
    
    static clearDataID(dataDiv) {
        return HTMLUtil.setDataString(dataDiv, "data-id", "");
    }
    
    static clearDataDonated(dataDiv) {
        return HTMLUtil.setDataString(dataDiv, "data-donated", "");
    }
    
    static clearDataDefenseStatus(dataDiv) {
        return HTMLUtil.setDataString(dataDiv, "data-defense-status", "");
    }
    
    static setDataString(dataDiv, attribute, value) {
        return dataDiv.setAttribute(attribute, value);
    }
    
    static getDataBoolean(dataDiv, attribute) {
        const boolean = dataDiv.getAttribute(attribute);
        if (boolean === "true" || boolean === "false") {
            return boolean  === "true";
        } else {
            throw new Error(`Invalid boolean dataDiv: ${boolean}`);
        }
    }
    
    static removeChild(parentDiv, selectorString) {
        const removeDiv = parentDiv.querySelector(selectorString);
    
        if (removeDiv !== null) {
            parentDiv.removeChild(removeDiv);
            return true;
        }
        return false;
    }
    
    static removeAllChilds(div) {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        return div;
    }
    
    static appendAllChilds(div, nodeArray) {
        if (Array.isArray(nodeArray)) {
            for (const node of nodeArray) {
                div.appendChild(node.cloneNode(true));
            }
        } else {
            throw new Error(`Invalid nodeArray: ${nodeArray}`);
        }   
    }
    
    static getParentDiv(childDiv, parentDivClass) {
        do {
            if(childDiv.classList.contains(parentDivClass)){
                break;
            } else {
                childDiv = childDiv.parentNode;
            }
        } while (childDiv != null);
        return childDiv;
    }

    static createModifierOverlay(imagePath, overlayType = HTMLUtil.OVERLAY_NORMAL, modifierType) {
        const modifierOverlay = document.createElement("div");
        modifierOverlay.className = "modifier overlay overlay--top-left overlay__img";
    
        switch (overlayType) {
            case HTMLUtil.OVERLAY_NORMAL:            
                break;
            case HTMLUtil.OVERLAY_SMALL:
                modifierOverlay.classList.add("overlay--small");           
                break; 
            case HTMLUtil.OVERLAY_RESPONSIVE:
                modifierOverlay.classList.add("overlay--responsive");                
                break;     
            default:
                throw new Error(`Invalid overlayType: ${overlayType}`);
        }

        switch (modifierType) {
            case HTMLUtil.MODIFIER_RAGED:  
                modifierOverlay.classList.add("overlay__img--raged");          
                break;
            case HTMLUtil.MODIFIER_DEATH:
                modifierOverlay.classList.add("overlay__img--death");          
                break;   
            default:
                throw new Error(`Invalid modifierType: ${modifierType}`);
        }

        const img = document.createElement("img");
        img.setAttribute("src", imagePath);
        modifierOverlay.appendChild(img);
    
        return modifierOverlay;
    }
    
    static createLevelOverlay(object, overlayType = HTMLUtil.OVERLAY_NORMAL) {
        if (object instanceof Defense || object instanceof Offense) {
            const levelOverlay = document.createElement("div");
            levelOverlay.className = "modifier overlay overlay--bottom-left overlay__number";
        
            switch (overlayType) {
                case HTMLUtil.OVERLAY_NORMAL:            
                    break;
                case HTMLUtil.OVERLAY_SMALL:
                    levelOverlay.classList.add("overlay--small");           
                    break; 
                case HTMLUtil.OVERLAY_RESPONSIVE:
                    levelOverlay.classList.add("overlay--responsive");                
                    break;     
                default:
                    throw new Error(`Invalid overlayType: ${overlayType}`);
            }
            if (object.isMaxLevel()) {
                levelOverlay.classList.add("overlay__number--level-maxed");
            }
            levelOverlay.textContent = object.getCurrentLevel();
        
            return levelOverlay;
        } else {
            throw new Error(`Invalid object: ${object}`);
        }
    }

    static createOrderOverlay(orderNumber, overlayType = HTMLUtil.OVERLAY_NORMAL) {
        const orderOverlay = document.createElement("div");
        orderOverlay.className = "modifier overlay overlay--top-right overlay__number overlay__number--order";
    
        switch (overlayType) {
            case HTMLUtil.OVERLAY_NORMAL:            
                break;
            case HTMLUtil.OVERLAY_SMALL:
                orderOverlay.classList.add("overlay--small");           
                break; 
            case HTMLUtil.OVERLAY_RESPONSIVE:
                orderOverlay.classList.add("overlay--responsive");                
                break;     
            default:
                throw new Error(`Invalid overlayType: ${overlayType}`);
        }
        orderOverlay.textContent = orderNumber;
    
        return orderOverlay;
    }
}