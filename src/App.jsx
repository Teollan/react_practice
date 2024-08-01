/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import ProductTable from './components/ProductTable/ProductTable';
import OwnerSelector from './components/OwnerSelector/OwnerSelector';
import SearchBar from './components/SearchBar/SearchBar';
import CategorySelector from './components/CategorySelector/CategorySelector';

function findCategoryWithId(categories, id) {
  return categories.find(category => category.id === id);
}

function findUserWithId(users, id) {
  return users.find(user => user.id === id);
}

function getProguctsToDisplay({
  products,
  userId = null,
  searchQuery = '',
  categoryIds = [],
  sortMode = { column: null, order: null },
}) {
  let result = [...products];

  if (userId !== null) {
    result = result.filter(({ user }) => user.id === userId);
  }

  if (categoryIds.length !== 0) {
    result = result.filter(({ category }) => categoryIds.includes(category.id));
  }

  if (searchQuery !== '') {
    result = result.filter(({ name }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (sortMode.column !== null && sortMode.order !== null) {
    switch (sortMode.column) {
      case 'ID':
        result.sort(({ id: a }, { id: b }) => a - b);
        break;
      case 'Product':
        result.sort(({ name: a }, { name: b }) => a.localeCompare(b));
        break;
      case 'Category':
        result.sort((A, B) => {
          const a = A.category.title;
          const b = B.category.title;

          return a.localeCompare(b);
        });
        break;
      case 'User':
        result.sort((A, B) => {
          const a = A.user.name;
          const b = B.user.name;

          return a.localeCompare(b);
        });
        break;
      default:
        throw new Error(`${sortMode.column} is not a valid column name`);
    }

    if (sortMode.order === 'desc') {
      result.reverse();
    }
  }

  return result;
}

const products = productsFromServer.map(product => {
  const category = findCategoryWithId(categoriesFromServer, product.categoryId);
  const user = findUserWithId(usersFromServer, category.ownerId);

  return { ...product, category, user };
});

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [sortMode, setSortMode] = useState({ column: null, order: null });

  const productsToDisplay = getProguctsToDisplay({
    products,
    userId: selectedUserId,
    searchQuery,
    categoryIds: selectedCategoryIds,
    sortMode,
  });

  const isNothingToDisplay = productsToDisplay.length === 0;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <OwnerSelector
              owners={usersFromServer}
              selectedOwnerId={selectedUserId}
              setSelectedOwnerId={setSelectedUserId}
            />

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <CategorySelector
              categories={categoriesFromServer}
              selectedCategoryIds={selectedCategoryIds}
              setSelectedCategoryIds={setSelectedCategoryIds}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSelectedUserId(null);
                  setSearchQuery('');
                  setSelectedCategoryIds([]);
                  setSortMode({ column: null, order: null });
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {isNothingToDisplay ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductTable
              products={productsToDisplay}
              sortMode={sortMode}
              setSortMode={setSortMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};
