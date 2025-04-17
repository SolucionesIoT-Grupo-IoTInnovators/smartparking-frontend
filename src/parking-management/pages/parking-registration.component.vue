<script>
import ParkingCreateAndEdit from "../components/parking-create-and-edit.component.vue";
import ParkingAddressPicker from "../components/parking-address-picker.component.vue";
import {Parking} from "../model/parking.entity.js";
import ParkingDesign from "../components/parking-design.component.vue";
import {ParkingService} from "../services/parking.service.js";

const defaultStyle = { width: '400px'};

export default {
  name: "parking-registration",
  components: {ParkingDesign, ParkingCreateAndEdit, ParkingAddressPicker},
  data() {
    return {
      currentStep: 1,
      parkingData: new Parking({}),
      totalSteps: 3,
      showDialog: false,
      confirmation: 'Are you sure you want to cancel the registration?',
      size: 'default',
      parkingService: null
    }
  },
  methods: {
    nextStep(data) {
      if (data) {
        this.parkingData = new Parking({...this.parkingData, ...data});
      }

      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    handleCancel() {
      this.currentStep = 1;
      this.parkingData = new Parking({});
    },
    handleLocationChanged(locationData) {
      this.parkingData = new Parking({...this.parkingData, ...locationData});
    },
    handleParkingDesign(data) {
      console.log('Diseño de estacionamiento actualizado:', data);
    },
    handleParkingValues(data) {
      this.parkingData = new Parking({...this.parkingData, ...data});
    },
    finish() {
      this.showDialog = true;
    },
    getDialogStyle() {
      let dialogStyle = defaultStyle;
      dialogStyle = this.size === 'standard' ? { width: '600px' } : defaultStyle;
      dialogStyle = this.size === 'large' ? { width: '900px' } : dialogStyle;
      return dialogStyle;
    },
    handleDialogCancel() {
      this.showDialog = false;
    },
    createParking() {
      this.parkingService = new ParkingService();
      this.parkingData.ownerId = 1;
      this.parkingService.create(this.parkingData).then(response => {
        let parking = new Parking(response.data);
        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Parking was created successfully!', life: 3000 });
      }).catch(error => {
        console.error(error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create parking!', life: 3000 });
      });
      this.showDialog = false;
    },
  }
}
</script>

<template>
  <div class="card-container">
    <div class="steps-indicator">
      <div class="flex align-items-center justify-content-center">
        <div v-for="step in totalSteps" :key="step"
             class="step-item flex flex-column align-items-center">
          <div :class="['step-number', {'active': step === currentStep,
                                           'completed': step < currentStep}]">
            {{ step }}
          </div>
          <div class="step-label mt-2">Step {{ step }}</div>
        </div>
      </div>
    </div>

    <ParkingCreateAndEdit
        v-if="currentStep === 1"
        :parking="parkingData"
        @save="nextStep"
        @cancel="handleCancel"
    />

    <div v-if="currentStep === 2" class="step-component">
      <ParkingAddressPicker
          :parking="parkingData"
          @location-changed="handleLocationChanged"
      />

      <div class="flex justify-content-between mt-4">
        <pv-button label="Back" icon="pi pi-arrow-left" @click="previousStep"/>
        <pv-button label="Continue" icon="pi pi-arrow-right" @click="nextStep"/>
      </div>
    </div>

    <div v-if="currentStep === 3" class="step-component">
      <ParkingDesign
          :parking="parkingData"
          @parking-design="handleParkingDesign"
          @parking-values="handleParkingValues"
      />

      <div class="flex justify-content-between mt-4">
        <pv-button label="Back" icon="pi pi-arrow-left" @click="previousStep"/>
        <pv-button label="Finish" icon="pi pi-check" @click="finish" />
      </div>
    </div>
  </div>

  <pv-dialog
      v-bind:visible="showDialog"
      :modal="true"
      :style="getDialogStyle()"
      class="p-fluid"
      header="Confirmation">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>Are you sure all the parking info is correct?</span>
    </div>
    <template #footer>
      <pv-button
          label="No, go back"
          icon="pi pi-times"
          class="p-button-outlined p-button-danger go-back-btn"
          @click="handleDialogCancel" />
      <pv-button
          label="Yes, save"
          icon="pi pi-check"
          class="p-button-success save-btn"
          @click="createParking" />
    </template>
  </pv-dialog>
  <pv-toast />
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.steps-indicator {
  width: 100%;
  padding: 1rem 0;
}

.step-item {
  width: 33.33%;
  position: relative;
}

.step-item:not(:last-child):after {
  content: '';
  position: absolute;
  height: 2px;
  background-color: #e0e0e0;
  width: 100%;
  top: 18px;
  left: 50%;
  z-index: 0;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  z-index: 1;
}

.step-number.active {
  background-color: #63b3ed;
  color: white;
}

.step-number.completed {
  background-color: #007bff;
  color: white;
}

.step-component {
  width: 100%;
  max-width: 800px;
}

.go-back-btn {
  margin-right: 1rem;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.go-back-btn:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

.save-btn {
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Estilo para el contenido del diálogo */
.confirmation-content {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

.confirmation-content i {
  color: #FFA500;
  margin-right: 1rem;
}

.confirmation-content span {
  font-size: 1.1rem;
  line-height: 1.5;
}
</style>