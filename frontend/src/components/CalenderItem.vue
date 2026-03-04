<script setup lang="ts"></script>

<template>
  <v-container class="d-flex align-start ga-12 justify-center flex-wrap">
    <v-date-picker
      :max="new Date()"
      class="weekdays-primary"
      elevation="24"
      weekday-format="short"
      hide-header
    >
      <template v-slot:controls="{ disabled, nextMonth, prevMonth, monthYearText }">
        <v-btn
          :disabled="disabled.includes('prev-month')"
          color="primary"
          icon="$prev"
          @click="prevMonth"
        ></v-btn>
        <v-spacer></v-spacer>
        <div class="text-center">
          <div class="text-caption my-n1 text-primary">{{ monthYearText.split(' ')[1] }}</div>
          <div class="text-body-1">{{ monthYearText.split(' ')[0] }}</div>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="disabled.includes('next-month')"
          color="primary"
          icon="$next"
          @click="nextMonth"
        ></v-btn>
      </template>
    </v-date-picker>
  </v-container>
</template>

<style></style>
