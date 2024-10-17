import jsPDF from 'jspdf';

const generateBill = (cartItems, date, totalPrice) => {
  const doc = new jsPDF();

  doc.text('Order Confirmation', 10, 10);
  doc.text(`Date: ${date}`, 10, 20);
  
  let yOffset = 30;
  cartItems.forEach((item) => {
    doc.text(`Name: ${item.name}`, 10, yOffset);
    doc.text(`Price: $${item.price}`, 10, yOffset + 10);
    doc.text(`Quantity: ${item.quantity}`, 10, yOffset + 20);
    yOffset += 30;
  });

  doc.text(`Total Price: $${totalPrice}`, 10, yOffset + 10);
  doc.text(`Bill protected by Toshan Bakery`, 10, yOffset + 20);

  doc.save('order_confirmation.pdf');
};

export default generateBill;
