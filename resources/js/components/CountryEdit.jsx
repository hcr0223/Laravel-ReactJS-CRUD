import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

// use the navigation hook
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />
}
//use the params hook 
export const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />
}

class CountryEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:"",
            name:"",
            isLoading: false
        }
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.isLoading) return
        this.setState({ isLoading: true })
        axios.put(`/country/${this.state.id}`, this.state)
        .then((response) => {
            MySwal.fire({
                icon:'success',
                title: 'Success',
                text: 'Country Edited',
                time: 1500
            })
            this.props.navigate('/')
        })
        .catch((error) => {
            MySwal.fire({
                icon:'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        })
        .finally(() => this.setState({ isLoading: true }))
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        axios.get(`/country/${this.props.params.id}`)
        .then((response) => {
            this.setState({
                id: response.data.id,
                name: response.data.name
            })
        })
        .finally(() => this.setState({ isLoading: false }))
    }
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Edit Country</div>
                        <div className="card-body">
                            <form className="space-y-6" onSubmit={this.handleSubmit}>
                                <input type="hidden" name="id" id="id" value={this.state.id} />
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Name" onChange={this.handleNameChange} value={this.state.name} />
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

export default withParams(withNavigation(CountryEdit))