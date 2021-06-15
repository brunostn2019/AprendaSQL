//
//function openNav() {
//  document.getElementById("mySidenav").style.width = "250px";
//  document.getElementById("main").style.marginLeft = "250px";
//}
//
//function closeNav() {
//  document.getElementById("mySidenav").style.width = "0";
//  document.getElementById("main").style.marginLeft= "0";
//}
 var banco = openDatabase('SQLPT', '1.0', 'tabelas para treinamento em SQL',2*1024*1024);

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
  document.getElementById("main").style.marginLeft = "200px";
  document.body.style.backgroundColor = "white";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}
function exibirErroGenerico(msgErro){
  alert("Ocorreu um erro: " + msgErro);
}
function exibirErroSQL(msgErro){
  alert("Erro ao executar SQL: " + msgErro);
}

//Pega uma linha do result set como parametro para retirar os nomes das colunas quebrando por virgula a string e montando um array
//esse array fica com valores string no formato 'nomeColuna: valor', isso é feito para facilitar a captura dos nomes da coluna
//para montar cabeçalhos de tabelas HTML na página de forma dinamica, ou seja, nao precisamos saber qual tabela do BD estamos acessando para montar
//a tabela HTML, nem quantas colunas foram solicitadas na instrução select.

//cria um array de strings que contem os nomes das colunas e seus valores (retirados de uma linha do result set) exemplo: "nomeCliente: Bruno"
//Após isso o array é tratado para retirar apenas os nomes das colunas fazendo um substring da posição 0 até a posição dos ':' dois pontos
//retorna o array com os nomes das colunas após a montagem do cabeçalho para que seja utilizado na hora de montar as linhas da tabela HTML
function convertLinhaEmArray(linhaString){

 linhaString = linhaString.replaceAll('\"','');
      linhaString = linhaString.replaceAll('{','');
      linhaString = linhaString.replaceAll('}','');
        var arrayNomesColunas = linhaString.split(',')
        var stringColunas='<tr>';
        for(var x=0;  x<arrayNomesColunas.length;x++){
        arrayNomesColunas[x] = arrayNomesColunas[x].substring(0,arrayNomesColunas[x].indexOf(':'))
        stringColunas+='<th>'+arrayNomesColunas[x]+'</th>';
        }
        stringColunas+='</tr>';
        $("#tabelaResultado > thead").append(stringColunas);
        return arrayNomesColunas;


    //  return linhaString;
}

//recebe como parametro uma linha de um resultset e um array com os nomes das colunas extraidos desse result set
function criaLinhasTabela(linhaRetornoTabela,arrayNomesColunas)
{
var stringLinha='<tr>';
for(var x=0;  x<arrayNomesColunas.length;x++){
//acessa o valor da coluna de uma linha pelo nome da coluna
stringLinha+='<td>'+linhaRetornoTabela[[arrayNomesColunas[x]]]+'</td>';

}
stringLinha+='</tr>';
$("#tabelaResultado > tbody").append(stringLinha);
}

//function criaLinhasTabela(arr){
//var stringLinha='<tr>';
//for(var x=0;  x<arr.length;x++){
//arr[x] = arr[x].substring(arr[x].indexOf(':')+1,arr[x].length);
//stringLinha+='<td>'+arr[x]+'</td>';
//}
//stringLinha+='</tr>';
//$("#tabelaResultado > tbody").append(stringLinha);
//}

//limpa campos da pagina para novas execuções
function limparCampos()
{
$("#registrosEncontrados").html('');
$("#tabelaResultado tr").remove();
}






function montarBotoesNextPrev(indexClicado){
var listamenu = $('#listaMenu')[0];

if(indexClicado==0)
$('#btnAnterior').attr("href", "#");
else
$('#btnAnterior').attr("href", listaMenu.children[indexClicado-1].title)

$('#btnProximo').attr("href", listaMenu.children[indexClicado+1].title)

//alert(listaMenu.children[indexClicado].title);
}

//Função criada para montar tabelas na página de forma dinamica, ou seja, nao precisamos saber qual tabela do BD estamos acessando para montar
//a tabela HTML, nem quantas colunas foram solicitadas na instrução select.
//Recebe um array de strings que contem os nomes das colunas e seus valores (retirados de uma linha do result set) exemplo: "nomeCliente: Bruno"
//Após isso o array é tratado para retirar apenas os nomes das colunas fazendo um substring da posição 0 até a posição dos ':' dois pontos
function criaColunasTabela(arrayNomesColunas){
var stringColunas='<tr>';
for(var x=0;  x<arrayNomesColunas.length;x++){
arrayNomesColunas[x] = arrayNomesColunas[x].substring(0,arrayNomesColunas[x].indexOf(':'))
stringColunas+='<th>'+arrayNomesColunas[x]+'</th>';
}
stringColunas+='</tr>';
$("#tabelaResultado > thead").append(stringColunas);
return arrayNomesColunas;
}


//remove espaços no inicio e final de uma string, alem de remover quebras de linhas feitas com 'enters'
function removeEspacosString(textoString){

textoString = textoString.trim();
textoString = textoString.replace(/(\r\n|\n|\r)/gm, " ");

return textoString;
}


//verifica qual instrução SQL foi enviada pelo usuário a partir da checagem da primeira palavra da instrução
function executarSQL(){
var stringSQL = removeEspacosString(window.editor.getValue());

if(stringSQL){

var primeiraPalavra = stringSQL.replace(/ .*/,' ');

limparCampos();

if(primeiraPalavra.toUpperCase().includes("SELECT") )
    executarSELECTSQL(stringSQL);
    else if(primeiraPalavra.toUpperCase().includes("INSERT") )
      executarINSERTSQL(stringSQL);
        else if(primeiraPalavra.toUpperCase().includes("UPDATE") )
            executarUPDATESQL(stringSQL);
              else if(primeiraPalavra.toUpperCase().includes("DELETE") )
                  executarDELETESQL(stringSQL);
                  else
                 exibirErroGenerico('Comando digitado não permitido ou não reconhecido!');
}
else
{
exibirErroGenerico('Campo vazio!');
}
}
function executarINSERTSQL(stringSQL){

banco.transaction(function(tx){
tx.executeSql(
           stringSQL,
            [],
            function(tx, results){
              $("#registrosEncontrados").html('ID inserido: '+results.insertId);

            },
             function(tx, erro){
              exibirErroSQL(erro.message);
                        }
        );
});
}
function executarUPDATESQL(stringSQL){banco.transaction(function(tx){
                                      tx.executeSql(
                                                 stringSQL,
                                                  [],
                                                  function(tx, results){
                                                       $("#registrosEncontrados").html(results.rowsAffected + ' registros atualizados.');
                                                  },
                                                   function(tx, erro){
                                                                  exibirErroSQL(erro.message);
                                                              }
                                              );
                                      });}
function executarDELETESQL(stringSQL){banco.transaction(function(tx){
                                      tx.executeSql(
                                                 stringSQL,
                                                  [],
                                                  function(tx, results){
                                               $("#registrosEncontrados").html(results.rowsAffected + ' registros deletados.');
                                                  },
                                                   function(tx, erro){
                                                                exibirErroSQL(erro.message);
                                                              }
                                              );
                                      });}

function executarSELECTSQL(stringSQL){
   banco.transaction(function(tx){

     tx.executeSql(stringSQL,
     [],
         function(tx,results){
            if(results.rows.length > 0){
                $("#registrosEncontrados").html(results.rows.length + ' registros encontrados.');


//                            var linhaString = convertLinhaEmArray(JSON.stringify(results.rows[0]));
//                            var arrayNomesColunas = linhaString.split(',')
//                           arrayNomesColunas = criaColunasTabela(arrayNomesColunas);
                            var arrayNomesColunas = convertLinhaEmArray(JSON.stringify(results.rows[0]));

                         for(var i=0;  i<results.rows.length; i++){
                            var item = results.rows[i];
                          //  var linhaString = convertLinhaEmArray(JSON.stringify(item));
                           // var arr = linhaString.split(',')
                            criaLinhasTabela(item,arrayNomesColunas);
                         }
            }else
            {
            $("#registrosEncontrados").html('Sem resultado.')
            }
         }
     );
},function(tx, error) {
  exibirErroSQL(tx.message);             //se der erro alerta popup com msg de erro
                                    },function (){


                                //   $("#myTable > tbody").append("<tr><td>row content</td></tr>");
                                                          }
            );//fim transaction
}

   $( document ).ready(

   function() {
        //criando a database

        //iniciando uma transaction
        banco.transaction(function(tx){

        //drop nas tabelas para recriar os ids
        tx.executeSql('DROP TABLE IF EXISTS clientes');
        tx.executeSql('DROP TABLE IF EXISTS produtos');
        tx.executeSql('DROP TABLE IF EXISTS pedidos');
        //criando as tabelas
        tx.executeSql("create table if not exists clientes(idCliente INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nomeCliente VARCHAR(255), cidadeCliente VARCHAR(255), UFCliente VARCHAR(2))");
        tx.executeSql("create table if not exists produtos(idProduto INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nomeProduto VARCHAR(255), valorProduto decimal, tipoProduto VARCHAR(255))");
        tx.executeSql("create table if not exists pedidos(idPedido INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,idCliPedido INTEGER NOT NULL, dataPedido VARCHAR(255))");
        tx.executeSql("create table if not exists detalhesPedidos(idDetalhesPedido INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, idPed INTEGER NOT NULL,idProd INTEGER NOT NULL, qtdProd INTEGER NOT NULL)");

        //inserindo dados para treinamento
        tx.executeSql("insert into clientes(nomeCliente, cidadeCliente, UFCliente) values ('Bruno Ferreira', 'Lagoa Santa', 'MG')");
        tx.executeSql("insert into clientes(nomeCliente, cidadeCliente, UFCliente) values ('Chiester Silva', 'Santa Luzia', 'MG')");
        tx.executeSql("insert into clientes(nomeCliente, cidadeCliente, UFCliente) values ('Gleisson Rodrigo', 'Ribeirão das Neves', 'MG')");
        tx.executeSql("insert into clientes(nomeCliente  ) values ('Luci Aparecida')");
        tx.executeSql("insert into clientes(nomeCliente, cidadeCliente, UFCliente) values ('Bruna Letícia', 'Lagoa Santa', 'MG')");
         tx.executeSql("insert into clientes(nomeCliente, cidadeCliente, UFCliente) values ('Celso Junior', 'Salvador', 'BA')");
           tx.executeSql("insert into clientes(nomeCliente, cidadeCliente, UFCliente) values ('Thaise Coutinho', 'Salvador', 'BA')");


        tx.executeSql("insert into produtos(nomeProduto, valorProduto, tipoProduto) values ('Pendrive 256GB', 49.99, 'Armazenamento')");
        tx.executeSql("insert into produtos(nomeProduto, valorProduto, tipoProduto) values ('Fire Tv Stick', 249.99, 'Smart Sticks')");
        tx.executeSql("insert into produtos(nomeProduto, valorProduto, tipoProduto) values ('DJI Tello', 649.99, 'Drones')");
         tx.executeSql("insert into produtos(nomeProduto, valorProduto, tipoProduto) values ('TV Sam 50 Pol', 5999.99, 'TVs')");

        tx.executeSql("insert into pedidos(idCliPedido,  dataPedido) values (1,  '01/08/2014')");
        tx.executeSql("insert into pedidos(idCliPedido,  dataPedido) values (2,  '22/06/2014')");
        tx.executeSql("insert into pedidos(idCliPedido,  dataPedido) values (3,  '25/01/2014')");

          tx.executeSql("insert into detalhesPedidos(idPed,  idProd,qtdProd) values (1,  4,1)");
                    tx.executeSql("insert into detalhesPedidos(idPed,  idProd,qtdProd) values (1,  1, 3)");
                              tx.executeSql("insert into detalhesPedidos(idPed,  idProd,qtdProd) values (1,  3, 2)");
                                 tx.executeSql("insert into detalhesPedidos(idPed,  idProd,qtdProd) values (2,  2, 2)");
                                    tx.executeSql("insert into detalhesPedidos(idPed,  idProd,qtdProd) values (2,  1, 5)");
                                       tx.executeSql("insert into detalhesPedidos(idPed,  idProd,qtdProd) values (3,  2, 4)");





        },function errorCB(tx, erro) {
                 exibirErroSQL(erro.message);   //se der erro alerta popup com msg de erro
                                    },function successCB(){
                                    //se der sucesso - não faz nada por enquanto
                                    // alert("success!");
                                                          }
            );//fim transaction
        }//fim function
    ); //fim document.ready
   $( document ).ready(
     function() {

     let myArray = [];

       $('#listaMenuOculta > li').each(function(){
         myArray.push($(this).text());
       });



             var paginaAtual = window.location.pathname;
                  //  var indexClicado = $(this).index();
               //   var listamenu = $('#listaMenu li').map(function(){return $.text([this])});
                 //var listamenu = $('#listaMenu')[0];
    var pegaIndex = myArray.findIndex(x => x.toUpperCase().trim() === paginaAtual.toUpperCase().replace('/',''));
       $('#btnAnterior').hide();
         $('#btnProximo').hide();
if(pegaIndex!=-1){
$('#btnProximo').show();
  $('#btnAnterior').show();

if(pegaIndex==0)
                $('#btnAnterior').hide();
                 else
                 $('#btnAnterior').attr("href", '/'+myArray[pegaIndex-1].toLowerCase().trim());

                 if(pegaIndex==myArray.length)
     $('#btnProximo').hide();
   else
                 $('#btnProximo').attr("href", '/'+myArray[pegaIndex+1].toLowerCase().trim());
                }
                });

                window.onload = function() {
                  var mime = 'text/x-mysql';
                  // get mime type
                  if (window.location.href.indexOf('mime=') > -1) {
                    mime = window.location.href.substr(window.location.href.indexOf('mime=') + 5);
                  }
                  window.editor = CodeMirror.fromTextArea(document.getElementById('txtStringSQL'), {
                    mode: mime,
                    indentWithTabs: true,
                    smartIndent: true,
                    lineNumbers: true,
                    matchBrackets : true,
                    autofocus: true


                  });
                };

                function abrirEditor(stringSQL){
                window.editor.setValue(stringSQL);
                }


