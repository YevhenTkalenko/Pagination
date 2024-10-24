//Пагинация
//Состовляющие - стейт на текущую страницу (currentPage), стейт на все страны (countries) и количество стран на странице (countriesPerPage)
//Стейт №1 - получение данных в стейт countries. В данном случае - это просто запрос на  jsonplaceholder.com + полная обработка данных.
//Стейт №2 - ручное определение количества стран на странице countriesPerPage - это стейт, но этот стейт не будет меняться.
//Стейт №3 - определение стартовой страницы currentPage(1). Далее эта страница будет меняться.

// Реализация.
//Шаг №1 - динамическое создание кнопок (или других элементов, для самой пагинации). Это делается с помощью цикла for(), где нужно заполнить массив, который будет рендериться.
//Логика - for(let i = 0; i <= Math.ceil((totalCountries / countriesPerPage)); i++) - то есть общее количество кнопок это результат деления общего количества стран на количество на странице.
//Далее - вывод на страницу того массива, который заполнили.

//Шаг №2 - определение того, какие имеенно страны мы должны извлечь со стартового массива countries. В этом необходимо получить (создать переменные) с первым и последним индексом на странице.
//Логика последнего индекса - создаём lastCountrieIndex (последний индекс) и firstCountrieIndex(первый индекс). Последний индекс - это произведение поточной страницы (currentPage) и количесва страниц (countriesPerPage).
//const lastCountrieIndex = currentPage * countriesPerPage - то есть, если на странице 7 стран и поточная страница 8, то 7 * 8 = 56. Это и есть последний индекс.
//Логика первого индекса - создаём firstCountrieIndex (первый индекс). Это разница между lastCountrieIndex и countriesPerPage.
//const firstCountrieIndex = lastCountrieIndex - countriesPerPage - то есть, если последний индекс 56 и на странице 8 страниц, то первый индекс = 48
//Так как изветно какие именно элементы должны быть отображены, их необходимо получить с массива из данными.
//const currentCountries = countries.slice(firstCountrieIndex, lastCountrieIndex);

//В результате, будет рендериться 7 стран только на первой странице (currentPage = 1);
//Чтоб это исправить, нужно создать функцию, которая будет принимать каждый элемент вывода массива и Шаг№1
//const paginate = (pageNumber) => setCurrentPage(pageNumber);

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Countries from "./Components/Countries";
import Pagination from "./Components/Pagination";

interface Countries_Interface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function App() {
  const [countries, setCountries] = useState<Countries_Interface[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countriesPerPage] = useState<number>(20);

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      const request = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setCountries(request.data);
      setLoading(false);
    };

    getCountries();
  }, []);

  const lastCountrieIndex = currentPage * countriesPerPage;
  const firstCountrieIndex = lastCountrieIndex - countriesPerPage;
  const currentCountrie = countries.slice(
    firstCountrieIndex,
    lastCountrieIndex
  );

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  const onIncrementPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const onDecrementPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(countries.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCountries={countries.length}
        paginate={paginate}
        currentPage={currentPage}
        pageNumbers={pageNumbers}
      />
      <div className="btn-groupe">
        <button onClick={onDecrementPage} disabled={currentPage <= 1}>
          Prev page
        </button>
        <button
          onClick={onIncrementPage}
          disabled={currentPage >= pageNumbers.length}
        >
          Next page
        </button>
      </div>
      <div className="container">
        {isLoading
          ? "Loading...."
          : currentCountrie.map(({ id, name, email, body }) => (
              <div key={id} className="card">
                <Countries id={id} name={name} email={email} body={body} />
              </div>
            ))}
      </div>
    </>
  );
}

export default App;
