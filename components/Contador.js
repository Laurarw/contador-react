const Contador = () => {
    const [contador, setContador] = React.useState(0); //se va a randerizar a medida que cambie el contador(estado)

    const aumentar = () => setContador(contador + 1);
    const disminuir = () => setContador(contador -1);

    //importante que luego de onClick, no vaya comillas
    //la palabra class, entra enconflicto con el class de objetos de javascript
    //por lo que react usa className
    return  (
    <div>
        <h1 className={contador <0 ? "menor" : "mayor"} >Contador: {contador}</h1>
        <hr />
        <button onClick={aumentar} > Aumentar </button>
        <button onClick={disminuir} > Disminuir </button>
    
    </div>
    ) 
}