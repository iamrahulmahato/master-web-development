document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('dragstart', dragStart);
    sticker.addEventListener('dragend', dragEnd);
  });
  
  function dragStart(event) {
    const { target } = event;
    target.style.opacity = "0.6";
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  
  function dragEnd(event) {
    const { target } = event;
    target.style.opacity = "1";
    target.style.transform += ` rotate(${getRandomRotation()}deg)`;
  }
  
  document.querySelector('.scrapbook').addEventListener('dragover', (event) => {
    event.preventDefault();
    const sticker = document.querySelector(`[data-id='${event.dataTransfer.getData("text/plain")}']`);
    sticker.style.position = 'absolute';
    sticker.style.left = `${event.clientX - sticker.clientWidth / 2}px`;
    sticker.style.top = `${event.clientY - sticker.clientHeight / 2}px`;
  });
  
  function getRandomRotation() {
    return Math.floor(Math.random() * 20) - 10; // Rotation between -10 and 10 degrees
  }
  