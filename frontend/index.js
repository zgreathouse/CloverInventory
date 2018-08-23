const getInventory = () => {
  fetch('http://localhost:5555/api/inventory')
    .then(res => res.json())
    .then(data => {
      let output = "";

      data.elements.forEach(item => {
        output += `
          <ul>
            <li class="">ID: ${item.id}</li>
            <li>Name: ${item.name}</li>
            <li>Price: ${convertPrice(item.price)}</li>
            <li>SKU: ${item.sku}</li>
          </ul>
        `;
      });
      document.getElementById('output').innerHTML = output;
    }).catch(err => {
      console.log(err);
    });
}

getInventory();

const convertPrice = price => {
  let newPrice = price.toString();
  let dollars = newPrice.slice(0, newPrice.length - 2);
  let cents = newPrice.slice(newPrice.length - 2);

  return `$${dollars}.${cents}`
}
