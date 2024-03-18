<script lang="ts" setup>
import { computed, ref } from 'vue'
import GraphComponent from "@/components/GraphComponent.vue";

const availableMoney = ref<number>(5000);
const amountEveryMonth = ref<number>(500);
const duration = ref<number>(30);
const profitability = ref<number>(8);

const traditionnalData = ref<number[]>([]);
const compoundInterestData = ref<number[]>([]);
const years = ref<number[]>([]);

const requiredRule = [(v) => !!v || 'Champ obligatoire'];

const difference = computed(() => compoundInterestData.value[compoundInterestData.value.length - 1] - traditionnalData.value[traditionnalData.value.length - 1]);
const isButtonDisabled = computed(() => {
  return !availableMoney.value || !amountEveryMonth.value || !duration.value || !profitability.value;
});
const calculateTotalAmount = () => {
  compoundInterestData.value = [];
  traditionnalData.value = [];
  years.value = [];
  let currentAmount: number = availableMoney.value;

  for (let year = 1; year <= duration.value; year++) {
    traditionnalData.value.push(Math.round(availableMoney.value + amountEveryMonth.value * 12 * year));
    for (let month = 1; month <= 12; month++) {
      const monthlyGain: number = Math.round(currentAmount * (profitability.value / 100) / 12);
      currentAmount = Math.round(currentAmount + amountEveryMonth.value + monthlyGain);
    }
    compoundInterestData.value.push(currentAmount);
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
      <v-text-field v-model.number="availableMoney" label="Apport" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="amountEveryMonth" label="Epargne par mois" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="duration" label="Durée" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="profitability" label="Rentabilité" :rules="requiredRule" required></v-text-field>
      <v-btn block class="mt-2" type="button" @click="simulate" :disabled="isButtonDisabled">Simuler</v-btn>
    </v-container>
  </v-form>

  <p v-if="difference > 0">Money won : {{ difference }}</p>
  <GraphComponent v-if="compoundInterestData.length > 0" :compound-interest-data="compoundInterestData" :traditionnal-data="traditionnalData" :years="years"></GraphComponent>
</template>

<style>
template {
  padding: 30px;
}
</style>