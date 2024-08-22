class ZapquakeHTMLUtil {

    static createSpellNodeArray(spellCountListManager) {
        if (spellCountListManager instanceof SpellCountListManager) {
            const nodeArray = [];
            const amountDiv = document.createElement("div");
            const normalDiv = document.createElement("div");
    
            for (const spellCount of spellCountListManager.spellCountList) {
                nodeArray.push(ZapquakeHTMLUtil.createSpellDiv(spellCount.spell, spellCount.count));
            } 
            
            nodeArray.reverse();        
            normalDiv.className = "fs-5 fw-bold";
            normalDiv.textContent = "(" + spellCountListManager.getTotalSpellCount() + "/" + maxSpellCount + ")";
            amountDiv.appendChild(normalDiv);
    
            const donatedSpellList = spellCountListManager.getDonatedSpell();
            if (!donatedSpellList.isEmpty()) {
                const donateDiv = document.createElement("div");
                donateDiv.className = "d-flex align-items-center";      
    
                const donateAmountDiv = document.createElement("span");
                donateAmountDiv.className = "fs-5 fw-bold me-1 mb-1px";
                donateAmountDiv.textContent = "+" + donatedSpellList.getTotalSpellCount();
    
                const donateIcon = document.createElement("img");
                donateIcon.className = "image";
                donateIcon.setAttribute("height", "18");
                donateIcon.setAttribute("src", "/images/other/donate.webp");
    
                donateDiv.appendChild(donateAmountDiv);
                donateDiv.appendChild(donateIcon);
                amountDiv.appendChild(donateDiv);
            }
            nodeArray.push(amountDiv);
            return nodeArray;
        } else {
            throw new Error(`Invalid spellCountListManager: ${spellCountListManager}`);
        }
    }
    
    static createEquipmentDiv(equipment) {
        if (equipment instanceof Equipment) {
            const equipmentID = equipment.offenseID;
            const level = equipment.getCurrentLevel();
            const isMaxLevel = equipment.isMaxLevel();
            const imagePath = equipment.getImagePath();
    
            // Create div
            const objectContainer = document.createElement("div");
            objectContainer.className = "object-container object-container--tall text-center";
            if (equipment.isRarityEpic()) {
                objectContainer.classList.add("object-container--epic");
            }
            objectContainer.setAttribute("data-id", equipmentID);
            
            const objectContainerHeader = document.createElement("div");
            objectContainerHeader.className = "object-container__header";
            objectContainer.appendChild(objectContainerHeader);          

            const levelOverlay = document.createElement("div");
            levelOverlay.className = "overlay overlay__number";
            if (isMaxLevel) {            
                levelOverlay.classList.add("overlay__number--level-maxed");
            }
            levelOverlay.textContent = level;
            objectContainerHeader.appendChild(levelOverlay);
    
            const img = document.createElement("img");
            img.className = "image";
            img.setAttribute("src", imagePath);
            objectContainer.appendChild(img);
    
            return objectContainer;
        } else {
            throw new Error(`Invalid equipment: ${equipment}`);
        }
    }
    
    static createSpellDiv(spell, amount) {
        if (spell instanceof Spell) {
            const spellID = spell.equipmentID;
            const level = spell.getCurrentLevel();
            const isDonated = spell.isDonated;
            const isMaxLevel = spell.isMaxLevel();
            const imagePath = spell.getImagePath();
    
            // Create div
            const objectContainer = document.createElement("div");
            objectContainer.className = "object-container object-container--tall text-center";
            objectContainer.setAttribute("data-id", spellID);
            
            const objectContainerHeader = document.createElement("div");
            objectContainerHeader.className = "object-container__header";
            objectContainer.appendChild(objectContainerHeader);   

            const spellCountOverlay = document.createElement("span");
            spellCountOverlay.className = "overlay overlay__number overlay__number--spell-count";
            spellCountOverlay.textContent = `x${amount}`;
            objectContainerHeader.appendChild(spellCountOverlay);  

            const levelOverlay = document.createElement("div");
            levelOverlay.className = "level overlay overlay--small overlay--bottom-left overlay__number";
            if (isMaxLevel) {            
                levelOverlay.classList.add("overlay__number--level-maxed");
            }
            levelOverlay.textContent = level;
            objectContainer.appendChild(levelOverlay);
    
            const img = document.createElement("img");
            img.className = "image";
            img.setAttribute("src", imagePath);
            objectContainer.appendChild(img);

            if (isDonated) {
                const modifierOverlay = document.createElement("div");
                modifierOverlay.className = "modifier overlay overlay--small overlay--top-left overlay__img";
                objectContainer.appendChild(modifierOverlay);

                const modifierImg = document.createElement("img");
                modifierImg.setAttribute("src", donateImage);
                modifierOverlay.appendChild(modifierImg);
            }

            return objectContainer;
            // Create div
            // const imageContainerDiv = document.createElement("div");
            // imageContainerDiv.className = "object-container card-custom-container text-center m-1";
            // imageContainerDiv.setAttribute("data-id", spellID);
    
            // const amountDiv = document.createElement("span");
            // amountDiv.className = "level text-light";
            // amountDiv.textContent = "x" + amount;
    
            // let donatedIconDiv;
            // if (isDonated) {
            //     donatedIconDiv = document.createElement("div");
            //     donatedIconDiv.className = "small-overlay-top-right";
    
            //     const donateIcon = document.createElement("img");
            //     donateIcon.className = "image";
            //     donateIcon.setAttribute("height", "18");
            //     donateIcon.setAttribute("src", "/images/other/donate.webp");
    
            //     donatedIconDiv.appendChild(donateIcon);
            // }
    
            // const image = document.createElement("img");
            // let classString = "image";
            // if (spellID === eqSpellKey) {
            //     classString += "";
            // }
            // img.className = classString;
            // img.setAttribute("height", "50");
            // img.setAttribute("src", imagePath);
    
            // const levelNumberDiv = document.createElement("div");
            // let numberDivClass = "overlay overlay-card-custom";
            // if (isMaxLevel) {            
            //     numberDivClass += " maxed";
            // } else {
            //     numberDivClass += " not-maxed";
            // }
            // levelNumberDiv.className = numberDivClass;
    
            // const levelNumberSpan = document.createElement("span");
            // levelNumberSpan.className = "level";
            // levelNumberSpan.textContent = level;    
    
            // // Append the level number span to the overlay div
            // levelNumberDiv.appendChild(levelNumberSpan);
    
            // imageContainerDiv.appendChild(amountDiv);
            // if (isDonated) {
            //     imageContainerDiv.appendChild(donatedIconDiv);
            // }
            // imageContainerDiv.appendChild(img);
            // imageContainerDiv.appendChild(levelNumberDiv);
    
            // return imageContainerDiv;
        } else {
            throw new Error(`Invalid spell: ${spell}`);
        }
    }
    
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
    
            // Create the nested structure inside the main container
            const borderDiv = document.createElement("div");
            borderDiv.className = "card-custom card-custom__main shadow p-3";
            defenseDiv.appendChild(borderDiv);
    
            const titleDiv = document.createElement("div");
            titleDiv.className = "d-flex align-items-center";
            borderDiv.appendChild(titleDiv);
    
            const imgDiv = document.createElement("div");
            titleDiv.appendChild(imgDiv);
    
            const img = document.createElement("img");
            img.className = "image--main";
            img.src = imagePath;
            imgDiv.appendChild(img);
    
            const textDiv = document.createElement("div");
            textDiv.className = "ms-3";
            titleDiv.appendChild(textDiv);
    
            const nameDiv = document.createElement("div");
            nameDiv.className = "h5";
            textDiv.appendChild(nameDiv);
    
            const nameSpan = document.createElement("span");
            nameSpan.className = "name";
            nameSpan.textContent = `${name}`;
            nameDiv.appendChild(nameSpan);
    
            const statDiv = document.createElement("div");
            statDiv.className = "d-flex flex-wrap gap-2";
            textDiv.appendChild(statDiv);
    
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
    
            const i = document.createElement("i");
            i.className = "fa-solid fa-chart-simple me-1";
            levelDiv.appendChild(i);
            
            const levelNumberSpan = document.createElement("span");
            levelNumberSpan.className = "level text";
            levelNumberSpan.textContent = defense.getCurrentLevel();
            if (defense.isMaxLevel()) {
                levelNumberSpan.classList.add("text--level-maxed");
            }
            levelDiv.appendChild(levelNumberSpan);
    
            const rangeInput = document.createElement("input");
            rangeInput.setAttribute("type", "range");
            rangeInput.className = "slider mt-3";
            rangeInput.setAttribute("min", minLevelPos);
            rangeInput.setAttribute("max", maxLevelPos);
            rangeInput.setAttribute("value", currentLevelPos);
            rangeInput.setAttribute("oninput", "updateDefense(this)");
            borderDiv.appendChild(rangeInput);
    
            const resultDiv = document.createElement("div");
            resultDiv.className = "my-3";
            borderDiv.appendChild(resultDiv);
    
            const equipmentDiv = document.createElement("div");
            equipmentDiv.className = "equipment-div";
            resultDiv.appendChild(equipmentDiv);
    
            const equipmentTitle = document.createElement("h5");
            equipmentTitle.textContent = "Heroes Equipment used:";
            equipmentDiv.appendChild(equipmentTitle);
    
            const equipmentList = document.createElement("div");
            equipmentList.className = "equipment-list d-flex justify-content-center align-items-center flex-wrap gap-2";
            equipmentDiv.appendChild(equipmentList);
    
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
            
            const spellDiv = document.createElement("div");
            spellDiv.className = "spell-div my-3";
            resultDiv.appendChild(spellDiv);
    
            const spellTitle = document.createElement("h5");
            spellTitle.textContent = "Spell needed:";
            spellDiv.appendChild(spellTitle);
    
            const spellList = document.createElement("div");
            spellList.className = "spell-main-display d-flex justify-content-center align-items-center gap-1";
            spellDiv.appendChild(spellList);
    
            const buttonDiv = document.createElement("div");
            buttonDiv.className = "collapse-btn text-center my-3";
            spellDiv.appendChild(buttonDiv);
    
            const button = document.createElement("button");
            button.className = "show-more-btn btn btn-secondary fw-bold";
            button.setAttribute("type", "button");
            button.setAttribute("data-bs-toggle", "collapse");
            button.setAttribute("data-bs-target", `#showMore-${defenseID}`);
            button.setAttribute("aria-controls", `showMore-${defenseID}`);
            button.setAttribute("aria-expanded", "false");
            button.textContent = "Show More";
            button.setAttribute("onclick", "toggleCollapseText(this)");
            buttonDiv.appendChild(button);
    
            const showMoreDiv = document.createElement("div");
            showMoreDiv.className = "spell-display collapse";
            showMoreDiv.id = `showMore-${defenseID}`;
            spellDiv.appendChild(showMoreDiv);
    
            // Append the created elements to their respective parents
            return defenseDiv;
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }
    }
}