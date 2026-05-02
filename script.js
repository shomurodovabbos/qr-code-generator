const inputText = document.getElementById("inputText");
const sizeSelect = document.getElementById("size");
const generateBtn = document.getElementById("generateBtn");
const qrSection = document.getElementById("qrSection");
const qrContainer = document.getElementById("qrContainer");
const downloadBtn = document.getElementById("downloadBtn");

let qrCodeInstance = null;
let qrCodeDataUrl = "";

generateBtn.addEventListener("click", () => {
    const text = inputText.value.trim();
    if (!text) {
        alert("Please enter some text or URL");
        return;
    }
    const size = parseInt(sizeSelect.value);

    //clear previous QR Code
    qrContainer.innerHTML = "";

    //check if QR Code lib is loaded
    if (typeof QRCode === "undefined") {
        alert(
            "QR Code library is still loading. Please wait a moment and try again",
        );
        return;
    }

    //generate QR Code using the qrcodejs lib
    qrCodeInstance = new QRCode(qrContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: "#000",
        colorLight: "#fff",
        correctionLevel: QRCode.CorrectLevel.H,
    });

    //wait for QR Code to render
    setTimeout(() => {
        const canvas = qrContainer.querySelector("canvas");
        if (canvas) {
            qrCodeDataUrl = canvas.toDataURL("image/png");
            qrSection.classList.add("show");
        }
    }, 100);
});
