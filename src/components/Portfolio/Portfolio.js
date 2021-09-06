import './Portfolio.css'

function Portfolio () {

  return (
    <div className='portfolio'>
      <h3 className='portfolio__heading'>Портфолио</h3>
        <ul className='portfolio__links'>
          <li className='portfolio__item'>
            <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://github.com/Charity-project-bbbs/bbbs-project'>Конкурсный проект</a>
            <div className='portfolio__arrow'></div>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://github.com/AleksandraBab/Cats-Gallery_React'>Адаптивный сайт</a>
            <div className='portfolio__arrow'></div>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://capibara.students.nomoredomains.rocks'>Одностраничное приложение</a>
            <div className='portfolio__arrow'></div>
          </li>
        </ul>
    </div>
  )
}

export default Portfolio
