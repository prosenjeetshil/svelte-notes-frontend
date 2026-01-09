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
    } catch (error) {
      error = error.message;
    }
  }
</script>

<div class="note">
  <h3>{note.title}</h3>
  <p>{note.content}</p>

  <button on:click={() => onEdit(note)}>Edit</button>
  <button on:click={remove}>Delete</button>

  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>
