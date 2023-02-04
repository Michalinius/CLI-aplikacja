import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve('db/contacts.json');

console.log(contactsPath)

// TODO: Funkcja zwraca wszystkie kontakty
export async function listContacts() {
    const contacts = await fs.readFile(contactsPath, { encoding: "UTF-8" });
    const contactsList = JSON.parse(contacts);
    return contactsList;
}
// funkcja zwraca kontakt z podanym ID
export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.filter(contact => contact.id == contactId);
}
// funkcja usuwa kontakt z podanym ID
export async function removeContact(contactId) {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), { encoding: "utf-8" });
}
// funkcja dodaje kontakt do bazy
export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const lastId = Math.max(...contacts.map(c => parseInt(c.id, 10))) + 1
    const newContact = { id: lastId.toString(), name, email, phone };
    const updatedContacts = JSON.stringify([...contacts, newContact], null, 2);
    await fs.writeFile(contactsPath, updatedContacts, { encoding: "utf-8" })
}
