

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import bcrypt from 'bcrypt';

const DEFAULT_URI = 'mongodb://localhost:27017/DIAGONAL_DINOSAUR';


async function promptDatabase() {
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
    return answers.uriChoice === 'default' ? DEFAULT_URI : answers.mongoUri;
}

async function promptPort() {
    const { portChoice } = await inquirer.prompt([{
        type: 'list',
        name: 'portChoice',
        message: 'Select port for web application:',
        choices: ['4200', '3000', 'custom'],
    }]);
    if (portChoice === 'custom') {
        const { customPort } = await inquirer.prompt([{
            type: 'input',
            name: 'customPort',
            message: 'Enter custom port:',
            default: '4242',
            validate: input => {
                const num = parseInt(input, 10);
                return !isNaN(num) && num > 0 ? true : 'Please enter a valid port number';
            }
        }]);
        return customPort;
    }
    return portChoice;
}

async function promptAccountCreation() {
    const { accountCreation } = await inquirer.prompt([{
        type: 'list',
        name: 'accountCreation',
        message: 'Select mode for account creation:',
        choices: ['POST Method', 'Modern UI'],
    }]);
    let alsoAllowPost = null;
    if (accountCreation === 'Modern UI') {
        const { uiAccountCreation } = await inquirer.prompt([{
            type: 'list',
            name: 'uiAccountCreation',
            message: 'Allow the (old) POST method for account creation as well?',
            choices: ['ALLOW', 'DISABLE'],
        }]);
        alsoAllowPost = uiAccountCreation;
    }
    return { accountCreation, alsoAllowPost };
}

async function promptAdminAccount() {
    const { createAdmin } = await inquirer.prompt([{
        type: 'confirm',
        name: 'createAdmin',
        message: 'Create a default admin account?',
        default: true,
    }]);
    if (!createAdmin) return null;
    const admin = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Admin username:',
            default: 'admin',
        },
        {
            type: 'password',
            name: 'password',
            message: 'Admin password:',
            mask: '*',
            validate: input => input.length >= 6 ? true : 'Password must be at least 6 characters',
        }
    ]);
    admin.hashedPassword = await bcrypt.hash(admin.password, 10);
    delete admin.password;
    return admin;
}


// Email config removed

async function main() {
    try {
        const finalUri = await promptDatabase();
        console.log('→ Final URI:', finalUri);
        const finalPort = await promptPort();
        const accountSettings = await promptAccountCreation();
        const adminAccount = await promptAdminAccount();
        // .env
        let envContent = `MONGO_URI=${finalUri}\nPORT=${finalPort}\n`;
        fs.writeFileSync(path.resolve(process.cwd(), '.env'), envContent);
        console.log('.env file created');

        // settings.json
        const settings = {
            port: parseInt(finalPort, 10),
            accountCreationMethod: accountSettings.accountCreation === 'POST Method' ? 'POST' : 'GUI',
            alsoAllowPostAccountCreation: accountSettings.alsoAllowPost ?? null,
            adminAccount
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
}


main();
