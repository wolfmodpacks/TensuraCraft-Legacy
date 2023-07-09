onEvent('item.registry', event => {
	// Register new items here
	event.create('goblin_head').displayName('Goblin Race').texture('kubejs:item/goblin_head')

    event.create('lizardman').displayName('Lizardman Race').texture('kubejs:item/lizardman_head')

    event.create('orc_head').displayName('Orc Race').texture('kubejs:item/orc_head')

    event.create('vampire_head').displayName('Vampire Race').texture('kubejs:item/vampire_head')

    event.create('human_head').displayName('Human Race').texture('kubejs:item/human_head')

    event.create('slime').displayName('Slime Race').texture('kubejs:item/slime')

    event.create('wight_head').displayName('Wight Race').texture('kubejs:item/wight_head')

    event.create('mysterymeat')
    .displayName('Mystery Meat')
    .texture('kubejs:item/mysterymeat')
    .tooltip('§7§oTeleports u to the Race Hall after eating it...')
    .glow(true)
    .food(f => {
        f.hunger(20)
        f.saturation(20)
        f.meat()
        f.eaten(e => {
            e.server.runCommandSilent(`/execute as ${e.player.name} in spawn:spawn/void run tp 0 74 1`)
            e.player.stages.remove('reincarnation')
        })
    })

})