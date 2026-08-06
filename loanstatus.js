function lookupStatus() {
  const transactionId = document.getElementById("txnInput").value.trim();
  if (transactionId) {
    fetchStatus(transactionId);
  }
}

function fetchStatus(transactionId) {
  document.getElementById("transactionId").textContent = transactionId;

  fetch("https://script.google.com/macros/s/AKfycbxHpkY8M1Z87_t-ZXrHqpFGHoQWAPpGPmigvgNIDpILIj39zFQ71zm0sFdHZIbjDJ4/exec?id=" + transactionId)
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        document.getElementById("status").textContent = data.status;

        // Color coding
        if (data.status.includes("Approved")) {
          document.getElementById("status").style.color = "green";
        } else if (data.status.includes("Denied")) {
          document.getElementById("status").style.color = "red";
        } else {
          document.getElementById("status").style.color = "gray";
        }
      } else {
        document.getElementById("status").textContent = "Not Found";
      }

      document.getElementById("nextPayment").textContent = "To be scheduled";
    })
    .catch(err => {
      console.error(err);
      document.getElementById("status").textContent = "Error fetching status";
    });
}

const prefix = "LOAN-";

document.getElementById("txnInput").addEventListener("input", function(e) {
  if (!this.value.startsWith(prefix)) {
    this.value = prefix; // restore prefix if user tries to delete it
  }
});

function lookupStatus() {
  const txnInput = document.getElementById("txnInput").value.trim();
  if (txnInput.length > prefix.length) {
    fetchStatus(txnInput);
  } else {
    alert("Please enter your loan number after LOAN-");
  }
}

