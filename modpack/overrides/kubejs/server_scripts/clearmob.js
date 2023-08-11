let interval = 36000
const mobsToKill = ['ttigraas:orc', 'ttigraas:orc_lord', 'ttigraas:otherworlder', 'minecraft:zombie', 'minecraft:skeleton', 'minecraft:spider'];

let sendWarningTick = interval - (1200)
let tickCounter = 0

function killMobs(event) {
    try {
        event.server.entities.forEach(entity => {
            if (entity.isLiving()) {
                if (mobsToKill.some(mob => mob === entity.type.toString())) {
                    entity.kill()

                }
            }
        })
        event.server.players.forEach(player => {
            if (player.isOp()) {
                event.server.runCommandSilent(`/tellraw ${player.name} [{"text": "[ClearMobs] ", "color": "red"}, {"text": "Killed mobs", "color": "white"}]`)
            }
        })
        tickCounter = 0
    } catch (e) {
        event.server.players.forEach(player => {
            if (player.isOp()) {
                event.server.runCommandSilent(`/tellraw ${player.name} [{"text": "[ClearMobs] ", "color": "red"}, {"text": "Error: ${e}", "color": "white"}]`)
            }
        })
        console.log(`[ClearMobs] Error: ${e}]`)
    }
}

onEvent('server.tick', event => {
    tickCounter++
    if (tickCounter === sendWarningTick) {
        event.server.runCommandSilent('/tellraw @a [{"text":"[ClearMobs]", "color":"red"}, {"text": " will clear mobs in 1 minute", "color":"white"}]')
    } else if (tickCounter % interval === 0) {
        killMobs(event)

    }
})

