var modal = document.getElementById('myModal');
var btn = document.getElementById("signupModal");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "inline-block";
}
span.onclick = function() {
    modal.style.display = "none";
}

var requestModal = document.getElementById('myModal');
var btn = document.getElementById("requestModal");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    requestModal.style.display = "inline-block";
}								
span.onclick = function() {
    requestModal.style.display = "none";
}