<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import useComparator from '@/stores/comparator';
import GraphComparatorComponent from '@/components/GraphComparatorComponent.vue';

const comparator = useComparator();

const {cost, rate, notaryFees, nbYears, yearlyGain, charges, amountLoaned, taxes} = storeToRefs(comparator);

const requiredRule = [(v) => !!v || 'Champ obligatoire'];
const years = computed(() => {
  const array = [];
  for (let i = 0; i <= nbYears.value; i++) {
    array.push(i);
  }
  return array;
});
const isButtonDisabled = computed(() => {
  return cost.value === null || rate.value === null || notaryFees.value === null || nbYears.value === null;
});

const calculate = () => {
  comparator.calculateInterests();
  comparator.calculateImposition();
}

</script>

<template>
  <h1>Comparator</h1>
  <v-form>
    <v-container>
      <v-text-field v-model.number="cost" label="Cout" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="amountLoaned" label="Montant emprunté" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="rate" label="Taux" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="notaryFees" label="Frais de notaire" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="nbYears" label="Années" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="yearlyGain" label="Gain par an" :rules="requiredRule" required></v-text-field>
      <v-text-field v-model.number="charges" label="Charges" :rules="requiredRule" required></v-text-field>
      <v-btn block class="mt-2" type="button" @click="calculate()" :disabled="isButtonDisabled">Simuler</v-btn>
    </v-container>
  </v-form>

  <GraphComparatorComponent v-if="taxes.length > 0" :taxes="taxes"  :years="years"></GraphComparatorComponent>
</template>

<style>
</style>