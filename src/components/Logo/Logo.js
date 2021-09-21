import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import './Logo.css'

function Logo (props) {
  return (
    <Link to="/"
      className={`logo ${props.place === 'sign' ? 'logo__place_sign' : ''}`}
      src={logo} alt="Логотип Capibara Movies">
    </Link>
  )
}

export default Logo
