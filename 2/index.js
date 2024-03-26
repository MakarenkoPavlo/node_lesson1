import 'colors';
import { fstat, promises as fs } from 'fs';
import { program } from 'commander';
import readline from 'readline';

program.option('-f, --file <type>', 'file for saving game results', 'game_results.log');
program.parse(process.argv)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



let counter = 0;

const mind = Math.ceil(Math.random() * 10);

const logFile = program.opts().file;

const isValid = (num) => {
    if (!Number.isNaN(num) && num > 0 && num <= 10) return true;
    if (Number.isNaN(num)) console.log('Please, enter a number!'.red);
    if (num < 1 || num > 10) console.log('Number should be between 1 and 10'.red);
    return false;
}

const logger = async (msg, logFile) => {
    try {
    console.log(msg.magenta);
        await fs.appendFile(logFile, `${new Date().toLocaleString('uk-UA')} - ${msg}`);
        console.log(`Successfully saved game results to the ${logFile}`)
    } catch (err) {
        console.log(`Something went very wrong.. ${err.message}`.red)
    }
}

const game = () => {
    rl.question('Please, any whole number from 1 to 10! \n'.green, (value) => {
        const number = +value;

         if (!isValid(number)) return game();

        counter += 1;

       

        if (number !== mind) {
            console.log('Oh no!! Try again!'.red);

            

            return game();;
        }

        logger(`Congratulations!! You guessed the number ${counter} attempts :]`, logFile);

      
        rl.close();
    })
};

game();
