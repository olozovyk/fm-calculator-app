import clsx from 'clsx';
import s from './Keypad.module.scss';

const keys: string[] = [
  '7',
  '8',
  '9',
  'DEL',
  '4',
  '5',
  '6',
  '+',
  '1',
  '2',
  '3',
  '-',
  '.',
  '0',
  '/',
  'x',
  'RESET',
  '=',
];

export default function Keypad() {
  return (
    <div className={s.keypad}>
      {keys.map((key, i) => (
        <button
          type="button"
          key={i}
          className={clsx([
            s.key,
            key === 'DEL' && s.del,
            key === 'RESET' && s.reset,
            key === '=' && s.equal,
          ])}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
