<script>
  import { onMount } from "svelte";
  import { getNotes } from "../services/notes.api";
  import NoteForm from "../components/notes/NoteForm.svelte";
  import NoteItem from "../components/notes/NoteItem.svelte";

  let notes = [];
  let showForm = false;
  let selectedNote = null;
  let error = "";

  async function loadNotes() {
    try {
      notes = await getNotes();
      error = "";
    } catch (error) {
      error = error.message;
    }
  }

  function openCreate() {
    selectedNote = null;
    showForm = true;
  }

  function openEdit(note) {
    selectedNote = note;
    showForm = true;
  }

  function closeForm() {
    showForm = false;
  }

  onMount(loadNotes);
</script>

<h1>My Notes</h1>
<button on:click={openCreate}>Create Note</button>

{#if showForm}
  <NoteForm note={selectedNote} onClose={closeForm} onSuccess={loadNotes} />
{/if}

{#if error}
  <p class="error">{error}</p>
{/if}

<hr />

{#each notes as note}
<NoteItem {note} onEdit={openEdit} onChange={loadNotes}/>
{/each}