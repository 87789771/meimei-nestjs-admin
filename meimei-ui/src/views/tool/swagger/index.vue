<template>
  <i-frame :src="url" />
</template>
<script>
import iFrame from "@/components/iFrame/index";
export default {
  name: "Swagger",
  components: { iFrame },
  data() {
    return {
      url: "http://127.0.0.1:3000/doc/admin/swagger-api",
    };
  },
};
</script>
