const $FBTEssentials = java('dev.ftb.mods.ftbessentials.util.FTBEPlayerData')

function removeLastTeleport(player) {
    const teleportHistory = $FBTEssentials.get(player.getProfile()).teleportHistory
    if (!teleportHistory.isEmpty()) {
        teleportHistory.removeLast()
    }

}

onEvent('entity.death', event => {
    const entity = event.entity
    if (!entity.isPlayer()) return
    event.server.scheduleInTicks(40, () => {
        removeLastTeleport(entity)
    })
})