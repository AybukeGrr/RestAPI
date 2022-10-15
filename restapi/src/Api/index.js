import React, { useEffect, useState } from "react";
import classes from "./index.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Pagination from "../components/pagination";
import "../components/pagination.css";

const url = "https://jsonplaceholder.typicode.com/photos";

const RestApi = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState();
  const [changeValue, setChangeValue] = useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(100);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((photos) => {
        setPhotos(photos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp></FaArrowUp>;
    }
    return <FaArrowDown></FaArrowDown>;
  };

  const renderThead = () => {
    return (
      <thead>
        <tr>
          <th onClick={sortById}>
            ID
            {sorted.sorted === "id" ? renderArrow() : null}
          </th>
          <th>TITLE</th>
          <th>URL</th>
          <th>THUMB NAIL URL</th>
        </tr>
      </thead>
    );
  };

  const remove = (photos) => {
    if (window.confirm("Silmek üzerisiniz emin misiniz")) {
      setPhotos((prev) => {
        return prev.filter((x) => x.id != photos.id);
      });
    }
  };

  const edit = (photos) => {
    setSelectedPhotos(photos);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const sortById = () => {
    setSorted({ sorted: "id", reversed: !sorted.reversed });
    const photosCopy = [...photos];
    photosCopy.sort((photosA, photosB) => {
      if (sorted.reversed) {
        return photosA.id - photosB.id;
      }
      return photosB.id - photosA.id;
    });
    setPhotos(photosCopy);
  };

  const handleKaydet = () => {
    const newPhotos = photos.map((photos) => {
      if (photos.id == selectedPhotos.id) {
        return { ...photos, title: changeValue };
      } else {
        return photos;
      }
    });
    setPhotos(newPhotos);
  };

  const renderBody = () => {
    return (
      <tbody>
        {photos.slice(firstPostIndex, lastPostIndex).map((photos, index) => {
          return (
            <tr key={index}>
              <td>{photos.id}</td>
              <td>{photos.title}</td>
              <td>{photos.url}</td>
              <td>{photos.thumbnailUrl}</td>
              <td>
                <Button
                  id="removeButton"
                  className={`btn btn-sm btn-danger ${classes.actionButton} `}
                  onClick={() => remove(photos)}
                >
                  Sil
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => edit(photos)}
                  className="btn btn-sm btn-warning"
                >
                  Düzenle
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderEditForm = () => {
    return (
      <div>
        <input
          id="inputText"
          type={"text"}
          onChange={(e) => setChangeValue(e.target.value)}
        />
        <inpu type="check" />
        <Button id="saveButton" variant="success" onClick={handleKaydet}>
          Kaydet
        </Button>
        <Button variant="primary" onClick={() => setSelectedPhotos(undefined)}>
          Vazgeç
        </Button>
      </div>
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`${classes.container} container`}>
      {selectedPhotos && renderEditForm()}
      <table className="table">
        {renderThead()}
        {renderBody()}
      </table>
    </div>
  );
};

export default RestApi;
