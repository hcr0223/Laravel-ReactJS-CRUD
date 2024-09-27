import './bootstrap'
import { createRoot } from 'react-dom/client'
import App from './layouts/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Modal } from 'bootstrap'
import { NavLink } from 'react-router-dom'

const root = createRoot(document.getElementById('app'))
root.render(
    <div>
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a href="/" className='navbar-brand'>React App</a>
                </div>
            </nav>
        </div>
        <div className="container-fluid">
            <App/>
        </div>
    </div>
)