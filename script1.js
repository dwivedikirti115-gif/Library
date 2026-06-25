 let currentIdx = 0;
        
        let activeImages = [];

        
        function filterImg(category, btn) {
           
            document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            
            const items = document.querySelectorAll('.item');
            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-cat') === category) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        }

        
        function openLightbox(globalIdx) {
            const items = document.querySelectorAll('.item');
        
            activeImages = Array.from(items).filter(item => !item.classList.contains('hide'));
            
            const targetItem = items[globalIdx];
            currentIdx = activeImages.indexOf(targetItem);

            if (currentIdx !== -1) {
                updateLightbox();
                const lb = document.getElementById('lightbox');
                lb.style.display = 'flex';
                setTimeout(() => lb.classList.add('show'), 10);
            }
        }

        function closeLightbox() {
            const lb = document.getElementById('lightbox');
            lb.classList.remove('show');
            setTimeout(() => lb.style.display = 'none', 200);
        }

        function changeImg(step) {
            currentIdx += step;
            if (currentIdx >= activeImages.length) currentIdx = 0;
            if (currentIdx < 0) currentIdx = activeImages.length -1;
            updateLightbox();
        }

        function updateLightbox() {
            const imgUrl = activeImages[currentIdx].querySelector('img').src;
            document.getElementById('lightboxImg').src = imgUrl;
        }

        document.addEventListener('keydown', (e) => {
            const lb = document.getElementById('lightbox');
            if (lb.classList.contains('show')) {
                if (e.key === 'ArrowRight') changeImg(1);
                if (e.key === 'ArrowLeft') changeImg(-1);
                if (e.key === 'Escape') closeLightbox();
            }
        });