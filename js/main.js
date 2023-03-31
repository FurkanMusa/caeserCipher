// Sayfa yenilenince boşaltırrr
window.onload = function () {
    // Sayfa yüklendiğinde, localStorage'daki veriler silinir
    localStorage.clear()
}

// clicked encrypt
function encrypt() {
    // input-textarea'dan metin alınır
    var rawText = document.getElementById("raw").value
    var keyText = document.getElementById("key").value

    // infoRaw açıklamayı kaldır
    var infoRaw = document.getElementById("infoRaw")
    for (let node of infoRaw.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = ""
        }
    }

    // analiz raw
    grafikle(countLetters(rawText), document.getElementById("chartRaw"))

    // cipher
    var cipheredText = ceaserCipherEncrypt(rawText, convertToKey(keyText))
    document.getElementById("ciphered").value = cipheredText

    // infoCip açıklamayı kaldır
    var infoCip = document.getElementById("infoCip")
    for (let node of infoCip.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = ""
        }
    }

    // analiz cip
    grafikle(countLetters(cipheredText), document.getElementById("chartCip"))
}

// cilcked decrypt
function decrypt() {
    // input-textarea'dan metin alınır
    var cryptedText = document.getElementById("ciphered").value
    var keyText = document.getElementById("key").value

    // Kopya
    console.log("KOPYA:" + ceaserCipherEncrypt(cryptedText, -convertToKey(keyText)))

    // frekans analizi
    var letters = countLetters(cryptedText)
    const keys = Object.keys(letters)
    const firstKey = keys[0]

    var firstKeyAscii = firstKey.charCodeAt(0)
    var predictedKey = 101 - firstKeyAscii
	console.log("Predicted key: " + -predictedKey)

	// encrypt again with predicted key (because predicted key is negative)
    var cipheredText = ceaserCipherEncrypt(cryptedText, predictedKey)
    document.getElementById("decoded").value = cipheredText


    // infodan açıklamayı kaldır
    var infoDec = document.getElementById("infoDec")
    for (let node of infoDec.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = ""
        }
    }

	// analiz dec
	decodedText = document.getElementById("decoded").value
    grafikle(countLetters(decodedText), document.getElementById("chartDec"))

	// yüzdeyi yaz
	var rawText = document.getElementById("raw").value
	var similarity = calculateTextSimilarity(rawText, decodedText)
	document.getElementById("similarity").innerHTML = similarity + "%"
}

// Other functions
function convertToKey(text) {
    var parsedKey = parseInt(text)
    // console.log("parsed key: "+parsedKey)
    if (isNaN(parsedKey)) {
        parsedKey = 0
        for (var i = 0; i < text.length; i++) {
            parsedKey += text.charCodeAt(i)
        }
        parsedKey = parsedKey % 26
    }
    return parsedKey
}

function countLetters(text) {
    var counts = {}
    for (var i = 0; i < text.length; i++) {
        var letter = text[i].toLowerCase()
        if (letter.match(/[a-z]/i)) {
            if (counts[letter]) {
                counts[letter]++
            } else {
                counts[letter] = 1
            }
        }
    }

    // console.table(sortJSONByValue(counts))
    return sortJSONByValue(counts)
}

function sortJSONByValue(obj) {
    const sortedObj = Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [key, value]) => {
            acc[key] = value
            return acc
        }, {})

    return sortedObj
}

function validateInput(event) {
    var textArea = event.target
    var text = textArea.value
    text = text.replace(/[^a-zA-Z0-9ğĞşŞıİ \!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/gi, "") // 94 tane karakter
    textArea.value = text
}

// GRAFİK ÇİZ
function grafikle(analizReport, canvas) {
    var labels = []
    var values = []
    for (var key in analizReport) {
        labels.push(key)
        values.push(analizReport[key])
    }

    let chartStatus = Chart.getChart(canvas) // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy()
    }

    // Grafik oluşturma
    var ctx = canvas.getContext("2d")
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    data: values,
                },
            ],
        },
    })
}

// yüzde benzerlik
function calculateTextSimilarity(text1, text2) {
	let longerText = text1.length >= text2.length ? text1 : text2;
	let shorterText = text1.length < text2.length ? text1 : text2;
	
	let longerLength = longerText.length;
	if (longerLength === 0) {
	  return 100.0;
	}
	
	let shorterLength = shorterText.length;
	let commonLength = 0;
	for (let i = 0; i < shorterLength; i++) {
	  if (longerText[i] === shorterText[i]) {
		commonLength++;
	  }
	}
	
	let similarity = (commonLength * 2) / (longerLength + shorterLength) * 100;
	if (similarity > 90) {
		return "✨" + similarity.toFixed(2).toString();
	}
	return similarity.toFixed(2);
  }

// CEASER CIPHER
function ceaserCipherEncrypt(text, key) {
    var cipheredText = ""
    for (var i = 0; i < text.length; i++) {
        var ascii = text.charCodeAt(i)
        var newAscii = ascii + key
        cipheredText += String.fromCharCode(newAscii)
        // console.log(ascii)
        // console.log(newAscii)
        // console.log(cipheredText)
    }
    return cipheredText
}

