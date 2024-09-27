import { Component } from "react"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

class CountryIndex extends Component {
	constructor (props){
		super(props)
		this.state = {
			countries: []
		}
		this.deleteCountry = this.deleteCountry.bind(this)
	}
	getCountries(){
		axios.get('/country')
		.then(response => {
			this.setState({countries: response.data})
		})
	}
	deleteCountry(event){
		MySwal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			text: "Your won't be able to revert this!",
			showCancelButton: true,
			confirmButtonColor: "#4CAF50",
			cancelButtonColor: "#FF5c4E",
			confirmButtonText: "Yes, delete it"
		})
		.then((result) => {
			if(result.isConfirmed) {
				axios.delete(`country/${event.target.parentElement.value}`)
				.then((response) => {
					MySwal.fire({
						icon:'success',
						title:'Deleted!',
						text:'Country has been deleted!',
						timer: 1500
					})
					this.getCountries()
				})
				.catch((error) => {
					MySwal.fire({
						icon:'error',
						title:'Error',
						text:error.response.data.message,
					})
				})
			}
		})
	}	
	componentDidMount() {
		this.getCountries()
	}
	componentDidUpdate() {
	}
	renderCountries() {
		return this.state.countries.map(country => (
			<tr key={country.id}>
				<td>{country.id}</td>
				<td>{country.name}</td>
				<td>{country.states.length}</td>
				<td>
					<NavLink className="btn btn-sm rounded-circle btn-success" to={`/country/${country.id}/states`}><i className="bi bi-eye-fill"></i></NavLink>
					<NavLink className="btn btn-sm rounded-circle btn-primary ms-1" to={`/country/edit/${country.id}`}><i className="bi bi-pencil-square"></i></NavLink>
					<button className="btn btn-sm rounded-circle btn-danger ms-1" value={country.id} type="button" onClick={this.deleteCountry}><i className="bi bi-trash"></i></button>
				</td>
			</tr>
		))
	}
	render() {
		return (
			<div className="row justify-content-center">
				<div className="col-md-8 mt-3">
					<div className="card">
						<div className="card-header d-flex justify-content-between align-items-center">
							<span>Countries</span>
							<NavLink className="btn btn-outline-dark" to="/country/create">Add</NavLink>
						</div>
						<div className="card-body">
							<table className="table table-bordered table-striped">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th># States</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{this.renderCountries()}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CountryIndex