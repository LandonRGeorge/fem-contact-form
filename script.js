const fnameEl = document.querySelector('#fname')
const lnameEl = document.querySelector("#lname")
const emailEl = document.querySelector("#email")
const queryTypeEls = document.querySelectorAll('[name="query-type"]')
const messageEl = document.querySelector('#message')
const consentEl = document.querySelector('#consent')
const formEl = document.querySelector('form')
const queryTypeControlEls = document.querySelectorAll('.query-type-control')

function validateName(el) {
  el.classList.remove('error-border')
  if (el.value.trim() !== "") {
    return
  }
  const errorEl = document.createElement("p")
  errorEl.classList.add("error")
  errorEl.textContent = "This field is required"
  el.parentElement.appendChild(errorEl)
  el.classList.add('error-border')
}

function validateEmail(el) {
  el.classList.remove('error-border')
  const errorEl = document.createElement("p")
    
  if (el.value.trim() === "") {
    errorEl.textContent = 'This field is required'
  }
  else if (!el.value.includes('@')) {
    errorEl.textContent = 'Please enter a valid email address'
  } else {
    return
  }
  errorEl.classList.add("error")
  el.parentElement.appendChild(errorEl)
  el.classList.add('error-border')
}

function validateQueryType(els) {
  const noneChecked = Array.from(els).find(el => el.checked) === undefined
  
  if (!noneChecked) {
    return
  }
  const errorEl = document.createElement("p")
  errorEl.classList.add("error")
  errorEl.textContent = "Please select a query type"

  els[0].parentElement.parentElement.parentElement.appendChild(errorEl)
}

function validateMessage(el) {
  el.classList.remove('error-border')
  if (el.value.trim() !== "") {
    return
  }
  const errorEl = document.createElement("p")
  errorEl.classList.add("error")
  errorEl.textContent = "This field is required"

  el.parentElement.appendChild(errorEl)
  el.classList.add('error-border')
}

function validateConsent(el) {
  if (el.checked) {
    return
  }
  const errorEl = document.createElement("p")
  errorEl.classList.add("error")
  errorEl.textContent = "To submit this form, please consent to being contacted"

  el.parentElement.parentElement.appendChild(errorEl)
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault()
  
  // remove all errors
  let errorEls = document.querySelectorAll('.error')
  Array.from(errorEls).forEach(e => {
    e.remove();
  })
  
  // remove any existing success banner
  let successEl = document.querySelector('.success')
  if (successEl) {
    successEl.remove()
  }
  
  // check for errors
  validateName(fnameEl)
  validateName(lnameEl)
  validateEmail(emailEl)
  validateQueryType(queryTypeEls)
  validateMessage(messageEl)
  validateConsent(consentEl)

  if (document.querySelectorAll('.error').length !== 0) {
    return
  }

  formEl.insertAdjacentHTML("beforebegin",
    `
  <div class="success">
    <h2>Message Sent!</h2>
    <p>Thanks for completing the form. We'll be in touch soon!</p>
  </div>`
  )

})

queryTypeControlEls.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.add('query-type-selected')
    el.querySelector('input').checked = true;
    queryTypeControlEls.forEach(el => {
      if (!el.querySelector('input').checked) {
        el.classList.remove('query-type-selected')
      }
    })
  })
})