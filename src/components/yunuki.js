export function Yunuki({ yunuki }) {
  const isHungry = () => yunuki.hunger >= 2;

  const isDirty = () => yunuki.dirt >= 4;

  const isTired = () => yunuki.tiredness >= 5;

  function yunukiSmall(yunuki, date) {
    const diff = date.getTime() - new Date(yunuki.birth).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days < 1) {
      return true;
    } else {
      return false;
    }
  }

  function yunukiMid(yunuki, date) {
    const diff = date.getTime() - new Date(yunuki.birth).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days >= 1 && days < 2) {
      return true;
    } else {
      return false;
    }
  }

  const getGlobalClass = () => {
    let globalClass = "yunuki mx-auto";
    if (isTired()) {
      globalClass = globalClass + " tired";
    }
    if (isDirty()) {
      globalClass = globalClass + " dirt";
    }
    if (yunuki.breed.name === "Yiniki") {
      globalClass = globalClass + " yiniki";
    }
    if (yunuki.breed.name === "Yonoko") {
      globalClass = globalClass + " yonoko";
    }

    if (yunukiSmall(yunuki, new Date())) {
      globalClass = globalClass + " small-yunuki";
    }
    if (yunukiMid(yunuki, new Date())) {
      globalClass = globalClass + " mid-yunuki";
    }

    return globalClass;
  };

  const getEyeClass = () => {
    let eyeClass = "eye";
    if (isTired()) {
      eyeClass = eyeClass + " tired-eye";
    }
    return eyeClass;
  };

  const getMouthClass = () => {
    let mouthClass = "mouth";
    if (isTired()) {
      mouthClass = mouthClass + " tired-mouth";
    }
    if (isHungry()) {
      mouthClass = mouthClass + " hungry-mouth";
    }
    return mouthClass;
  };

  const getLegClass = () => {
    let legClass = "leg";
    if (isTired()) {
      legClass = legClass + " tired-leg";
    }
    return legClass;
  };

  return (
    <div className={getGlobalClass()}>
      <div className={getEyeClass()}></div>
      <div className={getEyeClass()}></div>
      <div className={getMouthClass()}></div>
      <div className={getLegClass() + " left"}></div>
      <div className={getLegClass() + " right"}></div>
    </div>
  );
}
