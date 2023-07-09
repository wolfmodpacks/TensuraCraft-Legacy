// priority: 0
console.info('Hello, World! (You will see this line every time client resources reload)')

onEvent('jei.hide.items', event => {
	// Hide items in JEI here
	// event.hide('minecraft:cobblestone')
})


onEvent('client.tick', event => {
	const gui = Client.getCurrentGui()
	if(gui == null) return
	if (gui.toString().matches("net\\.minheragon\\.ttigraas\\.gui\\.RaceRandomChanceGuiWindow@\\w+")) {
		event.player.tell("Open your Abilities to stop the glitchiness.\n\nThis is normally the 'B' Key.")
		//Client.setCurrentGui(null)
	}

})