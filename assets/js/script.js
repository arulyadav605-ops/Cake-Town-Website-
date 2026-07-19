// --- Products Data ---
const products = [
    {
        id: "1",
        name: "Classic Red Velvet",
        description: "A rich, moist red velvet cake layered with signature cream cheese frosting.",
        price: 1200,
        weight: "1 kg",
        category: "Anniversary",
        imageUrl: "https://images.unsplash.com/photo-1586788224331-947f68671caf?q=80&w=800&auto=format&fit=crop",
        isEggless: false
    },
    {
        id: "2",
        name: "Truffle Chocolate Dream",
        description: "Decadent dark chocolate truffle cake with a mirror glaze finish.",
        price: 1500,
        weight: "1 kg",
        category: "Birthday",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
        isEggless: true
    },
    {
        id: "3",
        name: "Golden Vanilla Floral",
        description: "Elegant vanilla cake adorned with handcrafted buttercream flowers.",
        price: 2200,
        weight: "2 kg",
        category: "Wedding",
        imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop",
        isEggless: false
    },
    {
        id: "4",
        name: "Mango Pistachio Delight",
        description: "Seasonal mango cake layered with roasted pistachios and mascarpone.",
        price: 1400,
        weight: "1 kg",
        category: "Designer",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop",
        isEggless: true
    },
    {
        id: "5",
        name: "Macaron Topped Pastel",
        description: "A soft pink strawberry cake topped with assorted French macarons.",
        price: 1800,
        weight: "1 kg",
        category: "Kids",
        imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop",
        isEggless: false
    },
    {
        id: "6",
        name: "Midnight Mocha",
        description: "Coffee infused sponge with espresso buttercream and chocolate shards.",
        price: 1300,
        weight: "1 kg",
        category: "Chocolate",
        imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop",
        isEggless: true
    }
];

// --- State ---
let cart = [];

// --- Navigation Logic ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
    const targetPage = document.getElementById('page-' + pageId);
    if(targetPage) {
        targetPage.classList.remove('hidden');
    }
    window.scrollTo(0, 0);
    
    if (pageId === 'menu') renderProducts();
    if (pageId === 'cart') renderCart();
}

// Make sure functions are available globally
window.showPage = showPage;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.proceedToCheckout = proceedToCheckout;

// --- Cart Logic ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    alert(product.name + ' added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            renderCart();
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById('cart-count');
    if (totalItems > 0) {
        countEl.textContent = totalItems;
        countEl.classList.remove('hidden');
    } else {
        countEl.classList.add('hidden');
    }
}

// --- Render Functions ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="glass rounded-[40px] flex flex-col group overflow-hidden border border-white/40 shadow-sm transition-all hover:shadow-md">
            <div class="relative aspect-square overflow-hidden bg-[#FCE4EC] rounded-t-[40px]">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                ${product.isEggless ? \`<span class="absolute top-4 left-4 glass text-green-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Eggless</span>\` : ''}
            </div>
            <div class="p-6 flex-1 flex flex-col bg-white/20">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-serif text-xl font-bold text-[#3C2A21] leading-tight">${product.name}</h3>
                </div>
                <p class="text-[#3C2A21]/70 text-xs mb-4 line-clamp-2">${product.description}</p>
                <div class="flex justify-between items-center mt-auto pt-4 border-t border-[#3C2A21]/10">
                    <div>
                        <span class="text-lg font-bold text-[#3C2A21]">₹${product.price}</span>
                        <span class="text-[10px] text-[#3C2A21]/60 ml-1">/ ${product.weight}</span>
                    </div>
                    <button onclick="addToCart('${product.id}')" class="flex items-center gap-2 btn-gold text-white px-5 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest hover:brightness-110 transition-all">
                        Buy
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    const container = document.getElementById('cart-content-container');
    if(!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="w-full text-center py-20 glass rounded-[40px] border border-white/40 shadow-sm">
                <p class="text-[#3C2A21]/60 mb-6 font-medium">Your cart is empty.</p>
                <button onclick="showPage('menu')" class="btn-gold text-white px-8 py-4 uppercase tracking-widest text-xs font-bold transition-all rounded-full">Explore Menu</button>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const delivery = 100;
    const total = subtotal + gst + delivery;

    const itemsHtml = cart.map(item => `
        <div class="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-[#3C2A21]/10 last:border-0 last:pb-0">
            <img src="${item.imageUrl}" class="w-24 h-24 object-cover rounded-2xl shadow-sm" alt="${item.name}">
            <div class="flex-1 text-center sm:text-left">
                <h3 class="font-serif text-lg font-bold text-[#3C2A21]">${item.name}</h3>
                <p class="text-[#3C2A21]/60 text-xs mt-1">${item.weight}</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center border border-white rounded-full bg-white/40 shadow-sm">
                    <button onclick="updateQuantity('${item.id}', -1)" class="px-3 py-1 text-[#3C2A21] hover:text-[#D4AF37] font-bold">-</button>
                    <span class="w-6 text-center text-sm font-bold text-[#3C2A21]">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)" class="px-3 py-1 text-[#3C2A21] hover:text-[#D4AF37] font-bold">+</button>
                </div>
                <div class="w-20 text-right font-bold text-[#3C2A21]">₹${item.price * item.quantity}</div>
                <button onclick="removeFromCart('${item.id}')" class="text-red-400 hover:text-red-600 p-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="lg:w-2/3">
            <div class="glass rounded-[40px] p-6 md:p-8 space-y-8 border border-white/40 shadow-sm bg-white/20">
                ${itemsHtml}
            </div>
        </div>
        <div class="lg:w-1/3">
            <div class="glass rounded-[40px] p-8 border border-white/40 sticky top-24 shadow-sm bg-white/20">
                <h3 class="font-serif text-2xl text-[#3C2A21] mb-6">Order Summary</h3>
                <div class="space-y-4 text-sm text-[#3C2A21]/70 mb-8">
                    <div class="flex justify-between"><span>Subtotal</span><span class="font-bold text-[#3C2A21]">₹${subtotal.toFixed(2)}</span></div>
                    <div class="flex justify-between"><span>GST (18%)</span><span class="font-bold text-[#3C2A21]">₹${gst.toFixed(2)}</span></div>
                    <div class="flex justify-between"><span>Delivery</span><span class="font-bold text-[#3C2A21]">₹${delivery.toFixed(2)}</span></div>
                    <div class="border-t border-[#3C2A21]/10 pt-4 flex justify-between text-lg font-bold text-[#3C2A21]">
                        <span>Total</span>
                        <span>₹${total.toFixed(2)}</span>
                    </div>
                </div>
                <button onclick="proceedToCheckout(${total})" class="w-full btn-gold text-white px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold transition-all">Checkout</button>
            </div>
        </div>
    `;
}

function proceedToCheckout(total) {
    const checkoutTotal = document.getElementById('checkout-total');
    if(checkoutTotal) {
        checkoutTotal.textContent = '₹' + total.toFixed(2);
    }
    showPage('checkout');
}

// --- Checkout Form Handling ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            cart = [];
            updateCartCount();
            showPage('success');
        });
    }

    // Init App
    renderProducts();
    updateCartCount();
});
