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
        setDataTitle(defenseDiv, defenseID);
        setDataDefenseStatus(defenseDiv, true);

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
        img.src = imagePath;
        img.height = 80;
        imgDiv.appendChild(img);

        const textDiv = document.createElement('div');
        textDiv.className = 'ms-3';
        titleDiv.appendChild(textDiv);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'h5';
        textDiv.appendChild(nameDiv);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.textContent = `${name} `;
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
        hpNumber.className = 'hp full-hp';
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

        const actionDiv = document.createElement('div');
        actionDiv.className = 'my-3';
        borderDiv.appendChild(actionDiv);

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'collapse-btn my-3 d-flex align-items-center';
        actionDiv.appendChild(buttonDiv);

        const actionTitle = document.createElement('h4');
        actionTitle.className = 'mb-0 me-3';
        actionTitle.textContent = "Detail:"
        buttonDiv.appendChild(actionTitle);

        const button = document.createElement('button');
        button.className = 'show-more-button btn btn-secondary fw-bold collapsed';
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#showMore-${defenseID}`);
        button.setAttribute('aria-controls', `showMore-${defenseID}`);
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Show';
        button.setAttribute('onclick', "toggleCollapseText(this)");
        buttonDiv.appendChild(button);

        const showMoreDiv = document.createElement('div');
        showMoreDiv.className = 'collapse';
        showMoreDiv.id = `showMore-${defenseID}`;
        actionDiv.appendChild(showMoreDiv);

        const tableDiv = document.createElement('div');
        tableDiv.className = 'table-container';
        showMoreDiv.appendChild(tableDiv);

        const table = document.createElement('table');
        table.className = 'text-center align-middle fw-bold';
        tableDiv.appendChild(table);

        const thead = document.createElement('thead');
        table.appendChild(thead);

        const rowHeading = document.createElement('tr');
        thead.appendChild(rowHeading);

        ['Action', 'Type', 'DPH / HPH', 'HP'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            rowHeading.appendChild(th);
        });       

        const rowData = document.createElement('tr');
        thead.appendChild(rowData);

        const defenseIconCell = document.createElement('td');
        rowData.appendChild(defenseIconCell);

        const defenseIconDiv = document.createElement("div");
        defenseIconDiv.className = "image-container card-container-no-count text-center m-1";
        defenseIconCell.appendChild(defenseIconDiv);

        const defenseIconImg = document.createElement("img");
        defenseIconImg.className = "image";
        defenseIconImg.src = imagePath;
        defenseIconImg.width = 50;
        defenseIconImg.height = 50;
        defenseIconDiv.appendChild(defenseIconImg);

        const overlayDiv = document.createElement("div");
        overlayDiv.className = "overlay overlay-card";
        if (defense.isMaxLevel()) {
            overlayDiv.className = "overlay overlay-card maxed";
        }
        defenseIconDiv.appendChild(overlayDiv);

        const defenseIconLevel = document.createElement("span");       
        defenseIconLevel.textContent = defense.getCurrentLevel();
        defenseIconLevel.className = "level-number";
        overlayDiv.appendChild(defenseIconLevel);

        rowData.appendChild(document.createElement('td'));
        rowData.appendChild(document.createElement('td'));

        const hpCell = document.createElement('td');
        rowData.appendChild(hpCell);

        const hpSpan = document.createElement('span');
        hpSpan.textContent = `❤️${hp}`;
        hpSpan.className = "full-hp";
        hpCell.appendChild(hpSpan);

        const tbody = document.createElement('tbody');
        tbody.className = "action-display";
        table.appendChild(tbody);

        return defenseDiv;
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}

function createActionTableRow(offenseDamage, defense) {
    if (offenseDamage instanceof OffenseDamage && defense instanceof Defense) {
        const offense = offenseDamage.offense;
        const modifier = offenseDamage.modifier;
        const isImmune = offenseDamage.isImmune;
        const damage = offenseDamage.damage;
        const remainingHP = offenseDamage.remainingHP;
        const maxHP = defense.getCurrentHP();

        const rowData = document.createElement('tr');

        const offenseIconCell = document.createElement('td');
        rowData.appendChild(offenseIconCell);

        const offenseIconDiv = document.createElement("div");
        offenseIconDiv.className = "image-container card-container-no-count text-center m-1";
        offenseIconCell.appendChild(offenseIconDiv);

        if (offense instanceof Troop && offense.damageMode === Troop.DEATH_DAMAGE) {
            const modifierOverlayDiv = document.createElement("div");
            modifierOverlayDiv.className = "small-overlay-top-right";
            offenseIconDiv.appendChild(modifierOverlayDiv);

            const modifierOverlayImg = document.createElement("img");
            modifierOverlayImg.className = "image death";
            modifierOverlayImg.src = deathDamageImage;
            modifierOverlayImg.height = 18;
            modifierOverlayDiv.appendChild(modifierOverlayImg);
        } else if (modifier !== null) {
            const modifierOverlayDiv = document.createElement("div");
            modifierOverlayDiv.className = "small-overlay-top-right";
            offenseIconDiv.appendChild(modifierOverlayDiv);

            const modifierOverlayImg = document.createElement("img");
            modifierOverlayImg.className = "image raged";
            modifierOverlayImg.src = modifier.getImagePath();
            modifierOverlayImg.height = 18;
            modifierOverlayDiv.appendChild(modifierOverlayImg);
        }

        const offenseIconImg = document.createElement("img");
        offenseIconImg.className = "image";
        offenseIconImg.src = offense.getImagePath();
        offenseIconImg.width = 50;
        offenseIconImg.height = 50;
        offenseIconDiv.appendChild(offenseIconImg);

        const overlayDiv = document.createElement("div");
        overlayDiv.className = "overlay overlay-card not-maxed";
        if (offense.isMaxLevel()) {
            overlayDiv.className = "overlay overlay-card maxed";
        }
        offenseIconDiv.appendChild(overlayDiv);

        const offenseIconLevel = document.createElement("span");       
        offenseIconLevel.textContent = offense.getCurrentLevel();
        offenseIconLevel.className = "level-number";
        overlayDiv.appendChild(offenseIconLevel);

        const typeCell = document.createElement('td');
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

        const damageCell = document.createElement('td');
        rowData.appendChild(damageCell);

        const damageDiv = document.createElement('div');
        damageDiv.className = "d-flex align-items-center justify-content-center";
        damageCell.appendChild(damageDiv);

        if (!isImmune) {
            const damageIconImg = document.createElement("img");
            if (offense instanceof Repair) {
                damageIconImg.src = repairImage;
            } else {
                damageIconImg.src = attackImage;
            }    
            damageIconImg.width = 20;
            damageDiv.appendChild(damageIconImg);
        }

        const damageAmount = document.createElement('span');
        if (isImmune) {
            damageAmount.className = "immune-text";
            damageAmount.textContent = "🚫Immune";
        } else {
            if (modifier !== null) {
                damageAmount.className = "raged-text";
            }
            damageAmount.textContent = damage;
        }  
        damageDiv.appendChild(damageAmount);

        if (!isImmune && offense.isDamageTypeEQ() && offense.eqCount > 0) {
            const decimalPlace = 2;
            const reducedDamage = round(offense.calcBaseEQDamage(maxHP) - damage, decimalPlace);

            const differentDiv = document.createElement('div');
            differentDiv.className = "d-flex align-items-center justify-content-center reduced-text";
            damageCell.appendChild(differentDiv);

            const prefixSpan = document.createElement('span');
            prefixSpan.textContent = `(- ${reducedDamage}`;
            differentDiv.appendChild(prefixSpan);

            const eqIconImg = document.createElement("img");
            eqIconImg.src = eqIcon;     
            eqIconImg.width = 20;
            differentDiv.appendChild(eqIconImg);

            const surfixSpan = document.createElement('span');
            surfixSpan.textContent = ")";
            differentDiv.appendChild(surfixSpan);
        } else if (modifier !== null) {
            const decimalPlace = 2;
            const reducedDamage = round(offense.calcModify(modifier.getCurrentModify()), decimalPlace);

            const differentDiv = document.createElement('div');
            differentDiv.className = "d-flex align-items-center justify-content-center raged-text";
            damageCell.appendChild(differentDiv);

            const prefixSpan = document.createElement('span');
            prefixSpan.textContent = `(+ ${reducedDamage}`;
            differentDiv.appendChild(prefixSpan);

            const eqIconImg = document.createElement("img");
            eqIconImg.src = modifier.getImagePath();     
            eqIconImg.width = 20;
            differentDiv.appendChild(eqIconImg);

            const surfixSpan = document.createElement('span');
            surfixSpan.textContent = ")";
            differentDiv.appendChild(surfixSpan);
        }

        const hpCell = document.createElement('td');
        rowData.appendChild(hpCell);

        const hpSpan = document.createElement('span');
        hpSpan.textContent = `❤️${remainingHP}`;
        if (remainingHP <= 0) {
            hpSpan.className = "destroyed";
        } else if (remainingHP === maxHP) {
            hpSpan.className = "full-hp";
        }
        hpCell.appendChild(hpSpan);

        return rowData;
    } else {
        throw new Error(`Invalid offenseDamage: ${offenseDamage}`);
    }
}