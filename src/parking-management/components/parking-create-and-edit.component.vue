<script>
import {Parking} from "../model/parking.entity";
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "parking-create-and-edit",
  props: {
    parking: {
      type: Parking,
      default: () => new Parking({})
    }
  },
  data() {
    return {
      submitted: false,
      localParking: new Parking({}),
      imageFile: null,
      useStore: null,
    }
  },
  watch: {
    parking: {
      immediate: true,
      handler(newValue) {
        this.localParking = new Parking(newValue);
      }
    }
  },
  methods: {
    resetForm() {
      this.submitted = false;
      this.imageFile = null;
      if (this.$refs.fileUploader) {
        this.$refs.fileUploader.clear();
      }
      this.localParking = new Parking({});
    },
    handleCancel() {
      this.useStore = useAuthenticationStore();
      this.resetForm();
      // this.$emit('cancel');
      this.$router.push({ name: "parking-directory", params: { ownerId: this.useStore.currentUserId } });
    },
    handleSave() {
      this.submitted = true;

      if (this.isFormValid()) {
        const parkingInstance = new Parking(this.localParking);
        this.$emit('save', parkingInstance);
      }
    },
    isFormValid() {
      return !!this.localParking.name &&
          this.localParking.ratePerHour > 0 &&
          !!this.localParking.address &&
          !!this.localParking.imageUrl;
    },
    onFileSelect(event) {
      this.imageFile = event.files[0];
    },
    clearFile() {
      this.imageFile = null;
      this.$refs.fileUploader.clear();
    }
  }
}
</script>

<template>
  <div class="flex justify-content-center align-items-center w-full">
    <div class="card p-5 shadow-none w-full lg:w-8">
      <h3 class="text-4xl font-bold mb-5 text-primary text-center m-4">{{ localParking.id ? 'Parking Profile' : 'Create Parking' }}</h3>

      <div class="formgrid grid">
        <!-- Name -->
        <div class="field col-12 mb-5">
          <pv-float-label>
            <pv-input-text id="name" v-model="localParking.name" class="w-full"
                           :class="{'p-invalid': submitted && !localParking.name}"/>
            <label for="name" class="text-primary">{{ $t('name') }}</label>
          </pv-float-label>
          <small v-if="submitted && !localParking.name" class="p-error">Name is required</small>
        </div>

        <!-- Description -->
        <div class="field col-12 mb-5">
          <pv-float-label>
            <pv-textarea id="description" v-model="localParking.description" rows="3" autoResize class="w-full"/>
            <label for="description" class="text-primary">{{ $t('description') }}</label>
          </pv-float-label>
        </div>

        <!-- Rate -->
        <div class="field col-12 mb-5">
          <pv-float-label>
            <pv-input-number id="ratePerHour" v-model="localParking.ratePerHour" mode="currency" currency="USD"
                             :minFractionDigits="2" class="w-full"
                             :class="{'p-invalid': submitted && !localParking.ratePerHour}"/>
            <label for="ratePerHour" class="text-primary">{{ $t('ratePerHour') }}</label>
          </pv-float-label>
          <small v-if="submitted && !localParking.ratePerHour" class="p-error">Rate per hour is required</small>
        </div>

        <!-- Address -->
        <div class="field col-12 mb-5">
          <pv-float-label>
            <pv-input-text id="address" v-model="localParking.address" class="w-full"
                           :class="{'p-invalid': submitted && !localParking.address}"/>
            <label for="address" class="text-primary">{{ $t('address') }}</label>
          </pv-float-label>
          <small v-if="submitted && !localParking.address" class="p-error">Address is required</small>
        </div>

        <!-- Image URL -->
        <div class="field col-12 mb-5">
          <pv-float-label>
            <pv-input-text id="imageUrl" v-model="localParking.imageUrl" class="w-full"
                           :class="{'p-invalid': submitted && !localParking.imageUrl}"/>
            <label for="imageUrl" class="text-primary">{{ $t('imageUrl') }}</label>
          </pv-float-label>
          <small v-if="submitted && !localParking.imageUrl" class="p-error">Image URL is required</small>
        </div>

        <!-- Image Upload
        <div class="field col-12 mb-3">
          <label for="image" class="font-bold block mb-2">Parking Image</label>
          <pv-file-upload ref="fileUploader" name="image" @select="onFileSelect" :auto="true"
                          chooseLabel="Select Image" :showCancelButton="false" :showUploadButton="false"
                          accept="image/*" :maxFileSize="1000000">
            <template #empty>
              <p class="m-0">Drag and drop an image here or click to browse</p>
            </template>
          </pv-file-upload>


          <div v-if="imageFile" class="mt-3 flex align-items-center gap-2">
            <img :src="URL.createObjectURL(imageFile)" alt="Preview" width="100"/>
            <pv-button icon="pi pi-times" @click="clearFile" severity="danger" text/>
          </div>
          <div v-else-if="localParking.imageUrl" class="mt-3 flex align-items-center gap-2">
            <img :src="localParking.imageUrl" alt="Current Image" width="100"/>
          </div>
        </div> -->
      </div>

      <!-- Actions -->
      <div v-if="localParking.id" class="flex justify-content-end align-items-center">
        <pv-button label="Edit" icon="pi pi-pencil" raised class="mt-4" @click="handleSave"/>
      </div>
      <div v-else class="flex justify-content-end gap-2 mt-4">
        <pv-button label="Cancel" icon="pi pi-times" severity="secondary" @click="handleCancel"/>
        <pv-button label="Continue" icon="pi pi-arrow-right" @click="handleSave"/>

      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border: 1px solid #2196F3;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
