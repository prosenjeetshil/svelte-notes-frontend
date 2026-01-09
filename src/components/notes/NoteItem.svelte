<script>
  import { deleteNote } from "../../services/notes.api";

  export let note;
  export let onEdit;
  export let onChange;

  let error = "";

  async function remove() {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteNote(note._id);
      onChange();
    } catch (err) {
      error = err.message;
    }
  }
</script>

<div class="note">
  <h3>{note.title}</h3>
  <p>{note.content}</p>

  <div class="actions">
    <button class="link" on:click={() => onEdit(note)}>Edit</button>
    <button class="danger" on:click={remove}>Delete</button>
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<style>
  .note {
    background: white;
    color: black;
    border-radius: 8px;
    padding: 14px;
    margin-bottom: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  h3 {
    margin: 0 0 6px;
  }

  .actions {
    margin-top: 10px;
    display: flex;
    gap: 10px;
  }

  .link {
    background: none;
    border: none;
    color: #2563eb;
    cursor: pointer;
  }

  .danger {
    background: none;
    border-width: none;
    color: #dc2626;
    cursor: pointer;
  }
</style>
