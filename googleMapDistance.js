function googleMapDistance(origin, destinations, mod) {
    var url = "https://maps.googleapis.com/maps/api/distancematrix/json";

    var parameters = {
            origins: origin,
            destinations: destinations.join('|'),
            mod: mod || 'walking'
        }

    $.get(url, parameters)
        .done(function(data){
        alert(data)
        console.log(getDistnace(data))
    })

    function getDistnace(data) {
        var dis = []
        var elements = data.rows.elements;
        for (i in elements) {
            dis[i] = {
                distance: elements[i].distance.text,
                duration: elements[i].duration.text
            }
        }
        return dis;
    }
}
// googleMapDistance('taipei', ['tainan', 'tainan'])
