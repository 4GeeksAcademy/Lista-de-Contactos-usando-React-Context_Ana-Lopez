
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from "react";

export const AddContact = () => {

    const { store, dispatch } = useGlobalReducer()

    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    })

    const crearAgenda = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/nahyah", {
                method: "POST"
            });

            if (!response.ok) {
                console.log("La agenda ya existe o hubo un error");
                return;
            }
                const result = await response.json();
                console.log(result);
            

            } catch (error) {
                console.error("Hubo un problema al crear la agenda", error);
            }
        };

        useEffect(() => {
            crearAgenda();
        }, []);


        const formChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value })
        }

        const formSubmit = async (e) => {

            e.preventDefault()

            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/nahyah/contacts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...data,
                        agenda_slug: "nahyah"
                    })


                });

                 if (!response.ok) {
                    throw new Error("Error en la respuesta");
                }
                const result = await response.json();
                console.log(result);

                dispatch({
                    type: "add_contact",
                    payload: result
                })
               

            } catch (error) {
                console.error("Hubo un problema al crear el contacto", error);
            }
        };

        return (

            <form className="row g-3 " onSubmit={formSubmit}>

                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" value={data.name} onChange={formChange} name="name" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" value={data.phone} onChange={formChange} name="phone" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" value={data.email} onChange={formChange} name="email" />
                </div>

                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" value={data.address} onChange={formChange} name="address" />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
            </form>
        );
    }; 