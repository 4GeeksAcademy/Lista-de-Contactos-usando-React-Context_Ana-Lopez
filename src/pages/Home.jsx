import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx"


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	console.log(store.contacts)

	async function cargarContactos() {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/nahyah/contacts");
			if (!response.ok) {
				throw new Error(`Error al obtener el contacto: ${response.statusText}`)
			}
			const data = await response.json()

			dispatch({
				type: "set_contacts",
				payload: data.contacts,
			})

		} catch (error) {
			console.error("Error en cargar contactos:", error)
		}
	}

	//Aqui llamamos a la funcion directamente al cargar la pagina
	useEffect(() => {
		if (store.contacts.length === 0) {
			cargarContactos()
		}
	}, [])

	return (
		<div className="container mt-4">
			<h1>Contact List</h1>

			{store.contacts.map((contact) => (
				<Card key={contact.id} contact={contact} />
			))}

		</div>

	);
}; 