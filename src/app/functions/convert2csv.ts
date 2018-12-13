export function Convert2CSV(objArray) {
  console.log(`Convert2CSV data: `, objArray);
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = "";

  for (var index in objArray[0]) {
    //Now convert each value to string and comma-separated
    row += index + ',';
  }
  row = row.slice(0, -1);
  //append Label row with line break
  str += row + '\r\n';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ',';
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}
