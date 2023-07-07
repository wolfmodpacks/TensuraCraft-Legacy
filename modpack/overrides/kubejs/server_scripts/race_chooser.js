const $FTBRanksAPI = java('dev.ftb.mods.ftbranks.api.FTBRanksAPI')

function removeLastTeleport(player) {
    const teleportHistory = $FBTEssentials.get(player.getProfile()).teleportHistory
    if (!teleportHistory.isEmpty()) {
        teleportHistory.removeLast()
    }

}


function getManager() {
    return $FTBRanksAPI.INSTANCE.getManager()
}

function getRank(player) {
    return getManager().getRank(player)
}

function rankAdded(player, rank) {
    return getManager().getAddedRanks(player.getProfile()).contains(rank)
}


onEvent('player.tick', (event) => {
    const currentRace = event.player.fullNBT.ForgeCaps["ttigraas:player_variables"].OriginalRace
    const formatedRace = currentRace.toLowerCase().replace(' ', '_').replace("[", "").replace("]", "")

    if (event.player.server && event.player.ticksExisted % 90 == 0) {
        try {
            if (!currentRace) return;
            getManager().getAllRanks().forEach(e => {
                if (formatedRace == e.getId()) {
                    if (rankAdded(event.player, e)) return;
                    e.add(event.player.getProfile())
                }
            })

            getManager().getAddedRanks(event.player.getProfile()).forEach(e => {
                if (formatedRace !== e.getId()) {
                    e.remove(event.player.getProfile())
                }
            })
        } catch (e) {
            //console.log(e)
        }
    }
})

onEvent('item.pickup', (event) => {
    
    if (!event.player.stages.has('reincarnation')) {
        event.player.stages.add('reincarnation')
    }

    event.server.scheduleInTicks(10, () => {
        const player = event.player

        switch (event.item) {
            case 'kubejs:goblin_head':
                player.runCommandSilent('race Goblin')
                player.runCommandSilent(`clear ${event.player} kubejs:goblin_head`)
                player.runCommand(`spawn`)
                removeLastTeleport(event.player)

                break;
            case 'kubejs:lizardman':
                player.runCommandSilent('race Lizardman')
                player.runCommandSilent(`clear ${event.player} kubejs:lizardman`)
                player.runCommand(`spawn`)
                removeLastTeleport(event.player)

                break;

            case 'kubejs:orc_head':
                player.runCommandSilent('race Orc')
                player.runCommandSilent(`clear ${event.player} kubejs:orc_head`)
                // 5% chance of obtaining self_regeneration
                if (Math.random() < 0.05) player.give(`ttigraas:self_regeneration`)
                player.runCommand(`spawn`)
                removeLastTeleport(event.player)

                break;

            case 'kubejs:vampire_head':
                player.runCommandSilent('race Vampire')
                player.runCommandSilent(`clear ${event.player} kubejs:vampire_head`)
                player.give(`ttigraas:vampirism`)
                player.runCommand(`spawn`)
                removeLastTeleport(event.player)

                break;

            case 'kubejs:human_head':
                player.runCommandSilent('race Human')
                player.runCommandSilent(`clear ${event.player} kubejs:human_head`)
                player.runCommand(`spawn`)
                removeLastTeleport(event.player)

                break;

            case 'kubejs:slime':
                player.runCommandSilent('race Slime')
                player.runCommandSilent(`clear ${event.player} kubejs:slime`)
                player.give(`ttigraas:absorb_and_dissolve`)
                player.give(`ttigraas:self_regeneration`)
                player.runCommand(`spawn`)
                removeLastTeleport(event.player)

                break;

            case 'kubejs:wight_head':
                player.runCommandSilent('race Wight')
                player.runCommandSilent(`clear ${event.player} kubejs:wight_head`)
                player.runCommand(`spawn`)
                removeLastTeleport(event.player)

                break;

        }

    })
})
