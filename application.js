// ==================== Application Script ====================
const scriptURL = "https://script.google.com/macros/s/AKfycbxHpkY8M1Z87_t-ZXrHqpFGHoQWAPpGPmigvgNIDpILIj39zFQ71zm0sFdHZIbjDJ4/exec";
const form = document.getElementById("loanForm");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

//    const transactionId = "LOAN-" + Date.now().toString().slice(-6) + "-" +
//      Math.random().toString(36).substring(2, 7).toUpperCase();
  
    const transactionId = "LOAN-" + Date.now().toString().slice(-6);

    const formData = new FormData(form);
    formData.append("transactionId", transactionId);

    fetch(scriptURL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        if (text.includes("Success")) {
          window.location.href = "confirmation.html?id=" + transactionId +
            "&firstName=" + encodeURIComponent(form.firstName.value) +
            "&lastName=" + encodeURIComponent(form.lastName.value) +
            "&type=" + encodeURIComponent(form.loantype.value) +
            "&amount=" + encodeURIComponent(form.loanAmount.value) +
            "&status=Pending Review";
        } else {
          alert("Server error: " + text);
        }
      })
      .catch(err => alert("Error: " + err));
  });
}

document.getElementById("loanAmount").addEventListener("input", function(e) {
    // Remove everything except numbers
    let value = e.target.value.replace(/[^0-9]/g, "");
    
    if (value) {
        // Format with commas
        value = parseInt(value).toLocaleString("en-PH");
        // Add peso sign
        e.target.value = "₱" + value;
    } else {
        e.target.value = "";
    }
});
