import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Item from "./components/Item";
import { ItemImg } from "./models/item";
import { Filters } from "./models/filters";

function App() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState<ItemImg[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //filter stuff
  const [filters, setFilters] = useState<Filters>({
    s: "",
    sort: "",
    page: 1,
  });
  const [lastPage, setLastPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    const getDataFromAPI = async () => {
      const res = await axios.get(
        "https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=30"
      );

      if (res.data.photos.length > 0) {
        setIsLoading(false);
      }

      setPhotos(res.data.photos);
      //setFilteredPhotos(res.data.photos);
      setFilteredPhotos(res.data.photos.slice(0, filters.page * perPage));

      setLastPage(Math.ceil(res.data.photos.length / perPage));
    };

    getDataFromAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //filtered data here
  useEffect(() => {
    let items = photos.filter(
      (p: any) => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
      // || p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
    );

    if (filters.sort === "asc") {
      items.sort((a: any, b: any) => {
        if (a.id > b.id) {
          return 1;
        }

        if (a.id < b.id) {
          return -1;
        }

        return 0;
      });
    } else if (filters.sort === "desc") {
      items.sort((a: any, b: any) => {
        if (a.id > b.id) {
          return -1;
        }

        if (a.id < b.id) {
          return 1;
        }

        return 0;
      });
    }

    console.log(filters.page * perPage);
    if (items.length) {
      setIsLoading(false);
    }
    setLastPage(Math.ceil(items.length / perPage));
    setFilteredPhotos(items.slice(0, filters.page * perPage));
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <header className="App-header">
        <h1>Easy Filtering</h1>
        <Item
          items={filteredPhotos}
          filters={filters}
          setFilters={setFilters}
          lastPage={lastPage}
          isLoading={isLoading}
        />
      </header>
    </div>
  );
}

export default App;
