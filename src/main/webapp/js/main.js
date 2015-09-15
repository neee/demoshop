/**
 * Created by neee on 15.09.15.
 */
function switchTab() {
    var tabId = event.target.getAttribute("id")
    showTab(tabId);
}

function showTab(tabId) {
    $('.tab').hide();
    $('#basketWindow').hide();
    $('#shopWindow').show();
    $('.' + tabId).show();
}

function goBasket(){
    $('#shopWindow').hide();
    $('#basketWindow').show();
    renderTable();
}

var shopBasket = {};

function renderTable(){
    if(shopBasket){
        var tbody = document.getElementById("tbodyBasket");
        tbody.innerHTML = "";
        var totalAma = ""
        for(var item in shopBasket){
            var row = tbody.insertRow(tbody.rows.length);
            row.insertCell(0).appendChild(document.createTextNode(item));
            row.insertCell(1).appendChild(document.createTextNode(shopBasket[item].count));
            row.insertCell(2).appendChild(document.createTextNode(shopBasket[item].count*shopBasket[item].cost));
            totalAma += shopBasket[item].count*shopBasket[item].cost;
        }
        if (totalAma){
           var tfoot = tbody.nextElementSibling;
            tfoot.innerHTML = "";
            var row = tfoot.insertRow();
            row.insertCell(0).appendChild(document.createTextNode("Общая сумма"));
            row.insertCell(1).appendChild(document.createTextNode(""));
            row.insertCell(2).appendChild(document.createTextNode(totalAma));
        }
    }
}

$(document).ready(
    function () {
        var buttonsBuy = document.querySelectorAll('.addItem');
        for (var i = 0; i < buttonsBuy.length; i++) {
            buttonsBuy[i].addEventListener("click", function () {
                var itemCost = Number.parseFloat(event.target.parentElement.getElementsByClassName("itemCost")[0].innerText);
                var itemCaption = event.target.parentElement.getElementsByClassName("itemName")[0].innerText;
                if(shopBasket[itemCaption]){
                    shopBasket[itemCaption].count++;
                } else {
                    shopBasket[itemCaption] = {};
                    shopBasket[itemCaption].count = 1;
                    shopBasket[itemCaption].cost = itemCost;
                }
            });
        }
    }
)