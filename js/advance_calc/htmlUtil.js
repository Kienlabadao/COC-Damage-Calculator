function createActionDiv(action, count = 1) {
    if (action instanceof Action) {
        const offense = action.offense;
        const modifier = action.modifier;

        // Create the main container div
        const containerDiv = document.createElement('div');
        containerDiv.className = 'image-container text-center';

        // Create the main image element
        const mainImage = document.createElement('img');
        mainImage.className = 'image';
        mainImage.src = offense.getImagePath();
        mainImage.height = 90;
        containerDiv.appendChild(mainImage);

        // Create the overlay top-left div
        const overlayTopLeftDiv = document.createElement('div');
        overlayTopLeftDiv.className = 'modifier overlay-top-left';
        containerDiv.appendChild(overlayTopLeftDiv);

        // Create the modifier image inside the overlay top-left div
        const modifierImage = document.createElement('img');
        if (modifier !== null) {
            modifierImage.className = 'image raged';
            modifierImage.src = modifier.getImagePath();
        } else if (offense instanceof Troop) {
            switch (offense.damageMode) {
                case Troop.DEATH_DAMAGE:
                    modifierImage.className = 'image death';
                    modifierImage.src = deathDamageImage;
                    break;
            }
        }
        modifierImage.width = 25;
        overlayTopLeftDiv.appendChild(modifierImage);

        // Create the overlay top-right div
        const overlayTopRightDiv = document.createElement('div');
        overlayTopRightDiv.className = 'overlay-top-right';
        containerDiv.appendChild(overlayTopRightDiv);

        // Create the action order span inside the overlay top-right div
        const actionOrderSpan = document.createElement('span');
        actionOrderSpan.className = 'action-order';
        actionOrderSpan.textContent = `${count}`;
        overlayTopRightDiv.appendChild(actionOrderSpan);

        // Create the maxed overlay div
        const maxedOverlayDiv = document.createElement('div');
        if (offense.isMaxLevel()) {
            maxedOverlayDiv.className = 'overlay overlay-equipment maxed';
        } else {
            maxedOverlayDiv.className = 'overlay overlay-equipment not-maxed';
        }       
        containerDiv.appendChild(maxedOverlayDiv);

        // Create the level number span inside the maxed overlay div
        const levelNumberSpan = document.createElement('span');
        levelNumberSpan.className = 'level-number';
        levelNumberSpan.textContent = offense.getCurrentLevel();
        maxedOverlayDiv.appendChild(levelNumberSpan);

        return containerDiv;
    } else {
        throw new Error(`Invalid action: ${action}`)
    }
}

function createOverlayImage(imagePath) {
    const overlayImage = document.createElement('img');
    overlayImage.className = 'overlay-image';
    overlayImage.setAttribute('width', '25');
    overlayImage.setAttribute('src', imagePath);
    return overlayImage;
}

function createSpellNodeArray(spellCountListManager) {
    if (spellCountListManager instanceof SpellCountListManager) {
        const nodeArray = [];
        const amountDiv = document.createElement('div');
        const normalDiv = document.createElement('div');

        for (const spellCount of spellCountListManager.spellCountList) {
            nodeArray.push(createSpellDiv(spellCount.spell, spellCount.count));
        } 
        
        nodeArray.reverse();        
        normalDiv.className = "fs-5 fw-bold";
        normalDiv.textContent = "(" + spellCountListManager.getTotalSpellCount() + "/" + maxSpellCount + ")";
        amountDiv.appendChild(normalDiv);

        const donatedSpellList = spellCountListManager.getDonatedSpell();
        if (!donatedSpellList.isEmpty()) {
            const donateDiv = document.createElement('div');
            donateDiv.className = "d-flex align-items-center";      

            const donateAmountDiv = document.createElement('span');
            donateAmountDiv.className = "fs-5 fw-bold me-1 mb-1px";
            donateAmountDiv.textContent = "+" + donatedSpellList.getTotalSpellCount();

            const donateIcon = document.createElement('img');
            donateIcon.className = 'image';
            donateIcon.setAttribute('height', '18');
            donateIcon.setAttribute('src', "/images/other/donate.webp");

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

function createEquipmentDiv(equipment) {
    if (equipment instanceof Equipment) {
        const equipmentID = equipment.offenseID;
        const level = equipment.getCurrentLevel();
        const isMaxLevel = equipment.isMaxLevel();
        const imagePath = equipment.getImagePath();

        // Create div
        const imageContainerDiv = document.createElement('div');
        let classString = 'image-container card-container text-center m-1';
        if (equipment.isRarityEpic()) {
            classString += " epic-rarity";
        }
        imageContainerDiv.className = classString;
        imageContainerDiv.setAttribute('data-title', equipmentID);

        const levelNumberDiv = document.createElement('div');
        levelNumberDiv.className = 'my-1';

        const levelNumberSpan = document.createElement('span');
        let numberSpanClass = 'equipment-card level-number';
        if (isMaxLevel) {            
            numberSpanClass += " maxed";
        } else {
            numberSpanClass += " not-maxed";
        }
        levelNumberSpan.className = numberSpanClass;
        levelNumberSpan.textContent = level;

        const image = document.createElement('img');
        image.className = 'image';
        image.setAttribute('height', '50');
        image.setAttribute('src', imagePath);

        // Append the level number span to the overlay div
        levelNumberDiv.appendChild(levelNumberSpan);

        imageContainerDiv.appendChild(levelNumberDiv);
        imageContainerDiv.appendChild(image);

        return imageContainerDiv;
    } else {
        throw new Error(`Invalid equipment: ${equipment}`);
    }
}

function createSpellDiv(spell, amount) {
    if (spell instanceof Spell) {
        const spellID = spell.equipmentID;
        const level = spell.getCurrentLevel();
        const isDonated = spell.isDonated;
        const isMaxLevel = spell.isMaxLevel();
        const imagePath = spell.getImagePath();

        // Create div
        const imageContainerDiv = document.createElement('div');
        imageContainerDiv.className = 'image-container card-container text-center m-1';
        imageContainerDiv.setAttribute('data-title', spellID);

        const amountDiv = document.createElement('span');
        amountDiv.className = 'level-number text-light';
        amountDiv.textContent = "x" + amount;

        let donatedIconDiv;
        if (isDonated) {
            donatedIconDiv = document.createElement('div');
            donatedIconDiv.className = 'donate-card-img';

            const donateIcon = document.createElement('img');
            donateIcon.className = 'image';
            donateIcon.setAttribute('height', '18');
            donateIcon.setAttribute('src', "/images/other/donate.webp");

            donatedIconDiv.appendChild(donateIcon);
        }

        const image = document.createElement('img');
        let classString = 'image';
        if (spellID === eqSpellKey) {
            classString += " earthquake-spell-bg";
        }
        image.className = classString;
        image.setAttribute('height', '50');
        image.setAttribute('src', imagePath);

        const levelNumberDiv = document.createElement('div');
        let numberDivClass = 'overlay overlay-card';
        if (isMaxLevel) {            
            numberDivClass += " maxed";
        } else {
            numberDivClass += " not-maxed";
        }
        levelNumberDiv.className = numberDivClass;

        const levelNumberSpan = document.createElement('span');
        levelNumberSpan.className = "level-number";
        levelNumberSpan.textContent = level;    

        // Append the level number span to the overlay div
        levelNumberDiv.appendChild(levelNumberSpan);

        imageContainerDiv.appendChild(amountDiv);
        if (isDonated) {
            imageContainerDiv.appendChild(donatedIconDiv);
        }
        imageContainerDiv.appendChild(image);
        imageContainerDiv.appendChild(levelNumberDiv);

        return imageContainerDiv;
    } else {
        throw new Error(`Invalid spell: ${spell}`);
    }
}

function createDefenseDiv() {
    const defenseDiv = document.createElement('div');
    defenseDiv.className = 'defense col-xxl-3 col-lg-4 col-md-6';

    // Create the nested structure inside the main container
    const borderDiv = document.createElement('div');
    borderDiv.className = 'p-3 col-12 h-100 rounded-border shadow card-background';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'd-flex align-items-center';

    const imgDiv = document.createElement('div');

    const img = document.createElement('img');
    img.className = 'image';
    //img.setAttribute('width', '60');
    img.setAttribute('height', '80');

    const textDiv = document.createElement('div');
    textDiv.className = 'ms-3';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'h5';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'name';

    const statDiv = document.createElement('div');
    statDiv.className = "d-flex flex-wrap";

    const hpDiv = document.createElement('div');
    hpDiv.className = 'fw-bold fs-5 me-4 stat-tag mb-2';

    const hpIcon = document.createElement('span');
    hpIcon.className = 'me-2';
    hpIcon.textContent = "❤️";
    hpDiv.appendChild(hpIcon);

    const hpNumber = document.createElement('span');
    hpNumber.className = 'hp';
    hpDiv.appendChild(hpNumber);
    
    const levelDiv = document.createElement('div');
    levelDiv.className = 'fw-bold fs-5 stat-tag mb-2';

    const i = document.createElement('i');
    i.className = 'fa-solid fa-chart-simple me-2';
    levelDiv.appendChild(i);
    
    const levelNumberSpan = document.createElement('span');
    levelNumberSpan.className = 'level';
    levelDiv.appendChild(levelNumberSpan);

    const rangeInput = document.createElement('input');
    rangeInput.setAttribute('type', 'range');
    rangeInput.className = 'range w-100';
    rangeInput.setAttribute('oninput', 'updateDefense(this)');

    const resultDiv = document.createElement('div');
    resultDiv.className = 'my-3';

    const equipmentDiv = document.createElement('div');
    equipmentDiv.className = 'equipment-div my-3 d-none';

    const equipmentTitle = document.createElement('h5');
    equipmentTitle.textContent = "Heroes Equipment used:";

    const equipmentList = document.createElement('div');
    equipmentList.className = 'equipment-list d-flex justify-content-center align-items-center flex-wrap';

    const statusDiv = document.createElement('div');
    statusDiv.className = 'status-div d-flex align-items-center my-3 d-none';

    const statusImg = document.createElement('img');
    statusImg.className = 'status-img me-4';
    statusImg.setAttribute('width', '80');

    const statusText = document.createElement('div');
    statusText.className = 'status-text fw-bold';
    
    const spellDiv = document.createElement('div');
    spellDiv.className = 'spell-div my-3';

    const spellTitle = document.createElement('h5');
    spellTitle.textContent = "Spell needed:";

    const spellList = document.createElement('div');
    spellList.className = 'spell-main-display d-flex justify-content-center align-items-center';

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'collapse-btn text-center my-3';

    const button = document.createElement('button');
    button.className = 'show-more-button btn btn-secondary fw-bold';
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'Show More';
    button.setAttribute('onclick', "toggleCollapseText(this)");

    const showMoreDiv = document.createElement('div');
    showMoreDiv.className = 'spell-display collapse';

    // Append the created elements to their respective parents
    buttonDiv.appendChild(button);

    equipmentDiv.appendChild(equipmentTitle);
    equipmentDiv.appendChild(equipmentList);

    statusDiv.appendChild(statusImg);
    statusDiv.appendChild(statusText);

    spellDiv.appendChild(spellTitle);
    spellDiv.appendChild(spellList);
    spellDiv.appendChild(buttonDiv);
    spellDiv.appendChild(showMoreDiv);

    resultDiv.appendChild(equipmentDiv);
    resultDiv.appendChild(statusDiv);
    resultDiv.appendChild(spellDiv);

    imgDiv.appendChild(img);

    nameDiv.appendChild(nameSpan);

    statDiv.appendChild(hpDiv);
    statDiv.appendChild(levelDiv);

    textDiv.appendChild(nameDiv);
    textDiv.appendChild(statDiv);

    titleDiv.appendChild(imgDiv);
    titleDiv.appendChild(textDiv);

    borderDiv.appendChild(titleDiv);
    borderDiv.appendChild(rangeInput);
    borderDiv.appendChild(resultDiv);

    defenseDiv.appendChild(borderDiv);
    return defenseDiv;
}