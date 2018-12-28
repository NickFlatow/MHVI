function dbWrite() {
  //reference to database
  const dbWrite = firebase.database().ref().child(String($('#name').val()));
  //new date object
  dbWrite.set({
    Item:$('#name').val(),
    Quantity:(parseInt($('#quantity').val())),
    Cost:(parseInt($('#cost').val())),
    Date: firebase.database.ServerValue.TIMESTAMP

  })
}
