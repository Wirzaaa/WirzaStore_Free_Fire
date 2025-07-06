  // Produk Diamond Free Fire
        const products = [
            { id: 1, amount: '70 Diamond', price: 10000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 2, amount: '140 Diamond', price: 18000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 3, amount: '210 Diamond', price: 27000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 4, amount: '280 Diamond', price: 36000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 5, amount: '355 Diamond', price: 45000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 6, amount: '425 Diamond', price: 54000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 7, amount: '500 Diamond', price: 63000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 8, amount: '720 Diamond', price: 90000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 9, amount: '860 Diamond', price: 105000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 10, amount: '1000 Diamond', price: 120000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 11, amount: '1440 Diamond', price: 170000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
            { id: 12, amount: '2000 Diamond', price: 230000, img: 'https://ts2.mm.bing.net/th?id=OIP.IfcvDmeQ3Djz-Z7PMV4joQHaFj&pid=15.1' },
        ];

        // Keranjang
        let cart = [];

        // Helper: format harga
        function formatRupiah(num) {
            return 'Rp ' + num.toLocaleString('id-ID');
        }

        // Render produk
        function renderProducts() {
            const grid = document.getElementById('productGrid');
            grid.innerHTML = '';
            products.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img class="diamond-icon" src="${prod.img}" alt="Diamond FF">
                    <div class="product-amount">${prod.amount}</div>
                    <div class="product-price">${formatRupiah(prod.price)}</div>
                    <button class="add-cart-btn" data-id="${prod.id}">Tambah ke Keranjang</button>
                `;
                grid.appendChild(card);
            });
        }

        // Tambah ke keranjang
        function addToCart(prodId) {
            const prod = products.find(p => p.id === prodId);
            if (!prod) return;
            const idx = cart.findIndex(item => item.id === prodId);
            if (idx > -1) {
                cart[idx].qty += 1;
            } else {
                cart.push({ ...prod, qty: 1 });
            }
            updateCartCount();
            animateCartIcon();
        }

        // Update jumlah item di cart icon
        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            document.getElementById('cartCount').textContent = count;
        }

        // Render isi keranjang
        function renderCart() {
            const itemsDiv = document.getElementById('cartItems');
            const totalDiv = document.getElementById('cartTotal');
            itemsDiv.innerHTML = '';
            if (cart.length === 0) {
                itemsDiv.innerHTML = '<div class="cart-empty">Keranjang masih kosong.</div>';
                totalDiv.textContent = '';
                return;
            }
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.qty;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.img}" alt="Diamond" class="cart-item-img">
                        <span class="cart-item-amount">${item.amount} × ${item.qty}</span>
                        <span class="cart-item-price">${formatRupiah(item.price * item.qty)}</span>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}" title="Hapus">&times;</button>
                `;
                itemsDiv.appendChild(itemDiv);
            });
            totalDiv.textContent = 'Total: ' + formatRupiah(total);
        }

        // Hapus item dari keranjang
        function removeFromCart(prodId) {
            cart = cart.filter(item => item.id !== prodId);
            updateCartCount();
            renderCart();
        }

        // Modal keranjang
        const cartBtn = document.getElementById('cartBtn');
        const cartModalBg = document.getElementById('cartModalBg');
        const cartCloseBtn = document.getElementById('cartCloseBtn');
        cartBtn.onclick = () => {
            renderCart();
            cartModalBg.classList.add('active');
            document.body.classList.add('modal-open');
        };
        cartCloseBtn.onclick = closeCartModal;
        cartModalBg.onclick = function (e) {
            if (e.target === cartModalBg) closeCartModal();
        };
        function closeCartModal() {
            cartModalBg.classList.remove('active');
            document.body.classList.remove('modal-open');
        }

        // Event delegation untuk tombol di produk dan cart
        document.addEventListener('click', function (e) {
            // Tambah ke keranjang
            if (e.target.classList.contains('add-cart-btn')) {
                const prodId = parseInt(e.target.dataset.id);
                addToCart(prodId);
                // Animasi kartu ke cart
                animateAddToCart(e.target);
            }
            // Hapus dari keranjang
            if (e.target.classList.contains('cart-item-remove')) {
                const prodId = parseInt(e.target.dataset.id);
                removeFromCart(prodId);
            }
        });

        // Animasi glowing pada cart icon
        function animateCartIcon() {
            const icon = document.getElementById('cartBtn');
            icon.classList.add('glow');
            setTimeout(() => icon.classList.remove('glow'), 500);
        }

        // Animasi kartu produk ke cart
        function animateAddToCart(btn) {
            const card = btn.closest('.product-card');
            const img = card.querySelector('.diamond-icon');
            const cartIcon = document.getElementById('cartBtn');
            const imgRect = img.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();
            const clone = img.cloneNode(true);
            clone.style.position = 'fixed';
            clone.style.zIndex = 99999;
            clone.style.left = imgRect.left + 'px';
            clone.style.top = imgRect.top + 'px';
            clone.style.width = imgRect.width + 'px';
            clone.style.height = imgRect.height + 'px';
            clone.style.transition = 'all .6s cubic-bezier(.4,0,.2,1)';
            document.body.appendChild(clone);
            setTimeout(() => {
                clone.style.left = (cartRect.left + cartRect.width / 2 - 27) + 'px';
                clone.style.top = (cartRect.top + cartRect.height / 2 - 27) + 'px';
                clone.style.width = '32px';
                clone.style.height = '32px';
                clone.style.opacity = '.3';
                clone.style.filter = 'blur(2px)';
            }, 10);
            setTimeout(() => document.body.removeChild(clone), 650);
        }

        // Validasi form
        const playerForm = document.getElementById('playerForm');
        playerForm.onsubmit = function (e) {
            e.preventDefault();
            let valid = true;
            const playerId = document.getElementById('playerId').value.trim();
            const zoneId = document.getElementById('zoneId').value.trim();
            const playerIdError = document.getElementById('playerIdError');
            const zoneIdError = document.getElementById('zoneIdError');
            playerIdError.textContent = '';
            zoneIdError.textContent = '';
            if (!playerId) {
                playerIdError.textContent = 'Player ID wajib diisi!';
                valid = false;
            } else if (!/^\d+$/.test(playerId)) {
                playerIdError.textContent = 'Player ID harus berupa angka!';
                valid = false;
            }
            if (!zoneId) {
                zoneIdError.textContent = 'Zone ID wajib diisi!';
                valid = false;
            } else if (!/^\d+$/.test(zoneId)) {
                zoneIdError.textContent = 'Zone ID harus berupa angka!';
                valid = false;
            }
            if (valid) {
                playerIdError.textContent = '';
                zoneIdError.textContent = '';
                playerForm.querySelector('button[type=submit]').textContent = 'Tersimpan ✓';
                setTimeout(() => {
                    playerForm.querySelector('button[type=submit]').textContent = 'Simpan Data';
                }, 1600);
            }
        };

        // Inisialisasi
        renderProducts();
        updateCartCount();

        // Prevent scroll on mobile when modal open
        window.addEventListener('keydown', function (e) {
            if (cartModalBg.classList.contains('active') && e.key === 'Escape') closeCartModal();
        });
        // Prevent form submit on Enter in inputs
        document.querySelectorAll('.form-section input').forEach(inp => {
            inp.addEventListener('keydown', e => {
                if (e.key === 'Enter') e.preventDefault();
            });
        });