const getInventory = () => {
  fetch('http://localhost:5555/api/inventory/')
    .then(res => res.json())
    .then(data => {
      let output = "";

      data.elements.reverse().forEach(item => {
        output += `
          <ul>
            <li><strong>ID:</strong> ${item.id}</li>
            <li><strong>Name:</strong> ${item.name}</li>
            <li><strong>Price:</strong> ${convertPrice(item.price)}</li>
            <li><strong>SKU:</strong> ${item.sku}</li>
          </ul>
        `;
      });
      document.getElementById('inventory-items').innerHTML = output;
    }).catch(err => {
      console.log("Fetching inventory was unsuccessful :/");
      console.log(err);
    });
}

const convertPrice = price => {
  let newPrice = price.toString();
  let dollars = newPrice.slice(0, newPrice.length - 2);
  let cents = newPrice.slice(newPrice.length - 2);

  return `$${dollars}.${cents}`
}

getInventory();
