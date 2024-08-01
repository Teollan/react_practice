const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const isQueryEmpty = searchQuery === '';

  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        {!isQueryEmpty && (
          <span className="icon is-right">
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
            />
          </span>
        )}
      </p>
    </div>
  );
};

export default SearchBar;
