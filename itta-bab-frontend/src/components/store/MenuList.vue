<script setup>
import {computed, inject, ref} from "vue";
import Page from "@/components/common/Page.vue";

/* 테스트 데이터 */
const jsonData = [
  {
    "menu_id": 1,
    "menu_name": "김치찌개",
    "menu_price": 8000,
    "userImageUrl": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MDZfMzAg%2FMDAxNzI1NjI3MTU3OTcw.K8PDk67xZd3SNXa6KFqmy0Xmrxp8uWnhuinzGxIvTQog.DwK1U3U_JvUhtNGbHJ3uw-6eE8lY4ZO8zZq4M37czPQg.JPEG%2F1725627157780.jpg&type=sc960_832",
  },
  {
    "menu_id": 2,
    "menu_name": "불고기",
    "menu_price": 12000,
    "userImageUrl": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMTdfMTkz%2FMDAxNzA4MTIyODY1Njgy.JoUHTo-zQOUy1F4DElUwHsYluS7Li9X1EhSuBI19EWIg.dxJ-NwNs3mk8PFz57bjUdyhAttL2oZYWgh-cnvRT8MEg.JPEG.white289700%2F20240216%25A3%25DF115236.jpg&type=a340",

  },
  {
    "menu_id": 3,
    "menu_name": "비빔밥",
    "menu_price": 9000,
    "userImageUrl": "",
  },
  {
    "menu_id": 4,
    "menu_name": "삼겹살",
    "menu_price": 15000,
    "userImageUrl": "",
  },
  {
    "menu_id": 5,
    "menu_name": "떡볶이",
    "menu_price": 6000,
    "userImageUrl": "",
  },
  {
    "menu_id": 6,
    "menu_name": "라면",
    "menu_price": 3000,
    "userImageUrl": "",
  },
  {
    "menu_id": 7,
    "menu_name": "초밥",
    "menu_price": 20000,
    "userImageUrl": "",
  },
  {
    "menu_id": 8,
    "menu_name": "피자",
    "menu_price": 25000,
    "userImageUrl": "",
  },
  {
    "menu_id": 9,
    "menu_name": "햄버거",
    "menu_price": 7000,
    "userImageUrl": "",
  },
  {
    "menu_id": 10,
    "menu_name": "샐러드",
    "menu_price": 5000,
    "userImageUrl": "",
  }
];

const currentPage = ref(1);
const itemsPage = 3;

const totalPages = computed(() => {
  return Math.ceil(jsonData.length / itemsPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPage;
  const end = start + itemsPage;
  return jsonData.slice(start, end);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const selectedItem = inject("selectedItem"); // selectedItem 배열을 주입받습니다

if (!selectedItem) {
  console.error("selectedItem이 주입되지 않았습니다.");
}

const selectItem = (item) => {
  if (!selectedItem.value.includes(item)) {
    selectedItem.value.push(item); // 아이템 추가
    alert(`${item.menu_name}이(가) 선택되었습니다.`);
  } else {
    selectedItem.value = selectedItem.value.filter(i => i !== item); // 아이템 제거
    alert(`${item.menu_name}이(가) 선택 해제되었습니다.`);
  }
}


</script>


<template>
  <div class="list-style">
    <div
        v-for="item in paginatedData"
        :key="item.menu_id"
        class="data-row"
        @click="selectItem(item)"
    >
      <img :src="item.userImageUrl" alt="Menu Image" class="menu-image"/>
      <div class="data-item">
        <div class="item_name">{{ item.menu_name }}</div>
        <div class="item_price">{{ item.menu_price }}원</div>
      </div>
    </div>

    <Page
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="goToPage"
    />
  </div>
</template>


<style scoped>
.item_name {
  font-size: 20px;
  font-weight: 600;
}

.item_price {
  font-size: 15px;
}

.menu-image {
  width: 107px;
  height: 107px;
  margin: 20px
}

.data-row {
  display: flex;
  margin-bottom: 14px;
  border-bottom: 1px solid #ddd;
}

.data-item {
  flex: 1;
  text-align: left;
  margin-left: 10px;
  margin-top: 20px;
}

.page-named span {
  cursor: pointer;
  padding: 5px 13px;
  border: 1px solid var(--white);
  background-color: var(--white);
}

.page-named .active {
  font-weight: bold;
  color: black;
}

.list-style {
  border-radius: 0 0 10px 10px;
}

.bottom-container button {
  justify-content: flex-end;
}

</style>
