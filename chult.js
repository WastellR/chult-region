class Chult {

  constructor() {
    Hooks.on("ready", this._onReady.bind(this));    
  }

  async _onReady() {
    // Find official rolltables if they exist and flag them
    for (const table of game.tables){
        if(table.name === 'Beach' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.796Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "10"});
        }
        else if(table.name === 'Jungle: No Undead' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.805Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "20"});
        }
        else if(table.name === 'Jungle: Lesser Undead' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.817Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "0010xx"});
        }
        else if(table.name === 'Jungle: Greater Undead' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.831Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "0020xx"});
        }
        else if(table.name === 'Mountains' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.841Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "30"});
        }
        else if(table.name === 'Swamp' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.873Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "40"});
        }
        else if(table.name === 'Wasteland' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.882Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "50"});
            table.update({"flags.merlin.hexcrawlEncounters": "60"});
        }
        else if(table.name === 'Rivers' && table.flags.brokenLinkCheck.lastScan == "2025-06-04T15:04:12.848Z"){
            table.update({"flags.merlin.hexcrawlEncounters": "10xxxx"});
        }
    }
  }

  mapNoteClick(journalId, wotcSceneId = null, merlinSceneId = null) {
    if(game.merlin.lastTriggerType === "click") {
        const journal = game.journal.get(journalId);
        if(journal) {
            const page = [...journal.pages.values()]
            .reduce((page, value) =>
                value.sort < page.sort ? value : page
            );
            if(page) {
                journal.sheet.render(true, { pageId: page.id });
            }
        }        
    }
    else if(game.merlin.lastTriggerType === "double click") {        
        const moduleLink = game.settings.get("chult-region", "defaultModuleLink");
        if(moduleLink == "merlin" && merlinSceneId != null && game.modules.get("tomb-of-annihilation-merlin")?.active === true){
            const scene = game.scenes.find(
                s => s.flags?.merlin?.stableId === merlinSceneId
            );
            scene?.view();
        }
        else if (game.modules.get("dnd-tomb-annihilation")?.active === true) {
            const scene = game.scenes.get(wotcSceneId);
            scene?.view();
        }
    }
  }
}

Hooks.once("init", () => {
  console.log("Chult Region Module | Initializing");
  game.chult = new Chult();

  game.settings.register("chult-region", "defaultModuleLink", {
    name: "Default Module Link",
    hint: "Default module that map links in the Chult module will link to.",
    scope: "world",
    config: true,
    type: String,
    default: "wotc",
    choices: {
      merlin: "Merlin's Tomb of Annihilation",
      wotc: "WotC Tomb of Annihilation",
    }
  });
});