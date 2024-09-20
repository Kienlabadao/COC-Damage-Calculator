class AdvanceHTMLUtil {

    // Store all convenient functions related to html that is used by advance calculator page only
    
    static OVERLAY_NORMAL = 0;
    static OVERLAY_SMALL = 1;
    static OVERLAY_RESPONSIVE = 2;

    static MODIFIER_RAGED = 0;
    static MODIFIER_DEATH = 1;

    // Create action icon that will be added to the action list
    static createActionDiv(action, orderNumber) {
        if (action instanceof Action) {
            const offense = action.offense;
            const modifier = action.modifier;
    
            // Create the main container div
            const containerDiv = document.createElement("div");
            containerDiv.className = "object-container";
            if (offense instanceof Spell && offense.offenseID === eqSpellKey) {
                containerDiv.classList.add("object-container--earthquake");
            } else if (offense instanceof Equipment && offense.isRarityEpic()) {
                containerDiv.classList.add("object-container--epic");
            }
    
            // Create the main image element
            const mainImage = document.createElement("img");
            mainImage.className = "image object-container__img";
            mainImage.src = offense.getImagePath();
            containerDiv.appendChild(mainImage);
    
            // Create the modifier overlay
            if (modifier !== null) {
                containerDiv.appendChild(HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_RAGED));
            } else if (offense instanceof Troop) {
                switch (offense.damageMode) {
                    case Troop.DEATH_DAMAGE:
                        containerDiv.appendChild(HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_DEATH));
                        break;
                }
            }
    
            // Create the order overlay
            containerDiv.appendChild(HTMLUtil.createOrderOverlay(orderNumber, HTMLUtil.OVERLAY_NORMAL));
    
            // Create the level overlay
            containerDiv.appendChild(HTMLUtil.createLevelOverlay(offense, HTMLUtil.OVERLAY_NORMAL));
    
            return containerDiv;
        } else {
            throw new Error(`Invalid action: ${action}`);
        }
    }

    // Create action row that will be added to the action detail list
    static createActionDetailRow(action, orderNumber, totalAction) {
        if (action instanceof Action) {
            const offense = action.offense;
            const modifier = action.modifier;

            const row = document.createElement("tr");

            const actionCell = document.createElement("td");
            row.appendChild(actionCell);

            // Create the main container div
            const actionContainerDiv = document.createElement("div");
            actionContainerDiv.className = "object-container object-container--responsive";
            if (offense instanceof Spell && offense.offenseID === eqSpellKey) {
                actionContainerDiv.classList.add("object-container--earthquake");
            } else if (offense instanceof Equipment && offense.isRarityEpic()) {
                actionContainerDiv.classList.add("object-container--epic");
            }
            actionCell.appendChild(actionContainerDiv);
    
            // Create the main image element
            const actionMainImage = document.createElement("img");
            actionMainImage.className = "image object-container__img";
            actionMainImage.src = offense.getImagePath();
            actionContainerDiv.appendChild(actionMainImage);
    
            if (offense instanceof Troop) {
                switch (offense.damageMode) {
                    case Troop.DEATH_DAMAGE:
                        actionContainerDiv.appendChild(HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_RESPONSIVE, HTMLUtil.MODIFIER_DEATH));
                        break;
                }
            }

            // Create the order overlay
            actionContainerDiv.appendChild(HTMLUtil.createOrderOverlay(orderNumber, HTMLUtil.OVERLAY_RESPONSIVE));
    
            // Create the level overlay
            actionContainerDiv.appendChild(HTMLUtil.createLevelOverlay(offense, HTMLUtil.OVERLAY_RESPONSIVE));
            
            const modifierCell = document.createElement("td");
            row.appendChild(modifierCell);

            if (modifier !== null) {
                // Create the main container div
                const modifierContainerDiv = document.createElement("div");
                modifierContainerDiv.className = "object-container object-container--responsive";
                modifierCell.appendChild(modifierContainerDiv);
        
                // Create the main image element
                const modifierMainImage = document.createElement("img");
                modifierMainImage.className = "image object-container__img";
                modifierMainImage.src = modifier.getImagePath();
                modifierContainerDiv.appendChild(modifierMainImage);

                // Create the level overlay
                if (modifier.modifierID !== rageSpellTowerKey) {
                    modifierContainerDiv.appendChild(HTMLUtil.createLevelOverlay(modifier, HTMLUtil.OVERLAY_RESPONSIVE));
                }             
            }

            const manageCell = document.createElement("td");
            row.appendChild(manageCell);

            if (totalAction !== 1 && orderNumber !== 1) {
                const moveUpBtn = document.createElement("button");
                moveUpBtn.type = "button";
                moveUpBtn.classList = "btn btn-success mx-1";
                moveUpBtn.value = orderNumber;
                moveUpBtn.setAttribute("onclick", "moveActionUp(this)");
                manageCell.appendChild(moveUpBtn);

                const moveUpIcon = document.createElement("i");
                moveUpIcon.classList = "fa-solid fa-arrow-up fa-1x";
                moveUpBtn.appendChild(moveUpIcon);
            }                      

            if (totalAction !== 1 && orderNumber !== totalAction) {
                const moveDownBtn = document.createElement("button");
                moveDownBtn.type = "button";
                moveDownBtn.classList = "btn btn-success mx-1";
                moveDownBtn.value = orderNumber;
                moveDownBtn.setAttribute("onclick", "moveActionDown(this)");
                manageCell.appendChild(moveDownBtn);

                const moveDownIcon = document.createElement("i");
                moveDownIcon.classList = "fa-solid fa-arrow-down fa-1x";
                moveDownBtn.appendChild(moveDownIcon);
            }

            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.classList = "btn btn-danger mx-1";
            removeBtn.value = orderNumber;
            removeBtn.setAttribute("onclick", "removeActionDetail(this)");
            manageCell.appendChild(removeBtn);

            const removeIcon = document.createElement("i");
            removeIcon.classList = "fa-solid fa-trash-can fa-1x";
            removeBtn.appendChild(removeIcon);

            return row;
        } else {
            throw new Error(`Invalid action: ${action}`);
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
                HTMLUtil.addTextMaxedClass(levelNumberSpan);
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
    
            const actionDiv = document.createElement("div");
            actionDiv.className = "my-3";
            borderDiv.appendChild(actionDiv);
    
            const buttonDiv = document.createElement("div");
            buttonDiv.className = "collapse-btn d-flex align-items-center my-3";
            actionDiv.appendChild(buttonDiv);
    
            const actionTitle = document.createElement("h4");
            actionTitle.className = "mb-0 me-3";
            actionTitle.textContent = "Detail:"
            buttonDiv.appendChild(actionTitle);
    
            const button = document.createElement("button");
            button.className = "show-more-btn btn btn-secondary collapsed";
            button.setAttribute("type", "button");
            button.setAttribute("data-bs-toggle", "collapse");
            button.setAttribute("data-bs-target", `#showMore-${defenseID}`);
            button.setAttribute("aria-controls", `showMore-${defenseID}`);
            button.setAttribute("aria-expanded", "false");
            button.textContent = "Show";
            button.setAttribute("onclick", "toggleHTMLCollapseBtnText(this)");
            buttonDiv.appendChild(button);
    
            const showMoreDiv = document.createElement("div");
            showMoreDiv.className = "collapse";
            showMoreDiv.id = `showMore-${defenseID}`;
            actionDiv.appendChild(showMoreDiv);
    
            const tableDiv = document.createElement("div");
            tableDiv.className = "table-container";
            showMoreDiv.appendChild(tableDiv);
    
            const table = document.createElement("table");
            table.className = "text-center align-middle fw-bold";
            tableDiv.appendChild(table);
    
            const thead = document.createElement("thead");
            table.appendChild(thead);
    
            const rowHeading = document.createElement("tr");
            thead.appendChild(rowHeading);
    
            ["Action", "Type", "DPH / HPH", "HP"].forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                rowHeading.appendChild(th);
            });       
    
            thead.appendChild(AdvanceHTMLUtil.createDamageLogDefenseHeader(defense));
    
            const tbody = document.createElement("tbody");
            tbody.className = "damage-log-display";
            table.appendChild(tbody);
    
            return defenseDiv;
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }
    }
    
    // Create a damage log defense to be added to the first row of each detail section of defense which show defense and its max HP
    static createDamageLogDefenseHeader(defense) {
        if (defense instanceof Defense) {
            const imagePath = defense.getImagePath();
            const hp = defense.getCurrentMaxHP();
    
            const rowData = document.createElement("tr");
            rowData.className = "damageLogDefenseHeader";
    
            const defenseIconCell = document.createElement("td");
            rowData.appendChild(defenseIconCell);
    
            const defenseIconDiv = document.createElement("div");
            defenseIconDiv.className = "object-container object-container--small";
            defenseIconCell.appendChild(defenseIconDiv);
    
            const defenseIconImg = document.createElement("img");
            defenseIconImg.className = "image object-container__img";
            defenseIconImg.src = imagePath;
            defenseIconDiv.appendChild(defenseIconImg);
    
            defenseIconDiv.appendChild(HTMLUtil.createLevelOverlay(defense, HTMLUtil.OVERLAY_SMALL));
    
            rowData.appendChild(document.createElement("td"));
            rowData.appendChild(document.createElement("td"));
    
            const hpCell = document.createElement("td");
            rowData.appendChild(hpCell);
    
            const hpSpan = document.createElement("span");
            hpSpan.textContent = `❤️${hp}`;
            hpSpan.className = "text text--hp-full";
            hpCell.appendChild(hpSpan);
    
            return rowData;
        } else {
            throw new Error(`Invalid defense: ${defense}`);
        }
    }
    
    // Create damage log to be added to each row in detail section of defense
    static createDamageLogRow(damageLog, orderCount) {
        if (damageLog instanceof DamageLog && NumberUtil.isNumber(orderCount)) {
            const offense = damageLog.offense;
            const defense = damageLog.defense;
            const modifier = damageLog.modifier;
            const isImmune = damageLog.isImmune;
            const damage = damageLog.damage;
            const remainingHP = defense.remainingHP;
            const maxHP = defense.getCurrentMaxHP();
            const eqCount = defense.eqCount - 1;
    
            const rowData = document.createElement("tr");
    
            const offenseIconCell = document.createElement("td");
            rowData.appendChild(offenseIconCell);
    
            const offenseIconDiv = document.createElement("div");
            offenseIconDiv.className = "object-container object-container--small";
            offenseIconCell.appendChild(offenseIconDiv);
    
            if (offense instanceof Troop && offense.damageMode === Troop.DEATH_DAMAGE) {
                offenseIconDiv.appendChild(HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_SMALL, HTMLUtil.MODIFIER_DEATH));
            } else if (modifier !== null) {
                offenseIconDiv.appendChild(HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_SMALL, HTMLUtil.MODIFIER_RAGED));
            }
    
            const offenseIconImg = document.createElement("img");
            offenseIconImg.className = "image object-container__img";
            offenseIconImg.src = offense.getImagePath();
            offenseIconDiv.appendChild(offenseIconImg);
    
            offenseIconDiv.appendChild(HTMLUtil.createLevelOverlay(offense, HTMLUtil.OVERLAY_SMALL));
    
            offenseIconDiv.appendChild(HTMLUtil.createOrderOverlay(orderCount, HTMLUtil.OVERLAY_SMALL));

            const typeCell = document.createElement("td");
            rowData.appendChild(typeCell);
    
            const typeImg = document.createElement("img");
            if (offense instanceof Repair) {
                typeImg.src = repairImage;
            } else if (offense instanceof Troop && offense.damageMode === Troop.DEATH_DAMAGE) {
                typeImg.src = deathDamageImage;
            } else {
                typeImg.src = attackImage;
            }       
            typeImg.width = 20;
            typeCell.appendChild(typeImg);
    
            const damageCell = document.createElement("td");
            rowData.appendChild(damageCell);
    
            const damageDiv = document.createElement("div");
            damageDiv.className = "d-flex align-items-center justify-content-center";
            damageCell.appendChild(damageDiv);
    
            if (!isImmune) {
                if (offense instanceof Repair) {
                    const damageIconImg = document.createElement("img");

                    damageIconImg.src = repairImage;
                    damageIconImg.width = 20;
                    damageDiv.appendChild(damageIconImg);
                } else {
                    const damageIconImg = document.createElement("img");

                    damageIconImg.src = attackImage;
                    damageIconImg.width = 20;
                    damageDiv.appendChild(damageIconImg);
                }    
            }
    
            const damageAmount = document.createElement("span");
            damageAmount.className = "text";
            if (isImmune) {
                damageAmount.classList.add("text--immune");
                damageAmount.textContent = "🚫Immune";
            } else {
                if (modifier !== null && damage > 0) {
                    damageAmount.classList.add("text--raged");
                }
                damageAmount.textContent = damage;
            }  
            damageDiv.appendChild(damageAmount);
    
            if (!isImmune && offense.isDamageTypeEQ() && eqCount > 0) {
                const reducedDamage = NumberUtil.round2Places(offense.calcBaseEQDamage(maxHP) - damage);
    
                const differentDiv = document.createElement("div");
                differentDiv.className = "d-flex align-items-center justify-content-center text text--damage-reduced";
                damageCell.appendChild(differentDiv);
    
                const prefixSpan = document.createElement("span");
                prefixSpan.textContent = `(- ${reducedDamage}`;
                differentDiv.appendChild(prefixSpan);
    
                const eqIconImg = document.createElement("img");
                eqIconImg.src = eqIcon;     
                eqIconImg.width = 20;
                differentDiv.appendChild(eqIconImg);
    
                const surfixSpan = document.createElement("span");
                surfixSpan.textContent = ")";
                differentDiv.appendChild(surfixSpan);
            } else if (modifier !== null && damage > 0) {
                const modifiedDamage = NumberUtil.round2Places(offense.calcModifiedDamage(modifier.getCurrentModify()));
    
                const differentDiv = document.createElement("div");
                differentDiv.className = "d-flex align-items-center justify-content-center text text--raged";
                damageCell.appendChild(differentDiv);
    
                const prefixSpan = document.createElement("span");
                prefixSpan.textContent = `(+ ${modifiedDamage}`;
                differentDiv.appendChild(prefixSpan);
    
                const eqIconImg = document.createElement("img");
                eqIconImg.src = modifier.getImagePath();     
                eqIconImg.width = 20;
                differentDiv.appendChild(eqIconImg);
    
                const surfixSpan = document.createElement("span");
                surfixSpan.textContent = ")";
                differentDiv.appendChild(surfixSpan);
            }
    
            const hpCell = document.createElement("td");
            rowData.appendChild(hpCell);
    
            const hpSpan = document.createElement("span");
            hpSpan.textContent = `❤️${remainingHP}`;
            hpSpan.className = "text";
            if (remainingHP <= 0) {
                hpSpan.classList.add("text--destroyed");
            } else if (remainingHP === maxHP) {
                hpSpan.classList.add("text--hp-full");
            }
            hpCell.appendChild(hpSpan);
    
            return rowData;
        } else {
            if (!(damageLog instanceof DamageLog)) {
                throw new Error(`Invalid damageLog: ${damageLog}`);
            } else {
                throw new Error(`Invalid orderCount: ${orderCount}`);
            }           
        }
    }
}