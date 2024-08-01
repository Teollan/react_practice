import classNames from 'classnames';

function toggleSelection(ids, target) {
  if (ids.includes(target)) {
    return ids.filter(id => id !== target);
  }

  return [...ids, target];
}

const CategorySelector = ({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}) => {
  const isNoneSelected = selectedCategoryIds.length === 0;

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={classNames('button is-success mr-6', {
          'is-outlined': !isNoneSelected,
        })}
        onClick={() => setSelectedCategoryIds([])}
      >
        All
      </a>

      {categories.map(category => {
        const isSelected = selectedCategoryIds.includes(category.id);

        return (
          <a
            key={category.id}
            data-cy="Category"
            className={classNames('button mr-2 my-1', {
              'is-info': isSelected,
            })}
            onClick={() =>
              setSelectedCategoryIds(
                toggleSelection(selectedCategoryIds, category.id),
              )
            }
            href="#/"
          >
            {category.title}
          </a>
        );
      })}
    </div>
  );
};

export default CategorySelector;
