class SpellCountListManager {

    // Store list of spell counts, together they are a spell composition that able to destroy certain defense
    // For more details about what does spell count do, check spell count class

    constructor() {
        this._spellCountList = [];
    }

    // Load spell count content based on the damage log
    load(damageLogListManager) {
        if (damageLogListManager instanceof DamageLogListManager) {
            const damageLogList = damageLogListManager.damageLogList;

            while (true) {
                let isFoundNewSpell = false;
                let sameSpellCount = 0;
                let keySpell = null;
                
                for (const damageLog of damageLogList) {
                    const spell = damageLog.offense;

                    if (spell instanceof Spell) {
                        // If a new spell (not in the list) is found, check if it matches the key spell. If it does then increment the counter
                        if (isFoundNewSpell) {
                            if (keySpell.compare(spell)) {
                                sameSpellCount++;
                            }
                        } else {
                            // If no new spell is found, continue to iterate through the list until the list runs out or a new spell is found.
                            if (!this.contain(spell)) {
                                keySpell = spell;
                                sameSpellCount++;

                                isFoundNewSpell = true;
                            }
                        }
                    }                  
                }

                // Add new spell count if new spell is found, else the damage log is processed
                if (isFoundNewSpell) {
                    this.add(new SpellCount(keySpell, sameSpellCount));
                } else {
                    break;
                }
            }
        } else {
            throw new TypeError(`Invalid damageLogListManager: ${damageLogListManager}`);
        }
    }

    // Add new spell count and check for unique
    add(newSpellCount) {
        if (newSpellCount instanceof SpellCount) {
            if (!this.contain(newSpellCount.spell)) {
                this.spellCountList.push(newSpellCount);
            } else {
                throw new Error(`SpellCount already exist: ${newSpellCount}`);
            }  
        } else {
            throw new TypeError(`Invalid newSpellCount: ${newSpellCount}`);
        }
    }

    // Check if spell count already exist in the list
    contain(keySpell) {
        return this.getSpellCount(keySpell) !== null;
    }

    // Get spell count based on its spell
    getSpellCount(keySpell) {
        if (keySpell instanceof Spell) {
            for (const spellCount of this.spellCountList) {
                if (spellCount.spell.compare(keySpell)) {
                    return spellCount;
                }
            }
            return null;
        } else {
            throw new TypeError(`Invalid keySpell: ${keySpell}`);
        }
    }

    // Get list of donated spells in spell count list
    getDonatedSpell() {
        const donatedSpellListManager = new SpellCountListManager;

        for (const spellCount of this.spellCountList) {
            if (spellCount.spell.isDonated) {
                donatedSpellListManager.add(spellCount);
            }
        }
        return donatedSpellListManager;
    }
    
    // Get the total amount of spells in all spell counts, can ignore donated spell depend on input
    getTotalSpellCount(isIgnoreDonatedSpell) {
        if (typeof isIgnoreDonatedSpell === "boolean") {
            let totalSpellCount = 0;

            for (const spellCount of this.spellCountList) {
                if (isIgnoreDonatedSpell) {
                    const spell = spellCount.spell;
                    if (!spell.isDonated) {
                        totalSpellCount += spellCount.count;    
                    }
                } else {
                    totalSpellCount += spellCount.count;
                }              
            }
            return totalSpellCount;
        } else {
            throw new TypeError(`Invalid isIgnoreDonatedSpell: ${isIgnoreDonatedSpell}`);
        }
    }

    // Get the amount of unique spells in all spell counts 
    getLength() {
        return this.spellCountList.length;
    }

    isEmpty() {
        return this.getLength() == 0;
    }

    // Reverse the spell count list
    // Use this function to flip the order of spell shown (I prefer eq spell to be on the right side (last) of the list)
    reverse() {
        this.spellCountList.reverse();
    }

    // Empty spell count list
    clear() {
        this.spellCountList.length = 0;
    }

    // Getter
    get spellCountList() {
        return this._spellCountList;
    }
}