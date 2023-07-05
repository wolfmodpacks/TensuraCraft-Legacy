const $FTBRanksAPI = java('dev.ftb.mods.ftbranks.api.FTBRanksAPI')


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

    switch (event.item) {
        case 'kubejs:goblin_head':
            event.player.runCommand('race Goblin')
            break;
        case 'kubejs:lizardman':
            event.player.runCommand('race Lizardman')
            break;
        case 'kubejs:orc_head':
            event.player.runCommand('race Orc')
            break;
        case 'kubejs:vampire_head':
            event.player.runCommand('race Vampire')
            break;
        case 'kubejs:human_head':
            event.player.runCommand('race Human')
            break;
        case 'kubejs:slime':
            event.player.runCommand('race Slime')
            break;
        case 'kubejs:wight_head':
            event.player.runCommand('race Wight')
            break;
    }
})
