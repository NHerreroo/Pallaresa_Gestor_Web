

const Login = () => { 
    return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Inicio de Sesión</h2>
      
        <div>
          <label>Email: <br/></label>
          <input id='campos'
            type="email"
            required
          />
        </div>
        <div >
          <label>Contraseña: <br/> </label>
          <input id='campos'
            type="password"
            required
          />
        </div>
        <p>¿Has olvidado la contraseña?</p>
        <button class='init' type="submit">
            Iniciar
        </button>

    
    </div>
  );
};

export default Login;