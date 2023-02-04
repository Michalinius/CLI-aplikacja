import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            listContacts().then(console.table);
            break;

        case 'get':
            getContactById(id).then(console.log);
            break;

        case 'add':
            addContact(name, email, phone);
            break;

        case 'remove':
            removeContact(id);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);