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

    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    default:
      throw Error('Unknown action.');
  }
}
