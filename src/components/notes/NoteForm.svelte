<script lang="ts">
  import { createNote, updateNote } from "../../services/notes.api";

  export let note = null;
  export let onClose;
  export let onSuccess;

  let title: string = note ? note.title : "";
  let content: string = note ? note.content : "";
  let error = "";
  let isSaving = false;

  const isEditMode = !!note;

  async function submit() {
    if (!title.trim()) {
      error = "Title is required";
      return;
    }

    isSaving = true;
    error = "";

    try {
      if (isEditMode) {
        await updateNote(note._id, { title, content });
      } else {
        await createNote({ title, content });
      }

      onSuccess();
      onClose();
    } catch (err) {
      error = err.message;
    } finally {
      isSaving = false;
    }
  }
</script>

<div class="form">
  <h2>{isEditMode ? "Edit Note" : "Create Note"}</h2>
  <input bind:value={title} placeholder="Title" disabled={isSaving} />
  <textarea bind:value={content} placeholder="Content" disabled={isSaving}
  ></textarea>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <div class="actions">
    <button on:click={submit} disabled={isSaving}>
      {isSaving ? "Saving..." : isEditMode ? "Update" : "Create"}
    </button>
    <button on:click={onClose}>Cancel</button>
  </div>
</div>

<style>
  .form {
    background: #f9fafb;
    color: black;
    border-radius: 8px;
    padding: 16px;
    margin: 20px 0;
  }

  input, textarea {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  textarea {
    resize: vertical;
  }

  .actions {
    display: flex;
    gap: 10px
  }

  button {
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }

   button:first-child {
    background: #2563eb;
    color: white;
  }

  button:last-child {
    background: black;
  }
</style>
