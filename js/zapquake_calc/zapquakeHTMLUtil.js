class ZapquakeHTMLUtil {

    // Store all convenient functions related to html that is used by zapquake calculator page only

    // Create row for spell composition from spell node converted from spell count list
    static createSpellsContainerDiv(nodeArray) {
        if (Array.isArray(nodeArray)) {
            const columnDiv = document.createElement('div');
            columnDiv.className = "col";

            const spellsContainerDiv = document.createElement('div');
            spellsContainerDiv.className = "row gy-2 gx-1 align-items-center";
            columnDiv.appendChild(spellsContainerDiv);

            HTMLUtil.appendAllChilds(spellsContainerDiv, nodeArray);
            return columnDiv;
        } else {
            throw new Error(`Invalid nodeArray: ${nodeArray}`);
        }
    }
    
    // Convert spell count list into spell node
    static createSpellNodeArray(spellCountListManager) {
        if (spellCountListManager instanceof SpellCountListManager) {
            const nodeArray = [];
            
            const spellList = document.createElement("div");
            spellList.className = "col-9 col-sm-8 d-flex justify-content-end gap-2";
            for (const spellCount of spellCountListManager.spellCountList) {
                spellList.appendChild(ZapquakeHTMLUtil.createSpellDiv(spellCount.spell, spellCount.count));
            }
            nodeArray.push(spellList);
                
            const spellCountDiv = document.createElement("div");
            spellCountDiv.className = "col-3 col-sm-4";

            const spellCountRow = document.createElement("div");
            spellCountRow.className = "row row-cols-1";
            spellCountDiv.appendChild(spellCountRow);

            const normalSpellCount = document.createElement("span");
            normalSpellCount.className = "col fs-5 fw-bold";
            normalSpellCount.textContent = `(${spellCountListManager.getTotalSpellCount(true)}/${maxSpellCount})`;
            spellCountRow.appendChild(normalSpellCount);
    
            const donatedSpellList = spellCountListManager.getDonatedSpell();
            if (!donatedSpellList.isEmpty()) {
                const donateSpellCount = document.createElement("div");
                donateSpellCount.className = "col d-flex align-items-center";
                spellCountRow.appendChild(donateSpellCount);
    
                const donateAmountDiv = document.createElement("div");
                donateAmountDiv.className = "fs-5 fw-bold";
                donateAmountDiv.textContent = `+${donatedSpellList.getTotalSpellCount(false)}`;
                donateSpellCount.appendChild(donateAmountDiv);
    
                const donateIcon = document.createElement("img");
                donateIcon.className = "image";
                donateIcon.setAttribute("height", "18");
                donateIcon.setAttribute("src", "/images/other/donate.webp");              
                donateSpellCount.appendChild(donateIcon);                
            }
            nodeArray.push(spellCountDiv);
            return nodeArray;
        } else {
            throw new Error(`Invalid spellCountListManager: ${spellCountListManager}`);
        }
    }
    
    // Create a html card of a spell
    static createSpellDiv(spell, spellCount) {
        if (spell instanceof Spell) {
            const isDonated = spell.isDonated;
            const imagePath = spell.getImagePath();
    
            const spellContainer = document.createElement("div");
            spellContainer.className = "object-container object-container--tall text-center";
            if (spell.offenseID === eqSpellKey) {
                spellContainer.classList.add("object-container--earthquake");
            }
            
            const objectContainerHeader = document.createElement("div");
            objectContainerHeader.className = "object-container__header";
            spellContainer.appendChild(objectContainerHeader);   

            objectContainerHeader.appendChild(HTMLUtil.createSpellCountOverlay(spellCount));  

            spellContainer.appendChild(HTMLUtil.createLevelOverlay(spell, HTMLUtil.OVERLAY_SMALL));
    
            const img = document.createElement("img");
            img.className = "image";
            img.setAttribute("src", imagePath);
            spellContainer.appendChild(img);

            if (isDonated) {
                spellContainer.appendChild(HTMLUtil.createModifierOverlay(donateImage, HTMLUtil.OVERLAY_SMALL, HTMLUtil.MODIFIER_DONATED));
            }

            return spellContainer;
        } else {
            throw new Error(`Invalid spell: ${spell}`);
        }
    }

    // Create a html card of a equipment
    static createEquipmentDiv(hero, defense) {
        if (hero instanceof Hero && defense instanceof Defense) {
            const equipment = hero.activeEquipment;
            const equipmentID = equipment.offenseID;
            const imagePath = equipment.getImagePath();
    
            const equipmentContainer = document.createElement("div");
            equipmentContainer.className = "object-container object-container--tall text-center";
            if (defense.isImmune(hero)) {
                equipmentContainer.classList.add("object-container--immune");
            } else if (equipment.isRarityEpic()) {
                equipmentContainer.classList.add("object-container--epic");
            }
            equipmentContainer.setAttribute("data-id", equipmentID);
            
            const objectContainerHeader = document.createElement("div");
            objectContainerHeader.className = "object-container__header";
            equipmentContainer.appendChild(objectContainerHeader);          

            objectContainerHeader.appendChild(HTMLUtil.createLevelOverlay(equipment, HTMLUtil.OVERLAY_TALL));
    
            const img = document.createElement("img");
            img.className = "image";
            img.setAttribute("src", imagePath);
            equipmentContainer.appendChild(img);
    
            return equipmentContainer;
        } else {
            if (!(hero instanceof Hero)) {
                throw new Error(`Invalid hero: ${hero}`);
            } else {
                throw new Error(`Invalid defense: ${defense}`);
            }
        }
    }
    
    // Create a defense div to be added to the page
    static createDefenseDiv(defense) {
        if (defense instanceof Defense) {
            const defenseID = defense.defenseID;
            const name = defense.name;
            const imagePath = defense.getImagePath();
            const currentLevelPos = defense.currentLevelPos;
            const maxLevelPos = defense.maxLevelPos;
            const minLevelPos = 0;
            const hp = defense.getCurrentMaxHP();
    
            const defenseDiv = document.createElement("div");
            defenseDiv.className = "defense";
            HTMLUtil.setDataID(defenseDiv, defenseID);
            HTMLUtil.setDataDefenseStatus(defenseDiv, true);
    
            const borderDiv = document.createElement("div");
            borderDiv.className = "card-custom card-custom__main shadow p-3";
            defenseDiv.appendChild(borderDiv);
    
            const titleDiv = document.createElement("div");
            titleDiv.className = "d-flex align-items-center";
            borderDiv.appendChild(titleDiv);
    
            const mainImgDiv = document.createElement("div");
            titleDiv.appendChild(mainImgDiv);
    
            const mainImg = document.createElement("img");
            mainImg.className = "image--main";
            mainImg.src = imagePath;
            mainImgDiv.appendChild(mainImg);
    
            const infoDiv = document.createElement("div");
            infoDiv.className = "ms-3";
            titleDiv.appendChild(infoDiv);
    
            const nameDiv = document.createElement("div");
            nameDiv.className = "h5";
            infoDiv.appendChild(nameDiv);
    
            const nameSpan = document.createElement("span");
            nameSpan.className = "name";
            nameSpan.textContent = `${name}`;
            nameDiv.appendChild(nameSpan);
    
            const statDiv = document.createElement("div");
            statDiv.className = "d-flex flex-wrap gap-2";
            infoDiv.appendChild(statDiv);
    
            const hpDiv = document.createElement("div");
            hpDiv.className = "card-custom card-custom__stat";
            statDiv.appendChild(hpDiv);
    
            const hpIcon = document.createElement("span");
            hpIcon.textContent = "❤️";
            hpDiv.appendChild(hpIcon);
    
            const hpNumber = document.createElement("span");
            hpNumber.className = "hp text text--hp-full";
            hpNumber.textContent = hp;
            hpDiv.appendChild(hpNumber);
            
            const levelDiv = document.createElement("div");
            levelDiv.className = "card-custom card-custom__stat";
            statDiv.appendChild(levelDiv);
    
            const levelIcon = document.createElement("i");
            levelIcon.className = "fa-solid fa-chart-simple me-1";
            levelDiv.appendChild(levelIcon);
            
            const levelNumber = document.createElement("span");
            levelNumber.className = "level text";
            levelNumber.textContent = defense.getCurrentLevel();
            if (defense.isMaxLevel()) {
                HTMLUtil.addTextMaxedClass(levelNumber);
            }
            levelDiv.appendChild(levelNumber);
    
            const slider = document.createElement("input");
            slider.setAttribute("type", "range");
            slider.className = "slider mt-3";
            slider.setAttribute("min", minLevelPos);
            slider.setAttribute("max", maxLevelPos);
            slider.setAttribute("value", currentLevelPos);
            slider.setAttribute("oninput", "updateDefense(this)");
            borderDiv.appendChild(slider);
    
            const resultDiv = document.createElement("div");
            resultDiv.className = "my-3";
            borderDiv.appendChild(resultDiv);
    
            const equipmentUsedDiv = document.createElement("div");
            equipmentUsedDiv.className = "equipment-div";
            resultDiv.appendChild(equipmentUsedDiv);
    
            const equipmentUsedTitle = document.createElement("h5");
            equipmentUsedTitle.textContent = "Heroes Equipment used:";
            equipmentUsedDiv.appendChild(equipmentUsedTitle);
    
            const equipmentUsedList = document.createElement("div");
            equipmentUsedList.className = "equipment-list d-flex justify-content-center align-items-center flex-wrap gap-2";
            equipmentUsedDiv.appendChild(equipmentUsedList);
    
            const statusDiv = document.createElement("div");
            statusDiv.className = "status-div status-container d-flex align-items-center my-3 d-none";
            resultDiv.appendChild(statusDiv);
    
            const statusImg = document.createElement("img");
            statusImg.className = "image status-container__img";
            statusImg.setAttribute("width", "80");
            statusDiv.appendChild(statusImg);
    
            const statusText = document.createElement("div");
            statusText.className = "info status-container__text";
            statusDiv.appendChild(statusText);
            
            const spellNeededDiv = document.createElement("div");
            spellNeededDiv.className = "spell-div container-fluid mt-3";
            resultDiv.appendChild(spellNeededDiv);
    
            const spellNeededTitle = document.createElement("h5");
            spellNeededTitle.textContent = "Spell needed:";
            spellNeededDiv.appendChild(spellNeededTitle);
    
            const mainSpellNeededList = document.createElement("div");
            mainSpellNeededList.className = "spell-main-display row gy-2 gx-1 align-items-center";
            spellNeededDiv.appendChild(mainSpellNeededList);
    
            const buttonDiv = document.createElement("div");
            buttonDiv.className = "collapse-btn text-center my-3";
            spellNeededDiv.appendChild(buttonDiv);
    
            const button = document.createElement("button");
            button.className = "show-more-btn btn btn-secondary";
            button.setAttribute("type", "button");
            button.setAttribute("data-bs-toggle", "collapse");
            button.setAttribute("data-bs-target", `#showMore-${defenseID}`);
            button.setAttribute("aria-controls", `showMore-${defenseID}`);
            button.setAttribute("aria-expanded", "false");
            button.textContent = "Show More";
            button.setAttribute("onclick", "toggleHTMLCollapseBtnText(this)");
            buttonDiv.appendChild(button);
    
            const spellNeededList = document.createElement("div");
            spellNeededList.className = "spell-display row row-cols-1 gy-2 gx-0 collapse";
            spellNeededList.id = `showMore-${defenseID}`;
            spellNeededDiv.appendChild(spellNeededList);

            return defenseDiv;
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }
    }
}