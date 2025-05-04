  document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();  
    //Show success message
    document.getElementById('success-message').style.display = 'block';
    
    // hide the form
    document.querySelector('.register').classList.add('form-submitted');
    
    //reset form after delay
    setTimeout(function() {
      document.getElementById('regForm').reset();
    }, 3000);
  });
