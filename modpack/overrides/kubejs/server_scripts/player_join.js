onEvent('player.logged_in', (event) => {
    if (!event.server.isSinglePlayer()) {
        if (!event.player.stages.has('reincarnation')) {
            event.player.give('ftbquests:book')
            event.server.runCommandSilent(`/execute as ${event.player.name} run isekai`)
            event.server.runCommandSilent(`/execute as ${event.player.name} in spawn:spawn/void run tp 0 74 1`)
        }
    }
    event.server.runCommandSilent(`/recipe give ${event.player.name} *`)
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

function weeklyDailyQuests(event) {
    const date = new Date()
    const startOfTheWeek = date.getDate() - date.getDay();
    const lastDayOfWeek = startOfTheWeek + 6;

    const questIds = [
        "1500506F82714397", // Week 1
        "06867479A8E090E7", // Week 2
        "14D133B835CE66C4", // Week 3
        "265B2DDF798A1BE4", // Week 4
        "091C67754CB63B44"  // Week 5
    ];

    if (date.getDate() >= startOfTheWeek && date.getDate() <= lastDayOfWeek) {
        const questIndex = date.getDate() - startOfTheWeek;
        const questId = questIds[questIndex];
        event.server.runCommand(`/ftbquests change_progress ${event.player.name} complete ${questId}`);
    }

}