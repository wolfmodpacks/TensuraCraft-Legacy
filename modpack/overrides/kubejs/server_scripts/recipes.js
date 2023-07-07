onEvent('recipes', event => {
    // Furnace
    event.remove({ id: 'coins:furnace/gold_ingot_to_gold_coin'})
    event.remove({ id: 'coins:furnace/iron_ingot_to_iron_coin'})

    // Blast Furnace
    event.remove({ id: 'coins:blasting/gold_ingot_to_gold_coin'})
    event.remove({ id: 'coins:blasting/iron_ingot_to_iron_coin'})

    // Ttigraas
    event.remove({ id: 'ttigraas:race_reroll_scroll'})
})