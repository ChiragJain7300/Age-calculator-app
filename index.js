const currentDate = new Date();

let inputDate;

const findAge = (year, month, day) => {
  let today = new Date();
  let cyear = today.getFullYear();
  let cmonth = today.getMonth() + 1;
  let cday = today.getDate();

  let yearDiff = cyear - year;
  let monthDiff = cmonth - month;
  let dayDiff = cday - day;
  // console.log(yearDiff, monthDiff, dayDiff);

  if (monthDiff > 0) {
    if (dayDiff < 0) {
      monthDiff -= 1;
      dayDiff += 30;
    }
  } else if (monthDiff <= 0) {
    yearDiff--;
    if (dayDiff >= 0) monthDiff += 12;
    else {
      if (monthDiff === 0) {
        monthDiff = 11;
      } else {
        monthDiff -= 1;
      }
      dayDiff += 30;
    }
  }
  if (monthDiff > 11) {
    monthDiff -= 12;
    yearDiff++;
  }
  setAge(yearDiff, monthDiff, dayDiff);
};

const setAge = (year, month, day) => {
  $(".years").text(year);
  $(".months").text(month);
  $(".days").text(day);
  console.log("setAge method");
};

$("form").submit((e) => {
  e.preventDefault();
  const isFormValid = FormValidChecker();
  if (isFormValid) {
    let day = Number($("#day").val());
    let month = Number($("#month").val());
    let year = Number($("#year").val());

    findAge(year, month, day);
  } else {
    console.log("NOT VALID INPUTS");
  }
});

const FormValidChecker = () => {
  let isFormValid = true;
  const inputFields = document.querySelectorAll("input");
  const resultFields = document.querySelectorAll(".result .col-12 span");
  console.log(resultFields);
  // check validation for empty values
  inputFields.forEach((el) => {
    if (el.value.length === 0) {
      // console.log(el.id + " is empty!!! ");
      errorMsg(el, "empty");
      isFormValid = false;
    } else {
      // console.log(el.id + " is valid input");
      onSuccessProcess(el);
    }
  });
  // resetting values of result fields
  resultFields.forEach((el) => {
    el.textContent = "--";
  });
  // validation for day input field
  if ($("#day").val() <= 0 || $("#day").val() >= 32) {
    // console.log("day value is not appropriate");
    errorMsg($("#day"), "invalid");
    isFormValid = false;
  } else {
    console.log("valid");
  }
  // validation for month input field
  if ($("#month").val() <= 0 || $("#month").val() >= 13) {
    // console.log("day value is not appropriate");
    errorMsg($("#month"), "invalid");
    isFormValid = false;
  } else {
    console.log("valid");
  }
  // checking date is not in Future
  let dob = new Date($("#year").val(), $("#month").val() - 1, $("#day").val());
  if (dob > currentDate) {
    errorMsg($("#day"), "invalid");
    errorMsg($("#month"), "invalid");
    errorMsg($("#year"), "invalid");
    isFormValid = false;
  }
  // checking the validity of year
  if ($("#year").val() < 1) {
    errorMsg($("#year"), "invalid");
    isFormValid = false;
  }

  // checking validity of date
  if (
    dob.getFullYear() != $("#year").val() ||
    dob.getMonth() != $("#month").val() - 1 ||
    dob.getDate() != $("#day").val()
  ) {
    errorMsg($("#day"), "invalid");
    errorMsg($("#month"), "invalid");
    errorMsg($("#year"), "invalid");
    isFormValid = false;
  }
  return isFormValid;
};

const errorMsg = (el, typeOfError) => {
  if (typeOfError === "empty") {
    // console.log("emptyErrorMsg for " + el.id);
    const errorDiv = "." + el.id + "Error";
    const inputField = $(errorDiv).prev();
    const labelField = inputField.prev();
    $(errorDiv).removeClass("errorText");
    inputField.css("border-color", "red");
    labelField.css("color", "red");
  } else if (typeOfError === "invalid") {
    const fieldName = el.attr("id");
    el.next().text(`Must be valid ${fieldName}`);
    el.next().removeClass("errorText");
    el.css("border-color", "red");
    el.prev().css("color", "red");
  }
};

const onSuccessProcess = (el) => {
  // console.log("Your data was valid");
  const errorDiv = "." + el.id + "Error";
  let classList = $(errorDiv).attr("class");
  const inputField = $(errorDiv).prev();
  const labelField = inputField.prev();
  if (!classList.includes("errorText")) {
    $(errorDiv).addClass("errorText");
    inputField.css("border-color", "#dee2e6");
    labelField.css("color", "hsl(0, 1%, 44%)");
  }
};
