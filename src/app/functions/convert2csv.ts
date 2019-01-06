export function Convert2CSV(objArray) {
  console.log(`[Convert2CSV] data: `, objArray);
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = '';
  console.group("First for");
  for (const fieldData in objArray[0]) {
    row += fieldData.replace(',','') + ',';
    console.log("row:", row);
  }
  console.groupEnd();
  row = row.slice(0, -1);
  //append Label row with line break
  str += row + '\r\n';
  console.group("Second for");
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in array[i]) {
      console.log(`field: ${typeof index} index:`, index);
      if (line != ''){
        line += ',';
      }
      console.log(` type:${typeof array[i][index] } array[${i}][${index}]:`, array[i][index]);
      let dataField:string = (<string>array[i][index]) ;
      if(!dataField)
        dataField = '--';
      else
        dataField = dataField.replace(',','');
      line += dataField;
    }
    str += line + '\r\n';
  }
  console.groupEnd();
  return str;
}
