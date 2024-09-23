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
            const modifier = offense.activeModifier;
            console.log(action);
            console.log(modifier);
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
            throw new TypeError(`Invalid action: ${action}`);
        }
    }

    // Create action row that will be added to the action detail list
    static createActionDetailRow(action, orderNumber, totalAction) {
        if (action instanceof Action) {
            let offense = action.offense;
            const modifier = offense.activeModifier;
            
            console.log(offense);
            const row = document.createElement("tr");

            const actionCell = document.createElement("td");
            row.appendChild(actionCell);

            // Create the main container div
            const actionContainerDiv = document.createElement("div");
            actionContainerDiv.className = "object-container object-container--responsive";
            if (action.isActionType(Action.EQUIPMENT)) {
                if (offense.activeEquipment.isRarityEpic()) {
                    actionContainerDiv.classList.add("object-container--epic");
                }
            } else {
                if (offense instanceof Spell && offense.offenseID === eqSpellKey) {
                    actionContainerDiv.classList.add("object-container--earthquake");
                }
            }
            actionCell.appendChild(actionContainerDiv);
    
            // Create the main image element
            const actionMainImage = document.createElement("img");
            actionMainImage.className = "image object-container__img";
            if (action.isActionType(Action.EQUIPMENT)) {
                actionMainImage.src = offense.activeEquipment.getImagePath();
            } else {
                actionMainImage.src = offense.getImagePath();
            }
            actionContainerDiv.appendChild(actionMainImage);

            // Create the order overlay
            actionContainerDiv.appendChild(HTMLUtil.createOrderOverlay(orderNumber, HTMLUtil.OVERLAY_RESPONSIVE));
    
            // Create the level overlay
            if (action.isActionType(Action.EQUIPMENT)) {
                actionContainerDiv.appendChild(HTMLUtil.createLevelOverlay(offense.activeEquipment, HTMLUtil.OVERLAY_RESPONSIVE));
            } else {
                actionContainerDiv.appendChild(HTMLUtil.createLevelOverlay(offense, HTMLUtil.OVERLAY_RESPONSIVE));
            }

            if (offense instanceof Troop && offense.damageMode === Troop.DEATH_DAMAGE) {
                actionContainerDiv.appendChild(HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_RESPONSIVE, HTMLUtil.MODIFIER_DEATH));
            }
            
            const modifierCell = document.createElement("td");
            row.appendChild(modifierCell);

            const modifierContainerDiv = document.createElement("td");
            modifierContainerDiv.className = "d-flex justify-content-center gap-3";
            modifierCell.appendChild(modifierContainerDiv);

            switch (action.type) {
                case Action.EQUIPMENT:
                    if (!offense.activeEquipment.isEquipmentTypeDamage()) {
                        modifierContainerDiv.appendChild(AdvanceHTMLUtil.createModifierContainerDiv(offense));
                    } else {
                        break;
                    }                   
                case Action.HERO:
                    for (const equipment of offense.equipmentListManager.equipmentList) {
                        if (equipment.isEnabled && equipment.isEquipmentTypeSupport()) {
                            modifierContainerDiv.appendChild(AdvanceHTMLUtil.createModifierContainerDiv(equipment));
                        }                   
                    }
                case Action.OFFENSE:
                    if (modifier !== null) {
                        modifierContainerDiv.appendChild(AdvanceHTMLUtil.createModifierContainerDiv(modifier));
                    }
                    //modifierContainerDiv.appendChild(AdvanceHTMLUtil.createHardModeIconDiv());
                    break;
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
            throw new TypeError(`Invalid action: ${action}`);
        }
    }

    static createModifierContainerDiv(object) {
        if (object instanceof Offense || object instanceof Equipment || object instanceof Modifier) {
            // Create the main container div
            const modifierContainerDiv = document.createElement("div");
            modifierContainerDiv.className = "object-container object-container--responsive";
            if (object instanceof Modifier) {
                modifierContainerDiv.classList.add("object-container--modifier");
            } else if (object instanceof Equipment) {
                if (object.isRarityEpic()) {
                    modifierContainerDiv.classList.add("object-container--epic");
                }
            }
    
            // Create the main image element
            const modifierMainImage = document.createElement("img");
            modifierMainImage.className = "image object-container__img";
            modifierMainImage.src = object.getImagePath();
            modifierContainerDiv.appendChild(modifierMainImage);

            // Create the level overlay
            if (!(object instanceof Modifier && object.modifierID === rageSpellTowerKey)) {
                modifierContainerDiv.appendChild(HTMLUtil.createLevelOverlay(object, HTMLUtil.OVERLAY_RESPONSIVE));
            } 
        
            return modifierContainerDiv;
        } else {
            throw new Error(`Invalid object: ${object}`);
        }
    }

    static createHardModeIconDiv() {
        const hardModeIconDiv = document.createElement("div");
        hardModeIconDiv.className = "object-container object-container--hardmode object-container--responsive";

        // Create the main image element
        const hardModeIcon = document.createElement("img");
        hardModeIcon.className = "image object-container__img";
        hardModeIcon.src = hardModeImage;
        hardModeIconDiv.appendChild(hardModeIcon);
    
        return hardModeIconDiv;
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
            throw new TypeError(`Invalid defense: ${defense}`);
        }
    }
    
    static createEquipmentDiv(equipment) {
        if (equipment instanceof Equipment) {
            const equipmentID = equipment.equipmentID;
            const name = equipment.name;
            const imagePath = equipment.imagePath;

            const mainDiv = document.createElement("div");
            mainDiv.className = "col equipment card-custom card-custom__object text-center";
            mainDiv.setAttribute("data-id", equipmentID);
        
            const title = document.createElement("h5");
            title.textContent = name;
            mainDiv.appendChild(title);
        
            const objectContainer = document.createElement("div");
            objectContainer.className = "object-container";
            if (equipment.isRarityEpic()) {
                objectContainer.classList.add("object-container--epic");
            }
            mainDiv.appendChild(objectContainer);
            
            const img = document.createElement("img");
            img.className = "image object-container__img";
            img.src = imagePath;
            objectContainer.appendChild(img);
            
            const levelOverlay = document.createElement("div");
            levelOverlay.className = "level overlay overlay--bottom-left overlay__number";
            objectContainer.appendChild(levelOverlay);
        
            const modifierOverlay = document.createElement("div");
            modifierOverlay.className = "modifier overlay overlay--top-left overlay__img";
            objectContainer.appendChild(modifierOverlay);

            const sliderDiv = document.createElement("div");
            sliderDiv.className = "mt-2";
            mainDiv.appendChild(sliderDiv);
            
            const sliderInput = document.createElement("input");
            sliderInput.type = "range";
            sliderInput.className = "slider slider--theme";
            sliderInput.setAttribute("oninput", "updateEquipment(this)");            
            sliderDiv.appendChild(sliderInput);
                   
            const checkboxDiv = document.createElement("div");
            checkboxDiv.className = "d-flex justify-content-center align-items-center";
        
            const checkboxInput = document.createElement("input");
            checkboxInput.type = "checkbox";
            checkboxInput.className = "useCheckbox form-check-input checkbox me-1";
            checkboxInput.id = `use_${equipmentID}`;
            checkboxInput.setAttribute("oninput", "toggleUseEquipment(this)");
            
            const checkboxLabel = document.createElement("label");
            checkboxLabel.className = "h5 mb-0";
            checkboxLabel.setAttribute("for", `use_${equipmentID}`);
            checkboxLabel.textContent = "Use equipment";
            
            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);
            mainDiv.appendChild(checkboxDiv);
        
            if (equipment.isEquipmentTypeAttack() || equipment.isEquipmentTypeDamage()) {
                const collapseDiv = document.createElement("div");
                collapseDiv.className = "collapse show";
                collapseDiv.id = `collapse_${equipmentID}`;
                mainDiv.appendChild(collapseDiv);
            
                const buttonContainer = document.createElement("div");
                buttonContainer.className = "d-flex justify-content-md-evenly justify-content-center gap-3 mt-2";
                collapseDiv.appendChild(buttonContainer);
                
                const button1 = document.createElement("button");
                button1.type = "button";
                button1.className = "btn btn-success";
                button1.value = "1";
                button1.textContent = "Add 1";
                button1.setAttribute("onclick", "addAction(this, 'equipment')");
                buttonContainer.appendChild(button1);
                
                const button5 = document.createElement("button");
                button5.type = "button";
                button5.className = "btn btn-success";
                button5.value = "5";
                button5.textContent = "Add 5";
                button5.setAttribute("onclick", "addAction(this, 'equipment')");           
                buttonContainer.appendChild(button5);
            }
        
            const damageDisplayDiv = document.createElement("div");
            damageDisplayDiv.className = "mt-2";
            mainDiv.appendChild(damageDisplayDiv);

            if (equipment.isEquipmentTypeAttack() || equipment.isEquipmentTypeDamage()) {
                const damageRow = document.createElement("div");
                damageRow.className = "d-flex justify-content-center align-items-center column-gap-1";
                damageDisplayDiv.appendChild(damageRow);

                const damageLabel = document.createElement("div");
                damageLabel.className = "fw-bold";
                damageLabel.textContent = "DPH:";
                damageRow.appendChild(damageLabel);

                const damageImg = document.createElement("img");
                damageImg.src = "/images/other/attack.webp";
                damageImg.width = 20;
                damageRow.appendChild(damageImg);

                const damageValue = document.createElement("div");
                damageValue.className = "damage fw-bold";
                damageRow.appendChild(damageValue);
            }

            if (equipment.isEquipmentTypeAttack()) {
                const extraDamageRow = document.createElement("div");
                extraDamageRow.className = "d-flex justify-content-center align-items-center column-gap-1";
                damageDisplayDiv.appendChild(extraDamageRow);

                const extraDamageLabel = document.createElement("div");
                extraDamageLabel.className = "fw-bold";
                extraDamageLabel.textContent = "Extra Damage:";
                extraDamageRow.appendChild(extraDamageLabel);

                const damageImg = document.createElement("img");
                damageImg.src = "/images/other/attack.webp";
                damageImg.width = 20;
                extraDamageRow.appendChild(damageImg);

                const extraDamageValue = document.createElement("div");
                extraDamageValue.className = "extra-damage fw-bold";
                extraDamageRow.appendChild(extraDamageValue);
            }

            if (equipment.isEquipmentTypeSupport()) {
                damageDisplayDiv.appendChild(AdvanceHTMLUtil.createHeroBoostRow(Hero.DPS));
                damageDisplayDiv.appendChild(AdvanceHTMLUtil.createHeroBoostRow(Hero.DPH));
            }

            return mainDiv;
        } else {
            throw new TypeError(`Invalid defense: ${equipment}`);
        }
    }

    static createHeroBoostRow(damageFormat) {
        if (!Hero.isValidDamageFormat(damageFormat)) {
            throw new TypeError(`Invalid damageFormat: ${damageFormat}`);
        }

        const heroBoostRow = document.createElement("div");
        heroBoostRow.className = "d-flex justify-content-center align-items-center column-gap-1";                 

        const heroBoostLabel = document.createElement("div");
        heroBoostLabel.className = "fw-bold";
        if (damageFormat === Hero.DPS) {
            heroBoostLabel.textContent = "DPS Boost:";
        } else {
            heroBoostLabel.textContent = "DPH Boost:";
        }
        heroBoostRow.appendChild(heroBoostLabel);

        const heroBoostImg = document.createElement("img");
        heroBoostImg.src = "/images/other/attack.webp";
        heroBoostImg.width = 20;
        heroBoostRow.appendChild(heroBoostImg);

        const heroBoostValue = document.createElement("div");
        if (damageFormat === Hero.DPS) {
            heroBoostValue.className = "dps-boost fw-bold";
        } else {
            heroBoostValue.className = "dph-boost fw-bold";
        }
        heroBoostRow.appendChild(heroBoostValue);

        return heroBoostRow;
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
            throw new TypeError(`Invalid defense: ${defense}`);
        }
    }
    
    // Create damage log to be added to each row in detail section of defense
    static createDamageLogRow(damageLog, orderCount) {
        if (damageLog instanceof DamageLog && NumberUtil.isNumber(orderCount)) {
            const action = damageLog.action;
            const offense = action.offense;
            const defense = damageLog.defense;
            const modifier = offense.activeModifier;

            const isImmune = damageLog.isImmune;
            const damage = damageLog.damage;
            const modifiedDamage = damageLog.modifiedDamage;
            const hardModeDamage = damageLog.hardModeDamage;
            const reducedEQDamage = damageLog.reducedEQDamage;
            const remainingHP = defense.remainingHP;
            const maxHP = defense.getCurrentMaxHP();
    
            const rowData = document.createElement("tr");
    
            const offenseIconCell = document.createElement("td");
            rowData.appendChild(offenseIconCell);
    
            const offenseIconDiv = document.createElement("div");
            offenseIconDiv.className = "object-container object-container--small";
            if (action.isActionType(Action.EQUIPMENT)) {
                if (offense.activeEquipment.isRarityEpic()) {
                    offenseIconDiv.classList.add("object-container--epic");
                }
            } else {
                if (offense instanceof Spell && offense.offenseID === eqSpellKey) {
                    offenseIconDiv.classList.add("object-container--earthquake");
                }
            }
            offenseIconCell.appendChild(offenseIconDiv);
    
            if (!(offense instanceof Hero && offense.activeEquipment !== null)) {
                if (offense instanceof Troop && offense.damageMode === Troop.DEATH_DAMAGE) {
                    offenseIconDiv.appendChild(HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_SMALL, HTMLUtil.MODIFIER_DEATH));
                } else if (modifier !== null) {
                    offenseIconDiv.appendChild(HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_SMALL, HTMLUtil.MODIFIER_RAGED));
                }
            }
    
            const offenseIconImg = document.createElement("img");
            offenseIconImg.className = "image object-container__img";
            if (offense instanceof Hero && offense.activeEquipment !== null) {
                offenseIconImg.src = offense.activeEquipment.getImagePath();
            } else {
                offenseIconImg.src = offense.getImagePath();
            }
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
                    damageIconImg.className = "mx-1";
                    damageIconImg.src = repairImage;
                    damageIconImg.width = 20;
                    damageDiv.appendChild(damageIconImg);
                } else {
                    const damageIconImg = document.createElement("img");
                    damageIconImg.className = "mx-1";
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
                if (modifiedDamage > 0) {
                    damageAmount.classList.add("text--raged");
                }
                damageAmount.textContent = damage;
            }  
            damageDiv.appendChild(damageAmount);
    
            if (reducedEQDamage > 0) {
                damageCell.appendChild(AdvanceHTMLUtil.createReducedEQDamageDiv(damageLog));
            }
            if (modifiedDamage > 0) {
                damageCell.appendChild(AdvanceHTMLUtil.createModifiedDamageDiv(damageLog));
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
                throw new TypeError(`Invalid damageLog: ${damageLog}`);
            } else {
                throw new TypeError(`Invalid orderCount: ${orderCount}`);
            }           
        }
    }

    static createModifiedDamageDiv(damageLog) {
        if (damageLog instanceof DamageLog) {
            const modifier = damageLog.action.offense.activeModifier;
            const modifiedDamage = damageLog.modifiedDamage;
    
            const modifiedDamageDiv = document.createElement("div");
            modifiedDamageDiv.className = "d-flex align-items-center justify-content-center text text--raged";

            const prefixSpan = document.createElement("span");
            prefixSpan.textContent = `(+ ${modifiedDamage}`;
            modifiedDamageDiv.appendChild(prefixSpan);

            const modifierImg = document.createElement("img");
            modifierImg.className = "mx-1";
            modifierImg.src = modifier.getImagePath();
            modifierImg.width = 20;
            modifiedDamageDiv.appendChild(modifierImg);

            const surfixSpan = document.createElement("span");
            surfixSpan.textContent = ")";
            modifiedDamageDiv.appendChild(surfixSpan);

            return modifiedDamageDiv;
        } else {
            throw new TypeError(`Invalid damageLog: ${damageLog}`);
        }
    }

    static createReducedEQDamageDiv(damageLog) {
        if (damageLog instanceof DamageLog) {
            const reducedEQDamage = damageLog.reducedEQDamage;
    
            const reducedEQDamageDiv = document.createElement("div");
            reducedEQDamageDiv.className = "d-flex align-items-center justify-content-center text text--damage-reduced";

            const prefixSpan = document.createElement("span");
            prefixSpan.textContent = `(- ${reducedEQDamage}`;
            reducedEQDamageDiv.appendChild(prefixSpan);

            const eqIconImg = document.createElement("img");
            eqIconImg.className = "mx-1";
            eqIconImg.src = eqIcon;     
            eqIconImg.width = 20;
            reducedEQDamageDiv.appendChild(eqIconImg);

            const surfixSpan = document.createElement("span");
            surfixSpan.textContent = ")";
            reducedEQDamageDiv.appendChild(surfixSpan);

            return reducedEQDamageDiv;
        }
    }

    static getAllEquipmentDivsFromHeroSection(heroSection) {
        return heroSection.querySelectorAll(".equipment");
    }
}