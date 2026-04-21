import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ contact }) => {

    const { store, dispatch } = useGlobalReducer();

    const deleteContact = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/nahyah/contacts/${contact.id}`,

                {
                    method: "DELETE"

                }

            );
            if (!response.ok) {
                throw new Error("No se pudo borrar el contacto");

            }
            dispatch({
                type: "delete_contact",
                payload: contact.id
            });
        } catch (error) {
            console.error("Hubo un problema al borrar el contacto", error);
            alert("No se pudo borrar el contacto");
        }
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="row g-0 align-items-center">

                <div className="col-md-2 text-center p-3">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/014/194/232/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                        className="img-fluid rounded-circle"
                        alt="contact"
                    />
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mb-2">{contact.name}</h5>
                        <p className="card-text mb-1">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            {contact.address}
                        </p>
                        <p className="card-text mb-1">
                            <i className="fa-solid fa-phone me-2"></i>
                            {contact.phone}
                        </p>
                        <p className="card-text mb-0">
                            <i className="fa-solid fa-envelope me-2"></i>
                            {contact.email}
                        </p>
                    </div>
                </div>

                <div className="col-md-2 d-flex justify-content-center align-items-center gap-2 p-3">
                    <Link to={`/editcontact/${contact.id}`}className="text-dark">
                        <i className="fa-solid fa-pencil"></i>
                    </Link>

                    <button className="btn btn-link text-dark" onClick={deleteContact}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>

            </div>
        </div>
    )

}