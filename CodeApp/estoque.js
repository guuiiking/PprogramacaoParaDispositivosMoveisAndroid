import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native';

const Estoque = () => {
  const [produtos, setProdutos] = useState([
    { nome: 'Carne', quantidade: 100 },
    { nome: 'Frango', quantidade: 50 },
    { nome: 'Peixe', quantidade: 20 },
  ]);

  const [vendas, setVendas] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');

  const handleVenda = (produto, quantidade) => {
    const novoEstoque = produtos.map((p) => {
      if (p.nome === produto.nome) {
        return { ...p, quantidade: p.quantidade - quantidade };
      }
      return p;
    });
    setProdutos(novoEstoque);
    setVendas((prevVendas) => [...prevVendas, {
      produto,
      quantidade,
      data: new Date().toLocaleString()
    }]);
  };

  const handleCadastro = () => {
    if (nomeProduto && quantidadeProduto) {
      setProdutos((prevProdutos) => [...prevProdutos, {
        nome: nomeProduto,
        quantidade: parseInt(quantidadeProduto)
      }]);
      setNomeProduto('');
      setQuantidadeProduto('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estoque</Text>
      <View style={styles.produtos}>
        {produtos.map((produto) => (
          <View key={produto.nome} style={styles.produto}>
            <Text>{produto.nome}: {produto.quantidade}</Text>
            <TouchableOpacity
              style={styles.botaoVender}
              onPress={() => handleVenda(produto, 1)}
            >
              <Text style={styles.textoBotaoVender}>Vender</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.cadastro}>
        <Text style={styles.tituloCadastro}>Cadastrar Novo Produto</Text>
        <TextInput
          style={styles.input}
          value={nomeProduto}
          onChangeText={setNomeProduto}
          placeholder="Nome do Produto"
        />
        <TextInput
          style={styles.input}
          value={quantidadeProduto}
          onChangeText={setQuantidadeProduto}
          placeholder="Quantidade"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={handleCadastro}
        >
          <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historico}>
        <Text style={styles.tituloHistorico}>Histórico de Vendas</Text>
        <ScrollView>
          {vendas.map((venda, index) => (
            <View key={index} style={styles.venda}>
              <Text>Produto: {venda.produto.nome}</Text>
              <Text>Quantidade: {venda.quantidade}</Text>
              <Text>Data: {venda.data}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  produtos: {
    marginTop: 20,
  },
  produto: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoVender: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  textoBotaoVender: {
    color: 'white',
    fontSize: 18,
  },
  cadastro: {
    marginTop: 20,
  },
  tituloCadastro: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  botaoCadastrar: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  textoBotaoCadastrar: {
    color: 'white',
    fontSize: 18,
  },
  historico: {
    marginTop: 20,
  },
  tituloHistorico: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  venda: {
    marginBottom: 10,
  },
});

export default Estoque;