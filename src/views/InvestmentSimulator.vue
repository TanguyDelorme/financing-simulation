<script lang="ts" setup>
import {ref} from 'vue'
import GraphComponent from "@/components/GraphComponent.vue";

const availableMoney = ref<number>(5000);
const amountEveryMonth = ref<number>(500);
const duration = ref<number>(30);
const profitability = ref<number>(8);

const traditionnalData = ref<number[]>([]);
const interestCompoundData = ref<number[]>([]);
const years = ref<number[]>([]);
const calculateTotalAmount = () => {
  interestCompoundData.value = [];
  traditionnalData.value = [];
  years.value = [];
  let currentAmount: number = availableMoney.value;

  for (let year = 1; year <= duration.value; year++) {
    traditionnalData.value.push(availableMoney.value + amountEveryMonth.value * 12 * year);
    for (let month = 1; month <= 12; month++) {
      const monthlyGain: number = currentAmount * (profitability.value / 100) / 12;
      currentAmount = currentAmount + amountEveryMonth.value + monthlyGain;
    }
    interestCompoundData.value.push(currentAmount);
    years.value.push(year);
  }

};
const simulate = () => {
  calculateTotalAmount();
};
</script>

<template>
  <h1>Investment Simulator</h1>
  <v-form>
    <v-container>
      <v-text-field v-model.number="availableMoney" label="Apport" required></v-text-field>
      <v-text-field v-model.number="amountEveryMonth" label="Epargne par mois" required></v-text-field>
      <v-text-field v-model.number="duration" label="Durée" required></v-text-field>
      <v-text-field v-model.number="profitability" label="Rentabilité" required></v-text-field>
      <v-btn block class="mt-2" type="button" @click="simulate">Simuler</v-btn>
    </v-container>
  </v-form>

  <GraphComponent v-if="interestCompoundData.length > 0" :interest-compound-data="interestCompoundData" :traditionnal-data="traditionnalData" :years="years"></GraphComponent>
</template>

<style>
</style>