function addItem() {
    const table = document.getElementById("itemsTable");

    const row = table.insertRow(-1);

    row.innerHTML = `
        <td>
            <input type="text" placeholder="Item name">
        </td>

        <td>
            <input type="number" placeholder="Qty" min="1">
        </td>

        <td>
            <input type="number" placeholder="Weight (g)" min="0" step="any">
        </td>

        <td>
            <input type="number" class="itemAmount" placeholder="Amount (₹)" min="0" step="any">
        </td>
    `;
}


function calculateTotal() {

    const amounts = document.querySelectorAll(".itemAmount");

    let subtotal = 0;

    amounts.forEach(function(input) {
        subtotal += Number(input.value) || 0;
    });


    const adjustmentType =
        document.getElementById("adjustmentType").value;

    const adjustmentAmount =
        Number(document.getElementById("adjustmentAmount").value) || 0;


    let adjustment = 0;

    if (adjustmentType !== "none") {
        adjustment = adjustmentAmount;
    }


    const estimatedTotal =
        subtotal - adjustment;


    document.getElementById("subtotal").textContent =
        subtotal.toFixed(2);

    document.getElementById("adjustmentDisplay").textContent =
        adjustment.toFixed(2);

    document.getElementById("estimatedTotal").textContent =
        estimatedTotal.toFixed(2);
}



function generateEstimate() {

    calculateTotal();


    /* =========================
       CUSTOMER DETAILS
    ========================= */

    const customerName =
        document.getElementById("customerName").value;

    const customerPhone =
        document.getElementById("customerPhone").value;


    document.getElementById("previewCustomerName").textContent =
        customerName;

    document.getElementById("previewCustomerPhone").textContent =
        customerPhone;



    /* =========================
       TOTALS
    ========================= */

    document.getElementById("previewSubtotal").textContent =
        document.getElementById("subtotal").textContent;

    document.getElementById("previewAdjustment").textContent =
        document.getElementById("adjustmentDisplay").textContent;

    document.getElementById("previewTotal").textContent =
        document.getElementById("estimatedTotal").textContent;



    /* =========================
       AUTOMATIC DATE
    ========================= */

    const today = new Date();

    const formattedDate =
        today.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

    document.getElementById("estimateDate").textContent =
        formattedDate;



    /* =========================
       AUTOMATIC ESTIMATE NUMBER
    ========================= */

    let estimateNumber =
        Number(localStorage.getItem("estimateNumber")) || 0;

    estimateNumber++;

    localStorage.setItem(
        "estimateNumber",
        estimateNumber
    );


    const formattedEstimateNumber =
        "RE-" +
        String(estimateNumber).padStart(4, "0");


    document.getElementById("estimateNumber").textContent =
        formattedEstimateNumber;



    /* =========================
       JEWELLERY ITEMS
    ========================= */

    const previewItems =
        document.getElementById("previewItems");

    previewItems.innerHTML = "";


    const rows =
        document.querySelectorAll("#itemsTable tr");


    let serialNumber = 1;


    rows.forEach(function(row, index) {

        if (index === 0) {
            return;
        }


        const inputs =
            row.querySelectorAll("input");


        if (inputs.length < 4) {
            return;
        }


        const item =
            inputs[0].value;

        const quantity =
            inputs[1].value;

        const weight =
            inputs[2].value;

        const amount =
            inputs[3].value;


        if (item || quantity || weight || amount) {

            const newRow =
                document.createElement("tr");


            newRow.innerHTML = `
                <td>${serialNumber}</td>
                <td>${item}</td>
                <td>${quantity}</td>
                <td>${weight}</td>
                <td>₹${Number(amount || 0).toFixed(2)}</td>
            `;


            previewItems.appendChild(newRow);


            serialNumber++;
        }

    });



    /* =========================
       SHOW ESTIMATE
    ========================= */

    document.getElementById("estimatePreview").style.display =
        "block";
}
function backToEdit() {

    document.getElementById("estimatePreview").style.display =
        "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}