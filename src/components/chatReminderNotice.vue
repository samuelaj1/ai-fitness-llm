<template>
  <div class="chat-notice sticky-bottom d-flex justify-content-between align-items-center p-2 px-3 shadow-sm">
    <span class="text-muted small">
      💡 Reminder: Before work begins, ensure both parties have read and signed the job contract.
    </span>
    <a
        href="/frontend/assets/docs/Tradelink_Modern_Service_Agreement_Logo.docx"
        class="btn btn-sm btn-outline-primary-1 ms-3 small"
        download
        target="_blank"
    >
      Download Contract Template
    </a>
  </div>
</template>

<script>
export default {
  name: "ChatReminderNotice",
};
</script>

<style scoped>
.chat-notice {
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  position: sticky;
  bottom: 0;
  z-index: 10;
}
</style>
