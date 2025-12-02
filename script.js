// Reveal elements on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries =>{
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.12});
revealEls.forEach(el => io.observe(el));

// CV download function
function downloadCV(){
  const cvUrl = 'cv_placeholder.pdf';
  if(cvUrl === 'cv_placeholder.pdf'){
    alert('Please add your CV file named "cv.pdf" to the site folder or replace the download link in index.html');
    return;
  }
  const a = document.createElement('a'); 
  a.href = cvUrl; 
  a.download='Imesh_Rathnayake_CV.pdf'; 
  document.body.appendChild(a); 
  a.click(); 
  a.remove();
}
