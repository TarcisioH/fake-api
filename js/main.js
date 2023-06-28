let tabela = document.querySelector('#tabela');

//pegando o retorno da Api, passando cada objeto para a criacao dos elementos no html e chamando os botoes de exportação
function preencherTabela () {
    let xhr = consumirApi();
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            let response = xhr.responseText;
            let arrayObjetos = JSON.parse(response);
            
            arrayObjetos.forEach((elemento) => {
            criarElementos(elemento);
        })

        criarBotoesTabela();
        }

        

    })
    xhr.send();
    
}
//consumindo a api
function consumirApi() {
    const url = "https://fakestoreapi.com/products";
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    
    return xhr
}

function criarElementos(produto) {
    let tr = document.createElement('tr');
    let idTd = document.createElement('td');
    let nomeTd = document.createElement('td');
    let precoTd = document.createElement('td');
    let categoriaTd = document.createElement('td');
    let imagemTd = document.createElement('td');
    let img = document.createElement('img');

    idTd.textContent = produto.id;
    nomeTd.textContent = produto.title;
    precoTd.textContent = `R$ ${produto.price.toFixed(2)}`;
    categoriaTd.textContent = produto.category;
    img.src = produto.image;
    img.classList.add("imagem");
    


    tr.appendChild(idTd);
    tr.appendChild(nomeTd);
    tr.appendChild(precoTd);
    tr.appendChild(categoriaTd);
    imagemTd.appendChild(img);
    tr.appendChild(imagemTd);
    tabela.querySelector('tbody').appendChild(tr);
    
}

preencherTabela();


//traduzindo a tabela e criando os botoes
function criarBotoesTabela() {
$(document).ready(function () {
    $('#tabela').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
        language: {
            url: "js/traducao-tabela.json"
          }
    });
});
}