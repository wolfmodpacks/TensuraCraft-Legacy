onEvent('server.load', event => {
    // Warn ussers 30 minutes before restart
    event.server.schedule(330 * MINUTE, () => {
        event.server.runCommandSilent('say Server will restart in 30 minutes!')
    })

    // Warn ussers 5 minutes before restart
    event.server.schedule(355 * MINUTE, () => {
        event.server.runCommandSilent('say Server will restart in 5 minutes!')
    })

    // Every 6 hours, restart the server
    event.server.schedule(360 * MINUTE, () => {
        event.server.stop()
    })
})