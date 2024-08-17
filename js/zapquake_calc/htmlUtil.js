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
            donatedIconDiv.className = 'small-overlay-top-right';

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

function createDefenseDiv(defense) {
    if (defense instanceof Defense) {
        const defenseID = defense.defenseID;
        const name = defense.name;
        const imagePath = defense.getImagePath();
        const currentLevelPos = defense.currentLevelPos;
        const maxLevelPos = defense.maxLevelPos;
        const minLevelPos = 0;
        const hp = defense.getCurrentHP();

        const defenseDiv = document.createElement('div');
        defenseDiv.className = 'defense';
        defenseDiv.setAttribute("data-title", defenseID);

        // Create the nested structure inside the main container
        const borderDiv = document.createElement('div');
        borderDiv.className = 'p-3 col-12 h-100 rounded-border shadow card-background';
        defenseDiv.appendChild(borderDiv);

        const titleDiv = document.createElement('div');
        titleDiv.className = 'd-flex align-items-center';
        borderDiv.appendChild(titleDiv);

        const imgDiv = document.createElement('div');
        titleDiv.appendChild(imgDiv);

        const img = document.createElement('img');
        img.className = 'image';
        img.setAttribute('height', '80');
        img.setAttribute('src', imagePath);
        imgDiv.appendChild(img);

        const textDiv = document.createElement('div');
        textDiv.className = 'ms-3';
        titleDiv.appendChild(textDiv);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'h5';
        nameDiv.textContent = `${name} `;
        textDiv.appendChild(nameDiv);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameDiv.appendChild(nameSpan);

        const statDiv = document.createElement('div');
        statDiv.className = "d-flex flex-wrap";
        textDiv.appendChild(statDiv);

        const hpDiv = document.createElement('div');
        hpDiv.className = 'fw-bold fs-5 me-4 stat-tag mb-2';
        statDiv.appendChild(hpDiv);

        const hpIcon = document.createElement('span');
        hpIcon.className = 'me-2';
        hpIcon.textContent = "❤️";
        hpDiv.appendChild(hpIcon);

        const hpNumber = document.createElement('span');
        hpNumber.className = 'hp';
        hpNumber.textContent = hp;
        hpDiv.appendChild(hpNumber);
        
        const levelDiv = document.createElement('div');
        levelDiv.className = 'fw-bold fs-5 stat-tag mb-2';
        statDiv.appendChild(levelDiv);

        const i = document.createElement('i');
        i.className = 'fa-solid fa-chart-simple me-2';
        levelDiv.appendChild(i);
        
        const levelNumberSpan = document.createElement('span');
        levelNumberSpan.className = 'level';
        levelNumberSpan.textContent = defense.getCurrentLevel();
        if (defense.isMaxLevel()) {
            levelNumberSpan.className = 'level maxed-text';
        }
        levelDiv.appendChild(levelNumberSpan);

        const rangeInput = document.createElement('input');
        rangeInput.setAttribute('type', 'range');
        rangeInput.className = 'range w-100';
        rangeInput.setAttribute('min', minLevelPos);
        rangeInput.setAttribute('max', maxLevelPos);
        rangeInput.setAttribute('value', currentLevelPos);
        rangeInput.setAttribute('oninput', 'updateDefense(this)');
        borderDiv.appendChild(rangeInput);

        const resultDiv = document.createElement('div');
        resultDiv.className = 'my-3';
        borderDiv.appendChild(resultDiv);

        const equipmentDiv = document.createElement('div');
        equipmentDiv.className = 'equipment-div my-3 d-none';
        resultDiv.appendChild(equipmentDiv);

        const equipmentTitle = document.createElement('h5');
        equipmentTitle.textContent = "Heroes Equipment used:";
        equipmentDiv.appendChild(equipmentTitle);

        const equipmentList = document.createElement('div');
        equipmentList.className = 'equipment-list d-flex justify-content-center align-items-center flex-wrap';
        equipmentDiv.appendChild(equipmentList);

        const statusDiv = document.createElement('div');
        statusDiv.className = 'status-div d-flex align-items-center my-3 d-none';
        resultDiv.appendChild(statusDiv);

        const statusImg = document.createElement('img');
        statusImg.className = 'status-img me-4';
        statusImg.setAttribute('width', '80');
        statusDiv.appendChild(statusImg);

        const statusText = document.createElement('div');
        statusText.className = 'status-text fw-bold';
        statusDiv.appendChild(statusText);
        
        const spellDiv = document.createElement('div');
        spellDiv.className = 'spell-div my-3';
        resultDiv.appendChild(spellDiv);

        const spellTitle = document.createElement('h5');
        spellTitle.textContent = "Spell needed:";
        spellDiv.appendChild(spellTitle);

        const spellList = document.createElement('div');
        spellList.className = 'spell-main-display d-flex justify-content-center align-items-center';
        spellDiv.appendChild(spellList);

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'collapse-btn text-center my-3';
        spellDiv.appendChild(buttonDiv);

        const button = document.createElement('button');
        button.className = 'show-more-button btn btn-secondary fw-bold';
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#showMore-${defenseID}`);
        button.setAttribute('aria-controls', `showMore-${defenseID}`);
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Show More';
        button.setAttribute('onclick', "toggleCollapseText(this)");
        buttonDiv.appendChild(button);

        const showMoreDiv = document.createElement('div');
        showMoreDiv.className = 'spell-display collapse';
        showMoreDiv.id = `showMore-${defenseID}`;
        spellDiv.appendChild(showMoreDiv);

        // Append the created elements to their respective parents
        return defenseDiv;
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}