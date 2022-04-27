var draws = document.querySelectorAll(".draw > div");
let isResizing = false;

/// add elements
 var trianglecl = document.querySelector(".drawing >.barre >.triangle");
 var rectanglecl = document.querySelector(".drawing >.barre >.rectangle");
 var Cerclecl = document.querySelector(".drawing >.barre >.cercle");
 var selectdraw = document.querySelector(".draw")

 trianglecl.addEventListener("click",addTriangle);
 rectanglecl.addEventListener("click",addRectangle);
 Cerclecl.addEventListener("click",addCercle);

 function addTriangle(){
     console.log("click on triangle")
    var element = document.createElement("div");
    element.setAttribute("id", "triangle");
    selectdraw.appendChild(element);
    draws = document.querySelectorAll(".draw > div");
    draws.forEach(draw => draw.addEventListener("click",mousedown));
    
 }

 function addRectangle(){
    var element = document.createElement("div");
    element.setAttribute("id", "rectangle");
    selectdraw.appendChild(element);
    draws = document.querySelectorAll(".draw > div");
    draws.forEach(draw => draw.addEventListener("click",mousedown));
}

 

 
 function addCercle(){
    var element = document.createElement("div");
    element.setAttribute("id", "cercle");
    selectdraw.appendChild(element);
    draws = document.querySelectorAll(".draw > div");
    draws.forEach(draw => draw.addEventListener("click",mousedown));
}


 /// move Element



function mousedown(e){
    const itemToMove = this;
    if(itemToMove.id=="Text"){
      itemToMove.classList.add("selectedtext")}else{
    itemToMove.classList.add("selected");}
    var el = this;
    //add resizers
    if(itemToMove.id=="Text"){}else{
    var resnw = document.createElement("div");
    resnw.setAttribute("class", "resizer nw");
    itemToMove.appendChild(resnw);


    var resne = document.createElement("div");
    resne.setAttribute("class", "resizer ne");
    itemToMove.appendChild(resne);


    var ressw = document.createElement("div");
    ressw.setAttribute("class", "resizer sw");
    itemToMove.appendChild(ressw);


    var resse = document.createElement("div");
    resse.setAttribute("class", "resizer se");
    itemToMove.appendChild(resse);}




    //
    const itemPosition = this.getBoundingClientRect();
    let firstX =e.clientX;
    let firstY = e.clientY;
    itemToMove.addEventListener("mousedown",down)
    function down(){
            window.addEventListener("mousemove",mousemove);
            window.addEventListener("mouseup",mouseup);}

    window.addEventListener("dblclick",dbl)
    
    function mousemove(e){
        
        let newX= firstX- e.clientX;
        let newY = firstY - e.clientY;
        
        itemToMove.style.left = itemPosition.left - newX + "px";
        itemToMove.style.top = itemPosition.top - newY +"px";

    }
    function mouseup(e){
        window.removeEventListener("mousemove",mousemove);
        
        
    }
    ///double click
    function dbl(){
        itemToMove.classList.remove("selected");
        itemToMove.classList.remove("selectedtext");
        resnw.remove();
        resne.remove();
        ressw.remove();
        resse.remove();

    }


    //ress
    const resizers = document.querySelectorAll(".resizer");
    let currentResizer;

    for (let resizer of resizers) {
      resizer.addEventListener("mousedown", mousedown);

      function mousedown(e) {
        }


        function mouseup() {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          isResizing = false;
        }
      }
    }

///text

const text = document.querySelector(".Text");
text.addEventListener("click",addText)
function addText(){
    var element = document.createElement("div");
    var texthere = document.getElementById("texthere").value;
    console.log(texthere);
    var texta =document.createTextNode(texthere);
    element.appendChild(texta);
    element.setAttribute("id", "Text");
    selectdraw.appendChild(element);
    draws = document.querySelectorAll(".draw > div");
    draws.forEach(draw => draw.addEventListener("click",mousedown));
}

//color changer

//primaire
var colorp = document.getElementById("colorp")
colorp.addEventListener('input',function(){
  var thecolor = colorp.value;
  console.log(thecolor);
  draws = document.querySelectorAll(".draw > div");
for (let draw of draws) {
  if (draw.classList.contains("selected")){
    if(draw.id == "Text"){
      draw.style.color= thecolor
    }else{
    draw.style.borderColor= thecolor;}
  }
  }});

// secondaire
  var colors = document.getElementById("colors")
  colors.addEventListener('input',function(){
    var thecolor = colors.value;
    console.log(thecolor);
    draws = document.querySelectorAll(".draw > div");
  for (let draw of draws) {
    if (draw.classList.contains("selected")){
      if(draw.id == "Text"){
        draw.style.textDecoration= "underline" + thecolor
      }else{
      draw.style.background=thecolor;}
    }
        
    }});




//
//change text
var font = document.getElementById("font")
  font.addEventListener('input',function(){
    var newfont = font.value;
    console.log(newfont);
    draws = document.querySelectorAll(".draw > div");
  for (let draw of draws) {
    if (draw.classList.contains("selected")){
      if(draw.id == "Text"){
        draw.style.fontFamily= newfont
      }}}});


//

//jQuery


jQuery(document).ready(function(){
  jQuery("#download").click(function(){
  screenshot();
});
});

function screenshot(){
html2canvas(document.getElementById("canvas_div_pdf")).then(function(canvas){
     downloadImage(canvas.toDataURL(),"image.png");
});
}

function downloadImage(uri, filename){
var link = document.createElement('a');
if(typeof link.download !== 'string'){
   window.open(uri);
}
else{
link.href = uri;
link.download = filename;
accountForFirefox(clickLink, link);
}
}

function clickLink(link){
link.click();
}

function accountForFirefox(click){
var link = arguments[1];
document.body.appendChild(link);
click(link);
document.body.removeChild(link);
}

function getPDF(){

var HTML_Width = $("#canvas_div_pdf").width();
var HTML_Height = $("#canvas_div_pdf").height();
var top_left_margin = 15;
var PDF_Width = HTML_Width+(top_left_margin*2);
var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
var canvas_image_width = HTML_Width;
var canvas_image_height = HTML_Height;

var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


html2canvas($("#canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {
 canvas.getContext('2d');
 
 console.log(canvas.height+"  "+canvas.width);
 
 
 var imgData = canvas.toDataURL("image/jpeg", 1.0);
 var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
   pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
 
 
 for (var i = 1; i <= totalPDFPages; i++) { 
   pdf.addPage(PDF_Width, PDF_Height);
   pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
 }
 
   pdf.save("fichier.pdf");
   });
};
/////


function exportAndSaveCanvas()  {

  html2canvas($("#containingDiv"), { 
  background:'#fff',
  onrendered: function(canvas) {         
     var imgData = canvas.toDataURL('image/jpeg');   


var url = 'upload/export.php';
  $.ajax({ 
      type: "POST", 
      url: url,
      dataType: 'text',
      data: {
          base64data : imgData
      }
  });     
  }

}); //End html2canvas
} // End exportAndSaveCanvas()
