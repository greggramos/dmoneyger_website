// ==================== Application Script ====================
const scriptURL = "https://script.google.com/macros/s/AKfycbwNPqwLsjUO0zSFvIole8Fyd_V9BpHoADusrPbi_iNAIkTiGRmsZLebrDUGvZpUmRnG/exec";
const form = document.getElementById("loanForm");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const transactionId = "LOAN-" + Date.now().toString().slice(-6) + "-" +
      Math.random().toString(36).substring(2, 7).toUpperCase();

    const formData = new FormData(form);
    formData.append("transactionId", transactionId);

    fetch(scriptURL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        if (text.includes("Success")) {
          window.location.href = "confirmation.html?id=" + transactionId +
            "&firstName=" + encodeURIComponent(form.firstName.value) +
            "&lastName=" + encodeURIComponent(form.lastName.value) +
            "&type=" + encodeURIComponent(form.type.value) +
            "&amount=" + encodeURIComponent(form.amount.value);
        } else {
          alert("Server error: " + text);
        }
      })
      .catch(err => alert("Error: " + err));
  });
}

// ==================== Confirmation Script ====================
function populateSummary() {
  const params = new URLSearchParams(window.location.search);
  if (document.getElementById("transactionId")) {
    document.getElementById("transactionId").textContent = params.get("id");
    document.getElementById("name").textContent = (params.get("firstName") || "") + " " + (params.get("lastName") || "");
    document.getElementById("type").textContent = params.get("type") || "";
    document.getElementById("amount").textContent = params.get("amount") || "";
  }
}

window.onload = populateSummary;
