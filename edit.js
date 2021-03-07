#!/usr/bin/env node

var fs = require('fs');
var convert = require('xml-js');
var prompt = require('prompt');
var colors = require('colors');

const backupFile = (path, content) => {
    fs.writeFile(`${path}_backup`, content, (err) => {
        if (err) throw err;
        console.log('The backup file has been saved!'.green);
    });
} 

const readFileToJson = (path) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) reject(err);
            backupFile(path, data)
            const json = convert.xml2json(data, {compact: true, spaces: 4});
            const save = JSON.parse(json);
            resolve(save)
        })
    })
}

const JsonToSave = (path, save) => {
    var json = JSON.stringify(save)
    var xml = convert.json2xml(json, {compact: true, spaces: 4});
    fs.writeFile(path, xml, (err) => {
        if (err) throw err;
        console.log('The xml file has been saved!'.green);
    });
}

const makeAction = () => {
    return new Promise(async function (resolve, reject) {
        prompt.start();
        const {action} = await prompt.get(['action']);
        resolve(action);
    })
}

const printSave = (save) => {
    console.log('\n\n\********************');
    console.log('Name: ', save.SaveGame.player.name._text);
    console.log('Money: ', save.SaveGame.player.money._text);
    console.log('Now for Item\n--------------------');
    save.SaveGame.player.items.Item.forEach((item, index) => {
        item._attributes['xsi:type'] && item._attributes['xsi:type'] !== 'Object' && console.log(index + '.', item.DisplayName._text.grey)
        item._attributes['xsi:type'] && item._attributes['xsi:type'] === 'Object' && console.log(index + '.', item.DisplayName._text + ' : ' + item.Stack._text)
        item._attributes['xsi:nil'] === 'true' && console.log(index + '. NIL'.grey)
    })
}

const start = async () => {
    const [,, ...args] = process.argv
    // const first_path = 'Ness_263253835';
    const first_path = args[0]
    // const path = [__dirname, first_path].join('/');
    const path = first_path;
    console.log(path);
    try {
        var save = await readFileToJson(path);

        var action = ''
        while (action !== 'save') {
            printSave(save);
            action = await makeAction()
            if (save !== 'save') {
                // Edit Item
                if (action.match(/^[0-9]+ [0-9]+$/)) {
                    const [index, number] = action.split(' ');
                    save.SaveGame.player.items.Item[index].Stack._text = number
                    save.SaveGame.player.items.Item[index].stack._text = number
                    console.log('Edit Item'.green)
                }

                // Edit Noney
                if (action.match(/^money [0-9]+$/)) {
                    const money = action.split(' ')[1];
                    save.SaveGame.player.money._text = money
                    console.log('Edit Money'.green)
                }

                // Edit Name
                if (action.match(/^name [a-zA-Z0-9]+$/)) {
                    const name = action.split(' ')[1];
                    save.SaveGame.player.name._text = name
                    console.log('Edit Name'.green)
                }
            }
        }

        JsonToSave(path, save)
    } catch (err) {
        console.log('File could not be opened'.red)
    }
}

start();