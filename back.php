
<?php
// on se connecte à example.com et au port 3307
$link = mysql_connect('localhost:3306', 'root', 'root');
if (!$link) {
    die('Connexion impossible : ' . mysql_error());
}
echo 'Connecté correctement';
mysql_close($link);





?>
$statement = $pdo->prepare("SELECT * FROM actor");
$statement->execute();
$actors = $statement->fetchAll(PDO::FETCH_ASSOC);
$query = $pdo ->prepare("SELECT * FROM CITY");
$query->execute();
$city = $query ->fetchAll(PDO::FETCH_ASSOC);
$querya = $pdo ->prepare("SELECT * FROM COUNTRY");
$querya->execute();
$country = $querya ->fetchall(PDO::FETCH_ASSOC);