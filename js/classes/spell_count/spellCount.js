class SpellCount {

    constructor(spell, count) {
        this.spell = spell;
        this.count = count;
    }

    set spell (newSpell) {
        if (newSpell instanceof Spell) {
            this._spell = newSpell;
        } else {
            throw new Error(`Invalid spell: ${newSpell}`);
        }
    }

    set count (newCount) {
        if (typeof newCount === 'number' && newCount >= 0) {
            this._count = newCount;
        } else {
            throw new Error(`Invalid count: ${newCount}`);
        }
    }

    get spell() {
        return this._spell;
    }

    get count() {
        return this._count;
    }
}