console.log("Script loaded"); // Log when the script is loaded

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submitted"); // Log when the form is submitted
        
        // Get form values
        var passwordLength = parseInt(document.getElementById("password-length").value);
        var includeUppercase = document.getElementById("include-uppercase").checked;
        var includeSymbols = document.getElementById("include-symbols").checked;
        var includeNumbers = document.getElementById("include-numbers").checked;

        // Log submission settings
        console.log("Submission Settings:");
        console.log("Password Length:", passwordLength);
        console.log("Include Uppercase:", includeUppercase);
        console.log("Include Symbols:", includeSymbols);
        console.log("Include Numbers:", includeNumbers);

        // Generate password
        var generatedPassword = generatePassword(passwordLength, includeUppercase, includeSymbols, includeNumbers);
        console.log("Generated Password:", generatedPassword); // Log the generated password

        // Display generated password
        document.getElementById("password").value = generatedPassword;

        // Calculate and update password strength
        updatePasswordStrength(generatedPassword, characters.length);
    });
});

function generatePassword(passwordLength, includeUppercase, includeSymbols, includeNumbers) {
    var characters = 'abcdefghijklmnopqrstuvwxyz'; // The characters to choose from when generating the password
    
    if (includeUppercase) { // If true
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Add uppercase letters to the characters
    }
    if (includeSymbols) {
        characters += '!@#$%^&*()-_=+[{]}|;:,<.>/?'; // Add symbols
    }
    if (includeNumbers) {
        characters += '0123456789'; // Add numbers
    }

    if (characters.length === 0) {
        throw new Error("At least one character type must be included");
    }

    function generatePasswordString(charset, length) {
        var password = "";
        for (var i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));       
        }
        return password;
    }
    
    return generatePasswordString(characters, passwordLength);
}

function calculateEntropy(password, charsetSize) {
    var combinations = Math.pow(charsetSize, password.length);
    var entropy = Math.log2(combinations);
    return entropy;
}

function updatePasswordStrength(password, charsetSize) {
    var entropy = calculateEntropy(password, charsetSize);
    console.log("Entropy:", entropy);
    
    var strengthPercentage = (entropy / 128) * 100; // Assuming a maximum entropy of 128 bits for a strong password
    console.log("Strength Percentage:", strengthPercentage);

    var strengthBar = document.getElementById("password-strength-bar");
    strengthBar.style.width = strengthPercentage + "%";
    
    // Update bar color based on strength
    if (strengthPercentage < 25) {
        console.log("Weak Password");
        strengthBar.classList.add("password-strength-weak");
        strengthBar.classList.remove("password-strength-medium", "password-strength-strong");
    } else if (strengthPercentage >= 25 && strengthPercentage < 75) {
        console.log("Medium Password");
        strengthBar.classList.add("password-strength-medium");
        strengthBar.classList.remove("password-strength-weak", "password-strength-strong");
    } else {
        console.log("Strong Password");
        strengthBar.classList.add("password-strength-strong");
        strengthBar.classList.remove("password-strength-weak", "password-strength-medium");
    }
}

// Example usage:
var characters = 'abcdefghijklmnopqrstuvwxyz'; // Define the character set used to generate the password
