import {promises as fs} from 'fs';
import path from 'path';


(async () => {

    try {
        
        // READ TEXT ========================================
        const pathToTextFile = path.join('samples', 'texts', 'example.txt');
        // const pathToFile = path.resolve('samples', 'texts', 'example.txt');

        const readResult = await fs.readFile(pathToTextFile);

        await fs.appendFile(pathToTextFile, 'NEW LINE=================');
        
        // READ directory ===================================
        const filesDir = 'samples';

        // const directoryContent = await fs.readdir(filesDir);
        // const info = await fs.lstat(filesDir);

        // console.log({ info: info.isDirectory() });
        
        // console.log({ readResult: readResult.toString() })

        // READ JSON

        const pathToJsonFile = path.join('samples', 'example.json');
        const readJsonResult = await fs.readFile(pathToJsonFile);

        const userObject = JSON.parse(readJsonResult)
        const newUserObject = {
            ...userObject,
            role: 'admin'
        }
        await fs.writeFile(pathToJsonFile, JSON.stringify(newUserObject))
        
    } catch (error) {
        console.log(error);
    }

})();