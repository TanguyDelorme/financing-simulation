<script lang="ts" setup>
import { computed, ref } from 'vue';

const availableMoney = ref<number>(0);
const revenu = ref<number>(3700);
const charges = ref<number>(0);
const duration = ref<number>(25);
const rate = ref<number>(1.34);
const rateNotaryFees = 0.07;

const capacity = computed(() => (revenu.value - charges.value) * 0.33);
const ratePercentage = computed(() => rate.value / 100);
const numberOfMonths = computed(() => duration.value * 12);
const notaryFees = computed(() => Math.round(totalCapacity.value * rateNotaryFees));
const totalCapacity = computed(() => {
  const monthlyInterestRate = ratePercentage.value / 12;
  const denominator = 1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths.value);
  return Math.round((capacity.value / monthlyInterestRate) * denominator);
});

const totalLoanable  = computed(() => totalCapacity.value + availableMoney.value - notaryFees.value);

const isButtonDisabled = computed(() => {
  return ( availableMoney.value === null || revenu.value === null || charges.value === null || duration.value === null || rate.value === null);
});

const simulate = () => {
  console.log(totalLoanable.value);
}
</script>

<template>
  <h1>Purchasing capacity</h1>
  <v-form>
    <v-container>
      <v-text-field v-model.number="availableMoney" label="Apport" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="revenu" label="Revenu" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="charges" label="Charges" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="duration" label="Durée" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="rate" label="Taux" :rules="requiredRule" required></v-text-field>
      <v-btn block class="mt-2" type="button" @click="simulate" :disabled="isButtonDisabled">Simuler</v-btn>
    </v-container>
  </v-form>
  <p>Amount loanable : {{ totalCapacity }}</p>
  <p>Contribution : {{ availableMoney }}</p>
  <p>Notary fees : {{ notaryFees }}</p>
  <p>Youc can buy for around : {{ totalLoanable }}</p>
</template>

<style>
</style>