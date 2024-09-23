import s from './App.module.scss';
import Header from '../Header/Header';
import Screen from '../Screen/Screen';
import Keypad from '../Keypad/Keypad';

function App() {
  return (
    <div className={s.container}>
      <Header />
      <Screen />
      <Keypad />
    </div>
  );
}

export default App;
