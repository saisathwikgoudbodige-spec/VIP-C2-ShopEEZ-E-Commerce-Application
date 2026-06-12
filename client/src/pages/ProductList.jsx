import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaStar, FaFilter } from 'react-icons/fa';
import { formatPrice } from '../utils/helpers';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, categories, loading, error, page, pages, total } = useSelector((state) => state.product);

  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlMinPrice = searchParams.get('minPrice') || '';
  const urlMaxPrice = searchParams.get('maxPrice') || '';
  const urlRating = searchParams.get('rating') || '';
  const urlSort = searchParams.get('sort') || '';
  const urlPage = searchParams.get('page') || '1';

  const [search, setSearch] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRating, setSelectedRating] = useState(urlRating);
  const [sort, setSort] = useState(urlSort);

  useEffect(() => {
    setSearch(urlSearch);
    setSelectedCategory(urlCategory);
    setSelectedRating(urlRating);
    setSort(urlSort);
    const min = Number(urlMinPrice) || 0;
    const max = Number(urlMaxPrice) || 100000;
    setPriceRange([min, max]);
  }, [urlSearch, urlCategory, urlMinPrice, urlMaxPrice, urlRating, urlSort]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(
      fetchProducts({
        search: urlSearch,
        category: urlCategory,
        minPrice: urlMinPrice,
        maxPrice: urlMaxPrice,
        rating: urlRating,
        sort: urlSort,
        page: urlPage
      })
    );
  }, [dispatch, urlSearch, urlCategory, urlMinPrice, urlMaxPrice, urlRating, urlSort, urlPage]);

  const applyFilters = (updates = {}) => {
    const nextParams = {
      search: updates.search !== undefined ? updates.search : search,
      category: updates.category !== undefined ? updates.category : selectedCategory,
      minPrice: updates.priceRange !== undefined ? updates.priceRange[0] : priceRange[0],
      maxPrice: updates.priceRange !== undefined ? updates.priceRange[1] : priceRange[1],
      rating: updates.rating !== undefined ? updates.rating : selectedRating,
      sort: updates.sort !== undefined ? updates.sort : sort,
      page: '1'
    };

    Object.keys(nextParams).forEach((key) => {
      if (!nextParams[key]) {
        delete nextParams[key];
      }
    });

    setSearchParams(nextParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handlePriceAfterChange = (value) => {
    applyFilters({ priceRange: value });
  };

  const handlePageChange = (pageNum) => {
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams({ ...currentParams, page: String(pageNum) });
  };

  return (
    <div className="product-list-page">
      {/* Sidebar Filters */}
      <aside className="filters-sidebar glass-card">
        <div className="sidebar-header">
          <h3><FaFilter /> Filters</h3>
          <button onClick={resetFilters} className="btn-text">Reset All</button>
        </div>

        {/* Categories */}
        <div className="filter-group">
          <h4>Category</h4>
          <div className="filter-options">
            <label className="radio-label">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === ''}
                onChange={() => applyFilters({ category: '' })}
              />
              <span>All Categories</span>
            </label>
            {categories.map((cat, idx) => (
              <label key={idx} className="radio-label">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => applyFilters({ category: cat })}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="filter-group">
          <h4>Price Range</h4>
          <div className="price-slider-container">
            <Slider
              range
              min={0}
              max={100000}
              step={500}
              value={priceRange}
              onChange={handlePriceChange}
              onAfterChange={handlePriceAfterChange}
            />
            <div className="price-labels">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Ratings Filter */}
        <div className="filter-group">
          <h4>Customer Rating</h4>
          <div className="filter-options">
            {[4, 3, 2, 1].map((stars) => (
              <label key={stars} className="radio-label rating-select">
                <input
                  type="radio"
                  name="rating"
                  checked={Number(selectedRating) === stars}
                  onChange={() => applyFilters({ rating: String(stars) })}
                />
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < stars ? 'star-filled' : 'star-empty'} />
                  ))}
                  <span className="rating-label">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid & Topbar */}
      <section className="product-list-content">
        <div className="top-bar glass-card">
          <div className="results-count">
            <span>Showing <strong>{total}</strong> products</span>
          </div>

          <div className="top-bar-actions">
            <div className="sort-container">
              <label htmlFor="sort">Sort By:</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  applyFilters({ sort: e.target.value });
                }}
                className="form-control"
              >
                <option value="">Newest</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : products.length === 0 ? (
          <div className="no-products glass-card">
            <h3>No Products Found</h3>
            <p>Try resetting the filters or modifying your search query.</p>
            <button onClick={resetFilters} className="btn btn-primary">Reset Filters</button>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="btn btn-secondary page-btn"
                >
                  Previous
                </button>
                {[...Array(pages).keys()].map((pNum) => (
                  <button
                    key={pNum + 1}
                    onClick={() => handlePageChange(pNum + 1)}
                    className={`btn page-btn ${page === pNum + 1 ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {pNum + 1}
                  </button>
                ))}
                <button
                  disabled={page === pages}
                  onClick={() => handlePageChange(page + 1)}
                  className="btn btn-secondary page-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ProductList;
