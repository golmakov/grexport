// Ask for Folder
var outputFolder = Folder.selectDialog("Select destination folder");

if (outputFolder != null) {

    // List all top level groups in file
    var allGroups = app.activeDocument.layerSets;
    var len = allGroups.length;

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


// Return active layer color (found somewere in the internets)
function getLayerColour(){
    //Colours returned ....
    // "none","red","orange","yellowColor","grain","blue","violet","gray"
    var ref = new ActionReference(); 
    ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
    var appDesc = executeActionGet(ref); 
    return typeIDToStringID(appDesc.getEnumerationValue(stringIDToTypeID('color')) );
}