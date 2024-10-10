const billAmountInput = document.querySelector('#bill-amount')
const customTipInput = document.querySelector('.custom-tip')
const numberOfPeopleInput = document.querySelector('.number-of-people')
const generateBillBtn = document.querySelector('.generate-bill-btn')
const tipAmountOutput = document.querySelector('.tip-amount span')
const totalBillOutput = document.querySelector('.total span')
const eachPersonBillOutput = document.querySelector('.each-person-bill span')
const tipsContainer = document.querySelector('.tip-container')
const resetBtn = document.querySelector('.reset-btn')

let tipPercentage = 0

generateBillBtn.addEventListener('click', () => {
  const billAmount = parseInt(billAmountInput.value)
  const numberOfPeople = parseInt(numberOfPeopleInput.value)

  const tipAmount = billAmount * (tipPercentage / 100)
  const totalBill = billAmount + tipAmount
  const eachPersonBill = totalBill / numberOfPeople

  tipAmountOutput.innerText = `₹${tipAmount}`
  totalBillOutput.innerText = `₹${totalBill}`
  eachPersonBillOutput.innerText = `₹${eachPersonBill}`

  resetBtn.disabled = false
})

tipsContainer.addEventListener('click', (e) => {
  if (tipsContainer.classList.contains('disabled')) return

  if (e.target !== tipsContainer) {
    ;[...tipsContainer.children].forEach((tip) =>
      tip.classList.remove('selected')
    )
    e.target.classList.add('selected')
    tipPercentage = parseInt(e.target.innerText)
    customTipInput.value = ''

    if (numberOfPeopleInput.value && tipPercentage) {
      generateBillBtn.disabled = false
    } else {
      generateBillBtn.disabled = true
    }
  }
})

customTipInput.addEventListener('input', () => {
  tipPercentage = parseInt(customTipInput.value)
  ;[...tipsContainer.children].forEach((tip) =>
    tip.classList.remove('selected')
  )

  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false
  } else {
    generateBillBtn.disabled = true
  }
})

resetBtn.addEventListener('click', () => {
  tipPercentage = 0
  billAmountInput.value = ''
  customTipInput.value = ''
  numberOfPeopleInput.value = ''
  tipAmountOutput.innerText = ''
  totalBillOutput.innerText = ''
  eachPersonBillOutput.innerText = ''
  ;[...tipsContainer.children].forEach((tip) =>
    tip.classList.remove('selected')
  )

  resetBtn.disabled = true
  generateBillBtn.disabled = true
})

billAmountInput.addEventListener('input', () => {
  if (billAmountInput.value) {
    customTipInput.disabled = false
    numberOfPeopleInput.disabled = false
    tipsContainer.classList.remove('disabled')
  } else {
    customTipInput.disabled = true
    numberOfPeopleInput.disabled = true
    tipsContainer.classList.add('disabled')
  }
})

numberOfPeopleInput.addEventListener('input', () => {
  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false
  } else {
    generateBillBtn.disabled = true
  }
})