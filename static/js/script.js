  // Product to ID mapping
        const productIds = {
            'Classic Milk Tea': 'MT001',
            'Red Velvet Milk Tea': 'MT002',
            'Matcha Milk Tea': 'MT003',
            'Taro Milk Tea': 'MT004',
            'Mango Milk Tea': 'MT005',
            'Okinawa Milk Tea': 'MT006',
            'Hokkaido Milk Tea': 'MT007',
            'Thai Milk Tea': 'MT008',
            'Almond Milk Tea': 'MT009',
            'Chocolate Milkshake': 'MS001',
            'Strawberry Milkshake': 'MS002',
            'Vanilla Milkshake': 'MS003',
            'Honey Lemon Iced Tea': 'TE001',
            'Green Iced Tea': 'TE002',
            'Cucumber Iced Tea': 'TE003',
            'Iced Americano': 'IC001',
            'Iced Latte': 'IC002',
            'Iced Caramel Macchiato': 'IC003',
            'Iced Mocha': 'IC004',
            'Iced Vanilla Latte': 'IC005',
            'Iced Hazelnut Coffee': 'IC006'
        };

        // Carousel functionality
        const slides = document.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;

        const dotsContainer = document.getElementById('carouselDots');
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= totalSlides) next = 0;
            goToSlide(next);
        }

        function prevSlide() {
            let prev = currentSlide - 1;
            if (prev < 0) prev = totalSlides - 1;
            goToSlide(prev);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        document.getElementById('prevSlide').addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });

        document.getElementById('nextSlide').addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });

        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', stopAutoPlay);
        heroSection.addEventListener('mouseleave', startAutoPlay);
        startAutoPlay();

        // Product data
        const basePrices = {
            'Classic Milk Tea': { Small: 69, Medium: 89, Large: 109 },
            'Red Velvet Milk Tea': { Small: 89, Medium: 109, Large: 129 },
            'Matcha Milk Tea': { Small: 79, Medium: 99, Large: 119 },
            'Taro Milk Tea': { Small: 79, Medium: 99, Large: 119 },
            'Mango Milk Tea': { Small: 75, Medium: 95, Large: 115 },
            'Okinawa Milk Tea': { Small: 85, Medium: 105, Large: 125 },
            'Hokkaido Milk Tea': { Small: 95, Medium: 115, Large: 135 },
            'Thai Milk Tea': { Small: 79, Medium: 99, Large: 119 },
            'Almond Milk Tea': { Small: 89, Medium: 109, Large: 129 },
            'Chocolate Milkshake': { Small: 119, Medium: 129, Large: 149 },
            'Strawberry Milkshake': { Small: 119, Medium: 129, Large: 149 },
            'Vanilla Milkshake': { Small: 109, Medium: 119, Large: 139 },
            'Honey Lemon Iced Tea': { Small: 39, Medium: 59, Large: 79 },
            'Green Iced Tea': { Small: 39, Medium: 59, Large: 79 },
            'Cucumber Iced Tea': { Small: 39, Medium: 59, Large: 79 },
            'Iced Americano': { Small: 59, Medium: 79, Large: 99 },
            'Iced Latte': { Small: 79, Medium: 99, Large: 119 },
            'Iced Caramel Macchiato': { Small: 99, Medium: 119, Large: 139 },
            'Iced Mocha': { Small: 89, Medium: 109, Large: 129 },
            'Iced Vanilla Latte': { Small: 79, Medium: 99, Large: 119 },
            'Iced Hazelnut Coffee': { Small: 79, Medium: 99, Large: 119 },
        };

        const productImages = {
            'Classic Milk Tea': 'https://static.vecteezy.com/system/resources/previews/050/704/143/large_2x/bubble-tea-isolated-on-transparent-background-free-png.png',
            'Red Velvet Milk Tea': 'https://t4.ftcdn.net/jpg/08/81/39/93/360_F_881399316_uLbfXpfqRYlQvcAV8cQVOOWpeUGrBDRv.jpg',
            'Matcha Milk Tea': 'https://static.vecteezy.com/system/resources/previews/050/704/552/large_2x/green-bubble-tea-isolated-on-transparent-background-png.png',
            'Taro Milk Tea' : 'https://img.freepik.com/premium-photo/purple-milk-bubble-tea-with-black-straw_1151123-6535.jpg',
            'Mango Milk Tea': 'https://t4.ftcdn.net/jpg/08/14/52/59/360_F_814525998_6EKW9JkPMn9hdzH05Q1yo0rkx5cfobGW.jpg',
            'Okinawa Milk Tea': 'https://static.vecteezy.com/system/resources/previews/044/813/401/original/bubble-tea-isolated-on-transparent-background-free-png.png',
            'Hokkaido Milk Tea': 'https://static.vecteezy.com/system/resources/previews/027/145/741/original/brown-sugar-bubble-boba-drink-milk-tea-perfect-for-drink-catalog-ai-generated-png.png',
            'Thai Milk Tea': 'https://static.vecteezy.com/system/resources/thumbnails/048/082/937/small_2x/oolong-milk-boba-tea-on-a-plastic-glass-with-a-straw-on-a-transparent-background-png.png',
            'Almond Milk Tea': 'https://static.vecteezy.com/system/resources/previews/048/082/939/original/hokkaido-milk-boba-tea-on-a-plastic-glass-with-a-straw-on-a-transparent-background-png.png',
            'Chocolate Milkshake':'https://static.vecteezy.com/system/resources/previews/036/291/624/non_2x/ai-generated-chocolate-milkshake-with-transparent-background-ai-png.png',
            'Strawberry Milkshake': 'https://static.vecteezy.com/system/resources/previews/054/565/828/large_2x/a-strawberry-milkshake-with-whipped-cream-and-a-straw-free-png.png',
            'Vanilla Milkshake': 'https://static.vecteezy.com/system/resources/previews/045/621/249/large_2x/cold-drink-milkshake-isolated-png.png',
            'Honey Lemon Iced Tea' : 'https://tse3.mm.bing.net/th/id/OIP.no4sI2ovW29h3nGjmC-jdwHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3',
            'Green Iced Tea': 'https://img.freepik.com/premium-photo/green-plastic-cup-with-green-straw-it_811830-10718.jpg?w=2000',
            'Cucumber Iced Tea': 'https://static.vecteezy.com/system/resources/previews/058/325/374/large_2x/green-drink-in-a-plastic-cup-isolated-on-transparent-background-png.png',
            'Iced Americano': 'https://static.vecteezy.com/system/resources/previews/037/747/941/non_2x/ai-generated-iced-coffee-isolated-png.png',
            'Iced Latte':'https://tse3.mm.bing.net/th/id/OIP.LpkFG-GD_PZlTnVMggdsJQHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3',
            'Iced Caramel Macchiato': 'https://thumbs.dreamstime.com/b/refreshing-iced-coffee-drink-cream-ice-cubes-served-clear-plastic-cup-straw-white-background-summer-tempting-346160477.jpg',
            'Iced Mocha': 'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-ice-coffee-in-plastic-cup-with-straw-3d-illustration-png-png-image_9207683.png',
            'Iced Vanilla Latte':'https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-iced-coffee-or-caffe-latte-in-cup-file-png-png-image_10089866.png',
            'Iced Hazelnut Coffee':'https://img.freepik.com/premium-photo/glass-iced-coffee-with-black-straw-white-background_787273-1955.jpg',
        };   

        const categories = {
            'Milk Tea': ['Classic Milk Tea', 'Red Velvet Milk Tea', 'Matcha Milk Tea', 'Taro Milk Tea', 'Mango Milk Tea', 'Okinawa Milk Tea', 'Hokkaido Milk Tea', 'Thai Milk Tea', 'Almond Milk Tea'],
            'Milkshake': ['Chocolate Milkshake', 'Strawberry Milkshake', 'Vanilla Milkshake'],
            'Tea': ['Honey Lemon Iced Tea', 'Green Iced Tea', 'Cucumber Iced Tea'],
            'Iced Coffee': ['Iced Americano', 'Iced Latte', 'Iced Caramel Macchiato', 'Iced Mocha', 'Iced Vanilla Latte', 'Iced Hazelnut Coffee'],
        };

        let cart = [];
        let quantities = {};
        let selectedSizes = {};
        let currentCategory = 'all';
        let selectedPaymentMethod = 'Cash';

        // Function to load cart from backend
        function loadCartFromBackend() {
            fetch('/api/cart')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.cart) {
                        cart = data.cart;
                        updateCartUI();
                    }
                })
                .catch(err => console.error('Error loading cart:', err));
        }

        // Function to add item to backend cart
       function addToBackendCart(productId, quantity, size) {
    console.log("Sending to backend:", {product_id: productId, quantity: quantity, size: size});
    
    return fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: productId,
            quantity: quantity,
            size: size
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Backend response:", data);
        if (data.success) {
            loadCartFromBackend();
            return true;
        } else {
            showToast(data.message || 'Error adding to cart', 'error');
            return false;
        }
    })
    .catch(err => {
        console.error('Error:', err);
        showToast('Error connecting to server', 'error');
        return false;
    });
}

        // Function to update cart item in backend
        function updateBackendCart(productId, quantity, size) {
            if (quantity <= 0) {
                return removeFromBackendCart(productId, size);
            }
            
            return fetch('/api/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: quantity,
                    size: size
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    loadCartFromBackend();
                    return true;
                }
                return false;
            })
            .catch(err => console.error('Error:', err));
        }

        // Function to remove item from backend cart
        function removeFromBackendCart(productId, size) {
            return fetch('/api/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    size: size
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    loadCartFromBackend();
                    return true;
                }
                return false;
            })
            .catch(err => console.error('Error:', err));
        }

        // Function to clear backend cart
        function clearBackendCart() {
            return fetch('/api/cart/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    loadCartFromBackend();
                    return true;
                }
                return false;
            })
            .catch(err => console.error('Error:', err));
        }

        function getDescription(name) {
            const descriptions = {
                'Classic Milk Tea': 'Traditional black milk tea with chewy pearls',
                'Red Velvet Milk Tea': 'Caramelized brown sugar with fresh milk',
                'Matcha Milk Tea': 'Premium Japanese matcha green tea',
                'Taro Milk Tea': 'Creamy taro flavor with a purple hue',
                'Mango Milk Tea': 'Sweet mango with creamy milk tea',
                'Okinawa Milk Tea': 'Brown sugar caramel flavor',
                'Hokkaido Milk Tea': 'Creamy Japanese milk tea',
                'Thai Milk Tea': 'Sweet and spicy Thai tea',
                'Almond Milk Tea': 'Nutty almond flavor',
                'Chocolate Milkshake': 'Rich chocolate milkshake',
                'Strawberry Milkshake': 'Sweet strawberry milkshake',
                'Vanilla Milkshake': 'Classic vanilla milkshake',
                'Honey Lemon Iced Tea': 'Refreshing honey lemon iced tea',
                'Green Iced Tea': 'Refreshing green tea',
                'Cucumber Iced Tea': 'Fragrant jasmine tea',
                'Iced Americano': 'Smooth black iced coffee',
                'Iced Latte': 'Espresso with fresh milk',
                'Iced Caramel Macchiato': 'Caramel vanilla delight',
                'Iced Mocha': 'Chocolate coffee blend',
                'Iced Vanilla Latte': 'Smooth vanilla coffee',
                'Iced Hazelnut Coffee': 'Nutty hazelnut flavor'
            };
            return descriptions[name] || 'Delicious refreshment';
        }

        function displayProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';
            
            for (const [category, productNames] of Object.entries(categories)) {
                if (currentCategory !== 'all' && currentCategory !== category) continue;
                
                productNames.forEach(name => {
                    if (!quantities[name]) quantities[name] = 1;
                    if (!selectedSizes[name]) selectedSizes[name] = 'Medium';
                    
                    const imgUrl = productImages[name] || 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=250&fit=crop';
                    const price = basePrices[name][selectedSizes[name]];
                    
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <div class="product-image">
                            <img src="${imgUrl}" alt="${name}">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${name}</h3>
                            <p class="product-desc">${getDescription(name)}</p>
                            <div class="size-selector">
                                <button class="size-btn ${selectedSizes[name] === 'Small' ? 'active' : ''}" data-name="${name}" data-size="Small">S</button>
                                <button class="size-btn ${selectedSizes[name] === 'Medium' ? 'active' : ''}" data-name="${name}" data-size="Medium">M</button>
                                <button class="size-btn ${selectedSizes[name] === 'Large' ? 'active' : ''}" data-name="${name}" data-size="Large">L</button>
                            </div>
                            <div class="product-price" id="price-${name.replace(/ /g, '_')}">PHP ${price}.00</div>
                            <div class="quantity-control">
                                <button class="qty-btn" data-name="${name}" data-delta="-1">-</button>
                                <span class="qty-value" id="qty-${name.replace(/ /g, '_')}">${quantities[name]}</span>
                                <button class="qty-btn" data-name="${name}" data-delta="1">+</button>
                            </div>
                            <button class="add-btn" data-name="${name}">Add to Cart</button>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
            
            // Add event listeners for dynamic buttons
            document.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = btn.dataset.name;
                    const size = btn.dataset.size;
                    selectSize(name, size);
                });
            });
            
            document.querySelectorAll('.qty-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = btn.dataset.name;
                    const delta = parseInt(btn.dataset.delta);
                    changeQuantity(name, delta);
                });
            });
            
            document.querySelectorAll('.add-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const name = btn.dataset.name;
                    await addToCart(name);
                });
            });
        }

        function selectSize(name, size) {
            selectedSizes[name] = size;
            const priceEl = document.getElementById(`price-${name.replace(/ /g, '_')}`);
            if (priceEl) {
                priceEl.textContent = `PHP ${basePrices[name][size]}.00`;
            }
            // Update active state on size buttons
            const card = priceEl.closest('.product-card');
            const btns = card.querySelectorAll('.size-btn');
            btns.forEach(btn => {
                if (btn.textContent === size.charAt(0)) btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }

        function changeQuantity(name, delta) {
            const newQty = quantities[name] + delta;
            if (newQty >= 1 && newQty <= 99) {
                quantities[name] = newQty;
                const qtyEl = document.getElementById(`qty-${name.replace(/ /g, '_')}`);
                if (qtyEl) qtyEl.textContent = newQty;
            }
        }

        async function addToCart(name) {
    let size = selectedSizes[name];
    // Convert size to S, M, L format for backend
    let sizeCode = '';
    if (size === 'Small') sizeCode = 'S';
    else if (size === 'Medium') sizeCode = 'M';
    else if (size === 'Large') sizeCode = 'L';
    
    const qty = quantities[name];
    const productId = productIds[name];
    
    console.log("Adding to cart:", {productId, qty, sizeCode}); // Debug
    
    if (!productId) {
        showToast('Product ID not found', 'error');
        return;
    }
    
    const success = await addToBackendCart(productId, qty, sizeCode);
    
    if (success) {
        quantities[name] = 1;
        const qtyEl = document.getElementById(`qty-${name.replace(/ /g, '_')}`);
        if (qtyEl) qtyEl.textContent = '1';
        showToast(`Added ${qty}x ${name} (${size})`);
    }
}
        function updateCartUI() {
            const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
            const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
            
            document.getElementById('cartCountNav').textContent = totalItems;
            document.getElementById('cartTotal').textContent = `PHP ${total}.00`;
            
            const container = document.getElementById('cartItems');
            if (cart.length === 0) {
                container.innerHTML = '<div style="text-align:center;padding:2rem;color:#999;"><i class="fas fa-shopping-cart" style="font-size:3rem;"></i><p>Your cart is empty</p></div>';
                return;
            }
            
            container.innerHTML = cart.map((item, idx) => `
                <div class="cart-item">
                    <div class="cart-item-image"><img src="${productImages[item.name] || 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=60&h=60&fit=crop'}"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-size">Size: ${item.size || 'Regular'}</div>
                        <div class="cart-item-price">PHP ${item.price}.00</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="updateCartItem('${item.id}', ${item.quantity - 1}, '${item.size || ''}')">-</button>
                        <span style="min-width:30px;text-align:center;">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartItem('${item.id}', ${item.quantity + 1}, '${item.size || ''}')">+</button>
                        <button class="cart-qty-btn" onclick="removeCartItem('${item.id}', '${item.size || ''}')" style="background:#ef5350;color:white;">x</button>
                    </div>
                </div>
            `).join('');
        }

        async function updateCartItem(productId, qty, size) {
            if (qty <= 0) {
                await removeFromBackendCart(productId, size);
            } else {
                await updateBackendCart(productId, qty, size);
            }
        }

        async function removeCartItem(productId, size) {
            await removeFromBackendCart(productId, size);
            showToast('Item removed');
        }

        async function clearCart() {
            if (confirm('Clear your cart?')) {
                await clearBackendCart();
                showToast('Cart cleared');
            }
        }



        function ensureCashAmountInput() {
            const body = document.querySelector('#paymentModal .receipt-body');
            if (!body || document.getElementById('cashAmountBox')) return;
            const box = document.createElement('div');
            box.id = 'cashAmountBox';
            box.style.display = 'block';
            box.style.margin = '1rem 0';
            box.innerHTML = `
                <label style="display:block;font-weight:700;color:#2e7d32;margin-bottom:6px;">Cash Amount Received</label>
                <input id="cashAmountInput" type="number" min="0" step="1" placeholder="Enter customer cash" style="width:100%;padding:12px;border:2px solid #c8e6c9;border-radius:12px;font-size:1rem;outline:none;">
                <small style="display:block;margin-top:6px;color:#666;">Required for Cash payment to compute sukli/change.</small>
            `;
            const confirmBtn = document.getElementById('confirmPaymentBtn');
            body.insertBefore(box, confirmBtn);
        }

        function updateCashAmountVisibility() {
            ensureCashAmountInput();
            const box = document.getElementById('cashAmountBox');
            if (box) box.style.display = selectedPaymentMethod === 'Cash' ? 'block' : 'none';
        }

        function showPaymentModal() {
            if (cart.length === 0) {
                showToast('Your cart is empty', 'error');
                return;
            }
            updateCashAmountVisibility();
            document.getElementById('paymentModal').classList.add('active');
        }

        function closePaymentModal() {
            document.getElementById('paymentModal').classList.remove('active');
        }

        function checkout() {
            showPaymentModal();
        }

        async function processCheckout() {
            const method = selectedPaymentMethod;
            
            if (cart.length === 0) {
                showToast('Cart is empty!', 'error');
                closePaymentModal();
                return;
            }
            
            // Send ONLY the payment method - backend will get cart from session
            let amountPaid = null;
            if (method === 'Cash') {
                const cashInput = document.getElementById('cashAmountInput');
                amountPaid = parseFloat(cashInput ? cashInput.value : 0);
                const total = cart.reduce((s, i) => s + (parseFloat(i.price) * parseInt(i.quantity)), 0);
                if (!amountPaid || amountPaid < total) {
                    showToast(`Cash amount must be at least PHP ${total}.00`, 'error');
                    return;
                }
            }

            const checkoutData = {
                payment_method: method,
                amount_paid: amountPaid
            };
            
            console.log("Sending checkout request with:", checkoutData);
            
            try {
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(checkoutData)
                });
                
                const data = await response.json();
                console.log("Server Response:", data);
                
                if (data.success) {
                    // Show receipt with the returned data
                    const total = data.total_amount;
                    const orderId = data.order_id;
                    const date = new Date().toLocaleString();
                    
                    let itemsHtml = '';
                    data.cart.forEach(item => {
                        const sizeText = item.size ? ` (${item.size})` : '';
                        itemsHtml += `<div class="receipt-row">
                            <span>${item.name}${sizeText} x${item.quantity}</span>
                            <span>PHP ${(item.price * item.quantity)}.00</span>
                        </div>`;
                    });
                    
                    document.getElementById('receiptContent').innerHTML = `
                        <div class="receipt-row"><span>Order #:</span><span><strong>${orderId}</strong></span></div>
                        <div class="receipt-row"><span>Date:</span><span>${date}</span></div>
                        <div class="receipt-row"><span>Payment:</span><span>${method}</span></div>
                        <div class="receipt-row"><span>Amount Paid:</span><span>PHP ${data.payment_info.amount_paid}.00</span></div>
                        <div class="receipt-row"><span>Change/Sukli:</span><span>PHP ${data.payment_info.change}.00</span></div>
                        ${itemsHtml}
                        <div class="receipt-total"><span>Total:</span><span>PHP ${total}.00</span></div>
                        <button class="close-modal-btn" onclick="closeReceipt()">Continue Shopping</button>
                    `;
                    
                    document.getElementById('receiptModal').classList.add('active');
                    closePaymentModal();
                    
                    // Reload cart (should be empty now)
                    await loadCartFromBackend();
                    
                    // Close cart sidebar
                    document.getElementById('cartSidebar').classList.remove('active');
                    document.getElementById('cartOverlay').classList.remove('active');
                    
                    showToast("Order saved successfully!");
                } else {
                    showToast(data.message || "Checkout failed!", "error");
                    closePaymentModal();
                }
            } catch (err) {
                console.error("Checkout error:", err);
                showToast("Error connecting to server! Make sure the server is running.", "error");
                closePaymentModal();
            }
        }
        
        function setupPaymentOptions() {
            const options = document.querySelectorAll('.payment-option');
            options.forEach(option => {
                option.onclick = () => {
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    selectedPaymentMethod = option.dataset.method;
                    updateCashAmountVisibility();
                };
            });
            if (options.length > 0) {
                options[0].classList.add('selected');
                selectedPaymentMethod = options[0].dataset.method;
                updateCashAmountVisibility();
            }
        }

        function closeReceipt() {
            document.getElementById('receiptModal').classList.remove('active');
        }

        function showToast(msg, type = 'success') {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${msg}`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        // Event listeners
        document.getElementById('orderNowHeroBtn').onclick = () => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('scrollIndicator').onclick = () => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('cartIconNav').onclick = () => {
            document.getElementById('cartSidebar').classList.add('active');
            document.getElementById('cartOverlay').classList.add('active');
        };
        document.getElementById('closeCart').onclick = () => {
            document.getElementById('cartSidebar').classList.remove('active');
            document.getElementById('cartOverlay').classList.remove('active');
        };
        document.getElementById('cartOverlay').onclick = () => {
            document.getElementById('cartSidebar').classList.remove('active');
            document.getElementById('cartOverlay').classList.remove('active');
        };
        document.getElementById('checkoutBtn').onclick = checkout;
        document.getElementById('clearCartBtn').onclick = clearCart;
        document.getElementById('confirmPaymentBtn').onclick = processCheckout;
        document.getElementById('cancelPaymentBtn').onclick = closePaymentModal;
        
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentCategory = tab.dataset.category;
                displayProducts();
            };
        });
        
        // Initialize
        setupPaymentOptions();
        displayProducts();
        loadCartFromBackend(); // Load cart from backend on startup