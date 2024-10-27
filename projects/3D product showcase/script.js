document.querySelector('.product-container').addEventListener('mousemove', (e) => {
    const productCard = document.querySelector('.product-card');
    const rect = productCard.getBoundingClientRect();
    const xAxis = (e.clientX - rect.left - rect.width / 2) / 10;
    const yAxis = (rect.height / 2 - (e.clientY - rect.top)) / 10;
    
    productCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  document.querySelector('.product-container').addEventListener('mouseleave', () => {
    const productCard = document.querySelector('.product-card');
    productCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });
  