const B = import.meta.env.BASE_URL;

export const editorialArticles = [
  {
    id: 'ed-001',
    title: 'The Perfect AM Skincare Routine',
    category: 'Skincare Routines',
    image: `${B}images/journal-skincare.jpg`,
    readTime: '5 min read',
    date: '2025-11-20',
    excerpt: 'Master the morning ritual that transforms your skin — from cleanser to SPF, every step explained.',
    slug: 'perfect-am-skincare-routine',
    author: 'Yan BTY Beauty Editors',
    content: 'Start your morning with a gentle cleanser...',
    tags: ['Skincare', 'Routine', 'AM', 'Expert Tips'],
  },
  {
    id: 'ed-002',
    title: 'The Power of Niacinamide',
    category: 'Ingredient Deep Dives',
    image: `${B}images/journal-ingredients.jpg`,
    readTime: '7 min read',
    date: '2025-11-15',
    excerpt: 'Why niacinamide is the ingredient everyone needs, no matter your skin type.',
    slug: 'power-of-niacinamide',
    author: 'Dr. Sarah M., Dermatologist',
    authorBio: 'Dr. Sarah M. is a board-certified dermatologist and skincare formulation consultant. She has been advising luxury beauty brands for over 12 years.',
    authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
    tags: ['Ingredients', 'Niacinamide', 'Skincare', 'Science'],
    recommendedProductIds: ['yo-002', 'lrp-001', 'yo-005', 'ki-001'],
    sections: [
      {
        type: 'intro',
        text: `If there is one ingredient that has earned its permanent place in almost every serious skincare routine, it is niacinamide. Also known as Vitamin B3 or nicotinamide, this water-soluble vitamin has become the darling of dermatologists, beauty editors, and skincare enthusiasts alike — and for very good reason. Unlike many trendy actives that promise everything and deliver very little, niacinamide is backed by decades of clinical research and delivers measurable, visible results across nearly every skin type and concern.`,
      },
      {
        type: 'heading',
        text: 'What exactly is niacinamide?',
      },
      {
        type: 'text',
        text: `Niacinamide is the amide form of Vitamin B3, one of the eight B-vitamins. Unlike niacin (the acid form), it does not cause the flushing reaction that has limited niacin's use in topical skincare. It is produced naturally in the body but must also be obtained through diet or, in skincare, applied topically — where it penetrates the skin's barrier and begins working at a cellular level within minutes of application.`,
      },
      {
        type: 'text',
        text: `What makes it exceptional is its versatility. Most active skincare ingredients are targeted — a retinol is for anti-ageing, a salicylic acid is for acne, a vitamin C is for brightening. Niacinamide does all of these things, and more, without the irritation that comes with the alternatives.`,
      },
      {
        type: 'pullquote',
        text: `"In my 12 years of practice, niacinamide is the ingredient I recommend to almost every single patient — regardless of skin type, age, or concern. It works, it's gentle, and it pairs beautifully with everything else."`,
        attribution: 'Dr. Sarah M., Dermatologist',
      },
      {
        type: 'heading',
        text: 'The six proven benefits',
      },
      {
        type: 'benefits',
        items: [
          {
            title: 'Minimises pores',
            text: 'By regulating sebum production and strengthening the skin\'s structure, niacinamide visibly reduces the appearance of enlarged pores over consistent use. Studies show measurable pore-size reduction with just 4 weeks of daily 5% niacinamide application.',
          },
          {
            title: 'Brightens and evens skin tone',
            text: 'Niacinamide interferes with the transfer of melanin to skin cells, meaning it interrupts the process that creates dark spots. Unlike vitamin C, it does so without photosensitising the skin, making it safe to use both morning and evening.',
          },
          {
            title: 'Strengthens the skin barrier',
            text: 'It boosts the production of ceramides and other key lipids that form the skin\'s protective barrier. A stronger barrier means less moisture loss, fewer reactions to environmental stressors, and calmer, more resilient skin.',
          },
          {
            title: 'Controls oil and reduces congestion',
            text: 'For oily and acne-prone skin, niacinamide\'s ability to regulate sebum production makes it a powerful non-comedogenic alternative to harsh exfoliants or stripping toners.',
          },
          {
            title: 'Reduces redness and inflammation',
            text: 'Its anti-inflammatory properties make it particularly effective for skin prone to redness, rosacea flare-ups, or post-acne marks. It calms without stripping, soothes without sedating.',
          },
          {
            title: 'Softens fine lines',
            text: 'By stimulating collagen synthesis and improving skin elasticity, long-term use of niacinamide contributes to a visible reduction in fine lines — especially around areas prone to texture and creasing.',
          },
        ],
      },
      {
        type: 'heading',
        text: 'What concentration should you use?',
      },
      {
        type: 'text',
        text: `The sweet spot for most skin types is between 4% and 10%. Studies consistently show 5% to be the most effective dose for addressing dark spots and pores — it delivers results without increasing the risk of irritation. Concentrations above 10% are available but rarely necessary and more likely to cause temporary flushing or sensitivity, particularly in those new to the ingredient.`,
      },
      {
        type: 'text',
        text: `If you have sensitive skin, starting at 4–5% is ideal. If your skin is more resilient and you're targeting more stubborn hyperpigmentation or oil control, 10% serums used consistently will deliver faster, more visible results.`,
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1556228852-6d35a585d566?w=1200&q=85',
        caption: 'A minimal, well-layered routine is all niacinamide needs to shine.',
      },
      {
        type: 'heading',
        text: 'How to layer it correctly',
      },
      {
        type: 'text',
        text: `One of niacinamide's greatest qualities is its compatibility. Unlike vitamin C (which can be destabilised by high pH environments) or retinol (which should not be paired with AHAs), niacinamide plays well with almost everything in your routine.`,
      },
      {
        type: 'text',
        text: `Apply it after cleansing and toning, while skin is still slightly damp. If you're using a vitamin C serum, give it a few minutes to absorb first, or use niacinamide in the evening and vitamin C in the morning to avoid the two meeting when both are at their most potent. Follow with moisturiser to lock everything in.`,
      },
      {
        type: 'steps',
        items: [
          { step: 1, label: 'Cleanse', text: 'Use a gentle, pH-balanced cleanser morning and night.' },
          { step: 2, label: 'Tone (optional)', text: 'A hydrating, alcohol-free toner sets the canvas.' },
          { step: 3, label: 'Apply niacinamide', text: '3–4 drops. Press gently into skin and wait 60 seconds.' },
          { step: 4, label: 'Add your other actives', text: 'Retinol (PM), vitamin C (AM), or hyaluronic acid — all layer beautifully over niacinamide.' },
          { step: 5, label: 'Moisturise', text: 'Seal everything in with a hydrating moisturiser. SPF in the morning, always.' },
        ],
      },
      {
        type: 'heading',
        text: 'Who should use it?',
      },
      {
        type: 'text',
        text: `The honest answer: almost everyone. Niacinamide is one of the few actives that is well-tolerated across all Fitzpatrick skin types and is safe for use during pregnancy (always check with your healthcare provider). Whether you are 23 and dealing with post-acne marks, 40 and targeting fine lines, or simply want a more even, luminous complexion — niacinamide belongs in your routine.`,
      },
      {
        type: 'text',
        text: `The only group that should approach with caution is those with a known allergy to niacin — a rare but real condition. Patch test first, as you should with any new skincare addition.`,
      },
    ],
  },
  {
    id: 'ed-003',
    title: 'Autumn Beauty Guide 2025',
    category: 'Seasonal Guides',
    image: `${B}images/journal-autumn.jpg`,
    readTime: '10 min read',
    date: '2025-10-01',
    excerpt: 'Transition your beauty routine as the seasons change — the products and looks to covet this autumn.',
    slug: 'autumn-beauty-guide-2025',
    author: 'Yan BTY Beauty Editors',
    content: 'As temperatures drop and air becomes drier...',
    tags: ['Seasonal', 'Autumn', 'Makeup', 'Skincare'],
  },
  {
    id: 'ed-004',
    title: 'How to Build Your Skincare Routine',
    category: 'Expert Advice',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
    readTime: '8 min read',
    date: '2025-10-25',
    excerpt: 'Cleanse → Treat → Moisturise → Protect. Building a skincare routine that actually works for you.',
    slug: 'how-to-build-skincare-routine',
    author: 'Yan BTY Beauty Advisors',
    content: 'Building a skincare routine can feel overwhelming...',
    tags: ['Routine Builder', 'Beginner', 'Expert Tips', 'Skincare'],
  },
  {
    id: 'ed-005',
    title: 'Retinol: Everything You Need to Know',
    category: 'Ingredient Deep Dives',
    image: 'https://images.unsplash.com/photo-1583209814683-c81be5e47b59?w=800&q=80',
    readTime: '9 min read',
    date: '2025-09-12',
    excerpt: 'The ultimate guide to retinol — how to start, what to avoid, and the best products to try.',
    slug: 'retinol-everything-you-need-to-know',
    author: 'Dr. Sarah M., Dermatologist',
    content: 'Retinol is one of the most studied skincare ingredients...',
    tags: ['Retinol', 'Anti-Ageing', 'Ingredients', 'Expert Tips'],
  },
  {
    id: 'ed-006',
    title: 'The Art of Moroccan Beauty',
    category: 'Brand Stories',
    image: 'https://images.unsplash.com/photo-1614530291012-b6b3d1ca1f07?w=800&q=80',
    readTime: '6 min read',
    date: '2025-11-05',
    excerpt: 'Exploring the rich traditions of Moroccan beauty rituals and how they inspire Yan BTY\'s vision.',
    slug: 'art-of-moroccan-beauty',
    author: 'Yan BTY Editorial',
    content: 'Morocco has a rich tradition of beauty rituals...',
    tags: ['Morocco', 'Brand Story', 'Heritage', 'Beauty Traditions'],
  },
];

export const routineSteps = [
  { step: 1, label: 'Cleanse', description: 'Remove makeup, SPF and daily impurities', icon: '🧼' },
  { step: 2, label: 'Tone', description: 'Balance and prep your skin', icon: '💧' },
  { step: 3, label: 'Treat', description: 'Target your specific concerns with serums', icon: '✨' },
  { step: 4, label: 'Moisturise', description: 'Lock in hydration and nourish', icon: '💫' },
  { step: 5, label: 'Protect', description: 'Defend with SPF every morning', icon: '☀️' },
];
