// En la carpeta components establecemos componentes individuales que faciliten nuestro trabajo con el diseño de las diferentes páginas, de forma que puedan ser usados en cualquier sitio. Para ello hacemos uso de una de las principales características de React, el uso de propiedades o 'props', que nos permiten construir componentes reutilizables a los que introduciremos los valores que deben mostrar mediante estas variables llamadas props.En este componente creamos una tarjeta informativa.

// Establecemos una función con el nombre que le queramos dar a nuestro componente y los parámetros que deben poder ser modificados (esto es lo que llamamos props)
export function Card({ title, content }) {
  // Retornamos todo el contenido html (JSX en realidad) que será la estructura del componente en sí (lo que se mostrará en pantalla)
  return (
    <div className="card mt-6">
      <header className="card-header">
        {/* En las partes en las que necesitemos que, con cada llamada al componente, los valores cambien, introducimos las props (anteriormente, en la implementación de este componente, habríamos indicado los valores de estas props, hay un ejemplo en las implementaciones de Input en el fichero login.ts) */}
        <p className="card-header-title">{title}</p>
      </header>
      <div className="card-content">
        <div className="content">{content}</div>
      </div>
    </div>
  );
}
