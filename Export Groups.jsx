// List all top level groups in file
var allGroups = app.activeDocument.layerSets;
var len = allGroups.length;

// Ask for Folder
var outputFolder = Folder.selectDialog("Select destination folder");

var state = SaveState(allGroups, len);

// Iterate groups from bottom to top
for (var i = len-1; i >= 0; i--) {
    var groupName = allGroups[i].name;
    
    // Show Group
    allGroups[i].visible = 1;
    
    // If name start with # skip this layer
    if (groupName[0] == "#") {
        continue;
    }
    
    // Check if it isn't a pop-up
    if (groupName[0] != "^") {
        var master = allGroups[i];
    } else {
        master.visible = 1;

        // Remove ^ simbol from filename
        var re = /(?!\^\s*).+/;
        groupName = groupName.match(re);
    }
    
    // Ignore red colored groups
    app.activeDocument.activeLayer = allGroups[i];
    if (getLayerColour() != "red") {
        saveFile = File(outputFolder + "/" + groupName + ".jpg");
        SaveForWeb(saveFile);
    }
    
    // Hide for cleanup
    allGroups[i].visible = 0;
    master.visible = 0;
}

RestoreState(allGroups, state);



function SaveForWeb(saveFile) {  
    var sfwOptions = new ExportOptionsSaveForWeb();   
    sfwOptions.format = SaveDocumentType.JPEG;   
    sfwOptions.includeProfile = false;   
    sfwOptions.interlaced = 0;   
    sfwOptions.optimized = true;   
    sfwOptions.quality = 80; //0-100   
    activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);  
}


// Hide all groups and return array with visible ones
function SaveState(allGroups, length) {
    var state = [];
    for (var i = 0; i < length; i++) {
        if (allGroups[i].name[0] != "#") {
            if (allGroups[i].visible == 1) {
                state.push(i);
                allGroups[i].visible = 0;
            }
        }
    }
    return state;
}

// Restore group layers state
function RestoreState(allGroups, state) {
    for (var i in state) {
        allGroups[state[i]].visible = 1;
    }
}


// Return active layer color (found somewere in the internets)
function getLayerColour(){
    //Colours returned ....
    // "none","red","orange","yellowColor","grain","blue","violet","gray"
    var ref = new ActionReference(); 
    ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
    var appDesc = executeActionGet(ref); 
    return typeIDToStringID(appDesc.getEnumerationValue(stringIDToTypeID('color')) );
}