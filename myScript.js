const readActualPositionOfGreenTram = () => {
    fetch('http://ckan2.multimediagdansk.pl/gpsPositions?v=2')
    .then( resp => resp.json())
    .then( resp => {
        resp['vehicles'].forEach(element => {
            if(element['vehicleCode'] === '1070') {
                console.log('Pozycja z godziny: ' + element['generated']);
                console.log('Linia nr: ' + element['routeShortName']);
                console.log(element['lat'] + " " + element['lon']); 

                document.getElementById('actualPositionOfGreenTram').innerHTML = `Pozycja z godziny: ${element['generated']} <br/> Linia nr: ${element['routeShortName']} <br/> ${element['lat']} ${element['lon']}`;
            }
        });
    })
    .catch( (e) => {
        console.log(e.message);
    })
}

window.onload = () => {
    readActualPositionOfGreenTram();
}