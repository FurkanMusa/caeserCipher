// Sayfa yenilenince boşaltırrr
window.onload = function () {
    // Sayfa yüklendiğinde, localStorage'daki veriler silinir
    localStorage.clear()
}

// clicked encrypt
function encrypt() {
    // input-textarea'dan metin alınır
    let rawText = document.getElementById("raw").value
    let keyText = document.getElementById("key").value

    // infoRaw açıklamayı kaldır
    let infoRaw = document.getElementById("infoRaw")
    for (let node of infoRaw.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = ""
        }
    }

    // analiz raw
    grafikle(countLetters(rawText), document.getElementById("chartRaw"))

    // cipher
    let cipheredText = ceaserCipherEncrypt(rawText, convertToKey(keyText))
    document.getElementById("ciphered").value = cipheredText

    // infoCip açıklamayı kaldır
    let infoCip = document.getElementById("infoCip")
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
    let cryptedText = document.getElementById("ciphered").value
    let referanceText = document.getElementById("referance").value

    // frekans analizi
    let letters = countLetters(cryptedText)
    let referance = countLetters(referanceText)

    let [letters_values, letters_keys] = sortTwoArraysDescending(Object.values(letters), Object.keys(letters))
    let [referance_values, referance_keys] = sortTwoArraysDescending(Object.values(referance), Object.keys(referance))

    
    let decryptedText = cryptedText
    let result = ""
    for (let i = 0; i < decryptedText.length; i++) {
        if (decryptedText[i] == " " || decryptedText[i] == "\n" || decryptedText[i] == "\t" || decryptedText[i] == "\r") {
            result += decryptedText[i]
            
        } else {
            result += referance_keys[letters_keys.indexOf(decryptedText[i])] ?? decryptedText[i]
        }

    }


    // textareaya yaz
    document.getElementById("decoded").value = result

    // infodan açıklamayı kaldır
    let infoDec = document.getElementById("infoDec")
    for (let node of infoDec.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = ""
        }
    }

    // analiz dec
    decodedText = document.getElementById("decoded").value
    grafikle(countLetters(decodedText), document.getElementById("chartDec"))

    // infodan açıklamayı kaldır
    let chartRef = document.getElementById("chartRef")
    for (let node of chartRef.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = ""
        }
    }

    // analiz dec
    grafikle(countLetters(referanceText), document.getElementById("chartRef"))

    // yüzdeyi yaz
    let rawText = document.getElementById("raw").value
    let similarity = calculateTextSimilarity(rawText, decodedText)
    document.getElementById("similarity").innerHTML = similarity + "%"
}

// Other functions
function convertToKey(text) {
    let parsedKey = parseInt(text)
    if (isNaN(parsedKey)) {
        parsedKey = 0
        for (let i = 0; i < text.length; i++) {
            parsedKey += text.charCodeAt(i)
        }
        parsedKey = parsedKey % 94
    }
    return parsedKey
}

function countLetters(text) {
    let counts = {}
    for (let i = 0; i < text.length; i++) {
        let letter = text[i]
        let code = text.charCodeAt(i)
        if (code >= 33 && code <= 126) {
            if (counts[letter]) {
                counts[letter]++
            } else {
                counts[letter] = 1
            }
        }
    }
    return counts
}


function sortTwoArraysDescending(a, b) {
    // Create a list of tuples, where each tuple contains the corresponding elements from both arrays
    let zipped = [];
    for(let i = 0; i < a.length; i++) {
      zipped.push([a[i], b[i]]);
    }
  
    // Sort the list of tuples based on the first element of each tuple (i.e. the elements in the first array)
    zipped.sort(function(x, y) { return y[0] - x[0]; });
  
    // Extract the sorted arrays from the list of tuples
    let a_sorted = [];
    let b_sorted = [];
    for(let i = 0; i < zipped.length; i++) {
      a_sorted.push(zipped[i][0]);
      b_sorted.push(zipped[i][1]);
    }
  
    return [a_sorted, b_sorted];
  }




function turkishToLatin(str) {
    const turkishChars = "ÇçĞğİıÖöŞşÜü";
    const latinChars = "CcGgIiOoSsUu";
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      let index = turkishChars.indexOf(str[i]);
      if (index !== -1) {
        newStr += latinChars[index];
      } else {
        newStr += str[i];
      }
    }
    return newStr;
  }
  

// GRAFİK ÇİZ
function grafikle(analizReport, canvas) {
    let labels = []
    let values = []
    for (let key in analizReport) {
        labels.push(key)
        values.push(analizReport[key])
    }

    let chartStatus = Chart.getChart(canvas) // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy()
    }

    // Grafik oluşturma
    let ctx = canvas.getContext("2d")
    let myChart = new Chart(ctx, {
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
    let longerText = text1.length >= text2.length ? text1 : text2
    let shorterText = text1.length < text2.length ? text1 : text2

    let longerLength = longerText.length
    if (longerLength === 0) {
        return 100.0
    }

    let shorterLength = shorterText.length
    let commonLength = 0
    for (let i = 0; i < shorterLength; i++) {
        if (longerText[i] === shorterText[i]) {
            commonLength++
        }
    }

    let similarity = ((commonLength * 2) / (longerLength + shorterLength)) * 100
    if (similarity > 90) {
        return "✨" + similarity.toFixed(2).toString()
    }
    return similarity.toFixed(2)
}

// CEASER CIPHER
function ceaserCipherEncrypt2(text, key) {
    let cipheredText = ""
    for (let i = 0; i < text.length; i++) {
        let ascii = text.charCodeAt(i)
        if (ascii == 32) {
            // space
            cipheredText += " "
            continue
        }
        let newAscii = ascii + key
        cipheredText += String.fromCharCode(newAscii)
        // console.log(ascii)
        // console.log(newAscii)
        // console.log(cipheredText)
    }
    return cipheredText
}

function ceaserCipherEncrypt(text, shift) {
    // text = turkishToLatin(text)
    if (shift < 0 || shift > 126) shift = (shift + 94) % 94
    let result = ""
    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        let code = text.charCodeAt(i)
        if (code == 32) {
            // space
            char = " "
        } else if (code >= 33 && code <= 126) {
            char = String.fromCharCode(((code - 32 + shift) % 94) + 32)
        }
        result += char
    }
    return result
}
