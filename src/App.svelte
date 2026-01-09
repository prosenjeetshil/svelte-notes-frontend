<script>
  import { onMount } from "svelte";
  import NoteForm from "./components/NoteForm.svelte";
  import { getNotes } from "./services/notes.api";
  
  let notes = [];

  async function loadNotes() {
    notes = await getNotes();
  }

  onMount(loadNotes);
</script>

<main>
  <h1>Notes App</h1>
  <NoteForm onNoteAdded={loadNotes}/>
  <hr />
  {#each notes as note}
    <div class="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  {/each}
</main>

<style>
  main {
    padding: 20px;
    font-family: sans-serif;
  }

  .note {
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 10px;
  }
</style>
