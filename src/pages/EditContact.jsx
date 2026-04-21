import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditContact = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const { contact_id } = useParams()

    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    })

    // 🔹 1. Cargar datos del contacto
    useEffect(() => {
        const contacto = store.contacts.find(
            item => item.id === parseInt(contact_id)
        );

        if (contacto) {
            setData({
                name: contacto.name,
                phone: contacto.phone,
                email: contacto.email,
                address: contacto.address
            });
        } else {
            alert("El contacto no existe");
            navigate("/");
        }
    }, [store.contacts, contact_id, navigate]);

    // 🔹 2. Manejar cambios del input
    const formChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    // 🔹 3. Enviar actualización
    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/nahyah/contacts/${contact_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...data,
                        agenda_slug: "nahyah"
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar");
            }

            const updatedContact = await response.json();

            // 🔹 4. Actualizar en el store
            dispatch({
                type: "set_contacts",
                payload: store.contacts.map(contact =>
                    contact.id === parseInt(contact_id)
                        ? updatedContact
                        : contact
                )
            });

            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Error al actualizar el contacto");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Edit Contact</h1>

            <form className="row g-3" onSubmit={formSubmit}>

                <div className="col-12">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={data.name}
                        onChange={formChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={data.phone}
                        onChange={formChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={data.email}
                        onChange={formChange}
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={data.address}
                        onChange={formChange}
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-success">
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    );
};