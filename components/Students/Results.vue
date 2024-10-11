<template>
  <div>
    <section
      class="grid items-start grid-cols-2 gap-x-10 gap-y-12"
      :class="myResults ? 'pointer-events-none' : ''"
    >
      <aside class="grid">
        <h5 class="result-card-title">الحفظ 40%</h5>

        <div class="grid gap-2 p-4 rounded-lg bg-slate-100 text-slate-600">
          <label class="result-card-label">
            <p>اتقان الحفظ</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(0, 30)"
                v-model.number="inputs[0]"
              />

              / 30
            </span>
          </label>

          <label class="result-card-label">
            <p>ضبط المتشابهات</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(1, 10)"
                v-model.number="inputs[1]"
              />
              / 10
            </span>
          </label>
          <div class="h-9"></div>

          <footer class="result-card-footer">
            الدرجة الكلية
            <span class="result-card-total">
              40/{{ inputs[0] + inputs[1] || 0 }}
            </span>
          </footer>
        </div>
      </aside>
      <aside class="grid">
        <h5 class="result-card-title">الرواية 20%</h5>

        <div class="grid gap-2 p-4 rounded-lg bg-slate-100 text-slate-600">
          <label class="result-card-label">
            <p>الاصول</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(2, 8)"
                v-model.number="inputs[2]"
              />
              / 08
            </span>
          </label>

          <label class="result-card-label">
            <p>القرش</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(3, 7)"
                v-model.number="inputs[3]"
              />
              / 07
            </span>
          </label>

          <label class="result-card-label">
            <p>استخضار الشواهد</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(4, 5)"
                v-model.number="inputs[4]"
              />
              / 05
            </span>
          </label>

          <footer class="result-card-footer">
            الدرجة الكلية
            <span class="result-card-total">
              20/{{ inputs[2] + inputs[3] + inputs[4] || 0 }}
            </span>
          </footer>
        </div>
      </aside>

      <aside class="grid">
        <h5 class="result-card-title">التجويد 30%</h5>

        <div class="grid gap-2 p-4 rounded-lg bg-slate-100 text-slate-600">
          <label class="result-card-label">
            <p>استظهار متون التجويد</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(5, 3)"
                v-model.number="inputs[5]"
              />
              / 03
            </span>
          </label>

          <label class="result-card-label">
            <p>مخارج الحروف</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(6, 8)"
                v-model.number="inputs[6]"
              />
              / 08
            </span>
          </label>

          <label class="result-card-label">
            <p>احكام النون والميم الساكنة</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(7, 8)"
                v-model.number="inputs[7]"
              />
              / 08
            </span>
          </label>

          <label class="result-card-label">
            <p>احكام المدود</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(8, 5)"
                v-model.number="inputs[8]"
              />
              / 05
            </span>
          </label>

          <label class="result-card-label">
            <p>التفخيم والترقيق</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(9, 6)"
                v-model.number="inputs[9]"
              />
              / 06
            </span>
          </label>

          <footer class="result-card-footer">
            الدرجة الكلية
            <span class="result-card-total">
              30/{{
                inputs[5] + inputs[6] + inputs[7] + inputs[8] + inputs[9] || 0
              }}
            </span>
          </footer>
        </div>
      </aside>

      <aside class="grid">
        <h5 class="result-card-title">الأداء 10%</h5>

        <div class="grid gap-2 p-4 rounded-lg bg-slate-100 text-slate-600">
          <label class="result-card-label">
            <p>اتمام الحركات</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(10, 3)"
                v-model.number="inputs[10]"
              />
              / 03
            </span>
          </label>

          <label class="result-card-label">
            <p>ضبط النفس بين الجمل</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(11, 2)"
                v-model.number="inputs[11]"
              />
              / 02
            </span>
          </label>

          <label class="result-card-label">
            <p>النبر والاستفهام</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(12, 2)"
                v-model.number="inputs[12]"
              />
              / 02
            </span>
          </label>

          <label class="result-card-label">
            <p>الوقوف والابتداء</p>
            <span class="result-card-span">
              <input
                class="result-card-input"
                type="number"
                placeholder="00"
                @input="inputMaxNumber(13, 3)"
                v-model.number="inputs[13]"
              />
              / 03
            </span>
          </label>

          <div class="h-9"></div>

          <footer class="result-card-footer">
            الدرجة الكلية
            <span class="result-card-total">
              10/{{ inputs[10] + inputs[11] + inputs[12] + inputs[13] || 0 }}
            </span>
          </footer>
        </div>
      </aside>
    </section>

    <section
      v-if="!noTotal"
      class="w-full p-5 mx-auto mt-16 rounded-lg shadow-md bg-gradient-to-tl from-theme1 to-theme2"
    >
      <div class="flex items-center gap-1 text-white">
        <IconsPremiumIcon2 class="w-8 h-8 text-white fill-white" />
        <span class="text-2xl font-semibold">العلامة النهائية %100</span>
      </div>
      <p class="relative h-1 my-5 overflow-hidden bg-white w-100 rounded-xl">
        <span
          class="absolute h-1 duration-300 bg-theme1"
          :style="{ width: `${total}%` }"
        ></span>
      </p>

      <div class="text-4xl font-bold text-white text-end">
        <span
          v-if="
            inputs[0] &&
            inputs[1] &&
            inputs[2] &&
            inputs[3] &&
            inputs[4] &&
            inputs[5] &&
            inputs[6] &&
            inputs[7] &&
            inputs[8] &&
            inputs[9] &&
            inputs[10] &&
            inputs[11] &&
            inputs[12] &&
            inputs[13]
          "
        >
          {{ total }}
        </span>
        <span v-else> --- </span>
        / %100
      </div>
    </section>

    <button
      v-if="!noSubmit"
      class="px-10 mt-10 text-xl btn-theme btn"
      :disabled="
        (!inputs[0] &&
          inputs[1] &&
          inputs[2] &&
          inputs[3] &&
          inputs[4] &&
          inputs[5] &&
          inputs[6] &&
          inputs[7] &&
          inputs[8] &&
          inputs[9] &&
          inputs[10] &&
          inputs[11] &&
          inputs[12] &&
          inputs[13]) ||
        loading
      "
      @click="submit()"
    >
      حفظ
      <span v-if="loading" class="loading loading-spinner"></span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  noSubmit: {
    type: Boolean,
    default: false,
  },
  noTotal: {
    type: Boolean,
    default: false,
  },
  myResults: {
    type: null,
    default: null,
  },
});

const loading = ref(null);
const resKeys = useGlobalData().results;
const inputs = reactive([]);

onMounted(() => {
  initData();
});

function initData() {
  if (props.myResults) {
    resKeys.forEach((element, i) => {
      console.log(element);
      inputs[i] = Number(props.myResults[element]);
    });
  }
}

const total = computed(() => {
  // return inputs[10] + inputs[11] + inputs[12] + inputs[13];
  const sum = inputs.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    0
  );
  if (isNaN(sum) || !sum) return 0;
  return sum;
});

const inputMaxNumber = (index, max) => {
  if (inputs[index] > max) {
    inputs[index] = max;
  }
};

const submit = () => {
  const ourNumber = Number(total.value);
  const results = useGlobalData().results;

  console.log("total", ourNumber);
  if (ourNumber > 100 || isNaN(ourNumber)) {
    useToast().errorHandler(null, "من فضلك تأكد ان البيانات صحيحة");
    return;
  }
  loading.value = true;

  let payload: any = {
    user_id: useRoute().params.id,
    status_id: ourNumber >= 70 ? "2" : "1",
    // "results[testtt]": 10,
  };
  for (let i in results) {
    if (inputs[i] == 0) {
      payload[`results[${results[i]}]`] = "0";
      return;
    }
    payload[`results[${results[i]}]`] = inputs[i];
  }
  payload = useObjToFormData(payload);

  $http("/admin/general-test-approve", {
    method: "post",
    body: payload,
  })
    .then(async () => {
      useStudentStore().fetchData();
      await useRouter().push("/students");
      useToast().showSuccess("تمت العملية بنجاح");
    })
    .catch((err) => {
      loading.value = false;
      useToast().errorHandler(err);
    });
};
</script>

<style scoped>
.result-card-title {
  @apply font-semibold text-center text-lg text-slate-50 bg-gradient-to-b  from-theme1 to-theme2 rounded-t-lg p-[6px];
}
.result-card-label {
  @apply flex items-center justify-between  whitespace-nowrap;
}
.result-card-span {
  @apply flex justify-center py-1 font-bold bg-white border rounded-md pe-4 ps-2 w-fit;
}
.result-card-input {
  @apply text-center outline-none w-9 text-theme6;
}
.result-card-footer {
  @apply relative py-1 px-4 mt-4 -m-4 text-base font-bold rounded-lg bg-slate-200 text-slate-800;
}
.result-card-total {
  @apply absolute grid w-14 h-14 text-white rounded-full -bottom-2 -end-1 place-items-center bg-gradient-to-b  from-theme1 to-theme2;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
}
input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
}
</style>
