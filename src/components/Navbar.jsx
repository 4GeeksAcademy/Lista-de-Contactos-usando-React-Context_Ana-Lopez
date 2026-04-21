import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Nahyah's Agenda</span>
				</Link>
				<div className="ml-auto">
					<Link to="/addcontact">
						<button className="btn btn-success">Add a New Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};