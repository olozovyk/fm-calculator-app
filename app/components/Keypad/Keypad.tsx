import clsx from 'clsx';
import s from './Keypad.module.scss';
import { keys } from '@/app/constants';
import { MouseEvent } from 'react';

interface IKeypad {
  onKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const getId = (key: string): string => {
  if (key === 'DEL') return 'keyDel';
  if (key === '+') return 'keyAdd';
  if (key === '-') return 'keySub';
  if (key === '*') return 'keyMult';
  if (key === '/') return 'keyDiv';
  if (key === 'RESET') return 'keyReset';
  if (key === '=') return 'keyEqual';
  return `key${key}`;
};

export default function Keypad({ onKeyClick }: IKeypad) {
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
          id={getId(key)}
          onClick={(e) => {
            if (!e.currentTarget.textContent) return;
            onKeyClick(e);
          }}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
