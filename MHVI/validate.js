$(function() {
  //custom method to check that fields only contain letters and spaces
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
  }, "Only alphabetical characters and spaces");

  $("form[name='mhvi']").validate({
    // Specify validation rules
    rules: {
      item: {
        required: true,
        // lettersonly:true
      },
      quantity:{
        required: true,
        digits: true,
        min:0,
        max:850
      },
      cost:{
        required:true,
        digits:true,
        min:0,
        max:850
      }
    },
    // Specify validation error messages
    messages: {
      item: {
        required:"Please enter an Item",
      },
      weight: {
        required: "Please enter your weight",
        digits: "you must enter positive numbers",
        min: "your weight must be at least 2 digits"
      }
    },
    //don't use parentheses when calling the function
    submitHandler: dbWrite
  });
  $("#driver").validate({
      rules: {
        list: {
          required: true
        },
        driverTxtUpdate:{
          required: true,
          range:[-100,100]
        }
      },
      messages: {
        list: {
          required: "Please select an option from the dropdown menu"
        },
        driverTxtUpdate:{
          required: "Please enter the quantity"
        }
      },
  });
  $('#driverDropOff').click(function() {
    //check if driver form meets validation rules
    if ($('#driver').valid()) {
      let item = $('#list').find(":selected").text();
      let quantity = $('#driverTxtUpdate').val();
      updateDatabase(item,(-1 * quantity));
    }
  });
  $('#driverPickUp').click(function() {
    //check if driver form meets validation rules
    if ($('#driver').valid()) {
      let item = $('#list').find(":selected").text();
      let quantity = $('#driverTxtUpdate').val();
      updateDatabase(item,quantity);
    }
  });

  // $(document).ready(function() {
    // $(".update").live('click',function() {
    //   var $row = $(this).closest("tr");   // Find the row
    //   var $text = $row.find(".up").text(); // Find the text
    //   console.log($text);
    // });
    $('#tableBody').on('click','button.update',function(){
        var $row = $(this).closest("tr");   // Find the row
        var $text = $row.find(".up").text(); // Find the text
        console.log($text);
    })

    // $(".update").click(function(){
    //   alert("hello");
    // })

    // $("#tableBody").on('click', $('.update'), function(){
    //   alert("hello");
    // })
  // });

  // $(document).ready(function() {
    // $("#tableBody").on('click',function() {
    //   // alert($(this).closest("tr").val());
    //
    //   var $row = $(this).closest("tr");   // Find the row
    //   var $text = $row.find(".up").text(); // Find the text
    //   // console.log($(this).find(".up").text());
    //   console.log($(this).closest("tr"));
    // });
  // $(document).on('click', $('.update'), function(){
  //   alert("hello");
  //       // var $row = $(this).closest("tr");   // Find the row
  //       // var $text = $row.find(".up").text(); // Find the text
  //       // console.log($(this).children());
  // });
  $("#adminSelectForm").validate({
      rules: {
        adminList: {
          required: true
        },
        adminSelectQuantity:{
          required: true,
          range:[-100,100]
        }
      },
      messages: {
        adminList: {
          required: "Please select an option from the dropdown menu"
        },
        adminSelectQuantity:{
          required: "Please enter the quantity"
        }
      },
      submitHandler: adminSelectForm
  });
//function
});
