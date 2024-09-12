import ThemeToggle from '../ThemeToggle/ThemeToggle';
import s from './App.module.scss';

const keys: string[] = [
  '7',
  '8',
  '9',
  'del',
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
  'reset',
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

        <p>399,981</p>

        <div className="keyboard">
          {keys.map((key, i) => (
            <button type="button" key={i}>
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
