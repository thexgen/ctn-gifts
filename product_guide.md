# Giftora — Product Guide

## 1. Project ka overview

**Giftora** ek responsive React-based premium gifting storefront hai. Iska purpose customers ko birthdays, anniversaries, weddings, corporate events aur personal gifting ke liye thoughtful gifts, hampers aur personalised products discover, customize aur select karne ki facility dena hai.

Brand promise:

- **Tagline:** "Thoughtful gifts, beautifully delivered."
- **Brand:** Giftora
- **Location:** Mumbai, India
- **Currency:** Indian Rupees (`₹`)
- **Tone:** Premium, warm, elegant aur emotionally personal
- **Target audience:** Individuals, couples, families, kids ke parents, aur corporate buyers

Yeh project current version me ek **frontend demo/mock storefront** hai. Shopping experience functional UI ke saath chalti hai, lekin cart, checkout, login, tracking aur newsletter backend APIs se connected nahi hain.

## 2. Main user journey

1. User homepage par categories aur curated collections dekhta hai.
2. Header ke mega menu, mobile drawer ya quick search se category/product select karta hai.
3. Category page par relevant gifts aur subcategories milti hain.
4. Product page par price, rating, description, quantity aur customisation options show hoti hain.
5. Personalised gift ke liye required fields bhar kar live preview dekha ja sakta hai.
6. Gift cart me add hota hai.
7. Cart drawer me quantity, customization details, coupon aur shipping progress manage ki ja sakti hai.
8. Checkout sirf demo summary aur demo order confirmation dikhata hai.

## 3. Product categories

Navigation aur category routes ka single source `src/data/navigation.js` hai.

### 3.1 Birthday

Purpose: Birthday occasions ke liye individual, kids aur family gifts.

Subcategories:

- **For Him**
- **For Her**
- **For Kids**

Homepage par birthday gifts celebration hampers aur dedicated kids/family selections ke through also promote kiye jaate hain.

### 3.2 Anniversary

Purpose: Couple gifting, relationship milestones aur wedding-anniversary moments.

Relevant collection types:

- Couple diaries
- Matching couple products
- Anniversary hampers
- Bloom/romantic gifts
- Wedding gifting

Anniversary category customised gifts ko cross-list bhi karti hai, jahan applicable.

### 3.3 Food Hampers

Purpose: Edible gifts aur shared celebrations ke liye curated food hampers.

Subcategories:

- **Dry Fruits Hampers**
- **Royal/almond/premium nut selections**
- **Fresh Fruit Baskets**
- **Chocolates, Candies & Cookies**
- **Sweet Hampers**
- Mithai aur festive sweets

Is category ka role gifting ko easy aur premium banane ke saath dining-table-friendly presentation provide karna hai.

### 3.4 Fresh Fruit Baskets

Purpose: Same-day aur next-day gift delivery ke suitable fruit hampers.

Product page par delivery slot aur optional card message customize kiya ja sakta hai:

- Same-day
- Next-day
- Card message

### 3.5 Customize Gifts

Purpose: Customer ko gift ko personal details, names, dates, messages aur event preferences ke saath unique banana.

Subcategories:

- **For Her**
- **Custom Jewellery**
- **Custom Earrings**
- **Custom Necklace**
- **Custom Pendant**
- **For Couples**
- **Couple Diary**
- **Marriage Diary (Husband / Wife)**
- **Childhood-to-Today Diary**
- **Photo Bouquet**
- **Custom T-Shirts**
- Couples
- Birthday
- Events
- Corporate Events

Customisation fields schema-based hain aur live preview product page par update hoti hai.

#### Personalisation types

- **Jewellery:** Recipient name, engraving/card message aur gift date
- **Couple/childhood diary:** Names, special date, cover style aur memories/note
- **Marriage diary:** Couple names, wedding date, anniversary year, cover style aur closing letter
- **Photo bouquet:** Recipient name aur note card message
- **T-shirts:** Size, colour, front text, back text aur event type
- **Fruit baskets:** Delivery slot aur card message

### 3.6 Corporate Gifts

Purpose: Team, employee, client, company event aur bulk gifting needs.

Examples:

- Executive desk hamper
- Team celebration box
- Client thank-you crate
- Corporate custom T-shirts
- Bulk corporate orders

Homepage par corporate gifting ko **teams and companies** ke liye dedicated bulk enquiry section ke through promote kiya gaya hai.

### 3.7 Home Decor

Purpose: Celebration aur everyday use ke liye decorative gifts.

Subcategories:

- **Diyas**
- Wall hangings
- Coasters
- Mirror trays
- Candles and diffusers
- Vases
- Cushions

### 3.8 More Gifts

Purpose: Wellness aur adult gifting categories ke liye grouped collection.

Subcategories:

- **Skin Care Hampers**
- **Perfume Gift Sets**
- **Beer & Wine Hampers**

Beer & Wine Hampers feature-gated hain. Default me `ALCOHOL_ENABLED: false` hone ki wajah se ye hidden aur unavailable rehte hain.

## 4. Homepage purpose

Homepage single-page storefront landing experience hai aur following sections ko show karta hai:

| Section | Purpose |
| --- | --- |
| Category Tiles | Quick entry to popular category pages |
| Hero Slider | Brand stories, premium/luxury, personalization aur occasions promote karta hai |
| Curated Gifts | Hampers, birthdays, anniversaries, personalized aur festive collections showcase karta hai |
| Treasured Connections | Recipient/relationship-based discovery: Her, Him, Corporate, Kids, Parents |
| Best Sellers | Exclusive, personalised aur couple favourites ke tabs |
| Signature Picks | New launches, jewellery aur home decor highlight karta hai |
| Limited Edition | Limited-edition artist/customer-style selections ka section |
| Wall of Fame | Gifting moment/community visual showcase |
| Wedding Banner | Wedding gifting ke liye dedicated promotion |
| Bulk Banner | Corporate/bulk gifting enquiry call-to-action |
| Testimonials | Customer trust aur gifting experience ka social proof |
| SEO / Know More / FAQ | Brand story, delivery context, policies aur common questions |

## 5. Search aur discovery

Quick search client-side catalogue par product name ke basis par filter karta hai.

- Maximum 5 results display hote hain.
- Matching customisable gift product page par redirect karta hai.
- Non-customisable gift directly cart me add ho sakta hai.
- Alcohol category/ products feature flag aur age gate ke according filter hoti hain.

Search desktop header me aur mobile modal me available hai.

## 6. Product detail experience

Product detail page me user ko milta hai:

- Product name, category breadcrumb aur description
- Rating aur review count
- Current price aur old price
- Sold-out status
- Product badge
- Wishlist button
- Quantity selector
- Add to cart action
- Related products
- Customisation form, where applicable
- Live customisation preview

Customised aur normal product variants ko cart me separate line item ke roop me handle kiya jata hai, taaki alag customisation options alag rakhe ja sakein.

## 7. Cart aur checkout

Cart in-memory React context me rehta hai:

- Add/remove products
- Increase/decrease quantity
- Wishlist
- Customisation details
- Delivery slot
- Coupon code
- Free-shipping progress
- Checkout summary

Current rules:

- Free shipping threshold: `₹2,000`
- Coupon code: `GIFT10`
- Coupon discount: `10%`
- Cart aur wishlist refresh ke baad reset ho jaate hain
- Checkout demo only hai aur order place nahi hota

## 8. Feature flags aur age confirmation

Alcohol-related navigation aur products `src/config/features.js` ke feature flag se control hain.

- Flag: `ALCOHOL_ENABLED`
- Default: `false`
- Beer & Wine Hampers default me hidden hain
- Alcohol category/product available hone par 21+ age confirmation gate apply hota hai
- Age confirmation runtime state me hoti hai aur page refresh ke baad reset ho sakti hai

Age gate ko enable karne ke liye:

```js
export const features = {
  ALCOHOL_ENABLED: true,
};
```

## 9. Brand aur content configuration

Core brand details `src/config/brand.js` me rakhi hain:

- Brand name aur tagline
- Short monogram
- Phone aur WhatsApp
- Email
- Location
- Currency
- Free-shipping threshold
- Coupon code aur percentage
- Newsletter discount
- Social links
- Footer year

Brand name change karne par header, footer, shared titles aur some derived copy update ho jaate hain.

Other content sources:

| Data | File |
| --- | --- |
| Navigation/categories | `src/data/navigation.js` |
| Products/catalogue | `src/data/products.js` |
| Brand/contact details | `src/config/brand.js` |
| Feature flags | `src/config/features.js` |
| Customisation validation | `src/utils/customization.js` |
| Cart/wishlist state | `src/context/CartContext.jsx` |
| Feature/age state | `src/context/FeaturesContext.jsx` |

## 10. Technical structure

### Stack

- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Lucide React icons

### Routes

- `/` — Homepage
- `/categories/:slug` — Category listing
- `/products/:slug` — Product detail
- `/*` — Not found page

### Core architecture

- `App.jsx`: global layout, routes, homepage section composition
- `pages/`: category aur product route pages
- `components/home/`: homepage sections
- `components/layout/`: header, footer, drawers, popups aur navigation
- `components/ui/`: reusable cards, modals, drawers, breadcrumbs, preview aur form controls
- `context/`: cart aur feature state
- `data/`: navigation aur mock catalogue
- `config/`: brand aur feature settings
- `utils/`: customisation validation aur cart-line identity

## 11. Responsive and accessibility behaviour

Project responsive layouts use karta hai:

- Mobile, tablet aur desktop navigation variants
- Mobile slide-in menu
- Responsive product grids
- Sticky headers
- Scroll reveal animations
- Reduced-motion support

Accessibility-oriented implementation includes:

- Semantic landmarks
- ARIA labels/roles
- Keyboard-operable menus/modals/drawers
- Escape key close behaviour
- Visible focus states
- Screen-reader status messages

## 12. Current demo limitations

Ye project production-ready backend ke saath replace karne ke liye designed demo hai.

Current limitations:

- Images placeholder rectangles hain
- Products/mock catalogue static hai
- Cart aur wishlist local React state mein hain
- Cart refresh par reset ho jaata hai
- Login demo modal hai
- Track-order demo modal hai
- Newsletter frontend confirmation hai
- Checkout order backend/API ko send nahi karta
- Taxes/payment/shipping rates real-time calculate nahi hote
- Inventory and sold-out status static hain
- International shipping aur real delivery operations implemented nahi hain
- Search sirf product names par based hai

## 13. Future implementation priorities

Production release se pehle priorities:

1. Real product catalogue aur CMS/API integration
2. Real product images aur image CDN
3. Persistent cart, wishlist aur customer account
4. Authentication and customer sessions
5. Payment gateway and real checkout
6. Inventory, tax, shipping and coupon backend
7. Order management aur tracking integration
8. Warehouse/fulfillment and same-day delivery rules
9. Age verification for gated categories
10. Email/SMS/WhatsApp/order notifications
11. Corporate enquiry and bulk-order workflow
12. SEO metadata, structured product data and analytics
13. Accessibility and security QA

## 14. Run aur build

Install dependencies:

```bash
npm install
```

Development server:

```bash
npm run dev
```

Default Vite URL: `http://localhost:5173`

Production build:

```bash
npm run build
```

Built app preview:

```bash
npm run preview
```
