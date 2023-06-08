onEvent('player.logged_in', (event) => {
    if(!event.player.stages.has('reincarnation')) {
        event.player.stages.add('reincarnation')
        event.player.give('ftbquests:book')
        event.server.runCommand(`/execute as ${event.player.name} run isekai`)
    }
    dailyQuests(event)
})


function dailyQuests(events) {
    const day = new Date().getDay();
    const questIds = [
        "4C2D308AF8A22FFB",
        "70543DE6F4F458FD",
        "16B072746A32D469",
        "792AFA4F56728BDC",
        "073BB34B017F3525",
        "1844CFE0D6BA57D5",
        "6A38F29ACA57A018"
    ];

    if (day >= 0 && day <= 6) {
        const questId = questIds[day];
        events.server.runCommand(`/ftbquests change_progress ${events.player.name} complete ${questId}`);
    }
}