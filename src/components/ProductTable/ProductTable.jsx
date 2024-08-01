/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Product from '../Product/Product';

function getSortModeIcon(sortMode, column) {
  if (sortMode.column !== column) {
    return 'fa-sort';
  }

  return sortMode.order === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
}

const ProductTable = ({ products, sortMode, setSortMode }) => {
  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['ID', 'Product', 'Category', 'User'].map(column => {
            const sortModeIcon = getSortModeIcon(sortMode, column);

            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column}
                  <a href="#/">
                    <span
                      className="icon"
                      onClick={() => {
                        if (sortMode.column !== column) {
                          setSortMode({ column, order: 'asc' });

                          return;
                        }

                        if (sortMode.order === 'asc') {
                          setSortMode({ column, order: 'desc' });

                          return;
                        }

                        if (sortMode.order === 'desc') {
                          setSortMode({ column: null, order: null });
                        }
                      }}
                    >
                      <i data-cy="SortIcon" className={`fas ${sortModeIcon}`} />
                    </span>
                  </a>
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
