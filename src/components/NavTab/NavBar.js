import './NavBar.css'

function NavBar (props) {
  const scroll = () => {
    props.fieldRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <button type='button' className='navBar' onClick={scroll}>
      Узнать больше
    </button>
  )
}

export default NavBar
