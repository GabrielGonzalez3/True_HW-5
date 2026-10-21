import chalk from "chalk";
import prompts from "prompts";
import {randomInt} from "crypto";
import { writeFile } from "node:fs";

//Variables to make it easier to type
const log = console.log;
const num = randomInt(1, 11);
const MAX_attemps = 3;
let attempts = 1;

//I'm gonna make it with 1 in the terminal and 1 in the results.txt file

//Basically make an array that can store strings and use that string as the main string to hold the output
const output = [];
function messages(respond, color = chalk.white){
    log(color(respond));
    output.push(respond);
}

messages('Guess the Number', chalk.green);

messages('--------------------------------', chalk.cyanBright);

messages('Guess a number between 1 and 10.', chalk.whiteBright);

messages('You have 3 tries to try and guess the number otherwise you lose!\n',chalk.yellowBright);

async function game_handling(max){
    const output = `The number was ${num}`;
    while(attempts <= max){
        const guess = await prompts({
            type: 'text',
            name: 'answer',
            message: `Attempt ${attempts}/3: Your guess is`,
        });

        try{
            const your_choice = guess.answer;
        
            const trimmed = your_choice.trim();

            if(trimmed.length == 0){
                throw new Error("Input can not be empty");
            }
                
            const number = Number(trimmed);
            if(!Number.isInteger(number)){
                throw new Error("Input must be a whole number");
            }
            if(number <= 0){
                throw new Error("Must be above 0");
            }
            if(number > 10){
                throw new Error("Must not exceed 10");
            }

            //This ensures that I don't see undefined in the output
            //If this is inside of it then no undefined but if the 
            //function is in a console.log and no return value is used then it
            //will return undefined
            if(number > num){
                messages("Too High!\n",chalk.yellowBright);
                attempts = attempts + 1;
            }
            else if(number < num){
                messages("Too Low!\n",chalk.yellowBright);
                attempts = attempts + 1;
            }
            else if(number == num){
                messages("Congratulations You WIN!\n",chalk.greenBright);
                return output;
            }
        }
        catch(err){
            messages(err.message+"\n", chalk.red);
            attempts++;
            if(attempts > 3){
                messages("GAME OVER",chalk.red);
                messages("You have run out of attempts\n",chalk.redBright);
                return output;
            }
            continue;
        }
    }
    if(attempts > max){
            messages("GAME OVER",chalk.red);
            messages("You have run out of attempts\n",chalk.redBright);
        return output;
    }
}
const result = await game_handling(MAX_attemps);
messages(result, chalk.whiteBright);
messages("Thanks for playing!", chalk.blueBright);

//Quite literally outputs everything to file, uses .join to basically return the string to the file
//well its an array so we have join the array and use \n to space it out between the lines
writeFile('results.txt', output.join('\n'), (err) =>{
    if(err) throw err;
    log('Output has been send to results.txt');
});

