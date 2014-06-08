# Export groups as files

This scripts exports each layer group as separate .jpg file in selected folder and name each file with the name of the group.

## Usage

If layer name starts with a "^" sign, that layer would be exported with the downlaying group layer without this sign. (It is usefull for things like pop-ups)

If group needs to be shared between all exported pages, place "#" sign in it name and make that group visible before export.

The visible layer which hadn't been put into any of the groups is exported to all of the files.


## Instalation

Place *Export Groups.jsx* file in folder *"Photoshop/Presets/Scripts/"* and restart Photoshop. Script is now acsessible through Photoshop *"File > Scripts > Export Groups"* menu item.