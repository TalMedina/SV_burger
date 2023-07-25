const showPassword = () => {
    const pass = document.getElementById('password')
    const cPass = document.getElementById('confirmPassword')
    
    if (pass.type == 'password') {
        pass.type = 'text'
        cPass.type = 'text'
    }
    else {
        pass.type = 'password'
        cPass.type = 'password'
    }
}

const valid = () => {
    const firstName = document.forms['register_form']['firstName'].value;
    const lastName = document.forms['register_form']['lastName'].value;
    const email = document.forms['register_form']['email'].value;
    const password = document.forms['register_form']['password'].value;
    const confirmPassword = document.forms['register_form']['confirmPassword'].value;

    const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
    let emailCounter = 0

    // first name check 
    if (firstName.length < 2 || firstName.length > 20) {
        alert('First name must be between 2 - 20');
        return false
    }
    // last name check
    if (lastName.length  < 2 || lastName.length > 20) {
        alert('Last name must be between 2 - 20');
        return false
    }
    // email checkes by counter
    if (!email.includes('yahoo')) {
        emailCounter ++
    }
    if (!email.includes('gmail')) {
        emailCounter ++
    }
    if (emailCounter == 2) {
        alert('Email must be gmail or yahoo')
        return false
    }
    // check passwod length
    if (password.length < 2 || password.length > 20) {
        return false
    }
    // check if includes spacial chars !!!
    const result = specialChars.split('').some(specialChar => {
        if (!password.includes(specialChar)) {
            return false
        }
        return true;
    });
    // only if result is false return
    if (result == false) {
        alert('password must contain special chars')
        return result
    }
    // check if passwords are eqwal
    if (password != confirmPassword) {
        alert('Passwords must mach')
        return false
    }



    // if all correct   
    if (emailCounter < 2) {
        return true
    }
}



    const signIn =()=>{

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        
        
        fetch('/signin',{
        headers:{ 'Accept': 'application/json',
        'Content-Type': 'application/json'},
        method:'post',
        body:JSON.stringify({
        email:email,
        password:password
        })
        
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
// if user not found data == null
        if(data == null){
            alert('user not found')
        }else{
        console.log(data.firstName);
        let userFirstName = data.firstName
        localStorage.setItem('firstName',userFirstName)
        location.href = "/menu"
        }
        })
    }
    // adds fist name to hello in menu
    let userNameFromLocall = localStorage.getItem('firstName');
    document.getElementById('hello').innerHTML +=userNameFromLocall;

    const pay = () => {
        location.href = "/pay"
    }
