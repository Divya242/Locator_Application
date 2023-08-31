# Locator_Application
The data was originally encoded using base64. After decoding it, I saved it in a file called "MapData.js". To create the map functionality, I used a library called "react-leaflet". This allowed me to add markers representing different entities on the map.

When a user clicks on the map, their location is saved, and a marker is placed there. After this, I retrieve data using a unique ID, and based on the user's coordinates, I calculate the distances to secret locations. These distances are then sorted from closest to farthest, and the information about these entities is shown on the interface.

You can see the live demo here: https://divya242.github.io/Locator_application/
