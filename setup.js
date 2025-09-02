const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const DEFAULT_URI = 'mongodb://localhost:27017/DIAGONAL_DINOSAUR';

(async function () {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'uriChoice',
                message: 'Select Mongo connection string:',
                choices: [
                    { name: `Use default (${DEFAULT_URI})`, value: 'default' },
                    { name: 'Enter custom URI…', value: 'custom' }
                ]
            },
            {
                type: 'input',
                name: 'mongoUri',
                message: 'Enter Mongo URI:',
                when: answers => answers.uriChoice === 'custom',
                default: DEFAULT_URI
            }
        ]);

        const finalUri = answers.uriChoice === 'default'
            ? DEFAULT_URI
            : answers.mongoUri;
        console.log('→ Final URI:', finalUri);

        const { portChoice } = await inquirer.prompt([{
            type: 'list',
            name: 'portChoice',
            message: 'Select port for web application:',
            choices: ['4200', '3000', 'custom'],
        }]);

        const { customPort } = await inquirer.prompt([{
            type: 'input',
            name: 'customPort',
            message: 'Enter custom port:',
            when: () => portChoice === 'custom',
            default: '4242',
            validate: input => {
                const num = parseInt(input, 10);
                return !isNaN(num) && num > 0 ? true : 'Please enter a valid port number';
            }
        }]);

        const { accountCreation } = await inquirer.prompt([{
            type: 'list',
            name: 'accountCreation',
            message: 'Select mode for account creation:',
            choices: ['1.The POST Method', '2.Modern UI'],
        }]);

        const { uiAccountCreation } = await inquirer.prompt([{
            type: 'list',
            name: 'uiAccountCreation',
            message: 'Allow the (old) POST method for account creation as well?',
            when: () => portChoice === 'custom',
            choices: ['ALLOW', 'DISABLE'],
        }]);

        const finalPort = portChoice === 'custom' ? customPort : portChoice;

        // .env
        const envContent = `MONGO_URI=${finalUri}\n`;
        fs.writeFileSync(path.resolve(process.cwd(), '.env'), envContent);
        console.log('.env file created');

        //settings.json
        const settings = {
            port: parseInt(finalPort, 10),
            accountCreationMethod: accountCreation == "1.The POST Method" ? "POST": "GUI",
            alsoAllowPostAccountCreation: uiAccountCreation ?? null
        };
        fs.writeFileSync(
            path.resolve(process.cwd(), 'settings.json'),
            JSON.stringify(settings, null, 2)
        );
        console.log('settings.json file created');

    } catch (err) {
        console.error('Error during setup:', err);
        process.exit(1);
    }
})();
