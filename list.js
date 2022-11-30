import modal from "@/components/modal.vue";
import select2 from "@/components/select2.vue";
import { _ } from "core-js";
import { createApp } from "vue/dist/vue.esm-bundler.js";

var c = console.log.bind(document);

var commenting_report = "";
var commenting_add = "";
var commenting_quot = "";
var commenting_step_data = {};
var report_quot = "";
var report_step_data = {};
var report = "";
var report_step = {};
var reject_quot = "";
var reject_step_data = {};
var reject_quot = "";
var reject_step_data = {};
var step_outsource_field_i = "";
window.addEventListener("resize", calculateIframeHeight);
function calculateIframeHeight() {
  let windowHeight = window.innerHeight;
  let searchBarSectionHeight =
    document.getElementById("searchbar-section").offsetHeight;
  let navMenuHeight = document.getElementById("list-nav-menu").offsetHeight;

  let iframe = document.getElementById("iframe-placeholder");
  let iframeHeight =
    windowHeight - searchBarSectionHeight - navMenuHeight - 210;
  let cssText = "height: " + iframeHeight + "px;";
  iframe.style.cssText = cssText;
}

function generateToast(message, type = "primary") {
  let toastContainer = document.querySelector(
    "#toast-placeholder.toast-container"
  );
  toastContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="toast align-items-center text-bg-${type} border-0 animate__slideInDown rounded-3 show" data-bs-autohide="true" data-bs-delay="1000" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
  `
  );
}

async function updateStepData(quot, reportStepData, stepName) {
  try {
    let setdata = _.cloneDeep(quot.exam_and_order);
    for (let stepi in setdata.order_step_data) {
      if (setdata.order_step_data[stepi].name == stepName && setdata.order_step_data[stepi][stepName].report) {
        setdata.order_step_data[stepi][stepName].report.reports.push(reportStepData.step_data[stepName].report.reports[0])
        setdata.order_step_data[stepi][stepName].report.total = setdata.order_step_data[stepi][stepName].report.total + reportStepData.step_data[stepName].report.total
      } else {
        if (setdata.order_step_data[stepi].name == stepName) {
          setdata.order_step_data[stepi][stepName] = {}
          setdata.order_step_data[stepi][stepName].report = reportStepData.step_data[stepName].report
        }
      }
    }

    await db.collection("quotation").doc(quot.id).set({
      exam_and_order: setdata,
    }).then(res => {
      vm_status.quotdata = res.data
      c(res.data.exam_and_order.order_step_data)
    });
    mainView.getQuotdata();
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการ Update step_data");
  }
}

async function updateStepDataExam(quot, report_step_data, stepName) {
  try {
    let setdata = _.cloneDeep(quot.exam_and_order);
    for (let stepi in setdata.sort_step_data) {
      if (setdata.sort_step_data[stepi].name == stepName && setdata.sort_step_data[stepi][stepName].report) {
        setdata.sort_step_data[stepi][stepName].report.reports.push(report_step_data.report.reports[0])
        setdata.sort_step_data[stepi][stepName].report.total = setdata.sort_step_data[stepi][stepName].report.total + report_step_data.report.total
      } else {
        if (setdata.sort_step_data[stepi].name == stepName) {
          setdata.sort_step_data[stepi][stepName] = {}
          setdata.sort_step_data[stepi][stepName].report = report_step_data.report
        }
      }
    }
    await db.collection("quotation").doc(quot.id).set({
      exam_and_order: setdata,
    }).then(res => {
      vm_status.quotdata = res.data
      c(res.data.exam_and_order.sort_step_data)
    })
    mainView.getQuotdata();
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการ Update step_data for exam");
  }
}

function build_newdata_template() {
  let newdata_template = {
    name: "",
    img: [],
    imgsize: 75,
    due: new Date().addDays(3).toISOString().split("T")[0],
    due_sample: new Date().addDays(3).toISOString().split("T")[0],
    finish: new Date().toISOString().split("T")[0],
    data: [
      {
        vat: 0,
        amount: "S = \nM = \nL = \nXL = \n",
        button: 2,
        button_color: "",
        collar: "คอกลม",
        color: "",
        enable: true,
        example: "ส่งตัวอย่างคอนเฟิร์มตัวจริงทางไปรษณีย์",
        fabric: "Cotton 100%",
        moreinfo: "",
        placket: "สีเดียวกับเสื้อ",
        placket_style: "สาปโชว์สี",
        placket_width: "ตามมาตรฐานสมศรี 3 ซม.",
        placket_length: "ตามมาตรฐานสมศรี 12.5 ซม. (ไม่รวมสกัดโปโล)",
        pocket: "ไม่มี",
        size: 'ตามขนาดมาตรฐาน\nS - 34"/26"\nM - 36"/27"\nL - 40"/29"\nXL - 44"/31"\nXXL - 48"/32"',
        size_label: "สมศรีมีเสื้อ",
        size_label_img:
          "https://somsritshirt.com/img/quotation/somsrisizelabel.jpg",
        size_label_img_show: true,
        size_label_imgsize: 75,
        sleeve: "แขนสั้นปล่อย",
        style:
          "มาตรฐานสมศรีรุ่นที่ 5 ริบคอสูง 1.3 cm ไม่คิ้วคอหน้า ใช้ผ้าดามคอสีตามตัวเสื้อ ลาคู่เล็ก คิ้วไหล่",
        picrow: [],
        sample_img: [],
        finish__use_after_approval: false,
        due__use_after_approval: false,
        due_sample__use_after_approval: true,
        is_express: false,
        sample_confirmation: "ถ่ายรูป",
        sample_form: "ชิ้นผ้า",
        organization_work: false,
        brand_work: false,
        event_work: false,
        urgent_work: false,
        delivery_type: "",
        delivery_price: 0,
        unable_to_postpone: false,
        withholding: false,
      },
      {
        color: "",
        distance: "custom_cm",
        enable: false,
        file: "อ้างอิงตามลูกค้า",
        position: "",
        size: "ด้านหน้ากว้าง X นิ้ว ด้านหลังกว้าง Y นิ้ว",
        type: "งานพิมพ์",
      },
      {
        distance: "ปรับตามขนาดเสื้อให้",
        file: "อ้างอิงตามลูกค้า",
        position: "",
        size: "",
        maicolor: "",
      },
      {
        pack_style: "ถุงพลาสติกมาตรฐานสมศรี",
        deposit_img: [
          {
            img: "",
            date: "",
            amount: 0,
            account: "",
          },
        ],
        paid_img: [
          {
            img: "",
            date: "",
            amount: 0,
            account: "",
          },
        ],
        shift_count: 0,
        customer_type: "",
        brand: "",
      },
      {
        enable: false,
        problem: [
          {
            title: "ปัญหาที่ 1",
            picrow: [
              {
                img: "",
                imgsize: 75,
              },
            ],
            problem_note: "",
          },
        ],
      },
      {
        more_pinpoint: [
          {
            distance: "ปรับตามขนาดเสื้อให้",
            file: "อ้างอิงตามลูกค้า",
            position: "",
            size: "",
            maicolor: "",
            size_suffix: "ซม.",
          },
        ],
        more_screenpoint: [
          {
            color: "",
            distance: "custom_cm",
            enable: false,
            file: "อ้างอิงตามลูกค้า",
            position: "",
            size: "ด้านหน้ากว้าง X นิ้ว ด้านหลังกว้าง Y นิ้ว",
            type: "งานพิมพ์",
          },
        ],
      },
    ],
    step_list: approve_step,
    step_data: {},

    deposit_step_list: [],
    deposit_step_data: {},
    deposit_value: 0.0,
    total_value: 0.0,
    paid_type: "ยังไม่ได้กำหนด",

    created_at: new Date(),
    type: "เสื้อยืด",
    owner: auth_email,
    created_by: auth_email,
    is_sample: false,
    use_perfect_countamount: true,

    sizeinfo: {
      ตามขนาดมาตรฐาน: {
        S: [
          {
            label: "กว้างอก",
            size: 34,
          },
          {
            label: "ยาวเสื้อ",
            size: 26,
          },
        ],
        M: [
          {
            label: "กว้างอก",
            size: 36,
          },
          {
            label: "ยาวเสื้อ",
            size: 27,
          },
        ],
        L: [
          {
            label: "กว้างอก",
            size: 40,
          },
          {
            label: "ยาวเสื้อ",
            size: 29,
          },
        ],
        XL: [
          {
            label: "กว้างอก",
            size: 44,
          },
          {
            label: "ยาวเสื้อ",
            size: 31,
          },
        ],
        "2XL": [
          {
            label: "กว้างอก",
            size: 48,
          },
          {
            label: "ยาวเสื้อ",
            size: 32,
          },
        ],
        "3XL": [
          {
            label: "กว้างอก",
            size: 0,
          },
          {
            label: "ยาวเสื้อ",
            size: 0,
          },
        ],
        "4XL": [
          {
            label: "กว้างอก",
            size: 0,
          },
          {
            label: "ยาวเสื้อ",
            size: 0,
          },
        ],
        "5XL": [
          {
            label: "กว้างอก",
            size: 0,
          },
          {
            label: "ยาวเสื้อ",
            size: 0,
          },
        ],
        "6XL": [
          {
            label: "กว้างอก",
            size: 0,
          },
          {
            label: "ยาวเสื้อ",
            size: 0,
          },
        ],
      },
      ___sizelist: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      ___titlelist: ["ตามขนาดมาตรฐาน"],
    },

    sizenote: {
      ___prefix: "",
      ตามขนาดมาตรฐาน: "",
      ___suffix: "",
    },

    amountlistdeep: {
      "": {
        S: {
          amount: 0,
          order: 0,
        },
        M: {
          amount: 0,
          order: 1,
        },
        L: {
          amount: 0,
          order: 2,
        },
        XL: {
          amount: 0,
          order: 3,
        },
        "2XL": {
          amount: 0,
          order: 4,
        },
        "3XL": {
          amount: 0,
          order: 5,
        },
        "4XL": {
          amount: 0,
          order: 6,
        },
        "5XL": {
          amount: 0,
          order: 7,
        },
        "6XL": {
          amount: 0,
          order: 8,
        },
      },
    },

    amountlist: {
      S: {
        amount: 0,
        order: 0,
      },
      M: {
        amount: 0,
        order: 1,
      },
      L: {
        amount: 0,
        order: 2,
      },
      XL: {
        amount: 0,
        order: 3,
      },
      "2XL": {
        amount: 0,
        order: 4,
      },
      "3XL": {
        amount: 0,
        order: 5,
      },
      "4XL": {
        amount: 0,
        order: 6,
      },
      "5XL": {
        amount: 0,
        order: 7,
      },
      "6XL": {
        amount: 0,
        order: 8,
      },
    },

    amountlistmetadata: {
      titlelist: {
        "": [""],
      },
      sizelist: {
        "": ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      },
    },

    amountlistnote: {
      ___prefix: "",
      "": "",
      ___suffix: "",
    },

    shirt_size_type: [
      {
        name: "ยังไม่ระบุ",
        info: [],
      },
    ],

    exam_and_order: {
      is_zutto: 0,
      is_exam: 0,
      is_order: false,
      is_ordered: 0,
      is_approved: 0,
      fabric_receive_exam: false,
      fabric_receive_order: false,
      step_list: [
        ["approved", "อนุมัติใบสเปค"],
        ["pr", "เขียน P.R."],
        ["fabric_ordered", "สั่งผ้า"],
        ["fabric_received", "รับผ้า"],
        ["cutted", "ตัด"],
        ["screened", "สกรีน"],
        ["sewed", "เย็บ"],
        ["qc", "QC"],
        ["exam_photo", "ถ่ายรูปงานตัวอย่าง"],
        ["delivered", "จัดส่ง"],
        ["exam_approved", "อนุมัติตัวอย่าง"],
      ],
      step_data: {
        approved: {},
        pr: {},
        fabric_ordered: {},
        fabric_received: {},
        cutted: {},
        screened: {},
        sewed: {},
        qc: {},
        exam_photo: {},
        delivered: {},
        exam_approved: {},
      },
      reject: {},
    },

    cost: {
      name: ["ผ้า"],
      lists: [
        {
          ผ้า: [
            {
              list_name: "ปก",
              list_amount: 0,
              list_unit: "หน่วย",
              list_price_per_unit: 0,
              list_price: 0,
            },
          ],
        },
      ],
      total_price: [
        {
          ผ้า: 0,
        },
      ],
      material_price: 0,
      wage: {
        in: {
          lists: [
            {
              list_name: "ตัด1",
              list_amount: 0,
              list_price_per_unit: 0,
              list_price: 0,
            },
          ],
          total_price: {
            price_per_unit: 0,
            amount: 0,
            price: 0,
          },
        },
        out: {
          lists: [
            {
              list_name: "ตัด1",
              list_amount: 0,
              list_price_per_unit: 0,
              list_price: 0,
            },
          ],
          total_price: {
            price_per_unit: 0,
            amount: 0,
            price: 0,
          },
        },
      },
      basic: {
        amount: 0,
        sell_price: 0,
        discount: 0,
        get_delivery_fee: 0,
        sell_price_sum_delivery_fee: 0,
        sell_price_per_amount: 0,
      },
      total_cost: {
        tbl1: {
          freight_profit: 0,
          total_cost: 0,
          sell_price_sum_delivery_fee: 0,
          gross_profit: 0,
          percent: 0,
        },
        tbl2: {
          wage_price: 0,
          wage_percent: 0,
          material_percent: 0,
          total_price: 0,
          total_percent: 0,
        },
      },
      cost_per_one: 0,
      delivery: {
        lists: [
          {
            name: "ค่าขนส่งสินค้า",
            price: 0,
          },
          {
            name: "ค่าขนย้ายวัตถุดิบ1",
            price: 0,
          },
        ],
        total_price: 0,
      },
    },
  };
  for (let x of approve_step) {
    newdata_template[x[0]] = false;
    newdata_template[x[0] + "_by"] = "";
    newdata_template[x[0] + "_at"] = "";
  }
  return newdata_template;
}

function build_zutto_template(type) {
  let newdata = build_newdata_template();
  if (type == "เสื้อเชิ้ตแขนยาว") {
    var title_alert = "เสื้อเชิ้ตแขนยาว";
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[0].sample_confirmation = "ถ่ายรูป";
    newdata.data[0].sample_form = "ชิ้นผ้า";
    newdata.data[3].pack_style = "ถุงZUTTO (แปะสติกเกอร์มุมขวาด้านล่าง)";
    newdata.data[0].size_label = "ป้าย zutto";
    newdata.shirt_size_type[0].name = "มาตรฐาน ZUTTO";
    newdata.shirt_size_type[0].info = [
      {
        name: "S",
        width_chest: 41,
        long_shirt: 27,
      },
      {
        name: "M",
        width_chest: 43,
        long_shirt: 28,
      },
      {
        name: "L",
        width_chest: 45,
        long_shirt: 30,
      },
      {
        name: "XL",
        width_chest: 47,
        long_shirt: 31,
      },
      {
        name: "2XL",
        width_chest: 49,
        long_shirt: 31,
      },
      {
        name: "3XL",
        width_chest: 51,
        long_shirt: 32,
      },
      {
        name: "4XL",
        width_chest: 53,
        long_shirt: 33,
      },
      {
        name: "5XL",
        width_chest: 55,
        long_shirt: 33,
      },
      {
        name: "6XL",
        width_chest: 57,
        long_shirt: 33,
      },
      {
        name: "7XL",
        width_chest: 59,
        long_shirt: 33,
      },
      {
        name: "8XL",
        width_chest: 61,
        long_shirt: 33,
      },
      {
        name: "EXTRA",
        width_chest: 63,
        long_shirt: 33,
      },
    ];
    newdata.data[0].sleeve = "แขนยาว";
    newdata.data[0].style = "ปกตั้งเชิ้ต ห่อสาบหน้า";
    newdata.data[0].collar = "ปกตั้งเชิ้ต ผ้าC2503";
    newdata.data[0].fabric = "ผ้าC2503";
    newdata.data[0].size_label_img_show = false;
    newdata.data[0].example = "ไม่ต้อง";
    newdata.data[0].moreinfo =
      "ใช้กระดุม สีขาว 11 เม็ด \n (ด้านหน้า 7 เม็ด) (ข้อม้อข้างละ 1 เม็ด) (สาบแขน ข้างละ 1 เม็ด) \n ผับผ่าชาย มีผ้าตัดต่อชิ้นสามเหลี่ยม (ตามรูปที่แนบ)";
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_6316cf7838692/ปกยาว.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6316d0a1bf4df/ตัวอย่างเสื้อเชิ้ตแขนยาว_ผ้าC2503-01-01.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6316c51d4726a/1 inch.png",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_632be78abdbfe/E7D6A2D5-9432-4879-96A2-4B326339C436.jpeg",
        imgsize: "100",
      },
    ];
  }

  if (type == "เสื้อเชิ้ตแขนสั้น") {
    var title_alert = "เสื้อเชิ้ตแขนสั้น";
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[0].sample_confirmation = "ถ่ายรูป";
    newdata.data[0].sample_form = "ชิ้นผ้า";
    newdata.data[3].pack_style = "ถุงZUTTO (แปะสติกเกอร์มุมขวาด้านล่าง)";
    newdata.data[0].size_label = "ป้าย zutto";
    newdata.shirt_size_type[0].name = "มาตรฐาน ZUTTO";
    newdata.shirt_size_type[0].info = [
      {
        name: "S",
        width_chest: 41,
        long_shirt: 27,
      },
      {
        name: "M",
        width_chest: 43,
        long_shirt: 28,
      },
      {
        name: "L",
        width_chest: 45,
        long_shirt: 30,
      },
      {
        name: "XL",
        width_chest: 47,
        long_shirt: 31,
      },
      {
        name: "2XL",
        width_chest: 49,
        long_shirt: 31,
      },
      {
        name: "3XL",
        width_chest: 51,
        long_shirt: 32,
      },
      {
        name: "4XL",
        width_chest: 53,
        long_shirt: 33,
      },
      {
        name: "5XL",
        width_chest: 55,
        long_shirt: 33,
      },
      {
        name: "6XL",
        width_chest: 57,
        long_shirt: 33,
      },
      {
        name: "7XL",
        width_chest: 59,
        long_shirt: 33,
      },
      {
        name: "8XL",
        width_chest: 61,
        long_shirt: 33,
      },
      {
        name: "EXTRA",
        width_chest: 63,
        long_shirt: 33,
      },
    ];
    newdata.data[0].sleeve = "แขนสั้นปล่อย";
    newdata.data[0].style = "ปกตั้งเชิ้ต ห่อสาบหน้า";
    newdata.data[0].collar = "ปกตั้งเชิ้ต ผ้าC2503";
    newdata.data[0].fabric = "ผ้าC2503";
    newdata.data[0].size_label_img_show = false;
    newdata.data[0].example = "ไม่ต้อง";
    newdata.data[0].moreinfo =
      "ใช้กระดุม สีตามตัวเสื้อเชิ้ต 7 เม็ด \n ผับผ่าชาย มีผ้าตัดต่อชิ้นสามเหลี่ยม (ตามรูปที่แนบ)";
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_6316c47b978ac/LINE_ALBUM_ภาพแคตตาล็อค_๒๑๐๙๐๓.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6316c47b76f72/114987.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6316c47b9bd16/ตัวอย่างเสื้อเชิ้ต02  ผ้าC2503-01.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6316c51d4726a/1 inch.png",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_632be7cc18932/A64C042D-EC59-46F8-A978-1EFC306A9F61.jpeg",
        imgsize: "100",
      },
    ];
  }

  if (type == "กางเกงขาสั้นกระดุม") {
    var title_alert = "กางเกงขาสั้นกระดุม";
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[0].sample_confirmation = "ถ่ายรูป";
    newdata.data[0].sample_form = "ชิ้นผ้า";
    newdata.data[3].pack_style = "ถุงZUTTO";
    newdata.data[0].size_label =
      "ป้ายแสดงกางเกง ใส่ที่ถุงกระเป๋า , ป้ายแทค ZUTTO ติดลิ้นกระเป๋าด้านขวา";
    newdata.shirt_size_type[0].name = "กางเกง ZUTTO รุ่นกระดุม";
    newdata.shirt_size_type[0].info = [
      {
        name: "M",
        width_chest: 36,
        long_shirt: 16,
      },
      {
        name: "L",
        width_chest: 40,
        long_shirt: 17,
      },
      {
        name: "XL",
        width_chest: 44,
        long_shirt: 18,
      },
      {
        name: "2XL",
        width_chest: 48,
        long_shirt: 20,
      },
      {
        name: "3XL",
        width_chest: 52,
        long_shirt: 20.5,
      },
    ];
    newdata.shirt_size_type[0].note = "ไซส์ตามภาพตารางกางเกงที่แนบ";
    newdata.data[0].color = "สีเทา ตามชาจผ้าที่แนบ";
    newdata.data[0].fabric = "41% Ployester 59% Solotex";
    newdata.data[0].size_label_img_show = false;
    newdata.data[0].moreinfo =
      "ข้อมูลเย็บกางเกง \n ขาใน 7 นิ้วครึ่ง กว้างปลายขา 10 นิ้ว \n ขอบในหลังกางเกง เป็นยางยืดรุ่นใหม่ ของยุวเท็กซ์ \n ขอบเอวสูง 1 นิ้วครึ่ง \n พับปลายขา 1 นิ้ว \n **เอาความกว้างปลายขาเข้าข้างละ 2 นิ้ว ทุกไซส์ \n\n กระเป๋า \n กระเป๋าหน้าเฉียง 2 ข้าง \n กระเป๋าเจาะหลัง 2 ข้าง \n จับเกล็ดหลัง \n\n หูกางเกง ซิป กระดุม \n หูกางเกง 5 หู \n ซิปยาว 7 นิ้ว (วัสดุ เป็นของYKK ) \n กระดุม 2 ซม (วัสดุ เป็นเหล็กสีเงิน ทรงโดนัทดิ้นได้ )";
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51d580c7/193998.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51d826c9/2022-01-06 (3).png",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51e50800/E01707D8-92D8-4432-8225-F41F71E6AF2A.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51dc5aaf/6ADAFAD8-48BF-46DC-9D4F-08557BF63176.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51e08c79/6A7BED9A-BA84-41BD-A463-BD4FA39098F2.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51dd2bb9/F2E9F68C-7862-4CB3-9DF9-2335CCCECF71.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51e63266/9D857B3B-D508-4E5B-A8DD-ED20A4A0E8B5.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315c51dd5f19/4BFA3FDE-A297-45CF-BE1B-EEEE037E2E9D.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6315ce58d738a/A51E3213-EBF1-46BD-AE2E-4CDF356BEDC4.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_632be80076843/873407EE-DB4C-4ED3-AEEC-8B8398871642.jpeg",
        imgsize: "100",
      },
    ];
  }

  if (type == "กางเกงขาสั้นยางยืด") {
    var title_alert = "กางเกงขาสั้นยางยืด";
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[3].pack_style = "ถุง ZUTTO";
    newdata.data[0].size_label =
      "ป้ายแสดงกางเกง ใส่ที่ถุงกระเป๋า , ป้ายแทค ZUTTO ติดลิ้นกระเป๋าด้านขวา";
    newdata.shirt_size_type[0].name = "กางเกง ZUTTO รุ่นยางยืด";
    newdata.shirt_size_type[0].info = [
      {
        name: "M",
        width_chest: 41,
        long_shirt: 16.5,
      },
      {
        name: "L",
        width_chest: 43,
        long_shirt: 17.5,
      },
      {
        name: "XL",
        width_chest: 49,
        long_shirt: 19.5,
      },
      {
        name: "2XL",
        width_chest: 51.5,
        long_shirt: 20.5,
      },
    ];
    newdata.data[0].style =
      "กางเกงขอบเอวในตัว กระเป๋าเจาะ ถักรังร้อยเชือกด้านนอก ความสูงขอบยางยืด 2 นิ้ว";
    newdata.data[0].color = "ดำ#10/เทา#6";
    newdata.data[0].fabric = "ผ้าตราม้า 7700";
    newdata.data[0].size_label_img_show = false;
    newdata.data[0].moreinfo = "ร้อยเชือกขอบเอว สีดำ + เหล็กหุ้มปลายเชือก";
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_62eb44010175f/ยางยืด186.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_62ec817a9e155/Untitled design 86.png",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_61921c4f3e1a1/รูปกางเกง.jpg",
        imgsize: "100",
      },
    ];
  }

  if (type == "เสื้อคอกลม Airflow") {
    var title_alert = "เสื้อคอกลม Airflow";
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[3].pack_style = "ถุง ZUTTO (แปะสติกเกอร์มุมขวาด้านล่าง)";
    newdata.data[0].size_label = "ป้าย ZUTTO";
    newdata.shirt_size_type[0].name = "มาตรฐาน ZUTTO";
    newdata.shirt_size_type[0].info = [
      {
        name: "S",
        width_chest: 41,
        long_shirt: 27,
      },
      {
        name: "M",
        width_chest: 43,
        long_shirt: 28,
      },
      {
        name: "L",
        width_chest: 45,
        long_shirt: 30,
      },
      {
        name: "XL",
        width_chest: 47,
        long_shirt: 31,
      },
      {
        name: "2XL",
        width_chest: 49,
        long_shirt: 31,
      },
      {
        name: "3XL",
        width_chest: 51,
        long_shirt: 32,
      },
      {
        name: "4XL",
        width_chest: 53,
        long_shirt: 33,
      },
      {
        name: "5XL",
        width_chest: 55,
        long_shirt: 33,
      },
      {
        name: "6XL",
        width_chest: 57,
        long_shirt: 33,
      },
      {
        name: "7XL",
        width_chest: 59,
        long_shirt: 33,
      },
      {
        name: "8XL",
        width_chest: 61,
        long_shirt: 33,
      },
      {
        name: "EXTRA",
        width_chest: 63,
        long_shirt: 33,
      },
    ];
    newdata.shirt_size_type[0].note =
      "ไซส์ s - 3xl ใส่ป้าย zutto \n ไซส์ 4xl ขึ้นไปใส่ป้าย extra บวกป้ายไซส์";
    newdata.data[0].sleeve = "แขนสั้นปล่อย";
    newdata.data[0].style =
      "ริบคอสูง 1.7 CM ผ้าในตัวสีตามตัวเสื้อ ลาลูกโซ่ คิ้วคอหน้า ลาคู่ใหญ่";
    newdata.data[0].color = "ม่วงวินเทจ";
    newdata.data[0].collar = "คอกลม";
    newdata.data[0].fabric = "cotton comb 20";
    newdata.data[0].example = "ไม่ต้อง";
    newdata.data[0].size_label_img_show = false;
    newdata.data[0].moreinfo =
      "เพิ่มเติมคอกลม \n กว้างคอเพิ่ม 1 นิ้ว จากแพทเทิร์น \n ลึกคอ ใช้แพทเทิร์นเดิม (XL)";
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_62ec90b2cd603/296981970_718529849242050_3747093745156860673_n.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6285f7b227823/1 inch.png",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_627a0f6e3559e/เสื้อเฟล็กไซส์หลังคอ (ตารางสีผ้า)-01.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_630f05c5d8f47/image.png",
        imgsize: "100",
      },
    ];
  }

  if (type == "เสื้อคอวี Airflow") {
    var title_alert = "เสื้อคอวี Airflow";
    newdata.data[1].enable = true;
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[3].pack_style = "ถุง ZUTTO (แปะสติกเกอร์มุมขวาด้านล่าง)";
    newdata.data[0].size_label = "ป้าย ZUTTO";
    newdata.shirt_size_type[0].name = "มาตรฐาน ZUTTO";
    newdata.shirt_size_type[0].info = [
      {
        name: "S",
        width_chest: 41,
        long_shirt: 27,
      },
      {
        name: "M",
        width_chest: 43,
        long_shirt: 28,
      },
      {
        name: "L",
        width_chest: 45,
        long_shirt: 30,
      },
      {
        name: "XL",
        width_chest: 47,
        long_shirt: 31,
      },
      {
        name: "2XL",
        width_chest: 49,
        long_shirt: 31,
      },
      {
        name: "3XL",
        width_chest: 51,
        long_shirt: 32,
      },
      {
        name: "4XL",
        width_chest: 53,
        long_shirt: 33,
      },
      {
        name: "5XL",
        width_chest: 55,
        long_shirt: 33,
      },
      {
        name: "6XL",
        width_chest: 57,
        long_shirt: 33,
      },
      {
        name: "7XL",
        width_chest: 59,
        long_shirt: 33,
      },
      {
        name: "8XL",
        width_chest: 61,
        long_shirt: 33,
      },
      {
        name: "EXTRA",
        width_chest: 63,
        long_shirt: 33,
      },
    ];
    newdata.shirt_size_type[0].note =
      "เฟล็กส์ โลโก้+ไซส์ ตรงคอหลัง \n logo สีขาวใช้กับเสื้อสีเข้ม , logo สีกรมใช้กับเสื้อสีอ่อน";
    newdata.data[0].sleeve = "แขนสั้นปล่อย";
    newdata.data[0].style =
      "ริบคอสูง 1.7 CM ผ้าในตัวสีตามตัวเสื้อ ลาลูกโซ่ คิ้วคอหน้า ลาคู่ใหญ่";
    newdata.data[0].color = "กรม/เทา/ดำ";
    newdata.data[0].collar = "คอวี";
    newdata.data[0].fabric = "Comb 20";
    newdata.data[0].example = "ไม่ต้อง";
    newdata.data[0].size_label_img_show = false;
    newdata.data[0].moreinfo = "- เทปก้างปลาสีครีม";
    newdata.data[5].more_screenpoint = [
      {
        color: "logo สีขาวใช้กับเสื้อสีเข้ม , logo สีกรมใช้กับเสื้อสีอ่อน",
        distance: "custom_cm",
        enable: true,
        file: "อ้างอิงตามลูกค้า",
        position: "ป้ายคอ ห่างจากก้างปลาลงมา1.5cm.",
        size: "กว้าง 1.5 cm สูง 2.5 cm",
        type: "เฟล็ก",
      },
    ];
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_62ec90e2869e6/296973988_1471096126684666_9023668561825015162_n.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_627a0eb9d51d7/เสื้อเฟล็กไซส์หลังคอ หน้าดราฟ-03.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_627a0eb9d78cb/เสื้อเฟล็กไซส์หลังคอ หน้าดราฟ-04.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_627a0ef57d8e5/เสื้อเฟล็กไซส์หลังคอ (ตารางสีผ้า)-01.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_62eb3cbdbde8a/คอวี209.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6285f720b1f19/1 inch.png",
        imgsize: "100",
      },
    ];
  }

  if (type == "เสื้อแขนกุด Airflow") {
    var title_alert = "เสื้อแขนกุด Airflow";
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[3].pack_style = "ถุง ZUTTO (แปะสติกเกอร์มุมขวาด้านล่าง)";
    newdata.data[0].size_label = "ป้าย ZUTTO";
    newdata.shirt_size_type[0].name = "มาตรฐาน ZUTTO";
    newdata.shirt_size_type[0].info = [
      {
        name: "S",
        width_chest: 41,
        long_shirt: 27,
      },
      {
        name: "M",
        width_chest: 43,
        long_shirt: 28,
      },
      {
        name: "L",
        width_chest: 45,
        long_shirt: 30,
      },
      {
        name: "XL",
        width_chest: 47,
        long_shirt: 31,
      },
      {
        name: "2XL",
        width_chest: 49,
        long_shirt: 31,
      },
      {
        name: "3XL",
        width_chest: 51,
        long_shirt: 32,
      },
      {
        name: "4XL",
        width_chest: 53,
        long_shirt: 33,
      },
      {
        name: "5XL",
        width_chest: 55,
        long_shirt: 33,
      },
      {
        name: "6XL",
        width_chest: 57,
        long_shirt: 33,
      },
      {
        name: "7XL",
        width_chest: 59,
        long_shirt: 33,
      },
      {
        name: "8XL",
        width_chest: 61,
        long_shirt: 33,
      },
      {
        name: "EXTRA",
        width_chest: 63,
        long_shirt: 33,
      },
    ];
    newdata.shirt_size_type[0].note =
      "เฟล็กส์ โลโก้+ไซส์ ตรงคอหลัง \n logo สีขาวใช้กับเสื้อสีเข้ม , logo สีกรมใช้กับเสื้อสีอ่อน";
    newdata.data[0].sleeve = "แขนกุด";
    newdata.data[0].style =
      "ริบคอสูง 1.7 CM ผ้าในตัวสีตามตัวเสื้อ ลาลูกโซ่ คิ้วคอหน้า ลาคู่ใหญ่";
    newdata.data[0].color = "ขาว/กรม/ดำ/เทา/เทาเข้ม/แดงเชอรี่";
    newdata.data[0].collar = "คอกลม";
    newdata.data[0].fabric = "cotton comb 20";
    newdata.data[0].example = "ไม่ต้อง";
    newdata.data[0].size_label_img_show = false;
    newdata.data[0].moreinfo =
      "กว้างคอเพิ่ม 1 นิ้ว จากแพทเทิร์น \n (ปรับจากแพทเทินเดิมไซส์ XL) \n ลึกคอ ใช้แพทเทิร์นเดิม";
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_62ec94c12c189/ตัวอย่าง_แขนกุด+เฟล็ก_ผ้ากุ๊นตามสีตัวเสื้อ.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_627a0f6e11a4b/เสื้อเฟล็กไซส์หลังคอ หน้าดราฟ-03.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_627a0f6e14ba3/เสื้อเฟล็กไซส์หลังคอ หน้าดราฟ-04.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_627a0f6e3559e/เสื้อเฟล็กไซส์หลังคอ (ตารางสีผ้า)-01.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_62eb3aa27e93e/แขนกุด512.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6285f765948dc/1 inch.png",
        imgsize: "100",
      },
    ];
  }

  if (type == "เสื้อคอกลม Cuddly") {
    var title_alert = "เสื้อคอกลม Cuddly";
    newdata.exam_and_order = null;
    newdata.data[3].brand = "ZUTTO";
    newdata.data[3].pack_style = "ถุง ZUTTO (แปะสติกเกอร์มุมขวาด้านล่าง)";
    newdata.data[0].size_label = "ป้าย ZUTTO";
    newdata.shirt_size_type[0].name = "มาตรฐาน ZUTTO";
    newdata.shirt_size_type[0].info = [
      {
        name: "S",
        width_chest: 41,
        long_shirt: 27,
      },
      {
        name: "M",
        width_chest: 43,
        long_shirt: 28,
      },
      {
        name: "L",
        width_chest: 45,
        long_shirt: 30,
      },
      {
        name: "XL",
        width_chest: 47,
        long_shirt: 31,
      },
      {
        name: "2XL",
        width_chest: 49,
        long_shirt: 31,
      },
      {
        name: "3XL",
        width_chest: 51,
        long_shirt: 32,
      },
      {
        name: "4XL",
        width_chest: 53,
        long_shirt: 33,
      },
      {
        name: "5XL",
        width_chest: 55,
        long_shirt: 33,
      },
      {
        name: "6XL",
        width_chest: 57,
        long_shirt: 33,
      },
      {
        name: "7XL",
        width_chest: 59,
        long_shirt: 33,
      },
      {
        name: "8XL",
        width_chest: 61,
        long_shirt: 33,
      },
      {
        name: "EXTRA",
        width_chest: 63,
        long_shirt: 33,
      },
    ];
    newdata.shirt_size_type[0].note =
      "ไซส์ s - 3xl ใส่ป้าย zutto \n ไซส์ 4xl ขึ้นไปใส่ป้าย extra บวกป้ายไซส์";
    newdata.data[0].sleeve = "แขนสั้นปล่อย";
    newdata.data[0].style =
      "ริบคอสูง 1.7 CM ผ้าในตัวสีตามตัวเสื้อ ลาลูกโซ่ คิ้วคอหน้า ลาคู่ใหญ่";
    newdata.data[0].color = "ดำ";
    newdata.data[0].collar = "คอกลม";
    newdata.data[0].fabric = "supersoft";
    newdata.data[0].example = "ไม่ต้อง";
    newdata.data[0].size_label_img_show = false;
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_62ec970665844/295801744_721568075600576_707475033060698594_n.jpg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6285f7b227823/1 inch.png",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_62ea499ae33f3/295476958_5654400631269968_2577210320163694745_n.jpg",
        imgsize: "100",
      },
    ];
  }

  if (type == "เสื้อโปโล Drytech") {
    var title_alert = "เสื้อโปโล Drytech";
    newdata.exam_and_order = null;
    newdata.type = "เสื้อโปโล";
    newdata.data[3].brand = "ZUTTO";
    newdata.data[3].pack_style = "ถุง ZUTTO (แปะสติกเกอร์มุมขวาด้านล่าง)";
    newdata.data[0].size_label = "ป้าย ZUTTO";
    newdata.shirt_size_type[0].name = "มาตรฐาน ZUTTO";
    newdata.shirt_size_type[0].info = [
      {
        name: "S",
        width_chest: 41,
        long_shirt: 27,
      },
      {
        name: "M",
        width_chest: 43,
        long_shirt: 28,
      },
      {
        name: "L",
        width_chest: 45,
        long_shirt: 30,
      },
      {
        name: "XL",
        width_chest: 47,
        long_shirt: 31,
      },
      {
        name: "2XL",
        width_chest: 49,
        long_shirt: 31,
      },
      {
        name: "3XL",
        width_chest: 51,
        long_shirt: 32,
      },
      {
        name: "4XL",
        width_chest: 53,
        long_shirt: 33,
      },
      {
        name: "5XL",
        width_chest: 55,
        long_shirt: 33,
      },
      {
        name: "6XL",
        width_chest: 57,
        long_shirt: 33,
      },
      {
        name: "7XL",
        width_chest: 59,
        long_shirt: 33,
      },
      {
        name: "8XL",
        width_chest: 61,
        long_shirt: 33,
      },
      {
        name: "EXTRA",
        width_chest: 63,
        long_shirt: 33,
      },
    ];
    newdata.shirt_size_type[0].note =
      "ไซส์ s - 3xl ใส่ป้าย zutto \n ไซส์ 4xl ขึ้นไปใส่ป้าย extra บวกป้ายไซส์";
    newdata.data[0].sleeve = "แขนสั้นปล่อย";
    newdata.data[0].style =
      "เสื้อโปโล ZUTTO แขนสั้น ปกทอสีตามตัวเสื้อ กุ้นคอผ้าในตัว สาปปกติ กระดุม 2 เม็ด";
    newdata.data[0].color = "สีขาว, สีเทา";
    newdata.data[0].collar = "ปกโปโล drytech";
    newdata.data[0].fabric = "DRYTECH";
    newdata.data[0].example = "ไม่ต้อง";
    newdata.data[0].placket = "สีเดียวกับเสื้อ";
    newdata.data[0].placket_style = "ใช้ผ้าตามตัวเสื้อ";
    newdata.data[0].placket_width = "ความกว้างสาปโปโล 3.5 ซม ทุกไซส์";
    newdata.data[0].placket_length =
      "ความยาวสาปโปโล 6 นิ้วไม่รวมตีตารางสาป ทุกไซส์";
    newdata.data[0].pocket = "ไม่มี";
    newdata.data[0].button = "2";
    newdata.data[0].button_color = "สีเดียวกับตัวเสื้อ";
    newdata.data[0].moreinfo =
      "เพิ่มความยาวรอบคอ (กว้างคอ) เป็น 20 inch (ปรับจากแพทเทินเดิมไซส์ XL)";
    newdata.data[0].size_label_img_show = false;
    newdata.person_name = "karntarat";
    newdata.tel = "066-114-1398";
    newdata.address = "โรงงานสมศรี";
    newdata.sale_name = "Karntarat";
    newdata.data[3].customer_type = "old";
    newdata.img = [
      {
        img: "https://backend.somsritshirt.com/files/file_62a828f3d7d6b/AA261015-450C-4D44-A478-808970AD8DCC.jpeg",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_62e76e5cc9803/Screenshot (29).png",
        imgsize: "100",
      },
      {
        img: "https://backend.somsritshirt.com/files/file_6285f7f4c9caa/1 inch.png",
        imgsize: "100",
      },
    ];
  }

  return newdata;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function formatDate(date) {
  //SEND PLAIN TEXT DATE
  let dateObj = new Date(date);
  return new Intl.DateTimeFormat("th-TH").format(dateObj);
}

function formatLongDate(date) {
  if (date == null) {
    return "-";
  }
  let dateObj = new Date(date);
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("th-TH", options).format(dateObj);
}

function deposit_bg_class(row) {
  let status = this.calcurrentstatus_deposit(row);

  if (row.paid_type == "ชำระทั้งหมด") {
    switch (status) {
      case "รอชำระเงิน":
        return "btn-danger";
      case "ชำระเงินแล้ว":
        return "btn-success-teal";
    }
  } else if (row.paid_type == "มัดจำ") {
    switch (status) {
      case "รอมัดจำ":
        return "btn-danger";
      case "มัดจำแล้ว":
        return "btn-warning";
      case "ชำระเงินแล้ว":
        return "btn-success-teal";
    }
  }

  return "btn-secondary";
}

function calcurrentstatus_deposit(data) {
  let curr = calcurrentstatusi(data, [
    "deposit_step_list",
    "deposit_step_data",
  ]);
  if (!data.deposit_step_list.length || data.deposit_step_list.length == 0)
    return "ยังไม่ได้กำหนด";
  if (curr == -1) {
    return (
      data.deposit_step_list[data.deposit_step_list.length - 1][1] + "แล้ว"
    ).trim();
  }
  if (curr == 0) {
    return ("รอ" + data.deposit_step_list[curr][1]).trim();
  } else {
    return (data.deposit_step_list[curr - 1][1] + "แล้ว").trim();
  }
}

function calculateDepositTextColor(data) {
  let status = calcurrentstatus_deposit(data);
  if (status == "ชำระเงินแล้ว") {
    return "text-success";
  }

  if (status == "มัดจำแล้ว") {
    return "text-warning";
  }

  return "text-danger";
}

function calcurrentstatusi(data, cols) {
  let step_list = "step_list";
  let step_data = "step_data";

  //ASSIGN STEP_LIST AND STEP_DATA IF IT SEND
  if (Array.isArray(cols)) {
    step_list = cols[0];
    step_data = cols[1];
  } else if (cols) {
    throw "cols มันต้องเป็นแบบ ['step_list','step_data']";
  }

  let curr = -1;
  let steps = data[step_list];
  for (let i = 0; i < steps.length; i++) {
    if (!(data[step_data][steps[i][0]] && data[step_data][steps[i][0]].done)) {
      curr = i;
      break;
    }
  }
  return curr;
}

function calcurrentstatus(data) {
  let curr = calcurrentstatusi(data);
  try {
    if (curr == -1) {
      return (data.step_list[data.step_list.length - 1][1] + "แล้ว").trim();
    }
  } catch (err) {
    console.log(err);
    console.log(data.id);
  }

  return ("รอ" + data.step_list[curr][1]).trim();
}

function fix_missing_fields(quot) {
  if (quot.cost == null) {
    quot.cost = {
      lists: [],
      total_price: [
        {
          ผ้า: 0,
        },
      ],
      material_price: 0,
      wage: {
        in: {
          lists: [],
          total_price: {
            price_per_unit: 0,
            amount: 0,
            price: 0,
          },
        },
        out: {
          lists: [],
          total_price: {
            price_per_unit: 0,
            amount: 0,
            price: 0,
          },
        },
      },
      basic: {
        amount: 0,
        sell_price: 0,
        discount: 0,
        get_delivery_fee: 0,
        sell_price_sum_delivery_fee: 0,
        sell_price_per_amount: 0,
      },
      total_cost: {
        tbl1: {
          freight_profit: 0,
          total_cost: 0,
          sell_price_sum_delivery_fee: 0,
          gross_profit: 0,
          percent: 0,
        },
        tbl2: {
          wage_price: 0,
          wage_percent: 0,
          material_percent: 0,
          total_price: 0,
          total_percent: 0,
        },
      },
      cost_per_one: 0,
      delivery: {
        lists: [],
        total_price: 0,
      },
    };
  }

  //CHECK COST (HOTFIX)
  if (!quot.cost.hasOwnProperty("basic")) {
    quot.cost.basic = {
      amount: 0,
      sell_price: 0,
      discount: 0,
      get_delivery_fee: 0,
      sell_price_sum_delivery_fee: 0,
      sell_price_per_amount: 0,
    };
  }

  if (!quot.cost.hasOwnProperty("total_cost")) {
    quot.cost.total_cost = {
      tbl1: {
        freight_profit: 0,
        total_cost: 0,
        sell_price_sum_delivery_fee: 0,
        gross_profit: 0,
        percent: 0,
      },
      tbl2: {
        wage_price: 0,
        wage_percent: 0,
        material_percent: 0,
        total_price: 0,
        total_percent: 0,
      },
    };
  } else {
    if (!quot.cost.total_cost.hasOwnProperty("tbl1")) {
      quot.cost.total_cost.tbl1 = {
        freight_profit: 0,
        total_cost: 0,
        sell_price_sum_delivery_fee: 0,
        gross_profit: 0,
        percent: 0,
      };
    }
    if (!quot.cost.total_cost.hasOwnProperty("tbl2")) {
      quot.cost.total_cost.tbl2 = {
        wage_price: 0,
        wage_percent: 0,
        material_percent: 0,
        total_price: 0,
        total_percent: 0,
      };
    }
  }

  if (typeof quot.data[0].size_label_img_show === "undefined") {
    quot.data[0].size_label_img_show = false;
    quot.data[0].size_label_img =
      "https://somsritshirt.com/img/quotation/somsrisizelabel.jpg";
    quot.data[0].size_label_imgsize = 75;
  }

  if (typeof quot.data[4] === "undefined") {
    quot.data.push({
      enable: false,
      problem: [
        {
          title: "ปัญหาที่ 1",
          picrow: [
            {
              img: "",
              imgsize: 75,
            },
          ],
          problem_note: "",
        },
      ],
    });
  }

  if (
    typeof quot.data[3].deposit_img === "undefined" ||
    typeof quot.data[3].deposit_img === "string" ||
    quot.data[3].deposit_img == null
  ) {
    quot.data[3].deposit_img = [];
    quot.data[3].deposit_img.push({
      img: "",
      date: "",
      amount: 0,
      account: "",
    });
  }

  for (let i = 0; i < quot.data[3].deposit_img.length; i++) {
    if (!quot.data[3].deposit_img[i].hasOwnProperty("account")) {
      quot.data[3].deposit_img[i].account = "";
    }
  }

  if (
    typeof quot.data[3].paid_img === "undefined" ||
    typeof quot.data[3].paid_img === "string" ||
    quot.data[3].paid_img == null
  ) {
    quot.data[3].paid_img = [];
    quot.data[3].paid_img.push({
      img: "",
      date: "",
      amount: 0,
      account: "",
    });
  }

  for (let i = 0; i < quot.data[3].paid_img.length; i++) {
    if (!quot.data[3].paid_img[i].hasOwnProperty("account")) {
      quot.data[3].paid_img[i].account = "";
    }
  }

  if (
    typeof quot.data[3].delivery_fee === "undefined" ||
    quot.data[3].delivery_fee == null ||
    quot.data[3].delivery_fee == "" ||
    isNaN(quot.data[3].delivery_fee)
  ) {
    quot.data[3].delivery_fee = 0;
  }

  if (typeof quot.data[3].shift_count === "undefined") {
    quot.data[3].shift_count = 0;
  }

  if (
    typeof quot.data[3].customer_type === "undefined" ||
    typeof quot.data[3].brand === "undefined"
  ) {
    quot.data[3].customer_type = "";
    quot.data[3].brand = "";
  }

  //CONVERT AMOUNTLISTDEEP TO OBJECT DATA TYPE
  if (Array.isArray(quot.amountlistdeep)) {
    let newAmountlistDeep = {};
    let titlelist = quot.amountlistmetadata.titlelist;

    for (let picrow in titlelist) {
      //CHECK PICROW NOT NULL ARRAY
      if (titlelist[picrow].length != 0) {
        let groupName = titlelist[picrow][0];
        newAmountlistDeep[groupName] = {};
        quot.amountlistmetadata.sizelist[groupName] = [];
      } else {
        let groupName = "";
        newAmountlistDeep[groupName] = {};
        quot.amountlistmetadata.sizelist[groupName] = [];
      }
    }
    quot.amountlistdeep = newAmountlistDeep;
  }

  //CHECK INNER AMOUNTLISTDEEP IS NOT ARRAY
  for (let group in quot.amountlistdeep) {
    if (
      Array.isArray(quot.amountlistdeep[group]) &&
      quot.amountlistdeep[group].length == 0
    ) {
      quot.amountlistdeep[group] = {};
    }
  }

  if (quot.shirt_size_type == null) {
    quot.shirt_size_type = [];
  }

  //CHECK STEP LIST IS EMPTY
  if (quot.step_list.length == 0) {
    quot.step_list = approve_step;
  }

  //CHECK STEP LIST IS MATCH STEP DATA
  for (let step of quot.step_list) {
    let stepID = step[0];
    if (!quot.step_data.hasOwnProperty(stepID)) {
      quot.step_data[stepID] = {};
    }
  }

  //MIGRATE NEW DATA STRUCTURE FOR SCREEN AND PIN POINT
  if (quot.data[5] == null) {
    quot.data[5] = {
      more_screenpoint: [],
      more_pinpoint: [],
    };

    //ASSIGN OLD PINPOINT DATA IF IT ENABLE
    if (quot.data[1].enable) {
      quot.data[5].more_screenpoint.push({
        file: quot.data[1].file || "",
        size: quot.data[1].size || "",
        type: quot.data[1].type || "",
        color: quot.data[1].color || "",
        distance: quot.data[1].distance || "",
        position: quot.data[1].position || "",
        _distance: quot.data[1]._distance || "",
        _distance_suffix: quot.data[1]._distance_suffix || "",
      });
    }

    //ASSIGN OLD PINPOINT DATA IF IT ENABLE
    if (quot.data[2].enable) {
      quot.data[5].more_pinpoint.push({
        file: quot.data[2].file || "",
        price: quot.data[2].price || "",
        _distance: quot.data[2]._distance || "",
        _distance_suffix: quot.data[2]._distance_suffix || "",
        position: quot.data[2].position || "",
        size: quot.data[2].size || "",
        size_suffix: quot.data[2].size_suffix || "",
        puk_note: quot.data[2].puk_note || "",
        maicolor: quot.data[2].maicolor || "",
      });
    }
  }

  //IF EXAM & ORDER IS NULL
  if (quot.exam_and_order == null) {
    quot.exam_and_order = {
      is_zutto: 0,
      is_exam: 0,
      is_order: false,
      is_ordered: 0,
      is_approved: 0,
      fabric_receive_exam: false,
      fabric_receive_order: false,
      current_status_exam: "",
      current_status_order: "",
      step_list: [
        ["approved", "อนุมัติใบสเปค"],
        ["pr", "เขียน P.R."],
        ["fabric_ordered", "สั่งผ้า"],
        ["fabric_received", "รับผ้า"],
        ["cutted", "ตัด"],
        ["screened", "สกรีน"],
        ["sewed", "เย็บ"],
        ["qc", "QC"],
        ["exam_photo", "ถ่ายรูปงานตัวอย่าง"],
        ["delivered", "จัดส่ง"],
        ["exam_approved", "อนุมัติตัวอย่าง"],
      ],
      step_data: {
        approved: {},
        pr: {},
        fabric_ordered: {},
        fabric_received: {},
        cutted: {},
        screened: {},
        sewed: {},
        qc: {},
        exam_photo: {},
        delivered: {},
        exam_approved: {},
      },
      reject: [],
    };

    //REMOVE SIZELIST SIZE
    for (let picrow in quot.amountlistmetadata.titlelist) {
      if (picrow == "") {
        continue;
      }

      let groupName = quot.amountlistmetadata.titlelist[picrow][0] || "";

      for (let size of quot.amountlistmetadata.sizelist[groupName]) {
        if (!quot.amountlistdeep.hasOwnProperty(groupName)) {
          quot.amountlistdeep[groupName] = {};
          quot.amountlistmetadata.sizelist[groupName] = [];
        }
      }
    }
  }

  //FIX STEP DATA IN EXAM & ORDER IS STRING
  let examOrderStepData = quot.exam_and_order.step_data;
  for (let step in examOrderStepData) {
    if (typeof examOrderStepData[step] == "string") {
      examOrderStepData[step] = {};
    }
  }

  //CHECK SAMPLE IMG
  if (!quot.data[0].hasOwnProperty("sample_img")) {
    quot.data[0].sample_img = [];
  }
}

async function checkFileFinish(fileFinishCount, fileCount) {
  if (fileFinishCount == fileCount) {
    await doFinal();
  } else {
    alert(
      "กรุณากรอก วิธีการชำระเงิน, จำนวนเงิน, กำหนดงานเสร็จสิ้น และ วันส่งสินค้า ให้ครบด้วย"
    );
  }
}

function decreaseProduceDay(overDay, maxProduceDay) {
  let produceDay = {};
  if (maxProduceDay == 30) {
    produceDay = {
      delivered: 2,
      packed: 2,
      qc: 2,
      fabric_sewed: 4,
      qc_screen: 2,
      fabric_screened: 2,
      qc_cut: 2,
      sample_produced: 2,
      screen_sample: 4,
      film_printed: 2,
      fabric_cutted: 2,
      fabric_received: 2,
      fabric_ordered: 2,
    };
  } else {
    produceDay = {
      delivered: 2,
      packed: 3,
      qc: 3,
      fabric_sewed: 6,
      qc_screen: 3,
      fabric_screened: 7,
      qc_cut: 3,
      sample_produced: 2,
      screen_sample: 5,
      film_printed: 2,
      fabric_cutted: 3,
      fabric_received: 2,
      fabric_ordered: 3,
    };
  }

  if (overDay > 0) {
    for (let i = 1; i <= overDay; i++) {
      switch (i) {
        case 1:
          produceDay.fabric_ordered--;
          break;
        case 2:
          produceDay.fabric_received--;
          break;
        case 3:
          produceDay.delivered--;
          break;
        case 4:
          produceDay.fabric_cutted--;
          break;
        case 5:
          produceDay.packed--;
          break;
        case 6:
          produceDay.qc_cut--;
          break;
        case 7:
          produceDay.qc--;
          break;
        case 8:
        case 10:
        case 12:
        case 14:
          produceDay.fabric_sewed--;
          break;
        case 9:
        case 11:
        case 13:
        case 15:
          produceDay.screen_sample--;
          break;
      }
    }
  }
  return produceDay;
}

async function assignDueDate(data) {
  //GET PRODUCE DAY
  let produceTimeAmount =
    new Date(data.due).getTime() - new Date(data.created_at).getTime();
  let produceDay = Math.trunc(produceTimeAmount / (1000 * 3600 * 24) + 1);

  //GET SHIRT AMOUNT
  let shirtAmount = 0;
  for (let group in data.amountlistdeep) {
    for (let size in data.amountlistdeep[group]) {
      shirtAmount += parseInt(data.amountlistdeep[group][size].amount);
    }
  }

  //GET MAX PRODUCE DAY
  let maxProduceDay = 0;
  if (shirtAmount <= 5000) {
    maxProduceDay = 30;
  } else {
    maxProduceDay = 45;
  }

  //CHECK IS URGENT WORK AND DECREASE PRODUCE DAY
  let stepProduceDay = {};
  if (data.data[0].is_express) {
    let overDay = produceDay - maxProduceDay;
    stepProduceDay = decreaseProduceDay(overDay, maxProduceDay);
  } else {
    stepProduceDay = decreaseProduceDay(0, maxProduceDay);
  }

  //ASSIGN STEP DUE DATE
  let loopIndex = 0;
  let stepData = data.step_data;

  for (let step in stepProduceDay) {
    //DELETE STEP THAT NOT FOUND IN STEP DATA
    if (!stepData.hasOwnProperty(step)) {
      delete stepProduceDay[step];
      continue;
    }

    //CONVERT DATA TYPE TO OBJECT
    if (Array.isArray(stepData[step])) {
      stepData[step] = {};
    }
    if (
      !stepData[step].hasOwnProperty("due") &&
      !stepData[step].hasOwnProperty("due_by")
    ) {
      let date = null;
      if (step == "delivered") {
        date = new Date(data.due);
      } else {
        let key = Object.keys(stepProduceDay)[loopIndex - 1]; //GET PREVIOUS STEP DATE
        date = new Date(stepData[key].due);
        date.setDate(date.getDate() - stepProduceDay[step]); //MINUS DATE
      }
      stepData[step].due = date.toISOString().split("T")[0]; //NORMALIZE DATA

      //ASSIGN
      stepData[step].due_by = "SOMSRI BACKEND";
      loopIndex++;
    }
  }
  try {
    let updateData = await axios.put(
      "/api/quotation/" + data.id + "/col/step_data/update",
      data.step_data
    );
    if (updateData.data.status == "success") {
      console.log("STEP DATA UPDATED.");
    } else {
      console.log(updateData.data);
    }
  } catch {
    console.log("UNABLE UPDATE STEP DATA.");
  }
}

function countamount_fixpicrow(data) {
  // clean deleted picrow
  for (let title in data.amountlistmetadata.titlelist) {
    if (title.startsWith("picrow")) {
      if (parseInt(title.substr(6)) > data.data[0].picrow.length) {
        delete data.amountlistmetadata.titlelist[title];
      }
    }
  }
}

function countamount_fixtitle(arr, titlelist) {
  let titles = {};

  for (let title of titlelist) {
    titles[title] = true;
  }

  for (let key in arr) {
    if (!(key in titles)) {
      delete arr[key];
    }
  }
}

function countamount(data) {
  if (data.amountlistmetadata) {
    countamount_fixpicrow(data);

    let amount_titlelist = [];
    for (let key in data.amountlistmetadata.titlelist) {
      for (let title of data.amountlistmetadata.titlelist[key]) {
        amount_titlelist.push(title);
      }
    }
    countamount_fixtitle(data.amountlistdeep, amount_titlelist);

    try {
      if (data.use_perfect_countamount) {
        if (data.data[0].enable) {
          //render amount list
          var amountlist = {};

          for (var title in data.amountlistdeep) {
            for (var size in data.amountlistdeep[title]) {
              if (!data.amountlistdeep[title]) data.amountlistdeep[title] = {};
              if (!data.amountlistdeep[title][size]) {
                data.amountlistdeep[title][size] = {
                  amount: 0,
                  order: 999,
                };
              }
              if (!amountlist[size])
                amountlist[size] = {
                  amount: 0,
                  order: 0,
                };
              amountlist[size].amount +=
                parseFloat(data.amountlistdeep[title][size].amount) || 0;
              amountlist[size].order = data.amountlistdeep[title][size].order;
            }
          }

          data.amountlist = amountlist;

          //render size text
          var sizetext = data.sizenote.___prefix
            ? data.sizenote.___prefix.trim() + "\n\n"
            : "";
          for (var title of data.sizeinfo.___titlelist) {
            sizetext += title + "\n";
            for (var size of data.sizeinfo.___sizelist) {
              if (!data.sizeinfo[title]) data.sizeinfo[title] = {};
              if (!data.sizeinfo[title][size]) {
                data.sizeinfo[title][size] = [
                  {
                    label: "กว้างอก",
                    size: 0,
                  },
                  {
                    label: "ยาวเสื้อ",
                    size: 0,
                  },
                ];
              }
              var sizedetail = data.sizeinfo[title][size];
              if (
                parseFloat(sizedetail[0].size) > 0 &&
                parseFloat(sizedetail[1].size) > 0 &&
                !sizedetail.deleted
              ) {
                sizetext +=
                  size +
                  " - " +
                  sizedetail[0].size +
                  '"/' +
                  sizedetail[1].size +
                  '"\n';
              } else if (parseFloat(sizedetail[0].size) > 0) {
                sizetext +=
                  size +
                  " - " +
                  sizedetail[0].label +
                  " " +
                  sizedetail[0].size +
                  '"\n';
              } else if (parseFloat(sizedetail[1].size) > 0) {
                sizetext +=
                  size +
                  " - " +
                  sizedetail[1].label +
                  " " +
                  sizedetail[1].size +
                  '"\n';
              }
            }

            if (data.sizenote[title]) {
              sizetext += "\n" + data.sizenote[title].trim();
            }
            sizetext += "\n";
          }

          if (data.sizenote.___suffix) {
            sizetext += "\n" + data.sizenote.___suffix.trim();
          }

          sizetext = sizetext.trim();
          data.data[0].size = sizetext;

          //render amount text
          var amounttext = data.amountlistnote.___prefix
            ? data.amountlistnote.___prefix.trim() + "\n\n"
            : "";
          for (var title of data.amountlistmetadata.titlelist[""]) {
            if (data.amountlistmetadata.sizelist[title]) {
              if (!data.amountlistdeep[title]) data.amountlistdeep[title] = {};
              if (!data.amountlistdeep[title][size]) {
                data.amountlistdeep[title][size] = {
                  amount: 0,
                };
              }
              amounttext += title;
              if (
                amounttext.indexOf("จำนวน") == -1 &&
                amounttext.indexOf("ทั้งหมด") == -1 &&
                amounttext.indexOf("รวม") == -1
              ) {
                amounttext += " จำนวน $$$AMOUNT$$$ ตัว\n";
              } else {
                amounttext += "\n";
              }
              var amountsum = 0;

              for (var size of data.amountlistmetadata.sizelist[title]) {
                var detail = data.amountlistdeep[title][size];
                if (!detail)
                  detail = data.amountlistdeep[title][size] = {
                    amount: 0,
                  };
                if (parseFloat(detail.amount) > 0) {
                  amounttext += size + " = " + detail.amount + "\n";
                  amountsum += parseFloat(detail.amount);
                }
              }
              amounttext = amounttext.replace("$$$AMOUNT$$$", amountsum);

              if (data.amountlistnote[title]) {
                amounttext += "\n" + data.amountlistnote[title].trim();
              }
              amounttext += "\n";
            }
          }

          if (data.amountlistnote.___suffix) {
            amounttext += "\n" + data.amountlistnote.___suffix.trim();
          }

          amounttext = amounttext.trim();
          data.data[0].amount = amounttext;

          //render picrow text
          for (
            var picrowi = 0;
            picrowi < data.data[0].picrow.length;
            picrowi++
          ) {
            var amounttext = data.amountlistnote[
              "___picrow" + picrowi + "___prefix"
            ]
              ? data.amountlistnote[
                "___picrow" + picrowi + "___prefix"
              ].trim() + "\n\n"
              : "";
            for (var title of data.amountlistmetadata.titlelist[
              "picrow" + picrowi
            ]) {
              if (data.amountlistmetadata.sizelist[title]) {
                if (!data.amountlistdeep[title])
                  data.amountlistdeep[title] = {};
                if (!data.amountlistdeep[title][size]) {
                  data.amountlistdeep[title][size] = {
                    amount: 0,
                  };
                }
                amounttext += title + " จำนวน $$$AMOUNT$$$ ตัว\n";
                var amountsum = 0;

                if (data.amountlistmetadata.sizelist[title]) {
                  for (var size of data.amountlistmetadata.sizelist[title]) {
                    var detail = data.amountlistdeep[title][size];
                    if (!detail)
                      detail = data.amountlistdeep[title][size] = {
                        amount: 0,
                      };
                    if (parseFloat(detail.amount) > 0) {
                      amounttext += size + " = " + detail.amount + "\n";
                      amountsum += parseFloat(detail.amount);
                    }
                  }
                } else {
                  data.amountlistmetadata.sizelist[title] = {};
                }
                amounttext = amounttext.replace("$$$AMOUNT$$$", amountsum);

                if (data.amountlistnote[title]) {
                  amounttext += "\n" + data.amountlistnote[title].trim() + "\n";
                }
                amounttext += "\n";
              }
            }

            if (data.amountlistnote["___picrow" + picrowi + "___suffix"]) {
              amounttext +=
                "\n" +
                data.amountlistnote["___picrow" + picrowi + "___suffix"].trim();
            }

            amounttext = amounttext.trim();
            data.data[0].picrow[picrowi].text = amounttext;
          }
        }
      }
    } catch (err) {
      console.log(err, data);
    }

    if (!data.use_perfect_countamount) {
      function remove_final_fragment(txt) {
        fraglist = txt.split(" ");
        fraglist.pop();
        return fraglist.map((x) => x.trim()).join(" ");
      }

      function process_size() {
        //countamount_fixtitle(data.sizeinfo, $(".sizeinfo-title"));

        var currtitle = "";

        function resolve(data, sizestr) {
          fraglist = sizestr.split(" ");

          for (var i = 0; i < fraglist.length; i++) {
            fraglist[i] = fraglist[i].trim();
            if (fraglist[i] == "") {
              fraglist.splice(i, 1);
              i--;
            }
          }

          let size = [];
          var sizelabel = "";
          var ok = true; //this variable not include no amount / no label case

          for (var i = fraglist.length - 1; i >= 0; i--) {
            if (!isNaN(parseFloat(fraglist[i]))) {
              size.push(parseFloat(fraglist[i]));
            } else {
              sizelabel = fraglist[i] + " " + sizelabel;
            }
          }

          sizelabel = sizelabel.trim();
          size = size.reverse();

          if (!data.sizeinfo || typeof data.sizeinfo.length != "undefined") {
            data.sizeinfo = {};
          }

          if (ok && size.length > 0 && sizelabel != "") {
            if (!data.sizeinfo[currtitle]) {
              data.sizeinfo[currtitle] = {};
              data.sizeinfo[currtitle].___labellist = [];
            }
            if (!data.sizeinfo[currtitle][sizelabel])
              data.sizeinfo[currtitle][sizelabel] = [];

            data.sizeinfo.___sizelist = data.sizeinfo.___sizelist || [];
            data.sizeinfo.___sizelist.push(sizelabel);

            data.sizeinfo.___titlelist = data.sizeinfo.___titlelist || [];
            data.sizeinfo.___titlelist.push(currtitle);

            if (size.length == 1) {
              data.sizeinfo[currtitle][sizelabel] = [
                {
                  label: "กว้างอก",
                  size: size[0],
                },
              ];
              if (data.sizeinfo[currtitle].___labellist.length < 1) {
                data.sizeinfo[currtitle].___labellist = ["กว้างอก"];
              }
            } else if (size.length == 2) {
              data.sizeinfo[currtitle][sizelabel] = [
                {
                  label: "กว้างอก",
                  size: size[0],
                },
                {
                  label: "ยาวเสื้อ",
                  size: size[1],
                },
              ];
              if (data.sizeinfo[currtitle].___labellist.length < 2) {
                data.sizeinfo[currtitle].___labellist = ["กว้างอก", "ยาวเสื้อ"];
              }
            } else {
              data.sizeinfo[currtitle][sizelabel] = [
                {
                  label: "กว้างอก",
                  size: size[0],
                },
                {
                  label: "ยาวเสื้อ",
                  size: size[1],
                },
              ];
              for (var i = 2; i < size.length; i++) {
                data.sizeinfo[currtitle][sizelabel].push({
                  label: "",
                  size: size[i],
                });
              }
              if (data.sizeinfo[currtitle].___labellist.length < size.length) {
                data.sizeinfo[currtitle].___labellist = ["กว้างอก", "ยาวเสื้อ"];
              }
              while (
                data.sizeinfo[currtitle].___labellist.length < size.length
              ) {
                data.sizeinfo[currtitle].___labellist.push("");
              }
            }
          } else {
            currtitle = sizelabel;
          }

          //console.log(sizelabel,size);
        }

        var allsizetext = data.data[0].size;
        if (!allsizetext) allsizetext = "";
        allsizetext = allsizetext.replaceSpecialChar(" ", "");
        var sizelist = allsizetext.split("\n");
        for (sizetext of sizelist) {
          resolve(data, sizetext);
        }

        data.sizeinfo.___sizelist = _.uniq(data.sizeinfo.___sizelist);
        data.sizeinfo.___titlelist = _.uniq(data.sizeinfo.___titlelist);
      }

      function process(data, allamountstr) {
        var currtitle = "";

        function resolve(data, amountstr) {
          fraglist = amountstr.split(" ");
          //console.log(amountstr);

          for (var i = 0; i < fraglist.length; i++) {
            fraglist[i] = fraglist[i].trim();
            if (fraglist[i] == "") {
              fraglist.splice(i, 1);
              i--;
            }
          }

          var amount = -1;
          var label = "";
          var ok = true; //this variable not include no amount / no label case

          for (var i = fraglist.length - 1; i >= 0; i--) {
            if (amount == -1) {
              if (!isNaN(parseInt(fraglist[i]))) {
                amount = parseInt(fraglist[i]);
              }
            } else {
              label = fraglist[i] + " " + label;
            }
          }

          label = label.trim();

          if (
            label.indexOf("จำนวน") != -1 ||
            label.indexOf("รวม") != -1 ||
            label.indexOf("ทั้งหมด") != -1
          ) {
            ok = false;
          }

          if (ok && amount != -1 && label != "") {
            if (!data.amountlist[label])
              data.amountlist[label] = {
                amount: 0,
              };
            data.amountlist[label].amount += amount;

            if (!data.amountlistdeep) data.amountlistdeep = {};
            if (!data.amountlistdeep[currtitle])
              data.amountlistdeep[currtitle] = {};
            if (!data.amountlistdeep[currtitle][label])
              data.amountlistdeep[currtitle][label] = {
                amount: 0,
              };
            data.amountlistdeep[currtitle][label].amount += amount;
          } else {
            jumnuanpos = amountstr.indexOf("จำนวน");
            //console.log(jumnuanpos);
            if (jumnuanpos != -1) {
              currtitle = amountstr.substr(0, jumnuanpos).trim();
            } else {
              currtitle = amountstr.trim();
            }
          }
        }

        //var allamountstr = data.data[0].amount;
        if (!allamountstr) allamountstr = "";
        allamountstr = allamountstr.replaceSpecialChar(" ", "'\".");
        var amountlist = allamountstr.split("\n");
        for (amountstr of amountlist) {
          resolve(data, amountstr);
        }
      }

      data.sizeinfo = {};

      process_size();

      //for(data of quotdata) {
      data.amountlist = {};
      data.amountlistdeep = {};

      process(data, data.data[0].amount);
      if (typeof data.data[0].picrow == "object") {
        for (picrow of data.data[0].picrow) {
          process(data, picrow.text);
        }
      }

      //now data.amountlist[...].amount constructed, need .order
      var currorder = 0;
      for (var key in data.amountlist) {
        data.amountlist[key].order = currorder++;
      }
      //}
    }

    if (data.amountlistdeep && data.amountlistmetadata) {
      // Fix ghost size has amount = 0
      for (let sizelabel in data.amountlistdeep) {
        if (!data.amountlistmetadata.sizelist[sizelabel]) {
          delete data.amountlistdeep[sizelabel];
          continue;
        }
        for (let size in data.amountlistdeep[sizelabel]) {
          if (data.amountlistmetadata.sizelist[sizelabel].indexOf(size) == -1) {
            if (!parseInt(data.amountlistdeep[sizelabel][size].amount)) {
              //console.log(sizelabel, size, data.amountlistmetadata.sizelist[sizelabel].indexOf(size), parseInt(data.amountlistdeep[sizelabel][size].amount));
              delete data.amountlistdeep[sizelabel][size];
              //console.log(data.amountlistdeep[sizelabel]);
            } else {
              // Add something to amountlistmetadata.sizelist (Maybe bug)
              amountlistmetadata.sizelist[sizelabel].push(size);
            }
          }
        }
      }
    }
  }
}

async function doFinal(data, hasUpdate = false, showAlert = true) {
  let approved = data.step_data.approved && data.step_data.approved.done;
  let approved_sample =
    data.step_data.approved_sample && data.step_data.approved_sample.done;

  //CHANGE UPDATE DATE AND UPDATE BY
  data.updated_at = new Date();
  data.updated_by = auth_email;
  countamount(data);

  // UPDATE FINISH AND DUE IF USE AFTER APPROVAL, NOT APPROVED
  if (data.data[0].due_sample_after_approval && !approved_sample) {
    data.due_sample = new Date().addDays(
      parseInt(data.data[0].due_sample_after_approval)
    );
  }
  if (data.data[0].finish__use_after_approval && !approved) {
    data.finish = new Date().addDays(
      parseInt(data.data[0].finish_after_approval)
    );
  }
  if (data.data[0].due__use_after_approval && !approved) {
    data.due = new Date().addDays(parseInt(data.data[0].due_after_approval));
  }

  // UPDATE FINISH AND DUE IF USE AFTER APPROVAL, APPROVED
  if (data.data[0].due_sample_after_approval && approved_sample) {
    data.due_sample = new Date(data.step_data.approved_sample.at).addDays(
      parseInt(data.data[0].due_sample_after_approval)
    );
  }
  if (data.data[0].finish__use_after_approval && approved) {
    data.finish = new Date(data.step_data.approved.at).addDays(
      parseInt(data.data[0].finish_after_approval)
    );
  }
  if (data.data[0].due__use_after_approval && approved) {
    data.due = new Date(data.step_data.approved.at).addDays(
      parseInt(data.data[0].due_after_approval)
    );
  }

  // IF is_express THEN delete due_sample and sample status
  if (data.data[0].is_express) {
    data.due_sample = null;

    let has_edit_step_list = false;

    while (
      data.step_list[0][0] == "approved_spec" ||
      data.step_list[0][0] == "sample_produced"
    ) {
      data.step_list.shift();
      has_edit_step_list = true;
    }

    // Save step_list
    // if (has_edit_step_list) {
    //     try {
    //         await db.collection("quotation").doc(quotdata[curr].id).set({
    //             step_list: quotdata[curr].step_list
    //         })
    //     } catch (err) {
    //         console.error(err)
    //         alert("เกิดข้อผิดพลาดในการ Update step_list งานด่วน")
    //     }
    // }
  }

  //AUTO DUE DATE
  assignDueDate(data);

  //UPDATE SIZE IN DATA[0].SIZE FROM shirt_size_type
  if (data.shirt_size_type != null) {
    let sizeTemp = "";
    for (let group of data.shirt_size_type) {
      sizeTemp += group.name + "\n"; //ADD SIZE TYPE
      for (let size of group.info) {
        //ADD SIZE INFO
        sizeTemp +=
          size.name + " - " + size.width_chest + '"/' + size.long_shirt + '"\n';
      }
    }
    data.data[0].size = sizeTemp;
  }

  // ========= DO NOT PUT AUTO UPDATE CODE BELOW HERE =========
  let setdata = _.cloneDeep(data);
  // delete setdata.step_data;
  // delete setdata.step_list;

  // CALLULATE VAT 7 % (ADVANCE DEPOSIT)
  if (data.paid_type_internal == 'Advance') {
    var vat7percent = (setdata.total_value * 0.07).toFixed(2)
    setdata.data[0].vat = parseFloat(setdata.total_value) + parseFloat(vat7percent)
  }

  _.merge(setdata.data[3], {
    name: data.name,
    person_name: data.person_name,
    type: data.type,
    convenient_time: data.convenient_time,
    deposit_img: data.data.deposit_img,
    paid_img: data.paid_img,
    shift_count: data.shift_count,
    customer_type: data.customer_type,
    brand: data.brand,
  });

  db.collection("quotation")
    .doc(data.id)
    .set(setdata)
    .then(async () => {
      if (hasUpdate) {
        alert("อัพเดท version เรียบร้อย ระบบจะทำการ reload หน้าเว็บ");
        location.reload();
      }
      if (showAlert) {
        generateToast("อัปเดทข้อมูลเรียบร้อยแล้ว", "success-teal");
      }
    })
    .catch((err) => {
      generateToast("เกิดข้อผิดพลาดระหว่างอัปเดทข้อมูล", "danger");
      console.log("Final Step Error");
      console.log(err);
    });
}

function uploadimg(filename, imgfile) {
  return new Promise(function (resolve, reject) {
    //var imgref = storageRef.child("quotation/im");
    let formData = new FormData();
    formData.append("image", imgfile);
    if (imgfile.type == "image/jpeg") {
      axios
        .post("/api/imageupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status == "success") {
            resolve(res.data.url);
          } else {
            reject(res.data.message);
          }
        })
        .catch(reject);
    } else if (imgfile.type == "image/png") {
      axios
        .post("/api/imageupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status == "success") {
            resolve(res.data.url);
          } else {
            reject(res.data.message);
          }
        })
        .catch(reject);
    } else {
      //alert("Image Error : "+imgfile.type+" Not supported");
      reject("Image Error : " + imgfile.type + " Not supported");
    }
  });
}

function isUniqueId(id, quotdata) {
  for (let data of quotdata) {
    if (id == data.id) {
      return data;
    }
  }
  return false;
}

function doapprove_wrapper(data, field) {
  step_outsource_init(data, field);
}

function step_outsource_init(data, field) {
  let i = 0;
  for (i = 0; i < data.step_list.length; i++) {
    if (data.step_list[i][0] == field) break;
  }
  //i++; //if remove this comment all state from now will run on next status.
  if (i < data.step_list.length) {
    field = data.step_list[i][0];
  } else {
    doapprove_wrapper_after_choose_outsource(data, field);
    return;
  }

  vm_status.step_outsource_field_i = i;
  $("#edit-step-outsource-modal .modal-title").text(
    data.step_list[vm_status.step_outsource_field_i][1]
  );
  $("#edit-step-outsource-modal").modal("show");
}

function submit_step_outsource() {
  let outsource = $("#edit-step-outsource-yes").prop("checked");
  let quotdata = vm_status.quotdata;
  step_outsource_field_i = vm_status.step_outsource_field_i;

  if (outsource && quotdata.step_list[step_outsource_field_i][1]) {
    if (!quotdata.step_list[step_outsource_field_i][1].endsWith("(ภายนอก)")) {
      quotdata.step_list[step_outsource_field_i][1] += " (ภายนอก)";
    }
  }

  doapprove_wrapper_after_choose_outsource(
    quotdata,
    quotdata.step_list[step_outsource_field_i][0]
  );
}

function doapprove_wrapper_after_choose_outsource(data, field) {
  doapprove_wrapper_byval(data, field);
}

function doapprove_byval(val, field, whichcols, whichtable) {
  let step_list = "step_list";
  let step_data = "step_data";
  let setdata = _.cloneDeep(val.exam_and_order);

  if (Array.isArray(whichcols)) {
    step_list = whichcols[0];
    step_data = whichcols[1];
  } else if (whichcols) {
    whichtable = whichcols;
  }

  if (!whichtable) whichtable = "quotation";
  if (!field) field = "approved";
  if (Array.isArray(val[step_data][field])) val[step_data][field] = {};
  if (!val[step_data][field]) val[step_data][field] = {};
  val[step_data][field].done = !val[step_data][field].done;
  if (val[step_data][field].done) {
    val[step_data][field].by = auth_email;
    val[step_data][field].at = new Date();
    val[step_data][field].username = auth_username;
    val[step_data][field].ip = auth_ip;
  }

  let step_list2 = val.step_list
  let step_data2 = val.step_data

  let status_done = []
  let status_not_done = []
  let totalStatusSort = []

  for (let i = 0; i < step_list2.length; i++) {
    if (step_data2[step_list2[i][0]].done) {
      status_done.push({ [step_list2[i][0]]: step_data2[step_list2[i][0]], "name": step_list2[i][0] })
    }
    if (step_data2[step_list2[i][0]].done == undefined) {
      status_not_done.push({ [step_list2[i][0]]: step_data2[step_list2[i][0]], "name": step_list2[i][0] })
    }
  }

  if (setdata.order_step_data) {
    _.merge(setdata.order_step_data, status_done.concat(status_not_done))

    for (let i = 0; i < setdata.order_step_data.length; i++) {
      totalStatusSort.push({ "en": setdata.order_step_data[i].name, "th": getOrderSortStepList(setdata.order_step_data[i].name) })
    }
    setdata.order_step_list = totalStatusSort
  } else {
    setdata.order_step_data = status_done.concat(status_not_done)
    if (setdata.order_step_data) {
      for (let l = 0; l < setdata.order_step_data.length; l++) {
        totalStatusSort.push({ "en": setdata.order_step_data[l].name, "th": getSortStepList(setdata.order_step_data[l].name) })
      }
      setdata.order_step_list = totalStatusSort;
    }
  }
  
  db.collection("quotation").doc(val.id).update({
    [step_list]: val[step_list],
    [step_data]: val[step_data],
    ____note:
      field == "approved"
        ? val[step_data][field] && val[step_data][field].done
          ? "อนุมัติ"
          : "ยกเลิกการอนุมัติ"
        : "เปลี่ยนสถานะ",
    exam_and_order: setdata
  })
    .then(function (res) {
      if (res.status == "success") {
        vm_status.quotdata = res.data;
      }
      if (true || (field == "approved" && val[step_data][field].done)) {
        let message =
          (val[step_data][field].done ? "" : "ยกเลิก") +
          val[step_list].find((x) => x[0] == field)[1];
        fetch("/quotation/approve_noti/" + val.id + "?message=" + message)
          .then((notires) => {
            if (notires.status == 200) {
              console.log("Noti Send");
            } else {
              if (notires.status != 500) {
                alert(
                  "เกิดข้อผิดพลาดทางเทคนิค ในระบบการแจ้งเตือน โปรดแคบหน้าจอและติดต่อแจ้งข้อผิดพลาด\n" +
                  JSON.stringify(notires)
                );
              }
            }
          })
          .catch((err) => {
            if (notires.status != 500) {
              alert(
                "เกิดข้อผิดพลาดทางเทคนิค ในระบบการแจ้งเตือน โปรดแคบหน้าจอและติดต่อแจ้งข้อผิดพลาด\n" +
                JSON.stringify(err)
              );
            }
          });
      }
    })
    .catch(function (err) {
      alert("Approve error : " + JSON.stringify(err));
    });
  try {
    mainView.$forceUpdate();
  } catch (err) {
    console.log(err);
  }
}

function doapprove_wrapper_byval(val, field) {
  for (var step of val.step_list) {
    if (step[0] == field) break;
  }

  Swal.fire({
    title: "Are you sure?",
    text:
      "คุณต้องการเปลี่ยนสถานะเป็น " +
      " " +
      (step[1] + "แล้ว").trim() +
      " " +
      " หรือไม่",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#49be25",
    cancelButtonColor: "#9e9e9e",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      doapprove_byval(val, field);
      Swal.fire({
        icon: "success",
        title: "สำเร็จ !",
        text: "สถานะถูกเปลี่ยนแล้ว",
        showConfirmButton: false,
        timer: 1300,
      });
    }
  });
}

function doapprove_wrapper_exam(data, field) {
  step_outsource_init_exam(data, field);
}

function step_outsource_init_exam(val, field) {
  // let step_outsource_i = quotdatai;

  console.log(val.id);
  let i = 0;
  for (i = 0; i < val.exam_and_order.step_list.length; i++) {
    if (val.exam_and_order.step_list[i][0] == field) break;
  }
  //i++; //if remove this comment all state from now will run on next status.
  if (i < val.exam_and_order.step_list.length) {
    field = val.exam_and_order.step_list[i][0];
  } else {
    // doapprove_wrapper_after_choose_outsource_exam(quotdatai, field);
    // return;
  }

  vm_status.step_outsource_field_i = i;

  $("#edit-step-outsource-exam-modal .modal-title").text(
    val.exam_and_order.step_list[vm_status.step_outsource_field_i][1]
  );
  $("#edit-step-outsource-exam-modal").modal("show");
}

function submit_step_outsource_exam() {
  let outsource = $("#edit-step-outsource-exam-yes").prop("checked");
  let step_outsource_field_i = vm_status.step_outsource_field_i;
  let quotdata = vm_status.quotdata;
  if (
    outsource &&
    quotdata.exam_and_order.step_list[step_outsource_field_i][1]
  ) {
    if (
      !quotdata.exam_and_order.step_list[step_outsource_field_i][1].endsWith(
        "(ภายนอก)"
      )
    ) {
      quotdata.exam_and_order.step_list[step_outsource_field_i][1] +=
        " (ภายนอก)";
    }
  }
  // //-----Change and Remove ' (ภายนอก)' if select ภายใน (can change status even it's done)--//
  //   else if ($("#edit-step-outsource-no").prop('checked') && quotdata[step_outsource_i].step_list[step_outsource_field_i][1]){
  //     if (quotdata[step_outsource_i].step_list[step_outsource_field_i][1].endsWith('(ภายนอก)')) {
  //       removeLastWord(quotdata[step_outsource_i].step_list[step_outsource_field_i][1])
  //     }
  //   }
  // //--------------------------------------------------------------------------------------//

  doapprove_wrapper_after_choose_outsource_exam(
    quotdata,
    quotdata.exam_and_order.step_list[step_outsource_field_i][0]
  );
}

function doapprove_wrapper_after_choose_outsource_exam(data, field) {
  doapprove_wrapper_byval_exam(data, field);
}

function doapprove_wrapper_byval_exam(val, field) {
  let step = "";
  for (step of val.exam_and_order.step_list) {
    if (step[0] == field) break;
  }

  Swal.fire({
    title: "Are you sure?",
    text:
      "คุณต้องการเปลี่ยนสถานะเป็น " +
      " " +
      (step[1] + "แล้ว").trim() +
      " " +
      " หรือไม่",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#49be25",
    cancelButtonColor: "#9e9e9e",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      doapprove_byval_exam(val, field);
      Swal.fire({
        icon: "success",
        title: "สำเร็จ !",
        text: "สถานะถูกเปลี่ยนแล้ว",
        showConfirmButton: false,
        timer: 1300,
      });
    }
  });
}

function getOrderSortStepList(name) {
  let namei = ""
  switch (name) {
    case "approved":
      namei = "อนุมัติตัวอย่าง";
      break;
    case "pr":
      namei = "เขียน P.R.";
      break;
    case "fabric_ordered":
      namei = "สั่งผ้า";
      break;
    case "fabric_received":
      namei = "รับผ้า";
      break;
    case "film_printed":
      namei = "ปริ้นฟิล์ม / เตรียมไฟล์";
      break;
    case "screen_sample":
      namei = "อัดบล็อก/สกรีนตัวอย่าง";
      break;
    case "fabric_cutted":
      namei = "ตัดผ้า";
      break;
    case "qc_cut":
      namei = "QC ชิ้นผ้าตัด";
      break;
    case "fabric_screened":
      namei = "สกรีนผ้า";
      break;
    case "qc_screen":
      namei = "QC งานปัก/งานสกรีน";
      break;
    case "fabric_sewed":
      namei = "เย็บผ้า";
      break;
    case "qc":
      namei = "QC งานสำเร็จรูป";
      break;
    case "supplier_delivered":
      namei = "ส่งซัพพลายเออร์";
      break;
    case "packed":
      namei = "Packing";
      break;
    case "delivered":
      namei = "จัดส่ง";
      break;
  }
  return namei;
}

function getSortStepList(name) {
  let namei = ""
  switch (name) {
    case "approved":
      namei = "อนุมัติใบสเปค";
      break;
    case "pr":
      namei = "เขียน P.R.";
      break;
    case "fabric_ordered":
      namei = "สั่งผ้า";
      break;
    case "fabric_received":
      namei = "รับผ้า";
      break;
    case "cutted":
      namei = "ตัด";
      break;
    case "screened":
      namei = "สกรีน";
      break;
    case "sewed":
      namei = "เย็บ";
      break;
    case "qc":
      namei = "QC";
      break;
    case "exam_photo":
      namei = "ถ่ายรูปงานตัวอย่าง";
      break;
    case "delivered":
      namei = "จัดส่ง";
      break;
    case "exam_approved":
      namei = "อนุมัติตัวอย่าง";
      break;
  }
  return namei;
}

function doapprove_byval_exam(val, field) {
  let setdata = _.cloneDeep(val.exam_and_order);

  if (Array.isArray(setdata.step_data[field])) setdata.step_data[field] = {};
  if (!setdata.step_data[field]) setdata.step_data[field] = {};
  setdata.step_data[field].done = !setdata.step_data[field].done;
  if (setdata.step_data[field].done) {
    setdata.step_data[field].done = true
    setdata.step_data[field].by = auth_email
    setdata.step_data[field].at = new Date()
    setdata.step_data[field].username = auth_username
    setdata.step_data[field].ip = auth_ip
  }

  let step_list = setdata.step_list;
  let step_data = setdata.step_data;

  let status_done = [];
  let status_not_done = [];
  let totalStatusSort = [];

  for (let i = 0; i < step_list.length; i++) {
    if (step_data[step_list[i][0]].done) {
      status_done.push({ [step_list[i][0]]: step_data[step_list[i][0]], "name": step_list[i][0] })
    }
    if (step_data[step_list[i][0]].done == undefined) {
      status_not_done.push({ [step_list[i][0]]: step_data[step_list[i][0]], "name": step_list[i][0] })
    }
  }

  if (setdata.sort_step_data) {
    _.merge(setdata.sort_step_data, status_done.concat(status_not_done))

    for (let l = 0; l < setdata.sort_step_data.length; l++) {
      totalStatusSort.push({ "en": setdata.sort_step_data[l].name, "th": getSortStepList(setdata.sort_step_data[l].name) })
    }

    setdata.sort_step_list = totalStatusSort;
  } else {
    setdata.sort_step_data = status_done.concat(status_not_done);
    if (setdata.sort_step_data) {
      for (let l = 0; l < setdata.sort_step_data.length; l++) {
        totalStatusSort.push({ "en": setdata.sort_step_data[l].name, "th": getSortStepList(setdata.sort_step_data[l].name) })
      }

      setdata.sort_step_list = totalStatusSort;
    }
  }

  db.collection("quotation").doc(val.id).update({
    exam_and_order: setdata
  }).then(res => {
    vm_status.quotdata = res.data
    c(res.data.exam_and_order)
  }).catch(err => {
    alert("Approve error : " + JSON.stringify(err));
  });
}

async function submit_report_comment() {
  if (!commenting_step_data.comments) commenting_step_data.comments = [];

  commenting_step_data.comments.push({
    at: new Date(),
    by: auth_username,
    text: $("#" + commenting_report).val(),
  });
  $("#" + commenting_add).removeClass("d-flex");
  $("#" + commenting_add).addClass("d-none");
  await updateStepData(vm_status.quotdata.exam_and_order);

  document.getElementById(commenting_report).value = "";

  //$("#comment-modal").modal("hide");
}
async function submit_report_comment_exam() {
  console.log(commenting_step_data);
  if (!commenting_step_data.comments) commenting_step_data.comments = [];

  commenting_step_data.comments.push({
    at: new Date(),
    by: auth_username,
    text: $("#" + commenting_report).val(),
  });
  $("#" + commenting_add).removeClass("d-flex");
  $("#" + commenting_add).addClass("d-none");
  await updateStepDataExam(vm_status.quotdata.exam_and_order);

  document.getElementById(commenting_report).value = "";
}

//-------------------VUE INSTANCE FOR STATUS-------------------------------
const vm_form_app = createApp({
  data() {
    return {
      size: null,
      report_data: [],
      deep_size: [],
    };
  },
  methods: {
    update_deeptitle(data, tag_id) {
      data.title = document.getElementById(tag_id).value;
    },
    update_deepamount(data, tag_id) {
      data.amount = parseInt(document.getElementById(tag_id).value);
    },
    /* https://stackoverflow.com/questions/14872554/sorting-on-a-custom-order */
    sorting_size() {
      var ordering = {}, // map for efficient lookup of sortIndex
        sortOrder = [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "2XL",
          "XXXL",
          "3XL",
          "4XL",
          "5XL",
          "6XL",
          "7XL",
          "8XL",
          "EXTRA",
        ]; //ZUTTO SIZE LIST
      for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
      this.size.sort(function (a, b) {
        return sortOrder.indexOf(a) - sortOrder.indexOf(b);
      });

      //add deep size
      this.deep_size = [];
      for (let i = 0; i < this.size.length; i++) {
        this.deep_size.push([[]]);
      }
    },
    //function to return total amount real time
    total_report() {
      let total = 0;
      let total_deep = 0;
      for (let i in this.size) {
        var size_amount = document.getElementById(
          "status-size-" + this.size[i]
        );
        if (size_amount) {
          let amount_report = parseInt(size_amount.value);
          if (!isNaN(amount_report)) total += amount_report;
        }
        if (this.deep_size[i][0].length > 0) {
          for (let j in this.deep_size[i][0]) {
            let amount_deep = parseInt(this.deep_size[i][0][j].amount);
            if (!isNaN(amount_deep)) total_deep += amount_deep;
          }
        }
      }
      return [total, total_deep];
    },
    async submit_report() {
      let group_amount = 0
      let group_size = []
      let reportStepData = _.cloneDeep(report)
      for (let i in this.size) {
        let size_report = this.size[i];
        //GET VALUE FROM FORM
        let amount_report = parseInt(
          document.getElementById("status-size-" + this.size[i]).value
        );
        //CLEAR VALUE
        document.getElementById("status-size-" + this.size[i]).value = 0;
        group_amount += amount_report;
        //CREATE AN OBJECT FOR EACH SIZE
        let size_report_obj = {};
        if (this.deep_size[i][0].length > 0) {
          let amount_deep = 0;
          for (let j in this.deep_size[i][0]) {
            amount_deep += parseInt(this.deep_size[i][0][j].amount);
          }
          temp_deep += amount_deep;
          size_report_obj = {
            size: size_report,
            amount: amount_report,
            sizedeep: this.deep_size[i][0],
            amountdeep: amount_deep,
          };
        } else {
          size_report_obj = {
            size: size_report,
            amount: amount_report,
          };
        }
        group_size.push(size_report_obj);
      }
      let group_name = this.$refs['report_group_size_name'].value

      if (!reportStepData.step_data[report_step].hasOwnProperty("report")) {
        reportStepData.step_data[report_step].report = {
          at: new Date(),
          by: auth_username,
          reports: [{
            name: group_name,
            size: group_size,
            amount: parseInt(group_amount)
          }],
          total: parseInt(group_amount),
        }
      } else {
        if (reportStepData.step_data[report_step].report) {
          reportStepData.step_data[report_step].report.at = new Date()
          reportStepData.step_data[report_step].report.by = auth_username
          reportStepData.step_data[report_step].report.reports.push({
            name: group_name,
            size: group_size,
            amount: parseInt(group_amount)
          })
          reportStepData.step_data[report_step].report.total += parseInt(group_amount)
        }
      }

      $("#report-modal").modal("hide");

      await updateStepData(report, reportStepData, report_step);
      vm_status.stepDataTotalAmount(reportStepData);
      this.$refs['report_group_size_name'].value = ""
    },
    close_report() {
      document.getElementById("report_date").valueAsDate = new Date();
      for (let i in this.size) {
        document.getElementById("status-size-" + this.size[i]).value = 0;
      }
    },
  },
});
vm_form_app.component("bs-modal", modal);
const vm_form = vm_form_app.mount("#report-modal");

const vm_form2_app = createApp({
  data() {
    return {
      size: null,
      report_data: [],
      deep_size: [],
    };
  },
  methods: {
    update_deeptitle(data, tag_id) {
      data.title = document.getElementById(tag_id).value;
    },
    update_deepamount(data, tag_id) {
      data.amount = parseInt(document.getElementById(tag_id).value);
    },
    /* https://stackoverflow.com/questions/14872554/sorting-on-a-custom-order */
    sorting_size() {
      var ordering = {}, // map for efficient lookup of sortIndex
        sortOrder = [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "2XL",
          "XXXL",
          "3XL",
          "4XL",
          "5XL",
          "6XL",
          "7XL",
          "8XL",
          "EXTRA",
        ]; //ZUTTO SIZE LIST
      for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
      this.size.sort(function (a, b) {
        return sortOrder.indexOf(a) - sortOrder.indexOf(b);
      });

      //add deep size
      this.deep_size = [];
      for (let i = 0; i < this.size.length; i++) {
        this.deep_size.push([[]]);
      }
    },
    //function to return total amount real time
    total_report() {
      let total = 0;
      let total_deep = 0;
      for (let i in this.size) {
        var size_amount = document.getElementById(
          "status-size-exam-" + this.size[i]
        );
        if (size_amount) {
          let amount_report = parseInt(size_amount.value);
          if (!isNaN(amount_report)) total += amount_report;
        }
        if (this.deep_size[i][0].length > 0) {
          for (let j in this.deep_size[i][0]) {
            let amount_deep = parseInt(this.deep_size[i][0][j].amount);
            if (!isNaN(amount_deep)) total_deep += amount_deep;
          }
        }
      }

      // var etc_size = document.getElementById("status-size-etc")
      // let amount_report = parseInt(etc_size.value)
      // if(!isNaN(amount_report)) total += amount_report

      return [total, total_deep];
    },
    async submit_report_exam() {
      let group_amount = 0
      let group_size = []
      let reportStepData = _.cloneDeep(report_quot.exam_and_order)
      for (let i in this.size) {
        let size_report = this.size[i];
        //GET VALUE FROM FORM
        let amount_report = parseInt(
          document.getElementById("status-size-exam-" + this.size[i]).value
        );
        //CLEAR VALUE
        document.getElementById("status-size-exam-" + this.size[i]).value = 0;
        group_amount += amount_report;
        //CREATE AN OBJECT FOR EACH SIZE
        let size_report_obj = {};
        if (this.deep_size[i][0].length > 0) {
          let amount_deep = 0;
          for (let j in this.deep_size[i][0]) {
            amount_deep += parseInt(this.deep_size[i][0][j].amount);
          }
          temp_deep += amount_deep;
          size_report_obj = {
            size: size_report,
            amount: amount_report,
            sizedeep: this.deep_size[i][0],
            amountdeep: amount_deep,
          };
        } else {
          size_report_obj = {
            size: size_report,
            amount: amount_report,
          };
        }
        group_size.push(size_report_obj);
      }
      let group_name = this.$refs['report_group_size_name_exam'].value

      if (!reportStepData.step_data[report_step_data].hasOwnProperty("report")) {
        reportStepData.step_data[report_step_data].report = {
          at: new Date(),
          by: auth_username,
          reports: [{
            name: group_name,
            size: group_size,
            amount: parseInt(group_amount)
          }],
          total: parseInt(group_amount),
        }
      } else {
        if (reportStepData.step_data[report_step_data].report) {
          reportStepData.step_data[report_step_data].report.at = new Date()
          reportStepData.step_data[report_step_data].report.by = auth_username
          reportStepData.step_data[report_step_data].report.reports.push({
            name: group_name,
            size: group_size,
            amount: parseInt(group_amount)
          })
          reportStepData.step_data[report_step_data].report.total += parseInt(group_amount)
        }
      }

      $("#report-exam-modal").modal("hide");

      await updateStepDataExam(report_quot, reportStepData.step_data[report_step_data], report_step_data);
      vm_status.stepDataTotalAmount(reportStepData.step_data);
      this.$refs['report_group_size_name_exam'].value = ""
    },
    close_report() {
      document.getElementById("report_exam_date").valueAsDate = new Date();
      for (let i in this.size) {
        document.getElementById("status-size-exam-" + this.size[i]).value = 0;
      }
    },
  },
});
const vm_form2 = vm_form2_app.mount("#report-exam-modal");

const vm_reject_app = createApp({
  data() {
    return {
      size: null,
      report_data: [],
      deep_size: [],
    };
  },
  methods: {
    update_deeptitle(data, tag_id) {
      data.title = document.getElementById(tag_id).value;
    },
    update_deepamount(data, tag_id) {
      data.amount = parseInt(document.getElementById(tag_id).value);
    },
    /* https://stackoverflow.com/questions/14872554/sorting-on-a-custom-order */
    sorting_size() {
      var ordering = {}, // map for efficient lookup of sortIndex
        sortOrder = [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "2XL",
          "XXXL",
          "3XL",
          "4XL",
          "5XL",
          "6XL",
          "7XL",
          "8XL",
          "EXTRA",
        ]; //ZUTTO SIZE LIST
      for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
      this.size.sort(function (a, b) {
        return sortOrder.indexOf(a) - sortOrder.indexOf(b);
      });

      //add deep size
      this.deep_size = [];
      for (let i = 0; i < this.size.length; i++) {
        this.deep_size.push([[]]);
      }
    },
    //function to return total amount real time
    total_report() {
      let total = 0;
      let total_deep = 0;
      for (let i in this.size) {
        var size_amount = document.getElementById(
          "reject-status-size-" + this.size[i]
        );
        if (size_amount) {
          let amount_report = parseInt(size_amount.value);
          if (!isNaN(amount_report)) total += amount_report;
        }
        if (this.deep_size[i][0].length > 0) {
          for (let j in this.deep_size[i][0]) {
            let amount_deep = parseInt(this.deep_size[i][0][j].amount);
            if (!isNaN(amount_deep)) total_deep += amount_deep;
          }
        }
      }

      // var etc_size = document.getElementById("status-size-etc")
      // let amount_report = parseInt(etc_size.value)
      // if(!isNaN(amount_report)) total += amount_report

      return [total, total_deep];
    },
    async submit_reject() {
      let update_reject = false;
      let reject_data = [];
      let temp = 0;
      let temp_deep = 0;
      let reject_datetime = document.getElementById("reject_date").valueAsDate;
      document.getElementById("reject_date").value = new Date();
      if (!reject_step_data.reject) reject_step_data.reject = [];

      for (let i in this.size) {
        let size_reject = this.size[i];
        //GET VALUE FROM FORM
        let amount_reject = parseInt(
          document.getElementById("reject-status-size-" + this.size[i]).value
        );
        //CLEAR VALUE
        document.getElementById("reject-status-size-" + this.size[i]).value = 0;
        temp += amount_reject;
        //CREATE AN OBJECT FOR EACH SIZE
        let size_reject_obj = {};
        if (this.deep_size[i][0].length > 0) {
          let amount_deep = 0;
          for (let j in this.deep_size[i][0]) {
            amount_deep += parseInt(this.deep_size[i][0][j].amount);
          }
          temp_deep += amount_deep;
          size_reject_obj = {
            size: size_reject,
            amount: amount_reject,
            sizedeep: this.deep_size[i][0],
            amountdeep: amount_deep,
          };
        } else {
          size_reject_obj = {
            size: size_reject,
            amount: amount_reject,
          };
        }
        reject_data.push(size_reject_obj);
      }

      let total_amount = temp;
      let total_amount_deep = temp_deep;

      for (let i in reject_step_data.reject) {
        console.log(reject_step_data.reject[i].for);
        if (
          reject_step_data.reject[i].for.split("T")[0] ===
          reject_datetime.toISOString().split("T")[0]
        ) {
          update_reject = true;
        }
      }
      //user change the requirement so many times after deploy to production that why...
      // FUN WILL START HERE
      if (update_reject) {
        for (let i in reject_step_data.reject) {
          if (
            reject_step_data.reject[i].for.split("T")[0] ===
            reject_datetime.toISOString().split("T")[0]
          ) {
            reject_step_data.reject[i].at = new Date();
            reject_step_data.reject[i].by = auth_username;
            reject_step_data.reject[i].amount += total_amount;
            reject_step_data.reject[i].amountpiecesdeep += total_amount_deep;
            for (let j in reject_step_data.reject[i].report) {
              reject_step_data.reject[i].report[j].amount +=
                reject_data[j].amount;
              if (
                reject_step_data.reject[i].report[j].hasOwnProperty(
                  "sizedeep"
                ) &&
                reject_data[j].hasOwnProperty("sizedeep")
              ) {
                let check_n =
                  reject_step_data.reject[i].report[j].sizedeep.length +
                  reject_data[j].sizedeep.length -
                  1;
                for (let k in reject_data[j].sizedeep) {
                  if (
                    reject_step_data.reject[i].report[j].sizedeep[k].title ===
                    reject_data[j].sizedeep[k].title
                  ) {
                    reject_step_data.reject[i].report[j].sizedeep[k].amount +=
                      parseInt(reject_data[j].sizedeep[k].amount);
                  } else {
                    let check = true;
                    let check_i = 0;
                    for (let n in reject_step_data.reject[i].report[j]
                      .sizedeep) {
                      if (
                        reject_step_data.reject[i].report[j].sizedeep[n]
                          .title === reject_data[j].sizedeep[k].title
                      ) {
                        reject_step_data.reject[i].report[j].sizedeep[
                          n
                        ].amount += parseInt(reject_data[j].sizedeep[k].amount);
                        check = true;
                        check_i + 2;
                        break;
                      } else {
                        check = false;
                      }
                    }
                    if (!check && check_i < check_n) {
                      reject_step_data.reject[i].report[j].sizedeep.push({
                        title: reject_data[j].sizedeep[k].title,
                        amount: parseInt(reject_data[j].sizedeep[k].amount),
                      });
                      check_n - 2;
                      check_i++;
                    }
                  }
                }
              } else if (
                !reject_step_data.reject[i].report[j].hasOwnProperty(
                  "sizedeep"
                ) &&
                reject_data[j].sizedeep
              ) {
                for (let k in reject_data[j].sizedeep) {
                  if (
                    !reject_step_data.reject[i].report[j].hasOwnProperty(
                      "sizedeep"
                    )
                  ) {
                    reject_step_data.reject[i].report[j]["sizedeep"] = [
                      {
                        title: reject_data[j].sizedeep[k].title,
                        amount: parseInt(reject_data[j].sizedeep[k].amount),
                      },
                    ];
                  } else {
                    reject_step_data.reject[i].report[j].sizedeep.push({
                      title: reject_data[j].sizedeep[k].title,
                      amount: parseInt(reject_data[j].sizedeep[k].amount),
                    });
                  }
                }
              }
            }
          }
        }
        //FUN END HERE KEKW
      } else {
        reject_step_data.reject.push({
          at: new Date(),
          by: auth_username,
          for: reject_datetime,
          report: reject_data,
          amount: total_amount,
          amountpiecesdeep: total_amount_deep,
        });
      }
      $("#reject-modal").modal("hide");
      await updateStepData(reject_quot);
      console.log(reject_step_data);
      vm_status.stepDataTotalReject(reject_step_data);
    },
    close_reject() {
      document.getElementById("reject_date").valueAsDate = new Date();
      for (let i in this.size) {
        document.getElementById("reject-status-size-" + this.size[i]).value = 0;
      }
    },
  },
});
const vm_reject = vm_reject_app.mount("#reject-modal");

const vm_reject2_app = createApp({
  data() {
    return {
      size: null,
      report_data: [],
      deep_size: [],
    };
  },
  methods: {
    update_deeptitle(data, tag_id) {
      data.title = document.getElementById(tag_id).value;
    },
    update_deepamount(data, tag_id) {
      data.amount = parseInt(document.getElementById(tag_id).value);
    },
    /* https://stackoverflow.com/questions/14872554/sorting-on-a-custom-order */
    sorting_size() {
      var ordering = {}, // map for efficient lookup of sortIndex
        sortOrder = [
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "2XL",
          "XXXL",
          "3XL",
          "4XL",
          "5XL",
          "6XL",
          "7XL",
          "8XL",
          "EXTRA",
        ]; //ZUTTO SIZE LIST
      for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
      this.size.sort(function (a, b) {
        return sortOrder.indexOf(a) - sortOrder.indexOf(b);
      });

      //add deep size
      this.deep_size = [];
      for (let i = 0; i < this.size.length; i++) {
        this.deep_size.push([[]]);
      }
    },
    //function to return total amount real time
    total_report() {
      let total = 0;
      let total_deep = 0;
      for (let i in this.size) {
        var size_amount = document.getElementById(
          "reject-status-size-exam-" + this.size[i]
        );
        if (size_amount) {
          let amount_report = parseInt(size_amount.value);
          if (!isNaN(amount_report)) total += amount_report;
        }
        if (this.deep_size[i][0].length > 0) {
          for (let j in this.deep_size[i][0]) {
            let amount_deep = parseInt(this.deep_size[i][0][j].amount);
            if (!isNaN(amount_deep)) total_deep += amount_deep;
          }
        }
      }

      // var etc_size = document.getElementById("status-size-etc")
      // let amount_report = parseInt(etc_size.value)
      // if(!isNaN(amount_report)) total += amount_report

      return [total, total_deep];
    },
    async submit_reject_exam() {
      let update_reject = false;
      let reject_data = [];
      let temp = 0;
      let temp_deep = 0;
      let reject_datetime =
        document.getElementById("reject_date_exam").valueAsDate;
      document.getElementById("reject_date_exam").value = new Date();
      if (!reject_step_data.reject) reject_step_data.reject = [];

      for (let i in this.size) {
        let size_reject = this.size[i];
        //GET VALUE FROM FORM
        let amount_reject = parseInt(
          document.getElementById("reject-status-size-exam-" + this.size[i])
            .value
        );
        //CLEAR VALUE
        document.getElementById(
          "reject-status-size-exam-" + this.size[i]
        ).value = 0;
        temp += amount_reject;
        //CREATE AN OBJECT FOR EACH SIZE
        let size_reject_obj = {};
        if (this.deep_size[i][0].length > 0) {
          let amount_deep = 0;
          for (let j in this.deep_size[i][0]) {
            amount_deep += parseInt(this.deep_size[i][0][j].amount);
          }
          temp_deep += amount_deep;
          size_reject_obj = {
            size: size_reject,
            amount: amount_reject,
            sizedeep: this.deep_size[i][0],
            amountdeep: amount_deep,
          };
        } else {
          size_reject_obj = {
            size: size_reject,
            amount: amount_reject,
          };
        }
        reject_data.push(size_reject_obj);
      }

      let total_amount = temp;
      let total_amount_deep = temp_deep;

      for (let i in reject_step_data.reject) {
        if (
          reject_step_data.reject[i].for.split("T")[0] ===
          reject_datetime.toISOString().split("T")[0]
        ) {
          update_reject = true;
        }
      }
      //user change the requirement so many times after deploy to production that why...
      // FUN WILL START HERE
      if (update_reject) {
        for (let i in reject_step_data.reject) {
          if (
            reject_step_data.reject[i].for.split("T")[0] ===
            reject_datetime.toISOString().split("T")[0]
          ) {
            reject_step_data.reject[i].at = new Date();
            reject_step_data.reject[i].by = auth_username;
            reject_step_data.reject[i].amount += total_amount;
            reject_step_data.reject[i].amountpiecesdeep += total_amount_deep;
            for (let j in reject_step_data.reject[i].report) {
              reject_step_data.reject[i].report[j].amount +=
                reject_data[j].amount;
              if (
                reject_step_data.reject[i].report[j].hasOwnProperty(
                  "sizedeep"
                ) &&
                reject_data[j].hasOwnProperty("sizedeep")
              ) {
                let check_n =
                  reject_step_data.reject[i].report[j].sizedeep.length +
                  reject_data[j].sizedeep.length -
                  1;
                for (let k in reject_data[j].sizedeep) {
                  if (
                    reject_step_data.reject[i].report[j].sizedeep[k].title ===
                    reject_data[j].sizedeep[k].title
                  ) {
                    reject_step_data.reject[i].report[j].sizedeep[k].amount +=
                      parseInt(reject_data[j].sizedeep[k].amount);
                  } else {
                    let check = true;
                    let check_i = 0;
                    for (let n in reject_step_data.reject[i].report[j]
                      .sizedeep) {
                      if (
                        reject_step_data.reject[i].report[j].sizedeep[n]
                          .title === reject_data[j].sizedeep[k].title
                      ) {
                        reject_step_data.reject[i].report[j].sizedeep[
                          n
                        ].amount += parseInt(reject_data[j].sizedeep[k].amount);
                        check = true;
                        check_i + 2;
                        break;
                      } else {
                        check = false;
                      }
                    }
                    if (!check && check_i < check_n) {
                      reject_step_data.reject[i].report[j].sizedeep.push({
                        title: reject_data[j].sizedeep[k].title,
                        amount: parseInt(reject_data[j].sizedeep[k].amount),
                      });
                      check_n - 2;
                      check_i++;
                    }
                  }
                  reject_step_data.push({
                    title: reject_data[j].sizedeep[k].title,
                  });
                }
              } else if (
                !reject_step_data.reject[i].report[j].hasOwnProperty(
                  "sizedeep"
                ) &&
                reject_data[j].sizedeep
              ) {
                for (let k in reject_data[j].sizedeep) {
                  if (
                    !reject_step_data.reject[i].report[j].hasOwnProperty(
                      "sizedeep"
                    )
                  ) {
                    reject_step_data.reject[i].report[j]["sizedeep"] = [
                      {
                        title: reject_data[j].sizedeep[k].title,
                        amount: parseInt(reject_data[j].sizedeep[k].amount),
                      },
                    ];
                  } else {
                    reject_step_data.reject[i].report[j].sizedeep.push({
                      title: reject_data[j].sizedeep[k].title,
                      amount: parseInt(reject_data[j].sizedeep[k].amount),
                    });
                  }
                }
              }
            }
          }
        }
        //FUN END HERE KEKW
      } else {
        reject_step_data.reject.push({
          at: new Date(),
          by: auth_username,
          for: reject_datetime,
          report: reject_data,
          amount: total_amount,
          amountpiecesdeep: total_amount_deep,
        });
      }
      $("#reject-exam-modal").modal("hide");
      await updateStepDataExam(reject_quot, reject_step_data, "reject");
      // console.log(reject_step_data)
      vm_status.stepDataTotalReject(reject_step_data);
    },
    close_reject() {
      document.getElementById("reject_date_exam").valueAsDate = new Date();
      for (let i in this.size) {
        document.getElementById(
          "reject-status-size-exam-" + this.size[i]
        ).value = 0;
      }
    },
  },
});
const vm_reject2 = vm_reject2_app.mount("#reject-exam-modal");

const vm_status_app = createApp({
  data() {
    return {
      quotdata: {},
      isPostingData: false,
      editMode: false,
      total_list: [],
      total_reject: [],
      switch_on: false,
      usermode: false,
    };
  },
  methods: {
    updateStepData: updateStepData,
    doapprove_wrapper: doapprove_wrapper,
    submit_step_outsource: submit_step_outsource,
    submit_report_comment: submit_report_comment,
    doapprove_wrapper_exam: doapprove_wrapper_exam,
    submit_step_outsource_exam: submit_step_outsource_exam,
    submit_report_comment_exam: submit_report_comment_exam,
    switchToggle(data) {
      if (data.exam_and_order.is_order == false) {
        data.exam_and_order.is_order = true;
      } else {
        data.exam_and_order.is_order = false;
      }

      let setdata = _.cloneDeep(data.exam_and_order);

      _.merge(setdata, {
        is_order: data.exam_and_order.is_order,
      });

      db.collection("quotation")
        .doc(data.id)
        .update({
          exam_and_order: setdata,
        })
        .then(function () { })
        .catch(function (err) {
          console.log(err);
          alert("มีข้อผิดพลาดเกิดขึ้น\n" + JSON.stringify(err));
        });
      mainView.$forceUpdate();
    },
    approve(val) {
      let data = {};
      Swal.fire({
        title: "Approve ?",
        text: "อนุมัติสถานะทั้งหมดหรือไม่",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#49be25",
        cancelButtonColor: "#9e9e9e",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          data = {
            done: true,
            by: auth_email,
            at: new Date(),
            username: auth_username,
            ip: auth_ip,
          };
          let setdata = _.cloneDeep(val.exam_and_order);
          _.merge(setdata, {
            is_approved: 1,
            step_data: {
              approved: data,
              pr: data,
              fabric_ordered: data,
              fabric_received: data,
              cutted: data,
              screened: data,
              sewed: data,
              qc: data,
              exam_photo: data,
              delivered: data,
              exam_approved: data,
            },
          });
          db.collection("quotation")
            .doc(val.id)
            .update({
              exam_and_order: setdata,
            })
            .then(function (res) {
              if (res.status == "success") {
                vm_status.quotdata = res.data;
              }
              Swal.fire({
                icon: "success",
                title: "สำเร็จ !",
                text: "สถานะทั้งหมดถูกอนุมัติแล้ว",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch(function (err) {
              alert("Approve error : " + JSON.stringify(err));
              console.log(err);
            });
          try {
            mainView.getQuotdata();
            vm_status.$forceUpdate();
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    reject(val) {
      Swal.fire({
        title: "Reject ?",
        text: "คุณต้องการ Reject โปรเจคนี้ใช่มั้ย ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#9e9e9e",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          let setdata = _.cloneDeep(val.exam_and_order);
          console.log();
          setdata.reject.push(val.exam_and_order.step_data);
          setdata.step_data = {
            approved: "",
            pr: "",
            fabric_ordered: "",
            fabric_received: "",
            cutted: "",
            screened: "",
            sewed: "",
            qc: "",
            exam_photo: "",
            delivered: "",
            exam_approved: "",
          };

          db.collection("quotation")
            .doc(val.id)
            .set({
              exam_and_order: setdata,
            })
            .then((res) => {
              if (res.status == "success") {
                vm_status.quotdata = res.data;
              }
              mainView.getQuotdata();
              Swal.fire({
                icon: "success",
                title: "สำเร็จ !",
                text: "โปรเจคนี้ถูก Reject แล้ว",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch(function (err) {
              alert("Reject error : " + JSON.stringify(err));
            });
          try {
            mainView.$forceUpdate();
            vm_status.$forceUpdate();
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    approveAndAdd(val) {
      let data = {};
      Swal.fire({
        title: "Approve and add ?",
        text: "ต้องการอนุมัติ จาก Exam เป็น Order หรือไม่",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#49be25",
        cancelButtonColor: "#9e9e9e",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          let setdata = _.cloneDeep(val.exam_and_order);
          data = {
            done: true,
            by: auth_email,
            at: new Date(),
            username: auth_username,
            ip: auth_ip,
          };
          _.merge(setdata, {
            is_order: true,
            is_ordered: 1,
            is_approved: 1,
            step_data: {
              approved: data,
              pr: data,
              fabric_ordered: data,
              fabric_received: data,
              cutted: data,
              screened: data,
              sewed: data,
              qc: data,
              exam_photo: data,
              delivered: data,
              exam_approved: data,
            },
          });
          db.collection("quotation")
            .doc(val.id)
            .set({
              exam_and_order: setdata,
            })
            .then(function (res) {
              if (res.status == "success") {
                vm_status.quotdata = res.data;
              }
              Swal.fire({
                icon: "success",
                title: "สำเร็จ !",
                text: "เปลี่ยน Exam เป็น Order แล้ว",
                showConfirmButton: false,
                timer: 1500,
              });
              location.reload();
            })
            .catch(function (err) {
              alert("Approve & Add error : " + JSON.stringify(err));
              console.log(err);
            });
        }
      });
    },
    fabricReceiveBtn(id) {
      $("#fabric-received-modal" + id).modal("show");
    },
    async submitFabricReceived(quot, exam, order) {
      let setdata = _.cloneDeep(quot.exam_and_order);
      let setdata2 = _.cloneDeep(quot.step_data);
      let data = {
        done: true,
        by: auth_email,
        at: new Date(),
        username: auth_username,
        ip: auth_ip,
      };
      if (exam == true) {
        setdata.current_status_exam = "fabric_received";
        setdata.fabric_receive_exam = true;
        setdata.step_data["fabric_received"] = data;
      }
      if (order == true) {
        setdata.current_status_order = "fabric_received";
        setdata.fabric_receive_order = true;
        setdata2["fabric_received"] = data;
      }

      Swal.fire({
        title: "Are you sure?",
        text:
          "คุณต้องการเปลี่ยนสถานะเป็น " +
          " " +
          "รับผ้าแล้ว".trim() +
          " " +
          " หรือไม่",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#49be25",
        cancelButtonColor: "#9e9e9e",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            let res = await db.collection("quotation").doc(quot.id).set({
              exam_and_order: setdata,
              step_data: setdata2,
            });
            vm_status.quotdata = res.data;
            generateToast("เปลี่ยนสถานะสำเร็จ", "success-teal");
            mainView.getQuotdata();
          }
        })
        .catch((err) => {
          generateToast("เกิดข้อผิดพลาดระหว่างเปลี่ยนสถานะ", "danger");
          console.log(err);
        });
    },
    decreaseProduceDay(overDay, maxProduceDay) {
      let produceDay = {};
      if (maxProduceDay == 30) {
        produceDay = {
          delivered: 2,
          packed: 2,
          qc: 2,
          fabric_sewed: 4,
          qc_screen: 2,
          fabric_screened: 2,
          qc_cut: 2,
          sample_produced: 2,
          screen_sample: 4,
          film_printed: 2,
          fabric_cutted: 2,
          fabric_received: 2,
          fabric_ordered: 2,
        };
      } else {
        produceDay = {
          delivered: 2,
          packed: 3,
          qc: 3,
          fabric_sewed: 6,
          qc_screen: 3,
          fabric_screened: 7,
          qc_cut: 3,
          sample_produced: 2,
          screen_sample: 5,
          film_printed: 2,
          fabric_cutted: 3,
          fabric_received: 2,
          fabric_ordered: 3,
        };
      }

      if (overDay > 0) {
        for (i = 1; i <= overDay; i++) {
          switch (i) {
            case 1:
              produceDay.fabric_ordered--;
              break;
            case 2:
              produceDay.fabric_received--;
              break;
            case 3:
              produceDay.delivered--;
              break;
            case 4:
              produceDay.fabric_cutted--;
              break;
            case 5:
              produceDay.packed--;
              break;
            case 6:
              produceDay.qc_cut--;
              break;
            case 7:
              produceDay.qc--;
              break;
            case 8:
            case 10:
            case 12:
            case 14:
              produceDay.fabric_sewed--;
              break;
            case 9:
            case 11:
            case 13:
            case 15:
              produceDay.screen_sample--;
              break;
          }
        }
      }
      return produceDay;
    },
    decreaseProduceDayExam(overDay, maxProduceDay) {
      let produceDay = {};
      if (maxProduceDay == 30) {
        produceDay = {
          delivered: 2,
          exam_approved: 1,
          fabric_ordered: 2,
          fabric_received: 2,
          cutted: 2,
          screened: 2,
          sewed: 4,
          qc: 2,
          exam_photo: 2,
          approved: 1,
          pr: 1,
        };
      } else {
        produceDay = {
          delivered: 2,
          exam_approved: 1,
          fabric_ordered: 2,
          fabric_received: 2,
          cutted: 2,
          screened: 2,
          sewed: 4,
          qc: 2,
          exam_photo: 2,
          approved: 1,
          pr: 1,
        };
      }

      if (overDay > 0) {
        for (i = 1; i <= overDay; i++) {
          switch (i) {
            case 1:
              produceDay.fabric_ordered--;
              break;
            case 2:
              produceDay.fabric_received--;
              break;
            case 3:
              produceDay.delivered--;
              break;
            case 4:
              produceDay.cutted--;
              break;
            case 5:
              produceDay.packed--;
              break;
            case 6:
              produceDay.qc_cut--;
              break;
            case 7:
              produceDay.qc--;
              break;
            case 8:
            case 10:
            case 12:
            case 14:
              produceDay.sewed--;
              break;
            case 9:
            case 11:
            case 13:
            case 15:
              produceDay.screened--;
              break;
          }
        }
      }
      return produceDay;
    },
    async autoDueDate(quotdata, isOrder) {
      if (isOrder) {
        console.log(quotdata);
        let setdata = _.cloneDeep(quotdata.exam_and_order)
        //GET PRODUCE DAY
        let produceTimeAmount =
          new Date(quotdata.due).getTime() -
          new Date(quotdata.created_at).getTime();
        let produceDay = Math.trunc(produceTimeAmount / (1000 * 3600 * 24) + 1);

        //GET SHIRT AMOUNT
        let shirtAmount = 0;
        for (let group in quotdata.amountlistdeep) {
          for (let size in quotdata.amountlistdeep[group]) {
            shirtAmount += parseInt(quotdata.amountlistdeep[group][size].amount);
          }
        }

        //GET MAX PRODUCE DAY
        let maxProduceDay = 0;
        if (shirtAmount <= 5000) {
          maxProduceDay = 30;
        } else {
          maxProduceDay = 45;
        }

        //CHECK IS URGENT WORK AND DECREASE PRODUCE DAY
        let stepProduceDay = {};
        if (quotdata.data[0].is_express) {
          let overDay = produceDay - maxProduceDay;
          stepProduceDay = this.decreaseProduceDay(overDay, maxProduceDay);
        } else {
          stepProduceDay = this.decreaseProduceDay(0, maxProduceDay);
        }

        //ASSIGN STEP DUE DATE
        let loopIndex = 0;
        // let stepData = quotdata.step_data;
        let stepData = quotdata.exam_and_order.order_step_data;

        for (let step in stepProduceDay) {
          //DELETE STEP THAT NOT FOUND IN STEP DATA
          try {
            if (!setdata.order_step_data.hasOwnProperty(step)) {
              delete stepProduceDay[step];
              continue;
            }
          } catch {
            alert('ERROR : order_step_data is null')
          }

          //CONVERT DATA TYPE TO OBJECT
          if (Array.isArray(setdata.order_step_data[step])) {
            setdata.order_step_data[step] = {};
          }
          // if (
          //   !setdata.order_step_data[step].hasOwnProperty("due") &&
          //   !setdata.order_step_data[step].hasOwnProperty("due_by")
          // ) {
          let date = null;
          if (step == "delivered") {
            date = new Date(quotdata.due);
          } else {
            let key = Object.keys(stepProduceDay)[loopIndex - 1]; //GET PREVIOUS STEP DATE
            date = new Date(setdata.order_step_data[key].due);
            date.setDate(date.getDate() - stepProduceDay[step]); //MINUS DATE
          }
          setdata.order_step_data[step].due = date.toISOString().split("T")[0]; //NORMALIZE DATA

          //ASSIGN
          setdata.order_step_data[step].due_by = "AUTO DUE DATE";
          loopIndex++;
          // }
        }
        try {
          _.merge(setdata.order_step_data, quotdata.exam_and_order.order_step_data)
          db.collection('quotation').doc(quotdata.id).set({
            exam_and_order: setdata
          })
          let updateData = await axios.put(
            "/api/quotation/" + quotdata.id + "/col/step_data/update",
            quotdata.step_data
          );
          if (updateData.data.status == "success") {
            console.log("STEP DATA UPDATED.", updateData.data);
          } else {
            console.log(updateData.data);
          }
        } catch {
          console.log("UNABLE UPDATE STEP DATA.");
        }
      } else {
        //GET PRODUCE DAY
        let setdata = _.cloneDeep(quotdata.exam_and_order)
        let produceTimeAmount =
          new Date(quotdata.due).getTime() -
          new Date(quotdata.created_at).getTime();
        let produceDay = Math.trunc(produceTimeAmount / (1000 * 3600 * 24) + 1);

        //GET SHIRT AMOUNT
        let shirtAmount = 0;
        for (let group in quotdata.amountlistdeep) {
          for (let size in quotdata.amountlistdeep[group]) {
            shirtAmount += parseInt(quotdata.amountlistdeep[group][size].amount);
          }
        }

        //GET MAX PRODUCE DAY
        let maxProduceDay = 0;
        if (shirtAmount <= 5000) {
          maxProduceDay = 30;
        } else {
          maxProduceDay = 45;
        }

        //CHECK IS URGENT WORK AND DECREASE PRODUCE DAY
        let stepProduceDay = {};
        if (quotdata.data[0].is_express) {
          let overDay = produceDay - maxProduceDay;
          stepProduceDay = this.decreaseProduceDayExam(overDay, maxProduceDay);
        } else {
          stepProduceDay = this.decreaseProduceDayExam(0, maxProduceDay);
        }

        //ASSIGN STEP DUE DATE
        let loopIndex = 0;
        let stepData = quotdata.exam_and_order.step_data;

        for (let step in stepProduceDay) {
          //DELETE STEP THAT NOT FOUND IN STEP DATA
          if (!stepData.hasOwnProperty(step)) {
            delete stepProduceDay[step];
            continue;
          }

          //CONVERT DATA TYPE TO OBJECT
          if (Array.isArray(stepData[step])) {
            stepData[step] = {};
          }
          if (
            !stepData[step].hasOwnProperty("due") &&
            !stepData[step].hasOwnProperty("due_by")
          ) {
            let date = null;
            if (step == "delivered") {
              date = new Date(quotdata.due);
            } else {
              let key = Object.keys(stepProduceDay)[loopIndex - 1]; //GET PREVIOUS STEP DATE
              date = new Date(stepData[key].due);
              date.setDate(date.getDate() - stepProduceDay[step]); //MINUS DATE
            }
            // stepData[step].due = date.toISOString().split("T")[0]; //NORMALIZE DATA
            stepData[step].due = date.toISOString().slice(0, 10); //NORMALIZE DATA

            //ASSIGN
            stepData[step].due_by = "AUTO DUE DATE";
            loopIndex++;
          }
        }
        _.merge(setdata, {
          step_data: stepData
        })
        try {
          db.collection("quotation").doc(quotdata.id).set({
            exam_and_order: setdata
          });
        } catch (err) {
          console.error(err);
          alert("เกิดข้อผิดพลาดในการ Update step_data")
        }
      }
    },
    editModeToggle() {
      this.editMode = this.editMode ? false : true;
    },
    async deleteStepListAndData(id, index_stepList, stepList) {
      //GET INDEX FROM STEP DATA
      //REMOVE STEPLIST AND STEPDATA IN LOADED DATA
      stepList.splice(index_stepList, 1);
      //RE RENDER VUE COMPONENT
      this.$forceUpdate();

      //REMOVE STEPLIST AND STEPDATA IN DATABASE
      try {
        axios.post(
          "/api/quotation/" +
          id +
          "/col/step_list/" +
          index_stepList +
          "/delete"
        );
      } catch {
        alert("ไม่สามารถลบขั้นตอนได้");
      }
    },
    async deleteStepListAndDataExam(id, index_stepList, stepList) {
      stepList.splice(index_stepList, 1);
      this.$forceUpdate();
      try {
        axios.post(
          "/api/quotation/" +
          id +
          "/col/step_list/" +
          index_stepList +
          "/delete"
        );
      } catch {
        alert("ไม่สามารถลบขั้นตอนได้");
      }
    },
    async addStep(id, stepList, stepData) {
      //DISABLE INPUT AND BUTTONS
      this.isPostingData = true;

      //PREPARE POST DATA
      var ref_item = "addStep_" + id;
      var idInData = "customStepList_" + this.$refs[ref_item].value;
      var data = [idInData, this.$refs[ref_item].value];
      stepData[idInData] = {};

      stepList.push(data);
      this.$forceUpdate();

      //POST DATA
      try {
        axios.post("/api/quotation/" + id + "/col/step_list/append", data);
      } catch (err) {
        alert("ไม่สามารถเพิ่มขั้นตอนได้");
        console.log(err);
      }

      this.isPostingData = false;
      this.$refs[ref_item].value = "";

      console.log(stepData);
    },
    async addStepExam(id, stepList, stepData) {
      //DISABLE INPUT AND BUTTONS
      this.isPostingData = true;

      //PREPARE POST DATA
      var ref_item = "addStep_" + id;
      var idInData = "customStepList_" + this.$refs[ref_item].value;
      var data = [idInData, this.$refs[ref_item].value];
      stepData[idInData] = {};

      stepList.push(data);
      this.$forceUpdate();

      //POST DATA
      try {
        axios.post("/api/quotation/" + id + "/col/step_list/append", data);
      } catch (err) {
        alert("ไม่สามารถเพิ่มขั้นตอนได้");
        console.log(err);
      }

      this.isPostingData = false;
      this.$refs[ref_item].value = "";

      console.log(stepData);
    },
    status_move_up(val, stepi) {
      if (stepi > 0) {
        let temp = val.step_list[stepi];
        val.step_list[stepi] = val.step_list[stepi - 1];
        val.step_list[stepi - 1] = temp;
      }
      this.save_step_list(val);
    },
    status_move_up_exam(val, stepi) {
      if (stepi > 0) {
        let temp = val.exam_and_order.step_list[stepi];
        val.exam_and_order.step_list[stepi] =
          val.exam_and_order.step_list[stepi - 1];
        val.exam_and_order.step_list[stepi - 1] = temp;
      }
      this.save_step_list_exam(val);
    },
    status_move_down(val, stepi) {
      if (stepi < val.step_list.length - 1) {
        let temp = val.step_list[stepi];
        val.step_list[stepi] = val.step_list[stepi + 1];
        val.step_list[stepi + 1] = temp;
      }
      this.save_step_list(val);
    },
    status_move_down_exam(val, stepi) {
      if (stepi < val.exam_and_order.step_list.length - 1) {
        let temp = val.exam_and_order.step_list[stepi];
        val.exam_and_order.step_list[stepi] =
          val.exam_and_order.step_list[stepi + 1];
        val.exam_and_order.step_list[stepi + 1] = temp;
      }
      this.save_step_list_exam(val);
    },
    save_step_list(val) {
      db.collection("quotation")
        .doc(val.id)
        .update({
          step_list: val.step_list,
        })
        .then(function () { })
        .catch(function (err) {
          console.log(err);
          alert(
            "มีข้อผิดพลาดเกิดขึ้น ตอนสถานะ ขึ้น ลง\n" + JSON.stringify(err)
          );
        });
    },
    save_step_list_exam(val) {
      db.collection("quotation")
        .doc(val.id)
        .update({
          exam_and_order: val.exam_and_order,
        })
        .then(function () { })
        .catch(function (err) {
          console.log(err);
          alert(
            "มีข้อผิดพลาดเกิดขึ้น ตอนสถานะ ขึ้น ลง\n" + JSON.stringify(err)
          );
        });
    },
    stepDataReport(quot, step_data) {
      report = quot;
      report_step = step_data;

      vm_form.size = Object.keys(quot.amountlist);
      vm_form.sorting_size();
      document.getElementById("report_date").valueAsDate = new Date();
      $("#report-modal").modal("show");
    },
    stepDataReportExam(quot, step_data) {
      report_quot = quot;
      report_step_data = step_data;

      vm_form2.size = Object.keys(quot.amountlist);
      vm_form2.sorting_size();
      document.getElementById("report_exam_date").valueAsDate = new Date();
      $("#report-exam-modal").modal("show");
    },
    stepDataReject(quot, step_data) {
      reject_quot = quot;
      reject_step_data = step_data;

      vm_reject.size = Object.keys(quot.amountlist);
      vm_reject.sorting_size();
      document.getElementById("reject_date").valueAsDate = new Date();
      $("#reject-modal").modal("show");
    },
    stepDataRejectExam(quot, step_data) {
      reject_quot = quot;
      reject_step_data = step_data;

      vm_reject2.size = Object.keys(quot.amountlist);
      vm_reject2.sorting_size();
      document.getElementById("reject_date_exam").valueAsDate = new Date();
      $("#reject-exam-modal").modal("show");
    },
    stepDataReportComment(quot, step_data, stepi) {
      commenting_quot = quot;
      commenting_step_data = step_data;
      commenting_report = "comment_" + stepi;
      commenting_add = "add_comment_" + stepi;
      if ($("#" + commenting_add).hasClass("d-flex")) {
        $("#" + commenting_add).removeClass("d-flex");
        $("#" + commenting_add).addClass("d-none");
        return;
      }
      $("#" + commenting_add).removeClass("d-none");
      $("#" + commenting_add).addClass("d-flex");
    },
    stepDataReportCommentExam(quot, step_data, stepi) {
      commenting_quot = quot;
      commenting_step_data = step_data;
      commenting_report = "comment_" + stepi;
      commenting_add = "add_comment_" + stepi;
      console.log("commenting_quot : " + commenting_quot);
      console.log("commenting_step_data : " + commenting_step_data);
      console.log("commenting_report : " + commenting_report);
      console.log("commenting_add : " + commenting_add);
      if ($("#" + commenting_add).hasClass("d-flex")) {
        $("#" + commenting_add).removeClass("d-flex");
        $("#" + commenting_add).addClass("d-none");
        return;
      }
      $("#" + commenting_add).removeClass("d-none");
      $("#" + commenting_add).addClass("d-flex");
    },
    stepDataShowMore(quot, quotstep, stepi) {
      let showmore = "show-more-" + stepi;
      //if showmore are show and button click again
      if ($("#" + showmore).hasClass("d-flex")) {
        $("#" + showmore).removeClass("d-flex");
        $("#" + showmore).addClass("d-none");
        return;
      }
      for (let i = 0; i < quot.step_list.length; i++) {
        let rmshowmore = "show-more-" + i;
        if ($("#" + rmshowmore).hasClass("d-flex")) {
          $("#" + rmshowmore).removeClass("d-flex");
          $("#" + rmshowmore).addClass("d-none");
        }
      }
      this.stepDataTotalAmount(quotstep);
      this.stepDataTotalReject(quotstep);
      $("#" + showmore).removeClass("d-none");
      $("#" + showmore).addClass("d-flex");
    },
    stepDataShowMoreExam(quot, quotstep, stepi) {
      let showmore_ex = "show-more-exam" + stepi;
      //if showmore_ex are show and button click again
      if ($("#" + showmore_ex).hasClass("d-flex")) {
        $("#" + showmore_ex).removeClass("d-flex");
        $("#" + showmore_ex).addClass("d-none");
        return;
      }
      for (let i = 0; i < quot.exam_and_order.step_list.length; i++) {
        let rmshowmore_ex = "show-more-exam" + i;
        if ($("#" + rmshowmore_ex).hasClass("d-flex")) {
          $("#" + rmshowmore_ex).removeClass("d-flex");
          $("#" + rmshowmore_ex).addClass("d-none");
        }
      }
      this.stepDataTotalAmount(quotstep);
      this.stepDataTotalReject(quotstep);
      $("#" + showmore_ex).removeClass("d-none");
      $("#" + showmore_ex).addClass("d-flex");
    },
    stepDataShowMoreExamReject(quot, quotstep, listi, stepi) {
      let showmore_ex = "show-more-exam-reject-" + stepi + listi;
      //if showmore_ex are show and button click again
      if ($("#" + showmore_ex).hasClass("d-flex")) {
        $("#" + showmore_ex).removeClass("d-flex");
        $("#" + showmore_ex).addClass("d-none");
        return;
      }
      for (let i = 0; i < quot.exam_and_order.step_list.length; i++) {
        let rmshowmore_ex = "show-more-exam-reject-" + stepi + i;
        if ($("#" + rmshowmore_ex).hasClass("d-flex")) {
          $("#" + rmshowmore_ex).removeClass("d-flex");
          $("#" + rmshowmore_ex).addClass("d-none");
        }
      }
      this.stepDataTotalAmount(quotstep);
      this.stepDataTotalReject(quotstep);
      $("#" + showmore_ex).removeClass("d-none");
      $("#" + showmore_ex).addClass("d-flex");
    },
    stepDataTotalAmount(quotstep) {
      let temp = [];
      for (let i in quotstep.report) {
        temp.push(quotstep.report[i]);
      }
      this.total_list = temp;
      this.total_list.sort(this.compare);
    },
    stepDataTotalReject(quotstep) {
      let temp = [];
      for (let i in quotstep.reject) temp.push(quotstep.reject[i]);
      this.total_reject = temp;
      this.total_reject.sort(this.compare);
    },
    //sorting array of objects
    compare(a, b) {
      if (a.for < b.for) {
        return -1;
      }
      if (a.for > b.for) {
        return 1;
      }
      return 0;
    },
  },
});
vm_status_app.component("bs-modal", modal);
window.vm_status = vm_status_app.mount("#vue-statusmodal"); //MAKE GLOBAL VARIBALE
//-------------------VUE INSTANCE FOR STATUS-------------------------------

//--------------------------EDIT PLACEHOLDER-------------------------------
// const vm_edit_app = createApp({
//   data() {
//     return {};
//   },
//   methods: {
//     calcurrentstatus_deposit: calcurrentstatus_deposit,
//   },
// });
// window.vm_edit = vm_edit_app.mount("#vm-edit-placeholder");
//--------------------------EDIT PLACEHOLDER-------------------------------


function getParameterByNameInner(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getParameterByName(name, url) {
  var res = getParameterByNameInner(name, url);
  if (!res && (!url || url == window.location.href) && window.parent) {
    res = getParameterByNameInner(name, window.parent.location.href);
  }
  return res;
}

var showedit = getParameterByName("showedit");

const mainView_app = createApp({
  data() {
    return {
      quotdata: [],
      quotdata_all: [],
      quotdata_express: [],
      quotdata_overdue: [],
      quotdata_neardue: [],
      quotdata_search: [],
      sortInfo: {
        sortBy: "due",
        order: "desc",
      },

      dropdownData: {},

      selectedImg: {},
      selectedData: {},
      viewMode: "all",
      quotdataGroup: "express",
      projectTab: "edit",

      search_text: "",
      search_text_commited: "",

      isAdmin: isAdmin,

      today: new Date(),
      size_type: [
        "เสื้อยืดไซส์มาตรฐานสมศรี",
        "เสื้อเชิ้ตมาตรฐานสมศรี",
        "เสื้อโปโลพิมพ์ Sublimation",
        "เสื้อยืดมาตรฐานสมหมาย",
        "เสื้อโอเวอร์ไซส์มาตรฐานสมหมาย",
        "เสื้อโอเวอร์ไซส์มาตรฐานสมศรี",
        "เสื้อครอปมาตรฐานสมศรี",
        "เสื้อโปโลมาตรฐานสมศรี",
        "เสื้อยืดมาตรฐนสมศรี ผู้หญิง",
        "เสื้อโปโลมาตรฐนสมศรี ผู้หญิง",
        "มาตรฐาน ZUTTO",
        "กางเกง ZUTTO รุ่นยางยืด",
        "กางเกง ZUTTO รุ่นกระดุม",
        "ขนาดตามลูกค้า",
      ],
      input_file_accept: "image/jpeg, image/png",
      imgFile: {
        name: "",
        size: 0,
        haveFile: false,
        index: 0,
      },
      uploadImgMode: "artwork",
      createProjectType: "",
      loading: true,
    };
  },
  methods: {
    build_newdata_template: build_newdata_template,
    build_zutto_template: build_zutto_template,
    calculateDepositTextColor: calculateDepositTextColor,
    calcurrentstatus: calcurrentstatus,
    calcurrentstatusi: calcurrentstatusi,
    calcurrentstatus_deposit: calcurrentstatus_deposit,
    checkFileFinish: checkFileFinish,
    deposit_bg_class: deposit_bg_class,
    doFinal: doFinal,
    fix_missing_fields: fix_missing_fields,
    formatDate: formatDate,
    formatLongDate: formatLongDate,
    isUniqueId: isUniqueId,
    uploadimg: uploadimg,
    calculateIframeHeight: calculateIframeHeight,
    show_main_status_control_modal: show_main_status_control_modal,
    select_size_type(shirt_type, quot) {
      for (let i = 0; i < quot.shirt_size_type.length; i++) {
        if (shirt_type == 'เสื้อโปโลพิมพ์ Sublimation') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 34,
            long_shirt: 26
          },
          {
            name: "M",
            width_chest: 38,
            long_shirt: 27
          },
          {
            name: "L",
            width_chest: 40,
            long_shirt: 28
          },
          {
            name: "XL",
            width_chest: 44,
            long_shirt: 30
          },
          {
            name: "2XL",
            width_chest: 48,
            long_shirt: 32
          },
          {
            name: "3XL",
            width_chest: 52,
            long_shirt: 34
          },
          ];
        }
        if (shirt_type == 'เสื้อยืดมาตรฐานสมหมาย') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 38,
            long_shirt: 24
          },
          {
            name: "M",
            width_chest: 40,
            long_shirt: 25
          },
          {
            name: "L",
            width_chest: 42,
            long_shirt: 26
          },
          {
            name: "XL",
            width_chest: 44,
            long_shirt: 27
          },
          {
            name: "2XL",
            width_chest: 46,
            long_shirt: 28
          },
          {
            name: "3XL",
            width_chest: 48,
            long_shirt: 29
          },
          ];
        }
        if (shirt_type == 'เสื้อโอเวอร์ไซส์มาตรฐานสมหมาย') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 38,
            long_shirt: 27
          },
          {
            name: "M",
            width_chest: 40,
            long_shirt: 28
          },
          {
            name: "L",
            width_chest: 44,
            long_shirt: 29
          },
          {
            name: "XL",
            width_chest: 46,
            long_shirt: 30
          },
          {
            name: "2XL",
            width_chest: 48,
            long_shirt: 31
          },
          {
            name: "3XL",
            width_chest: 50,
            long_shirt: 32
          },
          ];
        }
        if (shirt_type == 'เสื้อโอเวอร์ไซส์มาตรฐานสมศรี') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 40,
            long_shirt: 26
          },
          {
            name: "M",
            width_chest: 42,
            long_shirt: 27
          },
          {
            name: "L",
            width_chest: 44,
            long_shirt: 28
          },
          {
            name: "XL",
            width_chest: 46,
            long_shirt: 29
          },
          {
            name: "2XL",
            width_chest: 48,
            long_shirt: 30
          },
          ];
        }
        if (shirt_type == 'เสื้อครอปมาตรฐานสมศรี') {
          quot.shirt_size_type[i].info = [{
            name: "",
            width_chest: 38,
            long_shirt: 15.5
          },
          {
            name: "",
            width_chest: 40,
            long_shirt: 16.5
          },
          ];
        }
        if (shirt_type == 'เสื้อโปโลมาตรฐานสมศรี') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 34,
            long_shirt: 25
          },
          {
            name: "M",
            width_chest: 36,
            long_shirt: 26
          },
          {
            name: "L",
            width_chest: 40,
            long_shirt: 28
          },
          {
            name: "XL",
            width_chest: 44,
            long_shirt: 30
          },
          {
            name: "2XL",
            width_chest: 48,
            long_shirt: 31
          },
          {
            name: "3XL",
            width_chest: 52,
            long_shirt: 32
          },
          {
            name: "4XL",
            width_chest: 56,
            long_shirt: 33
          },
          ];
        }
        if (shirt_type == 'เสื้อยืดไซส์มาตรฐานสมศรี') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 34,
            long_shirt: 25
          },
          {
            name: "M",
            width_chest: 36,
            long_shirt: 26
          },
          {
            name: "L",
            width_chest: 40,
            long_shirt: 28
          },
          {
            name: "XL",
            width_chest: 44,
            long_shirt: 30
          },
          {
            name: "2XL",
            width_chest: 48,
            long_shirt: 31
          },
          {
            name: "3XL",
            width_chest: 52,
            long_shirt: 32
          },
          {
            name: "4XL",
            width_chest: 56,
            long_shirt: 33
          },
          {
            name: "5XL",
            width_chest: 60,
            long_shirt: 34
          },
          {
            name: "6XL",
            width_chest: 64,
            long_shirt: 35
          },
          ];
        }
        if (shirt_type == 'เสื้อเชิ้ตมาตรฐานสมศรี') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 34,
            long_shirt: 27
          },
          {
            name: "M",
            width_chest: 36,
            long_shirt: 28
          },
          {
            name: "L",
            width_chest: 40,
            long_shirt: 29
          },
          {
            name: "XL",
            width_chest: 44,
            long_shirt: 30
          },
          {
            name: "2XL",
            width_chest: 48,
            long_shirt: 31
          },
          {
            name: "3XL",
            width_chest: 52,
            long_shirt: 32
          },
          ];
        }
        if (shirt_type == 'เสื้อยืดมาตรฐนสมศรี ผู้หญิง') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 33,
            long_shirt: 25
          },
          {
            name: "M",
            width_chest: 35,
            long_shirt: 26
          },
          {
            name: "L",
            width_chest: 39,
            long_shirt: 28
          },
          {
            name: "XL",
            width_chest: 43,
            long_shirt: 30
          },
          {
            name: "2XL",
            width_chest: 47,
            long_shirt: 31
          },
          ];
        }
        if (shirt_type == 'เสื้อโปโลมาตรฐนสมศรี ผู้หญิง') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 34,
            long_shirt: 24
          },
          {
            name: "M",
            width_chest: 36,
            long_shirt: 25
          },
          {
            name: "L",
            width_chest: 40,
            long_shirt: 27
          },
          {
            name: "XL",
            width_chest: 44,
            long_shirt: 39
          },
          {
            name: "2XL",
            width_chest: 46,
            long_shirt: 30
          },
          ];
        }
        if (shirt_type == 'มาตรฐาน ZUTTO') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 41,
            long_shirt: 27
          },
          {
            name: "M",
            width_chest: 43,
            long_shirt: 28
          },
          {
            name: "L",
            width_chest: 45,
            long_shirt: 30
          },
          {
            name: "XL",
            width_chest: 47,
            long_shirt: 31
          },
          {
            name: "2XL",
            width_chest: 49,
            long_shirt: 31
          },
          {
            name: "3XL",
            width_chest: 51,
            long_shirt: 32
          },
          {
            name: "4XL",
            width_chest: 53,
            long_shirt: 33
          },
          {
            name: "5XL",
            width_chest: 55,
            long_shirt: 33
          },
          {
            name: "6XL",
            width_chest: 57,
            long_shirt: 33
          },
          {
            name: "7XL",
            width_chest: 59,
            long_shirt: 33
          },
          {
            name: "8XL",
            width_chest: 61,
            long_shirt: 33
          },
          {
            name: "EXTRA",
            width_chest: 63,
            long_shirt: 33
          },
          ];
        }
        if (shirt_type == 'กางเกง ZUTTO รุ่นยางยืด') {
          quot.shirt_size_type[i].info = [{
            name: "M",
            width_chest: 41,
            long_shirt: 16.5
          },
          {
            name: "L",
            width_chest: 43,
            long_shirt: 17.5
          },
          {
            name: "XL",
            width_chest: 49,
            long_shirt: 19.5
          },
          {
            name: "2XL",
            width_chest: 51.5,
            long_shirt: 20.5
          },
          ];
        }
        if (shirt_type == 'กางเกง ZUTTO รุ่นกระดุม') {
          quot.shirt_size_type[i].info = [{
            name: "M",
            width_chest: 36,
            long_shirt: 16
          },
          {
            name: "L",
            width_chest: 40,
            long_shirt: 17
          },
          {
            name: "XL",
            width_chest: 44,
            long_shirt: 18
          },
          {
            name: "2XL",
            width_chest: 48,
            long_shirt: 20
          },
          {
            name: "3XL",
            width_chest: 52,
            long_shirt: 20.5
          },
          ];
        }
        if (shirt_type == 'ขนาดตามลูกค้า') {
          quot.shirt_size_type[i].info = [{
            name: "S",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "M",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "L",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "XL",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "2XL",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "3XL",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "4XL",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "5XL",
            width_chest: 0,
            long_shirt: 0
          },
          {
            name: "6XL",
            width_chest: 0,
            long_shirt: 0
          },
          ];
        }
      }
    },
    changeAmountListName(key, inputId) {
      let oldKey = key;
      let newKey = document.getElementById(inputId).value;
      if (newKey == "") {
        generateToast("ชื่อไซส์ไม่สามารถเป็นค่าว่างได้", "danger");
        return;
      }

      if (this.selectedData.amountlist[newKey]) {
        generateToast("ชื่อไซส์ไม่สามารถซ้ำกันได้", "danger");
        return;
      }

      this.selectedData.amountlist[newKey] =
        this.selectedData.amountlist[oldKey];
      delete this.selectedData.amountlist[oldKey];
    },
    amountListUp(key) {
      let sib = _.findKey(this.selectedData.amountlist, {
        order: this.selectedData.amountlist[key].order - 1,
      });
      if (sib) {
        this.selectedData.amountlist[sib].order =
          this.selectedData.amountlist[key].order;
        this.selectedData.amountlist[key].order =
          this.selectedData.amountlist[key].order - 1;
      }
    },
    amountListDown(key) {
      let sib = _.findKey(this.selectedData.amountlist, {
        order: this.selectedData.amountlist[key].order + 1,
      });
      if (sib) {
        this.selectedData.amountlist[sib].order =
          this.selectedData.amountlist[key].order;
        this.selectedData.amountlist[key].order =
          this.selectedData.amountlist[key].order + 1;
      }
    },
    amountListAdd() {
      this.selectedData.amountlist[Math.random().toString(16)] = {
        amount: 0,
        order: _.keys(this.selectedData.amountlist).length,
      };
    },
    amountListDelete(key) {
      delete this.selectedData.amountlist[key];
    },
    async submit_due_postpone(inputId) {
      this.toggleAllChildElement("postpone-tab-pane");
      let dueElement = document.getElementById(inputId);
      if (dueElement.value == "") {
        generateToast("กรุณาใส่วันที่ที่จะเลื่อนของวันส่งสินค้า", "danger");
        this.toggleAllChildElement("postpone-tab-pane");
        return;
      }

      let oldDate = new Date(this.selectedData.due);
      let newDate = new Date(dueElement.value);

      this.selectedData.due = newDate;
      this.selectedData.due_old = oldDate;
      try {
        let res = await db
          .collection("quotation")
          .doc(this.selectedData.id)
          .set(this.selectedData);
        this.selectedData = res.data;
        fix_missing_fields(this.selectedData);
        generateToast("เลื่อนวันส่งสินค้าแล้ว", "success-teal");
        dueElement.value = "";
      } catch (err) {
        generateToast("เกิดข้อผิดพลาดระหว่างเลื่อนวันส่งสินค้า", "danger");
        console.log(err);
      }
      this.toggleAllChildElement("postpone-tab-pane");
    },
    async submit_finish_postpone(inputId) {
      this.toggleAllChildElement("postpone-tab-pane");
      let finishElement = document.getElementById(inputId);
      if (finishElement.value == "") {
        generateToast(
          "กรุณาใส่วันที่ที่จะเลื่อนของกำหนดการเสร็จสิ้น",
          "danger"
        );
        this.toggleAllChildElement("postpone-tab-pane");
        return;
      }

      let oldDate = new Date(this.selectedData.finish);
      let newDate = new Date(finishElement.value);

      this.selectedData.finish = newDate;
      this.selectedData.finish_old = oldDate;

      console.log(newDate);
      console.log(oldDate);
      try {
        let res = await db
          .collection("quotation")
          .doc(this.selectedData.id)
          .set(this.selectedData);
        this.selectedData = res.data;
        fix_missing_fields(this.selectedData);
        generateToast("เลื่อนกำหนดการเสร็จสิ้นแล้ว", "success-teal");
        finishElement.value = "";
      } catch (err) {
        generateToast("เกิดข้อผิดพลาดระหว่างเลื่อนกำหนดการเสร็จสิ้น", "danger");
        console.log(err);
      }
      this.toggleAllChildElement("postpone-tab-pane");
    },
    submit_postpone(finishInput, dueInput) {
      this.submit_finish_postpone(finishInput);
      this.submit_due_postpone(dueInput);
    },
    async submit_fabric_order(inputId) {
      this.toggleAllChildElement("cloth-receive-tab-pane");
      let fabricDateElement = document.getElementById(inputId);

      if (fabricDateElement.value == "") {
        generateToast("กรุณาใส่วันที่ผ้ามาส่งก่อนกดยืนยัน", "danger");
        this.toggleAllChildElement("cloth-receive-tab-pane");
        return;
      }

      let fabricDate = new Date(fabricDateElement.value);

      try {
        let res = await db
          .collection("quotation")
          .doc(this.selectedData.id)
          .set({
            fabric_order_date: fabricDate,
          });
        this.selectedData = res.data;
        this.fix_missing_fields(this.selectedData);
        generateToast("เปลี่ยนวันที่รับผ้าแล้ว", "success-teal");
      } catch (err) {
        generateToast("เกิดข้อผิดพลาดระหว่างเปลี่ยนวันที่ผ้ามาส่ง", "danger");
        console.log(err);
      }
      this.toggleAllChildElement("cloth-receive-tab-pane");
    },
    addAmountSize(title) {
      let amountlistdeep = this.selectedData.amountlistdeep;
      let sizelist = this.selectedData.amountlistmetadata.sizelist;
      let sizeName = "ไซส์ที่ " + Math.random();

      //ADD SIZE TO AMOUNTLISTDEPP AND META
      amountlistdeep[title][sizeName] = {
        amount: 0,
      };
      sizelist[title].push(sizeName);
    },
    addGroup() {
      this.selectedData.shirt_size_type.push({
        name: "ยังไม่ระบุ",
        info: [
          {
            name: "",
            width_chest: 0,
            long_shirt: 0,
          },
        ],
        note: [],
      });
    },
    addFeedback(inputId) {
      let feedbackElement = document.getElementById(inputId);
      let feedback = feedbackElement.value;
      if (feedback.trim() == "" || feedback == null) {
        generateToast("กรุณากรอก Feedback ก่อนกดเพิ่ม", "danger");
        return;
      }
      let pushData = {
        text: feedback,
        at: new Date().toISOString(),
        by: auth_username,
      };
      this.selectedData.customer_feedbacks.push(pushData);
      try {
        db.collection("quotation").doc(this.selectedData.id).set({
          customer_feedbacks: this.selectedData.customer_feedbacks,
        });
        generateToast("เพิ่ม Feedback แล้ว", "success-teal");
        feedbackElement.value = "";
      } catch (err) {
        generateToast("เกิดข้อผิดพลาดระหว่างเพิ่ม Feedback", "danger");
        console.log(err);
      }
    },
    addSize(groupi) {
      this.selectedData.shirt_size_type[groupi].info.push({
        name: "",
        width_chest: 0,
        long_shirt: 0,
      });
    },
    copyText(text) {
      navigator.clipboard.writeText(text);
    },
    copyProjectLink(id) {
      try {
        var link =
          window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          "quotation/view?id=" +
          encodeURIComponent(id);
        navigator.clipboard.writeText(link);
      } catch (err) {
        alert("มีข้อผิดพลาด ไม่สามารถ Copy link ได้");
      }
    },
    async createProject(type, modalId, inputId) {
      const zeroFill = (n) => {
        return ("0" + n).slice(-2);
      };
      this.toggleAllChildElement(modalId);

      let id = "";
      if (type == "zutto") {
        const date = new Date();
        const year = date.getFullYear() + 543;
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        id =
          "ZT-" +
          year.toString().slice(2, 4) +
          zeroFill(month) +
          zeroFill(day) +
          hour +
          minute +
          second;
      } else {
        id = $("#" + inputId)
          .val()
          .trim();
      }

      if (id == "") {
        generateToast("คุณยังไม่ได้กรอกเลขที่ใบเสนอราคา", "danger");
        this.toggleAllChildElement(modalId);
        return;
      }

      if (/[\/\\\.#]/.test(id)) {
        generateToast("มีตัวอักษรต้องห้าม\n/ \\ . #", "danger");
        this.toggleAllChildElement(modalId);
        return;
      }

      let duplicateData = this.isUniqueId(id, this.quotdata);
      if (duplicateData) {
        generateToast(
          "ID ซ้ำกัน กับใบเสนอราคาที่ถูกสร้างเมื่อ " +
          this.formatDate(duplicateData.created_at),
          "danger"
        );
        this.toggleAllChildElement(modalId);
        return;
      }

      if (type == "Exam & Order") {
        //PREPARE DATA
        const newData = this.build_newdata_template();
        newData.id = id;
        newData.exam_and_order.step_list = [
          ["approved", "อนุมัติใบสเปค"],
          ["pr", "เขียน P.R."],
          ["fabric_ordered", "สั่งผ้า"],
          ["fabric_received", "รับผ้า"],
          ["cutted", "ตัด"],
          ["screened", "สกรีน"],
          ["sewed", "เย็บ"],
          ["qc", "QC"],
          ["exam_photo", "ถ่ายรูปงานตัวอย่าง"],
          ["delivered", "จัดส่ง"],
          ["exam_approved", "อนุมัติตัวอย่าง"],
        ];
        newData.exam_and_order.step_data = {
          approved: "",
          pr: "",
          fabric_ordered: "",
          fabric_received: "",
          cutted: "",
          screened: "",
          sewed: "",
          qc: "",
          exam_photo: "",
          delivered: "",
          exam_approved: "",
        };

        //CREATE
        try {
          let res = await db
            .collection("quotation")
            .doc(newData.id)
            .create(newData);
          console.log(res);
          this.selectedData = res.data;
          this.fix_missing_fields(this.selectedData);
          generateToast(
            "สร้างใบสเปค <span class='fw-bold'>" +
            this.selectedData.id +
            "</span> เรียบร้อย",
            "success-teal"
          );

          //CLOSE MODAL
          this.toggleAllChildElement(modalId);
          $("#" + modalId).modal("hide");

          //REDIRECT TO
          this.viewMode = "project";
          vm_status.autoDueDate(this.selectedData, false)
        } catch (err) {
          generateToast("เกิดข้อผิดพลาดระหว่างสร้างใบสเปค", "danger");
          this.toggleAllChildElement(modalId);
          console.log("Add Error");
          console.log(err);
        }
      }

      if (type == "re-order" || type == "duplicate") {
        let newData = _.cloneDeep(this.selectedData);
        newData = _.merge(this.build_newdata_template(), newData);
        newData.created_at = new Date();
        newData.created_by = auth_email;
        newData.step_data = {};
        newData.deposit_step_data = {};
        newData.due_sample = null;
        newData.data[0].sample_confirmation = "ไม่ต้อง";
        newData.data[0].sample_form = "ไม่ต้อง";
        newData.data.push({
          check_list: [["general", "ทั่วไป"], ["customer", "ลูกค้า"], ["finance", "การเงิน"], ["produce", "การผลิต"], ["size", "ไซส์เสื้อ"], ["amount", "จำนวน"], ["advanced_amount", "จำนวนขั้นสูง"], ["screen", "งานสกรีน"], ["pin", "งานปัก"]],
          check_data: { general: "", customer: "", finance: "", produce: "", size: "", amount: "", advanced_amount: "", screen: "", pin: "" }
        })

        newData.id = id;
        newData.exam_and_order = {
          is_zutto: 0,
          is_exam: 0,
          is_order: false,
          is_ordered: 0,
          is_approved: 0,
          fabric_receive_exam: false,
          fabric_receive_order: false,
          current_status_exam: "",
          current_status_order: "",
          step_list: [
            ["approved", "อนุมัติใบสเปค"],
            ["pr", "เขียน P.R."],
            ["fabric_ordered", "สั่งผ้า"],
            ["fabric_received", "รับผ้า"],
            ["cutted", "ตัด"],
            ["screened", "สกรีน"],
            ["sewed", "เย็บ"],
            ["qc", "QC"],
            ["exam_photo", "ถ่ายรูปงานตัวอย่าง"],
            ["delivered", "จัดส่ง"],
            ["exam_approved", "อนุมัติตัวอย่าง"],
          ],
          step_data: {
            approved: "",
            pr: "",
            fabric_ordered: "",
            fabric_received: "",
            cutted: "",
            screened: "",
            sewed: "",
            qc: "",
            exam_photo: "",
            delivered: "",
            exam_approved: "",
          },
          reject: {},
        };

        //CREATE
        try {
          let res = await db
            .collection("quotation")
            .doc(newData.id)
            .create(newData);
          this.selectedData = res.data;
          this.fix_missing_fields(this.selectedData);
          generateToast(
            "สร้างใบสเปค <span class='fw-bold'>" +
            this.selectedData.id +
            "</span> เรียบร้อย",
            "success-teal"
          );

          //CLOSE MODAL
          this.toggleAllChildElement(modalId);
          $("#" + modalId).modal("hide");

          //REDIRECT TO
          this.viewMode = "project";
        } catch (err) {
          generateToast("เกิดข้อผิดพลาดระหว่างสร้างใบสเปค", "danger");
          this.toggleAllChildElement(modalId);
          console.log("Add Error");
          console.log(err);
        }
      }

      if (type == "zutto") {
        let zuttoType = document.getElementById(inputId).value;
        if (zuttoType == "") {
          alert("กรุณาเลือกประเภทของ Zutto ก่อนสร้างใบสเปค");
          this.toggleAllChildElement(modalId);
          return;
        }
        const newData = this.build_zutto_template(zuttoType);

        newData.id = id;

        //CREATE
        try {
          let res = await db
            .collection("quotation")
            .doc(newData.id)
            .create(newData);
          this.selectedData = res.data;
          this.fix_missing_fields(this.selectedData);
          generateToast(
            "สร้างใบสเปค <span class='fw-bold'>" +
            this.selectedData.id +
            "</span> เรียบร้อย",
            "success-teal"
          );

          //CLOSE MODAL
          this.toggleAllChildElement(modalId);
          $("#" + modalId).modal("hide");

          //REDIRECT TO
          this.viewMode = "project";
        } catch (err) {
          generateToast("เกิดข้อผิดพลาดระหว่างสร้างใบสเปค", "danger");
          this.toggleAllChildElement(modalId);
          console.log("Add Error");
          console.log(err);
        }
      }
    },
    async deleteProject(id, i) {
      try {
        await db.collection("quotation").doc(id).delete();
      } catch (err) {
        generateToast("เกิดข้อผิดพลาดระหว่างลบโปรเจกต์", "danger");
        console.log("Delete Error");
        console.log(err);
        return;
      }

      //DELETE FROM ARRAY
      let projectName = this.quotdata[i].name;
      this.quotdata.splice(i, 1);
      //CLOSE DELETE MODAL
      $("#delete-modal").modal("hide");

      //RE INDEX
      this.getQuotdata(false);

      //RETURN TO USER
      generateToast(
        'ลบโปรเจกต์ <span class="fw-bold">' + projectName + "</span> แล้ว",
        "success-teal"
      );
    },
    isSearchPassed(quot) {
      let search_text = this.search_text_commited.trim().toUpperCase();
      if (!search_text) return true;
      if (typeof quot.id !== "string" || typeof quot.name !== "string")
        return false;
      if (
        quot.id.toUpperCase().indexOf(search_text) != -1 ||
        quot.name.toUpperCase().indexOf(search_text) != -1
      ) {
        return true;
      }
      return false;
    },
    openIframe(path) {
      this.viewMode = "iframe";
      //WAIT FOR DOM LOAD
      setTimeout(() => {
        let iframe = document.getElementById("iframe-placeholder");
        iframe.src = path;
      }, 500);
    },
    openViewPage(id) {
      try {
        window.open("/quotation/view?id=" + encodeURIComponent(id), "_blank");
      } catch (err) {
        alert(
          "หากต้องการ ปรับสถานะ/แสดง/แก้ไข/ทำซ้ำ/ลบ/ใบ QC/ใบตรวจนับ โปรเจคนี้ ให้ทำ Refresh แล้วค้นหาโปรเจคนี้ใน 'ค้นหาจาก Server' แล้วจึงดำเนินการต่อ"
        );
      }
    },
    openViewPageWithTable(id, tagName = null) {
      if (tagName == "td" || tagName == "tr" || tagName == "th") {
        this.openViewPage(id);
      }
    },
    performSearch: _.debounce(function () {
      this.search_text_commited = this.search_text;
      //REFRESH TO NORMAL DATA (CLEAR QUOTDATA_SEARCH)
      this.getQuotdata(false);
      this.$forceUpdate();
    }),
    async performSearchOnServer(searchId) {
      let searchValue = document.getElementById(searchId).value;
      this.loading = true;
      if (searchValue == "") {
        await this.getQuotdata();
      } else {
        try {
          let response = await axios.get("/api/quotation", {
            params: {
              search: searchValue,
              field: this.sortBy,
            },
          });

          this.quotdata_search = _.cloneDeep(response.data);
          for (let index in this.quotdata_search) {
            let data = this.quotdata_search[index];
            data.i = index;

            this.initData(data);
          }

          this.groupQuotdata(this.quotdata_search, true);
        } catch (err) {
          console.log(err);
          alert(
            "มีข้อผิดพลาดเกิดขึ้นในการค้นหาข้อมูลจาก Server\n" +
            JSON.stringify(err)
          );
        }
      }
      this.loading = false;
    },
    performSort() {
      let sortBy = this.sortInfo.sortBy;
      let order = this.sortInfo.order;

      if (this.quotdata_search != null) {
        this.quotdata_search = _.orderBy(this.quotdata_search, sortBy, order);
      } else {
        this.quotdata = _.orderBy(this.quotdata, sortBy, order);
      }

      this.$forceUpdate();
    },
    async selectData(i, fetch = true) {
      if (!showedit) {
        let id = "";
        if (this.quotdata_search != null) {
          id = this.quotdata_search[i].id;
        } else {
          id = this.quotdata[i].id;
        }

        if (fetch) {
          let res = await axios("/api/quotation/" + id);
          this.selectedData = _.cloneDeep(res.data);
          this.selectedData.i = i;

          this.initData(this.selectedData);
        } else {
          this.selectedData = _.cloneDeep(this.quotdata[i]);
          this.selectedData.i = i;
        }
      } else {
        if (fetch) {
          let res = await axios("/api/quotation/" + i);
          this.selectedData = _.cloneDeep(res.data);
          this.selectedData.i = i;

          this.initData(this.selectedData);
        } else {
          this.selectedData = _.cloneDeep(this.quotdata[i]);
          this.selectedData.i = i;
        }

      }
    },

    deleteSize(groupi, sizei) {
      delete this.selectedData.shirt_size_type[groupi].info[sizei];
      this.selectedData.shirt_size_type[groupi].info.splice(sizei, 1);
    },
    deleteGroup(groupi) {
      delete this.selectedData.shirt_size_type[groupi];
      this.selectedData.shirt_size_type.splice(groupi, 1);
    },
    moveUp(data, i) {
      if (i > 0) {
        let temp = data[i];
        data[i] = data[i - 1];
        data[i - 1] = temp;
      }
    },
    moveDown(data, i) {
      if (i < data.length - 1) {
        let temp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = temp;
      }
    },
    addAmountGroup(parentid) {
      //DECLARE DATA
      let titlelist = this.selectedData.amountlistmetadata.titlelist;
      let sizelist = this.selectedData.amountlistmetadata.sizelist;
      let sizeinfo = this.selectedData.sizeinfo;
      let placeholderName = "กลุ่มที่ " + Math.random();

      //ADD TITLE KEY IF NOT EXIST IN TITLELIST
      if (!titlelist[parentid]) {
        titlelist[parentid] = [];
      }
      titlelist[parentid].push(placeholderName);
      sizelist[placeholderName] = _.cloneDeep(sizeinfo.___sizelist); //ASSIGN SIZELIST KEY WITH DEFAULT SIZE

      //ADD GROUP TO AMOUNTLISTDEEP
      this.selectedData.amountlistdeep[placeholderName] = {};

      let currorder = 0;
      for (let size of sizeinfo.___sizelist) {
        this.selectedData.amountlistdeep[placeholderName][size] = {
          amount: 0,
          order: currorder++,
        };
      }

      //ADD GROUP NOTE
      this.selectedData.amountlistnote[placeholderName] = "";
    },
    deleteAmountGroup(parentid, title, titlei) {
      delete this.selectedData.amountlistdeep[title]; //REMOVE IN AMOUNTLISTDEEP
      delete this.selectedData.amountlistmetadata.sizelist[title]; //REMOVE IN SIZELIST
      delete this.selectedData.amountlistnote[title]; //REMOVE NOTE
      this.selectedData.amountlistmetadata.titlelist[parentid].splice(
        titlei,
        1
      ); //REMOVE IN TITLELIST
    },

    deleteAmountSize(title, size, sizei) {
      delete this.selectedData.amountlistdeep[title][size];
      this.selectedData.amountlistmetadata.sizelist[title].splice(sizei, 1);
    },
    addProblem() {
      let index = this.selectedData.data[4].problem.length;
      let newtitle = "ปัญหาที่ " + (index + 1);
      this.selectedData.data[4].problem.push({
        title: newtitle,
        picrow: [
          {
            img: "",
            imgsize: 75,
          },
        ],
        problem_note: "",
      });
    },
    deleteProblem(index) {
      this.selectedData.data[4].problem.splice(index, 1);
    },
    initData(data) {
      //FIX STEP DATA TO OBJECT
      if (Array.isArray(data.step_data)) {
        data.step_data = {};
      }

      //FIX DEPOSIT STEP DATA TO OBJECT
      if (Array.isArray(data.deposit_step_data)) {
        data.deposit_step_data = {};
      }

      //CREATE DATE TO DATE OBJECT
      data.due = new Date(data.due).toISOString().split("T")[0];
      data.finish = new Date(data.finish).toISOString().split("T")[0];
      if (data.due_sample) {
        data.due_sample = new Date(data.due_sample).toISOString().split("T")[0];
      }

      if (
        data.data[3] &&
        data.data[3].hasOwnProperty("convenient_time_date") &&
        data.data[3].convenient_time_date
      ) {
        data.data[3].convenient_time_date = new Date(
          data.data[3].convenient_time_date
        )
          .toISOString()
          .split("T")[0];
      }

      //FIX ANOTHER DATA
      try {
        this.fix_missing_fields(data);
      } catch (err) {
        console.log("Fix missing fields before doedit error");
      }
    },
    groupQuotdata(quotdata, absoluteAll = false) {
      function is_Unfinished_Project(quot) {
        return (
          !quot.is_sample &&
          !(
            quot.step_data &&
            quot.step_data.delivered &&
            quot.step_data.delivered.done
          )
        );
      }
      //ALL
      if (absoluteAll) {
        this.quotdata_all = quotdata;
      } else {
        this.quotdata_all = quotdata.filter((quot) =>
          is_Unfinished_Project(quot)
        );
      }

      //QUOTDATA FOR EXPRESS
      this.quotdata_express = quotdata.filter(
        (quot) => is_Unfinished_Project(quot) && quot.data[0].is_express
      );

      //QUOTDATA FOR OVERDUE
      this.quotdata_overdue = quotdata.filter(
        (quot) =>
          is_Unfinished_Project(quot) && new Date(quot.finish) < this.today
      );

      //QUOTDATA FOR NEARDUE
      let quotdata_neardue = quotdata.filter(
        (quot) =>
          is_Unfinished_Project(quot) &&
          new Date(quot.finish).addDays(-3) <= this.today
      );
      this.quotdata_neardue = _.differenceBy(
        quotdata_neardue,
        this.quotdata_overdue,
        (a) => a.id
      );
    },
    async getQuotdata(fetch = true, updateSelectData = true) {
      this.quotdata_search = null;
      if (fetch) {
        let res = await axios("/api/quotation?field=due");
        this.quotdata = res.data;
      }

      this.performSort();

      //ADD INDEX AND MAKE DATA COMPABILITY
      for (const index in this.quotdata) {
        let data = this.quotdata[index]; //REDUCE CODE LENGTH
        data.i = index; //ASSIGN INDEX

        this.initData(data);
      }

      //ASSIGN PLACEHOLDER FOR SELECTDATA
      if (updateSelectData) {
        this.selectedData = this.quotdata[0];
      }

      //GROUP QUOTDATA
      this.groupQuotdata(this.quotdata);
      quotdata = this.quotdata;
    },
    async getDropdownData() {
      let res = await axios("/api/selectdata/quotation");
      this.dropdownData = res.data.data;
    },
    is_custom_dropdown_data(key, check_data) {
      for (const data of this.dropdownData[key]) {
        if (data.value == check_data) {
          return false;
        }
      }
      return true;
    },
    isAmountGroupDuplicateKey(titlei, newTitle) {
      let amountlistmetadata = this.selectedData.amountlistmetadata;
      let amountlistdeep = this.selectedData.amountlistdeep;
      let amountlistnote = this.selectedData.amountlistnote;
      let oldTitle = amountlistmetadata.titlelist[""][titlei];

      //CHECK KEY IS EXIST IN AMOUTLISTDEEP
      if (amountlistdeep[newTitle]) {
        console.log("KEY ซ้ำกัน");
        return;
      }

      //ELSE
      amountlistdeep[newTitle] = amountlistdeep[oldTitle];
      delete amountlistdeep[oldTitle];
      amountlistmetadata.sizelist[newTitle] =
        amountlistmetadata.sizelist[oldTitle];
      delete amountlistmetadata.sizelist[oldTitle];
      amountlistnote[newTitle] = amountlistnote[oldTitle];
      delete amountlistnote[oldTitle];
      amountlistmetadata.titlelist[""][titlei] = newTitle;
    },
    isAdvancedAmountGroupDuplicateKey(titlei, i, newTitle) {
      let amountlistmetadata = this.selectedData.amountlistmetadata;
      let amountlistdeep = this.selectedData.amountlistdeep;
      let amountlistnote = this.selectedData.amountlistnote;
      let oldtitle = amountlistmetadata.titlelist["picrow" + i][titlei];
      if (amountlistdeep[newTitle]) {
        console.log("KEY ซ้ำกัน");
        return;
      }
      amountlistdeep[newTitle] = amountlistdeep[oldtitle];
      delete amountlistdeep[oldtitle];
      amountlistmetadata.sizelist[newTitle] =
        amountlistmetadata.sizelist[oldtitle];
      delete amountlistmetadata.sizelist[oldtitle];
      amountlistnote[newTitle] = amountlistnote[oldtitle];
      delete amountlistnote[oldtitle];
      amountlistmetadata.titlelist["picrow" + i][titlei] = newTitle;
    },
    isAmountSizeDuplicateKey(title, sizei, newSize) {
      let amountlistmetadata = this.selectedData.amountlistmetadata;
      let amountlistdeep = this.selectedData.amountlistdeep;
      let oldSize = amountlistmetadata.sizelist[title][sizei];

      if (amountlistdeep[title][newSize]) {
        console.log("ไม่สามารถใส่ชื่อกลุ่มของขนาดซ้ำได้");
        return;
      }

      //ELSE
      amountlistdeep[title][newSize] = amountlistdeep[title][oldSize];
      delete amountlistdeep[title][oldSize];
      amountlistmetadata.sizelist[title][sizei] = newSize;
    },
    addScreenPoint() {
      this.selectedData.data[5].more_screenpoint.push({
        color: "",
        distance: "custom_cm",
        enable: false,
        file: "อ้างอิงตามลูกค้า",
        position: "",
        size: "ด้านหน้ากว้าง X นิ้ว ด้านหลังกว้าง Y นิ้ว",
        type: "งานพิมพ์",
      });
    },
    deleteScreenPoint(screenpoint, index) {
      // delete screenpoint
      this.selectedData.data[5].more_screenpoint.splice(index, 1);
    },
    addPinPoint() {
      this.selectedData.data[5].more_pinpoint.push({
        distance: "",
        file: "",
        position: "",
        size: "",
        maicolor: "",
      });
    },
    deletePinPoint(pinpoint, index) {
      // delete pinpoint
      this.selectedData.data[5].more_pinpoint.splice(index, 1);
    },
    addAdvancedAmountGroup() {
      let picrow = this.selectedData.data[0].picrow;
      let amountlistnote = this.selectedData.amountlistnote;
      if (picrow) {
        picrow.push({
          img: "",
          text: "S = \nM = \nL = \nXL = \n",
          imgsize: 75,
        });

        if (this.selectedData.use_perfect_countamount) {
          let picrowi = picrow.length - 1;
          this.addAmountGroup("picrow" + picrowi);
          amountlistnote["___picrow" + picrowi + "___prefix"] = "";
          amountlistnote["___picrow" + picrowi + "___suffix"] = "";
        }
      } else {
        alert(
          "กดปุ่ม บันทึก ด้านล่างเพื่ออัพเดทข้อมูลเป็น version ล่าสุดก่อน ถึงจะใช้งานได้"
        );
      }
    },
    deleteAdvancedAmountGroup(picrowi) {
      let picrow = this.selectedData.data[0].picrow;
      let amountlistmetadata = this.selectedData.amountlistmetadata;
      let amountlistdeep = this.selectedData.amountlistdeep;

      picrow.splice(picrowi, 1);
      if (this.selectedData.use_perfect_countamount) {
        for (let title of amountlistmetadata.titlelist["picrow" + picrowi]) {
          delete amountlistdeep[title];
          delete amountlistmetadata.sizelist[title];
        }
        delete amountlistmetadata.titlelist["picrow" + picrowi];
        delete amountlistnote["___picrow" + picrowi + "___prefix"];
        delete amountlistnote["___picrow" + picrowi + "___suffix"];
      }
    },
    openUploadInput(elementId) {
      let element = document.getElementById(elementId);
      element.click();
    },
    getFile(id) {
      let filesInput = document.getElementById(id);
      let files = null;
      try {
        files = filesInput.files[0];
      } catch {
        return;
      }

      this.imgFile.name = files.name;
      this.imgFile.size = (files.size / 1024 / 1024).toFixed(2) + " MB";
      this.imgFile.haveFile = true;
    },
    clearFileInput(id, data) {
      document.getElementById(id).value = null;
      this[data].haveFile = false;
    },
    toggleAllChildElement(id) {
      let nodes = document.getElementById(id).getElementsByTagName("*");
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].toggleAttribute("disabled");
      }
    },
    async uploadProjectImg(
      modalId = null,
      inputId,
      mode,
      index = null,
      subIndex = null,
      selectedImg
    ) {
      this.toggleAllChildElement(modalId);
      let fileId = Date.now();

      let imgFile = document.getElementById(inputId).files[0];
      if (imgFile == null || imgFile === undefined) {
        generateToast("กรุณาเลือกภาพก่อนอัปโหลด", "danger");
        this.toggleAllChildElement(modalId);
        return;
      }

      let filename = String(fileId);
      try {
        let url = await uploadimg(filename, imgFile);
        switch (mode) {
          case "artwork":
            let image = this.selectedData.img;
            image[image.length] = {
              img: url,
              imgsize: 100,
            };
            break;
          case "changeImg":
            this.selectedData.img[selectedImg.index] = {
              img: url,
              imgsize: 100,
            };
            break;
          case "advancedGroup":
            this.selectedData.data[0].picrow[index].img = url;
            break;
          case "sizeLabel":
            this.selectedData.data[0].size_label_img = url;
            break;
          case "sample":
            this.selectedData.data[0].sample_img.push(url);
            break;
          case "problem":
            this.selectedData.data[4].problem[index].picrow[subIndex] = {
              img: url,
              imgsize: 100,
            };
            break;
        }
        generateToast("อัปโหลดภาพสำเร็จ", "success-teal");
      } catch (err) {
        generateToast("เกิดข้อผิดพลาดระหว่างอัปโหลดภาพ", "danger");
        console.log(err);
      }

      await this.doFinal(this.selectedData, false, false);

      if (modalId != null) {
        this.toggleAllChildElement(modalId);
        $("#" + modalId).modal("hide");
      }

      this.clearFileInput(inputId, "imgFile");
    },
    deleteUploadImg(path, index, type = null) {
      let data = _.get(this.selectedData, path);
      data.splice(index, 1);

      if (type == "picrow") {
        if (this.selectedData.use_perfect_countamount) {
          for (let title of this.selectedData.amountlistmetadata.titlelist[
            "picrow" + index
          ]) {
            delete this.selectedData.amountlistdeep[title];
            delete this.selectedData.amountlistmetadata.sizelist[title];
          }
          delete this.selectedData.amountlistmetadata.titlelist[
            "picrow" + index
          ];
          delete this.selectedData.amountlistnote[
            "___picrow" + index + "___prefix"
          ];
          delete this.selectedData.amountlistnote[
            "___picrow" + index + "___suffix"
          ];
        }
      }
      this.doFinal(this.selectedData, false, false);
    },
    getDropdownList(path, data) {
      let dropdownList = _.get(this.dropdownData, path);
      let dropdownOption = [];
      for (let list of dropdownList) {
        dropdownOption.push(list.value);
      }
      console.log(dropdownOption);
      return dropdownOption;
    },
    changeSelect2Value(data, value) {
      this[data] = value;
      this.$forceUpdate();
    },
    async edit_submit() {
      let checkData = _.cloneDeep(this.selectedData.data[6]);
      let checkDone = false;

      if (checkData) {
        for (let i = 0; i < checkData.check_list.length; i++) {
          if (!checkData.check_data[checkData.check_list[i][0]]) {
            checkDone = false
            generateToast("กรุณายืนยันว่าได้ตรวจสอบ ข้อมูล" + checkData.check_list[i][1] + " แล้ว", "danger");
          } else {
            checkDone = true;
          }
        }

        if (checkDone) {
          this.toggleAllChildElement("data-tab-pane");
          await doFinal(this.selectedData);

          //UPDATE QUOTDATA
          try {
            await this.getQuotdata(true, false);
          } catch (err) {
            console.log("FETCH DATA ERROR");
            console.log(err);
          }
          this.toggleAllChildElement("data-tab-pane");
        }
      } else {
        this.toggleAllChildElement("data-tab-pane");
        await doFinal(this.selectedData);

        //UPDATE QUOTDATA
        try {
          await this.getQuotdata(true, false);
        } catch (err) {
          console.log("FETCH DATA ERROR");
          console.log(err);
        }
        this.toggleAllChildElement("data-tab-pane");
      }
    },

    checkValueNull(elementId) {
      let element = document.getElementById(elementId);
      if (element == null || element.value == null) {
        return true;
      } else {
        return false;
      }
    },
    toggleSortOrder() {
      this.sortInfo.order = this.sortInfo.order === "asc" ? "desc" : "asc";
    },
    assignDataToStatusModal(data) {
      vm_status.quotdata = data;
      show_main_status_control_modal();
    },
    initSortDate(date) {
      if (date != null) {
        let newDate = new Date(date);
        return this.formatDate(newDate);
      } else {
        return "-";
      }
    },
  },
  watch: {
    search_text() {
      this.performSearch();
    },
  },
  updated() {
    this.calculateIframeHeight();
  },
  async mounted() {
    this.getDropdownData();
    await this.getQuotdata();
    vm_status.quotdata = this.quotdata[0];
    vm_status.ready = true;
    vm_status.$forceUpdate();
    this.loading = false;

    if (showedit) {
      this.selectData(showedit.replace(/^\s+|\s+$/gm, ''));
      this.viewMode = 'project';
    }
  },
});
mainView_app.component("select-2", select2).component("bs-modal", modal);
window.mainView = mainView_app.mount("#mainView");
