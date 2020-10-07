<template>
  <div class="setting-main kyc">
    <div class="setting-head">{{$t('usercenter.KYC_account_verification.title')}}</div>
    <div class="setting-body">
      <div v-if="kyc_status === ''">
      </div>
      <div v-else-if="kyc_status === 'uploaded'">
        <p class="status">{{$t('usercenter.KYC_account_verification.status_uploaded')}}</p>
      </div>
      <div v-else-if="kyc_status === 'verified'">
        <p class="status">{{$t('usercenter.KYC_account_verification.status_verified')}}</p>
      </div>
      <div v-else>
        <div v-if="kyc_status === 'failed'">
          <p class="status">{{$t('usercenter.KYC_account_verification.status_failed')}}</p>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="form-row">
            <label class="form-label">{{$t('usercenter.KYC_account_verification.country_region')}}：</label>
            <div class="form-control">
              <auto-complete :rows="getAllRegion" :default_value="country" event="region" type="big"/>
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">{{$t('usercenter.KYC_account_verification.first_name')}}：</label>
            <div class="form-control">
              <input type="text" :placeholder="$t('usercenter.KYC_account_verification.please_enter_your_first_name')" v-model="first_name">
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">{{$t('usercenter.KYC_account_verification.last_name')}}：</label>
            <div class="form-control">
              <input type="text" :placeholder="$t('usercenter.KYC_account_verification.please_enter_your_last_name')" v-model="last_name">
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">{{$t('usercenter.KYC_account_verification.type_of_certificate')}}：</label>
            <div class="form-control">
              <auto-complete
              :rows="[{
                  code: 'Passport',
                  type: 'certificate',
                  name: $t('usercenter.KYC_account_verification.passport')
                }, {
                  code: 'Identity card',
                  type: 'certificate',
                  name: $t('usercenter.KYC_account_verification.identity_card')
                }, {
                  code: 'Driver license',
                  type: 'certificate',
                  name: $t('usercenter.KYC_account_verification.driver_license')
                }, {
                  code: 'Utility Bill',
                  type: 'certificate',
                  name: $t('usercenter.KYC_account_verification.utility_bill')
                }]"
                :default_value="doc_type"
                event="doc_type"
                type="big"
              />
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">{{$t('usercenter.KYC_account_verification.ID_number')}}：</label>
            <div class="form-control">
              <input type="text" :placeholder="$t('usercenter.KYC_account_verification.please_enter_your_ID_Number')" v-model="doc_number">
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">{{$t('usercenter.KYC_account_verification.ID_photo')}}：</label>
            <div class="form-control upload-photos">
              <ul class="photos-list">
                <li class="front">
                  <div class="upload-box">
                    <input
                      type="file"
                      ref="front_file"
                      name="front_file"
                      accept="image/*"
                      @change="onFileChange($event, 'front')"
                    >
                    <div class="img-uploaded">
                      <img :src="uploaded_front_side" class="preview" v-if="uploaded_front_side">
                    </div>
                    <div class="upload-area">
                      <img src="@/assets/img/action_add.png">
                      <p>{{$t('usercenter.KYC_account_verification.click_to_upload_the_front_side_of_the_ID_photo')}}</p>
                    </div>
                  </div>
                  <!--<img src="@/assets/img/kyc_example.png" class="thumbnail-box">-->
                  <div class="upload-notice">
                    <p>{{$t('usercenter.KYC_account_verification.avatar_ID_number_gender_address_etc_need_to_be_clear')}}</p>
                  </div>
                </li>
                <li class="back">
                  <div class="upload-box">
                    <input
                      type="file"
                      ref="back_file"
                      name="back_file"
                      accept="image/*"
                      @change="onFileChange($event, 'back')"
                    >
                    <div class="img-uploaded">
                      <img :src="uploaded_back_side" class="preview" v-if="uploaded_back_side">
                    </div>
                    <div class="upload-area">
                      <img src="@/assets/img/action_add.png">
                      <p>{{$t('usercenter.KYC_account_verification.click_to_upload_the_back_side_of_the_ID_photo')}}</p>
                    </div>
                  </div>
                  <!--<img src="@/assets/img/kyc_example.png" class="thumbnail-box">-->
                  <div class="upload-notice">
                    <p>{{$t('usercenter.KYC_account_verification.issuing_authority_the_effective_date_need_to_be_clear')}}</p>
                  </div>
                </li>
                <li class="in-hand">
                  <div class="upload-box">
                    <input
                      type="file"
                      ref="hand_file"
                      name="hand_file"
                      accept="image/*"
                      @change="onFileChange($event, 'hand')"
                    >
                    <div class="img-uploaded">
                      <img :src="uploaded_hand_held" class="preview" v-if="uploaded_hand_held">
                    </div>
                    <div class="upload-area">
                      <img src="@/assets/img/action_add.png">
                      <p>{{$t('usercenter.KYC_account_verification.upload_a_hand_held_ID_photo')}}</p>
                    </div>
                  </div>
                  <!--<img src="@/assets/img/kyc_example.png" class="thumbnail-box">-->
                  <div class="upload-notice">
                    <p>{{$t('usercenter.KYC_account_verification.hand_held_ID_photo_standards')}}:</p>
                    <p>1. {{$t('usercenter.KYC_account_verification.The_character_avatar_is_clear')}};</p>
                    <p>2. {{$t('usercenter.KYC_account_verification.The_identity_document_information_is_clear')}};</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="form-row">
            <div class="form-label"/>
            <div class="form-control">
              <button type="submit">{{$t('usercenter.KYC_account_verification.submit')}}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { runNotice, translation, getAllRegion } from "@/helpers";
import _AutoComplete from "@/components/custom/_AutoComplete.vue";

export default {
  name: "",
  data() {
    return {
      first_name: "",
      last_name: "",
      country: { code: "CN", name: this.$t('usercenter.KYC_account_verification.china') },
      doc_type: {
        code: 'Passport',
        type: 'certificate',
        name: this.$t('usercenter.KYC_account_verification.passport')
      },
      doc_number: "",
      kyc_status: "",
      upload_front_side: null,
      upload_back_side: null,
      upload_hand_held: null,
      uploaded_front_side: null,
      uploaded_back_side: null,
      uploaded_hand_held: null
    };
  },
  mounted() {
    this.$EventBus.$on("region", country => (this.country = country));
    this.$EventBus.$on("doc_type", doc_type => (this.doc_type = doc_type));
    this.$store.dispatch("user/GET_KYC_STATUS").then((res) => {
      this.kyc_status = res.kyc_status
    }).catch((err) => {
      console.log(err)
    })
  },
  computed: {
    getAllRegion() {
      return getAllRegion();
    }
  },
  methods: {
    onFileChange($event, type) {
      const fileName = $event.target.name;
      const file = $event.target.files;
      if (!file.length) return;
      let formData = new FormData();
      let reader = new FileReader();
      //let imageURL = URL.createObjectURL(file[0]);

      if (type === "front") {
        this.upload_front_side = file[0];
        reader.onload = e => (this.uploaded_front_side = e.target.result);
      } else if (type === "back") {
        this.upload_back_side = file[0];
        reader.onload = e => (this.uploaded_back_side = e.target.result);
      } else if (type === "hand") {
        this.upload_hand_held = file[0];
        reader.onload = e => (this.uploaded_hand_held = e.target.result);
      }
      reader.readAsDataURL(file[0]);
      formData.append(fileName, file);
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("first_name", this.first_name);
      formData.append("last_name", this.last_name);
      formData.append("country", this.country.code);
      formData.append("doc_type", this.doc_type);
      formData.append("doc_number", this.doc_number);
      formData.append("upload_front_side", this.uploaded_front_side);
      formData.append("upload_back_side", this.uploaded_back_side);
      formData.append("upload_hand_held", this.uploaded_hand_held);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      try {
        await new ApiClient("trade").post("account/kyc/upload", formData, config);
        runNotice("success", translation("resource.documents.uploaded"));
        this.afterUpload();
      } catch (error) {
        return error;
      }
    },
    afterUpload() {
      this.uploaded_front_side = this.uploaded_back_side = this.uploaded_hand_held = this.upload_front_side = this.upload_back_side = this.upload_hand_held = null;
      this.first_name = this.last_name = this.doc_number = "";
    }
  },
  components: {
    "auto-complete": _AutoComplete
  }
};
</script>
