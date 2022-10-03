// const yargs = require("yargs/yargs");
// const { hideBin } = require("yargs/helpers");
const contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>")
  .option("-i, --id <type")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const options = program.opts();
// const argArr = hideBin(process.argv);
// const { argv } = yargs(argArr);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getContacts();
      console.log(allContacts);
      break;
    case "add":
      const contact = await contacts.addContact(name, email, phone);
      console.log(contact);
      break;
    case "get":
      const contactById = await contacts.getContactById(id);
      console.log(contactById);
      break;
    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.log("Unknown action");
  }
};

// invokeAction(argv);
invokeAction(options);
