function addToCart(cart, product, quantity = 1) {
  if (quantity <= 0) {
    throw new RangeError('Quantity must be greater than 0');
  }

  const existingItem = cart.find(item => item.id === product.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const newQuantity = currentQuantity + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Quantity exceeds stock');
  }

  const newCart = cart.map(item => ({ ...item }));

  if (existingItem) {
    const itemToUpdate = newCart.find(item => item.id === product.id);
    itemToUpdate.quantity = newQuantity;
  } else {
    newCart.push({ ...product, quantity });
  }

  return newCart;
}

function changeQuantity(cart, productId, newQuantity) {
  if (newQuantity <= 0) {
    throw new RangeError('Quantity must be greater than 0');
  }

  const existingItem = cart.find(item => item.id === productId);
  
  if (!existingItem) {
    return cart.map(item => ({ ...item }));
  }

  if (newQuantity > existingItem.stock) {
    throw new RangeError('Quantity exceeds stock');
  }

  const newCart = cart.map(item => ({ ...item }));
  const itemToUpdate = newCart.find(item => item.id === productId);
  itemToUpdate.quantity = newQuantity;

  return newCart;
}

function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId).map(item => ({ ...item }));
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  let delivery = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }

  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;