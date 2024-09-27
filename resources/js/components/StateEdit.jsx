import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />
}

export const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />
}

class StateEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            name:"",
            country_id:"",
            isLoading: false,
            country: {
                id:"",
                name:""
            }
        }
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.isLoading) return
        this.setState({ isLoading: true })
        axios.put(`/state/${this.state.id}`, this.state)
        .then((response) => {
            MySwal.fire({
                icon:'success',
                title:'Success!',
                text: 'State Updated',
                timer: 1500
            })
            this.props.navigate(`/country/${this.state.country.id}/states`)
        })
        .catch((error) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        })
        .finally(() => this.setState({ isLoading: false }))
    }
    getState() {
        axios.get(`/state/${this.props.params.id}`)
        .then((response) => {
            this.setState({
                id: response.data.state.id,
                name: response.data.state.name,
                country_id: response.data.state.country_id,
                country: response.data.country
            })
        })
    }
    componentDidMount() {
        this.getState()
    }
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Edit State to {this.state.country.name}</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">State Name</label>
                                    <input type="text" className="form-control" placeholder="State Name" onChange={this.handleNameChange} value={this.state.name} />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withParams(withNavigation(StateEdit))