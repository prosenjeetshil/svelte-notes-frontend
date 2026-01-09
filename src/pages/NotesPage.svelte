<script>
  import { onMount } from "svelte";
  import { getNotes } from "../services/notes.api";
  import NoteForm from "../components/notes/NoteForm.svelte";
  import NoteItem from "../components/notes/NoteItem.svelte";

  let notes = [];
  let showForm = false;
  let selectedNote = null;
  let error = "";
  let isLoading = false;

  async function loadNotes() {
    try {
      notes = await getNotes();
      error = "";
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
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

<div class="container">
  <h1>My Notes</h1>
  <button class="primary" on:click={openCreate}>+ Create Note</button>

  {#if showForm}
    <NoteForm note={selectedNote} onClose={closeForm} onSuccess={loadNotes} />
  {/if}

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if isLoading}
    <p>Loading notes...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if notes.length === 0}
    <p>No notes yet. Create your first note!</p>
  {:else}
    <hr />

    {#each notes as note}
      <NoteItem {note} onEdit={openEdit} onChange={loadNotes} />
    {/each}
  {/if}
</div>

<style>
  .container {
    max-width: 700px;
    margin: 40px auto;
    padding: 0 16px;
    font-family: sans-serif;
  }

  h1 {
    margin-bottom: 16px;
  }

  .primary {
    padding: 8px 14px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
