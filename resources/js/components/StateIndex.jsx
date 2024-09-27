import { Component } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />
}
export const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />
}

class StateIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            states: [],
            country: {}
        }
        this.deleteState = this.deleteState.bind(this)
    }
    getStates() {
        axios.get(`/states/${this.props.params.id}`)
        .then((response) =>  {
            this.setState({ states: response.data.states, country: response.data.country })
        })
    }
    deleteState(event) {
        MySwal.fire({
            icon:'warning',
            title:'Are you sure?',
            text:"You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
			cancelButtonColor: "#FF5c4E",
			confirmButtonText: "Yes, delete it"
        })
        .then((result) => {
            if(result.isConfirmed) {
                axios.delete(`/state/${event.target.parentElement.value}`)
                .then((response) => {
                    MySwal.fire({
                        icon:'success',
                        title:'Deleted!',
                        text:'State has been deleted!',
                        timer:1500
                    })
                    this.getStates()
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
        this.getStates()
    }
    renderStates() {
        if(this.state.states.length === 0) {
            return (
                <tr>
                    <td colSpan="4" className="text-center">No Data</td>
                </tr>
            )
        }
        console.log(this.state.states)
        return this.state.states.map(state => (
            <tr key={state.id}>
                <td>{state.id}</td>
                <td>{state.name}</td>
                <td>
                    <NavLink className="btn btn-sm rounded-circle btn-primary" to={`/state/edit/${state.id}`}><i className="bi bi-pencil-square"></i></NavLink>
                    <button className="btn btn-sm rounded-circle btn-danger ms-1" value={state.id} type="button" onClick={this.deleteState}><i className="bi bi-trash"></i></button>
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
                            <span>States of {this.state.country.name}</span>
                            <div className="btn-group" role="group">
                                <NavLink to="/" className="btn btn-outline-danger">Return</NavLink>
                                <NavLink to={`/state/add/${this.state.country.id}`} className="btn btn-outline-dark">Add</NavLink>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderStates()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withParams(withNavigation(StateIndex))