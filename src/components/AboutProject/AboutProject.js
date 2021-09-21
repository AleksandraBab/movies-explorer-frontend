import './AboutProject.css'

function AboutProject (props) {
  return (
    <section className='project' ref={props.fieldRef}>
      <div className='project__container'>
        <h2 className='project__heading'>О проекте</h2>
        <ul className='project__texts'>
          <li className='project__text'>
            <p className='project__title'>
            Дипломный проект включал 5 этапов
            </p>
            <p className='project__subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и финальные доработки.
            </p>
          </li>
          <li className='project__text'>
            <p className='project__title'>
            На выполнение диплома ушло 5 недель
            </p>
            <p className='project__subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className='project__scale'>
          <div className='project__step project__step_size_s'>
            <p className='project__week project__week_color_green'>
            1 неделя
            </p>
            <p className='project__web'>Back-end</p>
          </div>
          <div className='project__step'>
            <p className='project__week'>
            4 недели
            </p>
            <p className='project__web'>Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject
