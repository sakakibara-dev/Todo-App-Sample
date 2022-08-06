const shipment = [
  { name: 'item A long long name blah blah blah', quantity: 100, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
  { name: 'item A long long name blah blah blah', quantity: 100, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
];
const inventory = [
  { name: 'item A', quantity: 5, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
  { name: 'item A', quantity: 5, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
  { name: 'item A', quantity: 5, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
  { name: 'item A', quantity: 5, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
];
const inStock = [
  { name: 'item A', quantity: 5, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
];


export let dummyInventory = {shipment, inventory, 'in stock': inStock};