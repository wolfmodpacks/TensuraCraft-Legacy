
onEvent('command.run', event => {
    const CommandName = event.parseResults.reader.string
    if (CommandName.contains('/name')) {
        event.server.scheduleInTicks(120, () => {
            event.server.runCommandSilent('execute as @p run effect clear @e[type=!#minecraft:subordinate_mobs] ttigraas:species_evolution')
        });
    }
})