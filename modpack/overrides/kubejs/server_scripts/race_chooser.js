const races = [
    'goblin_head',
    'lizardman',
    'orc_head',
    'vampire_head',
    'human_head',
    'slime',
    'wight_head'
]


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
