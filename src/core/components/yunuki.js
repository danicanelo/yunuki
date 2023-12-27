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
    <div className="yunuki mx-auto">
      <div className="eye left"></div>
      <div className="eye right"></div>
      <div className="mouth"></div>
      <div className="leg left"></div>
      <div className="leg right"></div>
    </div>
  );
}
