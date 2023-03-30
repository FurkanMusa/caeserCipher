// Sayfa yenilenince boşaltırrr
window.onload = function() {
  // Sayfa yüklendiğinde, localStorage'daki veriler silinir
  localStorage.removeItem("inputText");
  document.getElementById("raw").value = "";
  document.getElementById("ciphered").value = "";
  document.getElementById("decoded").value = "";
}

// clicked ENCODE
function encode() {
	// input-textarea'dan metin alınır
	var inputText = document.getElementById("raw").value;
	
	// output-textarea'ya metin yazdırılır
	document.getElementById("ciphered").value = inputText;
}

// cilcked DECODE
function decode() {
	// input-textarea'dan metin alınır
	var inputText = document.getElementById("ciphered").value;
	
	// set info
	var infoCip = document.getElementById("infoCip");
	infoCip.innerHTML = inputText;
	
	// output-textarea'ya metin yazdırılır
	document.getElementById("decoded").value = inputText;
}