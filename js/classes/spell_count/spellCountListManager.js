class SpellCountListManager {
    constructor() {
        this.spellCountList = [];
    }

    load(damageLogListManager) {
        if (damageLogListManager instanceof DamageLogListManager) {
            this.clear();
            const damageLogList = damageLogListManager.getDamageLogList();
            let matchSpell = null;
            let sameSpellCounter = 0;

            for (const [index, damageLog] of damageLogList.entries()) {
                const isLastItem = index === damageLogList.length - 1;
                const spell = damageLog.offense;

                if (spell instanceof Spell) {
                    if (!spell.compare(matchSpell)) {
                        if (matchSpell !== null) {
                            this.add(new SpellCount(matchSpell, sameSpellCounter));
                            sameSpellCounter = 1;
                        } else {
                            sameSpellCounter++;
                        }
                        matchSpell = spell;
                    } else {
                        sameSpellCounter++;
                    }

                    if (isLastItem) {
                        this.add(new SpellCount(matchSpell, sameSpellCounter));
                    }
                } 
                // else {
                //     throw new Error(`Invalid spell: ${spell}`);
                // }
            }
        } else {
            throw new Error(`Invalid damageLogListManager: ${damageLogListManager}`);
        }
    }

    getTotalSpellCount() {
        let totalSpellCount = 0;

        for (const spellCount of this.spellCountList) {
            totalSpellCount += spellCount.count;
        }
        return totalSpellCount;
    }

    concat(newSpellCountListManager) {
        if (newSpellCountListManager instanceof SpellCountListManager) {
            if (!newSpellCountListManager.isEmpty()) {
                this.spellCountList.push(...newSpellCountListManager.spellCountList);
            }           
        } else {
            throw new Error(`Invalid spellCountListManager: ${newSpellCountListManager}`);
        }
    }

    getLength() {
        return this.spellCountList.length;
    }

    isEmpty() {
        return this.getLength() == 0;
    }

    getDonatedSpell() {
        const donatedSpellListManager = new SpellCountListManager;

        for (const spellCount of this.spellCountList) {
            if (spellCount.spell.isDonated) {
                donatedSpellListManager.add(spellCount);
            }
        }
        return donatedSpellListManager;
    }

    add(newSpellCount) {
        this.spellCountList.push(newSpellCount);
    }

    clear() {
        this.spellCountList.length = 0;
    }
}