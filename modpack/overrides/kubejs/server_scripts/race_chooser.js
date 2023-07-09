const $FTBRanksAPI = java('dev.ftb.mods.ftbranks.api.FTBRanksAPI')

const $RaceRerollScrollWorkProcedure = java('net.minheragon.ttigraas.procedures.RaceRerollScrollWorkProcedure')
const $HumanRace = java('net.minheragon.ttigraas.procedures.ChooseHumanProcedure')
const $GoblinRace = java('net.minheragon.ttigraas.procedures.ChooseGoblinProcedure')
const $OrcRace = java('net.minheragon.ttigraas.procedures.ChooseOrcProcedure')
const $LizardmanRace = java('net.minheragon.ttigraas.procedures.ChooseLizardmanProcedure')
const $SlimeRace = java('net.minheragon.ttigraas.procedures.ChooseSlimeProcedure')
const $VampireRace = java('net.minheragon.ttigraas.procedures.ChooseVampireProcedure')
const $WightRace = java('net.minheragon.ttigraas.procedures.ChooseWightProcedure')


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

function raceChooser(race, player, server) {
    server.runCommandSilent(`clear ${player} kubejs:${race}`)
    player.runCommand('spawn')
    removeLastTeleport(player)
}

onEvent('item.pickup', (event) => {

    if (!event.player.stages.has('reincarnation')) {
        event.player.stages.add('reincarnation')
    }
    const theHasmap = {}
    const player_x = event.player.x
    const player_y = event.player.y
    const player_z = event.player.z
    const world = event.player.world

    theHasmap["x"] = player_x
    theHasmap["y"] = player_y
    theHasmap["z"] = player_z
    theHasmap["world"] = world.minecraftWorld
    theHasmap["entity"] = event.player.minecraftPlayer
    event.server.scheduleInTicks(10, () => {
        const player = event.player
        switch (event.item) {
            case 'kubejs:goblin_head':
                player.runCommand('spawn')
                event.server.scheduleInTicks(20, () => {
                    theHasmap["x"] = event.player.x
                    theHasmap["y"] = event.player.y
                    theHasmap["z"] = event.player.z
                    theHasmap["world"] = event.player.world.minecraftWorld
                    theHasmap["entity"] = event.player.minecraftPlayer
                    $RaceRerollScrollWorkProcedure.executeProcedure(theHasmap)
                    $GoblinRace.executeProcedure(theHasmap)
                    event.server.runCommandSilent(`clear ${player.name} kubejs:goblin_head`)
                    removeLastTeleport(player)
                })


                break;
            case 'kubejs:lizardman':
                player.runCommand('spawn')
                $RaceRerollScrollWorkProcedure.executeProcedure(theHasmap)
                $LizardmanRace.executeProcedure(theHasmap)
                event.server.runCommandSilent(`clear ${player.name} kubejs:lizardman`)
                removeLastTeleport(player)

                break;

            case 'kubejs:orc_head':
                player.runCommand('spawn')
                $RaceRerollScrollWorkProcedure.executeProcedure(theHasmap)
                $OrcRace.executeProcedure(theHasmap)
                event.server.runCommandSilent(`clear ${player.name} kubejs:orc_head`)
                removeLastTeleport(player)

                break;

            case 'kubejs:vampire_head':
                player.runCommand('spawn')
                $RaceRerollScrollWorkProcedure.executeProcedure(theHasmap)
                $VampireRace.executeProcedure(theHasmap)
                event.server.runCommandSilent(`clear ${player.name} kubejs:vampire_head`)
                removeLastTeleport(player)

                break;

            case 'kubejs:human_head':
                player.runCommand('spawn')
                $RaceRerollScrollWorkProcedure.executeProcedure(theHasmap)
                $HumanRace.executeProcedure(theHasmap)
                event.server.runCommandSilent(`clear ${player.name} kubejs:human_head`)
                removeLastTeleport(player)

                break;

            case 'kubejs:slime':
                player.runCommand('spawn')
                $RaceRerollScrollWorkProcedure.executeProcedure(theHasmap)
                $SlimeRace.executeProcedure(theHasmap)
                event.server.runCommandSilent(`clear ${player.name} kubejs:slime`)
                removeLastTeleport(player)

                break;

            case 'kubejs:wight_head':
                player.runCommand('spawn')
                $RaceRerollScrollWorkProcedure.executeProcedure(theHasmap)
                $WightRace.executeProcedure(theHasmap)
                event.server.runCommandSilent(`clear ${player.name} kubejs:wight_head`)
                removeLastTeleport(player)

                break;

        }
    })



})
