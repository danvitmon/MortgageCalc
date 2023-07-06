function calcMortgage(){
  let amount = parseFloat(document.getElementById("amount").value);
  let months = parseFloat(document.getElementById("months").value);
  let rate = parseFloat(document.getElementById("rate").value);

  if(isNaN(amount) || amount <= 0){
      Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please enter a positive dollar value for the loan amount",
          backdrop: false,
      });
      return;
  }
  if(!Number.isInteger(months) || months < 1){
      Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please enter a positive number of months for the term",
          backdrop: false,
      });
      return;
  }
  if (isNaN(rate) || rate < 0) {
      Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please enter a positive percentage value for the interest rate",
          backdrop: false,
      });
      return;
  }

  let monthlyPay = (amount * (rate/1200)) / (1 - Math.pow((1 + (rate/1200)), -months)) 
  let totalInt = buildTable(amount, months, rate, monthlyPay);
  displayTotals(monthlyPay, amount, totalInt);
}

function buildTable(amount, months, rate, monthlyPay){
  table = document.getElementById("calcTable");
  template = document.getElementById("trtemp");

  let totalInt = 0;
  let balance = amount;

  for(i = 1; i <= months; i++){
      let tableRow = document.importNode(template.content, true);

      tableRow.querySelector("[data-id='month']").textContent = i;

      tableRow.querySelector("[data-id='pay']").textContent = formatCurrency(monthlyPay);

      let interest = balance * (rate / 1200);
      tableRow.querySelector("[data-id='int']").textContent = formatCurrency(interest);

      let principal = monthlyPay - interest;
      tableRow.querySelector("[data-id='prin']").textContent = formatCurrency(principal);

      totalInt += interest;
      tableRow.querySelector("[data-id='total']").textContent = formatCurrency(totalInt);

      balance -= principal;
      tableRow.querySelector("[data-id='bal']").textContent = formatCurrency(Math.abs(balance));

      table.appendChild(tableRow);
  }

  return totalInt;
}

function displayTotals(monthlyPay, amount, totalInt){
  let cost = amount + totalInt
  document.getElementById("monthly").textContent = formatCurrency(monthlyPay);
  document.getElementById("tprin").textContent = formatCurrency(amount);
  document.getElementById("tint").textContent = formatCurrency(totalInt);
  document.getElementById("tcost").textContent = formatCurrency(cost);
  document.getElementById("tprinid").textContent = "Total Principle"
  document.getElementById("tintid").textContent = "Total Interest"
  document.getElementById("tcostid").textContent = "Total Cost"
  document.getElementById("monthlyid").textContent = "Your Monthly Payment"
}

function formatCurrency(num){
  return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
  });
}