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

class StateCreate extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            country_id:this.props.params.id,
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
        axios.post("/state/add", this.state)
        .then((response) => {
            MySwal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'State Added',
                timer: 1500
            });
            this.props.navigate(`/country/${this.state.country.id}/states`)
        })
        .catch((error) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops..',
                text: error.response.data.message,
            })
        })
    }
    getCountry() {
        axios.get(`/country/${this.props.params.id}`)
        .then((response) => {
            this.setState({
                country: {
                    id: response.data.id,
                    name: response.data.name
                }
            })
        })
    }
    componentDidMount() {
        this.getCountry()
    }
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Add State to {this.state.country.name}</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">State Name</label>
                                    <input type="text" className="form-control" placeholder="State Name" onChange={this.handleNameChange} value={this.state.name} />
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withParams(withNavigation(StateCreate))