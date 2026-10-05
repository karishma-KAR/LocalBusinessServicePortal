// =========================
// Select Service
// =========================

function selectService(serviceName) {
    const serviceSelect = document.getElementById("service");

    serviceSelect.value = serviceName;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}


// =========================
// Booking Form
// =========================

const serviceForm = document.getElementById("serviceForm");

serviceForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get values
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const problem = document.getElementById("problem").value.trim();

    // Error elements
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const serviceError = document.getElementById("serviceError");
    const problemError = document.getElementById("problemError");

    const successMessage = document.getElementById("successMessage");

    // Clear previous messages
    nameError.textContent = "";
    phoneError.textContent = "";
    serviceError.textContent = "";
    problemError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;


    // =========================
    // Name Validation
    // =========================

    if (name === "") {

        nameError.textContent = "Please enter your name.";
        isValid = false;

    } else if (name.length < 2) {

        nameError.textContent = "Name must contain at least 2 characters.";
        isValid = false;
    }


    // =========================
    // Phone Validation
    // =========================

    const phonePattern = /^[6-9][0-9]{9}$/;

    if (phone === "") {

        phoneError.textContent = "Please enter your phone number.";
        isValid = false;

    } else if (!phonePattern.test(phone)) {

        phoneError.textContent =
            "Please enter a valid 10-digit Indian phone number.";

        isValid = false;
    }


    // =========================
    // Service Validation
    // =========================

    if (service === "") {

        serviceError.textContent = "Please select a service.";
        isValid = false;
    }


    // =========================
    // Problem Validation
    // =========================

    if (problem === "") {

        problemError.textContent =
            "Please describe your problem.";

        isValid = false;

    } else if (problem.length < 5) {

        problemError.textContent =
            "Please provide a little more detail.";

        isValid = false;
    }


    // Stop if validation fails
    if (!isValid) {
        return;
    }


    // =========================
    // Generate Request ID
    // =========================

    const requestId =
        "LF" + Math.floor(10000 + Math.random() * 90000);


    // =========================
    // Request Object
    // =========================

    const requestData = {

        requestId: requestId,

        name: name,

        phone: phone,

        service: service,

        problem: problem,

        status: "Request Submitted",

        date: new Date().toLocaleString()
    };


    // =========================
    // Save Request
    // =========================

    localStorage.setItem(
        requestId,
        JSON.stringify(requestData)
    );


    // =========================
    // Success Message
    // =========================

    successMessage.textContent =
        "Request submitted successfully! Your Request ID is " +
        requestId +
        ". Please save this ID for tracking.";


    // Clear form
    serviceForm.reset();

});


// =========================
// Tracking Form
// =========================

const trackingForm = document.getElementById("trackingForm");

trackingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const requestId =
        document.getElementById("requestId").value.trim();

    const trackingResult =
        document.getElementById("trackingResult");

    trackingResult.innerHTML = "";


    // Check empty Request ID
    if (requestId === "") {

        trackingResult.innerHTML =
            '<div class="not-found">' +
            'Please enter your Request ID.' +
            '</div>';

        return;
    }


    // Get saved request
    const savedRequest =
        localStorage.getItem(requestId);


    // Request not found
    if (!savedRequest) {

        trackingResult.innerHTML =
            '<div class="not-found">' +
            'Request not found. Please check your Request ID.' +
            '</div>';

        return;
    }


    // Convert saved data
    const requestData =
        JSON.parse(savedRequest);


    // Display request
    trackingResult.innerHTML = `

        <div class="tracking-card">

            <h3>Request Details</h3>

            <p>
                <strong>Request ID:</strong>
                ${requestData.requestId}
            </p>

            <p>
                <strong>Name:</strong>
                ${requestData.name}
            </p>

            <p>
                <strong>Phone:</strong>
                ${requestData.phone}
            </p>

            <p>
                <strong>Service:</strong>
                ${requestData.service}
            </p>

            <p>
                <strong>Problem:</strong>
                ${requestData.problem}
            </p>

            <p>
                <strong>Status:</strong>
                ${requestData.status}
            </p>

            <p>
                <strong>Submitted On:</strong>
                ${requestData.date}
            </p>

        </div>
    `;
});