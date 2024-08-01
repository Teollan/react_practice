import classNames from 'classnames';

const OwnerSelector = ({ owners, selectedOwnerId, setSelectedOwnerId }) => {
  const isNoneSelected = selectedOwnerId === null;

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        className={classNames('', { 'is-active': isNoneSelected })}
        onClick={() => setSelectedOwnerId(null)}
        href="#/"
      >
        All
      </a>

      {owners.map(({ name, id }) => {
        const isSelected = id === selectedOwnerId;

        return (
          <a
            key={id}
            data-cy="FilterUser"
            className={classNames('', { 'is-active': isSelected })}
            onClick={() => setSelectedOwnerId(id)}
            href="#/"
          >
            {name}
          </a>
        );
      })}
    </p>
  );
};

export default OwnerSelector;
