var jsonResponse = "";
var select=[[]];
var editArg=0 ;
var elemRow;

$(document).ready(function(){
    changeAction();
});

// TOGGLE BUTTON FOR NEW AND UPDATE 
// Will modify editArg to 1 when toggled to UPDATE
// Will modify editArg to 0 when toggled to New


//Declaring global VAR for buttons when HTML page loaded
document.addEventListener("DOMContentLoaded", function(){editButton = document.getElementById("editButton");});
document.addEventListener("DOMContentLoaded", function(){deleteButton = document.getElementById("deleteButton");});

// editButton = document.getElementById("editButton");

function testing(){

    var callArg = "Mail";
    xmlhttp = new XMLHttpRequest;
    var submission = "callArg="+callArg;
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState== 4 && xmlhttp.status==200){
            var alertMsg = document.getElementById("alertMsg");
            alertMsg.innerHTML = xmlhttp.responseText;
        }
    }

    xmlhttp.open("POST","ServerInteraction.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(submission);
}


// Reset inputBoxes of form
function Reset(){
    var formData = {
        0:document.getElementById("wTitleBox"),
        1:document.getElementById("type1Box"),
        2:document.getElementById("type2Box"),
        3:document.getElementById("descriptionBox"),
        4:document.getElementById("locationBox"),
        5:document.getElementById("statusBox"),
        6:document.getElementById("companyBox"),     
        7:document.getElementById("sapBox"),
        8:document.getElementById("requestbyBox"),
        9:document.getElementById("requestdateBox"),
        10:document.getElementById("closedbyBox"),
        11:document.getElementById("completiondateBox")
    };

    for(y=0;y<12;y++){
        formData[y].value="";
    }

}

// Trim user input of white spaces
function myTrim(subj) {
    return subj.replace(/^\s+|\s+$/gm,'');
}

// Form validation for checking empty field
function Validation(){
var formData = {
    wTitle:document.getElementById("wTitleBox").value,
    type1:document.getElementById("type1Box").value,
    type2:document.getElementById("type2Box").value,
    desc:document.getElementById("descriptionBox").value,
    loca:document.getElementById("locationBox").value,
    comp:document.getElementById("companyBox").value,
    stats:document.getElementById("statusBox").value,
    sapB:document.getElementById("sapBox").value,
    reqB:document.getElementById("requestbyBox").value,
    reqD:document.getElementById("requestdateBox").value,
    clos:document.getElementById("closedbyBox").value,
    comple:document.getElementById("completiondateBox").value
};

// Alert determination variable
var alertId={
    wTitle:"Work title is empty <br>",
    type1:"Type 1 is empty <br>",
    type2:"Type 2 is empty <br>",
    desc:" Description is empty <br>",
    loca:"Location is empty <br>",
    comp:"Company is empty <br>",
    stats:"Status is empty <br>",
    sapB:"SAP number is empty <br>",
    reqB:"Request by is empty <br>",
    reqD:"Request date is empty <br>",
    clos:"Closed by is empty <br>",
    comple:"Completion date is empty <br>"
};

// Trimming UserInput // LEARN HOW TO LOOP

formData.wTitle=myTrim(formData.wTitle);
formData.type1=myTrim(formData.type1);
formData.type2=myTrim(formData.type2);
formData.desc=myTrim(formData.desc);
formData.loca=myTrim(formData.loca);
formData.comp=myTrim(formData.comp);
formData.stats=myTrim(formData.stats);
formData.sapB=myTrim(formData.sapB);
formData.reqB=myTrim(formData.reqB);
formData.reqD=myTrim(formData.reqD);
formData.clos=myTrim(formData.clos);
formData.comple=myTrim(formData.comple);

formData.type2=encodeURIComponent(formData.type2);

var alertMsg="";

// ErrorMessage Creation // LEARN HOW TO LOOP

if (formData.wTitle==""){
    alertMsg+=alertId.wTitle;
}
if (formData.type1==""){
    alertMsg+=alertId.type1;
}
if (formData.type2==""){
    alertMsg+=alertId.type2;
}
if (formData.desc==""){
    alertMsg+=alertId.desc;
}
if (formData.loca==""){
    alertMsg+=alertId.loca;
}
if (formData.comp==""){
    alertMsg+=alertId.comp;
}
if (formData.stats==""){
    alertMsg+=alertId.stats;
}
if (formData.sapB==""){
    alertMsg+=alertId.sapB;
}
if (formData.reqB==""){
    alertMsg+=alertId.reqB;
}
if (formData.reqD==""){
    alertMsg+=alertId.reqD;
}
if (formData.clos==""){
    alertMsg+=alertId.clos;
}
if (formData.comple==""){
    alertMsg+=alertId.comple;
}

var dateComparing = new Array();

dateComparing.push(Date.parse(formData.reqD));
dateComparing.push(Date.parse(formData.comple));

if (dateComparing[1] < dateComparing[0]){
    alertMsg += "End date is smaller than start date";
}

if (alertMsg!=""){
    document.getElementById("alertMsg").innerHTML=alertMsg;
}else if(alertMsg=="" && editArg=="0"){
    Save(formData);
}else if(alertMsg=="" && editArg==1){
    Update(formData);
    // editArg="";
}


}

//Save new entry from user input, receive validated formInput from validation()
function Save(objData){
    var callArg = "save";
    var submission = 
    "wTitle="+objData.wTitle+"&type1=" 
    +objData.type1+"&type2="+objData.type2
    +"&desc="+objData.desc+"&loca="+objData.loca
    +"&comp="+objData.comp+"&stats="+objData.stats
    +"&sapB="+objData.sapB+"&reqB="+objData.reqB
    +"&reqD="+objData.reqD+"&clos="+objData.clos
    +"&comple="+objData.comple+"&callArg="+callArg;
    
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("alertMsg").innerHTML = xmlhttp.responseText;
            }
        }
    xmlhttp.open("POST", "serverInteraction.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(submission);
}

//Retrieve *all record from SQL DB
function retrieve(){
    var formData = {
        wTitle:document.getElementById("wTitleBox").value,
        type1:document.getElementById("type1Box").value,
        type2:document.getElementById("type2Box").value,
        desc:document.getElementById("descriptionBox").value,
        loca:document.getElementById("locationBox").value,
        comp:document.getElementById("companyBox").value,
        stats:document.getElementById("statusBox").value,
        sapB:document.getElementById("sapBox").value,
        reqB:document.getElementById("requestbyBox").value,
        reqD:document.getElementById("requestdateBox").value,
        clos:document.getElementById("closedbyBox").value,
        comple:document.getElementById("completiondateBox").value
    };

    var callArg = "retrieve";
    var submission = 
    "wTitle="+formData.wTitle+"&type1=" 
    +formData.type1+"&type2="+formData.type2
    +"&desc="+formData.desc+"&loca="+formData.loca
    +"&comp="+formData.comp+"&stats="+formData.stats
    +"&sapB="+formData.sapB+"&reqB="+formData.reqB
    +"&reqD="+formData.reqD+"&clos="+formData.clos
    +"&comple="+formData.comple+"&callArg="+callArg;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {            
            jsonResponse = JSON.parse(xmlhttp.responseText);
            var tableOutput=document.getElementById("outputTable");
            var rowNode=[];
            var colNode= [];
            var textnode=[];
            for(x=0;x<jsonResponse.length;x++){
                rowNode[x] = document.createElement("tr");
                rowNode[x].setAttribute("id",jsonResponse[x][0]); // Row column    
                rowNode[x].addEventListener("click",function(){passOver(this)});
// Y = 1 BECAUSE WE DONT WANT TO SELECT ROW COLUMN IN TABLE
                for(y=1;y<13;y++){
                    textnode[y] = document.createTextNode(jsonResponse[x][y]);
                    colNode[y] = document.createElement("td");
                    colNode[y].appendChild(textnode[y]);
                    // colNode[y].setAttribute("id","x"+x+"y"+y);
                    rowNode[x].appendChild(colNode[y]);
                    
                }
                tableOutput.appendChild(rowNode[x]);
             

            }
            // console.log(document.getElementById("4").childNodes[3].innerText);
        }
        }
    xmlhttp.open("POST", "serverInteraction.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(submission);
}
//Update specified record by passOver()
function Update(){
    // GET form value

    var formData = {
        0:document.getElementById("wTitleBox").value,
        1:document.getElementById("type1Box").value,
        2:document.getElementById("type2Box").value,
        3:document.getElementById("descriptionBox").value,
        4:document.getElementById("locationBox").value,
        5:document.getElementById("statusBox").value,
        6:document.getElementById("companyBox").value,     
        7:document.getElementById("sapBox").value,
        8:document.getElementById("requestbyBox").value,
        9:document.getElementById("requestdateBox").value,
        10:document.getElementById("closedbyBox").value,
        11:document.getElementById("completiondateBox").value
    };
    //Call argument for PHP script
    var callArg = "Update";
    var xmlhttp = new XMLHttpRequest;

    //Data to be submit to PHP server

    var submission = 
    "wTitle="+formData[0]+"&type1=" 
    +formData[1]+"&type2="+formData[2]
    +"&desc="+formData[3]+"&loca="+formData[4]
    +"&stats="+formData[5]+"&comp="+formData[6]
    +"&sapB="+formData[7]+"&reqB="+formData[8]
    +"&reqD="+formData[9]+"&clos="+formData[10]
    +"&comple="+formData[11]+"&callArg="+callArg+"&dataID="+elemRow.id;

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
        //    console.log(xmlhttp.responseText);

            // Status message from server
            document.getElementById("alertMsg").innerHTML=xmlhttp.responseText;

           var rowAjaxUpdate=document.getElementById(elemRow.id);

           // Update Current displayed table to match with updated data
           for(y=0;y<12;y++){
                rowAjaxUpdate.childNodes[y].innerText=formData[y];
           }
        }
    }

    xmlhttp.open("POST", "serverInteraction.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(submission);


}

// Populate input form
function populateForm(elem){
    
    // var table=document.getElementById("outputTable");
    // var alertMsg = document.getElementById("alertMsg");
    // var msg ="";
 

    var dataBoxes=[document.getElementById("wTitleBox"),
    document.getElementById("type1Box"),
    document.getElementById("type2Box"),
    document.getElementById("descriptionBox"),
    document.getElementById("locationBox"),
    document.getElementById("statusBox"),
    document.getElementById("companyBox"),
    document.getElementById("sapBox"),
    document.getElementById("requestbyBox"),
    document.getElementById("requestdateBox"),
    document.getElementById("closedbyBox"),
    document.getElementById("completiondateBox")]

    //Fill input boxes with selected row data
    for(y=0;y<12;y++){
        dataBoxes[y].value=elem.childNodes[y].innerText;
    // FIX THIS ONCE WE HAVE A PROPER WORKING SEARCH
    }    

} 

//Delete specified record by passOver()
function deleteRecord(elem){
    var table= document.getElementById("outputTable");
    var rowRemoved=document.getElementById(elem.id);
    table.removeChild(rowRemoved);

    var xmlhttp = new XMLHttpRequest;
    var callArg = "deleteRecord";
    var submission="dataID="+elem.id+"&callArg="+callArg;

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById("alertMsg").innerHTML=xmlhttp.responseText;
        }

    }

    xmlhttp.open("POST", "serverInteraction.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(submission);

}

function changeAction(){

    // Checkbox variable
    var checkBox = $("#checkBox");

    
    // Check if checkbox is clicked
    if(checkBox.prop("checked")==true){
        editArg = 1;
        $("#editButton").removeAttr("disabled");
        $("#searchButton").removeAttr("disabled");
        $("#deleteButton").removeAttr("disabled");
        console.log("checkbox is checked ");
    }else{
        $("#editButton").attr("disabled","disabled");
        $("#searchButton").attr("disabled","disabled");
        $("#deleteButton").attr("disabled","disabled");
        editArg = 0;
        console.log("checkbox not checked");
    }

}



//Pass clicked element to required function
function passOver(elem){

    if (elem.className=="selected"){
        elem.className="";
    }else{
        elem.className="selected";
    }
    
    elemRow=elem;
    editButton.onclick=function(){populateForm(elem)};
    deleteButton.onclick=function(){deleteRecord(elem)};
    console.log(elem);
    // editButton.addEventListener("Click",function(){edit(elem)});
    
}

