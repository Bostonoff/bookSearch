// const categories = document.querySelector("#categories");
// const books = document.querySelector("#books");
// const booksUrl = `"https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=${token}"`;
// const token = "1nkJFI3yA7GprbQWHj784Z3s4PibeamG";

// const loadingHtml = `<div class="spinner-border text-primary" role="status">
// <span class="visually-hidden">Loading...</span>
// </div>`;
// const errorHtml = `<p class="text-danger">
// <i class="fa-solid fa-triangle-exclamation"></i>Error in a Fetch
// </p>`;
// const getCategories = async () => {
//   const res = await axios.get(
//     `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${token}`
//   );
//   return res;
// };

// // active onclik
// let activeLink;
// const setCategories = async () => {
//   categories.innerHTML = loadingHtml;
//   try {
//     const res = await getCategories();
//     categories.innerHTML = "";
//     res?.data?.results?.map((item) => {
//       const li = document.createElement("li");
//       li.className = "list-group-item";
//       li.style.cursor = "pointer";
//       li.innerHTML = `${item.display_name}
//       <div class="d-flex justify-content-between align-items-center">
//         <span><i class="fa-solid fa-celendar-days"></i>${item.newest_published_date}</span>
//         <span class="badge bg-warning">${item.updated}</span>
//       </div>`;
//       li.onclick = (event) => {
//         activeLink?.classList?.remove("active");
//         event.target.classList.add("active");
//         activeLink = event.target;
//       };
//       categories.appendChild(li);
//     });
//     console.log(res);
//   } catch (error) {
//     categories.innerHTML = errorHtml;
//   }
// };

// // const setList = async () => {
// //   books.innerHTML = loadingHtml;
// // };

// const init = () => {
//   setCategories();
// };
// init();

// get Bolimlari

// const loadingHtml = `<div class="spinner-border text-primary" role="status">
// <span class="visually-hidden">Loading...</span>
// </div>`;
// const errorHtml = `<p class="text-danger">
// <i class="fa-solid fa-triangle-exclamation"></i>Error in a Fetch
// </p>`;

const apiKey = "2XuAQKHkfGEjFOfOGGItDqmo0GIP9WUI";
const baseUrl = `https://api.nytimes.com/svc/books/v3`;
const getList = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/lists/names.json?api-key=${apiKey}`
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.log("Xatolik sodir boldi" + error);
    return { success: false };
  }
};

// Set Bolimlari
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const list = document.getElementById("list");

let activeLink;

const setList = async () => {
  list.innerHTML = "";
  loading.classList.remove("d-none");
  error.classList.add("d-none");
  list.classList.add("d-none");

  const res = await getList();
  loading.classList.add("d-none");
  if (res.success) {
    list.classList.remove("d-none");
    res.data.results.map((v, index) => {
      const a = document.createElement("a");
      a.href = `#${v.list_name_encoded}`;
      a.className = `list-group-item border-0 rounded-4  
      list-group-item-action`;
      a.onclick = (event) => {
        activeLink?.classList?.remove("active");
        activeLink = event.target;

        event.target.classList.add("active");
        setBooks(v);
      };
      a.innerHTML = `${v.list_name}
      <p class="d-flex justify-content-between align-items-center m-0 mt-2">
                <span><i class="fa-solid fa-calendar-days me-2"></i>${v.newest_published_date}</span>
                <span class="badge bg-warning text-light">${v.updated}</span>
              </p>`;
      list.appendChild(a);
    });
    setBooks(res.data.results[0]);
    list.children[0].classList.add("active");
  } else {
    error.classList.remove("d-none");
  }
};
setList();

// get books
const getBooks = async (list_name_encoded) => {
  try {
    const res = await axios.get(
      `${baseUrl}/lists/current/${list_name_encoded}.json?api-key=${apiKey}`
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.log("Xatolik sodir boldi" + error);
    return { success: false };
  }
};

// set books
const loading2 = document.getElementById("loading2");
const error2 = document.getElementById("error2");
const books = document.getElementById("books");
const listName = document.getElementById("list-name");
const modalBody = document.getElementById("modalBody");
const myModal = new bootstrap.Modal("#productDetail", {
  keyboard: false,
});
const getBuyLinks = (links) => {
  let strLinks = ``;
  links.map((v, i) => {
    strLinks += `
    <a href="${v.url}" class="list-group-item list-group-item-action"><i class="fa fa-link"></i> ${v.name}</a>`;
  });
  return strLinks;
};

const showDetail = (book_uri) => {
  let selectedBook;
  for (let i = 0; i < booksArray.length; i++) {
    if (booksArray[i].book_uri === book_uri) {
      selectedBook = booksArray[i];
      break;
    }
  }
  modalBody.innerHTML = `<div class="row">
  <div class="col-md-6">
    <img src="${selectedBook.book_image}" class="w-100 rounded-3" alt="sos!">
  </div>
  

  <div class="col-md-6">
    <p class="fw-bold">
    Books Name: ${selectedBook.title}
  </p>
  <p class="fw-bold">
    Author: ${selectedBook.author}
  </p>
  <p class="fw-bold">
    Price: <span class="text-warning">${selectedBook.price}$</span>
  </p>
  <p class="text-secondary">${selectedBook.description}</p>
 
  <p class = "fw-bold">Publisher: ${selectedBook.publisher}</p>
  <p  class = "fw-bold">Isbn10:${selectedBook.primary_isbn10}</p>
  <p  class = "fw-bold">Isbn13:${selectedBook.primary_isbn13}</p>
</div>
<p class="fw-bold text-center py-3">Buy Links:</p>
    <div class="list-group buy-links list-group-horizontal d-flex flex-wrap gap-2 justify-content-around ">
    ${getBuyLinks(selectedBook.buy_links)}
    </div>
</div>`;
  myModal.show();
};

const mapBooks = (searchStr) => {
  books.innerHTML = "";
  searchStr = searchStr.toLowerCase();
  const filteredArray = booksArray.filter((v, i) => {
    const title = v.title.toLowerCase().indexOf(searchStr) != -1;
    const author = v.author.toLowerCase().indexOf(searchStr) != -1;
    const price = v.price.toLowerCase().indexOf(searchStr) != -1;
    return title || author || price;
  });
  filteredArray.map((v, i) => {
    const book = document.createElement("div");
    book.className = `col-sm-6 col-lg-4 col-xl-3 mb-4`;
    book.innerHTML = ` <div class="card shadow rounded-4 p-3 bg-white border-0 h-100  flex-column justify-content-between">
    <div>
      <img src="${v.book_image}" class="w-100 rounded-4 img" alt="sos!">
    <p class="fw-bold mb-2 mt-4 title">Title: ${v.title}</p>
    <p class="text-secondary">Author:${v.author}</p>
    <p>Price: <span class="text-warning">${v.price}</span></p>
    </div>
    <div class="d-flex">
      <a href = "${v.amazon_product_url}"
      class="btn btn-dark text-light d-block w-100 rounded-3 me-1"
    >
      BUY
    </a>
    <a
    class="btn btn-warning text-light d-block w-100 rounded-3 ms-1"
    type="button"
    onclick = "showDetail('${v.book_uri}')"
  >
    More
  </a>
    </div>
  </div>`;
    books.appendChild(book);
  });
};
let booksArray;
const setBooks = async (obj) => {
  books.innerHTML = "";
  loading2.classList.remove("d-none");
  error2.classList.add("d-none");
  books.classList.add("d-none");
  const res = await getBooks(obj.list_name_encoded);
  // loading2.classList.remove("d-none");
  // loading2.classList.add("d-none");
  if (res.success) {
    booksArray = res.data.results.books;

    loading2.classList.add("d-none");
    listName.innerHTML = `Section: ${obj.list_name}`;
    books.classList.remove("d-none");
    mapBooks("");
  } else {
    error2.classList.remove("d-none");
  }
};
// setBooks();

// search function
const searchInput = document.getElementById("searchInput");
const search = () => {
  // setBooks(searchInput.value);
  mapBooks(searchInput.value);
};
