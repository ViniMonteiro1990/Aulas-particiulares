const currentPage = location.pathname //para pegar a localizacao da pagina atual
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}