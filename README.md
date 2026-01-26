# 🛏️ Hanabedding - Landing Page

> Landing page bán giường bọc da cao cấp với thiết kế hiện đại, tối giản và sang trọng.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-success)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

---

## 📋 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng](#-tính-năng)
- [Demo](#-demo)
- [Cài Đặt](#-cài-đặt)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Tùy Chỉnh](#-tùy-chỉnh)
- [Công Nghệ](#-công-nghệ)
- [Tối Ưu SEO](#-tối-ưu-seo)
- [Responsive](#-responsive)
- [Liên Hệ](#-liên-hệ)

---

## 🎯 Giới Thiệu

**Hanabedding** là landing page bán giường bọc da cao cấp với giao diện hiện đại, tối giản và sang trọng. Trang web được thiết kế với mục tiêu chuyển đổi cao, giúp khách hàng dễ dàng chọn mẫu giường và đặt hàng nhanh chóng.

### ✨ Điểm Nổi Bật

- 🎨 **Thiết kế sang trọng** với tone màu nâu vàng ấm áp
- 📱 **Responsive hoàn toàn** trên mọi thiết bị
- ⚡ **Tốc độ tải nhanh** với HTML/CSS/JS thuần
- 🛒 **UX tối ưu** cho việc chọn sản phẩm và đặt hàng
- 🔍 **SEO-friendly** với meta tags và schema markup

---

## 🚀 Tính Năng

### 1. **Chọn Mẫu Giường Thông Minh**
- 3 mẫu giường với 3 màu sắc mỗi mẫu (tổng 9 ảnh)
- Tabs navigation trên mobile để tiết kiệm không gian
- Preview ảnh lớn khi chọn
- Hiển thị đầy đủ thông tin mẫu và màu

### 2. **Chọn Kích Thước Linh Hoạt**
- 7 kích thước: 1m, 1m2, 1m4, 1m6, 1m8, 2m, 2m2
- Giá tự động cập nhật theo kích thước
- Badge "Phổ biến" cho size bán chạy
- Font size lớn, dễ đọc cho người lớn tuổi

### 3. **Form Đặt Hàng Đầy Đủ**
- Thông tin khách hàng: Họ tên, SĐT, Email, Địa chỉ
- Dropdown 63 tỉnh/thành Việt Nam
- Chọn phương thức thanh toán: COD / Chuyển khoản
- Validation form real-time
- Honeypot anti-spam

### 4. **Sections Đầy Đủ**
- ✅ Hero section với CTA nổi bật
- ✅ Quick order với cấu hình sản phẩm
- ✅ Products showcase
- ✅ Benefits (6 lợi ích)
- ✅ Process (3 bước đặt hàng)
- ✅ Feedback (6 đánh giá khách hàng)
- ✅ FAQ (8 câu hỏi thường gặp)
- ✅ Order form chi tiết
- ✅ Footer với thông tin liên hệ

### 5. **Tối Ưu Mobile**
- Tabs để chuyển đổi giữa các mẫu giường
- Sticky CTA button ở bottom
- Touch-friendly với padding lớn
- Font size tối ưu cho mobile

---

## 🎬 Demo

### Desktop View
```
┌─────────────────────────────────────────┐
│  Header (Logo + Navigation + CTA)      │
├─────────────────────────────────────────┤
│  Hero Section (Gradient Background)    │
├─────────────────────────────────────────┤
│  Quick Order (Gallery + Config)        │
│  ┌──────────┬──────────┬──────────┐    │
│  │ Mẫu 1    │ Mẫu 2    │ Mẫu 3    │    │
│  │ 3 màu    │ 3 màu    │ 3 màu    │    │
│  └──────────┴──────────┴──────────┘    │
├─────────────────────────────────────────┤
│  Products / Benefits / Process          │
├─────────────────────────────────────────┤
│  Feedback / FAQ / Order Form            │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

### Mobile View
```
┌─────────────────┐
│  Header         │
├─────────────────┤
│  Hero           │
├─────────────────┤
│ [Mẫu 1][Mẫu 2][Mẫu 3] ← Tabs
├─────────────────┤
│  ┌───────────┐  │
│  │  Ảnh 1    │  │
│  ├───────────┤  │
│  │  Ảnh 2    │  │
│  ├───────────┤  │
│  │  Ảnh 3    │  │
│  └───────────┘  │
├─────────────────┤
│  Config Panel   │
├─────────────────┤
│  [Đặt Mua Ngay] │ ← Sticky
└─────────────────┘
```

---

## 💻 Cài Đặt

### Yêu Cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Không cần server, chạy trực tiếp file HTML

### Bước 1: Clone hoặc Download
```bash
# Clone repository
git clone https://github.com/yourusername/hanabedding.git

# Hoặc download ZIP và giải nén
```

### Bước 2: Cấu Trúc Thư Mục
```
hanabedding/
├── index.html              # File chính
├── assets/
│   └── images/
│       └── giuongbocda/
│           ├── 1.1.jpg     # Mẫu 1 - Xám
│           ├── 1.2.jpg     # Mẫu 1 - Xám Đậm
│           ├── 1.3.jpg     # Mẫu 1 - Trắng Kem
│           ├── 2.1.jpg     # Mẫu 2 - Xám
│           ├── 2.2.jpg     # Mẫu 2 - Xám Đậm
│           ├── 2.3.jpg     # Mẫu 2 - Trắng Kem
│           ├── 3.1.jpg     # Mẫu 3 - Xám
│           ├── 3.2.jpg     # Mẫu 3 - Xám Đậm
│           └── 3.3.jpg     # Mẫu 3 - Trắng Kem
└── README.md
```

### Bước 3: Chạy Website
```bash
# Mở file index.html bằng trình duyệt
# Hoặc dùng Live Server (VS Code extension)
```

---

## 📁 Cấu Trúc Dự Án

```
index.html
├── <head>
│   ├── Meta Tags (SEO, OG, Schema)
│   ├── CSS Variables (Colors)
│   └── Styles (Inline CSS)
├── <body>
│   ├── Header (Navigation)
│   ├── Hero Section
│   ├── Quick Order Section
│   │   ├── Model Tabs (Mobile)
│   │   ├── Model Gallery (3 mẫu x 3 màu)
│   │   └── Config Sidebar
│   │       ├── Preview Image
│   │       ├── Price Display
│   │       ├── Size Selection (7 sizes)
│   │       └── CTA Button
│   ├── Products Section
│   ├── Benefits Section
│   ├── Process Section
│   ├── Feedback Section
│   ├── FAQ Section
│   ├── Order Form Section
│   ├── Footer
│   └── Sticky Mobile CTA
└── <script>
    ├── Model Tabs Logic
    ├── Image Preview Update
    ├── Price Update
    ├── Form Validation
    └── Smooth Scroll
```

---

## 🎨 Tùy Chỉnh

### 1. Thay Đổi Màu Sắc

Tìm phần `:root` trong CSS và thay đổi biến màu:

```css
:root {
    --color-gold: #D4A574;        /* Màu vàng chính */
    --color-gold-dark: #B8956A;   /* Màu vàng đậm */
    --color-brown-dark: #5D4E37;  /* Màu nâu đậm */
    --color-accent: #E8A87C;      /* Màu accent */
}
```

### 2. Thay Đổi Giá

Tìm phần `data-price` trong HTML:

```html
<input type="radio" name="bedSize" value="1m6 x 2m" data-price="3699000">
```

### 3. Thêm/Bớt Kích Thước

Thêm hoặc xóa các `<label class="size-option-compact">` trong phần Size Selection.

### 4. Thay Đổi Ảnh

Thay thế file ảnh trong `assets/images/giuongbocda/` với tên file tương ứng.

### 5. Cấu Hình Form Submission

Tìm dòng này trong JavaScript:

```javascript
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
```

Thay bằng URL Google Apps Script hoặc API endpoint của bạn.

---

## 🛠️ Công Nghệ

### Frontend
- **HTML5** - Cấu trúc semantic
- **CSS3** - Flexbox, Grid, Custom Properties
- **JavaScript (Vanilla)** - Không dùng framework

### Tính Năng CSS
- ✅ CSS Variables cho theme
- ✅ Flexbox & Grid Layout
- ✅ Media Queries (Responsive)
- ✅ Transitions & Animations
- ✅ Custom Radio/Checkbox Styling

### Tính Năng JavaScript
- ✅ Event Listeners
- ✅ DOM Manipulation
- ✅ Form Validation
- ✅ Smooth Scroll
- ✅ Tab Navigation
- ✅ Dynamic Price Update

---

## 🔍 Tối Ưu SEO

### Meta Tags
```html
<title>Hanabedding - Khung Giường & Gối Nằm Cao Cấp</title>
<meta name="description" content="...">
<meta name="keywords" content="khung giường, giường ngủ, gối nằm...">
```

### Open Graph
```html
<meta property="og:title" content="Hanabedding - Khung Giường...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

### Schema.org Markup
- Organization Schema
- Product Schema với giá và brand

### Semantic HTML
- `<header>`, `<nav>`, `<section>`, `<footer>`
- Heading hierarchy (h1, h2, h3)
- Alt text cho images

---

## 📱 Responsive

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Desktop | ≥992px | 2 columns, full gallery |
| Tablet | 768px - 991px | 1 column, tabs appear |
| Mobile | ≤767px | 1 column, tabs, vertical images |
| Small Mobile | ≤640px | Optimized font sizes |

### Mobile Optimizations
- ✅ Tabs navigation cho model selection
- ✅ Vertical image layout
- ✅ Larger touch targets (min 44px)
- ✅ Sticky CTA button
- ✅ Readable font sizes (15-16px)
- ✅ Optimized spacing

---

## 📊 Performance

### Tối Ưu Hóa
- ✅ Inline CSS (no external CSS file)
- ✅ Lazy loading images
- ✅ Minimal JavaScript
- ✅ No external dependencies
- ✅ Optimized images (recommended)

### Checklist
- [ ] Compress images (WebP format)
- [ ] Minify HTML/CSS/JS
- [ ] Add favicon
- [ ] Setup Google Analytics
- [ ] Setup Facebook Pixel
- [ ] Configure Google Apps Script for form

---

## 🚀 Deployment

### Option 1: GitHub Pages
```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Enable GitHub Pages in Settings
```

### Option 2: Netlify
```bash
# Drag & drop folder to Netlify
# Or connect GitHub repository
```

### Option 3: Vercel
```bash
# Import GitHub repository
# Auto deploy on push
```

---

## 📝 TODO

- [ ] Thêm favicon
- [ ] Tích hợp Google Analytics
- [ ] Tích hợp Facebook Pixel
- [ ] Setup Google Apps Script
- [ ] Compress và optimize images
- [ ] Thêm sitemap.xml
- [ ] Thêm robots.txt
- [ ] A/B testing cho CTA
- [ ] Thêm live chat (Zalo, Facebook)

---

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

Dự án này được phát hành dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

## 📞 Liên Hệ

**Hanabedding**
- 📧 Email: contact@hanabedding.com
- 📱 Hotline: 0123.456.789
- 💬 Zalo: 0123.456.789
- 🌐 Website: https://hanabedding.com

---

## 🙏 Cảm Ơn

Cảm ơn bạn đã sử dụng Hanabedding Landing Page! Nếu thấy hữu ích, hãy cho dự án một ⭐ trên GitHub.

---

<div align="center">
  <p>Made with ❤️ by Hanabedding Team</p>
  <p>© 2026 Hanabedding. All rights reserved.</p>
</div>
