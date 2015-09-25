/**
 * Created by neee on 15.09.15.
 */
function switchTab() {
    var tabId = event.target.getAttribute("id")
    showTab(tabId);
}

function router(){

}
function showTab(tabId) {
    $('.tab').hide();
    $('#basketWindow').hide();
    $('#faqWindow').hide();
    $('#howWorkWindow').hide();
    $('#shopWindow').show();
    $('.' + tabId).show();
}

function goBasket() {
    $('#shopWindow').hide();
    $('#faqWindow').hide();
    $('#howWorkWindow').hide();
    $('#basketWindow').show();
    renderTable();
}

function goFAQ(){
    $('#shopWindow').hide();
    $('#howWorkWindow').hide();
    $('#basketWindow').hide();
    $('#faqWindow').show();
}

function goHowWork(){
    $('#shopWindow').hide();
    $('#faqWindow').hide();
    $('#basketWindow').hide();
    $('#howWorkWindow').show();
}

var shopBasket = {};
var singleBasket = {};

function renderTable() {
    var tbody = document.getElementById("tbodyBasket");
    tbody.innerHTML = "";
    var totalAma = "";
    if (!$.isEmptyObject(shopBasket)) {
        for (var item in shopBasket) {
            var row = tbody.insertRow(tbody.rows.length);
            var image = document.createElement("img");
            image.setAttribute("src", shopBasket[item].img);
            image.setAttribute("width", "100px");
            row.insertCell(0).appendChild(image);
            row.insertCell(1).appendChild(document.createTextNode(item));
            row.insertCell(2).appendChild(document.createTextNode(shopBasket[item].count));
            row.insertCell(3).appendChild(document.createTextNode(shopBasket[item].count * shopBasket[item].cost));

            //calculate ama
            totalAma += shopBasket[item].count * shopBasket[item].cost;
            totalAma = Math.round(totalAma);
        }
        if (totalAma) {
            var tfoot = tbody.nextElementSibling;
            tfoot.innerHTML = "";
            var row = tfoot.insertRow();
            row.insertCell(0).appendChild(document.createTextNode(""));
            row.insertCell(1).appendChild(document.createTextNode(""));
            row.insertCell(2).appendChild(document.createTextNode("Общая сумма"));
            row.insertCell(3).appendChild(document.createTextNode(totalAma));
        }
    } else {
        var row = tbody.insertRow(tbody.rows.length);
        row.insertCell(0).appendChild(document.createTextNode("-"));
        row.insertCell(1).appendChild(document.createTextNode("-"));
        row.insertCell(2).appendChild(document.createTextNode("-"));
        row.insertCell(3).appendChild(document.createTextNode("-"));
    }
}

function sendClaimToAnketa(basket, user){
    var xml = document.implementation.createDocument('', '', null);
    var inParams = xml.createElement("inParams");
    //companyInfo
    var companyInfo =  xml.createElement("companyInfo");
        var inn = xml.createElement("inn");
        inn.innerHTML = "7777777";
    companyInfo.appendChild(inn);
    //creditInfo
    var creditInfo = xml.createElement("creditInfo");
        var reference = xml.createElement("reference");
        var firstPayment = xml.createElement("firstPayment");
        var creditPeriod = xml.createElement("creditPeriod");
        var creditProductCode = xml.createElement("creditProductCode");
        var shopCode = xml.createElement("shopCode");
    creditInfo.appendChild(reference);
    creditInfo.appendChild(firstPayment);
    creditInfo.appendChild(creditPeriod);
    creditInfo.appendChild(creditProductCode);
    creditInfo.appendChild(shopCode);
    //clientInfo
    var clientInfo = xml.createElement("clientInfo");
        var lastname = xml.createElement("lastname");
            lastname.innerHTML = "";
        var firstname = xml.createElement("firstname");
            firstname.innerHTML = user.name;
        var middlename = xml.createElement("middlename");
        var passportNamber = xml.createElement("passportNamber");
        var passportSeries = xml.createElement("passportSeries");
        var email = xml.createElement("email");
            email.innerHTML = user.email;
        var mobphone = xml.createElement("mobphone");
            mobphone.innerHTML = user.phone;
    clientInfo.appendChild(lastname);
    clientInfo.appendChild(firstname);
    clientInfo.appendChild(middlename);
    clientInfo.appendChild(passportNamber);
    clientInfo.appendChild(passportSeries);
    clientInfo.appendChild(email);
    clientInfo.appendChild(mobphone);
    //specificationList
    var specificationList = xml.createElement("specificationList");
    if (!$.isEmptyObject(basket)){
        for(var item in basket){
            var row = xml.createElement("specificationListRow");
            var desc = xml.createElement("description");
            desc.innerHTML = item;
            var amount = xml.createElement("amount");
            amount.innerHTML = basket[item].count;
            var price = xml.createElement("price");
            price.innerHTML = basket[item].cost;
            row.appendChild(desc);
            row.appendChild(amount);
            row.appendChild(price);
            specificationList.appendChild(row);
        }
    }

    inParams.appendChild(companyInfo);
    inParams.appendChild(creditInfo);
    inParams.appendChild(clientInfo);
    inParams.appendChild(specificationList);
    xml.appendChild(inParams);
    //<inParams>
    //    <companyInfo><inn>7804402344</inn></companyInfo>
    //    <creditInfo><reference>A0000000001</reference><firstPayment>0</firstPayment><creditPeriod>15</creditPeriod>
    //      <creditProductCode>JLAO</creditProductCode><shopCode>ALCT133_IS</shopCode>
    //    </creditInfo>
    //    <clientInfo><lastname>Арсентьев</lastname><firstname>Антон</firstname><middlename>Андреевич</middlename>
    //      <passportNumber>1212</passportNumber><passportSeries>123456</passportSeries><email>lol4e@gmail.com</email>
    //      <mobphone>9857715151</mobphone>
    //    </clientInfo>
    //
    //<specificationList><specificationListRow><category>CRT_TV</category><code>#123</code><description>Samsung</description>
    //  <amount>1</amount><price>10000</price></specificationListRow>
    //<specificationListRow><category>MOBILE_PHONE</category><code>#1222</code><description>HTC</description>
    //  <amount>2</amount><price>10000</price>
    //</specificationListRow>
    //</specificationList>
    //</inParams>"
    var endpoint = "https://anketa.alfabank.ru/alfaform-pos/endpoint";
    //var endpoint = "/alfaform-pos/endpoint";
    post(endpoint, {inXml:xml.documentElement.outerHTML, testMode:true});
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            //form.setAttribute("target", "_blank");
            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

var basketCount = 0;
var user = {};

function sendClaim(){
    if(event.target.id == 'buttonClaimPage'){
        user.name = $("#registerFromPage  input[name=name]").val();
        user.phone = $("#registerFromPage  input[name=phone]").val();
        user.email = $("#registerFromPage  input[name=email]").val();
        if(!$.isEmptyObject(singleBasket)){
            sendClaimToAnketa(singleBasket, user);
        }
    } else if(event.target.id == 'buttonClaimExtended'){
        user.name = $("#register input[name=name]").val();
        user.family = $("#register input[name=family]").val();
        if(!$.isEmptyObject(singleBasket)){
            sendClaimToAnketa(singleBasket, user);
        }
    } else {
        user.name = $("#register  input[name=name]").val();
        user.phone = $("#register  input[name=phone]").val();
        user.email = $("#register  input[name=email]").val();
        if(!$.isEmptyObject(shopBasket)){
            sendClaimToAnketa(shopBasket, user);
        }
    }
}

$(document).ready(
    function () {
        //set event for add to basket
        var buttonsBuy = document.querySelectorAll('.addItem');
        for (var i = 0; i < buttonsBuy.length; i++) {
            buttonsBuy[i].addEventListener("click", function() {
                var itemCost = Number.parseFloat(event.target.parentElement.getElementsByClassName("itemCost")[0].innerText);
                var itemCaption = event.target.parentElement.getElementsByClassName("itemName")[0].innerText;
                var itemImage = event.target.parentElement.getElementsByClassName("itemImg")[0].getAttribute("src");
                if (shopBasket[itemCaption]) {
                    shopBasket[itemCaption].count++;
                } else {
                    shopBasket[itemCaption] = {};
                    shopBasket[itemCaption].count = 1;
                    shopBasket[itemCaption].cost = itemCost;
                    shopBasket[itemCaption].img = itemImage;
                }
                basketCount++;
                var basketCountElem = document.getElementById('basketCount');
                basketCountElem.innerHTML = basketCount;
                basketCountElem.hidden = false;
            });

            buttonsBuy[i].addEventListener("click", function(){
                var hint = event.target.parentElement.getElementsByClassName('putBasket')[0];
                $(hint).fadeIn(300);
                setTimeout(function(){
                    $(hint).fadeOut(1000);
                }, 1000);
            });
        }

        //set event for send claim form page
        var buttonsSendClaim = document.querySelectorAll('.sendClaimFromPage');
        for (var i = 0; i < buttonsSendClaim.length; i++){
            buttonsSendClaim[i].addEventListener('click', function(){
                var itemCost = Number.parseFloat(event.target.parentElement.getElementsByClassName("itemCost")[0].innerText);
                var itemCaption = event.target.parentElement.getElementsByClassName("itemName")[0].innerText;
                var itemImage = event.target.parentElement.getElementsByClassName("itemImg")[0].getAttribute("src");
                singleBasket[itemCaption] = {};
                singleBasket[itemCaption].count = 1;
                singleBasket[itemCaption].cost = itemCost;
                singleBasket[itemCaption].img = itemImage
            })
        }

        //setup calendar
        $('#startDate').datetimepicker({language: 'ru', pickTime: false});
        $('#endDate').datetimepicker({language: 'ru', pickTime: false});
        //При изменении даты в 8 datetimepicker, она устанавливается как минимальная для endDate
        $("#startDate").on("dp.change",function (e) {
            $("#endDate").data("DateTimePicker").setMinDate(e.date);
        });
        //При изменении даты в 9 datetimepicker, она устанавливается как максимальная для startDate
        $("#endDate").on("dp.change",function (e) {
            $("#startDate").data("DateTimePicker").setMaxDate(e.date);
        });

        //show tooltip
        //$(".addItem").click(function(){
        //    $(".hover-tooltip a").tooltip('show');  // show
        //});
        //default tab
        showTab("electronics");
    }
)