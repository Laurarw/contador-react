if( "serviceWorker" in navigator ){ //tambien se puede poner navigator.serviceWorker
    //console.log('sí existe')
    navigator.serviceWorker.register("./sw.js");
}