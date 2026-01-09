<script>
  import { createNote } from "../services/notes.api";

  export let onNoteAdded;

  let title = "";
  let content = "";

  async function submit() {
    if (!title.trim()) return;

    await createNote({ title, content });

    title = "";
    content = "";

    onNoteAdded();
  }
</script>

<div class="note-from">
  <input placeholder="Title" bind:value={title} />
  <textarea placeholder="Content" bind:value={content}></textarea>
  <button on:click={submit}>Add Note</button>
</div>

<style>
    .note-from {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 400px;
    }

    input, textarea {
        padding: 8px;
    }

    button {
        padding: 8px;
        cursor: pointer;
    }
</style>