
//*************notes*************

//  console.log("test");
// $("#tbody").empty();
//$("#frmUser")[0].reset();

//*************notes*************

$("document").ready(function () {
  getData();
  dataInsert();
  dataDelete();
  dataUpdate();
});



function dataInsert()
{
$(".row").on("click", ".btnSubmit", function () 
{

let username = $("#username").val();
let name = $("#name").val();
let surname = $("#surname").val();
let category = $("#category").val();
let email = $("#email").val();

const item = 
{
  username : username, 
  name : name, 
  surname : surname, 
  category : category, 
  email : email 
};

const checkTypeSubmit = $('.btnSubmit').val()
if (checkTypeSubmit==="modify") {
  $.ajax({
      url:'http://localhost:3000/user/update',//kalw to link tou server
      type: 'post', // dilonw ti tipou klish einai
      dataType: 'JSON', // anaferw ti tupou dedomena tha einai
      data: item //ta data pou tha stilw
      }).done(function (response) {
          let status = response.status;
          let data = response.data; //data
          if (status) {
              getData();
              resetForm();
              alert(true, "Update Completed");
              
              $('.btnSubmit').val("insert");
              $("#username").prop("disabled",false);
              $("#password").prop("disabled",false);
          }
          else {
              console.log("Problem in Update");
              alert(false, "Update Failed (" + data.message +" )");
          }
      })
}
else 
{
  $.ajax({
      url:'http://localhost:3000/user/create',//kalw to link tou server
      type: 'post', // dilonw ti tipou klish einai
      dataType: 'JSON', // anaferw ti tupou dedomena tha einai
      data: item //ta data pou tha stilw
      }).done(function (response) {

      let status = response.status; //status
      let data = response.data; //data
      console.log(response);

      if (status) {
          getData();
          resetForm();
          alert(true, "Insert Completed");
      }
      else {
          console.log("problem in create");
          alert(false, "Insert Failed (" + data.message +" )");
      }
      
  })
}
})
}




function getData() 
{
$.ajax({
url:'http://localhost:3000/user/findAll',//kalw to link tou server
type: 'get', // dilonw ti tipou klish einai
dataType:'JSON' // anaferw ti tupou dedomena tha einai
}).done(function (response) { //afu ginei trexei to function pernane ta data apo to response
  let status = response.status; //status
  let data = response.data; //data
  if (status) {   
      tableBuilder(data);//pernaw ta data kai kalw thn function gia na ganei build ton table
      console.log(data); //kai edw emfanizw
  }
  else {
      //console.log("problem with data");
      alert(false, "Failed to get users (" +data.message +" )");
  }
})
}


//delete profanos
function dataDelete() 
{
$(".row").on("click", ".btnDelete", function () {
let username = $(this).val();
$.ajax({
url:'http://localhost:3000/user/delete?'+$.param({"username":username}),//kalw to link tou server
type: 'delete', // dilonw ti tipou klish einai
dataType:'JSON' // anaferw ti tupou dedomena tha einai
}).done(function (response) {
  let status = response.status; //status
  let data = response.data; //data
  
  if (status) {
      getData();
      alert(true, "Successfully deleted user");
  }
else {
  //console.log("problem in delete");
  alert(false, "Delete Failed (" + data.message +" )");
}
});

})
}




//update
function dataUpdate() {
$(".row").on("click", ".btnUpdate", function () {
let username = $(this).val();

$.ajax({
url:'http://localhost:3000/user/findOne?'+$.param({"username":username}),//kalw to link tou server
type: 'get', // dilonw ti tipou klish einai
dataType:'JSON' // anaferw ti tupou dedomena tha einai
}).done(function (response) {
  let status = response.status; //status
  let data = response.data; //data
  
  if (status) {
      $('#username').val(data.username);
      $('#name').val(data.name);
      $('#surname').val(data.surname);
      $('#category').val(data.category);
      $('#email').val(data.email);

      $("#username").prop("disabled",true);
      $("#password").prop("disabled",true);

      $('.btnSubmit').val("modify");
  }
  else 
  {
      alert(false, "Update Failed  (" + data.message +" )");
  }
});

})
}1




function tableBuilder(data) 
{
$("#tbody").empty();
var dataLength = data.length;
for (let i = 0; i < dataLength; i++) {
let username = data[i].username;
let name = data[i].name;
let surname = data[i].surname;
let category = data[i].category;
let email = data[i].email;
let text = 
`
<tr>
  <td>${username}</td>
  <td>${name}</td>
  <td>${surname}</td>
  <td>${category}</td>
  <td>${email}</td>
  <td><button class="btnUpdate btn btn-primary text-center" value=${username}>Update</button></td>
  <td><button class="btnDelete btn btn-danger text-center" value=${username}>Delete</button></td>
</tr>    
`
$("#tbody").append(text);
}
}


function alert(status, message) {
if (status) {
$(".alert").addClass('alert-success');
$(".alert").removeClass('alert-danger');
}else{
$(".alert").removeClass('alert-success');
$(".alert").addClass('alert-danger');
}
$(".alert").html(message);
}




function resetForm() {
$("#frmUser")[0].reset();
}
