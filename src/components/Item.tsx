import { useState } from "react";
import { ItemImg } from "../models/item";
import { Filters } from "../models/filters";

const Item = (props: {
  items: ItemImg[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  lastPage: number;
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const search = (s: string) => {
    props.setFilters({
      ...props.filters,
      page: 1,
      s,
    });
  };

  const sort = (sort: string) => {
    props.setFilters({
      ...props.filters,
      page: 1,
      sort,
    });
  };

  const load = () => {
    props.setFilters({
      ...props.filters,
      page: props.filters.page + 1,
    });
  };

  const select = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  let button;

  if (props.filters.page !== props.lastPage) {
    button = (
      <div className="btn-wrap">
        <button className="btn" onClick={load}>
          Load More
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => search(e.target.value)}
        />

        <select className="form-select" onChange={(e) => sort(e.target.value)}>
          <option>Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul className="grid">
        {props.items?.map((item) => {
          return (
            <li
              className="grid__item"
              key={item.id}
              onClick={() => select(item.id)}
            >
              <img src={item.url} alt={item.title} />
              <h2>
                {item.title.substring(0, 28)}
                {item.title.length > 28 ? "..." : ""}
              </h2>

              <ul>
                <li>
                  <a href={item.url} target="_blank" rel="noreferrer noopener">
                    View Image
                  </a>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
      {button}
    </>
  );
};
export default Item;
