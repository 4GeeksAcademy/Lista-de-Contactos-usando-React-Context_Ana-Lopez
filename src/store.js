export const initialStore = () => {
  return {
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload]

      };

    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };




    default:
      throw Error('Unknown action.');

  }

}
