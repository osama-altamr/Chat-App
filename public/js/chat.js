const socket = io();

socket.on("count", (data) => {
  console.log("The count has been updated",data);
});



document.querySelector("#increment").addEventListener('click', () =>{
    console.log("Clicked")
    socket.emit('increment')
})