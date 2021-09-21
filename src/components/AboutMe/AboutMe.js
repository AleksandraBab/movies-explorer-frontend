import Portfolio from '../Portfolio/Portfolio'
import './AboutMe.css'
import me from '../../images/me.jpeg'

function AboutMe () {

  return (
    <section className='aboutme'>
      <div className='aboutme__container'>
        <h2 className='aboutme__heading'>Студентка</h2>
        <div className='aboutme__me'>
          <div className='aboutme__desc'>
            <p className='aboutme__title'>Александра</p>
            <p className='aboutme__subtitle'>Фронтенд-разработчица, 27 лет</p>
            <p className='aboutme__about'>Я живу в Санкт-Петербурге, закончила СПБГУ по&nbsp;специальности Культурология. Я&nbsp;работала
            экскурсоводом в музее Фаберже, проходила стажировку в&nbsp;Бундестаге и даже вела соцсети одной известной оппозиционной организации.
            А&nbsp;потом я решила круто поменять жизнь и теперь занимаюсь фронтенд-разработкой в&nbsp;компании T-Systems. Люблю спорт, искусство, вкусную еду
            и своих котов &mdash; королеву Эгвин и мистера Фауста.
            </p>
            <ul className='aboutme__links'>
              <li className='aboutme__item'>
                <a className='aboutme__link' target='_blank' rel='noreferrer' href='https://www.instagram.com/bobs_bohnen/'>Instagram</a>
              </li>
              <li className='aboutme__item'>
                <a className='aboutme__link' target='_blank' rel='noreferrer' href='https://github.com/AleksandraBab'>Github</a>
              </li>
            </ul>
          </div>
          <img className='aboutme__img' src={me} alt='the author'/>
        </div>
        <Portfolio
        />
      </div>
    </section>
  )
}

export default AboutMe
