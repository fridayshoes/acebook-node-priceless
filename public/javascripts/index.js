window.onload = function() {
  var counter = 1;
  var disLikeCounter = document.getElementById("dislike-counter");
  var disLikeButton = document.getElementById("dislike-button");


  disLikeButton.addEventListener("click", function(){
  disLikeCounter.innerHTML = counter++; 
  console.log("YOU CLICKED ON ME");
  });
}