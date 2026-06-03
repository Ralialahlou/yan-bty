export const categories = [
  {
    id: 'makeup', name: 'Makeup', slug: 'makeup',
    image: '/images/cat-makeup.png',
    subcategories: ['Foundation', 'Concealer', 'Blush', 'Bronzer', 'Eyeshadow', 'Mascara', 'Lipstick', 'Lip Gloss', 'Eyeliner', 'Setting Spray'],
    groups: [
      {
        name: 'Face',
        items: [
          { label: 'Foundation', slug: 'foundation' },
          { label: 'Concealer', slug: 'concealer' },
          { label: 'Blush', slug: 'blush' },
          { label: 'Bronzer & Contour', slug: 'bronzer' },
          { label: 'Highlighter', slug: 'highlighter' },
          { label: 'Primer', slug: 'primer' },
          { label: 'Setting Powder', slug: 'setting-powder' },
          { label: 'Setting Spray', slug: 'setting-spray' },
          { label: 'BB & CC Cream', slug: 'bb-cc-cream' },
        ],
      },
      {
        name: 'Eyes',
        items: [
          { label: 'Mascara', slug: 'mascara' },
          { label: 'Eyeshadow Palettes', slug: 'eyeshadow-palettes' },
          { label: 'Eyeliner', slug: 'eyeliner' },
          { label: 'Eyebrow Products', slug: 'eyebrow' },
          { label: 'False Lashes', slug: 'false-lashes' },
          { label: 'Eye Primer', slug: 'eye-primer' },
          { label: 'Under Eye Concealer', slug: 'under-eye' },
        ],
      },
      {
        name: 'Lips',
        items: [
          { label: 'Lipstick', slug: 'lipstick' },
          { label: 'Lip Gloss', slug: 'lip-gloss' },
          { label: 'Lip Liner', slug: 'lip-liner' },
          { label: 'Lip Balm', slug: 'lip-balm' },
          { label: 'Lip Stain', slug: 'lip-stain' },
          { label: 'Liquid Lipstick', slug: 'liquid-lipstick' },
          { label: 'Lip Plumper', slug: 'lip-plumper' },
        ],
      },
      {
        name: 'Tools & Brushes',
        items: [
          { label: 'Makeup Brushes', slug: 'brushes' },
          { label: 'Sponges & Blenders', slug: 'sponges' },
          { label: 'Eyelash Curlers', slug: 'eyelash-curlers' },
          { label: 'Brush Sets', slug: 'brush-sets' },
        ],
      },
    ],
  },
  {
    id: 'skincare', name: 'Skincare', slug: 'skincare',
    image: '/images/cat-skincare.png',
    subcategories: ['Cleanser', 'Toner', 'Serum', 'Moisturiser', 'Eye Cream', 'Face Mask', 'SPF', 'Exfoliator'],
    groups: [
      {
        name: 'Cleanse & Tone',
        items: [
          { label: 'Cleansers', slug: 'cleanser' },
          { label: 'Micellar Water', slug: 'micellar-water' },
          { label: 'Toners & Essences', slug: 'toner' },
          { label: 'Exfoliators', slug: 'exfoliator' },
          { label: 'Face Scrubs', slug: 'face-scrub' },
        ],
      },
      {
        name: 'Treat & Correct',
        items: [
          { label: 'Serums', slug: 'serum' },
          { label: 'Face Oils', slug: 'face-oil' },
          { label: 'Eye Creams', slug: 'eye-cream' },
          { label: 'Spot Treatments', slug: 'spot-treatment' },
          { label: 'Retinol', slug: 'retinol' },
          { label: 'Vitamin C', slug: 'vitamin-c' },
        ],
      },
      {
        name: 'Moisturise & Protect',
        items: [
          { label: 'Moisturisers', slug: 'moisturiser' },
          { label: 'SPF & Sunscreen', slug: 'spf' },
          { label: 'Face Mists', slug: 'face-mist' },
          { label: 'Face Masks', slug: 'face-mask' },
          { label: 'Night Creams', slug: 'night-cream' },
        ],
      },
      {
        name: 'Shop by Concern',
        items: [
          { label: 'Acne & Blemishes', slug: 'acne' },
          { label: 'Anti-Ageing', slug: 'anti-ageing' },
          { label: 'Brightening', slug: 'brightening' },
          { label: 'Sensitive Skin', slug: 'sensitive' },
          { label: 'Shop All Skincare', slug: 'skincare', highlight: true },
        ],
      },
    ],
  },
  {
    id: 'fragrance', name: 'Fragrance', slug: 'fragrance',
    image: '/images/cat-scents.png',
    subcategories: ['Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Candles', 'Diffusers'],
    groups: [
      {
        name: 'Women',
        items: [
          { label: 'Eau de Parfum', slug: 'edp-women' },
          { label: 'Eau de Toilette', slug: 'edt-women' },
          { label: 'Body Mist', slug: 'body-mist' },
          { label: 'Perfume Gift Sets', slug: 'gift-sets-fragrance' },
        ],
      },
      {
        name: 'Men',
        items: [
          { label: 'Eau de Parfum', slug: 'edp-men' },
          { label: 'Eau de Toilette', slug: 'edt-men' },
          { label: 'Aftershave', slug: 'aftershave' },
        ],
      },
      {
        name: 'Home',
        items: [
          { label: 'Candles', slug: 'candles' },
          { label: 'Diffusers', slug: 'diffusers' },
          { label: 'Room Sprays', slug: 'room-sprays' },
        ],
      },
      {
        name: 'By Family',
        items: [
          { label: 'Floral', slug: 'floral' },
          { label: 'Woody & Oud', slug: 'woody-oud' },
          { label: 'Fresh & Citrus', slug: 'fresh-citrus' },
          { label: 'Shop All Fragrance', slug: 'fragrance', highlight: true },
        ],
      },
    ],
  },
  {
    id: 'haircare', name: 'Hair Care', slug: 'haircare',
    image: '/images/cat-haircare.png',
    subcategories: ['Shampoo', 'Conditioner', 'Hair Mask', 'Styling', 'Hair Oil', 'Scalp Care'],
    groups: [
      {
        name: 'Wash & Condition',
        items: [
          { label: 'Shampoo', slug: 'shampoo' },
          { label: 'Conditioner', slug: 'conditioner' },
          { label: 'Co-Wash', slug: 'co-wash' },
          { label: 'Scalp Scrubs', slug: 'scalp-scrub' },
        ],
      },
      {
        name: 'Treat & Repair',
        items: [
          { label: 'Hair Masks', slug: 'hair-mask' },
          { label: 'Hair Oils', slug: 'hair-oil' },
          { label: 'Serums & Treatments', slug: 'hair-serum' },
          { label: 'Scalp Care', slug: 'scalp-care' },
        ],
      },
      {
        name: 'Style & Finish',
        items: [
          { label: 'Heat Protectant', slug: 'heat-protectant' },
          { label: 'Styling Creams', slug: 'styling-cream' },
          { label: 'Dry Shampoo', slug: 'dry-shampoo' },
          { label: 'Hair Spray', slug: 'hair-spray' },
          { label: 'Shop All Hair', slug: 'haircare', highlight: true },
        ],
      },
    ],
  },
  {
    id: 'bodycare', name: 'Body Care', slug: 'bodycare',
    image: '/images/cat-bodycare.png',
    subcategories: ['Body Lotion', 'Body Scrub', 'Body Oil', 'Hand Cream', 'Bath & Shower'],
    groups: [
      {
        name: 'Cleanse',
        items: [
          { label: 'Body Wash & Shower Gel', slug: 'body-wash' },
          { label: 'Bar Soap', slug: 'bar-soap' },
          { label: 'Bath Soaks', slug: 'bath-soaks' },
          { label: 'Body Scrubs', slug: 'body-scrub' },
        ],
      },
      {
        name: 'Moisturise',
        items: [
          { label: 'Body Lotions', slug: 'body-lotion' },
          { label: 'Body Butter', slug: 'body-butter' },
          { label: 'Body Oils', slug: 'body-oil' },
          { label: 'Hand & Nail Cream', slug: 'hand-cream' },
        ],
      },
      {
        name: 'Targeted Care',
        items: [
          { label: 'Stretch Mark', slug: 'stretch-mark' },
          { label: 'Cellulite', slug: 'cellulite' },
          { label: 'Deodorant', slug: 'deodorant' },
          { label: 'Shop All Body', slug: 'bodycare', highlight: true },
        ],
      },
    ],
  },
  { id: 'suncare', name: 'Sun Care', slug: 'suncare', image: '/images/cat-suncare.png', subcategories: ['SPF Face', 'SPF Body', 'After Sun', 'Self Tan'] },
  {
    id: 'yan-one', name: 'Yan&One', slug: 'yan-one',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    subcategories: ['Makeup', 'Nails', 'Skincare', 'Body Care', 'Sun Care', 'Hair Care', 'Perfume', 'Home Scent', 'Rituals', 'Kids'],
    groups: [
      {
        name: 'Makeup',
        items: [
          { label: 'Face', slug: 'yan-one-face' },
          { label: 'Eyes', slug: 'yan-one-eyes' },
          { label: 'Lips', slug: 'yan-one-lips' },
          { label: 'Brows', slug: 'yan-one-brows' },
          { label: 'Accessories', slug: 'yan-one-accessories' },
        ],
      },
      {
        name: 'Skin & Body',
        items: [
          { label: 'Skincare', slug: 'yan-one-skincare' },
          { label: 'Body Care', slug: 'yan-one-body' },
          { label: 'Sun Care', slug: 'yan-one-sun' },
          { label: 'Nails', slug: 'yan-one-nails' },
          { label: 'Rituals', slug: 'yan-one-rituals' },
          { label: 'Kids', slug: 'yan-one-kids' },
        ],
      },
      {
        name: 'Fragrance & Home',
        items: [
          { label: 'Perfume — Women', slug: 'yan-one-perfume-women' },
          { label: 'Perfume — Men', slug: 'yan-one-perfume-men' },
          { label: 'Home Scent', slug: 'yan-one-home-scent' },
          { label: 'Candles', slug: 'yan-one-candles' },
        ],
      },
      {
        name: 'Hair Care',
        items: [
          { label: 'Shampoo', slug: 'yan-one-shampoo' },
          { label: 'Conditioner', slug: 'yan-one-conditioner' },
          { label: 'Hair Masks & Oils', slug: 'yan-one-hair-mask' },
          { label: 'Shop All Yan&One', slug: 'yan-one', highlight: true },
        ],
      },
    ],
  },
];

export const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
export const skinConcerns = ['Acne', 'Anti-Ageing', 'Brightening', 'Dark Spots', 'Dryness', 'Fine Lines', 'Hyperpigmentation', 'Pores', 'Redness', 'Uneven Texture'];
export const ingredients = ['Retinol', 'Niacinamide', 'Vitamin C', 'Hyaluronic Acid', 'Salicylic Acid', 'Peptides', 'AHA/BHA', 'Ceramides', 'Bakuchiol', 'Squalane'];
export const certifications = ['Clean Beauty', 'Vegan', 'Cruelty-Free', 'Fragrance-Free', 'Pregnancy-Safe', 'Dermatologist Tested', 'Paraben-Free', 'Sulfate-Free'];
