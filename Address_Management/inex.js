const fs = require('fs').promises;
const readline = require('readline');
const filePath = 'contacts.json';
async function readContacts() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error.message);
    return [];
  }
}
async function writeContacts(contacts) {
  try {
    const data = JSON.stringify(contacts, null, 2);
    await fs.writeFile(filePath, data);
    console.log('Contacts written successfully.');
  } catch (error) {
    console.error('Error writing contacts:', error.message);
  }
}
async function addContact() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Enter name: ', (name) => {
      rl.question('Enter phone number: ', (phone) => {
        rl.close();
        resolve({ name, phone });
      });
    });
  });
}
async function main() {
  try {
    const contacts = await readContacts();
    const newContact = await addContact();
    contacts.push(newContact);
    await writeContacts(contacts);
    console.log('All Contacts:', contacts);
  } catch (error) {
    console.error('An unexpected error occurred:', error.message);
  }
}
main();