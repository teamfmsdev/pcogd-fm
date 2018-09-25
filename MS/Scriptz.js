var jsonResponse = "";
var select=[[]];

function testing(){
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

    // document.getElementById("alertMsg").innerHTML = formData.wTitle;
}

function Reset(){
    document.getElementById("formDataArea").reset();
}

function myTrim(subj) {
    return subj.replace(/^\s+|\s+$/gm,'');
}

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
}else{
    Save(formData);
}
}

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
            var jsonOutput=document.getElementById("outputDivision");
            var node= [];
            var textnode=[];

            for(x=0;x<jsonResponse.length;x++){
                
                for(y=0;y<12;y++){
                    textnode[y] = document.createTextNode(jsonResponse[x][y]);
                    node[y] = document.createElement("div");
                    node[y].appendChild(textnode[y]);
                    node[y].className="outputDivision";
                    node[y].setAttribute("Id","x"+x+"y"+y);
                    jsonOutput.appendChild(node[y]);
                    select[x].push([document.getElementById("x"+x+"y"+y)]);
                }
                // select.push([]);
                if (select.length!=jsonResponse.length){
                    select.push([]);
                }
            }

        }
        }
    xmlhttp.open("POST", "serverInteraction.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(submission);
}



for (x=0;x<jsonResponse.length;x++){
    

}

function mouseOverSelect(){


}

