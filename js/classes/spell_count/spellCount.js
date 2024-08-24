class SpellCount {

    // Store spell count that later will be combined in a list as a spell composition
    // Consists spell and its amount

    constructor(spell, count) {
        this.spell = spell;
        this.count = count;
    }

    // Setter
    set spell (newSpell) {
        if (newSpell instanceof Spell) {
            this._spell = newSpell;
        } else {
            throw new Error(`Invalid spell: ${newSpell}`);
        }
    }

    set count (newCount) {
        if (NumberUtil.isNumber(newCount) && newCount >= 0) {
            this._count = newCount;
        } else {
            throw new Error(`Invalid count: ${newCount}`);
        }
    }

    // Getter
    get spell() {
        return this._spell;
    }

    get count() {
        return this._count;
    }
}