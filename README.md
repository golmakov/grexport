# Export groups as files

This scripts exports each layer group as separate .jpg file in selected folder and name each file with the name of the group.

## Usage

If layer name starts with a "^" sign, that layer would be exported with the downlaying group layer without this sign. (It is usefull for things like pop-ups)

If group needs to be shared between all exported pages, place "#" sign in it name and make that group visible before export.

You can exclude group from export by setting group colour to red.

*Export Selected Groups* exports only groups that have been coloured in yellow.

The visible layer which hadn't been put into any of the groups is exported to all of the files.

You can try scripts on the **sample.psd** file.


## Installation

Place *Export All Groups.jsx* and *Export Selected Groups.jsx*  files in folder *"Photoshop/Presets/Scripts/"* and restart Photoshop. Scripts are now acsessible through Photoshop *"File > Scripts > Export All Groups"* and *"Export Selected Groups"* menu items.