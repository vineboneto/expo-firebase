import React, { useState } from "react";

import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";

export function FormBox() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  async function handleAddProduct() {
    try {
      const data = await firestore()
        .collection("products")
        .add({
          description,
          quantity: Number(quantity),
          done: false,
          createAt: firestore.FieldValue.serverTimestamp(),
        });
      Alert.alert("Produto cadastrado com sucesso");
      console.log(data);
    } catch (err: any) {
      console.log("Error");
      console.log(err.message);
    }
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={setQuantity}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleAddProduct}
      />
    </Container>
  );
}
