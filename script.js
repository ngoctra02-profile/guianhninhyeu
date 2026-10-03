function openGift() {
    const giftScreen = document.getElementById('screen-gift');
    
    // Bắt đầu hiệu ứng làm mờ video hộp quà
    giftScreen.classList.remove('active');
    giftScreen.classList.add('fade-blur');
    
    // Bật nhạc nền ngay lập tức khi click, và bắt đầu từ giây thứ 5
    const bgMusic = document.getElementById('bg-music');
    bgMusic.currentTime = 5; // Cắt bỏ 5 giây dạo đầu
    bgMusic.play();
    
    // Tạo một BỨC TƯỜNG HOA khổng lồ rơi lấp đầy màn hình (Đã tối ưu chống giật)
    // Tạo một BỨC TƯỜNG HOA KHỔNG LỒ RƠI LIÊN TỤC TRONG 4.5 GIÂY
    const flowers = ['🌸', '🌺', '💮', '✨', '🌸🌸', '🌺💮', '✨🌸', '🌸💮🌺']; 
    const animations = ['denseFall1', 'denseFall2', 'denseFall3'];
    
    // Sử dụng setInterval để bơm hoa liên tục, chống khoảng trống ở mép trên
    const rainInterval = setInterval(() => {
        const fragment = document.createDocumentFragment();
        const batchSize = Math.floor(Math.random() * 5) + 6; // Xả 6-10 cụm hoa mỗi 50ms
        
        for (let i = 0; i < batchSize; i++) {
            const flower = document.createElement('div');
            flower.classList.add('dense-flower');
            flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
            
            flower.style.left = (Math.random() * 120 - 10) + 'vw'; // Rải thật rộng qua 2 bên mép
            flower.style.fontSize = (Math.random() * 15 + 10) + 'px'; // Kích thước mini 
            
            // Gán ngẫu nhiên 1 trong 3 quỹ đạo để hoa không rơi đều tăm tắp mà bay lộn xộn tự nhiên
            flower.style.animationName = animations[Math.floor(Math.random() * animations.length)];
            flower.style.animationDuration = (Math.random() * 4 + 4) + 's'; // Bay chậm 4-8s
            flower.style.animationTimingFunction = 'linear';
            flower.style.animationFillMode = 'forwards';
            
            fragment.appendChild(flower);
            
            // Dọn rác khi hoa chạm đáy
            setTimeout(() => flower.remove(), 9000);
        }
        
        document.body.appendChild(fragment);
    }, 50); // Mỗi 0.05 giây bơm 1 nhịp
    
    // Sau đúng 4.5 giây, NGƯNG xả mưa hoa và bắt đầu cho mọc bức thư lên
    setTimeout(() => {
        clearInterval(rainInterval); // Cắt vòi xả hoa
        
        const letterScreen = document.getElementById('screen-letter');
        letterScreen.classList.add('active');
        
        // Bật mưa lả lướt của bức thư (background)
        startFallingFlowers();
    }, 4500);
}

// HÀM TẠO HIỆU ỨNG HOA RƠI
function startFallingFlowers() {
    // Thả hoa vào bên trong wrapper chứa ảnh dài thay vì dính vào màn hình
    const container = document.querySelector('.scrapbook-wrapper');
    const flowers = ['🌸', '🌺', '💮', '🏵️', '✨']; 
    
    setInterval(() => {
        const flower = document.createElement('div');
        flower.classList.add('falling-flower');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        // Vì bức ảnh rất dài, hoa cần thời gian rơi lâu hơn nhiều (15s - 25s) để bay lả lướt
        flower.style.animationDuration = (Math.random() * 10 + 15) + 's'; 
        
        container.appendChild(flower);
        
        // Xóa hoa sau 30s để đảm bảo hoa đã rơi đến tận đáy trang
        setTimeout(() => {
            flower.remove();
        }, 30000); 
    }, 150);
}
