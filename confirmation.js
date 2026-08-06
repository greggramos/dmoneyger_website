// ==================== Confirmation Script ====================
function showSummary() {
  document.getElementById("loanSummary").style.display = "block";
}

function populateSummary() {
  const params = new URLSearchParams(window.location.search);

  if (document.getElementById("transactionId")) {
    document.getElementById("transactionId").textContent = params.get("id");
    document.getElementById("name").textContent = (params.get("firstName") || "") + " " + (params.get("lastName") || "");
    document.getElementById("type").textContent = params.get("type") || "";
    document.getElementById("amount").textContent = params.get("amount") || "";
    document.getElementById("status").textContent = params.get("status") || "Pending Review";

    // Calculate next payment date (example: +1 month)
    let nextPayment = new Date();
    nextPayment.setMonth(nextPayment.getMonth() + 1);
    document.getElementById("nextPayment").textContent = nextPayment.toDateString();
  }
}

document.addEventListener("DOMContentLoaded", populateSummary);

function goToStatus() {
  const transactionId = document.getElementById("transactionId").textContent;
  location.href = "loanstatus.html?id=" + transactionId;
}
