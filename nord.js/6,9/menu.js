function fetchMenu() {
    var selectedDay = document.getElementById("day").value;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            displayMenu(xhr.responseText, selectedDay);
        }
    };

    xhr.open("GET", "ruokalista.json", true);
    xhr.send();
}

function displayMenu(response, selectedDay) {
    var menuResult = document.getElementById("menuResult");
    menuResult.innerHTML = "";

    var menu = JSON.parse(response);

    console.log("Menu data:", menu);

    var selectedMenuItem = menu.find(item => item.paiva.toLowerCase() === selectedDay.toLowerCase());

    console.log("Selected menu item:", selectedMenuItem);

    if (selectedMenuItem) {
        var day = selectedMenuItem.paiva;
        var mainDish = selectedMenuItem.paaruoka;
        var dessert = selectedMenuItem.jalkiruoka;
        var specialties = selectedMenuItem.erikois;

        console.log("Displaying menu for:", day);

        var resultText = day + " (" + specialties + ")<br>";
        resultText += "Main Dish: " + mainDish + "<br>";
        resultText += "Dessert: " + dessert + "<br>";

        menuResult.innerHTML = resultText;
    } else {
        console.log("Menu not found for the selected day:", selectedDay);
        menuResult.innerHTML = "Menu not found for the selected day.";
    }
}
