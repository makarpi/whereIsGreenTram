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
                
                const map = L.map('map').setView([element['lat'], element['lon']], 13);

                const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                const popup = L.popup()
                .setLatLng([element['lat'], element['lon']])
                .setContent('Jestem tutaj :)')
                .openOn(map);
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
