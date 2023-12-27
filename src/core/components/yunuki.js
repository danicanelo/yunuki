export function Yunuki({ yunuki }) {
  function isHungry() {
    return yunuki.hungry > 5;
  }

  function isDirty() {
    return yunuki.dirt > 5;
  }

  function isTired() {
    return yunuki.tiredness > 5;
  }

  function getAnimation(clases) {}

  return (
    <div className="yunuki tired mx-auto">
      <div className="eye sleeping-eye"></div>
      <div className="eye sleeping-eye"></div>
      <div className="mouth sleeping-mouth"></div>
      <div className="leg sleeping-leg left"></div>
      <div className="leg sleeping-leg right"></div>
    </div>
  );
}
