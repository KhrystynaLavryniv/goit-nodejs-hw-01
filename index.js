const operations = require("./contacts");
const argv = require("yargs").option("id", { type: "string" }).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await operations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await operations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id - ${id} is not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await operations.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await operations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
