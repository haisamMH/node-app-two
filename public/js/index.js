var socket = io();
var username;
$(document).ready(function(){
    username = prompt('name');
});
//connecting
socket.on('connect',function(){
    console.log('connected to server.');
});

//listening from server
socket.on('newMessage',function(message){
   var li = $('<li></li>');
   li.text(`${message.from} : ${message.text}`);

   $('#messages').append(li);
});

//listnlocation message
socket.on('newLocationMessage',function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(message.from);
    a.attr('href',message.url);

    li.append(a);
    $('#messages').append(li);
});

//disconnecting
socket.on('disconnect',function(){
    console.log('disconnected from server.');
});

//emit message from frontend
$('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from: username,
        text: $('[name=message]').val()
    },function(data){
        console.log(data);
    }); 
    $('[name=message]').val('');
});

var locationBtn = $('#send-location');
locationBtn.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geo Location not supported by your browser.');
    }
 
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            from : username,
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });

    },function(){
        alert('unable to fetch the location.');
    });
});