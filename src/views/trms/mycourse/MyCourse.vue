<template>
  <div>
    <PageWrapper title="我的实训" v-show="!chooseStudentCourse.id">
      <a-space :size="[8, 18]" wrap style="margin: 5%" >
        <template v-show="studentCourseList" v-model="studentCourseList"
                  v-for="sc in studentCourseList"
                  v-if="studentCourseList.length!==0">

          <a-card hoverable style="width: 300px;">
            <template #cover>
              <img
                :alt=sc.course.courseName
                :src=getFileAccessHttpUrl(sc.course.imageUrl)
                :width="200"
                :height="210"
              />
            </template>
            <a-card-meta :title=sc.course.courseName :description=sc.course.description
                         align="center">
            </a-card-meta>
            <div class="space-align-container">
              <a-space align="center">
                <div class="space-align-block" >
                  <a-button type="primary" @click="startTrain(sc)">
                    进入实训
                  </a-button>
                </div>
                <div class="space-align-block">
                  <a-button type="primary">
                    查看详情
                  </a-button>
                </div>
              </a-space>
            </div>
          </a-card>

        </template>
      </a-space>
    </PageWrapper>

      <TrainCourse :sc="chooseStudentCourse" v-if="chooseStudentCourse.id">
        <template v-slot:exit>
          <fullscreen-exit-outlined style="font-size: 30px;color: #7c7c7c"
                                    @click="exit"></fullscreen-exit-outlined>
        </template>
      </TrainCourse>
  </div>

</template>

<script lang="ts">
import {list} from "@/views/trms/mycourse/MyCourse.api";
import {getFileAccessHttpUrl} from "@/utils/common/compUtils";
import TrainCourse from "@/views/trms/mycourse/traincourse/TrainCourse.vue";
import {FullscreenExitOutlined} from "@ant-design/icons-vue";
import {PageWrapper} from "@/components/Page";
import {useAppStore} from "@/store/modules/app";
import {baseHandler} from "@/layouts/default/setting/handler";
import {HandlerEnum} from "@/layouts/default/setting/enum";
import {unref} from "vue";

interface Course {
  courseName: string;
  createTime: string;
  credits: string;
  description: string;
  id: string;
  imageUrl: string;
  resourceUrl: string
}

interface StudentCourse {
  id: string;
  studentId: string;
  courseId: string;
  course: Course;
  containerList: string
}

export default {
  name: "MyCourse",
  data() {
    return {
      studentCourseList: Array<StudentCourse>(),
      stu_id: "e9ca23d68d884d4ebb19d07889727dae",
      chooseStudentCourse: {}
    }
  },
  components: {PageWrapper, FullscreenExitOutlined, TrainCourse},
  mounted() {
    list({studentId: this.stu_id}).then((res) => {
      for (const i in res.records) {
        this.studentCourseList.push(res.records[i])
      }
    })
  },
  created() {
    baseHandler(HandlerEnum.FULL_CONTENT, false);
  },
  methods: {
    getFileAccessHttpUrl,
    startTrain(course) {
      this.chooseStudentCourse = course
      console.log(this.chooseStudentCourse)
    },
    exit() {
      this.chooseStudentCourse = {}
    }
  }

}
</script>

<style scoped>
.space-align-block {
  margin: 8px 4px;
  /*border: 1px solid #40a9ff;*/
  padding: 14px;
  flex: none;
}

.space-align-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
