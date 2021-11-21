function getList() {
    $.get("/consumption/get", function (data) {
        for (var i = 0; i < data.result.length; i++) {
            newList(data[i]);
        }
    });
}

function newList(data) {
    //var status = (data.status) ? "checked" : "";
    var dateclass = "date";
    var nameclass = "name";
    var priceclass = "price";

    var content =
        `<div class="content" id="${data._id}">
            <div class="${dateclass}">
                <text id="date${data._id}">${data.date}</text>
            </div>
            <div nameclass="${nameclass}">
                <text id="name${data._id}">${data.name}</text>
            </div>
            <div class="${priceclass}">
                <text id="price${data._id}">${data.price}</text>
            </div>
        </div>`;
    //$('body').append(content);
    document.body.append(content);
}