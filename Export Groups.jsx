// List all top level groups in file
var allGroups = app.activeDocument.layerSets;
var len = allGroups.length;

// Ask for Folder
var outputFolder = Folder.selectDialog("Select destination folder");

// Iterate groups from bottom to top
for (var i = len-1; i >= 0; i--) {
    var groupName = allGroups[i].name;
    
    // Show Group
    allGroups[i].visible = 1;
    
    // If name start with # skip this layer
    if (groupName[0] == "#") {
        continue;
    }
    
    // Check it isn't a pop-up
    if (groupName[0] != "^") {
        var master = allGroups[i];
    } else {
        master.visible = 1;

        // Remove ^ simbol from filename
        var re = /(?!\^\s*).+/;
        groupName = re.match(groupName);
    }
    
    saveFile = File(outputFolder + "/" + groupName + ".jpg");
    SaveForWeb(saveFile);
    
    // Hide for cleanup
    allGroups[i].visible = 0;
    master.visible = 0;
}

function SaveForWeb(saveFile) {  
    var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.JPEG;   
    sfwOptions.includeProfile = false;   
    sfwOptions.interlaced = 0;   
    sfwOptions.optimized = true;   
    sfwOptions.quality = 80; //0-100   
    activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);  
}  