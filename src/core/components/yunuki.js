export function Yunuki({ yunuki }) {
  const isHungry = () => yunuki.hungry > 5;

  const isDirty = () => yunuki.dirt > 5;

  const isTired = () => yunuki.tiredness > 5;

  return (
    <div className="yunuki mx-auto">
      <div className="eye"></div>
      <div className="eye"></div>
      <div className="mouth"></div>
      <div className="leg left"></div>
      <div className="leg right"></div>
    </div>
  );
}
