import clsx from 'clsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import s from './App.module.scss';

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

function App() {
  return (
    <div>
      <div className={s.container}>
        <section className={s.top}>
          <h1 className={s.title}>calc</h1>
          <ThemeToggle />
        </section>

        <p className={s.screen}>399,981</p>

        <div className="keyboard">
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
      </div>
    </div>
  );
}

export default App;
