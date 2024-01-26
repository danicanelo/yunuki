import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoYunuki from "../../assets/yunuki-logo.png";
import AuthService from "../../auth/services/auth.service.ts";
import { Input } from "../../core/components/input";
import YunukiService from "../../yunuki/services/yunuki.service.ts";

// Función principal que renderizará el componente Login
export function Login() {
  // Creamos una constante values que almacenará el estado inicial de nuestro componente (un objeto con las propiedades username y password inicializadas en vacío). Además, declaramos setValues, función que utilizaremos para actualizar el estado de values cuando sea necesario. Esto es posible gracias al uso de useState, hook de React que, obteniendo el valor inicial, devuelve el valor inicial más la función que lo actualiza. Todo esto nos sirve para, en resumen, obtener los valores que el usuario introduzca en el formulario.
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  // useNavigate nos permite navegar por nuestras diferentes rutas, almacenamos la función en una constante para hacer un uso más cómodo de ella
  const navigate = useNavigate();

  // Esta función se invocará en el momento en el que el usuario haga clic en el botón dispuesto como Submit. Como argumento recibe un objeto de evento. La declaramos asíncrona porque necesitamos hacer operaciones asíncronas dentro de ella.
  async function handleSubmit(evt) {
    // Con preventDefault indicamos al programa que no realice las acciones predeterminadas que normalmente ejecutaría (en este caso, lo que tratamos de prevenir es que el formulario se envíe y la página se recargue, porque antes de eso queremos realizar una serie de acciones)
    evt.preventDefault();
    try {
      // result almacenará un booleano dependiendo de si el método login de AuthService ha devuelto true o false. Con esto averiguamos si el usuario está registrado y si por lo tanto tiene permiso para entrar o no. Indicamos que espere a obtener los resultados antes de proseguir.
      const result = await AuthService.login(values.username, values.password);
      if (result) {
        // Si result es true, tratamos de acceder a su yunuki vivo asociado mediante su servicio correspondiente. Si lo obtiene navegamos hacia la página de interfaz de cuidado del yunuki. Si no lo tiene navegamos hacia la pantalla de creación del yunuki. Indicamos que espere a obtener los resultados antes de proseguir.
        try {
          await YunukiService.getYunuki(values.username);
          navigate("/yunuki");
        } catch (e) {
          navigate("/create-yunuki");
        }
        // Si result es false se captura el error y se alerta de que el login es erróneo.
      } else {
        alert("Login erróneo");
      }
      // Si alguno de los pasos anteriores da un error lo capturamos y alertamos de ello.
    } catch (e) {
      alert("Hay algún problema con el servidor", e);
    }
  }

  // Esta función se encarga de actualizar los valores de los inputs en cuanto reciban cualquier modificación (en cuanto el usuario teclee cualquier cosa). Recibe como parámetro el objeto de evento y está directamente relacionada con el useState de arriba en el que creamos values y setValues
  function handleChange(evt) {
    //Extrae el campo target del objeto de evento, en nuestro caso el input.
    const { target } = evt;
    //Extrae los campos name y value del objeto target, de cada input en nuestro caso. El name corresponderá al nombre del input (username y password) y el value a los valores que se esteń registrando en ellos (lo que el usuario esté tecleando en cada uno de ellos)
    const { name, value } = target;
    //Crea una constante que, obteniendo todos los values actuales (inicialmente vacíos) los sustituye por los recibidos (username y password) y los almacena
    const newValues = {
      ...values,
      [name]: value,
    };
    // Finalmente hace uso de setValues para setear los nuevos valores
    setValues(newValues);
  }

  // Todo componente en React es en esencia una función que retorna contenido "html" (JSX en realidad), que es lo que se encarga de "dibujar" la página en nuestro navegador. Debe contener un único elemento que se encargará de contener a los demás, en nuestro caso es un div con la clase de Bulma CSS adecuada para darle comportamiento y aspecto de contenedor principal.
  return (
    <div className="container">
      {/* Insertamos el logo principal de nuestra aplicación */}
      <img className="m-auto is-block p-6" src={logoYunuki} alt="Yunuki logo" />
      {/* Establecemos un contenedor que contenga el formulario */}
      <div className="box mt-6">
        {/* Indicamos que, al hacer clic el usuario en el botón de Entrar, se invoque a la función handleSubmit, que se encargará de validar sus credenciales y permitir o no el paso */}
        <form onSubmit={handleSubmit}>
          {/* Para los inputs hacemos uso de un componente aparte creado por nosotros al que le pasamos los valores de las diferentes propiedades (en los componentes separados se explica el funcionamiento de estas propiedades, concretamente en el fichero card.js y, este caso particular, en el fichero input.js) requeridas según nuestras necesidades */}
          <Input
            label="Nombre de usuario"
            id="username"
            type="text"
            placeholder="Introduce tu nombre de usuario"
            value={values.username}
            onChange={handleChange}
          />
          <Input
            label="Contraseña"
            id="password"
            type="password"
            placeholder="Introduce tu contraseña"
            value={values.password}
            onChange={handleChange}
          />
          {/* Establecemos un botón de tipo submit para activar el envío del formulario */}
          <button type="submit" className="button is-success">
            Entrar
          </button>
        </form>
      </div>
      {/* Establecemos un pequeño contenedor que sirva para mostrar el texto y el botón para ir a la pantalla de registro*/}
      <div className="mt-6 is-flex is-justify-content-center is-align-items-center">
        <p className="mr-4">¿Aún no tienes cuenta?</p>
        {/* Link es una funcionalidad de React Router que nos permite manejar enlaces a rutas. Indicamos la ruta a la que se debe acceder cuando se realice la acción incluida, en nuestro caso hacer clic en el botón Registrarse */}
        <Link to="/users/register">
          <button type="button" className="button is-info">
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
}
