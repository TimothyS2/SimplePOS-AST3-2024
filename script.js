// Initialising the global variables for the cart items, order total price, daily total and number of orders.
let cartItems = "";
let orderTotal = 0;
let dailyTotal = 0;
let dailyNumOrders = 0;


// This function adds the inputted item's name to the orderCart HTML element, and adds the inputted price to the orderTotal HTML element
function addToCart(itemName, price) {
    let addedItem = itemName;
    orderTotal = orderTotal + price;
    cartItems = cartItems.concat(addedItem) + ", ";
    document.getElementById("orderCart").innerHTML = cartItems;
    document.getElementById("orderTotal").innerHTML = "$" + orderTotal;
}


// This function clears the cart and resets the orderTotal to $0
function cancelOrder() {
    cartItems = "";
    orderTotal = 0;
    document.getElementById("orderCart").innerHTML = "";
    document.getElementById("orderTotal").innerHTML = "$0";
}

//----------------------------------------------------------------------------------


/*  This function only runs if the order contains at least 1 item.
    This function adds the orderTotal onto the dailyTotal and increments the dailyNumOrders variable.
    It then stores dailyTotal and dailyNumOrders into localStorage variables so they can be accessed from the management page.
    The function then updates the orderTotal HTML element, clears cartItems and resets orderTotal for a new order. */
function confirmOrder() {
    if (cartItems !== "") {   // This condition checks if cartItems is empty
        dailyTotal = dailyTotal + orderTotal;
        dailyNumOrders = dailyNumOrders + 1;
        localStorage.setItem('dailyTotal', dailyTotal);
        localStorage.setItem('dailyNumOrders', dailyNumOrders);

        // In future versions, this function may be altered to be compatible with printer hardware in order to print out each order.

        // Displaying dailyTotal, then resetting cartItems and orderTotal
        document.getElementById("dailyTotal").innerHTML = "$" + localStorage.getItem('dailyTotal');
        cartItems = "";
        orderTotal = 0;
        document.getElementById("orderCart").innerHTML = "";
        document.getElementById("orderTotal").innerHTML = "$0";
    }
    else {
    }

}


/* This function retrieves dailyTotal and dailyNumOrders from localStorage and displays the date, dailyTotal and number of orders into their respective HTML elements
 Then, it creates a .txt file containing the date, dailyTotal and dailyNumOrders data.
 Then, it resets the dailyTotal and dailyNumOrders variables. */
function createDailyReport() {
    // Retrieving dailyTotal and dailyNumOrders from localStorage. Also retrieves the current date
    let dailyTotal = localStorage.getItem('dailyTotal');
    let dailyNumOrders = localStorage.getItem('dailyNumOrders');
    let date = new Date();

    // Retrieving the date and displaying the date, dailyTotal and dailyNumOrders.    date.getMonth is incremented by 1, as it is indexed with January = 0
    let printDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    document.getElementById("reportDate").innerHTML = printDate;
    document.getElementById("reportDailyTotal").innerHTML = "$" + dailyTotal;
    document.getElementById("reportNumOfOrders").innerHTML = dailyNumOrders;

    //Creating a report .txt file
    printThing = "Report Date: " + printDate + " | " + "Total Sales: $" + dailyTotal + " | " + "Number of Orders: " + dailyNumOrders;
    let link = document.createElement('a');
    let file = new Blob([printThing], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = 'Daily Report ' + printDate + '.txt';
    link.click();
    URL.revokeObjectURL(url);

    // Resetting dailyTotal and dailyNumOrders
    dailyTotal = 0;
    dailyNumOrders = 0;
}


/*  This function displays the data of an inputted report file
    It then displays the data into their repsective fields.*/
function loadReport(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let fileContents = e.target.result.split(" | ");
            let reportDate = fileContents[0].slice(13);
            let reportDailyTotal = fileContents[1].slice(23);
            let reportNumOfOrders = fileContents[2].slice(18);
            document.getElementById("reportDate").innerHTML = reportDate;
            document.getElementById("reportDailyTotal").innerHTML = reportDailyTotal;
            document.getElementById("reportNumOfOrders").innerHTML = reportNumOfOrders;
        };
        reader.readAsText(file);
    }
}
