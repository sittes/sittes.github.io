<?php
   
    
   // Esse Código foi desenvolvido por Paulo Fagner de Oliveira
   // Quando der BUG saiba quem xingar!


	include_once("conexao.php");
	
	$dados = $_FILES['arquivo'];
	//var_dump($dados);
	
	if(!empty($_FILES['arquivo']['tmp_name'])){
		$arquivo = new DomDocument();
		$arquivo->load($_FILES['arquivo']['tmp_name']);
		//var_dump($arquivo);
		
		$linhas = $arquivo->getElementsByTagName("Row");
		//var_dump($linhas);
		
		$primeira_linha = true;
		
		foreach($linhas as $linha){
			
			if($primeira_linha == false){


				$nome = $linha->getElementsByTagName("Data")->item(0)->nodeValue;
			
				echo "Nome do Cliente: $nome <br>";
				
				$email = $linha->getElementsByTagName("Data")->item(1)->nodeValue;
				echo "Serviço: $email <br>";
				
				$niveis_acesso_id = $linha->getElementsByTagName("Data")->item(2)->nodeValue;
				echo "Nome da Marca: $niveis_acesso_id <br>";

				$niveis_acesso_id = $linha->getElementsByTagName("Data")->item(3)->nodeValue;
				echo "Forma de Pagamento: $niveis_acesso_id <br>";
				
				$niveis_acesso_id = $linha->getElementsByTagName("Data")->item(4)->nodeValue;
				echo "Parcelas: $niveis_acesso_id <br>";

				$niveis_acesso_id = $linha->getElementsByTagName("Data")->item(5)->nodeValue;
				echo "Valor: $niveis_acesso_id <br>";

				$niveis_acesso_id = $linha->getElementsByTagName("Data")->item(6)->nodeValue;
				echo "Data de Pagamento: $niveis_acesso_id <br>";

				echo "<hr>";
				
				//Inserir o usuário no BD
				//$result_usuario = "INSERT INTO usuarios (nome, email, niveis_acesso_id) VALUES ('$nome', '$email', '$niveis_acesso_id')";
				//$resultado_usuario = mysqli_query($conn, $result_usuario);
			}
			$primeira_linha = false;
		}
	}
?>