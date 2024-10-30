import s from './Screen.module.scss';

interface IScreen {
  value: string | number;
}

export default function Screen({ value }: IScreen) {
  return <p className={s.screen}>{value}</p>;
}
