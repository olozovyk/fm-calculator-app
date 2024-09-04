export default function Toggle() {
  return (
    <form aria-label="Theme Switcher">
      <label>
        1
        <input type="radio" name="theme" value="light" />
      </label>
      <br />
      <label>
        2
        <input type="radio" name="theme" value="dark" />
      </label>
      <br />
      <label>
        3
        <input type="radio" name="theme" value="colorful" />
      </label>
    </form>
  );
}
