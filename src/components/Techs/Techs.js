import './Techs.css'

function Techs () {
  const techList = ['HTML',
    'CSS',
    'JS',
    'React',
    'Git',
    'Express.js',
    'mongoDB',
  ]
  return (
    <section className='techs'>
      <div className='techs__container'>
        <h2 className='techs__heading'>Технологии</h2>
        <p className='techs__title'>7 технологий</p>
        <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые
        применили в&nbsp;дипломном проекте.</p>
        <ul className='techs__list'>
          {techList.map((item, i) => (
            <li className='techs__item' key={i + 1}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Techs
