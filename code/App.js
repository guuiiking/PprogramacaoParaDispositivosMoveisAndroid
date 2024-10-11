import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stock, setStock] = useState([]);
    const [sales, setSales] = useState([]);

    // Carregar dados do AsyncStorage
    useEffect(() => {
        const loadData = async () => {
        const storedStock = await AsyncStorage.getItem('stock');
        const storedSales = await AsyncStorage.getItem('sales');
        if (storedStock) setStock(JSON.parse(storedStock));
        if (storedSales) setSales(JSON.parse(storedSales));
        };
        loadData();
    }, []);

    // Salvar dados no AsyncStorage
    const saveData = async () => {
        await AsyncStorage.setItem('stock', JSON.stringify(stock));
        await AsyncStorage.setItem('sales', JSON.stringify(sales));
    };

    const addToStock = () => {
        const newStock = [...stock, { item, quantity: parseInt(quantity) }];
        setStock(newStock);
        saveData();
        setItem('');
        setQuantity('');
    };

    const addSale = () => {
        const newSale = { item, quantity: parseInt(quantity) };
        const itemIndex = stock.findIndex(stockItem => stockItem.item === item);

        if (itemIndex > -1 && stock[itemIndex].quantity >= newSale.quantity) {
        const updatedStock = [...stock];
        updatedStock[itemIndex].quantity -= newSale.quantity;
        setSales([...sales, newSale]);
        setStock(updatedStock);
        saveData();
        } else {
        alert('Quantidade insuficiente em estoque');
        }
        
        setItem('');
        setQuantity('');
    };

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Controle de Vendas e Estoque</Text>
        
        <TextInput
            style={styles.input}
            placeholder="Item"
            value={item}
            onChangeText={setItem}
        />
        <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantity}
            keyboardType="numeric"
            onChangeText={setQuantity}
        />

        <Button title="Adicionar ao Estoque" onPress={addToStock} />
        <Button title="Registrar Venda" onPress={addSale} />

        <Text style={styles.subheader}>Estoque Atual:</Text>
        <FlatList
            data={stock}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <Text>{item.item}: {item.quantity}</Text>
            )}
        />

        <Text style={styles.subheader}>Histórico de Vendas:</Text>
        <FlatList
            data={sales}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <Text>{item.item} - Quantidade: {item.quantity}</Text>
            )}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subheader: {
        fontSize: 20,
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
