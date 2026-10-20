import chalk from "chalk";
import prompts from "prompts";
import {randomInt} from "crypto";

//Variables to make it easier to type
const log = console.log;
const num = randomInt(1, 11);
const attempts = 1;

log(chalk.green('Guess the Number'));

log(chalk.cyanBright('--------------------------------'));

log(chalk.whiteBright('Guess a number between 1 and 10.'));

log(chalk.yellowBright('You have 3 tries to try and guess the number otherwise you lose!'))

const guess = await prompts({
    type: 'text',
    name: 'answer',
    message: `Attempt ${attempts}/3: Your guess is`,
  });

const your_choice = guess.answer;