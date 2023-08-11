onEvent('entity.death', (event) => {
    if (event.entity.type == 'minecraft:ender_dragon') {
        event.level.getEntitiesWithin(AABB.of(-100, 0, -100, 100, 100, 100)).filter(e => e.isPlayer()).forEach(e => {
            e.stages.add('twilight_access')
        })
    }
})


global.ChangeDimensionEvent = event => {
        try {
            const player = event.getEntity()
            if (event.getDimension().toString() == 'ResourceKey[minecraft:dimension / twilightforest:twilightforest]') {
                if (!player.stages.has('twilight_access')) {
                    player.asKJS().tell(`§cYou need to kill the ender dragon first!`)
                    return event.setCanceled(true)
                }
                else {
                    event.setCanceled(false)
                }
            }

        } catch (e) {
            console.log(e)
        }    
}

global.raceCommand = event => {
    try {
        //console.log('hello world 192')
        console.log(event)
    } catch (e) {
        console.log(e)
    }
}