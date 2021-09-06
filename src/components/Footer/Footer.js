import './Footer.css'

function Footer () {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__about'>
         Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <p className='footer__copy'>&copy;{new Date().getFullYear()}</p>
        <nav className='footer__social'>
          <ul className='footer__links'>
            <li className='footer__item'>
              <a className='footer__link' target='_blank' rel='noreferrer' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' target='_blank' rel='noreferrer' href='https://github.com/AleksandraBab'>Github</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' target='_blank' rel='noreferrer' href='https://www.instagram.com/bobs_bohnen/'>Instagram</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
