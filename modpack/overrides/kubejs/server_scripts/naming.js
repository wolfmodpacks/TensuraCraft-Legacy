
onEvent('command.run', event => {
    if (!event.parseResults || !event.parseResults.reader || !event.parseResults.context || !event.parseResults.context.source) return;
    const player = event.parseResults.context.source.func_197022_f()
    const CommandName = event.parseResults.reader.string

    if (player && player.asKJS().isPlayer() && !player.stages.has('reincarnation')) {
        event.cancel()
    }

    if (CommandName.contains('/name')) {
        event.server.scheduleInTicks(120, () => {
            event.server.runCommandSilent('execute as @p run effect clear @e[type=!#minecraft:subordinate_mobs] ttigraas:species_evolution')
        });
    }
})