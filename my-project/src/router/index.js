import { createRouter, createWebHistory } from "vue-router";
import homeA from "../components/homeA.vue";
import SignUp from "../components/SignUp.vue";
import ReviewerEntry from "../components/ReviewerEntry.vue";
import EntryA from "../components/EntryA";
import AdminEntry from "../components/AdminEntry";
import ResultPage from "../components/ResultPage.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homeA",
      component: homeA
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/EntryA",
      name: "EntryA",
      component: EntryA
    },
    {
      path: "/AdminEntry",
      name: "AdminEntry",
      component: AdminEntry
    },
    {
      path: "/ReviewerEntry",
      name: "ReviewerEntry",
      component: ReviewerEntry
    },
    {
      path: "/ResultPage",
      name: "ResultPage",
      component:ResultPage
    },
  ]
});

export default router;
