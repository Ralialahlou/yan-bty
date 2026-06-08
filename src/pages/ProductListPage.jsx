import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';
import { products } from '../data/products';
import { brands } from '../data/brands';
import { categories, skinTypes, skinConcerns, certifications } from '../data/categories';
import styles from './ProductListPage.module.css';

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'bestselling', label: 'Bestsellers' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ProductListPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const searchQuery = searchParams.get('search');
  const certParam = searchParams.get('cert');
  const activeSub = searchParams.get('sub');

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState('recommended');
  const [layout, setLayout] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    skinTypes: [],
    skinConcerns: [],
    certifications: certParam ? [certParam] : [],
    priceMax: null,
  });

  const toggleFilter = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({ brands: [], skinTypes: [], skinConcerns: [], certifications: [], priceMax: null });
  };

  const categoryData = category ? categories.find(c => c.slug === category) : null;

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category && category !== 'yan-one') result = result.filter(p => p.category === category);
    if (category === 'yan-one') result = result.filter(p => p.brand === 'yan-one');

    // URL param filters
    if (filterParam === 'new') result = result.filter(p => p.isNew);
    if (filterParam === 'bestsellers') result = result.filter(p => p.isBestseller);
    if (filterParam === 'editors') result = result.filter(p => p.isEditorsPick);

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.keyIngredients?.some(i => i.toLowerCase().includes(q)) ||
        p.skinConcerns?.some(c => c.toLowerCase().includes(q))
      );
    }

    // Active filters
    if (activeFilters.brands.length)
      result = result.filter(p => activeFilters.brands.includes(p.brand));
    if (activeFilters.skinTypes.length)
      result = result.filter(p => p.skinTypes?.some(s => activeFilters.skinTypes.includes(s)));
    if (activeFilters.skinConcerns.length)
      result = result.filter(p => p.skinConcerns?.some(c => activeFilters.skinConcerns.includes(c)));
    if (activeFilters.certifications.length)
      result = result.filter(p => activeFilters.certifications.some(cert => p.certifications?.includes(cert) || (cert === 'clean' && p.certifications?.includes('Clean Beauty'))));

    // Sort
    switch (sort) {
      case 'bestselling': result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)); break;
      case 'new': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
    }

    return result;
  }, [category, filterParam, searchQuery, certParam, activeFilters, sort]);

  const totalActiveFilters = Object.values(activeFilters).flat().filter(Boolean).length;

  const pageTitle = searchQuery
    ? `Search: "${searchQuery}"`
    : filterParam === 'new' ? 'New Arrivals'
    : filterParam === 'bestsellers' ? 'Bestsellers'
    : filterParam === 'editors' ? "Editor's Picks"
    : categoryData?.name ?? 'All Products';

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Shop</span>
          {category && <><span>›</span><span>{categoryData?.name ?? category}</span></>}
        </nav>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <p className={styles.pageCount}>{filtered.length} products</p>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <button
            className={styles.filterToggle}
            onClick={() => setFiltersOpen(o => !o)}
            aria-expanded={filtersOpen}
            aria-controls="plp-filters"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span>Filter</span>
            {totalActiveFilters > 0 && (
              <span className={styles.filterBadge} aria-label={`${totalActiveFilters} active filters`}>{totalActiveFilters}</span>
            )}
          </button>

          <div className={styles.toolbarRight}>
            <label htmlFor="plp-sort" className="sr-only">Sort products</label>
            <select
              id="plp-sort"
              className={styles.sortSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className={styles.layoutToggle} role="group" aria-label="Product layout">
              <button
                className={[styles.layoutBtn, layout === 'grid' ? styles.active : ''].join(' ')}
                onClick={() => setLayout('grid')}
                aria-label="Grid view"
                aria-pressed={layout === 'grid'}
              >
                <LayoutGrid size={16} aria-hidden="true" />
              </button>
              <button
                className={[styles.layoutBtn, layout === 'list' ? styles.active : ''].join(' ')}
                onClick={() => setLayout('list')}
                aria-label="List view"
                aria-pressed={layout === 'list'}
              >
                <List size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {totalActiveFilters > 0 && (
          <div className={styles.activeFilters}>
            {Object.entries(activeFilters).map(([key, vals]) =>
              Array.isArray(vals) ? vals.map(v => (
                <button
                  key={`${key}-${v}`}
                  className={styles.activeFilter}
                  onClick={() => toggleFilter(key, v)}
                  aria-label={`Remove ${v} filter`}
                >
                  {v} <X size={10} aria-hidden="true" />
                </button>
              )) : null
            )}
            <button className={styles.clearAll} onClick={clearAllFilters}>
              Clear all
            </button>
          </div>
        )}

        <div className={styles.body}>
          {/* Filters sidebar */}
          <aside id="plp-filters" className={[styles.sidebar, filtersOpen ? styles.sidebarOpen : ''].join(' ')} aria-label="Product filters">
            <div className={styles.sidebarHead}>
              <span className={styles.sidebarTitle}>Filters</span>
              <button onClick={() => setFiltersOpen(false)} className={styles.sidebarClose} aria-label="Close filters">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Subcategory section — first, above Brand, two-level accordion */}
            {categoryData?.groups && (
              <FilterSection title="Category">
                {categoryData.groups.map(group => (
                  <SubCatGroup
                    key={group.name}
                    group={group}
                    categorySlug={categoryData.slug}
                    activeSub={activeSub}
                  />
                ))}
              </FilterSection>
            )}

            <FilterSection title="Brand">
              {brands.slice(0, 8).map(b => (
                <label key={b.id} className={styles.filterCheckbox}>
                  <input
                    type="checkbox"
                    checked={activeFilters.brands.includes(b.id)}
                    onChange={() => toggleFilter('brands', b.id)}
                  />
                  <span>{b.name}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Skin Type">
              {skinTypes.map(s => (
                <label key={s} className={styles.filterCheckbox}>
                  <input
                    type="checkbox"
                    checked={activeFilters.skinTypes.includes(s)}
                    onChange={() => toggleFilter('skinTypes', s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Skin Concern">
              {skinConcerns.map(c => (
                <label key={c} className={styles.filterCheckbox}>
                  <input
                    type="checkbox"
                    checked={activeFilters.skinConcerns.includes(c)}
                    onChange={() => toggleFilter('skinConcerns', c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Certifications">
              {certifications.map(c => (
                <label key={c} className={styles.filterCheckbox}>
                  <input
                    type="checkbox"
                    checked={activeFilters.certifications.includes(c)}
                    onChange={() => toggleFilter('certifications', c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </FilterSection>

            <div className={styles.sidebarActions}>
              {totalActiveFilters > 0 && (
                <Button variant="ghost" fullWidth onClick={clearAllFilters}>Clear All</Button>
              )}
              <Button variant="primary" fullWidth onClick={() => setFiltersOpen(false)}>
                View {filtered.length} Products
              </Button>
            </div>
          </aside>

          {filtersOpen && (
            <div className={styles.sidebarOverlay} onClick={() => setFiltersOpen(false)} />
          )}

          {/* Products */}
          <div className={styles.products}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>No products found</p>
                <p className={styles.emptyDesc}>Try adjusting your filters or search term.</p>
                <Button variant="outline" onClick={clearAllFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={[styles.grid, layout === 'list' ? styles.listGrid : ''].join(' ')}>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} layout={layout} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.filterSection}>
      <button className={styles.filterSectionHead} onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <ChevronDown size={14} className={open ? styles.chevronOpen : ''} />
      </button>
      {open && <div className={styles.filterSectionBody}>{children}</div>}
    </div>
  );
}

/* SubCatGroup — same accordion design as filter sections in the sidebar */
/* SubCatGroup — nested accordion inside the "Category" FilterSection.
   Parent row shows the group name (e.g. "Face") and expands to show items. */
function SubCatGroup({ group, categorySlug, activeSub }) {
  const groupHasActive = group.items.some(i => i.slug === activeSub);
  const [open, setOpen] = useState(groupHasActive);

  return (
    <div className={styles.subGroup}>
      {/* Parent row — acts like a mini accordion head */}
      <button
        className={[styles.subGroupHead, groupHasActive ? styles.subGroupHeadActive : ''].join(' ')}
        onClick={() => setOpen(o => !o)}
      >
        <ChevronDown size={12} className={[styles.subGroupChevron, open ? styles.chevronOpen : ''].join(' ')} />
        <span>{group.name}</span>
        {groupHasActive && <span className={styles.subGroupDot} />}
      </button>

      {/* Children — each item is a Link with checkbox-style indicator */}
      {open && (
        <div className={styles.subGroupItems}>
          {group.items.map(item => (
            <Link
              key={item.slug}
              to={`/shop/${categorySlug}?sub=${item.slug}`}
              className={[
                styles.subCatCheckRow,
                activeSub === item.slug ? styles.subCatCheckActive : '',
                item.highlight ? styles.subCatCheckHighlight : '',
              ].join(' ')}
            >
              <span className={styles.subCatCheckbox}>
                {activeSub === item.slug && <span className={styles.subCatCheckMark} />}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
