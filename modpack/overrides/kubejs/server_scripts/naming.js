
onEvent('command.run', event => {
    const player = event.parseResults.context.source.func_197022_f()
    const CommandName = event.parseResults.reader.string
    if (player == null) return
    if (!player.stages.has('reincarnation')) {
        event.cancel()
    }

    if (CommandName.contains('/name')) {
        event.server.scheduleInTicks(120, () => {
            event.server.runCommandSilent('execute as @p run effect clear @e[type=!#minecraft:subordinate_mobs] ttigraas:species_evolution')
        });
    }
})