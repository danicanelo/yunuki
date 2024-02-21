// Este componente crea los yunukis. Retorna un div contenedor de cinco divs más que conforman la estructura del yunuki según se le apliquen unas clases u otras.

export function Yunuki({ yunuki }) {
  // Establecemos tres funciones que evalúen si algún parámetro del yunuki ha llegado a la mitad de su capacidad. Nos servirán para aplicar unas clases u otras según su estado.
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

  // Establecemos diferentes funciones que sirvan para modificar las clases correspondientes a cada parte del yunuki. Detallamos la primera a modo de ejemplo.
  const getGlobalClass = () => {
    // Establecemos una variable que almacene las clases principales que estarán siempre
    let globalClass = "yunuki mx-auto";
    // Dependiendo del estado del yunuki, a las clases principales se le añaden unas u otras
    if (isTired()) {
      globalClass = globalClass + " tired";
    }
    if (isDirty()) {
      globalClass = globalClass + " dirt";
    }
    // Se añade la clase correspondiente a la raza del yunuki según el nombre de ésta
    if (yunuki.breed.name === "Yiniki") {
      globalClass = globalClass + " yiniki";
    }
    if (yunuki.breed.name === "Yonoko") {
      globalClass = globalClass + " yonoko";
    }

    // Se añade la clase correspondiente a la edad del yunuki según sus funciones correspondientes nos devuelvan true o false
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

  // En el JSX devuelto, en vez de las clases literales utilizamos las funciones correspondientes, de modo que el aspecto del yunuki esté siempre actualizado según su estado
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
