const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "db", "contacts.json");

const getContacts = async () => {
  try {
    const result = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await getContacts();
    const result = contacts.find((el) => el.id === String(id));
    return result;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex((el) => el.id === String(id));
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    const newContacts = contacts.filter((el) => el.id !== String(id));
    await fs.writeFile(contactPath, JSON.stringify(newContacts, null, 2));
    return result;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await getContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactPath, JSON.stringify(newContacts, null, 2));
    return newContact;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};
