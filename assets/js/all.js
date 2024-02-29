document.addEventListener("DOMContentLoaded", function () {
  // Get the modal
  var modal = document.getElementById("modal");

  // Get the button that opens the modal
  var btn = document.getElementById("whatsappButton");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    // Prepare data for WhatsApp message
    let whatsappData = "";

    document.querySelectorAll("#produkTable tbody tr").forEach((tr, index) => {
      let productName = tr.querySelector("td:nth-child(3)").innerText;
      let productQuantity = tr.querySelector("td:nth-child(4) input").value;

      whatsappData += `${
        index + 1
      }. ${productName} - (Qty: ${productQuantity})%0A`;
    });

    // Set href for WhatsApp link
    whatsappLink.href = `https://wa.me/628123456789?text=${encodeURIComponent(
      whatsappData
    )}`;

    // Show modal
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Get the button for sending order
  var sendOrderBtn = document.getElementById("kirimPesananBtn");

  // When the user clicks on send order button, set the link for WhatsApp and close the modal
  sendOrderBtn.onclick = function () {
    // Prepare data for WhatsApp message
    let whatsappData = "";

    document.querySelectorAll("#produkTable tbody tr").forEach((tr, index) => {
      let productName = tr.querySelector("td:nth-child(3)").innerText;
      let productQuantity = tr.querySelector("td:nth-child(4) input").value;

      whatsappData += `${
        index + 1
      }. ${productName} - (Qty: ${productQuantity})%0A`;
    });

    // Set href for WhatsApp link
    whatsappLink.href = `https://wa.me/628123456789?text=${encodeURIComponent(
      whatsappData
    )}`;

    // Close the modal
    modal.style.display = "none";

    // Open WhatsApp link
    window.location.href = whatsappLink.href;
  };
});
