import { Component } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

//use the navigation hook so we can navigate to other places of the app
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />
}

class CountryCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:""
        }
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    handleNameChange(event) {
        this.setState({name: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post("/country/store", this.state)
        .then(response => {
            MySwal.fire({
                icon:'success',
                title:'Success',
                text:'Country created!',
                timer: 1500
            })
            this.props.navigate("/")
        })
        .catch(error => {
            MySwal.fire({
                icon:"error",
                title: 'Oops...',
                text: error.response.data.message,
            })
        })
    }
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Create Country</div>
                        <div className="card-body">
                            <form className="space-y-6" onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Name" onChange={this.handleNameChange} value={this.state.name} />
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

export default withNavigation(CountryCreate)