var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1j8IwGtrSxLQi_zG1A_ShHv1W9b9S3SLm9YsKP1U9f8E/edit?usp=sharing");

var sheet = ss.getSheetByName('DAILY'); // be very careful ... it is the sheet name .. so it should match 

function doPost(e){
var action = e.parameter.action;

  if(action == 'addItem'){
    return addItem(e);

  }
}


function doGet(e){

var action = e.parameter.action;

  if(action == 'getItems'){
    return getItems(e);

  }
  
}


function addItem(e){
  
var date =  new Date();

var id  =  sheet.getLastRow(); // Item1

var name = e.parameter.name;

var dates = e.parameter.dates;
  
var time = e.parameter.time;

var longitude = e.parameter.longitude;
  
var latitude = e.parameter.longitude;
  
var photo = e.parameter.photo;
  
  

sheet.appendRow([date, id, name, dates, time, longitude, latitude, photo]);
  
  var result = {
    status: 200,
    message: 'Sukses',
    result: {},
    error: []
  };
  
  const final = JSON.stringify(result)

return ContentService.createTextOutput(final).setMimeType(ContentService.MimeType.JSON);
}

function getItems(e){
  
  var records={};
 
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1,sheet.getLastColumn()).getValues();
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};
    record['ID'] = row[1];
    record['NAME']=row[2];
    record['TANGGAL']=row[3];
    record['JAM']=row[4];
    record['LONGITUDE']=row[5];
    record['LATITUDE']=row[6];
    record['PHOTO']=row[7];
    
    data.push(record);
    
   }
  records = data;
  
  var final = {
    status: 200,
    message: 'sukses',
    result: records,
    error: []
  }
  
  var result=JSON.stringify(final);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}