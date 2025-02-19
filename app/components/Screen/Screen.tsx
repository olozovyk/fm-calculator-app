import s from './Screen.module.scss';

interface IScreen {
  value: string | number;
}

export default function Screen({ value }: IScreen) {
  return (
    <div className={s.screen}>
      <p className={s.value}>{value}</p>
    </div>
  );
}
