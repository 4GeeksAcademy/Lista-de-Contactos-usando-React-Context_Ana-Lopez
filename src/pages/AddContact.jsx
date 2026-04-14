
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState } from "react";

export const AddContact = () => {

    const { store, dispatch } = useGlobalReducer()

    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    })



    return (


        <form className="row g-3 " onSubmit={FormSubmit}>

            <div className="col-12">
                <label htmlfor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" value {data.name} onChange={formChange} name="email"/>
            </div>

            <div className="col-md-6">
                <label htmlfor="inputPassword4" className="form-label">Phone</label>
                <input type="texto" className="form-control" id="inputPhone" value {data.phone} onChange={formChange}/>
            </div>

            <div className="col-md-6">
                <label htmlfor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" value {data.email} onChange={formChange}/>
            </div>

            <div className="col-12">
                <label htmlfor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" value {data.address} onChange={formChange}placeholder="1234 Main St" />
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
        </form>
    );
}; 