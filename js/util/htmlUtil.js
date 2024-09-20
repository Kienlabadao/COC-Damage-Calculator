class HTMLUtil {

    // Store all convenient functions related to html that can be used in all pages

    static OVERLAY_NORMAL = 0;
    static OVERLAY_SMALL = 1;
    static OVERLAY_RESPONSIVE = 2;
    static OVERLAY_TALL = 3;

    static MODIFIER_RAGED = 0;
    static MODIFIER_DEATH = 1;
    static MODIFIER_DONATED = 2;

    // Add/remove max class for overlay div
    static addLevelOverlayMaxedClass(overlayDiv) {
        overlayDiv.classList.add("overlay__number--level-maxed");
    }
    
    static removeLevelOverlayMaxedClass(overlayDiv) {
        overlayDiv.classList.remove("overlay__number--level-maxed");
    }
    
    // Add/remove max class for text
    static addTextMaxedClass(textDiv) {
        textDiv.classList.add("text--level-maxed");
    }
    
    static removeTextMaxedClass(textDiv) {
        textDiv.classList.remove("text--level-maxed");
    }

    // Set status text fail/success for status text div
    static setStatusTextSuccess(statusText) {
        statusText.classList.remove("status-container__text--fail");
        statusText.classList.add("status-container__text--success");
    }
    
    static setStatusTextFailed(statusText) {
        statusText.classList.remove("status-container__text--success");
        statusText.classList.add("status-container__text--fail");     
    }

    // Set div visibility
    static showDiv(div) {
        div.classList.remove("d-none");
    }
    
    static hideDiv(div) {
        div.classList.add("d-none");
    }
    
    static isDivHidden(div) {
        div.classList.contains("d-none");
    }

    // Get specific atrribute from div
    static getDataID(dataDiv) {
        return HTMLUtil.getDataString(dataDiv, "data-id");
    }
    
    static getDataDonated(dataDiv) {
        return HTMLUtil.getDataBoolean(dataDiv, "data-donated");
    }
    
    static getDataDefenseStatus(dataDiv) {
        return HTMLUtil.getDataBoolean(dataDiv, "data-defense-status");
    }
    
    // Get atrribute from div
    static getDataString(dataDiv, attribute) {
        return dataDiv.getAttribute(attribute);
    }
    
    // Set specific atrribute from div with value
    static setDataID(dataDiv, value) {
        return HTMLUtil.setDataString(dataDiv, "data-id", value);
    }
    
    static setDataDonated(dataDiv, value) {
        return HTMLUtil.setDataString(dataDiv, "data-donated", value);
    }
    
    static setDataDefenseStatus(dataDiv, value) {
        return HTMLUtil.setDataString(dataDiv, "data-defense-status", value);
    }
    
    // Clear (empty) specific atrribute from div
    static clearDataID(dataDiv) {
        return HTMLUtil.setDataString(dataDiv, "data-id", "");
    }
    
    static clearDataDonated(dataDiv) {
        return HTMLUtil.setDataString(dataDiv, "data-donated", "");
    }
    
    static clearDataDefenseStatus(dataDiv) {
        return HTMLUtil.setDataString(dataDiv, "data-defense-status", "");
    }
    
    // Set atrribute from div with value
    static setDataString(dataDiv, attribute, value) {
        return dataDiv.setAttribute(attribute, value);
    }
    
    // Get boolean type atrribute from div
    static getDataBoolean(dataDiv, attribute) {
        const boolean = dataDiv.getAttribute(attribute);
        if (boolean === "true" || boolean === "false") {
            return boolean  === "true";
        } else {
            throw new Error(`Invalid boolean dataDiv: ${boolean}`);
        }
    }
    
    // Remove child div query from selector string from parent div
    // Unlike the main one which throw error if child div not found, this one return boolean instead
    static removeChild(parentDiv, selectorString) {
        const removeDiv = parentDiv.querySelector(selectorString);
    
        if (removeDiv !== null) {
            parentDiv.removeChild(removeDiv);
            return true;
        }
        return false;
    }
    
    // Remove alls child div from parent div
    static removeAllChilds(div) {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        return div;
    }
    
    // Add alls child div inside an array into parent div
    static appendAllChilds(div, nodeArray) {
        if (Array.isArray(nodeArray)) {
            for (const node of nodeArray) {
                div.appendChild(node.cloneNode(true));
            }
        } else {
            throw new Error(`Invalid nodeArray: ${nodeArray}`);
        }   
    }
    
    // Get parent div from child div that contain certain class
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

    // Toggle Bootstrap's collapse
    static toggleBSCollapse(collapseDiv, state) {
        if (typeof state === "boolean") {
            const collapse = new bootstrap.Collapse(collapseDiv, {
                toggle: false
            });

            if (state) {
                collapse.show();
            } else {
                collapse.hide();
            }
        } else {
            throw new Error(`Invalid state: ${state}`);
        }
    }

    // Create modifier overlay for main overlay
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
            case HTMLUtil.MODIFIER_DONATED:
                break;
            default:
                throw new Error(`Invalid modifierType: ${modifierType}`);
        }

        const img = document.createElement("img");
        img.setAttribute("src", imagePath);
        modifierOverlay.appendChild(img);
    
        return modifierOverlay;
    }
    
    // Create level overlay for main overlay
    static createLevelOverlay(object, overlayType = HTMLUtil.OVERLAY_NORMAL) {
        if (object instanceof Defense || object instanceof Offense || object instanceof Equipment || object instanceof Modifier) {
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
                case HTMLUtil.OVERLAY_TALL:
                    levelOverlay.classList.remove("overlay--bottom-left");                
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

    // Create spell overlay for main overlay
    static createSpellCountOverlay(spellCount) {
        if (NumberUtil.isNumber(spellCount)) {
            const spellCountOverlay = document.createElement("div");

            spellCountOverlay.className = "spell-count overlay overlay__number overlay__number--spell-count";
            spellCountOverlay.textContent = `x${spellCount}`;
        
            return spellCountOverlay;
        } else {
            throw new Error(`Invalid spellCount: ${spellCount}`);
        }
    }

    // Create order overlay for main overlay
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