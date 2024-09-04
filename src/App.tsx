import Toggle from './components/toggle/toggle';

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
      <div>
        <h1>calc</h1>
        <div>
          <p>theme</p>
          <Toggle />
        </div>
      </div>

      <p>399,981</p>

      <div className="keyboard">
        {keys.map((key, i) => (
          <button type="button" key={i}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
