import s from './Toggle.module.scss';

export default function Toggle() {
  return (
    <div>
      <div className={s.labels}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className={s.toggle}>
        <label className={s.labelEl}>
          <input className={s.input} type="radio" name="theme" />
          <div className={s.option}></div>
        </label>
        <label className={s.labelEl}>
          <input className={s.input} type="radio" name="theme" defaultChecked />
          <div className={s.option}></div>
        </label>
        <label className={s.labelEl}>
          <input className={s.input} type="radio" name="theme" />
          <div className={s.option}></div>
        </label>
      </div>
    </div>
  );
}
