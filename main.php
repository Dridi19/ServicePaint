<?php
$engine = "mysql";
$host = "localhost";
$port = 3306;
$dbName = "paint";
$username = "root";
$password = "root";

try{
  $pdo = new PDO("$engine:host=$host:$port;dbname=$dbName", $username, $password);
  $sql = "SELECT * FROM image";
  $stmt = $pdo->query($sql);
  
  if($stmt === false){
   die("Erreur");
  }
  
 }catch (PDOException $e){
   echo $e->getMessage();
 }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paint</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.esm.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.js"></script>
    <link rel="stylesheet" href="style2.css">
</head>
<body>
    <div class="buttons">
        <button   class="button button4" onClick="exportAndSaveCanvas()" >Sauvegarder</button>
        <form methode="POST"> <input type="submit" class="button button2" name="button4" value="charger"> </form>
        <button id="download" class="button button3">Exporter Img</button>
        <button  onclick="getPDF()" class="button button4" > Exporter Pdf</button> 
    </div>
        
    
    <div class="drawing">

        <header class="barre">
            <div class="rectangle"></div>
            <div class="cercle"></div>
            <div class="triangle"></div>
            <input type="text" id="texthere">
            <div class="Text"> ADD Text</div>
            <div class="color1">Primaire <input type="color" id="colorp" ></div>
            <div class="color2">Secondaire <input type="color" id="colors"></div>
            <div class="mukta"> <select id="font" name="cal">
                <option value="Mukta">Mukta</option>
                <option value="Hubballi">Hubballi</option>
                <option value="Pacifico">Pacifico</option>
                <option value="Source Code pro">Source Code pro</option>
                <option value="Ramaraja">Ramaraja</option>

                </select>
            </div>
    
        </header>
        <div class="draw"  id="canvas_div_pdf" >
          <?php if(isset($_REQUEST["button4"])){?>
        <table>
            <tbody>
              <?php while($row = $stmt->fetch(PDO::FETCH_ASSOC)) : ?>
              <tr>
                <td><img src="image/<?php  echo htmlspecialchars($row['image_name']); ?>" style="width:30%" > </td>
              </tr>
              <?php endwhile; ?>
            </tbody>
        </table>
        <?php } ?>
        </div>
        <div id="img" style="display:none;">
          <img src="" id="newimg" class="top" />
      </div>
      <script>
       function exportAndSaveCanvas()  {

          html2canvas(document.getElementById("canvas_div_pdf"), { 
          background:'#fff',
          onrendered: function(canvas) {         
            var imgData = canvas.toDataURL('image/jpeg');   


          var url = 'export.php';
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
    </script>
    <script type="module">
        import interact from 
        'https://cdn.interactjs.io/v1.10.11/interactjs/index.js'
        interact('.draw > div')
        .resizable({
          // resize from all edges and corners
          edges: { left: true, right: true, bottom: true, top: true },

          listeners: {
            move (event) {
              var target = event.target
              var x = (parseFloat(target.getAttribute('data-x')) || 0)
              var y = (parseFloat(target.getAttribute('data-y')) || 0)

              // update the element's style
              if (target.id =="Text"){}else{
              target.style.width = event.rect.width + 'px'
              target.style.height = event.rect.height + 'px'}
            }
          },
          modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
              outer: 'parent'
            }),

            // minimum size
            interact.modifiers.restrictSize({
              min: { width: 50, height: 50 }
            })
          ],

          inertia: true
        })
       
        </script> 
   <script src="canvaslib/jquery-1.12.4.js"></script>
    <script src="canvaslib/jspdf.min.js"></script>
    <script src="canvaslib/html2canvas.js"></script>
    <script src="script.js"></script>
</body>
</html>
