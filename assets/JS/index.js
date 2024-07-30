function modalNostrum() {
  const test1 = document.getElementById("test_01");
  const test2 = document.getElementById("test_02");


  if (test2.classList.contains("col-10") ) {
    test2.classList.remove("col-10");
    test2.classList.add("col-8");
    test1.classList.toggle("d-none");
    
  } else {
    test2.classList.remove("col-8");
    test2.classList.add("col-10");
    test1.classList.toggle("d-none");
  }
}
